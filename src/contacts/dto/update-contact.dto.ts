import { CreateContactDto } from './create-contact.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactDto extends PartialType(CreateContactDto) {
}