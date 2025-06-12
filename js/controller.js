import * as model from "../js/model.js";
import FeaturedHouseView from "./views/featuredHouseView.js";

const featuredHouseView = new FeaturedHouseView();

const controlHouseCards = async function (type) {
  let data = await model.handleHouseData();

  if (type === "villa") {
    data = await model.handleVillaData();
  }

  if (type === "apartment") {
    data = await model.handleApartmentData();
  }

  featuredHouseView.render(data);
  featuredHouseView.sliderButtons();
};

const init = async function () {
  await controlHouseCards();
  featuredHouseView.filterButtons(controlHouseCards);
};
init();
