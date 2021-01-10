import { User } from "next-auth";
import { getSession, Session } from "next-auth/client";
import { Either, failure, success } from "../Utilities/Either";

export type SessionWithDefinedEmail = Session & {
  user: User & { email: string };
};

const grabSession = async (
  ...params: Parameters<typeof getSession>
): Promise<Either<SessionWithDefinedEmail, string>> => {
  const session = await getSession(...params);
  if (session) {
    if (session.user.email) {
      return success(session as SessionWithDefinedEmail);
    }
    return failure("No email");
  }
  return failure("No session");
};

export default grabSession;
