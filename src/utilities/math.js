export function isNumber(anything) {
  if (isNaN(anything)) return false;
  return typeof anything === 'number';
}
