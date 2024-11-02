//モデルからGraphQLのスキーマを生成する
import { Field, Int, ObjectType } from '@nestjs/graphql';

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
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  @Field({ nullable: true }) //fieldにnullを許容
  description: string;
}
