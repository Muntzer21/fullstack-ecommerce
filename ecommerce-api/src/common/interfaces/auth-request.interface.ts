// src/common/interfaces/auth-request.interface.ts

import { FastifyRequest } from 'fastify';

export interface AuthRequest extends FastifyRequest {
  user: {
    id: number;
    role: string;
  };
}
