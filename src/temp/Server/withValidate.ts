import { NextApiRequest, NextApiResponse } from "next";
import { validateRequestBodyUnsafe } from "./validateRequest";
import { Helper } from "./withHelpers";

const validationHelper = <T>(
  schema: Record<string, unknown>
): Helper<[NextApiRequest, NextApiResponse<any>], T> => (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const validated = validateRequestBodyUnsafe<T>(req, res, schema);
  if (validated.isSuccess()) {
    return validated.value;
  }
  validated.whenFailure(console.error);
  throw new Error("Failed validation");
};

export default validationHelper;
