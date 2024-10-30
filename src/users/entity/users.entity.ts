import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '../../common/embedded/registry-dates';
import { Roles } from '../constants/roles.enum';
import { Contact } from '../../contacts/entity/contacts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;
  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  username?: string;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', unique: true })
  phone: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  firstname?: string;
  @Column({ type: 'varchar', length: 20, nullable: true })
  lastname?: string;
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
  @Column((type) => RegistryDates, { prefix: false })
  registryDates: RegistryDates;

  @OneToMany(() => Contact, (contact) => contact.user, { cascade: ['soft-remove', 'recover'] })
  contacts: Contact[];

  @BeforeInsert()
  insertRole() {
    this.role = Roles.USER;
  }

  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }
}