const fs = require("fs");

// fake contribution grid (we will replace with real API later)
const cols = 52;
const rows = 7;

const cellSize = 12;
const gap = 3;

const width = cols * (cellSize + gap);
const height = rows * (cellSize + gap);

let svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
<style>
.enemy { fill: #ff3b3b; }
.player { fill: #00ffd5; }
.bullet { fill: #fff; }
</style>
`;

// draw contribution grid as enemies
for (let x = 0; x < cols; x++) {
  for (let y = 0; y < rows; y++) {
    // random enemies for now (later real contributions)
    if (Math.random() > 0.65) {
      const px = x * (cellSize + gap);
      const py = y * (cellSize + gap);

      svg += `<rect class="enemy" x="${px}" y="${py}" width="${cellSize}" height="${cellSize}" />`;
    }
  }
}

// draw player ship
svg += `
<polygon class="player" points="
${width/2},${height-10}
${width/2 - 10},${height-30}
${width/2 + 10},${height-30}
"/>
`;

// simple laser beam
svg += `
<rect class="bullet" x="${width/2 - 1}" y="${height-40}" width="2" height="20">
  <animate attributeName="y" values="${height-40};0" dur="1s" repeatCount="indefinite"/>
</rect>
`;

svg += `</svg>`;

fs.writeFileSync("invaders.svg", svg);
console.log("SVG generated");
