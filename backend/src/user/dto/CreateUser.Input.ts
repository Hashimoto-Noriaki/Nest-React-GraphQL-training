import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class createUserInput {
    Field()
    @IsNotEmpty()
    name: string;

    Field()
    @IsEmail()
    email: string;

    Field()
    @MinLenght(8)
    password: string
}
