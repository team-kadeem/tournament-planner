class Bracket {
    constructor(
        leftChild,
        rightChild,
        fighter1,
        fighter2,
        winner,
        loser,
        description,
        root,
        nodeNumber,
        roundNumber,
        division
    ) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.winner = winner;
        this.loser = loser;
        this.description = description;
        this.root = root
        this.nodeNumber = nodeNumber
        this.roundNumber = roundNumber
        this.division = division
    }

    updateWinner(winner) {
        this.winner = winner
        //should also update the fighter in the parent bracket
    }

    updateLoser(loser) {
        this.loser = loser
    }

    updateDescription(description) {
        this.description = description
    }

    updateFighters() {
        if (this.root) return 
        this.fighter1 = this.leftChild.winner
        this.fighter2 = this.rightChild.winner
    }

    declareWinner() {
        if (!this.root) return
        return this.winner
    }


}

module.exports = {}
module.exports.Bracket = Bracket

