import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '../../common/embedded/registry-dates';
import { Roles } from '../constants/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;
  @Column({ type: 'varchar', length: 20 })
  username?: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', length: 20 })
  firstname?: string;
  @Column({ type: 'varchar', length: 20 })
  lastname?: string;
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
  @Column((type) => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
}