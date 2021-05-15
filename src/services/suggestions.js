
function computeHorizontalSuggestions(squares, activeIndex, boardWidth) {
  const patternAndIndex = computePatternAndIndex(squares, activeIndex, boardWidth);
  const suggestions = findSuggestions(patternAndIndex.pattern, patternAndIndex.index);
  console.log('SUGGESTIONS', suggestions);
  return suggestions;
}

function computePatternAndIndex(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  const leftIndex = findLeftIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  const rightIndex = findRightIndex(squares, boardWidth, activeIndexRow, activeIndexColumn);
  return {
    pattern: computePattern(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex),
    index: activeIndexColumn - leftIndex
  };
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

function computePattern(squares, boardWidth, activeIndexRow, activeIndexColumn, leftIndex, rightIndex) {
  let pattern = '';
  for (let i = leftIndex; i <= rightIndex; i++) {
    if (i === activeIndexColumn) {
      pattern += '.';
    } else {
      const char = squareAt(squares, boardWidth, i, activeIndexRow);
      if (char === null) {
        pattern += '.';
      } else {
        pattern += char.toLowerCase();
      }
    }
  }
  return pattern;
}

function squareAt(squares, boardWidth, i, j) {
  return squares[j * boardWidth + i];
}

function findSuggestions(pattern, index) {
  const regExp = new RegExp(`^${pattern}$`);
  const resultsSet = new Set();
  for (const word of dictionary) {
    if (regExp.test(word)) resultsSet.add(word[index]);
  }
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