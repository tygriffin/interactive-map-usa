const Nightmare = require('nightmare')
const assert = require('assert')

const TIMEOUT = '10s'
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
                // .evaluate(function() {
                //     var svgObj = document.querySelector('#map-svg')
                //     if (svgObj == null) throw 'No svg object'

                //     var svgDoc = svgObj.contentDocument
                //     if (svgDoc == null) throw 'No svg document'     
                        
                //     return document.replaceChild(svgDoc.documentElement, document.documentElement)
                // })
                .click('#NC')
                .wait(3000)
                .path()
                .end()
                .then(path => {
                    assert.equal(path, '/north_carolina')
                    done()
                })
                .catch(done)
        })
    })
})