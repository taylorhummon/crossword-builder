
function horizontalSuggestion(squares, activeIndex, boardWidth) {
  const activeIndexColumn = activeIndex % boardWidth;
  const activeIndexRow = (activeIndex - activeIndexColumn) / boardWidth;
  if (squares[activeIndex] === '\n') return; // !!! deal with this later
  let left = activeIndexColumn;
  while (left - 1 >= 0 && squares[activeIndexRow * boardWidth + left - 1] !== '\n') {
    left--;
  }
  let right = activeIndexColumn;
  while (right + 1 < boardWidth && squares[activeIndexRow * boardWidth + right + 1] !== '\n') {
    right++;
  }
  let regExpString = "";
  for (let i = left; i <= right; i++) {
    const char = squares[activeIndexRow * boardWidth + i];
    if (i === activeIndexColumn) {
      regExpString += "([a-z])";
    } else if (char === null) {
      regExpString += "[a-z]";
    } else {
      regExpString += char.toLowerCase();
    }
  }
  const regExp = new RegExp(`^${regExpString}$`);
  const resultsSet = new Set();
  dictionary.forEach(word => {
    const info = regExp.exec(word);
    if (info !== null) {
      resultsSet.add(info[1]);
    }
  });
  const results = [...resultsSet];
  results.sort();
  console.log('FOUND POSSIBLE COMPLETIONS', results);
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

export default horizontalSuggestion;