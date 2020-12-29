import { Session } from "next-auth/client";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import grabSession from "./grabSession";

export const handleNoSession = (res: NextApiResponse): void => {
  res.status(401).json({
    message: "Not authorized",
  });
};

const withSession = async <T>(
  apiMethod: (
    req: NextApiRequest,
    res: NextApiResponse<T>,
    session: Session
  ) => Promise<void>
) => async (
  req: NextApiRequest,
  res: NextApiResponse<T | { message: string }>
): Promise<void> => {
  const sesh = await grabSession({ req });
  sesh.onSuccess((s) => apiMethod(req, res, s));
  sesh.onFailure((_) => handleNoSession(res));
};

export default withSession;
