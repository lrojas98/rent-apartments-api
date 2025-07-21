import { ConfigService } from '@nestjs/config';
import { Dependencies, Injectable } from '@nestjs/common';

import { IEnvironment } from './interfaces';

@Dependencies(ConfigService)
@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}
  
  getEnv<T>(name: keyof IEnvironment): T {
    return this.configService.get<T>(name.toString());
  }
}