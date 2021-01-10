import { NextApiRequest, NextApiResponse } from "next";
import { APISetAgeRequestSchema } from "../../../Server/apiSchemas";
import prisma from "../../../Server/prisma";
import sessionHelper from "../../../Server/withSession";
import {
  getNumFromYearMonth,
  getYearMonthFromDate,
} from "../../../Utilities/yearMonthUtilities";
import withHelpers from "../../../Server/withHelpers";
import validationHelper from "../../../Server/withValidate";

export type APISetAgeRequest = {
  year: number;
  month: number;
  day: number;
};

export default withHelpers(
  {
    validated: validationHelper<APISetAgeRequest>(APISetAgeRequestSchema),
    session: sessionHelper,
  },
  async (
    { session, validated },
    _: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    console.log("valid", validated);
    const { year, month, day } = validated;
    const { user } = session;
    const birthdayDate = new Date(year, month, day);

    const person = await prisma.person.update({
      where: { email: user.email },
      data: {
        ageDate: birthdayDate,
        ageYearMonth: getNumFromYearMonth(getYearMonthFromDate(birthdayDate)),
      },
    });

    res.json(person);
  }
);
