"use strict";
const cards = document.querySelectorAll(".activity .card");
const profileLinks = document.querySelectorAll(".profile .links li");
const profileActiveLink = document.querySelector(".profile .links li.active");
const data = getJsonData();
let timeframe = profileActiveLink.dataset.value;

// add active state to card
addActiveState(cards);
// add active state to profile link
addActiveState(profileLinks);
// change card data when click in profile link
profileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    timeframe = link.dataset.value;
    setDataCard(data, timeframe);
  });
});

window.onload = function () {
  setDataCard(data, timeframe);
};

function getJsonData() {
  return fetch("./data.json").then(function (response) {
    return response.status == 200 ? response.json() : false;
  });
}

function addActiveState(element) {
  element.forEach((el) => {
    el.addEventListener("click", () => {
      element.forEach((el) => el.classList.remove("active"));
      el.classList.add("active");
    });
  });
}

function setDataCard(arrayData, timeframe) {
  let frame = getFrame(timeframe);
  cards.forEach((card) => {
    const span = card.querySelector("span");
    const small = card.querySelector("small");
    arrayData.then(function (data) {
      data.forEach((d) => {
        if (d.hasOwnProperty("title")) {
          if (d.title.toLowerCase() == card.dataset.value.toLowerCase()) {
            span.innerText = `${d.timeframes[timeframe].current}hrs`;
            small.innerText = `last ${frame} - ${d.timeframes[timeframe].previous}hrs`;
          }
        }
      });
    });
  });
}

function getFrame(timeframe) {
  let frame = "";
  switch (timeframe) {
    case "daily":
      frame = "day";
      break;

    case "weekly":
      frame = "week";
      break;

    case "monthly":
      frame = "month";
      break;
  }
  return frame;
}
