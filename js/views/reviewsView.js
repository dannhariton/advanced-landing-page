import View from "../views/View.js";

export default class ReviewsView extends View {
  _parentElement = document.querySelector(".reviews__container");

  render(data) {
    const markup = this._generateMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup(data) {
    let markup = ``;

    data.forEach((review) => {
      markup += `
    <div class="review">
      <div class="review__information">
        <div class="review__title">
          <h4 class="heading-4 review__title-heading">
             ${review.title}
          </h4>
          <p class="review__title-text label-style-text">
            ${review.description}
          </p>
        </div>
        <div class="review__user-container">
          <div class="review__user">
            <img
              src="${review.userInformation.userImageURL}"
              alt="user photo"
              class="review__user-photo"
            />
            <div class="review__user-info">
              <p
                class="review__user-name label-style-text label-style-text--semibold"
              >
             ${review.userInformation.name}
              </p>
              <p
                class="review__user-job label-style-text label-style-text--small"
              >
            ${review.userInformation.job}
              </p>
            </div>
          </div>
          <div class="review__rating">
            <svg class="review__rating-icon">
              <use href="assets/icons.svg#star"></use>
            </svg>
            <p class="review__rating-number heading-4">${review.rating}</p>
          </div>
        </div>
      </div>
      <img
        src="${review.houseImageURL}"
        alt="house image"
        class="review__house-image"
      />
    </div>`;
    });

    return markup;
  }

  addHandlerRender(handler) {
    handler();
  }
}
