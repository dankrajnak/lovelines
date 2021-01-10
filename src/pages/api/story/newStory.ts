import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/prisma";
import { APINewStoryRequestSchema } from "../../../server/apiSchemas";
import withHelpers from "../../../server/withHelpers";
import validationHelper from "../../../server/withValidate";
import sessionHelper from "../../../server/withSession";

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
