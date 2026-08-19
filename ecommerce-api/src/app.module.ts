import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';
import { AcceptLanguageResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',

        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),

        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),

        database: config.get<string>('DB_NAME'),

        autoLoadEntities: true,

        synchronize: true,

        logging: ['error'],
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',

      loader: I18nJsonLoader,

      loaderOptions: {
        path: join(__dirname, 'i18n'),
        watch: true,
      },

      resolvers: [AcceptLanguageResolver],
    }),
    
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    ReviewModule,
    OrderModule,
    UploadModule,
    MailModule,
  ],
})
export class AppModule {}
