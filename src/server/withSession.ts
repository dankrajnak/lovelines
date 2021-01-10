import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import grabSession, { SessionWithDefinedEmail } from "./grabSession";
import { Helper } from "./withHelpers";

export const handleNoSession = (res: NextApiResponse): void => {
  res.status(401).json({
    message: "Not authorized",
  });
};

const sessionHelper: Helper<
  [NextApiRequest, NextApiResponse],
  Promise<SessionWithDefinedEmail>
> = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await grabSession({ req });
  if (session.isSuccess()) {
    return session.value;
  }
  session.whenFailure((_) => handleNoSession(res));
  throw new Error("no session");
};

export default sessionHelper;
