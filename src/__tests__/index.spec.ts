import { expect, test } from '@rstest/core';
import NormalizeUndefined from '../index';

test('NormalizeUndefined converts null to undefined in nested objects', () => {
  const input = {
    value: null,
    nested: {
      a: null,
      b: 0,
      c: [
        null,
        1,
        {
          x: null,
        },
      ],
    },
    list: [
      null,
      {
        d: null,
      },
      [
        null,
      ],
    ],
  };

  const result = NormalizeUndefined(input);

  expect(result).toEqual({
    value: undefined,
    nested: {
      a: undefined,
      b: 0,
      c: [
        undefined,
        1,
        {
          x: undefined,
        },
      ],
    },
    list: [
      undefined,
      {
        d: undefined,
      },
      [
        undefined,
      ],
    ],
  });
});

test('NormalizeUndefined preserves primitives and undefined', () => {
  expect(NormalizeUndefined(42)).toBe(42);
  expect(NormalizeUndefined('test')).toBe('test');
  expect(NormalizeUndefined(undefined)).toBeUndefined();
});
