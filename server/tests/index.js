const { 
    boot, 
    shutdown 
} = require('../index')
const request = require('request')
const { expect, assert } = require('chai')
// const { assert } require('chai')


//NEEDS TO BE IN THE SAME BLOCK AS WHATEVER IT'S WORKING WITH
describe('server', () => {
    before(() => {
        console.log('B4')
        console.log('??')
        const server = boot()
    })

    describe('Home Page', () => {
        it('should respond to GET', (done) => {
            request
                .get('http://localhost:8000')
                .on('response', (response) => {
                    expect(response.status).to.equal(200)
                    done()
                })
        })
    })
    
    after(() => {
        shutdown(server)
    })

})

