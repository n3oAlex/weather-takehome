export const mapObjectValues = <Key extends string, Value, NewValue>(
  fn: (value: Value, key: Key) => NewValue,
  obj: Record<Key, Value>
) =>
  Object.fromEntries(
    (Object.entries(obj) as [Key, Value][]).map(([key, value]) => [key, fn(value, key)], obj)
  ) as Record<Key, NewValue>;
