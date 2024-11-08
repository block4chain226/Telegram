import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entity/users.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn('uuid', { name: 'contact_id' })
  id: string;
  @Column({ type: 'uuid', name: 'owner_id' })
  ownerId: string;
  @Column({ type: 'varchar', nullable: true, unique: true })
  phone: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  firstname?: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  lastname?: string;

  @ManyToOne(() => User, (user) => user.contacts, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}