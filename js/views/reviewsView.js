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

  scrollIntoReview(card) {
    card.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  changeDotsState(currentSlide) {
    const dots = [...document.querySelectorAll(".reviews__pagination__dot")];
    dots.forEach((dot) =>
      dot.classList.remove("reviews__pagination__dot__active")
    );

    const activeDot = document.querySelector(
      `.reviews__pagination__dot[data-slide="${currentSlide}"]`
    );
    activeDot.classList.add("reviews__pagination__dot__active");
  }

  addDotsHandler() {
    let currentSlide = 1;
    this.changeDotsState(currentSlide);

    let targetCard = document.querySelector(
      `.review[data-review="${currentSlide}"]`
    );

    setTimeout(() => {
      this._observerCards();
    }, 1000);

    this.scrollIntoReview(targetCard);

    this._pagination_container.addEventListener("click", (e) => {
      if (e.target.classList.contains("reviews__pagination__dot")) {
        currentSlide = e.target.dataset.slide;
        targetCard = document.querySelector(
          `.review[data-review="${currentSlide}"]`
        );
        this.changeDotsState(currentSlide);
      }

      this.scrollIntoReview(targetCard);
    });
  }

  _observerCards() {
    const cards = [...document.querySelectorAll(".review")];

    const options = {
      root: this._review_container,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.changeDotsState(entry.target.dataset.review);
        }
      });
    }, options);

    cards.forEach((card) => observer.observe(card));
  }
}
