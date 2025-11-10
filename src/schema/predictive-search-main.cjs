const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Predictive Search", {
        class: "site-header w-full shadow-md p-shell fixed top-0 z-30 bg-white",
        tag: "div"
    }),
    "settings": [
        app.make("text", {
            id: "prompt_text",
            label: "Prompt Text",
            default: "What can we help you find?"
        })
    ]
}