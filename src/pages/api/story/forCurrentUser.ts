import { Line, Period, Story } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionWithDefinedEmail } from "../../../Server/grabSession";
import prisma from "../../../Server/prisma";
import withSession from "../../../Server/withSession";

export type GetStoryForCurrentUserReturnType = {
  data:
    | (Story & {
        lines: (Line & {
          periods: Period[];
        })[];
      })
    | null;
};

const getStoryForCurrentUser = async (
  _req: NextApiRequest,
  res: NextApiResponse<any>,
  session: SessionWithDefinedEmail
): Promise<void> => {
  const personWithStory = await prisma.person.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      story: {
        include: {
          lines: {
            include: {
              periods: true,
            },
          },
        },
      },
    },
  });
  res.json({
    data: personWithStory?.story,
  } as GetStoryForCurrentUserReturnType);
};

export default withSession(getStoryForCurrentUser);
