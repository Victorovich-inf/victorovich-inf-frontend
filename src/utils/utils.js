const swapElements = (array, index1, index2) => {
  let myArray = [...array]
  myArray[index1] = myArray.splice(index2, 1, myArray[index1])[0];
  return myArray
};

function formatBytes(bytes) {
  let marker = 1024; // Change to 1000 if required
  let decimal = 3; // Change as required
  let kiloBytes = marker; // One Kilobyte is 1024 bytes
  let megaBytes = marker * marker; // One MB is 1024 KB
  let gigaBytes = marker * marker * marker; // One GB is 1024 MB
  let teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

  // return bytes if less than a KB
  if(bytes < kiloBytes) return bytes + " Байт";
  // return KB if less than a MB
  else if(bytes < megaBytes) return(bytes / kiloBytes).toFixed(decimal) + " Кб";
  // return MB if less than a GB
  else if(bytes < gigaBytes) return(bytes / megaBytes).toFixed(decimal) + " Мб";
  // return GB if less than a TB
  else return(bytes / gigaBytes).toFixed(decimal) + " Гб";
}

export {swapElements, formatBytes}