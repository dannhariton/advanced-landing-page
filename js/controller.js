import * as model from "../js/model.js";
import FeaturedHouseView from "./views/featuredHouseView.js";

const featuredHouseView = new FeaturedHouseView();

const controlHouseCards = async function () {
  const data = await model.handleHouseData();
  featuredHouseView.render(data);
};

const controlHouseCardsButtons = async function () {
  featuredHouseView.sliderButtons();
};

const init = async function () {
  await controlHouseCards();
  controlHouseCardsButtons();
};
init();
