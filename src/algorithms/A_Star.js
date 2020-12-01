export function aStar(nodes, startNode, endNode) {
    const openList = []
    const closedList = []
    // This is gonna be the F of the A* algo equation
    startNode.setDistance(0)
    openList.push(startNode)

    function recursion() {
        let currentNode = openList.sort((node1, node2) => node1.distance - node2.distance).shift()

        closedList.push(currentNode)

        if (currentNode === endNode) return 
        if (!currentNode) return
        if (currentNode.isWall) return recursion()

        currentNode.visit()
        document.getElementById(`Row-${currentNode.lon}-Col-${currentNode.lat}`).className = `${document.getElementById(`Row-${currentNode.lon}-Col-${currentNode.lat}`).className} visited`

        let neighbors = currentNode.findNeighbors(nodes)
        for (let n of neighbors) {
            if (closedList.includes(n)) continue
        
            //Replace the "currentNode" with "n" and the path will change!!! 
            let HDistance = ((currentNode.lon - endNode.lon) ** 2) + ((currentNode.lat - endNode.lat) ** 2)
            n.h = currentNode.h + 1
            n.setDistance(n.h + currentNode.weight + HDistance)

            n.prevNode = currentNode

            if (!openList.includes(n)) openList.push(n)
        }

        setTimeout(() => {
            return recursion()
        }, 10)
    }

    recursion()
}



