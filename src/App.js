import SVGInjector from "svg-injector-2"
import InteractiveMap from "./InteractiveMap"

export default class App {
    
    static maps = []

    static init(options) {
        const { mapSVGPath } = options
        const mapConfig = options.maps || []

        App.maps = mapConfig.map(function(options) {
            options.mapSVGPath = mapSVGPath
            return new InteractiveMap(options)
        })

        App.inject()
    }

    static inject() {
        new SVGInjector().inject(
            document.querySelectorAll("svg[data-src]"),
            App.afterInject
        )
    }

    static afterInject() {
        App.maps.forEach(function(map) {
            map.mount()
        })
    }
}