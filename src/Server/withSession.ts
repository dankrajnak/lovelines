import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import grabSession, { SessionWithDefinedEmail } from "./grabSession";

export const handleNoSession = (res: NextApiResponse): void => {
  res.status(401).json({
    message: "Not authorized",
  });
};

const withSession = <T>(
  apiMethod: (
    req: NextApiRequest,
    res: NextApiResponse<T>,
    session: SessionWithDefinedEmail
  ) => Promise<void>
) => async (
  req: NextApiRequest,
  res: NextApiResponse<T | { message: string }>
): Promise<void> => {
  const session = await grabSession({ req });
  session.onSuccess((s) => apiMethod(req, res, s));
  session.onFailure((_) => handleNoSession(res));
};

export default withSession;
