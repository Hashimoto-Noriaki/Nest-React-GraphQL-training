import { Field, ObjectType } from '@nestjs/graphql';

@objectType()
export class User {
    Field(() => Int)
    id: number;

    Field(() => Int)
    name: string;

    Field(() => Int)
    email: string;

    Field(() => Int)
    password: string;

    Field(() => Int)
    createdAt: Date;

    Field(() => Int)
    updatedAt: Date;
}
