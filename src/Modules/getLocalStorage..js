const getLocalStorage = (key, initialValue) => {
  const saved = localStorage.getItem(key);

  if (saved) {
    return JSON.parse(saved);
  }

  console.log("saved")

  if (initialValue instanceof Function) {
    return initialValue();
  }

  localStorage.setItem(key, JSON.stringify(initialValue));
  return initialValue;
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getLocalStorage, setLocalStorage };
