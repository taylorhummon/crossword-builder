import { SuggestionsRequestData } from 'models/suggestions/type';
import { serverBaseUrl, serverPort } from 'environment/server';
import { isSuggestableCharacter, SuggestableCharacter } from 'utilities/character';


export async function fetchSuggestions(
  requestData: SuggestionsRequestData
): Promise<Array<SuggestableCharacter>> {
  try {
    const url = `${serverBaseUrl}:${serverPort}/make_suggestions`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData)
    };
    const response = await fetch(url, options);
    if (! response.ok) throw new Error(`Response status: ${response.status}`);
    const jsonHash = await response.json();
    return deserializeSuggestions(jsonHash);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function deserializeSuggestions(
  jsonHash: any
): Array<SuggestableCharacter> {
  if (! Array.isArray(jsonHash)) throw new Error('Expected response to be an array', jsonHash);
  return jsonHash.filter(isSuggestableCharacter);
}
