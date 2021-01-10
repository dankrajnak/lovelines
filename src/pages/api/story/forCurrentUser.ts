import { Line, Period, Story } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../temp/Server/prisma";
import withHelpers from "../../../temp/Server/withHelpers";
import sessionHelper from "../../../temp/Server/withSession";

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
