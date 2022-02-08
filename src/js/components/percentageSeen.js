export default function percentageSeen(element) {
  // Get the relevant measurements and positions
  var viewportHeight = window.innerHeight;
  var scrollTop = window.scrollY;
  var elementOffsetTop = $(element).offset().top;
  var elementHeight = element.offsetHeight;

  // Calculate percentage of the element that's been seen
  var distance = scrollTop + viewportHeight - elementOffsetTop;
  var percentage = Math.round(
      distance / ((viewportHeight + elementHeight) / 100)
  );

  // Restrict the range to between 0 and 100
  return Math.min(100, Math.max(0, percentage));
};