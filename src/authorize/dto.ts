import { IsString, MinLength } from 'class-validator';

export class getUser {
  @IsString()
  readonly username: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
