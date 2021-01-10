import { NextApiRequest, NextApiResponse } from "next";
import { APISetAgeRequestSchema } from "../../../server/apiSchemas";
import prisma from "../../../server/prisma";
import sessionHelper from "../../../server/withSession";
import {
  getNumFromYearMonth,
  getYearMonthFromDate,
} from "../../../Utilities/yearMonthUtilities";
import withHelpers from "../../../server/withHelpers";
import validationHelper from "../../../server/withValidate";

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
