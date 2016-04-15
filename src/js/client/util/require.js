/** TODO:
 * When lib[module] returns undefined, look for a file relative to the script that's being executed and return that file.
 */

function setUserRequire (lib, dir) {
  if (!lib instanceof Object) {
    throw new Error('User lib is not an object');
  }

  return (module) => lib[module];
}

module.exports = setUserRequire;