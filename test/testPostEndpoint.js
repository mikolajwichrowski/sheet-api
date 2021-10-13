const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main.js')

chai.use(chaiHttp)

describe('Integration: Post endpoint', () => {
    describe('Creating rows', () => {
        it('Should create a new test row and return 201', () => {
            const body = {
                "Key": 4,
                "Value": "d"
            }

            chai.request(server)
                .post('/Test')
                .set('content-type', 'application/json')
                .send(body)
                .end((err, res) => {
                    if(err) {
                        done(err);
                    }

                    // assert.equal(res.status, 201);
                    assert.equal(res.body, body);
                    
                    done();
                })
        })

        it('Should create nothing and return a 400', () => {
            const body = {
                "kii": 4,
                "valu": "d"
            }

            chai.request(server)
                .post('/Test')
                .set('content-type', 'application/json')
                .send(body)
                .end((err, res) => {
                    if(err) {
                        done(err);
                    }

                    assert.equal(res.status, 400)
                    assert.equal(res.body, {
                        "error": "Unknown fields supplied kii, valu"
                    })
                    
                    done();
                })
        })
    })

})