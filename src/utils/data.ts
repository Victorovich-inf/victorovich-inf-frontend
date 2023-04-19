
function swap(arr: Array<any>, from: number, to: number) {
  return arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
}

export {swap}