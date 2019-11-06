import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int
} from "type-graphql";
import { User } from "./entity/User";
import { hash, compare } from "bcryptjs";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import { isAuth } from "./isAuth";
import { getConnection } from "typeorm";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hola";
  }

  // We use UseMiddleware to create a function that valid if the user is loggin
  @Query(() => String)
  // We got this function "isAuth" that read the header and verify is the user is authenticated.
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `your user id is: ${payload!.userId}`;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("could no find user");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password");
    }

    // login successful
    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  // Only for test propous, we don't wan expouse it.
  // Replace for a function that will be use in forgotPassword or close all sessions
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);
    return true;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("fiscalId") fiscalId: string,
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ) {
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new Error("user exist..!");
    }

    const hashPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashPassword,
        fiscalId,
        firstName,
        lastName
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
