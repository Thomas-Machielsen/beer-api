function mergeObjectsDeep(target, ...sources) {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    for (const prop in source) {
      if (!source.hasOwnProperty(prop)) continue;
      if (source[prop].constructor === Object) {
        target[prop] = mergeObjectsDeep({}, target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

module.exports = { mergeObjectsDeep };
