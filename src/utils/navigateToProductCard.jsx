import {
  setCategoryProduct,
  setCharacteristics,
  setAnalog,
} from "../redux/slices/cardSlice.js";

const navigateToProductCard = (dispatch, navigate, item, products) => {
  const category = item.category.name;
  const characteristics = item;
  const name = item.name;

  dispatch(setCategoryProduct(category));
  dispatch(setCharacteristics(characteristics));

  const jsonCharacteristic = JSON.stringify(characteristics);
  localStorage.setItem("characteristic", jsonCharacteristic);

  const analog = findMostSimilar(name, products);
  dispatch(setAnalog(analog));
  const jsonAnalog = JSON.stringify(analog);
  localStorage.setItem("analog", jsonAnalog);

  navigate(`/product-card/${item.id}`, { state: { product: item } });
};

export const findMostSimilar = (inputName, objects) => {
  let maxSimilarity = 0;
  let mostSimilarObject = null;

  objects.forEach((obj) => {
    if (obj.name !== inputName) {
      const similarity = calculateSimilarity(inputName, obj.name);
      if (
        similarity > maxSimilarity ||
        (similarity === maxSimilarity && obj.price > mostSimilarObject?.price)
      ) {
        maxSimilarity = similarity;
        mostSimilarObject = obj;
      }
    }
  });

  return mostSimilarObject;
};

export const calculateSimilarity = (str1, str2) => {
  const maxLength = Math.max(str1.length, str2.length);
  const commonLength = str1
    .split("")
    .filter((char, index) => char === str2[index]).length;

  return commonLength / maxLength;
};

export default navigateToProductCard;
