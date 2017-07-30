import SVGInjector from "svg-injector-2"
import InteractiveMap from "./InteractiveMap"

export default class App {
    
    static maps = []

    static init() {
        var args = Array.from(arguments)

        App.maps = args.map(function(options) {
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