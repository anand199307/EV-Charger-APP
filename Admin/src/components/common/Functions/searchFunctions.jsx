const normalizeSearchTerm = (term) => String(term)?.toLowerCase().trim();

const filterDataBySearch = (tableData, searchTerm) => {
  if (!Array.isArray(tableData)) {
    return [];
  }

  const normalizedSearchTerm = normalizeSearchTerm(searchTerm);

  const filteredData = tableData?.filter(
    (item) =>
      item?.host_name?.toLowerCase().includes(normalizedSearchTerm) ||
      item?.name?.toLowerCase().includes(normalizedSearchTerm) ||
      String(item?.wallet_id).includes(normalizedSearchTerm) ||
      String(item?.acnt_number).includes(normalizedSearchTerm) ||
      String(item?.ifsc_code).includes(normalizedSearchTerm) ||
      String(item?.num).includes(normalizedSearchTerm)
  );
  return filteredData;
};

export { normalizeSearchTerm, filterDataBySearch };
