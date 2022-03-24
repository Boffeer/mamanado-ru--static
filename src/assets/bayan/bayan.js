/**
 * @bayan
 */
const bayans = [...document.querySelectorAll(".bayan")];
const bayanOpenedClass = "bayan--opened";
const bayanHeight = 1000;

function toggleBayan(bayanObject) {
  if (!bayanObject) return;

  if (
    bayanObject.top.bayan.parentElement.classList.value.includes(
      bayanOpenedClass
    )
  ) {
    bayanObject.bottom.bayan.style.maxHeight = "0";
    bayanObject.top.bayan.parentElement.classList.remove(bayanOpenedClass);
  } else {
    bayanObject.bottom.bayan.style.maxHeight = `${bayanHeight}px`;
    bayanObject.top.bayan.parentElement.classList.add(bayanOpenedClass);
  }
}

if (bayans.length > 0) {
  bayans.forEach((bayan, index) => {
    let [bayanTopContent, bayanBottomContent] = Array.from(bayan.children);

    let bayanObject = {
      top: {
        content: bayanTopContent,
      },
      bottom: {
        content: bayanBottomContent,
      },
      bayan,
    };

    function createBayanStructure(bayanObject) {
      let bayanTop = document.createElement("div");
      bayanTop.classList.add("bayan__top");
      bayanTop.appendChild(bayanTopContent);
      bayanObject.bayan.appendChild(bayanTop);
      bayanObject.top.bayan = bayanTop;

      let bayanBottom = document.createElement("div");
      bayanBottom.classList.add("bayan__bottom");
      bayanBottom.appendChild(bayanBottomContent);
      bayanObject.bayan.appendChild(bayanBottom);
      bayanObject.bottom.bayan = bayanBottom;

      bayanTop.addEventListener("click", () => toggleBayan(bayanObject));

      if (bayanObject.bayan.getAttribute("data-bayan")?.includes("absolute")) {
        bayanObject.bottom.bayan.style.position = "absolute";
      }
    }

    if (bayanObject.bayan.classList.value.includes("bayan--clones")) {
      let bayanStatic = document.createElement("div");
      bayanStatic.classList.add("bayan--static");
      bayanObject.bayan.appendChild(bayanStatic);
      bayanStatic.appendChild(bayanObject.top.content.cloneNode(true));
      bayanStatic.appendChild(bayanObject.bottom.content.cloneNode(true));

      let bayanDynamyc = document.createElement("div");
      bayanDynamyc.classList.add("bayan--dynamic");
      bayanObject.bayan.appendChild(bayanDynamyc);
      createBayanStructure(bayanObject);
      bayanDynamyc.appendChild(bayanObject.top.bayan);
      bayanDynamyc.appendChild(bayanObject.bottom.bayan);
    } else {
      createBayanStructure(bayanObject);
    }
  });
}
