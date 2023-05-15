import { Notify } from "notiflix";
import { getData } from "../api";
import { userIdMarkup, createAlbumList } from "../markup";
import { btnForward, jsUserTableEl, jsalbumEl } from "../refs";
import {
  addMarkup,
  getFromLocalStorage,
  goForward,
  setToLoacalStorage,
} from "../utils";

const searchParams = new URLSearchParams(location.search);
const userId = searchParams.get("user-id");

async function getUser() {
  try {
    const userData = await getData(`users/${userId}`);
    const markup = userIdMarkup(userData);
    addMarkup(markup, jsUserTableEl);
  } catch (error) {
    Notify.failure(error.message);
  }
}

async function getAlbums() {
  try {
    const albumsData = await getData(`albums?userId=${userId}`);
    const markup = createAlbumList(albumsData);
    addMarkup(markup, jsalbumEl);
  } catch (error) {
    Notify.failure(error.message);
  }
}

function toggleBtnVisibility() {
  const isAlbumId = getFromLocalStorage("albumId");
  if (isAlbumId.length) btnForward.classList.remove("hidden");
}

function onClick(e) {
  const liAlbum = e.target.closest(".js-list-user-album");
  if (liAlbum.nodeName !== "LI") {
    return;
  }

  const albumId = liAlbum.getAttribute("data-id");

  location.href = `album.html?album-id=${albumId}`;
}

function onWindowLoad() {
  getUser();
  getAlbums();
  toggleBtnVisibility();
}

jsalbumEl.addEventListener("click", onClick);
btnForward.addEventListener("click", goForward);
window.addEventListener("load", onWindowLoad);
