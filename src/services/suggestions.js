
function computeHorizontalSuggestions(squares, activeIndex, boardWidth) {
  const pattern = computePattern(squares, activeIndex, boardWidth);
  console.log('PATTERN', pattern);
  const suggestions = findSuggestions(pattern);
  console.log('SUGGESTIONS', suggestions);
  return suggestions;
}

function computePattern(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return computePatternHelper(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex);
}

function findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn) {
  let leftIndex = activeIndexColumn;
  while (leftIndex - 1 >= 0 && squareAt(squares, boardWidth, leftIndex - 1, activeIndexRow) !== '\n') {
    leftIndex--;
  }
  return leftIndex;
}

function findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn) {
  let rightIndex = activeIndexColumn;
  while (rightIndex + 1 < boardWidth && squareAt(squares, boardWidth, rightIndex + 1, activeIndexRow) !== '\n') {
    rightIndex++;
  }
  return rightIndex;
}

function computePatternHelper(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex) {
  let pattern = '';
  for (let i = leftIndex; i <= rightIndex; i++) {
    const char = squareAt(squares, boardWidth, i, activeIndexRow);
    if (i === activeIndexColumn) {
      pattern += '@';
    } else if (char === null) {
      pattern += '?';
    } else {
      pattern += char.toLowerCase();
    }
  }
  return pattern;
}

function squareAt(squares, boardWidth, i, j) {
  return squares[j * boardWidth + i];
}

function findSuggestions(pattern) {
  const regExpPattern = pattern.split('').map(char => {
    if (char === '@') return '([a-z])';
    if (char === '?') return '[a-z]';
    return char;
  }).join('');
  const regExp = new RegExp(`^${regExpPattern}$`);
  const resultsSet = new Set();
  dictionary.forEach(word => {
    const info = regExp.exec(word);
    if (info !== null) {
      resultsSet.add(info[1]);
    }
  });
  const results = [...resultsSet];
  results.sort();
  return results;
}

const dictionary = [
  'dog',
  'cat',
  'rat',
  'sat',
  'fridge',
  'cake',
  'pie',
];

export default computeHorizontalSuggestions;