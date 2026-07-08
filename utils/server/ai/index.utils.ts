export const tryRotatedKey = async <T>({
  callback,
  keys,
}: {
  callback: (item: string) => Promise<T>;
  keys: Array<string>;
}): Promise<T> => {
  const items = keys.filter(Boolean);

  const start = Math.floor(Math.random() * items.length);

  for (let i = 0; i < items.length; i++) {
    const item = items[(start + i) % items.length];

    try {
      return await callback(item);
    } catch (err) {
      /* checking limit exit or not */
      if (err instanceof Error && "status" in err && err.status === 429)
        continue;
      throw err;
    }
  }

  throw new Error("Action failed for all items.");
};
