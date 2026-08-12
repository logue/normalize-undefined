type NormalizeUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? NormalizeUndefined<U>[]
    : T extends Record<string, any>
      ? { [K in keyof T]: NormalizeUndefined<T[K]> }
      : T;

/**
 * Recursively converts `null` values to `undefined` inside arrays and plain objects.
 *
 * @param value - Any value to normalize.
 * @returns The normalized value with `null` replaced by `undefined`.
 */
const NormalizeUndefined = <T>(input: T): NormalizeUndefined<T> => {
  if (input === null) {
    return undefined as any;
  }
  if (Array.isArray(input)) {
    return input.map(NormalizeUndefined) as any;
  }
  if (typeof input === 'object') {
    return Object.fromEntries(
      Object.entries(input).map(([k, v]) => [
        k,
        NormalizeUndefined(v),
      ]),
    ) as any;
  }
  return input as any;
};

export default NormalizeUndefined;
