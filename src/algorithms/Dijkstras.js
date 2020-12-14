import { shortestPath } from '../helpers/algo_helpers.js'

export function dijkstras(nodes, startNode, endNode, isWeighted, algo) {
    const visitedNodesInOrder = []
    startNode.setDistance(0)
    const unvisitedNodes = []
    for (let i of nodes) {
        for (let j of i) {
            unvisitedNodes.push(j)
        }
    }

    const depthStack = [startNode]

    function recursion() {
        let closestNode
        
        if (algo === 'depth_first') {
            closestNode = depthStack.pop()
        } else {
            unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance)
            closestNode = unvisitedNodes.shift()
        }
        console.log(depthStack, closestNode)
        if (!closestNode || closestNode.distance === Infinity) {alert('There is no path to final destination!'); return}
        if (closestNode.isWall || closestNode.visited) return recursion()
        
        closestNode.visit()
        
        visitedNodesInOrder.push(closestNode)
    
        if(closestNode.lon === endNode.lon && closestNode.lat === endNode.lat) return shortestPath(endNode, [])
        
        document.getElementById(`Row-${closestNode.lon}-Col-${closestNode.lat}`).className = `${document.getElementById(`Row-${closestNode.lon}-Col-${closestNode.lat}`).className} visited`

        const neighbors = closestNode.findNeighbors(nodes)
    
        for (let n of neighbors) {
            if (isWeighted) {
                n.setDistance(closestNode.distance + 1 + closestNode.weight)
            } else {
                n.setDistance(closestNode.distance + 1)
            }

            n.prevNode = closestNode
            if (algo === 'depth_first') {
                if (!visitedNodesInOrder.includes(n)) depthStack.push(n)
            }
        }

        setTimeout(() => {
            return recursion()
        }, 10)
    }

    recursion()
}