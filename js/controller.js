import * as model from "../js/model.js";
import FeaturedHouseView from "./views/featuredHouseView.js";

const featuredHouseView = new FeaturedHouseView();

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
  console.log(model.cache);

  featuredHouseView.render(data);
  featuredHouseView.sliderButtons();
};

const init = async function () {
  await controlHouseCards();
  featuredHouseView.filterButtons(controlHouseCards);
};
init();
