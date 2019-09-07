export const persist = (key, value) => localStorage.setItem(key, JSON.stringify(value));
export const retrieve = (key, fallback = undefined) => JSON.parse(localStorage.getItem(key)) || fallback;
