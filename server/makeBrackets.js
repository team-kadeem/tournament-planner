const { Bracket } = require('./bracket')

//Get total number of fighters for a division
//The total number of brackets will be the number of fighters - 1
//The base of the tree is the number of people to eliminate
//If that's zero, then the total number is a power of 2 and the base is that divided by 2

const fighters = [
    'fighter1',
    'fighter2',
    'fighter3',
    'fighter4',
    'fighter5',
    'fighter6',
    'fighter7',
    'fighter8',
    'fighter9',
    // 'fighter10',
    // 'fighter11',
    // 'fighter12',
    // 'fighter13',
    // 'fighter14',
    // 'fighter15',
    // 'fighter16'
]
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

const determineChildNodes = (parentNodeNumber, comepleteBracket) => {
    const leftNode = parentNodeNumber - (comepleteBracket - parentNodeNumber + 1)
    const rightNode = parentNodeNumber - (comepleteBracket - parentNodeNumber) 
    const nodeLocations = {
        leftNode,
        rightNode
    }
    return nodeLocations
}

const findChildNode = (nodeList, nodeNumber) => {
   let foundAt 
    nodeList.forEach((node, index) => {
        if (node.nodeNumber === nodeNumber) {
            foundAt = index
        }
    })
    return foundAt
}

const mapFightersToBrackets = (fighters, nodeList) => {
    const treeBase = (nodeList.length + 1) / 2
    
    for (let i = 0; i < 2; i++) {
       for (let j = 0; j < treeBase; j++) {
           if (i == 0) {
            console.log(`mapping fighter ${fighters[0]} to node ${nodeList[j].nodeNumber}`)
            nodeList[j].fighter1 = fighters.shift()
           } else {
               if (fighters.length === 0) {
                   nodeList[j].fighter2 = 'Bye'
               } else {
                   nodeList[j].fighter2 = fighters.shift()
               }
           }
       }
    }

    return nodeList

}

const makeBracketsForDivision = (numOfFighters, fighters) => {
    const numOfRounds = numberOfRounds(numOfFighters)
    const completeBracket = 2**numOfRounds
    let nodesInRound = 2**numOfRounds / 2

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
                let root = false
                if (i === numOfRounds - 1)
                    root = true
                    
                let node = new Bracket(
                    undefined,
                    undefined,
                    undefined, //get from child
                    undefined, //get from child
                    undefined,
                    undefined,
                    undefined,
                    root,
                    nodes.length + 1 //so the count is not 0 based
                )
                //determine the node numbers of the children for this parent node

                let children = determineChildNodes(node.nodeNumber, completeBracket)
                node.leftChild = nodes[findChildNode(nodes, children['leftNode'])],
                node.rightChild = nodes[findChildNode(nodes, children['rightNode'])],
                nodes.push(node)
            }
            
        }
        nodesInRound /= 2
    }

    nodes = mapFightersToBrackets(fighters, nodes)
    console.log(nodes)
    
}

// makeBracketsForDivision(8)
makeBracketsForDivision(9, fighters)
