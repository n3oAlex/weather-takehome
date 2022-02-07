export const pipe =
  (...functions: any[]) =>
  (args: any) =>
    functions.reduce((arg, fn) => fn(arg), args);

export const mapObjectValues = <Key extends string, Value, NewValue>(
  fn: (value: Value, key: Key) => NewValue,
  obj: Record<Key, Value>
) =>
  Object.fromEntries(
    (Object.entries(obj) as [Key, Value][]).map(([key, value]) => [key, fn(value, key)], obj)
  ) as Record<Key, NewValue>;

export const stableSort = <T extends string>(arr: T[]) => arr.sort((a, b) => a.localeCompare(b));

export const arraySumByKey = (array: any[], key: string) =>
  array.reduce((a, b) => a + (b[key] || 0), 0) ?? 0;
