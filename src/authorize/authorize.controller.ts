import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import * as dto from './dto';

@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly AService: AuthorizeService) {}
  @Post()
  login(@Body() data: dto.getUser) {
    try {
      this.AService.login(data);
      return 'done';
    } catch (e) {
      return e;
    }
  }
}
