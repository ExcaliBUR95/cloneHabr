import { CounterSchema } from 'entries/Counter';
import { UserSchema } from 'entries/User';

export interface StateSchema {
   counter: CounterSchema,
   user: UserSchema,
}
