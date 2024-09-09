'use client';

import { useState } from 'react';

export const useBoolean = (
  defaultValue: unknown
): readonly [boolean, () => void, () => void, () => void] => {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = (): void => setValue(true);
  const setFalse = (): void => setValue(false);
  const toggle = (): void => setValue(current => !current);

  return [value, setTrue, setFalse, toggle];
};
