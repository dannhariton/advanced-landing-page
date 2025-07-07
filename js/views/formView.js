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
      this._optionsContainer.classList.contains("active")
        ? (this._selectIcon.style.transform = "rotate(-90deg)")
        : (this._selectIcon.style.transform = "rotate(90deg)");
    });

    this._optionsList.forEach((o) => {
      o.addEventListener("click", () => {
        this._selectedContent.innerHTML = o.querySelector("label").innerHTML;
        this._selectedContent.style.color = "#1b1c57";
        this._optionsContainer.classList.remove("active");
        this._selectIcon.style.transform = "rotate(90deg)";
      });
    });

    document.addEventListener("click", (e) => {
      if (!this._selectBox.contains(e.target) && e.target !== this._selected) {
        this._selectIcon.style.transform = "rotate(90deg)";
        this._optionsContainer.classList.remove("active");
      }
    });
  }

  checkboxClick() {
    const checkbox = document.querySelector(".custom-checkbox");
    checkbox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkbox.closest("input").checked = !checkbox.closest("input").checked;
      }
    });
  }
}
