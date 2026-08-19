import { Injectable } from '@nestjs/common';

import { writeFile } from 'fs/promises';

import { join, extname } from 'path';

import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  async upload(file: any) {
    const buffer = await file.toBuffer();

    const filename = randomUUID() + extname(file.filename);

    await writeFile(join(process.cwd(), 'uploads', filename), buffer);

    return {
      filename,
      url: `http://localhost:3000/uploads/${filename}`,
    };
  }
}
