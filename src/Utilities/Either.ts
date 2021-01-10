export type Either<L, R> = Success<L, R> | Failure<L, R>;

interface EitherComponent<S, F> {
  isSuccess(): boolean;
  isFailure(): boolean;
  whenSuccess<B>(func: (s: S) => B): Either<B, F>;
  whenFailure<B>(func: (f: F) => B): Either<S, B>;
  whenSuccessAsync<B>(func: (s: S) => Promise<B>): Promise<Either<B, F>>;
  whenFailureAsync<B>(func: (f: F) => Promise<B>): Promise<Either<S, B>>;
}

export class Success<S, F> implements EitherComponent<S, F> {
  readonly value: S;

  constructor(value: S) {
    this.value = value;
  }

  isSuccess(): this is Success<S, F> {
    return true;
  }

  isFailure(): this is Failure<S, F> {
    return false;
  }

  whenSuccess<B>(func: (s: S) => B): Either<B, F> {
    return new Success(func(this.value));
  }

  whenFailure<B>(_: (f: F) => B): Either<S, B> {
    return this as any;
  }

  async whenSuccessAsync<B>(func: (s: S) => Promise<B>): Promise<Either<B, F>> {
    return new Success(await func(this.value));
  }

  async whenFailureAsync<B>(_: (f: F) => Promise<B>): Promise<Either<S, B>> {
    return this as any;
  }
}

export class Failure<S, F> implements EitherComponent<S, F> {
  readonly value: F;

  constructor(value: F) {
    this.value = value;
  }

  isSuccess(): this is Success<S, F> {
    return false;
  }

  isFailure(): this is Failure<S, F> {
    return true;
  }

  whenSuccess<B>(_: (s: S) => B): Either<B, F> {
    return this as any;
  }

  whenFailure<B>(func: (f: F) => B): Either<S, B> {
    return new Failure(func(this.value));
  }

  async whenSuccessAsync<B>(_: (s: S) => Promise<B>): Promise<Either<B, F>> {
    return this as any;
  }

  async whenFailureAsync<B>(func: (f: F) => Promise<B>): Promise<Either<S, B>> {
    return new Failure(await func(this.value));
  }
}

export const success = <S, F>(s: S): Either<S, F> => new Success<S, F>(s);

export const failure = <S, F>(f: F): Either<S, F> => new Failure<S, F>(f);
