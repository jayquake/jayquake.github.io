let dataCache = null;

export async function fetchItemData(currentRule) {
  const data = await DataService.getData();
  const matchingItem = data.find((item) => item.route === currentRule);
  if (!matchingItem) {
    throw new Error(`Data Service - Item with ID ${currentRule} not found`);
  }
  return matchingItem;
}

export const DataService = {
  async getData() {
    if (dataCache) {
      return dataCache;
    }
    dataCache = (async () => {
      const response = await fetch("/data.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })().catch((err) => {
      dataCache = null;
      throw err;
    });
    return dataCache;
  },

  /** Clear cache (tests only). */
  clearCache() {
    dataCache = null;
  },
};
