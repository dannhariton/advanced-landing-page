import * as model from "../js/model.js";
import FeaturedHouseView from "./views/featuredHouseView.js";
import ReviewsView from "./views/reviewsView.js";

const featuredHouseView = new FeaturedHouseView();
const reviewsView = new ReviewsView();

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

const controlReviews = async function () {
  let data = await model.handleReviews();
  reviewsView.render(data);
};

const init = async function () {
  featuredHouseView.addHandlerRender(controlHouseCards);
  featuredHouseView.filterButtons(controlHouseCards);
  reviewsView.addHandlerRender(controlReviews);
};
init();
