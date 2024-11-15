import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegistryDates {
  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
  @Field()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}