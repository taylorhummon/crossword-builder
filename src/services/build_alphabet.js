import indicesArray from './indices_array';

function buildAlphabet() {
  return indicesArray(26).map(i => String.fromCharCode(97 + i));
}

export default buildAlphabet;