export function shortestPath(endN) {
    const shortest = []
    let currentNode = endN

    while (currentNode) {
        shortest.unshift(currentNode)
        currentNode = currentNode.prevNode
    }

    for (let node of shortest) {
        let nodeClass = `Row-${node.lon}-Col-${node.lat}`
        document.getElementById(nodeClass).className = `${document.getElementById(nodeClass).className} shortest`
    }
}