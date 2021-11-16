import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityUser } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as dto from './dto';

@Injectable()
export class AuthorizeService {
  constructor(
    @InjectRepository(EntityUser) private user: Repository<EntityUser>,
  ) {}
  async login(data: dto.getUser) {
    const result = await this.user.findOne({ username: data.username });
    if (result) throw Error('사용자가 있음');

    const newData = { username: data.username, password: data.password };
    this.user.create(newData);
    this.user.save(newData);
    return 'done';
  }
}
