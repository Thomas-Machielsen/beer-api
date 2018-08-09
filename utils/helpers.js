const getParams = id => {
  return id ? { id: [id] } : {};
};

const buildHashPassword = (textToBeSplitted, textToSplitOn, iterations, keylength, digest) => {
  const selector = new RegExp(textToSplitOn);
  const firstOccurence = textToBeSplitted.search(selector);

  const hash = textToBeSplitted.substring(0, firstOccurence);

  const endOfOccurence = firstOccurence + (textToSplitOn.length);
  const salt = textToBeSplitted.substring(endOfOccurence);

  return {
    hash,
    salt,
    iterations,
    keylength,
    digest
  }
};

module.exports = { getParams, buildHashPassword };
