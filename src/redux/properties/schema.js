import { schema } from 'normalizr';

export const property = new schema.Entity('properties');
export const arrayOfProperties = new schema.Array(property);
