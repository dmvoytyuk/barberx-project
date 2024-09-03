const deepEqualFn = (
  objA: Record<string, any>,
  objB: Record<string, any>
): boolean => {
  if (objA === objB) return true;

  if (
    typeof objA !== 'object' ||
    typeof objB !== 'object' ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  const keysOfA = Object.keys(objA);
  const keysOfB = Object.keys(objB);

  if (keysOfA.length !== keysOfB.length) return false;

  for (const key of keysOfA) {
    const value_A = objA[key];
    const value_B = objB[key];

    if (!keysOfB.includes(key)) return false; // comparing keys structure

    if (typeof value_A !== typeof value_B) return false; // comparing value types

    if (typeof value_A === 'object') {
      if (
        !deepEqualFn(
          value_A as Record<string, any>,
          value_B as Record<string, any>
        )
      )
        return false;
    } else if (typeof value_A === 'function') {
      if (value_A.toString() !== (value_B as Function).toString()) return false;
    } else {
      if (value_A !== value_B) return false;
    }
  }

  return true;
};

export default deepEqualFn;
