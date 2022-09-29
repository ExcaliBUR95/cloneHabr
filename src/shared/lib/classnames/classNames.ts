type Mds = Record<string, boolean | string>;

export function classNames(
  cls: string,
  mods?: Mds,
  additional?: string[]
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
