import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthorizeService } from 'src/authorize/authorize.service';
import * as dto from './dto';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(
    private readonly rankS: RankService,
    private jwtService: JwtService,
    private authService: AuthorizeService,
  ) {}

  @Get()
  getRanking() {
    return this.rankS.getAllRank();
  }

  @Post()
  async addRank(@Body() data: dto.GetNumDto, @Req() req: Request) {
    try {
      const cookie = req.cookies['auth'];
      const result = await this.jwtService.verifyAsync(cookie);

      if (!result) throw new UnauthorizedException();
      if (!(await this.authService.check(result.username)))
        throw new UnauthorizedException();

      return this.rankS.addRank({ num: data.num, userId: result.username });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Get('findme')
  async findUserData(@Req() req: Request) {
    try {
      const cookie = req.cookies['auth'];
      const user = await this.jwtService.verifyAsync(cookie);
      return this.rankS.findUserData(user.username);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
