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
    const bayanChildren = Array.from(bayan.children);
    let bayanTopContent = bayanChildren[0];
    let bayanBottomContent = bayanChildren[1];

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

    bayanTop.addEventListener("click", function () {
      toggleBayanShorthand();
    });

    if (bayan.getAttribute("data-bayan").includes("absolute")) {
      bayanBottom.style.position = "absolute";
    }

    setTimeout(() => {
      bayanTop.click();
      // if (index > 0) {
      toggleBayanShorthand();
      // }
    }, 200);
  });
}
