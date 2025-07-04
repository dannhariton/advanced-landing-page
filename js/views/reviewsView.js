import View from "../views/View.js";

export default class ReviewsView extends View {
  _parentElement = document.querySelector(".reviews__container");
  _pagination_container = document.querySelector(".reviews__pagination");

  render(data) {
    const markup = this._generateMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup(data) {
    let markup = ``;

    data.forEach((review, i) => {
      markup += `
    <div class="review" data-review="${i}">
      <div class="review__house-image-container">
      <img
          src="${review.houseImageURL}"
          alt="house image"
          class="review__house-image"
        />
      </div>
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
    </div>`;
    });

    return markup;
  }

  addHandlerRender(handler) {
    handler();
  }

  createDots() {
    const reviews = [...this._parentElement.children];

    reviews.forEach((_, i) => {
      this._pagination_container.insertAdjacentHTML(
        "beforeend",
        `<button class="reviews__pagination__dot" data-slide="${i}"></button>`
      );
    });
  }

  changeDotsState(currentSlide) {
    const dots = [...document.querySelectorAll(".reviews__pagination__dot")];
    const activeDot = document.querySelector(
      `.reviews__pagination__dot[data-slide="${currentSlide}"]`
    );

    dots.forEach((d) => d.classList.remove("reviews__pagination__dot__active"));
    activeDot.classList.add("reviews__pagination__dot__active");
  }

  scrollToActive(card, container) {
    const cardWidth = card.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollLeft = card.offsetLeft - containerWidth / 2 + cardWidth / 2;
    container.scrollLeft = scrollLeft;
  }

  checkActiveDot() {
    const container = document.querySelector(".reviews__container-wrapper");
    let scrollTimeout;
    let activeCard;

    const cards = [...document.querySelectorAll(".review")];

    container.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        for (let card = 0; card < cards.length; card++) {
          const element = cards[card];
          if (this.isElementCentered(element)) {
            element.classList.add("card-active");
            activeCard = element;
          } else {
            element.classList.remove("card-active");
          }
        }
        this.changeDotsState(activeCard.dataset.review);
      }, 100);
    });
  }

  addDotsHandler() {
    let currentElement = 1;
    let targetCard = document.querySelector(
      `.review[data-review="${currentElement}"]`
    );
    const container = document.querySelector(".reviews__container-wrapper");
    targetCard.classList.add("card-active");

    if (!this.isElementCentered(targetCard)) {
      this.scrollToActive(targetCard, container);
      this.changeDotsState(currentElement);
    }

    this._pagination_container.addEventListener("click", (e) => {
      if (e.target.classList.contains("reviews__pagination__dot")) {
        currentElement = e.target.dataset.slide;
        targetCard.classList.remove("card-active");
        targetCard = document.querySelector(
          `.review[data-review="${currentElement}"]`
        );
        targetCard.classList.add("card-active");

        this.scrollToActive(targetCard, container);
      }
      this.changeDotsState(targetCard.dataset.review);
    });
  }

  isElementCentered(element) {
    const elementRect = element.getBoundingClientRect();
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;

    const elementCenterX = elementRect.left + elementRect.width / 2;
    const viewportCenterX = viewportWidth / 2;

    const distanceToCenter = Math.abs(viewportCenterX - elementCenterX);
    const tolerance = 30;

    return distanceToCenter <= tolerance;
  }
}
