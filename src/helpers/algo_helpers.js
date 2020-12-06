export function shortestPath(endN) {
    const shortest = []
    let currentNode = endN

    while (currentNode) {
        shortest.unshift(currentNode)
        currentNode = currentNode.prevNode
    }

    let count = 0

    function animatePath() {
        if (count < shortest.length) {
            let nodeClass = `Row-${shortest[count].lon}-Col-${shortest[count].lat}`
            document.getElementById(nodeClass).className = `${document.getElementById(nodeClass).className} shortest`
            count += 1
            setTimeout(() => {
                return animatePath()
            }, 20)
            
        }  
    }

    animatePath()

    // for (let node of shortest) {
    //     let nodeClass = `Row-${node.lon}-Col-${node.lat}`
    //     document.getElementById(nodeClass).className = `${document.getElementById(nodeClass).className} shortest`
    // }
}