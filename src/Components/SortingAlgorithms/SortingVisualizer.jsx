import React from 'react';
import {getMergeSortAnimations} from './SortingAlgorithms';
import {getBubleSortAnimation} from './SortingAlgorithms';
import {getInsertionSortAnimation} from './SortingAlgorithms';
import {getQuickSortAnimation} from './SortingAlgorithms';

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

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      value: 30,
      speedValue: 120,
      stop:false,
      sorted:false
    };
  }
  componentDidMount() {
    this.resetArray();
  }

  handleChange = (e) =>{
    const array = [];
    for (let i = 0; i < e.target.value; i++) {
      array.push(randomIntFromInterval(5, 40));
    }
    this.setState({array});
    this.setState({value: e.target.value})
  };

  handleSpeedValueChange = (e) =>{
    this.setState({speedValue: e.target.value}) 
  };
  resetArray() {
    //  if (this.state.sorted == true) {
    //    window.location.reload();
    //    this.state.sorted = false;
    //  }
    const array = [];
     for (let i = 0; i < this.state.value; i++) {
      array.push(randomIntFromInterval(5, 40));
    }
    for (let i = 0; i < this.state.array.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      arrayBars[i].style.backgroundColor = 'turquoise';
 } 
 this.enableAllButtons();
 this.setState({array});
  }
  disableAllButtons(){
    document.getElementById('changeArrLength').disabled = true;
    document.getElementById('changeAnimationSpeed').disabled = true;
    const buttons = document.getElementsByClassName('sm-btn')
     for (let index = 0; index < buttons.length; index++) {
        buttons[index].disabled = true;
        buttons[index].className = "sm-btn disabled";
     }
  }
  disableAlgorithmButtons(){
    const algoButtons = document.getElementsByClassName('algorithm-btn');
    for (let index = 0; index < algoButtons.length; index++) {
        algoButtons[index].disabled = true;
        algoButtons[index].className = 'sm-btn algorithm-btn algorithm-button-disabled';
    }
  }
  enableAllButtons(){
    document.getElementById('changeArrLength').disabled = false;
    document.getElementById('changeAnimationSpeed').disabled = false;
    const buttons = document.getElementsByClassName('sm-btn')
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].disabled = false;
      if (index > 3) {
        buttons[index].className = "glow-on-hover sm-btn algorithm-btn";
      }
      else{
        buttons[index].className = "glow-on-hover sm-btn";
      }
    }
  }

  addResetButton(){
    let btn = document.createElement('button');
    btn.onclick = () => {
      this.stop()
    };
    btn.className = "sm-btn resetBtn";
    btn.innerHTML = "RESET"
    document.getElementById('resetBtn').appendChild(btn);
  }

  removeResetButton(){
    const buttons = document.getElementsByClassName('glow-on-hover');
    buttons[buttons.length - 1].remove();
  }

  stop(){
     window.location.reload();
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.disableAllButtons();
    this.addResetButton();
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
        }, i * this.state.speedValue);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const bigHeight = 10 * newHeight;
          barOneStyle.height = `${bigHeight}px`;
          if (i == animations.length - 1) {
            this.enableAllButtons();
            this.removeResetButton();
            this.disableAlgorithmButtons();
          }
        }, i * this.state.speedValue);
      }
    }
  }
  bubbleSort() {
    const result = getBubleSortAnimation(this.state.array,times);
    const animations = result.animations;
    this.disableAllButtons();
    this.addResetButton();
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
     console.log(arrAnimation);
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
          }, i * this.state.speedValue);
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
              x = -1;
              time--;
              fix++;
            }
            z++;
            x++;
            if (i == totalAnimationSteps - 1) {
              this.enableAllButtons();
              this.removeResetButton();
              this.disableAlgorithmButtons();
            }
         }, i * this.state.speedValue);
        }

     }
  } 
  insertionSort() {
    let animations = [];
    const result = getInsertionSortAnimation(this.state.array);
    animations = result; 
    let z = 0;
    let x = 0;
    this.disableAllButtons();
    this.addResetButton();
    console.log('arrray ',this.state.array)
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array-bar');
          for (let y = 0; y < 3; y++) {
              setTimeout(()=>{
              const isColorChange = y % 3 !== 2;
              const barOne = arrayBars[animations[i][0][0]].style;
              const barTwo = arrayBars[animations[i][0][1]].style;
              if (isColorChange) {
                const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR; 
                barOne.backgroundColor = color;
                barTwo.backgroundColor = color;
                z++;
              }
              else{
                if (animations[i][1] == true) {
                  const barOneStyle = arrayBars[animations[i][0][0]].style;
                  const barTwoStyle = arrayBars[animations[i][0][1]].style;
                  const tmp = barOneStyle.height;
                  barOneStyle.height = `${barTwoStyle.height}`;
                  barTwoStyle.height = `${tmp}`;
                } 
                 z++;
                 x++; 
            }
        if (i == (animations.length - 1) && y == 2) {
          this.enableAllButtons();
          this.removeResetButton();
          this.disableAlgorithmButtons();
          }
            },y * this.state.speedValue);
        }
      },i * (this.state.speedValue * 3))
    }
  }
  quickSort() {
  const animations = getQuickSortAnimation(this.state.array);
  this.disableAllButtons();
  this.addResetButton();
    let z = 0;
    let x = 0;
    for (let i = 0; i < animations.length; i++) {
      setTimeout(()=> {
        for (let index = animations[i][2][0]; index < animations[i][2][1]; index++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          arrayBars[index].style.backgroundColor = 'yellow';
        }
        const arrayBars = document.getElementsByClassName('array-bar');
          for (let y = 0; y < 3; y++) {
            setTimeout(()=>{
              const isColorChange = y % 3 !== 2;
              const barOne = arrayBars[animations[i][0][0]].style;
              if (animations[i][1] == false) {
                const barTwo = arrayBars[animations[i][0][1]].style;
                barTwo.backgroundColor = 'green'
              }
              if (isColorChange) {
                const color = (z - x) % 2 !== 0 ? PRIMARY_COLOR : SECONDARY_COLOR; 
                barOne.backgroundColor = color;
                z++;
              }
              else{
                if (animations[i][1] == true) {
                  const barOneStyle = arrayBars[animations[i][0][0]].style;
                  const barTwoStyle = arrayBars[animations[i][0][1]].style;
                  const tmp = barOneStyle.height;
                  barOneStyle.height = `${barTwoStyle.height}`;
                  barTwoStyle.height = `${tmp}`;
                }
                 z++;
                 x++; 
            }  
            var test = animations.length - 1
        if (i == test && y == 2) {
          this.enableAllButtons();
          this.removeResetButton();
          this.disableAlgorithmButtons();
        }
            },y * this.state.speedValue);
        }
      },i* (this.state.speedValue * 3))
    }
  }
  //implement
  heapSort() {
  }
  selectionSort(){
  }
  render() {
    const {array} = this.state;

    return (
      <div className="board-container">
        <div id='buttons' className="algo-btn">
        <button className="glow-on-hover sm-btn " onClick={() => this.resetArray()}>New Array</button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.mergeSort()}>Merge Sort</button>
        <button className="glow-on-hover sm-btn algorithm-btn" onClick={() => this.quickSort()}>Quick Sort</button>
        </div>
        <div id="resetBtn"></div>
        <div className="slider">
        <input id="changeArrLength" className = "sliderArrayLength"
           type="range"
           min={10}
           max={50}
           value={this.state.value} 
           onChange={this.handleChange}
             />
              <div>{this.state.value}</div>
             <input id="changeAnimationSpeed" className="sliderAnimationSpeed"
           type="range"
           min={10}
           max={250}
           value={this.state.speedValue} 
           onChange={this.handleSpeedValueChange}
             />
            <div>{this.state.speedValue}</div>
          </div>
        <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${13*value}px`,
            }}>{value}</div>
        ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
