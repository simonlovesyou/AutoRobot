function setUserRequire (lib) {
  if (!lib instanceof Object) {
    throw new Error('User lib is not an object');
  }

  return (module) => lib[module];
}

module.exports = setUserRequire;