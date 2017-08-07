import { defaults } from "lodash"
import DOM from "./DOM"
import StateLookup from "./StateLookup"
import { forOwn, isString } from "lodash"

const DEFAULT_OPTIONS = {
    id: "",
    linkTo: "",
    links: {},
    // onClick: null, // TODO
    // onHover: () => {}, // TODO
    styles: {},
    disabledStates: [],
    enabledStates: [],
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

    if (options.disabledStates.length && options.enabledStates.length) {
        errors.push("Found configuration for both enabling and disabling states. Only one is allowed at a time. Both will be ignored.")
    }

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
        this.setupResponsiveStyles()

        this.dom.states.forEach(state => {
            let enabled = this.isStateEnabled(state)

            if (enabled) {
                this.bindHoverStyles(state)
                this.setupStyles(state)
                this.bindCallbacks(state)
            }
            else {
                this.setupDisabledStyles(state)
            }
        })
    }

    isStateEnabled(state) {
        const { disabledStates, enabledStates } = this.options
        if (disabledStates.length && enabledStates.length) {
            return false
        }
        if (disabledStates.indexOf(state.id) !== -1) {
            return false         
        }
        if (enabledStates.indexOf(state.id) !== -1) {
            return true            
        }
    }

    bindCallbacks(state) {
        const callbackLookup = this.getCallbackLookup()

        const stateLink = this.options.links[state.id]
        if (stateLink) {
            callbackLookup.click = (e) => {
                window.location.href = stateLink
            }
        }

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

    setupResponsiveStyles() {
        this.dom.map.style.display = "block"
        this.dom.map.style.position = "absolute"
        this.dom.map.style.top = 0
        this.dom.map.style.left = 0
        this.dom.map.style.width = "100%"
        this.dom.map.style.height = "100%"
    }

    setupStyles(state) {        
        state.style.fill = this.styles.stateFill
        state.style.cursor = "pointer"
    }

    setupDisabledStyles(state) {
        state.style.fill = this.styles.disabledStateFill
    }
}