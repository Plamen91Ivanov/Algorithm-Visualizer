import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {dfs} from '../algorithms/dfs'
import {AStar} from '../algorithms/aStar'

import './PathfindingVisualizer.css';

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 1;
const FINISH_NODE_COL = 12;


export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      value: 30,
      speedValue: 110
    };
  }
  
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDFS(visitedNodes){
    for (let i = 0; i <= visitedNodes.length - 1; i++) {
        setTimeout(() => {
          const node = visitedNodes[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-visited';
        }, this.state.speedValue * i);
      }
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.state.speedValue * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, this.state.speedValue * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, this.state.speedValue * i);
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.addResetButton();
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
      const {grid} = this.state;
      const startNode = grid[START_NODE_ROW][START_NODE_COL];
      const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
      const visitedNodes = dfs(grid,startNode,finishNode);
      this.addResetButton();
      this.animateDFS(visitedNodes);
    }

    visualizeAStar() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodes = AStar(grid,startNode,finishNode);
        console.log(visitedNodes);
      }
  handleChange = (e) =>{
    this.setState({value: e.target.value})
  };
  handleSpeedValueChange = (e) =>{
    this.setState({speedValue: e.target.value}) 
    console.log(this.state.speedValue)
  };
      
  disableAllButtons(){
    document.getElementById('changeArrLength').disabled = true;
    document.getElementById('changeAnimationSpeed').disabled = true;
    const buttons = document.getElementsByClassName('sm-btn')
     for (let index = 0; index < buttons.length; index++) {
        buttons[index].disabled = true;
        buttons[index].className = "sm-btn disabled";
     }
  }
  
  enableAllButtons(){
    document.getElementById('changeArrLength').disabled = false;
    document.getElementById('changeAnimationSpeed').disabled = false;
    const buttons = document.getElementsByClassName('sm-btn')
    for (let index = 0; index < buttons.length; index++) {
      buttons[index].disabled = false;
      buttons[index].className = "glow-on-hover sm-btn";
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
    clearBoard(){
    const newGrid = getNewGrid(this.state.grid);
    console.log(newGrid);
    this.setState({grid: newGrid});
    const {grid} = this.state;
    for (let i = 0; i < 10; i++) {
        for (let x = 0; x < 15; x++) {
            document.getElementById(`node-${i}-${x}`).className = 'node';
            if (START_NODE_COL === x && START_NODE_ROW === i) {
                const startNode = grid[START_NODE_ROW][START_NODE_COL];
                document.getElementById(`node-${i}-${x}`).className = 'node node-start';
                startNode.isStart = true;
            }
            if (FINISH_NODE_COL === x && FINISH_NODE_ROW === i) {
                document.getElementById(`node-${i}-${x}`).className = 'node node-finish';
                const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
                finishNode.isFinish = true;
            }
        }
    }
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
      <div className='algo-btn'>
        <button className="glow-on-hover sm-btn" onClick={() => this.visualizeDijkstra()}>
          Dijkstra's
        </button>
        <button className="glow-on-hover sm-btn" onClick={() => this.visualizeDFS()}>
          DSF's
        </button>
        <button className="glow-on-hover sm-btn" onClick={() => this.visualizeAStar()}>
          AStar
        </button>
        <button className="glow-on-hover sm-btn" onClick={() => this.clearBoard()}>
         Clear Board
        </button>
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
           min={20}
           max={250}
           value={this.state.speedValue} 
           onChange={this.handleSpeedValueChange}
             />
            <div>{this.state.speedValue}</div>
          </div>
      <div id="resetBtn"></div>
        <div className="grid board">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>  this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 10; row++) {
    const currentRow = [];
    for (let col = 0; col < 15; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,  
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice(); 
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGrid = (grid) => {
    const newGrid = grid.slice(); 
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 15; col++) {
            const newNode = {
                col,
                row,  
                isStart: row === START_NODE_ROW && col === START_NODE_COL,
                isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
                distance: Infinity,
                isVisited: false,
                isWall: false,
                previousNode: null,
              };
              newGrid[row][col] = newNode;
        }        
    }
    return newGrid;
}
