import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'contacts' })
@Entity('contacts')
export class Contact {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', { name: 'contact_id' })
  id: string;
  @Field()
  @Column({ type: 'uuid', name: 'owner_id' })
  ownerId: string;
  @Field()
  @Column({ type: 'varchar', nullable: true, unique: true })
  phone: string;
  @Field()
  @Column({ type: 'varchar', length: 20, nullable: true })
  firstname?: string;
  @Field()
  @Column({ type: 'varchar', length: 20, nullable: true })
  lastname?: string;

  @Field(type => User)
  @ManyToOne(() => User, (user) => user.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}