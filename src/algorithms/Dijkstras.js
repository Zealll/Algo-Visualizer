// import React, {useState} from 'react'
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
        if (!unvisitedNodes.length) return
        unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance)
        
        const closestNode = unvisitedNodes.shift()
        if (closestNode.isWall) return recursion()
        
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

    function shortestPath(endN, shortArr) {
        const shortest = []
        let currentNode = endN

        while (currentNode) {
            shortest.unshift(currentNode)
            currentNode = currentNode.prevNode
        }
        console.log(shortest)
        for (let node of shortest) {
            document.getElementById(`Row-${node.lon}-Col-${node.lat}`).className = `${document.getElementById(`Row-${node.lon}-Col-${node.lat}`).className} shortest`
        }
        // const shortest = shortArr
        // let curr = endN

        // if (curr) {
        //     while (curr) {
        //         shortest.push(curr)

        //         curr = curr.prevNode
        //     } 

        //     return shortestPath(curr, shortest)

        // } else if (shortest.length) {     
        //         document.getElementById(`Row-${shortest[shortest.length - 1].lon}-Col-${shortest[shortest.length - 1].lat}`).className = `${document.getElementById(`Row-${shortest[shortest.length - 1].lon}-Col-${shortest[shortest.length - 1].lat}`).className} shortest`
                
        //         shortest.pop()
                
        //         setTimeout(() => {
        //             return shortestPath(curr, shortest)
        //         }, 2)
        // }
    }
}