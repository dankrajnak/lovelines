import { NextApiResponse } from "next";
import Ajv, { JSONSchemaType, DefinedError } from "ajv";
import addFormats from "ajv-formats";

import { NextApiRequest } from "next-auth/_utils";
import { Either, success, failure } from "../Utilities/Either";

const ajv = new Ajv();
addFormats(ajv as any);

export type ErrorResponse = {
  message: string;
};

const errorsToResponse = (errors: DefinedError[]): ErrorResponse => {
  console.log(JSON.stringify(errors, null, 2));
  return {
    message: errors
      .map((error) => `${error.dataPath}: ${error.message}`)
      .join("; \n"),
  };
};

export const validate = <T>(
  body: unknown,
  schema: JSONSchemaType<T>
): { data: T; isValid: true } | { error: ErrorResponse; isValid: false } => {
  const validate = ajv.compile(schema);
  if (validate(body)) {
    return { data: body, isValid: true };
  } else {
    return {
      error: errorsToResponse(validate.errors as DefinedError[]),
      isValid: false,
    };
  }
};

export const validateRequest = <T>(
  body: unknown,
  res: NextApiResponse,
  schema: JSONSchemaType<T>
): Either<T, ErrorResponse> => {
  const validated = validate<T>(body, schema);
  if (validated.isValid) {
    return success(validated.data);
  } else {
    res.status(400).json(validated.error);
    return failure(validated.error);
  }
};

export const validateRequestBody = <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  schema: JSONSchemaType<T>
): Either<T, ErrorResponse> =>
  validateRequest(JSON.parse(req.body), res, schema);

export const validateRequestBodyUnsafe = <T>(
  req: NextApiRequest,
  res: NextApiResponse,
  schema: unknown
): Either<T, ErrorResponse> =>
  validateRequest(
    typeof req.body === "string" ? JSON.parse(req.body) : req.body,
    res,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    schema
  );

export default validateRequest;
