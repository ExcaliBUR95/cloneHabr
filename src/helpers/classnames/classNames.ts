type Mods = Record<string, boolean | string>;
//рекорд позволяет указывать ключем число, либо булевое значение, а значением строку (специальный тайпскриптовый класс(тип))

export function classNames(
  cls: string,
  mods: Mods,
  additional: string[]
): string {
  return [
    cls,
    ...additional,
    ...Object.entries(mods)
      .filter(([className, value]) => Boolean(value))
      .map(([className, value]) => className),
  ].join(" ");
}

classNames("remove-btn", { hovered: false, selectable: true, red: false }, [
  "pdg",
]);
