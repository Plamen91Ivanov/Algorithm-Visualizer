export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

export function getBubleSortAnimation(array,times) {
  const animations = [];
  var t = bubleSort(array,animations,times);
  times = t;
  return {animations,times};
}

export function getSelectionSortAnimation(array,times) {
  const animations = [];
  var t = selectionSort(array,animations,times);
  times = t;
  return {animations,times};
}

export function getInsertionSortAnimation(array) {
  const copyArr = [...array];
  const animations = []; 
  insertionSort(copyArr,animations);
  return animations;
}

export function getQuickSortAnimation(array){
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);

  return animations;
}

function bubleSort(array,animations,times)
{
    var isSorted = true;
    var elementsNumber = array.length-1;
    var x = array;
    do{
      isSorted = false;
        for (let i = 0; i < elementsNumber; i++) {
            if (x[i] > x[i+1])
            {
              animations.push([i]);
               var temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               isSorted = true;
            }
    }
    times++;
    elementsNumber--;
    console.log(elementsNumber)
    if (!isSorted) {
      return times;
    }
    }while(isSorted);
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
//some bug !!
function insertionSort(array,animations){
    let length = array.length;
    for (let i = 1; i < length; i++) {
      let currentElement = array[i];
      let j = i - 1;
      if (!(j >= 0 && array[j] < currentElement)) {
         animations.push([[j,j + 1],false])
      }
      while (j >= 0 && array[j] > currentElement) {
        animations.push([[j,j + 1],true])
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = currentElement;
  }
  console.log('sorted ',array)
    return {animations};
}

function selectionSort(array, compare, swap) {
  for (var i = 0; i < array.length - 1; i++) {
    var minIndex = i;

    for (var j = i + 1; j < array.length; j++) {
      if (compare(array, j, minIndex) < 0) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(array, i, minIndex);
    }
  }
  return array;
}

function quickSortHelper(arr, left, right, animations) {
  if (right <= left) return;
  const part = partition(arr, left, right, animations);
  quickSortHelper(arr, left, part, animations);
  quickSortHelper(arr, part + 1, right, animations);
}

function partition(arr, left, right, animations) {
  let i = left;
  let j = right + 1;

  const pivot = arr[left];

  while (true) {
    while (arr[++i] <= pivot) { 
      if (i === right) break;
      animations.push([[i,left], false,[left,right]]);
    }
    while (arr[--j] >= pivot) {
      
      if (j === left) break;
      animations.push([[j,left], false,[left,right]]);
    }
    if (j <= i) break;
    animations.push([[i, j], true,[left,right]]);
    swap(arr, i, j);
  }
  animations.push([[left, j], true,[left,right]]);
  swap(arr, left, j);
  return j;
}

function swap(arr, index1, index2) {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
