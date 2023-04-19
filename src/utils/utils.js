const swapElements = (array, index1, index2) => {
  let myArray = [...array]
  myArray[index1] = myArray.splice(index2, 1, myArray[index1])[0];
  return myArray
};

export {swapElements}