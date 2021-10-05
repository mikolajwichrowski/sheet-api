const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main.js')

chai.use(chaiHttp)

describe('Integration: List endpoint', () => {
    describe('Get list from main', () => {
        it('Should return a list of rows', (done) => {
            chai.request(server)
                .get("/Test")
                .end((err, res) => {
                    assert.equal(res.body.rows.length, 3)
                    done();
                })
            
        })

        it('Should return a 404', (done) => {
            chai.request(server)
                .get("/Test1")
                .end((err, res) => {
                    assert.equal(res.status, 404)
                    assert.equal(res.body.message, "not found")
                    done();
                })
        })
    })
})