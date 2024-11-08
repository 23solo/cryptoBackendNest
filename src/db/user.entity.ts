import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserDetails } from './userDetails.entity';
import { PriceAlert } from './priceAlert.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserDetails, (userDetails) => userDetails.user)
  userDetails: UserDetails[];

  @OneToMany(() => PriceAlert, (priceAlert) => priceAlert.user) // Add this line
  priceAlerts: PriceAlert[]; // Add this line
}
