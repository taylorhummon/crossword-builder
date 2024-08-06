import { RequestData } from '../declarations';


export async function fetchSuggestions(
  requestData: RequestData
): Promise<Array<string>> {
  try {
    const baseServerUri = process.env.REACT_APP_SERVER_URI;
    if (baseServerUri === undefined) {
      throw Error("REACT_APP_SERVER_URI environment variablem must be set");
    }
    const url = `${baseServerUri}/suggestions_lists`;
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

const SUGGESTION_REGULAR_EXPRESSION = /^([A-Z]|~)$/;

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
