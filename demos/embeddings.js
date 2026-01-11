let embeddings = {};
let maxWords = 5;

// Load embeddings
fetch("embeddings.json")
  .then(res => res.json())
  .then(data => embeddings = data);

/* ======================
   INPUT MANAGEMENT
====================== */

function addWord() {
  const inputs = document.getElementById("inputs");
  if (inputs.children.length >= maxWords) return;

  const input = document.createElement("input");
  input.placeholder = `Word ${inputs.children.length + 1}`;
  inputs.appendChild(input);
}

/* ======================
   COSINE SIMILARITY
====================== */

function cosineSimilarity(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/* ======================
   MAIN COMPARE FUNCTION
====================== */

function compare() {
  const words = Array.from(document.querySelectorAll("#inputs input"))
    .map(i => i.value.toLowerCase())
    .filter(w => w.length > 0);

  if (words.length < 2) return;

  for (let w of words) {
    if (!(w in embeddings)) {
      document.getElementById("results").innerText =
        `Word "${w}" not found in embeddings.`;
      return;
    }
  }

  const vectors = words.map(w => embeddings[w]);

  showSimilarities(words, vectors);
  showEmbeddings(words, vectors);
  drawBarChart(words, vectors);
  drawScatterPlot(words, vectors);
}

/* ======================
   OUTPUT TEXT
====================== */

function showSimilarities(words, vectors) {
  let html = "<h3>Pairwise Cosine Similarities</h3>";

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const sim = cosineSimilarity(vectors[i], vectors[j]).toFixed(3);
      html += `${words[i]} – ${words[j]}: <b>${sim}</b><br>`;
    }
  }

  document.getElementById("results").innerHTML = html;
}

function showEmbeddings(words, vectors) {
  let text = "";
  words.forEach((w, i) => {
    text += `${w}: ${vectors[i].slice(0, 10).join(", ")}\n\n`;
  });
  document.getElementById("embeddings").innerText = text;
}

/* ======================
   BAR CHART
====================== */

function drawBarChart(words, vectors) {
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dims = 10;
  const barW = 12;
  const gap = 10;
  const baseY = 160;

  const maxVal = Math.max(
    ...vectors.flat().slice(0, dims).map(Math.abs)
  );

  vectors.forEach((vec, wi) => {
    vec.slice(0, dims).forEach((v, i) => {
      const x = 40 + i * (barW * vectors.length + gap) + wi * barW;
      const h = (v / maxVal) * 70;

      ctx.fillStyle = ["#4a90e2", "#e94e77", "#50c878", "#f5a623", "#7b6cff"][wi];
      ctx.fillRect(x, baseY - h, barW, h);
    });
  });

  ctx.fillStyle = "#000";
  words.forEach((w, i) =>
    ctx.fillText(w, 40 + i * 120, 220)
  );
}

/* ======================
   2D SCATTER PLOT
====================== */

function drawScatterPlot(words, vectors) {
  const canvas = document.getElementById("scatterPlot");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const scale = 120;

  // axes
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, canvas.height);
  ctx.moveTo(0, cy);
  ctx.lineTo(canvas.width, cy);
  ctx.stroke();

  vectors.forEach((v, i) => {
    const x = cx + v[0] * scale;
    const y = cy - v[1] * scale;

    ctx.fillStyle = ["#4a90e2", "#e94e77", "#50c878", "#f5a623", "#7b6cff"][i];
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillText(words[i], x + 8, y);
  });
}
