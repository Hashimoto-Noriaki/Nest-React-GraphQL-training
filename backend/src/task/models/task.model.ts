//モデルからGraphQLのスキーマを生成する
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Status } from '@prisma/client';

@ObjectType()
export class Task {
  //TSのフィールドをGraphQLのスキーマのフィールドに変換
  @Field(() => Int) //GraphQLの場合、先頭が大文字
  id: number;

  @Field()
  name: string;

  @Field()
  dueDate: string;

  @Field()
  status: Status;

  @Field({ nullable: true }) //fieldにnullを許容
  description: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
