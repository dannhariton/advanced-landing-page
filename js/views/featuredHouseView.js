import View from "../views/View.js";

export default class FeaturedHouseView extends View {
  _parentElement = document.querySelector(".featured-house__cards");

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

  sliderButtons() {
    const slides = document.querySelectorAll(".house-card");
    const nextBtn = document.querySelector(".btn--next");
    const prevBtn = document.querySelector(".btn--prev");
    let currentSlide = 0;
    const maxSlide = slides.length;

    // slides.forEach((s, i) => {
    //   s.style.transform = `translateX(${i * 100}%)`;
    // });

    const prevSlide = function () {
      if (currentSlide === 0) {
        prevBtn.disabled = true;
      } else {
        currentSlide--;
      }

      prevBtn.disabled = false;
      nextBtn.classList.remove("btn--outline");
      prevBtn.classList.remove("btn--outline");

      if (currentSlide === 0) {
        prevBtn.classList.add("btn--outline");
        nextBtn.classList.remove("btn--outline");
      } else if (currentSlide === maxSlide - 3) {
        prevBtn.classList.remove("btn--outline");
        nextBtn.classList.add("btn--outline");
      }

      // slides.forEach((s, i) => {
      //   s.style.transform = `translateX(${(i - currentSlide) * 39}rem)`;
      // });

      this._parentElement.style.transform = `translateX(-${
        currentSlide * 39
      }rem)`;
    };

    const nextSlide = function () {
      if (currentSlide === maxSlide - 3) {
        nextBtn.disabled = true;
      } else {
        currentSlide++;
      }

      nextBtn.disabled = false;
      nextBtn.classList.remove("btn--outline");
      prevBtn.classList.remove("btn--outline");

      if (currentSlide === 0) {
        prevBtn.classList.add("btn--outline");
        nextBtn.classList.remove("btn--outline");
      }
      if (currentSlide === maxSlide - 3) {
        prevBtn.classList.remove("btn--outline");
        nextBtn.classList.add("btn--outline");
      }

      this._parentElement.style.transform = `translateX(-${
        currentSlide * 39
      }rem)`;
      // slides.forEach((s, i) => {
      //   s.style.transform = `translateX(${(i - currentSlide) * 39}rem)`;
      // });
    };

    prevBtn.addEventListener("click", prevSlide.bind(this));
    nextBtn.addEventListener("click", nextSlide.bind(this));
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
      });
    });
  }
}
