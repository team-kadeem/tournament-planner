const { Bracket } = require('./bracket')

//Get total number of fighters for a division
//The total number of brackets will be the number of fighters - 1
//The base of the tree is the number of people to eliminate
//If that's zero, then the total number is a power of 2 and the base is that divided by 2

const peopleToEliminate = (num, iteration) => {
    if (2**iteration === num) {
        return 0
    } else if (2**iteration > num) {
        return (num - 2**(iteration - 1))
    } else {
        return peopleToEliminate(num, (iteration + 1))
    }
}

const numberOfRounds = (numOfFighters) => {
    if (peopleToEliminate(numOfFighters, 1) > 0) {
        return Math.floor(Math.log2(numOfFighters)) + 1
    } else {
        return Math.log2(numOfFighters)
    }
}

const determineChildNodes = (parentNodeNumber, numOfFighters, ) => {
    let leftNode = parentNodeNumber - (numOfFighters - parentNodeNumber + 1)
    let rightNode = parentNodeNumber - (numOfFighters - parentNodeNumber)
    let nodeLocations = {
        leftNode,
        rightNode
    }

    return nodeLocations

}

const findChildNode = (nodeList, nodeNumber) => {
    foundAt = 0
    nodeList.forEach((node, index) => {
        if (node.nodeNumber === nodeNumber) {
            foundAt = index
        }
    })
    return foundAt
}

const makeBracketsForDivision = (numOfFighters, fighterObjects) => {
    const totalNodes = numOfFighters - 1
    let nodeCount = 0
    let nodesInRound = numOfFighters / 2


    const numOfRounds = numberOfRounds(numOfFighters)


    let nodes = []

    for (let i = 0; i < numOfRounds; i++) {
        for (let j = 0; j < nodesInRound; j++) {
            if (i === 0) {
                //first round; base of tournament tree
                let node = new Bracket(
                    undefined,
                    undefined,
                    undefined, //get from fighter objects
                    undefined, //get from fighter objects
                    undefined,
                    undefined,
                    undefined,
                    false,
                    nodes.length + 1 //so the count is not 0 based
                )
                nodes.push(node)
            } else {
                let node = new Bracket(
                    undefined,
                    undefined,
                    undefined, //get from child
                    undefined, //get from child
                    undefined,
                    undefined,
                    undefined,
                    false,
                    nodes.length + 1 //so the count is not 0 based
                )
                //determine the node numbers of the children for this parent node
                let children = determineChildNodes(node.nodeNumber, numOfFighters)
                // console.log(children)
                node.leftChild = nodes[findChildNode(nodes, children['leftNode'])],
                node.rightChild = nodes[findChildNode(nodes, children['rightNode'])],
                nodes.push(node)
            }
            
        }
        nodesInRound /= 2

    }
    nodes.forEach(node => {
        console.log(node); 
        console.log('\n\n');
    })



    
}

makeBracketsForDivision(8)
