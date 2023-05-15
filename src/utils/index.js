export function addMarkup(markup, elem) {
  elem.innerHTML = markup;
}

export function setToLoacalStorage(varName, id) {
  localStorage.setItem(varName, id);
}

export function removeFromLoacalStorage(varName) {
  localStorage.removeItem(varName);
}

export function getFromLocalStorage(varName) {
  const res = localStorage.getItem(varName);
  if (res === null) return [];
  return res;
}

export function goBack() {
  history.back();
}

export function goForward() {
  console.log("2");
  history.forward();
}
