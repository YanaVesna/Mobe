const getSort = (array, data) => {
  const sortedData = array.slice().sort((a, b) => {
    const dateA = new Date(a[data]).getTime();
    const dateB = new Date(b[data]).getTime();
    return dateB - dateA;
  });

  return sortedData;
};

export default getSort;
