let embeddings = {};

// Load embeddings
fetch("embeddings.json")
  .then(res => res.json())
  .then(data => embeddings = data);

function cosineSimilarity(v1, v2) {
  let dot = 0, n1 = 0, n2 = 0;
  for (let i = 0; i < v1.length; i++) {
    dot += v1[i] * v2[i];
    n1 += v1[i] * v1[i];
    n2 += v2[i] * v2[i];
  }
  return dot / (Math.sqrt(n1) * Math.sqrt(n2));
}

function compare() {
  const w1 = document.getElementById("word1").value.toLowerCase();
  const w2 = document.getElementById("word2").value.toLowerCase();
  const out = document.getElementById("output");

  if (!(w1 in embeddings) || !(w2 in embeddings)) {
    out.innerHTML = "<p class='far'>One or both words not in vocabulary.</p>";
    return;
  }

  const sim = cosineSimilarity(embeddings[w1], embeddings[w2]);
  const label = sim > 0.6 ? "close" : "far";

  out.innerHTML = `
    <p>Cosine similarity: <strong>${sim.toFixed(3)}</strong></p>
    <p class="${label}">${label === "close" ? "Words are semantically close" : "Words are not very close"}</p>
    <h3>Embedding (first 10 dimensions)</h3>
    <pre>${w1}: ${embeddings[w1].slice(0,10).join(", ")}</pre>
    <pre>${w2}: ${embeddings[w2].slice(0,10).join(", ")}</pre>
  `;
}
