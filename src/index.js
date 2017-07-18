import SVGInjector from "svg-injector-2"

class Map {

    constructor(options) {
        this.options = options
        this.el.setAttribute("data-src", "/assets/usa-map.svg")
    }

    get el() {
        return document.querySelector(`#${this.options.id}`)
    }

    bindCallbacks() {
        var hotspots = this.el.querySelectorAll("path")
        hotspots.forEach(spot => {
            spot.onclick = function(e) {
                window.location.href = e.target.id
            }
        })
    }
}

class InteractiveMapUSA {
    
    static maps = []

    static init() {
        var args = Array.from(arguments)

        InteractiveMapUSA.maps = args.map(function(options) {
            return new Map(options)
        })

        InteractiveMapUSA.inject()
    }

    static inject() {
        
        new SVGInjector().inject(
            document.querySelectorAll("svg[data-src]"),
            InteractiveMapUSA.afterInject
        )
    }

    static afterInject() {
        InteractiveMapUSA.maps.forEach(function(map) {
            map.bindCallbacks()
        })
    }
}

window.InteractiveMapUSA = InteractiveMapUSA
