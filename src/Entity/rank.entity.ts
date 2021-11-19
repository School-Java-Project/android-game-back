import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ranking')
export class EntityRank {
  @PrimaryColumn()
  userId: string;

  @Column()
  num: number;
}
