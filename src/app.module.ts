import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorizeModule } from './authorize/authorize.module';
import { EntityUser } from './Entity/user.entity';

@Module({
  imports: [
    AuthorizeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'android_server',
      entities: [EntityUser],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
