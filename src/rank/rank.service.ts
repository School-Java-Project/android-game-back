import { Injectable } from '@nestjs/common';
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
    await (await this.rank.find()).sort((i, j) => j.num - i.num).slice(0, 11);
  }

  async addRank(data: dto.RankDto) {
    return await this.rank.save(data);
  }
}
