/*
cookie: cart{
    'uuui-123-1':4,
    'uuui-123-2':2,
    'uuui-123-3':1,
    'uuui-123-4':3,
    'uuui-123-5':2,
    'uuui-123-6':1,
}
*/

import { getCookie, hasCookie, setCookie } from "cookies-next";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  } else {
    return {};
  }
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id]) {
    cookieCart[id] = cookieCart[id] + 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  delete cookieCart[id];

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id] >= 1) {
    cookieCart[id] = cookieCart[id] - 1;
  } else {
    delete cookieCart[id];
  }
  setCookie("cart", JSON.stringify(cookieCart));
};
