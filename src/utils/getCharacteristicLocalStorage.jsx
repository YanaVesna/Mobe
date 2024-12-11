const getCharacteristicLocalStorage = () => {
  const data = localStorage.getItem("characteristic");
  return data ? JSON.parse(data) : [];
};
export default getCharacteristicLocalStorage;
