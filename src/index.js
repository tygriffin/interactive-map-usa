import SVGInjector from 'svg-injector-2'

class InteractiveMapUSA {
    
    static init() {
        new SVGInjector().inject(
            document.querySelectorAll('svg[data-src]'),
            InteractiveMapUSA.afterInject
        )
    }

    static afterInject() {
        var p = document.querySelector('#NC')
        p.onclick = function() {
            window.location.href = '/north_carolina'
        }
    }
}

window.InteractiveMapUSA = InteractiveMapUSA


// document.addEventListener('DOMContentLoaded', function(event) { 

    

// })