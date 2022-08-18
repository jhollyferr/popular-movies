import Toastify from "toastify-js";
/**
 *
 * @param {String} text
 * @param {String} type
 * @returns
 */
export const toast = (text, type) =>
  Toastify({
    text,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    className: type, // added to `.toast`
    style: {
      background: "var(--bgColor)",
    },
  }).showToast();
