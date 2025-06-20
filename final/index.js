// keep spacing of logo to left edge of browser same spacing as aside
function updateLogoPosition() {
  // "$" in variable name since it includes jQuery objects
  const $aside = $("aside");
  const $logo = $("#logo");

  // exit method if there is no aside
  if ($aside.length === 0) return;

  const distanceFromLeft = $aside[0].getBoundingClientRect().left;

  // always keep at least 25px from the left edge
  // choose bigger value with .max()
  const safeLeft = Math.max(distanceFromLeft, 25);

  // set style of #logo
  $logo.css("left", safeLeft + "px");
}

function centerWrapper() {
  // get width of elements
  const browserWidth = $(window).width();
  // including border and padding
  const asideWidth = $("aside").outerWidth();
  const mainWidth = $("main").outerWidth();

  const marginLeft = Math.max(
    browserWidth / 2 - (asideWidth + mainWidth / 2 + 50),
    0,
  );

  $("#wrapper").css({
    "margin-left": marginLeft + "px",
  });
}

function toggleLinks() {
  // show #links element when menu is clicked
  $("#menu").on("click", function () {
    $("#links").toggle();
  });

  // hide #links when clicked outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest("#links").length && !$(e.target).is("#menu")) {
      $("#links").hide();
    }
  });

  // close when ESC is pressed
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $("#links").hide();
    }
  });
}

// since the header is sticky when jumping with a tag it needs to scroll more or less
function customScroll() {
  $("aside nav a").on("click", function (e) {
    e.preventDefault(); // Prevent the default anchor behavior

    const targetId = $(this).attr("href"); // get the target ID like "#arch"
    const target = $(targetId);

    if (target.length) {
      const offset = target.offset().top - 140; // adjust scroll position
      $("html, body").animate({ scrollTop: offset }, 400); // smooth scroll
    }
  });
}

// execute when everything is loaded
$(function () {
  updateLogoPosition();
  centerWrapper();
  toggleLinks();
  customScroll();
});

// run them when resizing
$(window).on("resize", function () {
  updateLogoPosition();
  centerWrapper();
});
