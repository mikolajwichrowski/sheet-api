const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main.js')

chai.use(chaiHttp)

describe('Integration: Delete endpoint', () => {
    describe('Deleting a row', () => {
        it('Should delete a row', (done) => {
            chai.request(server)
                .delete('/Test/5')
                .end((err, res) => {
                    if(err) {
                        done(err);
                    }
                    assert.equal(res.status, 204)
                    done()
                })
        })

        it('should not find the row it wants to delete', (done) => {
            chai.request(server)
                .delete('/Test/999')
                .end((err, res) => {
                    if(err) {
                        done(err);
                    }
                    assert.equal(res.status, 404)
                    done()
                })
        })
    })
})