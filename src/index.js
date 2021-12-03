import "./styles.scss";
// import anime from "animejs/lib/anime.es.js";

const buttons = document.querySelectorAll(".icon-arrow");
const tabs = document.querySelectorAll(".tab");
const tabBoxes = document.querySelectorAll(".accordionBox.tab");
const buttonSeeMore = document.querySelector(".buttonSeemore");
const tabBoxSecondary = document.querySelector(".accordionBox--second");

//All buttons arrow (toggle)
buttons.forEach((b) => {
  b.addEventListener("click", () => {
    const parent = b.parentElement;
    parent.classList.toggle("active");
  });
});

//just 2 tabs
tabs.forEach((t, i) => {
  t.addEventListener("click", () => {
    const hasClass = t.classList.contains("active");
    if (!hasClass) {
      tabs.forEach((at) => at.classList.remove("active"));
      tabBoxes.forEach((tb) => tb.classList.remove("active"));
      t.classList.add("active");
      tabBoxes[i].classList.add("active");
    }
  });
});

//Toggle button see more
let open = false;
buttonSeeMore.addEventListener("click", () => {
  buttonSeeMore.parentElement.classList.toggle("active");
  open = !open;
  if (open) {
    buttonSeeMore.firstElementChild.innerHTML = "Ver menos";
  } else {
    buttonSeeMore.firstElementChild.innerHTML = "Ver más";
  }
  tabBoxSecondary.classList.toggle("active");
});

//Slider
let swiper;
const btnPrev = document.querySelector(".swiper-btnPrev > svg");
const btnNext = document.querySelector(".swiper-btnNext > svg");
const mql = window.matchMedia("(min-width: 768px)");
let matchesMql = Boolean(mql.matches);
function onChange() {
  matchesMql = Boolean(mql.matches);
  watchSwiper(matchesMql, swiper);
  changeArrowColor(swiper);
}

mql.addEventListener("change", onChange);
watchSwiper(matchesMql, swiper);

changeArrowColor(swiper);

function getMySwiper() {
  swiper = new Swiper(".mySwiper", {
    speed: 700,
    centeredSlides: true,
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".swiper-btnNext",
      prevEl: ".swiper-btnPrev"
    }
  });
}
function watchSwiper(matchesMql, swiper) {
  if (!matchesMql) {
    getMySwiper();
  } else {
    if (swiper) swiper.destroy(true, true);
  }
}
function changeArrowColor(swiper) {
  if (swiper) {
    btnPrev.children[0].style.stroke = "#C0C4E5";
    btnPrev.children[1].style.stroke = "#C0C4E5";
    btnNext.children[0].style.stroke = "#4F4FFF";
    btnNext.children[1].style.stroke = "#4F4FFF";
    swiper.on("activeIndexChange", (e) => {
      const currentIndex = e.activeIndex + 1;
      if (currentIndex === 1) {
        btnPrev.children[0].style.stroke = "#C0C4E5";
        btnPrev.children[1].style.stroke = "#C0C4E5";
      } else {
        btnPrev.children[0].style.stroke = "#4F4FFF";
        btnPrev.children[1].style.stroke = "#4F4FFF";
      }
      if (currentIndex === 4) {
        btnNext.children[0].style.stroke = "#C0C4E5";
        btnNext.children[1].style.stroke = "#C0C4E5";
      } else {
        btnNext.children[0].style.stroke = "#4F4FFF";
        btnNext.children[1].style.stroke = "#4F4FFF";
      }
    });
  }
}
