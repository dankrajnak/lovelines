import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../Server/prisma";
import { validateRequestBodyUnsafe } from "../../../Server/validateRequest";
import { APINewStoryRequestSchema } from "../../../Server/apiSchemas";

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

const newStory = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const data = validateRequestBodyUnsafe<APINewStoryRequest>(
    req,
    res,
    APINewStoryRequestSchema
  );
  if (data) {
    const session = await getSession({ req });
    const now = new Date();
    if (session?.user.email) {
      const story = await prisma.story.create({
        data: {
          createdDate: now,
          modifiedDate: now,
          person: {
            connect: { email: session.user.email },
          },
          line: {
            create: data.story.map((line) => ({
              createdDate: now,
              periods: {
                create: line.map(
                  ({ year, month, isHeartBreak, intensity }) => ({
                    year,
                    yearMonth: year * 100 + month,
                    month,
                    isHeartBreak,
                    intensity,
                  })
                ),
              },
            })),
          },
        },
      });

      res.json(story);
    } else {
      res.status(401).json({ message: "You gotta be logged in" });
    }
  }
};

export default newStory;
