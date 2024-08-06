import { SuggestionsRequestData } from 'models/suggestions/type';
import { serverBaseUrl, serverPort } from 'environment/server';
import { SUGGESTION_REGULAR_EXPRESSION } from 'utilities/alphabet';


export async function fetchSuggestions(
  requestData: SuggestionsRequestData
): Promise<Array<string>> {
  try {
    const url = `${serverBaseUrl}:${serverPort}/suggestions_lists`;
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
): Array<string> {
  if (! Array.isArray(jsonHash)) throw new Error('Expected response to be an array', jsonHash);
  const suggestions = [] as Array<string>;
  for (const entry of jsonHash) {
    if (typeof entry === "string" && SUGGESTION_REGULAR_EXPRESSION.test(entry)) {
      suggestions.push(entry);
    }
  }
  return suggestions;
}
