// dateRangeFunctions.js
const filterDataByDateRange = (data, selectedDateRange) => {
  const today = new Date();
  return data.filter((item) => {
    const itemDate = new Date(item.date_day);

    switch (selectedDateRange) {
      case "today":
        return (
          itemDate.getDate() === today.getDate() &&
          itemDate.getMonth() === today.getMonth() &&
          itemDate.getFullYear() === today.getFullYear()
        );

      case "thisWeek":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - today.getDay() + 6);

        return itemDate >= startOfWeek && itemDate <= endOfWeek;

      case "thisMonth":
        return (
          itemDate.getMonth() === today.getMonth() &&
          itemDate.getFullYear() === today.getFullYear()
        );

      case "thisYear":
        return itemDate.getFullYear() === today.getFullYear();

      default:
        return true;
    }
  });
};

export { filterDataByDateRange };
