import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class getUser {
  @ApiProperty({
    example: 'username',
    description: '사용자 이름',
    required: true,
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'password',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
