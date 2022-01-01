export function MapVariable<T>(A: any, pattern: any): T {
  const result: any = {};
  for (const property in A) {
    const corresponding_property: string = pattern[property];
    if (!corresponding_property) {
      result[property] = A[property];
    } else {
      result[corresponding_property] = A[property];
    }
  }
  return result as T;
}
