const Nightmare = require('nightmare')
const assert = require('assert')

const TIMEOUT = '5s'
const HOST = 'localhost'
const PORT = '8080'
const URL = 'http://' + HOST + ':' + PORT

describe('Map', function() {
    this.timeout(TIMEOUT)
    
    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare()
    })

    describe('Testing', () => {
        it('should work', done => {
            nightmare
                .goto(URL)
                .evaluate(function() {
                    return document.querySelector('img').alt
                })
                .end()
                .then(alt => {
                    assert.equal(alt, "USA")
                    done()
                })
                .catch(error => {
                    console.error(error)
                    done()
                })
        })
    })
})