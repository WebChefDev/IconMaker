document.addEventListener("DOMContentLoaded", function () {
  let canvas = document.getElementById("iconCanvas");
  let ctx = canvas.getContext("2d");
  let colorPicker = document.getElementById("colorPicker");
  let drawModeButton = document.getElementById("drawMode");
  let eraseModeButton = document.getElementById("eraseMode");
  let gridSizeInput = document.getElementById("gridSizeInput");
  let isErasing = false;
  let isDrawing = false;
  let pixelSize = 10;
  let showGrid = false;

  function toggleDrawMode() {
    isErasing = false;
    drawModeButton.classList.add("active");
    eraseModeButton.classList.remove("active");
  }

  function toggleEraseMode() {
    isErasing = true;
    eraseModeButton.classList.add("active");
    drawModeButton.classList.remove("active");
  }

  function drawPixel(e) {
    if (!isDrawing) return;

    let x = Math.floor(e.offsetX / pixelSize) * pixelSize;
    let y = Math.floor(e.offsetY / pixelSize) * pixelSize;

    if (isErasing) {
      ctx.clearRect(x, y, pixelSize, pixelSize);
    } else {
      ctx.fillStyle = colorPicker.value;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }

  function setGridSize() {
    let gridSize = parseInt(gridSizeInput.value, 10);
    pixelSize = canvas.width / gridSize;
    showGrid = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function downloadCanvas() {
    let link = document.createElement("a");
    link.download = "icon.png";
    link.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
  }

  function handleMouseDown(e) {
    isDrawing = true;
    drawPixel(e);
  }

  function handleMouseMove(e) {
    drawPixel(e);
  }

  function handleMouseUp() {
    isDrawing = false;
  }

  function handleMouseLeave() {
    isDrawing = false;
  }



  
  // Function to prevent scroll when touching the canvas
  function preventScrollOnCanvas(e) {
    if (e.target.id === "iconCanvas") {
      e.preventDefault();
    }
  }

  // Event listener to prevent scroll on touch for the canvas
  document
    .getElementById("iconCanvas")
    .addEventListener("touchmove", preventScrollOnCanvas, { passive: false });





  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", handleMouseLeave);

  drawModeButton.addEventListener("click", toggleDrawMode);
  eraseModeButton.addEventListener("click", toggleEraseMode);
  gridSizeInput.addEventListener("change", setGridSize);
  document
    .querySelector(".download-button")
    .addEventListener("click", downloadCanvas);
});
