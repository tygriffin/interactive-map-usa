const Nightmare = require("nightmare")
const assert = require("assert")

const TIMEOUT = "10s"
const HOST = "localhost"
const PORT = "8080"
const URL = "http://" + HOST + ":" + PORT + "/"

describe("Map", function() {
    this.timeout(TIMEOUT)
    
    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare()
    })

    describe("Interactive Map", () => {

        it("should navigate to specific page when a state is clicked", done => {

            nightmare
                .goto(URL)
                .wait("#NC")
                .click("#NC")
                .wait(3000)
                .url()
                .end()
                .then(url => {
                    assert.equal(url.toLowerCase(), "https://en.wikipedia.org/wiki/north_carolina")
                    done()
                })
                .catch(done)
        })

        it("should disable states based on configuration", done => {

            nightmare
                .goto(URL)
                .wait("#HI")
                .click("#HI")
                .wait(3000)
                .url()
                .end()
                .then(url => {
                    assert.equal(url.toLowerCase(), URL)
                    done()
                })
                .catch(done)
        })

        it("should add class 'disabled' to disabled states", done => {
            nightmare
                .goto(URL)
                .exists("#HI.disabled")
                .end()
                .then(exists => {
                    assert.equal(exists, true)
                    done()
                })
                .catch(done)
        })
    })
})