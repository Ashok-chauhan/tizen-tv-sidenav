(function () {
  var x = document.getElementById("pauseOverlay");
  const pauseOverlay = function () {
    x.style.display = "block";
  };
  const pausePlayOverlay = function () {
    x.style.display = "none";
  };

  return {
    pauseOverlay: pauseOverlay,
    pausePlayOverlay: pausePlayOverlay,
  };
})();
