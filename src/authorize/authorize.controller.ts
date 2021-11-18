import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import { JwtService } from '@nestjs/jwt';
import * as dto from './dto';
import { Response } from 'express';

@Controller('authorize')
export class AuthorizeController {
  constructor(
    private readonly AService: AuthorizeService,
    private jwtService: JwtService,
  ) {}

  @Post('/register')
  async register(@Body() data: dto.getUser) {
    await this.AService.register(data);
    return {
      message: 'done',
    };
  }

  @Post('/login')
  async login(
    @Body() data: dto.getUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.AService.login(data)) {
      const jwt = await this.jwtService.signAsync({ username: data.username });
      res.cookie('auth', jwt, { httpOnly: true });
    }
    return {
      message: 'done',
    };
  }
}
