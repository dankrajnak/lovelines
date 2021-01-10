import { Line, Period, Story } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma";
import withHelpers from "../../../server/withHelpers";
import sessionHelper from "../../../server/withSession";

export type GetStoryForCurrentUserReturnType = {
  data:
    | (Story & {
        lines: (Line & {
          periods: Period[];
        })[];
      })
    | null;
};

export default withHelpers(
  { session: sessionHelper },
  async (
    { session },
    _req: NextApiRequest,
    res: NextApiResponse<any>
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
  }
);
