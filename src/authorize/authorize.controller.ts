import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Res,
} from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import { JwtService } from '@nestjs/jwt';
import * as dto from './dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTHORIZE')
@Controller('authorize')
export class AuthorizeController {
  constructor(
    private readonly AService: AuthorizeService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({
    summary: '회원가입',
    description: 'username과 password를 생성합니다',
  })
  @Post('/register')
  async register(@Body() data: dto.getUser) {
    await this.AService.register(data);
    return {
      message: 'done',
    };
  }

  @ApiOperation({
    summary: '로그인',
    description:
      '로그인을 해서 username과 password가 일치하면 cookie를 받습니다',
  })
  @Post('/login')
  async login(
    @Body() data: dto.getUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (await this.AService.login(data)) {
      const jwt = await this.jwtService.signAsync({ username: data.username });
      res.cookie('auth', jwt, { httpOnly: true });
    } else {
      throw new BadRequestException();
    }
    return {
      message: 'done',
    };
  }

  @ApiOperation({
    summary: '로그아웃',
    description: 'cookie가 지워집니다',
  })
  @Get('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth');
    return {
      message: 'done',
    };
  }
}
