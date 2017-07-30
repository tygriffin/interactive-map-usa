const SELECTORS = {
    state: ".state",
}

export default class DOM {

    constructor(namespaceId) {
        this.namespace = `#${namespaceId}`
        this.map = document.querySelector(this.namespace)
        
        if (!this.map) console.warn(`InteractiveMapUSA was unable to find an svg element with id '${this.options.id}'`)
    }

    setDataSource(path) {
        this.map.setAttribute("data-src", path)
    }

    get states() {
        return document.querySelectorAll(`${this.namespace} ${SELECTORS.state}`)
    }
}