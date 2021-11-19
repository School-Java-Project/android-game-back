import { IsNumber, IsString } from 'class-validator';

export class RankDto {
  @IsString()
  userId: string;

  @IsNumber()
  num: number;
}