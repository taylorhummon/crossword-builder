function computeSubpatterns(pattern) {
  const index = pattern.indexOf('@');
  if (index === -1) throw new Error('Did not find @ in pattern');
  const leftPoints = [];
  for (let i = 0; i < index; i++) {
    if (pattern[i] === '.') leftPoints.push(i + 1);
  }
  leftPoints.unshift(0);
  const rightPoints = [];
  for (let i = index + 1; i < pattern.length; i++) {
    if (pattern[i] === '.') rightPoints.push(i);
  }
  rightPoints.push(pattern.length);
  const subpatterns = [];
  for (const leftPoint of leftPoints) {
    for (const rightPoint of rightPoints) {
      subpatterns.push(pattern.substring(leftPoint, rightPoint));
    }
  }
  subpatterns.sort(
    (subpatternA, subpatternB) => subpatternA.length - subpatternB.length
  );
  return subpatterns;
}

export default computeSubpatterns;