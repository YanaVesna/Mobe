const getTotalPriceFromLocalStorage = () => {
  const data = localStorage.getItem("totalPrice");
  return data ? JSON.parse(data) : [];
};
export default getTotalPriceFromLocalStorage;
