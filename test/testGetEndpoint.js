const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main.js')

chai.use(chaiHttp)

describe('Integration: Get endpoint', () => {
    describe('Get element from main', () => {
        it('Should return a element 1=a', (done) => {
            chai.request(server)
                .get("/Test/1")
                .end((err, res) => {
                    assert.equal(res.body["Key"], 1)
                    assert.equal(res.body["Value"], "a")
                    done();
                })
        })

        it('Should return a element 3=c', (done) => {
            chai.request(server)
                .get("/Test/3")
                .end((err, res) => {
                    assert.equal(res.body["Key"], 3)
                    assert.equal(res.body["Value"], "c")
                    done();
                })
        })

        it('Should return a 404', (done) => {
            chai.request(server)
                .get("/Test/999")
                .end((err, res) => {
                    assert.equal(res.status, 404)
                    assert.equal(res.body.message, "not found")
                    done();
                })
        })
    })
})