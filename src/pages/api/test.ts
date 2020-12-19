import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../Lib/prisma";

const api_test = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const session = await getSession({ req });
  const person = await prisma.person.findUnique({
    where: { email: session.user.email },
  });

  res.json(person);
};

export default api_test;
