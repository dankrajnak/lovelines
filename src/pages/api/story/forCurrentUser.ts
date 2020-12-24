import { Line, Period, Story } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import prisma from "../../../Server/prisma";

export type GetStoryForCurrentUserReturnType = {
  data: (Story & {
    line: (Line & {
      periods: Period[];
    })[];
  })[];
};

const getStoryForCurrentUser = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const session = await getSession({ req });

  if (session?.user.email) {
    const stories = await prisma.story.findMany({
      where: {
        person: { email: session.user.email },
        deletedDate: { equals: null },
      },
      include: {
        line: {
          include: {
            periods: true,
          },
        },
      },
    });
    res.json({ data: stories } as GetStoryForCurrentUserReturnType);
  } else {
    res.status(401).json({ message: "You gotta be logged in" });
  }
};

export default getStoryForCurrentUser;
