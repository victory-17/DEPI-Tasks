import { catgoriesContainer, mainElement } from "../shares/ui/dom-elements.js";

const categoriesSuccess = function (data) {
  mainElement.removeClass("d-none").addClass("row");
  catgoriesContainer.html(
    data
      .map(
        (item, index) =>
          `<li class="py-2 px-1 fs-4" id="${item.slug}">${item.name}</li>`
      )
      .join("")
  );
};

export default categoriesSuccess;
