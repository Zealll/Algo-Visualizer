export function depthFirst(grid, startNode, endNode) {
    let random = grid[1][1]


    let stack = []
    stack.push(random)

    while (stack.length > 0) {
        let current = stack.pop()

        if (!current) return
        current.visit()
        // console.log('This is current', document.getElementById(`Row-1-Col-1`), current.lon, current.lat)
        document.getElementById(`Row-${current.lon}-Col-${current.lat}`).className = `${document.getElementById(`Row-${current.lon}-Col-${current.lat}`).className} visited`

        let neighbors = current.findNeighbors(grid)
        let ranIndx = Math.floor(Math.random() * neighbors.length)
        console.log(neighbors, ranIndx)

        stack.push(neighbors[ranIndx])
    }
}