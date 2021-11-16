import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import * as dto from './dto';

@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly AService: AuthorizeService) {}

  @Post('/register')
  login(@Body() data: dto.getUser) {
    return this.AService.login(data);
  }
}
