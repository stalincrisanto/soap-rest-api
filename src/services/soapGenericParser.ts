export const parseSoapDataset = (parsed: any): any[] | null => {
  const table = parsed?.DataSet?.diffgram?.NewDataSet?.Table;

  if (!table) return null;

  if (Array.isArray(table)) return table;

  return [table];
};
