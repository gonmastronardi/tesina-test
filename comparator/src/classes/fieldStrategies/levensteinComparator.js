import SimpleObjectSimilarityCalculator from "../SimpleObjectSimilarityCalculator.js";

export default class levensteinComparator extends SimpleObjectSimilarityCalculator {
  constructor() {
    super();
  }

  /**it receives 2 strings and returns a similarity value between 0 and 1
   * helped by an external library that uses Jaro-Winkler distance.
   */
  async getSimilarity(aString, anotherString) {
    if (((aString&&anotherString)!== undefined)){
      // return 1 if the strings are equal, and 0.8 if they are similar
      if (aString === anotherString) {
        return 1;
      }
      // Calculate Levenshtein distance
      const distance = levenshteinDistance(aString, anotherString);

      // Define similarity based on a threshold (for this example, 1 or 2)
      if (distance === 1 || distance === 2) {
        return 0.8;
      }

    } else {
      return 0
    }
  }
};

function levenshteinDistance(s, t) {
  if (!s.length) return t.length;
  if (!t.length) return s.length;

  return Math.min(
      levenshteinDistance(s.substr(1), t) + 1,
      levenshteinDistance(t.substr(1), s) + 1,
      levenshteinDistance(s.substr(1), t.substr(1)) + (s[0] !== t[0] ? 1 : 0)
  );
}