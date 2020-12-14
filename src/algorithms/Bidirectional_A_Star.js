import { shortestPath } from '../helpers/algo_helpers.js'

export function bi_aStar(nodes, startNode, endNode) {
    const openList = []
    const closedList = []
    // This is gonna be the F of the A* algo equation
    startNode.setDistance(0)
    openList.push(startNode)


    let endOpenList = []
    let endClosedList = []
    endNode.setDistance(0)
    endOpenList.push(endNode)

    console.log('Start Node Lat-Lon: ', startNode.lon, startNode.lat)
    console.log('End Node Lat-Lon: ', endNode.lon, endNode.lat)

    function recursion() {
        let currentNode = openList.sort((node1, node2) => node1.distance - node2.distance).shift()
        let currentEndNode = endOpenList.sort((node1, node2) => node1.distance - node2.distance).shift()

        closedList.push(currentNode)
        endClosedList.push(currentEndNode)

        if (currentEndNode === currentNode) {

            let curr = currentEndNode
            let prev = null 
            while (curr) {
                let next = curr.prevNode
                curr.prevNode = prev
                prev = curr
                curr = next
                
                currentEndNode = prev
            }
            let front = []
            let back = []

            // while (currentNode) {
            //     console.log('RAAAAAn')
            //     front.unshift(currentNode)
            //     currentNode = currentNode.prevNode
            // }
            // while (currentEndNode) {
            //     back.unshift(currentEndNode)
            //     currentEndNode = currentEndNode.prevNode
            // }
            let reverse = null
            console.log(currentEndNode)
            // while (endNode.prevNode) {
            //     reverse = endNode.prevNode
            // }
            console.log("END NODE", reverse)
            // console.log('End', currentEndNode.prevNode)
            // currentEndNode.prevNode = currentNode
            return shortestPath(endNode)
        }
        if (!currentNode) {alert('There is no path to final destination!'); return}
        if (currentNode.isWall) return recursion()

        currentNode.visit()
        endNode.visit()
        document.getElementById(`Row-${currentNode.lon}-Col-${currentNode.lat}`).className = `${document.getElementById(`Row-${currentNode.lon}-Col-${currentNode.lat}`).className} visited`
        document.getElementById(`Row-${currentEndNode.lon}-Col-${currentEndNode.lat}`).className = `${document.getElementById(`Row-${currentEndNode.lon}-Col-${currentEndNode.lat}`).className} visited`
        let neighbors = currentNode.findNeighbors(nodes, 'AStar')
        let endNeighbors = currentEndNode.findNeighbors(nodes)
        for (let n of neighbors) {
            if (closedList.includes(n)) continue

            //Replace the "currentNode" with "n" and the path will change!!! 
            let HDistance = Math.sqrt(((n.lon - endNode.lon) ** 2) + ((n.lat - endNode.lat) ** 2))
            n.h = currentNode.h + 1
            n.setDistance(n.h + currentNode.weight + HDistance)

            n.prevNode = currentNode

            if (!openList.includes(n)) openList.push(n)
        }

        for (let n of endNeighbors) {
            if (endClosedList.includes(n)) continue

            //Replace the "currentNode" with "n" and the path will change!!! 
            let HDistance = Math.sqrt(((n.lon - startNode.lon) ** 2) + ((n.lat - startNode.lat) ** 2))
            n.h = currentNode.h + 1
            n.setDistance(n.h + currentEndNode.weight + HDistance)

            n.prevNode = currentEndNode

            if (!endOpenList.includes(n)) endOpenList.push(n)
        }

        setTimeout(() => {
            return recursion()
        }, 10)
    }

    recursion()
}