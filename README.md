# Interative Map of the USA

## Usage

Include _dist/usa-map.js_ in your HTML and add _dist/usa-map.svg_ to your public assets.

Example:
```
<svg id="usa-map" />

<script>
    InteractiveMapUSA.init({
        mapSVGPath: "/assets/usa-map.svg",
        maps: [
            {
                id: "usa-map",
                linkTo: "https://en.wikipedia.org/wiki/{{state}}", // 'state' is the name of the state snake cased as in 'north_carolina'
                disabledStates: ["HI", "NY"],
                styles: {
                    stateFill: "red",
                    disabledStateFill: "#782abb",
                    stateHoverFill: "#888fff"
                }
            }
        ]
    })
</script>
```

