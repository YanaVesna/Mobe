import { createAction } from "@reduxjs/toolkit";

export const LIKE_PRODUCT = "LIKE_PRODUCT";
export const DISLIKE_PRODUCT = "DISLIKE_PRODUCT";

export const likeProduct = createAction(LIKE_PRODUCT, (productId) => ({
  payload: {
    productId,
  },
}));

export const dislikeProduct = createAction(DISLIKE_PRODUCT, (productId) => ({
  payload: {
    productId,
  },
}));
