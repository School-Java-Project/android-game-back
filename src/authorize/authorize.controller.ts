import { Body, Controller, Post } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import * as dto from './dto';

@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly AService: AuthorizeService) {}

  @Post('/register')
  register(@Body() data: dto.getUser) {
    return this.AService.register(data);
  }

  @Post('/login')
  login(@Body() data: dto.getUser) {
    if (this.AService.login(data)) {
      return 'fuck';
    }
    return '응 아니야';
  }
}
