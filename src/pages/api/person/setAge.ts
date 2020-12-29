import { NextApiRequest, NextApiResponse } from "next";
import { APISetAgeRequestSchema } from "../../../Server/apiSchemas";
import { validateRequestBodyUnsafe } from "../../../Server/validateRequest";
import prisma from "../../../Server/prisma";
import grabSession from "../../../Server/grabSession";
import { handleNoSession } from "../../../Server/withSession";
import {
  getNumFromYearMonth,
  getYearMonthFromDate,
} from "../../../Utilities/yearMonthUtilities";

export type APISetAgeRequest = {
  birthday: Date;
};

// Temporary method to set the age on a user
const setAge = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => {
  const validated = validateRequestBodyUnsafe<APISetAgeRequest>(
    req,
    res,
    APISetAgeRequestSchema
  );
  validated.onSuccess(async ({ birthday }) => {
    const session = await grabSession({ req });
    session.onFailure(() => handleNoSession(res));
    session.onSuccess(({ user }) => {
      prisma.person.update({
        where: { email: user.email },
        data: {
          ageDate: birthday,
          ageYearMonth: getNumFromYearMonth(getYearMonthFromDate(birthday)),
        },
      });
    });
  });
};

export default setAge;
