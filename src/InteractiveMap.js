import { defaults } from "lodash"
import DOM from "./DOM"
import StateLookup from "./StateLookup"
import { forOwn } from "lodash"

const DEFAULT_OPTIONS = {
    id: "",
    linkTo: "",
    onClick: null,
    onHover: () => {},
    styles: {},
}

const DEFAULT_STYLES = {
    stateFill: "#d3d3d3",
    disabledStateFill: "#444444",
    stateHoverFill: "#002868",
}

export default class InteractiveMap {

    constructor(options) {
        this.options = defaults(options, DEFAULT_OPTIONS)
        this.styles = defaults(this.options.styles, DEFAULT_STYLES)
        
        if (!this.options.id.length) {
            throw "Map options require an 'id'"
        }

        this.dom = new DOM(this.options.id)
        this.dom.setDataSource()
    }

    mount() {
        this.dom.states.forEach(state => {
            let disabled = this.options.disableStates.indexOf(state.id) !== -1
            
            if (disabled) {
                this.setupDisabledStyles(state)
            }
            else {
                this.bindHoverStyles(state)
                this.setupStyles(state)
                this.bindCallbacks(state)
            }
        })
    }

    bindCallbacks(state) {
        const callbackLookup = this.getCallbackLookup()

        forOwn(callbackLookup, (handler, onevent) => {
            state[onevent] = handler
        })
    }

    bindHoverStyles(state) {
        window.thing = state
        
        state.addEventListener("mouseenter", () => {
            state.style.fill = this.styles.stateHoverFill
        })

        state.addEventListener("mouseout", () => {
            state.style.fill = this.styles.stateFill
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

        return tmpl
    }

    setupStyles(state) {        
        state.style.fill = this.styles.stateFill
        state.style.cursor = "pointer"
    }

    setupDisabledStyles(state) {
        state.style.fill = this.styles.disabledStateFill
    }
}