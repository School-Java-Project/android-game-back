import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRank } from 'src/Entity/rank.entity';
import { Repository } from 'typeorm';
import * as dto from './dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(EntityRank) private rank: Repository<EntityRank>,
  ) {}

  async getAllRank() {
    return await (await this.rank.find())
      .sort((i, j) => j.num - i.num)
      .slice(0, 11);
  }

  async addRank(data: dto.RankDto) {
    const result = await this.rank.findOne({ userId: data.userId });
    if (!result || data.num > result.num) {
      return await this.rank.save(data);
    } else {
      return result;
    }
  }

  async findUserData(userId: string) {
    const result = await this.rank.findOne({ userId });
    if (!result) throw new UnauthorizedException();

    return result;
  }
}
