export const ASK_AI_API_KEY: Array<string> = (() => {
  try {
    return JSON.parse(process.env.ASK_AI_API_KEY!);
  } catch {
    return [];
  }
})();

export const AI_EMBEDDING_API_KEY: Array<string> = (() => {
  try {
    return JSON.parse(process.env.ASK_AI_EMBEDDING_API_KEY!);
  } catch {
    return [];
  }
})();
