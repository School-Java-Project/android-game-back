import { IsString } from 'class-validator';

export class getUser {
  @IsString()
  readonly username: string;
  readonly password: string;
}
