export type Await<T> = T extends Promise<infer U> ? U : never;

export type EnumToRecord<T extends Record<string, any>> = { [K in keyof T]: T[K] };
