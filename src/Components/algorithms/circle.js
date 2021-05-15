export function circle (grid, startNode, finishNode){
    const visitedNodes = [];
    const unvisitedNodes = getAllNodes(grid);
    var unvisitedNeighbors = [];
    while(!!unvisitedNodes.length){
        
        unvisitedNodes.shift();
    }
}

function getAllNodes(grid){
    const nodes = [];
    for (const row of grid) {
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}