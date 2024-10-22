import { BaseCrud } from '../../interfaces/base-crud.interface';

export interface UserCrud extends BaseCrud<any, any> {
  create(createDto: any, soft?: boolean): Promise<any>;
}