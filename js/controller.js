import * as model from "../js/model.js";
import FeaturedHouseView from "./views/featuredHouseView.js";
import ReviewsView from "./views/reviewsView.js";

const featuredHouseView = new FeaturedHouseView();
const reviewsView = new ReviewsView();

const controlHouseCards = async function (type = "house") {
  const cacheKey = `${type}Cards`;

  if (model.cache[cacheKey]) {
    featuredHouseView.render(model.cache[cacheKey]);
    featuredHouseView.sliderButtons();
    return;
  }

  let data;

  if (type === "house") {
    data = await model.fetchHouseData();
  }

  if (type === "villa") {
    data = await model.fetchVillaData();
  }

  if (type === "apartment") {
    data = await model.fetchApartmentData();
  }

  model.cache[cacheKey] = data;

  featuredHouseView.render(data);
  featuredHouseView.sliderButtons();
};

const controlReviews = async function () {
  let data = await model.handleReviews();
  reviewsView.render(data);
  reviewsView.createDots();
  reviewsView.addDotsHandler();
  reviewsView.checkActiveDot();
};

const init = async function () {
  featuredHouseView.addHandlerRender(controlHouseCards);
  featuredHouseView.filterButtons(controlHouseCards);
  reviewsView.addHandlerRender(controlReviews);
};
init();
