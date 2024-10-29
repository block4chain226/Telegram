export interface BaseCrud<C, R> {
  create(createDto: C): Promise<R>;

  findOne(id: string): Promise<R>;

  update(id: string, updateDto: C): Promise<R>;

  delete(id: string): Promise<string>;
}