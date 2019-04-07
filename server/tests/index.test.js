//Best practice for server side tests
//Should they use the routes in index or should I just recreate the server logic in the test file?
//

const app = require('../index').app
const { Client } = require('pg')
const config = require('../configs/test')
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
    })

    it('should respond to GET', done => {
        request.get('http://localhost:5000/ping')
                .on('response', response => {
                    expect(response.statusCode).toEqual(200)
                    done()
                })
    })
}
)

describe('admin functionality', () => {
    let client;
    beforeEach(done => {
        client = new Client(config.pgTest)
        client.connect()
        done()
    })

    afterEach(done => {
        const query =  `truncate table public.tournament cascade`
        client.query(query, (err, dbResponse) => {
        })
        client.end()
        done()
    })

    it('should allow admin to create a new tournament', done => {
        const values = ['Test', '06/01/2019', '06/01/2019', '82 Wyckoff Ave. Brooklyn, NY 11237']
        const query =  `insert into public.tournament 
                        (title, event_datetime, registration_close, location) 
                        VALUES($1, $2, $3, $4) RETURNING *`
        client.query(query, values, (err, dbResponse) => {
            if (err) {
                console.log(error)
            } else {
                expect(dbResponse.rows.length).toBe(1)
                done()
            }
        })
    })
})