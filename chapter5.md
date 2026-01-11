# 5. Mathematical Intuition for Language Processing

<a id="fig5-1"></a>
**Figure 5.1: Linguistic Intuition and Mathematical Formalization**

![Figure 5.1: Linguistic Intuition and Mathematical Formalization](figures/fig5.1.png)

Figure description:
This figure shows two conceptual spaces. On the left are linguistic notions such as frequency, expectation, preference, and similarity. On the right are their mathematical counterparts, such as counts, probabilities, and numerical representations. Arrows connect each linguistic intuition to its formal mathematical expression.

Explanation:
The figure emphasizes that mathematics in language processing does not introduce new ideas, but formalizes ideas linguists already use intuitively. When linguists say that a construction is “more common” or that one interpretation is “more likely,” they are already reasoning quantitatively. Mathematics provides a precise and consistent way to express these intuitions so that they can be implemented computationally.

<a id="fig5-2"></a>
**Figure 5.2: Word Frequency Distribution in a Corpus**

![Figure 5.2: Word Frequency Distribution in a Corpus](figures/fig5.2.png)

Figure description:
This figure presents a bar chart comparing the frequency of several words in a corpus, with very common words (e.g., the) appearing as tall bars and rarer words (e.g., whilst) appearing as much shorter bars.

Explanation:
The figure illustrates that language usage is highly uneven. A small number of words occur very frequently, while many words occur rarely. Computational models exploit this imbalance by prioritizing common patterns while still accounting for rare ones. Frequency-based reasoning allows systems to reflect actual language use rather than treating all words as equally important.

<a id="fig5-3"></a>
**Figure 5.3: Probabilistic Expectations for Next-Word Prediction**

![Figure 5.3: Probabilistic Expectations for Next-Word Prediction](figures/fig5.3.png)

Figure description:
This figure shows a sentence prefix followed by several possible next words, each associated with a different likelihood. The most expected continuation is visually highlighted, while less likely options remain visible.

Explanation:
The figure demonstrates that probabilistic models do not seek certainty. Instead, they maintain a ranked set of expectations. Just as humans anticipate some continuations more strongly than others, computational systems use probability to manage uncertainty in prediction. The figure helps readers see probability as structured expectation rather than randomness.

<a id="fig5-4"></a>
**Figure 5.4: Contextual Influence in Conditional Probability**

![Figure 5.4: Contextual Influence in Conditional Probability](figures/fig5.4.png)

Figure description:
This figure depicts a short word sequence where earlier words influence the likelihood of later ones. Arrows indicate how the context shifts probability mass toward certain continuations.

Explanation:
The figure makes explicit the idea that meaning and likelihood depend on context. The same word may be more or less likely depending on what precedes it. Conditional probability allows models to capture this dependence without encoding explicit grammatical rules, enabling flexible and data-driven language processing.

<a id="fig5-5"></a>
**Figure 5.5: The Zero-Probability Problem and Its Resolution**

![Figure 5.5: The Zero-Probability Problem and Its Resolution](figures/fig5.5.png)

Figure description:
This flowchart contrasts two outcomes when an unseen word combination is encountered. In one path, assigning zero probability leads to system failure. In the other, a smoothing mechanism assigns a small non-zero value, allowing processing to continue.

Explanation:
The figure highlights why treating unseen events as impossible is problematic. Language is productive, and new combinations constantly appear. Smoothing techniques prevent models from breaking by allowing uncertainty and generalization. The visual contrast reinforces the practical necessity of smoothing in real-world systems.

<a id="fig5-6"></a>
**Figure 5.6: Probability Multiplication vs. Log Probability Addition**

![Figure 5.6: Probability Multiplication vs. Log Probability Addition](figures/fig5.6.png)

Figure description:
This figure compares two calculations for a word sequence: multiplying several small probabilities versus adding their logarithmic equivalents. The second representation remains numerically stable.

Explanation:
The figure explains the role of log probabilities without requiring mathematical background. The transformation is shown as a technical convenience rather than a conceptual change. Readers can understand that log probabilities are used to avoid computational issues while preserving the same underlying meaning.

<a id="fig5-7"></a>
**Figure 5.7: Word Vectors as Feature Containers**

![Figure 5.7: Word Vectors as Feature Containers](figures/fig5.7.png)


Figure description:
This figure represents words as points in a multi-dimensional space, where proximity indicates similarity in usage. Related words appear closer together, while unrelated words are farther apart.

Explanation:
The figure helps readers visualize vectors as structured summaries of linguistic behavior. Instead of defining meaning explicitly, models infer similarity from patterns of use. This representation supports graded similarity and avoids rigid categorical boundaries.

<a id="fig5-7-1"></a>
**Figure 5.7.1: Similarity and Distance in Conceptual Space**

![Figure 5.7.1: Similarity and Distance in Conceptual Space](figures/fig5.7.1.png)

Figure description:
This figure shows clusters of words grouped according to contextual similarity. Distances between clusters reflect differences in meaning or usage.

Explanation:
The figure reinforces the idea that similarity is derived from usage patterns rather than predefined definitions. Distance is conceptual, not physical. This visual intuition explains how computational systems can perform tasks like clustering and semantic comparison without symbolic rules.
