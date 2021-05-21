import { indicesArray } from './indices_array';

function buildAlphabet() {
  return indicesArray(26).map(
    i => String.fromCharCode(65 + i)
  );
}

export default buildAlphabet;