import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("account.users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { default: "" })
  fiscalId: string;

  @Field()
  @Column("text", { default: "" })
  firstName: string;

  @Field()
  @Column("text", { default: "" })
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field()
  @Column("text", { default: "" })
  city: string;

  @Field()
  @Column("text", { default: "" })
  state: string;

  @Field()
  @Column("text", { default: "" })
  address: string;

  @Field()
  @Column("text", { default: "" })
  zip: string;

  @Field()
  @Column("text", { default: "" })
  country: string;

  @Column("int", { default: 0 })
  tokenVersion: number;
}
