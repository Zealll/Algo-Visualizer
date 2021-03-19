import { shortestPath } from '../helpers/algo_helpers.js'

export function aStar(nodes, startNode, endNode, setAlgoRunStatus) {
    // For tracking unvisited nodes
    const unvisited = []
    // For tracking visited nodes
    const visited = []
    
    // Since we are staring from this particular node, we are going to set the distance to 0
    startNode.setDistance(0)
    unvisited.push(startNode)

    function graph_traverse() {
        // Grabs the current Nodes neighboring node that has the shortest distance
        let currentNode = unvisited.sort((node1, node2) => node1.distance - node2.distance).shift()

        // Since we are visiting this node, we will push it into our closed list so that we don't traverese it by mistake again
        visited.push(currentNode)

        // If we are reached our destination node, we will activate "shortestPath" function, to animate the path.
        // The "setAlgoRunStatus" is a Hook Setter Function that is initialized as "false". While it is false,
        // an user can interact with the UI, and select the algorithm, as well as start it, or reset the grapgh, etc.
        // However, when it is "true", an user will not be able to interact with the "start" & "reset" buttons, and won't be able
        // to reset the grapgh. Once the "shortestPath" function finishes, "setAlgoRunStatus" will take in an argument of "false"
        // indicating that the shortest path has been found, which will allow the user to interact with verything again.
        if (currentNode === endNode) return shortestPath(endNode, setAlgoRunStatus)
        if (!currentNode) {alert('There is no path to final destination!'); return}
        // If the current node is a wall, that means that we cannot pass through it, so we just call our "graph_traverse"
        // recursively and move to the next node
        if (currentNode.isWall) return graph_traverse()

        // It changes the Node Object's "visited" property to "true", this property helps us to efficiently
        // find neighbors of our current node that have not been visited yet
        currentNode.visit()
        
        // Since this function is not a hook, and it can't access Virtual DOM, we are accessing the actual DOM directly, to change the class of a
        // node we are currently on, so that it can appear as visited
        document.getElementById(`Row-${currentNode.lon}-Col-${currentNode.lat}`).className = `${document.getElementById(`Row-${currentNode.lon}-Col-${currentNode.lat}`).className} visited`
        
        // "findNeighbors" is a Node's method that finds all the surrounding neighbors that have not been visited yet
        let neighbors = currentNode.findNeighbors(nodes, 'AStar')

        // This loop iterates over theighbors, and calculates their Heuristic "Manhattan Distance" and pushes those nodes to our
        // soon to be visited nodes array (unvisited)
        for (let neighor of neighbors) {
            if (visited.includes(neighor)) continue
 
            let HDistance = Math.sqrt(((neighor.lon - endNode.lon) ** 2) + ((neighor.lat - endNode.lat) ** 2))
            neighor.h = currentNode.h + 1
            neighor.setDistance(neighor.h + currentNode.weight + HDistance)

            neighor.prevNode = currentNode

            if (!unvisited.includes(neighor)) unvisited.push(neighor)
        }

        // because of the fact that we the algorithm will be fast, "setTimeout" let's us call the 
        // recurse function with a timeout of 10 milliseconds, so that it can be slowed down, and visualized
        setTimeout(() => {
            return graph_traverse()
        }, 10)
    }

    graph_traverse()
}



