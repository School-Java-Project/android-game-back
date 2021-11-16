import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntityUser {
  @PrimaryGeneratedColumn()
  username: string;

  @Column()
  password: string;
}
