import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityUser } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as dto from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorizeService {
  constructor(
    @InjectRepository(EntityUser) private user: Repository<EntityUser>,
  ) {}

  async register(data: dto.getUser) {
    const result = await this.user.findOne({ username: data.username });
    if (result) return '사용자가 있습니다';

    const hash = await bcrypt.hash(data.password, 10);

    const newData = { username: data.username, password: hash };
    await this.user.create(newData);
    await this.user.save(newData);
    return 'done';
  }

  async login(data: dto.getUser) {
    const userData = await this.user.findOne({ username: data.username });
    if (!userData) return false;

    const result = await bcrypt.compare(data.password, userData.password);

    return result;
  }
}
