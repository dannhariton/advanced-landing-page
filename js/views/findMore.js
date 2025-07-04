import View from "../views/View.js";

export default class FindMore extends View {
  _parentElement = document.querySelector(".find-more__articles");
  _mainArticleContainer = document.querySelector(".find-more__main-article");
  _showMoreButton = document.querySelector(".find-more__button");
  _numOfArticle = 3;
  _articles;

  render(data) {
    this._articles = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMainArticle(number) {
    const mainArticle = this._generateMainArticle(number);
    this._mainArticleContainer.insertAdjacentHTML("afterbegin", mainArticle);
  }

  _generateMarkup() {
    let markup = ``;

    this._articles.forEach((article, i) => {
      if (i >= this._numOfArticle) return;
      markup += `
      <div class="article" data-article="${i}">
        <img
          src="${article.imageUrl}"
          alt="house image"
          class="article__image"
        />
        <div class="article__right-side">
          <div class="article__user">
            <div>
              <img
                src="${article.authorImg}"
                alt="avatar"
                class="article__user-image"
              />
            </div>
            <p class="article__user-name label-style-text">
              ${article.author}
            </p>
          </div>
          <p class="article__title subtitle">
            ${article.title}
          </p>
          <div class="article__information">
            <svg class="article__icon">
              <use href="assets/icons.svg#clock"></use>
            </svg>
            <p class="article__read-time__date">${article.readTime} | ${article.publicationDate}</p>
          </div>
        </div>
      </div>`;
    });

    return markup;
  }

  _generateMainArticle(number = 0) {
    let article = this._articles[number];

    let markup = `
       <img
            src="${article.imageUrl}"
            alt="house image"
            class="find-more__main-article__image"
          />

          <div class="find-more__main-article__user">
            <img
              src="${article.authorImg}"
              alt="avatar"
              class="find-more__main-article__user-image"
            />

            <p class="find-more__main-article__user-name label-style-text">
              ${article.author}
            </p>
          </div>
          <h3 class="find-more__main-article__title heading-3">
          ${article.title}
          </h3>
          <p class="find-more__main-article__description body-style-text">
          ${article.description}
          </p>
          <div class="find-more__main-article__information">
            <svg class="find-more__main-article__icon">
              <use href="assets/icons.svg#clock"></use>
            </svg>
            <p
              class="find-more__main-article__read-time__date label-style-text"
            >
              ${article.readTime} | ${article.publicationDate}
            </p>
          </div>`;

    return markup;
  }

  onButtonClick() {
    this._showMoreButton.addEventListener("click", () => {
      if (this._numOfArticle > 3) {
        this._numOfArticle = 3;
        this._showMoreButton.textContent = "More Articles";
      } else {
        this._numOfArticle = 6;
        this._showMoreButton.textContent = "Hide Articles";
      }

      this._parentElement.innerHTML = "";
      this.render(this._articles);
    });
  }

  onArticleClick() {
    this._parentElement.addEventListener("click", (e) => {
      this._mainArticleContainer.innerHTML = "";

      const article = e.target.closest(".article").dataset.article;
      this.renderMainArticle(article);
    });
  }
}
