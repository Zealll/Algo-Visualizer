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
        
        closestNode.visit()
        
        visitedNodesInOrder.push(closestNode)
    
        if(closestNode.lon === endNode.lon && closestNode.lat === endNode.lat) return shortestPath(endNode, [])
        
        document.getElementById(`Row-${closestNode.lon}-Col-${closestNode.lat}`).className = `${document.getElementById(`Row-${closestNode.lon}-Col-${closestNode.lat}`).className} visited`

        const neighbors = closestNode.findNeighbors(nodes)
    
        for (let n of neighbors) {
            n.setDistance(closestNode.distance + 1)
            n.prevNode = closestNode
        }

        setTimeout(() => {
            return recursion()
        }, 1)
        // return recursion()
    }

    recursion()
    // console.log(document.getElementById(`Row-${13}-Col-${20}`).className = `${document.getElementById(`Row-${13}-Col-${20}`).className} visited`)

    function shortestPath(endN, shortArr) {
        const shortest = shortArr
        let curr = endN


        if (curr) {
            while (curr) {
                shortest.unshift(curr)
                // console.log('hello')
            
                curr = curr.prevNode
            }  
            return shortestPath(curr, shortest)
        } else if (shortest.length) {
            // for (let i of shortest) {
                console.log(shortest)
                
                document.getElementById(`Row-${shortest[0].lon}-Col-${shortest[0].lat}`).className = `${document.getElementById(`Row-${shortest[0].lon}-Col-${shortest[0].lat}`).className} shortest`
                shortest.shift()
                setTimeout(() => {
                    return shortestPath(curr, shortest)
                }, 10)
                
            // }
        }

        
        
        
        // while (curr) {
            
        // }


        // for (let i of shortest) {
        // }
    }
    // console.log(nodes)
    // console.log(endNode)
    // shortestPath()

    // while (!!unvisitedNodes.length){
    //     // setTimeout(() => {

    //     // }, 1000)
    //     unvisitedNodes.sort((node1, node2) => node1.distance - node2.distance)
        
    //     const closestNode = unvisitedNodes.shift()
        
    //     closestNode.visit()
        
    //     visitedNodesInOrder.push(closestNode)
    
    //     if(closestNode.lon === endNode.lon && closestNode.lat === endNode.lat) return visitedNodesInOrder
        
    //     const neighbors = closestNode.findNeighbors(nodes)
    
    //     for (let n of neighbors) {
    //         n.setDistance(closestNode.distance + 1)
    //         n.prevNode = closestNode
    //     }
    // }
}