import { BadRequestException, Controller, Post, Req } from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  async upload(@Req() req: FastifyRequest) {
    const file = await req.file();

    if (!file) {
      throw new BadRequestException('Image is required');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only images are allowed');
    }

    return this.uploadService.upload(file);
  }
}
