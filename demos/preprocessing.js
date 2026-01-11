function runDemo() {
  const input = document.getElementById("inputText").value;

  /* 1. NORMALIZATION */
  const normalized = input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  /* 2. TOKENIZATION */
  const tokens = normalized.split(" ");

  /* 3. STEMMING (simple rule-based demo) */
  const stem = word => {
    if (word.endsWith("ing")) return word.slice(0, -3);
    if (word.endsWith("ers")) return word.slice(0, -3);
    if (word.endsWith("ed")) return word.slice(0, -2);
    if (word.endsWith("s")) return word.slice(0, -1);
    return word;
  };
  const stems = tokens.map(stem);

  /* 4. LEMMATIZATION (dictionary-based demo) */
  const lemmaDict = {
    running: "run",
    ran: "run",
    runners: "runner",
    banks: "bank"
  };
  const lemmas = tokens.map(w => lemmaDict[w] || w);

  /* 5. WORD FORMATION */
  const formation = tokens.map(word => {
    if (word.endsWith("ing")) return `${word} → ${word.slice(0,-3)} + -ing`;
    if (word.endsWith("ers")) return `${word} → ${word.slice(0,-3)} + -ers`;
    if (word.endsWith("ed")) return `${word} → ${word.slice(0,-2)} + -ed`;
    if (word.endsWith("s")) return `${word} → ${word.slice(0,-1)} + -s`;
    return `${word} → base form`;
  });

  /* OUTPUT */
  document.getElementById("normalized").textContent = normalized;
  document.getElementById("tokens").textContent = JSON.stringify(tokens, null, 2);
  document.getElementById("stems").textContent = JSON.stringify(stems, null, 2);
  document.getElementById("lemmas").textContent = JSON.stringify(lemmas, null, 2);
  document.getElementById("formation").textContent = formation.join("\n");
}
