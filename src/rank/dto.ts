import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetNumDto {
  @ApiProperty({
    example: '20',
    description: '점수',
    required: true,
  })
  @IsNumber()
  num: number;
}

export class RankDto extends GetNumDto {
  @ApiProperty({
    example: 'username',
    description: 'user 아이디',
    required: true,
  })
  @IsString()
  userId: string;
}
