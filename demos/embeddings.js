let embeddings = {};

// Load embeddings
fetch("embeddings.json")
  .then(res => res.json())
  .then(data => embeddings = data);

// Cosine similarity
function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Compare words
function compare() {
  const w1 = document.getElementById("word1").value.toLowerCase();
  const w2 = document.getElementById("word2").value.toLowerCase();

  if (!(w1 in embeddings) || !(w2 in embeddings)) {
    document.getElementById("similarity").innerText =
      "One or both words not found in embeddings.";
    return;
  }

  const v1 = embeddings[w1];
  const v2 = embeddings[w2];

  const sim = cosineSimilarity(v1, v2).toFixed(3);

  document.getElementById("similarity").innerHTML =
    `Cosine similarity: <b>${sim}</b><br>` +
    (sim > 0.5
      ? `<span class="close">Words are semantically close</span>`
      : `<span class="far">Words are not semantically close</span>`);

  document.getElementById("embeddings").innerText =
    `${w1}: ${v1.slice(0, 10).join(", ")}\n\n` +
    `${w2}: ${v2.slice(0, 10).join(", ")}`;

  drawBarChart(v1, v2, w1, w2);
  drawScatterPlot(v1, v2, w1, w2);
}

/* =======================
   BAR CHART (DIMENSIONS)
======================= */

function drawBarChart(v1, v2, l1, l2) {
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const dims = 10;
  const barW = 18;
  const gap = 14;
  const baseY = 150;

  const maxVal = Math.max(
    ...v1.slice(0, dims).map(Math.abs),
    ...v2.slice(0, dims).map(Math.abs)
  );

  for (let i = 0; i < dims; i++) {
    const x = 40 + i * (barW * 2 + gap);

    const h1 = (v1[i] / maxVal) * 70;
    const h2 = (v2[i] / maxVal) * 70;

    ctx.fillStyle = "#4a90e2";
    ctx.fillRect(x, baseY - h1, barW, h1);

    ctx.fillStyle = "#e94e77";
    ctx.fillRect(x + barW, baseY - h2, barW, h2);

    ctx.fillStyle = "#000";
    ctx.fillText(i + 1, x + 5, baseY + 18);
  }

  ctx.fillText(l1, 40, 210);
  ctx.fillText(l2, 180, 210);
}

/* =======================
   2D SCATTER PLOT
======================= */

function drawScatterPlot(v1, v2, l1, l2) {
  const canvas = document.getElementById("scatterPlot");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const scale = 120;

  const p1 = {
    x: cx + v1[0] * scale,
    y: cy - v1[1] * scale
  };

  const p2 = {
    x: cx + v2[0] * scale,
    y: cy - v2[1] * scale
  };

  // axes
  ctx.strokeStyle = "#ccc";
  ctx.beginPath();
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, canvas.height);
  ctx.moveTo(0, cy);
  ctx.lineTo(canvas.width, cy);
  ctx.stroke();

  // word 1
  ctx.fillStyle = "#4a90e2";
  ctx.beginPath();
  ctx.arc(p1.x, p1.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText(l1, p1.x + 8, p1.y);

  // word 2
  ctx.fillStyle = "#e94e77";
  ctx.beginPath();
  ctx.arc(p2.x, p2.y, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText(l2, p2.x + 8, p2.y);
}
