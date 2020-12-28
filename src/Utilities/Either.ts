export type Either<L, R> = Success<L, R> | Failure<L, R>;

interface EitherComponent<S, F> {
  isSuccess(): boolean;
  isFailure(): boolean;
  onSuccess<B>(func: (s: S) => B): Either<B, F>;
  onFailure<B>(func: (f: F) => B): Either<S, B>;
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

  onSuccess<B>(func: (l: S) => B): Either<B, F> {
    return new Success(func(this.value));
  }

  onFailure<B>(_: (f: F) => B): Either<S, B> {
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

  onSuccess<B>(_: (s: S) => B): Either<B, F> {
    return this as any;
  }

  onFailure<B>(func: (f: F) => B): Either<S, B> {
    return new Failure(func(this.value));
  }
}

export const success = <L, R>(l: L): Either<L, R> => new Success<L, R>(l);

export const failure = <L, R>(r: R): Either<L, R> => new Failure<L, R>(r);
