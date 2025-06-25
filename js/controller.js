import * as model from "../js/model.js";
import FeaturedHouseView from "./views/featuredHouseView.js";
import FindMore from "./views/findMore.js";
import FormView from "./views/formView.js";
import ReviewsView from "./views/reviewsView.js";

const featuredHouseView = new FeaturedHouseView();
const reviewsView = new ReviewsView();
const formView = new FormView();
const findMore = new FindMore();

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
  reviewsView.createDots();
  reviewsView.addDotsHandler();
};

const controlTextarea = async function () {
  formView.updateCharCount();
};

const controlSelect = async function () {
  formView.selectOption();
};

const controlArticles = async function () {
  // TODO: add cache once featured house is merged

  let data = await model.handleArticles();
  findMore.render(data);
  findMore.renderMainArticle();
  findMore.onButtonClick();
  findMore.onArticleClick();
};

const init = async function () {
  featuredHouseView.addHandlerRender(controlHouseCards);
  featuredHouseView.filterButtons(controlHouseCards);
  reviewsView.addHandlerRender(controlReviews);
  formView.checkTextLimit(controlTextarea);
  controlSelect();
  controlArticles();
};
init();
