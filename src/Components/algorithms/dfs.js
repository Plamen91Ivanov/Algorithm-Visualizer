export function dfs(grid, startNode, finishNode){
    const visitedNodes = [];
    const unvisiteNodes = getAllNodes(grid);
    var unvisitedNeighbors = [];
    while(!!unvisiteNodes.length){
        const nextNode = startNode
        startNode.isVisited = true;
        visitedNodes.push(nextNode);
        //const adjNodes = getNextNode(nextNode, grid);
        const adjNodes = getUnvisitedNeighbors(nextNode, grid,unvisitedNeighbors);
        if (nextNode === finishNode) return visitedNodes;
        startNode = adjNodes.pop();
        if (startNode.isWall){
            startNode = adjNodes.pop();
                if (startNode.isWall) {
                    startNode = adjNodes.pop()
                        if (startNode.isWall) {
                            startNode = adjNodes.pop();
                        }
                }
        };
        unvisiteNodes.shift();
    }
}

function getUnvisitedNeighbors(node, grid,unvisitedNeighbors){
    const {col, row} = node;  
    if (col > 0) unvisitedNeighbors.push(grid[row][col - 1]);
    if (row < grid.length - 1) unvisitedNeighbors.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) unvisitedNeighbors.push(grid[row][col + 1]);
    if (row > 0) unvisitedNeighbors.push(grid[row - 1][col]);
  
    return unvisitedNeighbors.filter(neighbor => !neighbor.isVisited);
}

function getNextNode(node, grid) {
    let nextNodes = [];
    const {col, row} = node;

    if (col > 0) nextNodes.push(grid[row][col - 1]);
    if (row < grid.length - 1) nextNodes.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) nextNodes.push(grid[row][col + 1]);
    if (row > 0) nextNodes.push(grid[row - 1][col]);

    // if(row > 0) {
    //     if (!grid[row - 1][col].isVisited && row > 0){
    //         nextNode = grid[row - 1][col];
    //     } 
    //     else if (!grid[row][col + 1].isVisited && col < grid[0].length - 1){
    //         nextNode = grid[row][col + 1];
    //     } 
    //     else if (!grid[row + 1][col].isVisited && row < grid.length - 1){
    //         nextNode = grid[row + 1][col];
    //     } 
    //     else if (!grid[row][col - 1].isVisited && col > 0){
    //         nextNode = grid[row][col - 1];
    //     } 
    // }
    var test = nextNodes.filter(nextNode => !nextNode.isVisited);
    return test.filter(nextNode => !nextNode.isWall);
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