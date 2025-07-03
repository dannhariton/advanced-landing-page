import View from "../views/View.js";

export default class FeaturedHouseView extends View {
  _parentElement = document.querySelector(".featured-house__cards");
  _nextBtn = document.querySelector(".btn--next");
  _prevBtn = document.querySelector(".btn--prev");
  _currentSlide = 0;
  _maxSlide;

  render(data) {
    const markup = this._generateMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkup(data) {
    let markup = ``;

    data.forEach((house) => {
      markup += `
    <div class="house-card">
      <img
        src="${house.houseImageURL}"
        alt="house card image"
        class="house-card__image"
      />

      <div
        class="house-card__label label label--${house.label.type} label-style-text label-style-text--medium"
      >
        <svg class="label__icon">
          <use href="assets/icons.svg#${house.label.icon}"></use></svg
        >${house.label.name}
      </div>

      <div class="house-card__heading">
        <h3 class="house-card__heading-title heading-3">${house.title}</h3>
        <h4 class="house-card__heading-price heading-4">${house.price}</h4>
      </div>

      <div class="house-card__user">
        <img
          src="${house.userInformation.userImageURL}"
          alt="house card image"
          class="house-card__user-image"
        />
        <div class="house-card__user-information">
          <p class="house-card__user-name subtitle">${house.userInformation.name}</p>
          <p class="house-card__user-location label-style-text">
            ${house.userInformation.location}
          </p>
        </div>
      </div>
    </div>`;
    });

    return markup;
  }

  sliderButtonsState(pBtn, nBtn, curr, max) {
    nBtn.classList.remove("btn--outline");
    pBtn.classList.remove("btn--outline");

    if (curr === 0) {
      pBtn.classList.add("btn--outline");
      nBtn.classList.remove("btn--outline");
    } else if (curr === max - 3) {
      pBtn.classList.remove("btn--outline");
      nBtn.classList.add("btn--outline");
    }

    if (curr === 0) {
      pBtn.classList.add("btn--outline");
      nBtn.classList.remove("btn--outline");
    } else if (curr === max - 3) {
      pBtn.classList.remove("btn--outline");
      nBtn.classList.add("btn--outline");
    }
  }

  sliderButtons() {
    const slides = document.querySelectorAll(".house-card");

    this._maxSlide = slides.length;

    const prevSlide = function () {
      if (this._currentSlide === 0) {
        this._prevBtn.disabled = true;
      } else {
        this._currentSlide--;
      }
      this._prevBtn.disabled = false;
      this.sliderButtonsState(
        this._prevBtn,
        this._nextBtn,
        this._currentSlide,
        this._maxSlide
      );

      this._parentElement.style.transform = `translateX(-${
        this._currentSlide * 39
      }rem)`;
    };

    const nextSlide = function () {
      if (this._currentSlide === this._maxSlide - 3) {
        this._nextBtn.disabled = true;
      } else {
        this._currentSlide++;
      }

      this._nextBtn.disabled = false;
      this.sliderButtonsState(
        this._prevBtn,
        this._nextBtn,
        this._currentSlide,
        this._maxSlide
      );

      this._parentElement.style.transform = `translateX(-${
        this._currentSlide * 39
      }rem)`;
    };

    this._prevBtn.addEventListener("click", prevSlide.bind(this));
    this._nextBtn.addEventListener("click", nextSlide.bind(this));
  }

  changeButtonState(buttons, clickedButton) {
    buttons.forEach((btn) => {
      btn.disabled = false;
      btn.classList.remove("btn--active");
    });

    clickedButton.classList.add("btn--active");
    clickedButton.disabled = true;
  }

  filterButtons(handler) {
    const filterBtns = document.querySelectorAll(".btn--filter");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this._parentElement.innerHTML = "";
        const type = e.target.dataset.filter;
        handler(type);
        this.changeButtonState(filterBtns, btn);
        this._parentElement.style.transform = "translateX(0)";

        this._currentSlide = 0;
        this.sliderButtonsState(
          this._prevBtn,
          this._nextBtn,
          this._currentSlide,
          this._maxSlide
        );
      });
    });
  }
}
