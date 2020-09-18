export function dijkstras(nodes, startNode, endNode) {

    const unvisited = new Set()

    for (let i = 0; i < nodes.length; i++) {
        for (let j of nodes[i]) {
            unvisited.add(j)
        }
    }

    // console.log(unvisited.delete(38123))
    // unvisited.delete(38123)
    // unvisited.delete(38122)
    // unvisited.delete(38121)

    // console.log(unvisited)
    

    return {}
}