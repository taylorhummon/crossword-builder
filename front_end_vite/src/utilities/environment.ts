interface LookupInEnvironmentProps<T> {
  environmentVariable: string;
  defaultValue: T;
  clean: (uncleanValue: string | undefined, defaultValue: T) => T;
}

export function lookupInEnvironment<T>({
  environmentVariable,
  defaultValue,
  clean,
}: LookupInEnvironmentProps<T>): T {
  const uncleanValue = import.meta.env[environmentVariable];
  return clean(uncleanValue, defaultValue);
}
