import { User } from "../../entity/user";
import { UserService } from "../../services/user_service";
import { UnauthorizedException } from "../exceptions/unauthorized_exception";

export async function checkTokenAndGetUser(authorization: any): Promise<User> {
  const userService = new UserService();
  const token = authorization;
  if (!token) throw new UnauthorizedException();

  const user = await userService.findUserViaToken(token);
  if (!user) throw new UnauthorizedException();
  delete user.password;
  return user;
}
