import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthorizeService } from 'src/authorize/authorize.service';
import * as dto from './dto';
import { RankService } from './rank.service';

@ApiTags('RANKING')
@Controller('rank')
export class RankController {
  constructor(
    private readonly rankS: RankService,
    private jwtService: JwtService,
    private authService: AuthorizeService,
  ) {}

  @ApiOperation({
    summary: '전체 ranking 조회',
    description: '1위부터 10까지 랭킹을 불러옵니다.',
  })
  @Get()
  getRanking() {
    return this.rankS.getAllRank();
  }

  @ApiOperation({
    summary: '새 ranking 추가',
    description: '쿠키값을 받아서 ranking을 추가합니다',
  })
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

  @ApiOperation({
    summary: 'cookie를 사용해 한 명의 user 정보를 불러옵니다',
  })
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
