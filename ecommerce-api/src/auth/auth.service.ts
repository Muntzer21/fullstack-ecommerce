import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
        private readonly i18n: I18nService,
    
  ) {}
  private readonly saltRounds = 10;

  /**
   * Hash a plain text password before saving it to the database
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare an incoming plain text password against the stored database hash
   */
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
  async create(createAuthDto: CreateAuthDto) {
    const hashedPassword = await this.hashPassword(createAuthDto.password);

    const code = this.generateVerificationCode();

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10);

    const user = await this.usersService.create({
      ...createAuthDto,
      password: hashedPassword,
      isVerified: false,
      verificationCode: code,
      verificationExpires: expires,
    });

    await this.mailService.sendEmail(
      user.email,
      'Email Verification',
      `
      <h2>Welcome ${user.name}</h2>
      <p>Your verification code is:</p>
      <h1>${code}</h1>
      <p>This code expires in 10 minutes.</p>
    `,
    );

    return {
      message: 'Verification code sent to your email.',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException(await this.i18n.t('auth.INVALID_LOGIN'));
    }

    const isPasswordValid = await this.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(await this.i18n.t('auth.INVALID_LOGIN'));
    }

      if (!user.isVerified) {
        throw new UnauthorizedException(await this.i18n.t('auth.VERIFY_EMAIL'));
      }

    const payload = {
      sub: user.id,
      role: user.role,
    };

    const accessToken = await this.generateToken(payload);

    return {
      accessToken,
      user,
    };
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user) {
              throw new UnauthorizedException(
                await this.i18n.t('auth.INVALID_EMAIL'),
              );

    }

    if (user.isVerified) {
      return {
        message: 'Email already verified',
      };
    }

    if (!user.verificationExpires || user.verificationExpires < new Date()) {
     throw new UnauthorizedException(
       await this.i18n.t('auth.VERIFICATION_CODE_EXPIRED'),
     );

    }

    if (user.verificationCode !== dto.code) {
       throw new UnauthorizedException(
         await this.i18n.t('auth.INVALID_VERIFICATION_CODE'),
       );
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpires = null;
    

    await this.usersService.save(user);

   const payload = {
     sub: user.id,
     role: user.role,
   };

   const accessToken = await this.generateToken(payload);

   return {
     message: 'Email verified successfully',
     accessToken,
     user,
   };
  }

 
  private async generateToken(payload) {
    return this.jwtService.signAsync(payload);
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
