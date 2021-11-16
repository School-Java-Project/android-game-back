import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('user')
export class EntityUser {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}
