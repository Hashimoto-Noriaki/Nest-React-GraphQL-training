import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsDateString, IsInt } from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsDateString()
  dueDate: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  @IsNotEmpty()
  @IsInt()
  userId: number; // userId フィールドを追加
}
