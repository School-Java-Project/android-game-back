import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from 'src/Entity/user.entity';
import { AuthorizeController } from './authorize.controller';
import { AuthorizeService } from './authorize.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntityUser])],
  controllers: [AuthorizeController],
  providers: [AuthorizeService],
})
export class AuthorizeModule {}
