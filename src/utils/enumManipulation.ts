import { mapObjectValues } from "./array";
import { stableSort } from "./array";

/* This function is responsible for transformation of enum to Object.
 *
 * Usage:
 * Typescript has a problem with checking types from enum, so thanks to this function we can transform an enum
 * to classic javascript object with the same values as enum values and we do not have to write "as ...", but the
 * typescript will automatically infer types.
 *
 * This function is useful mainly for interaction with backend, so once we have generated enums from a schema,
 * we transform them into an object and use them around the app and we have always 100% typescript check when
 * we use those values.
 */
export const enumToObject = <T extends Record<any, any>>(tsEnum: T) =>
  mapObjectValues((v) => v, tsEnum) as { [K in keyof T]: T[K] };

//TODO: Add types
export const stableEnumValues = <Key extends string, Value extends string>(
  obj: Record<string, Value>
) => stableSort(Object.values(enumToObject(obj)));
