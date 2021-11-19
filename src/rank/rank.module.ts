import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizeModule } from 'src/authorize/authorize.module';
import { EntityRank } from 'src/Entity/rank.entity';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntityRank]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    AuthorizeModule,
  ],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
