import View from "../views/View.js";

export default class FormView extends View {
  _textarea = document.querySelector(".form__row-text-area");
  _currentCountSpan = document.getElementById("currentCount");
  _maxLengthSpan = document.getElementById("maxLength");

  updateCharCount() {
    const currentLength = this._textarea.value.length;
    this._currentCountSpan.textContent = currentLength;
  }

  checkTextLimit(handler) {
    const maxLength = parseInt(this._textarea.getAttribute("maxlength"), 10);
    this._maxLengthSpan.textContent = maxLength;

    this._textarea.addEventListener("input", handler);
  }
}
