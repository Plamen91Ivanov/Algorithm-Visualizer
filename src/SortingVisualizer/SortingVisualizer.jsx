import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getBubleSortAnimation} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

const times = 0;
// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 31;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

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
     var indexAnimation = 0;
     var x = 0;
     var t = 0;
     var z = 0;
     var fix = 0;
      for (let i = 0; i < totalAnimationSteps; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          setTimeout(() => {
            console.log('z '+ z)
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
            // if (animations.length - 2 == t) {
            //   console.log("tuk");
            // }
            // if (arrAnimation.length == i) {
            //   i = -1;
            // }
            console.log('i ' + i );
            console.log('arrr ' + (arrayL-1));
            console.log(i % (arrayL - 1) === 0);
           
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
              console.log('i wath to be here');
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
  quickSort() {
  }
  heapSort() {
  }
  
  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${10*value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
