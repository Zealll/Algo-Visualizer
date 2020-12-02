import { shortestPath } from '../helpers/algo_helpers.js'

export function dijkstras(nodes, startNode, endNode, func) {
    const visitedNodesInOrder = []
    startNode.setDistance(0)
    const unvisitedNodes = []
    for (let i of nodes) {
        for (let j of i) {
            unvisitedNodes.push(j)
        }
    }

    function recursion() {
        unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance)
        
        const closestNode = unvisitedNodes.shift()
        if (closestNode.isWall) return recursion()
        if (closestNode.distance === Infinity) {alert('There is no path to final destination!'); return}
        
        closestNode.visit()
        
        visitedNodesInOrder.push(closestNode)
    
        if(closestNode.lon === endNode.lon && closestNode.lat === endNode.lat) return shortestPath(endNode, [])
        
        document.getElementById(`Row-${closestNode.lon}-Col-${closestNode.lat}`).className = `${document.getElementById(`Row-${closestNode.lon}-Col-${closestNode.lat}`).className} visited`

        const neighbors = closestNode.findNeighbors(nodes)
    
        for (let n of neighbors) {
            n.setDistance(closestNode.distance + 1 + closestNode.weight)
            n.prevNode = closestNode
        }

        setTimeout(() => {
            return recursion()
        }, 10)
    }

    recursion()
}