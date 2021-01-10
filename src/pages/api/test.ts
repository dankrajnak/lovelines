import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { APITestRequestSchema } from "../../temp/Server/apiSchemas";
import prisma from "../../temp/Server/prisma";
import { validateRequestBodyUnsafe } from "../../temp/Server/validateRequest";

type APITestRequest = {
  /**
   * @minimum 5
   */
  foo?: number;
};

const api_test = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const data = validateRequestBodyUnsafe<APITestRequest>(
    req,
    res,
    APITestRequestSchema
  );

  if (data) {
    const session = await getSession({ req });
    const person = await prisma.person.findUnique({
      where: { email: session?.user.email || undefined },
    });

    res.json(person);
  }
};

export default api_test;
