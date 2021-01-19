import withHelpers from "../../../Server/withHelpers";
import sessionHelper from "../../../Server/withSession";
import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import { Person } from "@prisma/client";
import prisma from "../../../Server/prisma";

export type CurrentUserReturnType = Person;

export default withHelpers(
  { session: sessionHelper },
  async ({ session }, _req: NextApiRequest, res: NextApiResponse) => {
    const person = await prisma.person.findUnique({
      where: {
        email: session.user.email,
      },
    });
    res.json(person as CurrentUserReturnType);
  }
);
