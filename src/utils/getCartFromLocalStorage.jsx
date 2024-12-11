const getCartFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};
export default getCartFromLocalStorage;
