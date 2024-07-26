type CssModule = {
  [className: string]: string;
}

export function buildClassString(
  cssModule: CssModule,
  classNamesToEncode?: Array<string>,
  classNamesPassThrough?: Array<string>
): string {
  if (! classNamesToEncode) classNamesToEncode = [];
  if (! classNamesPassThrough) classNamesPassThrough = [];
  const classNamesEncoded = classNamesToEncode.map((className) => cssModule[className]);
  return (classNamesEncoded.concat(classNamesPassThrough)).join(" ");
}
