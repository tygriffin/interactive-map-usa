import { defaults } from "lodash"
import DOM from "./DOM"
import StateLookup from "./StateLookup"
import { forOwn, isString } from "lodash"

const DEFAULT_OPTIONS = {
    id: "",
    linkTo: "",
    // onClick: null, // TODO
    // onHover: () => {}, // TODO
    styles: {},
    disabledStates: [],
    mapSVGPath: "/usa-map.svg",
}

const DEFAULT_STYLES = {
    stateFill: "#d3d3d3",
    disabledStateFill: "#444444",
    stateHoverFill: "#002868",
}

function validateOptions(options) {
    var errors = []

    if (!isString || !options.id.length) {
        errors.push("Map options require an 'id'")
    }

    const validateKeys = (opts, valid) => {
        opts.forEach(key => {
            if (valid.indexOf(key) === -1) {
                errors.push(`Found unexpected key '${key}' in options`)
            }
        })
    }

    validateKeys(Object.keys(options), Object.keys(DEFAULT_OPTIONS))
    validateKeys(Object.keys(options.styles || {}), Object.keys(DEFAULT_STYLES))

    if (errors.length) {
        throw new Error(errors.join("\n"))
    }
}

export default class InteractiveMap {

    constructor(options) {
        try {
            validateOptions(options)
        }
        catch(err) {
            console.warn(`Error validating options: ${err.message}`)
        }

        this.options = defaults(options, DEFAULT_OPTIONS)
        this.styles = defaults(this.options.styles, DEFAULT_STYLES)

        this.dom = new DOM(this.options.id)
        this.dom.setDataSource(this.options.mapSVGPath)
    }

    mount() {
        this.dom.states.forEach(state => {
            let disabled = this.options.disabledStates.indexOf(state.id) !== -1
            
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
            state.addEventListener(onevent, handler)
        })
    }

    bindHoverStyles(state) {
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
            callbackLookup.click = (e) => {
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