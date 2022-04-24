/**
 * Get a list of applicable classes
 * @param {string[]} params - List of classes
 * @returns {string} Space seperated string containing all classes
 */
const classes = (...params: ({ [x: string]: boolean } | string | string[])[]): string => {
  // Array to store final classes in
  const cls: string[] = [];
  // Loop over each param
  params.forEach(param => {
    // If param is an array, add all items to the list
    if (Array.isArray(param)) param.forEach(value => { cls.push(value) });
    // If param is a string, just add it to the list
    else if (typeof param === "string") cls.push(param);
    // If param is an object, check the value of each key, if it's true, add the key to the list
    else if (typeof param === "object" && !Array.isArray(param) && param !== null) {
      Object.keys(param).forEach(key => {
        if (param[key]) cls.push(key);
      });
    }
  });
  // Return a list of unique class names
  return cls.filter((value, index, self) => self.indexOf(value) === index).join(" ");
}

export default classes;