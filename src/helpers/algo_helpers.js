import Linked_List from '../node/linked_list_class.js'

export function shortestPath(endNode, setAlgoRunStatus) {
    // We are creating a Linked List from our end node
    let currentNode = new Linked_List(endNode)

    // Traversing from the end node to the beginning node in reverse, and at the same time creating a Linked List
    // out of every node, and chainging the nodes of the already created Linked List nodes as the "next" property
    // so that we are creating the correct order
    while (currentNode.prev) {
        let tempNode = new Linked_List(currentNode.prev)
        tempNode.next = currentNode
        currentNode = tempNode
    }

    // Because of the need for the time delay, we are using recursion here as well, and since this is not a react
    // component either, we are accessing the DOM directly to change a Node's class.
    // The function will keep recursing as well as the "currentNode" variable does not have a value of "null".
    function animatePath() {
        if (currentNode) {
            let nodeClass = `Row-${currentNode.node.lon}-Col-${currentNode.node.lat}`
            document.getElementById(nodeClass).className = `${document.getElementById(nodeClass).className} shortest`
            currentNode = currentNode.next

            setTimeout(() => {
                return animatePath()
            }, 20)
        }  
    }

    animatePath()
    
    // This is the Setter Hook that is initialized in the App Component, and is being passed down through "aStar" function.
    // It enables the Reset/Start Button, as well as switching Algorithms!
    setAlgoRunStatus(false)
}