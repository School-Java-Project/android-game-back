import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityUser } from 'src/Entity/user.entity';
import { AuthorizeController } from './authorize.controller';
import { AuthorizeService } from './authorize.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntityUser]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthorizeController],
  providers: [AuthorizeService],
})
export class AuthorizeModule {}
