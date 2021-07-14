import React from 'react';
import {getMergeSortAnimations} from './SortingAlgorithms';
import {getBubleSortAnimation} from './SortingAlgorithms';
import {getInsertionSortAnimation} from './SortingAlgorithms';
import './SortingVisualizer.css';

const times = 0;
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 200;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 31;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
var testt = 2000;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 50));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const bigHeight = 10 * newHeight;
          barOneStyle.height = `${bigHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  bubbleSort() {
    const result = getBubleSortAnimation(this.state.array,times);
    const animations = result.animations;

    var time = result.times;
    var arrayL = ((this.state.array.length - 1) * 3);
    var totalAnimationSteps = arrayL * time;
    
    var arrAnimation = [];
    var num = 0;
    for (let t = 0; t < arrayL; t++) {
      var test = t % 3 !== 2;
      if (test) {
        arrAnimation.push([num,num+1]);
      }
      else{
        arrAnimation.push([num,num+1]);
        num++;
      }
    }
     var x = 0;
     var t = 0;
     var z = 0;
     var fix = 0;
      for (let i = 0; i < totalAnimationSteps; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          setTimeout(() => {
          const [barOneIdx,barTwoIdx] = arrAnimation[z];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
            z++;
          }, i * ANIMATION_SPEED_MS);
        }
        else {
          setTimeout(() => {
            var ar = arrAnimation[z];
            if (animations[t] == ar[0]) {
              t++;
            const [barOneIdx,barTwoIdx] = arrAnimation[z];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            const tmp = barOneStyle.height;
            barOneStyle.height = `${barTwoStyle.height}`;
            barTwoStyle.height = `${tmp}`;
            }
            if ((i - fix) % (arrayL - 1) === 0) {
              z = -1;
              time--;
              fix++;
            }
            z++;
            x++;
        }, i * ANIMATION_SPEED_MS);
      }
  }
}

changeColor(i,x,z,arrAnimation){
  
}
insertionSort() {
    const result = getInsertionSortAnimation(this.state.array,times);
    const animations = result.animations;

    // var arrAnimation = [];
    // var num = 0;
    // for (let t = 0; t < 30; t++) {
    //   var test = t % 3 !== 2;
    //   if (test) {
    //     arrAnimation.push([num,num+1]);
    //   }
    //   else{
    //     arrAnimation.push([num,num+1]);
    //     num++;
    //   }
    // }
    let z = 0;
    let x = 0;
    var current = 0; 
    var count = 0;
    var forc = 0;
    var testcount = 5;
    for (let i = 0; i < animations.length - 1; i++) {
      setTimeout(()=> { 
        const arrayBars = document.getElementsByClassName('array-bar');
          for (let y = 0; y < 3; y++) {
            setTimeout(()=>{
                const isColorChange = y % 3 !== 2;
              //const [barOneIdx,barTwoIdx] = arrAnimation[z];
              const barOne = arrayBars[i].style;
              const barTwo = arrayBars[i + 1].style;
              if (isColorChange) {
                const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR; 
                barOne.backgroundColor = color;
                barTwo.backgroundColor = color;
                z++;
              }
              else{
                 z++;
                 x++; 
            }  
            },y * 1000);
        }

        if (i == 5) {
          while(testcount != 0)
          console.log(testcount);
          for (let z = 0; z < 2; z++) {
            const isColorChange = y % 3 !== 2;
          //const [barOneIdx,barTwoIdx] = arrAnimation[z];
          const barOne = arrayBars[testcount].style;
          const barTwo = arrayBars[testcount - 1].style;
          if (isColorChange) {
            const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR; 
            barOne.backgroundColor = color;
            barTwo.backgroundColor = color;
            z++;
          }
          else{
             z++;
             x++; 
        } 
          }
        testcount--;
        }
      },i* 3000)
    }
  //     setTimeout(() => {
  //     for (let y = 0; y < 2; y++) {
  //     const arrayBars = document.getElementsByClassName('array-bar');
  //     const isColorChange = i % 3 !== 2;
  //     if (isColorChange) {
  //       setTimeout(() => {
  //           current = i;
  //           const barOneStyle = arrayBars[current].style;
  //             const barTwoStyle = arrayBars[current + 1].style;
  //           const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
  //           barOneStyle.backgroundColor = color;
  //           barTwoStyle.backgroundColor = color;
  //           z++;
  //         }
  //       }, y * ANIMATION_SPEED_MS);
  //     }
  //     else {
  //       setTimeout(() => { 
  //         current = i ;
  //         if (i == animations[count]) {
  //          // t++;
  //         //swap
  //         const barOneStyle = arrayBars[current].style;
  //         const barTwoStyle = arrayBars[current+1].style;
  //         const tmp = barOneStyle.height;
  //         barOneStyle.height = `${barTwoStyle.height}`;
  //         barTwoStyle.height = `${tmp}`;

  //         while(animations[count] > animations[count + 1]){
  //           current--;
  //           //swap
  //           const barOneStyle = arrayBars[current].style;
  //           const barTwoStyle = arrayBars[current+1].style;
  //           const tmp = barOneStyle.height;
  //           barOneStyle.height = `${barTwoStyle.height}`;
  //           barTwoStyle.height = `${tmp}`;
            
  //           count ++;
  //         }
  //         count ++;
  //       }
  //         // if ((i - fix) % (arrayL - 1) === 0) {
  //         //   z = -1;
  //         //   time--;
  //         //   fix++;
  //         // }
  //         // z++;
  //         // x++;
  //       }
  //     }, y * ANIMATION_SPEED_MS);
  //   }
  //   }
  // }, i * ANIMATION_SPEED_MS);
      
  //     // if (i == animations[count]) {
  //     //   //swap
  //     //   const tmp = barOneStyle.height;
  //     //   barOneStyle.height = `${barTwoStyle.height}`;
  //     //   barTwoStyle.height = `${tmp}`;

  //     //   while(animations[count] > animations[count + 1]){
  //     //     current--;
  //     //     //swap

  //     //   }
  //     //   count ++;
  //     // }
  //   }

  // //   var time = this.state.array.length;
  // //   var arrayL = ((this.state.array.length - 1) * 3);
  // //   var totalAnimationSteps = arrayL * time;
    
  // //   var arrAnimation = [];
  // //   var num = 0;
  // //   for (let t = 0; t < arrayL; t++) {
  // //     var test = t % 3 !== 2;
  // //     if (test) {
  // //       arrAnimation.push([num,num+1]);
  // //     }
  // //     else{
  // //       arrAnimation.push([num,num+1]);
  // //       num++;
  // //     }
  // //   }
  // //    var x = 0;
  // //    var t = 0;
  // //    var z = 0;
  // //    var fix = 0;
  // //     for (let i = 0; i < totalAnimationSteps; i++) {
  // //       const arrayBars = document.getElementsByClassName('array-bar');
  // //       const isColorChange = i % 3 !== 2;
  // //       if (isColorChange) {
  // //         setTimeout(() => {
  // //         const [barOneIdx,barTwoIdx] = arrAnimation[z];
  // //         const barOneStyle = arrayBars[barOneIdx].style;
  // //         const barTwoStyle = arrayBars[barTwoIdx].style;
  // //         const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
  // //           barOneStyle.backgroundColor = color;
  // //           barTwoStyle.backgroundColor = color;
  // //           z++;
  // //         }, i * ANIMATION_SPEED_MS);
  // //       }
  // //       else {
  // //         setTimeout(() => {
  // //           var ar = arrAnimation[z];
  // //           if (animations[t] == ar[0]) {
  // //             t++;
  // //             const [barOneIdx,barTwoIdx] = arrAnimation[z];
  // //           const barOneStyle = arrayBars[barOneIdx].style;
  // //           const barTwoStyle = arrayBars[barTwoIdx].style;
  // //           const tmp = barOneStyle.height;
            
  // //           barOneStyle.height = `${barTwoStyle.height}`;
  // //           barTwoStyle.height = `${tmp}`;
  // //           }
  // //           if ((i - fix) % (arrayL - 1) === 0) {
  // //             z = -1;
  // //             time--;
  // //             fix++;
  // //           }
  // //           z++;
  // //           x++;
  // //       }, i * ANIMATION_SPEED_MS);
  // //     }
  // // }
  //   console.log(animations);
  }
  selectionSort(){
    
  }
  quickSort() {
  }
  heapSort() {
  }
  
  render() {
    const {array} = this.state;

    return (
      <div className="board-container">
        <div className="algo-btn">
        <button className="glow-on-hover sm-btn" onClick={() => this.resetArray()}>Generate New Array</button>
        <button className="glow-on-hover sm-btn" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="glow-on-hover sm-btn" onClick={() => this.quickSort()}>Quick Sort</button>
        <button className="glow-on-hover sm-btn" onClick={() => this.heapSort()}>Heap Sort</button>
        <button className="glow-on-hover sm-btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className="glow-on-hover sm-btn" onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button className="glow-on-hover sm-btn" onClick={() => this.selectionSort()}>Selection Sort</button>
        </div>
        <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${13*value}px`,
            }}></div>
        ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
