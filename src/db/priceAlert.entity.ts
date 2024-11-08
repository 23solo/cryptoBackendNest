import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('priceAlerts')
export class PriceAlert {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.priceAlerts)
  user: User;

  @Column()
  cryptoSymbol: string;

  @Column()
  targetPrice: number;

  @Column()
  alertType: 'above' | 'below'; // Enum for alert type

  @Column({ default: 0 }) // Default to 0 (not fulfilled)
  status: number; // 0 for not fulfilled, 1 for fulfilled
}
