document.getElementById("fileInput").onchange = function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const ascii = convertToASCII(imgData);
      document.getElementById("output").textContent = ascii;
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
};

function convertToASCII(imgData) {
  const asciiChars = "@%#*+=-:. ";
  const data = imgData.data;
  let ascii = "";

  for (let y = 0; y < imgData.height; y += 10) {
    for (let x = 0; x < imgData.width; x += 5) {
      const i = (y * imgData.width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      const charIndex = Math.floor(
        (brightness / 255) * (asciiChars.length - 1)
      );
      ascii += asciiChars[charIndex];
    }
    ascii += "\n";
  }

  return ascii;
}
