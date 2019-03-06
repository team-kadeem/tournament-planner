const app = require('../index').app
const pg = require('../index').pg
const request = require('request')


describe('application server', () => {
    let server;
    beforeEach(done => {
        server = app.listen(5000, () => {
            console.log('App running on port 5000')
            done()
        } )
    })

    afterEach(() => {
        server.close()
        pg.end()
    })

    it('should respond to GET', done => {
        request.get('http://localhost:5000')
                .on('response', response => {
                    console.log(response.statusCode)
                    expect(response.statusCode).toEqual(200)
                    done()
                })

    })
})