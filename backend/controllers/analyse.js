const pos = require("pos");
const analyseText = (req, res) => {
  const text = req.body;
  if (text) {
    const count = text.split(" ").length;
    const words = new pos.Lexer().lex(text);
    const tagger = new pos.Tagger();
    const taggedWords = tagger.tag(words);
    let adjectives = taggedWords.filter((w) => {
      const [word, tag] = w;
      if (tag === "JJ") return word;
    });
    let nouns = taggedWords.filter((w) => {
      const [word, tag] = w;
      if (tag === "NN") return word;
      else if (tag === "NNP") return word;
      else if (tag === "NNS") return word;
      else if (tag === "NNPS") return word;
    });
    let verbs = taggedWords.filter((w) => {
      const [word, tag] = w;
      if (tag === "VB") return word;
      else if (tag === "VBD") return word;
      else if (tag === "VBG") return word;
      else if (tag === "VBN") return word;
      else if (tag === "VBP") return word;
      else if (tag === "VBZ") return word;
    });
    let adverbs = taggedWords.filter((w) => {
      const [word, tag] = w;
      if (tag === "RB") return word;
      else if (tag === "WRB") return word;
      else if (tag === "RBR") return word;
      else if (tag === "RBS") return word;
    });
    return res.status(200).json({
      status: "ok",
      data: {
        count,
        tags: {
          adverbs,
          verbs,
          nouns,
          adjectives,
        },
      },
    });
  } else {
    return res
      .status(404)
      .json({ status: "error", error: "No text were detected..." });
  }
};
module.exports = {
  analyseText,
};
