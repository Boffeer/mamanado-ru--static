/**
 * @bayan
 */
const bayans = [...document.querySelectorAll(".bayan")];
const bayanOpenedClass = "bayan--opened";
const bayanHeight = 1000;

function toggleBayan(
  bayanTop,
  bayanBottom,
  bayanOpenedClass,
  bayanBottomHeight
) {
  if (bayanTop.parentElement.classList.value.includes(bayanOpenedClass)) {
    bayanBottom.style.maxHeight = "0";
    bayanTop.parentElement.classList.remove(bayanOpenedClass);
  } else {
    bayanBottom.style.maxHeight = `${bayanBottomHeight}px`;
    bayanTop.parentElement.classList.add(bayanOpenedClass);
  }
}

if (bayans.length > 0) {
  bayans.forEach((bayan, index) => {
    let [bayanTopContent, bayanBottomContent] = Array.from(bayan.children);

    function createBayanStructure(bayan) {
      let bayanTop = document.createElement("div");
      bayanTop.classList.add("bayan__top");
      bayanTop.appendChild(bayanTopContent);
      bayan.appendChild(bayanTop);

      let bayanBottom = document.createElement("div");
      bayanBottom.classList.add("bayan__bottom");
      bayanBottom.appendChild(bayanBottomContent);
      bayan.appendChild(bayanBottom);

      function toggleBayanShorthand() {
        toggleBayan(bayanTop, bayanBottom, bayanOpenedClass, bayanHeight);
      }
      bayanTop.addEventListener("click", () => toggleBayanShorthand());

      if (bayan.getAttribute("data-bayan")?.includes("absolute")) {
        bayanBottom.style.position = "absolute";
      }
      setTimeout(() => {
        bayanTop.click();
        toggleBayanShorthand();
      }, 200);
    }

    if (bayan.classList.value.includes("bayan--clones")) {
      let bayanNoClick = document.createElement("div");
      bayanNoClick.classList.add("bayan--static");
      bayan.appendChild(bayanNoClick);
      bayanNoClick.appendChild(bayanTopContent.cloneNode(true));
      bayanNoClick.appendChild(bayanBottomContent.cloneNode(true));

      let bayanClickable = document.createElement("div");
      bayanClickable.classList.add("bayan--dynamic");
      bayan.appendChild(bayanClickable);
      createBayanStructure(bayanClickable);

      let noBayan = bayanClickable.cloneNode(true);
    } else {
      createBayanStructure(bayan);
    }
  });
}
