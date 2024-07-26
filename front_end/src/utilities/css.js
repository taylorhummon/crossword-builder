export function buildClassString(cssModule, classNamesToEncode, classNamesPassThrough) {
  if (typeof classNamesToEncode === "string" || classNamesPassThrough === "string") {
    throw new Error("buildClassString expects an arrays of strings, not individual strings");
  }
  if (! classNamesToEncode) classNamesToEncode = [];
  if (! classNamesPassThrough) classNamesPassThrough = [];
  const classNamesEncoded = classNamesToEncode.map((className) => cssModule[className]);
  return (classNamesEncoded.concat(classNamesPassThrough)).join(" ");
}
