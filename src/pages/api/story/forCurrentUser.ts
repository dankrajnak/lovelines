import { Line, Period, Story } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../Server/prisma";

export type GetStoryForCurrentUserReturnType = {
  data:
    | (Story & {
        line: (Line & {
          periods: Period[];
        })[];
      })
    | null;
};

const getStoryForCurrentUser = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const session = await getSession({ req });

  if (session?.user.email) {
    const personWithStory = await prisma.person.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        story: {
          include: {
            line: {
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
  } else {
    res.status(401).json({ message: "You gotta be logged in" });
  }
};

export default getStoryForCurrentUser;
