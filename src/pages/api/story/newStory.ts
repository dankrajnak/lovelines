import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../Server/prisma";
import { APINewStoryRequestSchema } from "../../../Server/apiSchemas";
import withHelpers from "../../../Server/withHelpers";
import validationHelper from "../../../Server/withValidate";
import sessionHelper from "../../../Server/withSession";

export type NewStoryAPILine = {
  /**
   *
   * @minimum 1900
   */
  year: number;
  /**
   * @maximum 12
   * @minimum 1
   */
  month: number;
  isHeartBreak: boolean;
  intensity: number;
};

export type APINewStoryRequest = {
  story: NewStoryAPILine[][];
};

export default withHelpers(
  {
    validated: validationHelper<APINewStoryRequest>(APINewStoryRequestSchema),
    session: sessionHelper,
  },
  async (
    { validated, session },
    _: NextApiRequest,
    res: NextApiResponse<any>
  ): Promise<void> => {
    const now = new Date();
    const story = await prisma.story.create({
      data: {
        createdDate: now,
        modifiedDate: now,
        Person: {
          connect: { email: session.user.email },
        },
        lines: {
          create: validated.story.map((line) => ({
            createdDate: now,
            periods: {
              create: line.map(({ year, month, isHeartBreak, intensity }) => ({
                year,
                yearMonth: year * 100 + month,
                month,
                isHeartBreak,
                intensity,
              })),
            },
          })),
        },
      },
    });

    res.json(story);
  }
);
