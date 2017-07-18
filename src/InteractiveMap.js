import { defaults } from "lodash"
import StateLookup from "./StateLookup"
import { forOwn } from "lodash"

const DEFAULT_OPTIONS = {
    id: "",
    linkTo: "",
    onClick: null,
    onHover: () => {},
}

export default class InteractiveMap {

    constructor(options) {
        this.options = defaults(options, DEFAULT_OPTIONS)

        if (!this.options.id.length) {
            throw "Map options require an 'id'"
        }

        this.el.setAttribute("data-src", "/assets/usa-map.svg")
    }

    get el() {
        var el = document.querySelector(`#${this.options.id}`)
        if (!el) console.warn(`InteractiveMapUSA was unable to find an svg element with id '${this.options.id}'`)
        return el
    }

    bindCallbacks() {
        const hotspots = this.el.querySelectorAll("path")
        const callbackLookup = this.getCallbackLookup()

        hotspots.forEach(spot => {
            forOwn(callbackLookup, (handler, onevent) => {
                spot[onevent] = handler
            })
        })
    }

    getCallbackLookup() {
        var callbackLookup = {}

        if (this.options.linkTo.length) {
            callbackLookup.onclick = (e) => {
                window.location.href = this.getLink(e.target.id)
            }
        }

        return callbackLookup
    }

    getLink(stateAbbrev) {
        var stateName = StateLookup[stateAbbrev]
        if (!stateName) throw `Unable to lookup state name for abbreviation ${stateAbbrev}`
        
        var tmpl = this.options.linkTo
        
        stateName = stateName.replace(/ /g, "_").toLowerCase()
        tmpl = tmpl.replace(/{{state}}/g, stateName)

        console.log(stateName)
        console.log(tmpl)

        return tmpl
    }
}