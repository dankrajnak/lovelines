import { Either, failure, success } from "../Utilities/Either";

export type Helper<P extends unknown[], R> = (...args: P) => R;

const withHelpers = <
  P extends unknown[],
  Q extends Record<string, Helper<P, unknown>>,
  R
>(
  helpers: Q,
  func: (
    extras: {
      [S in keyof Q]: ReturnType<Q[S]> extends Promise<infer PR>
        ? PR
        : NonNullable<ReturnType<Q[S]>>;
    },
    ...args: P
  ) => Promise<R> | R
) => async (...args: P): Promise<Either<R, unknown>> => {
  try {
    const objs = await Promise.all(
      Object.keys(helpers).map(async (key) => ({
        [key]: await helpers[key](...args),
      }))
    );

    return success(await func(Object.assign({}, ...objs), ...args));
  } catch (error) {
    return failure(error);
  }
};

export default withHelpers;
