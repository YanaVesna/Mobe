const getAnalogLocalStorage = () => {
  const data = localStorage.getItem("analog");
  return data ? JSON.parse(data) : [];
};
export default getAnalogLocalStorage;
