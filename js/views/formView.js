import View from "../views/View.js";

export default class FormView extends View {
  _textarea = document.querySelector(".form__row-text-area");
  _currentCountSpan = document.getElementById("currentCount");
  _maxLengthSpan = document.getElementById("maxLength");

  _selectBox = document.querySelector(".select-box");
  _selected = document.querySelector(".selected");
  _selectedContent = document.querySelector(".selected__text");
  _selectIcon = document.querySelector(".selected__icon");

  _optionsContainer = document.querySelector(".select-box__options-container");
  _optionsList = document.querySelectorAll(".select-box__option");

  updateCharCount() {
    const currentLength = this._textarea.value.length;
    this._currentCountSpan.textContent = currentLength;
  }

  checkTextLimit(handler) {
    const maxLength = parseInt(this._textarea.getAttribute("maxlength"), 10);
    this._maxLengthSpan.textContent = maxLength;

    this._textarea.addEventListener("input", handler);
  }

  selectOption() {
    this._selected.addEventListener("click", () => {
      this._optionsContainer.classList.toggle("active");
      this._selectIcon.style.transform = "rotate(-90deg)";
    });

    this._optionsList.forEach((o) => {
      o.addEventListener("click", () => {
        this._selectedContent.innerHTML = o.querySelector("label").innerHTML;
        this._selectBox.style.color = "$color-black";
        this._optionsContainer.classList.remove("active");
        this._selectIcon.style.transform = "rotate(90deg)";
      });
    });
  }
}
