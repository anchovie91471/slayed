const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Cart Section", {
        class: "section-main-collection",
        tag: "section"
    }),
    "enabled_on": {
        "template": "cart"
    },
    "settings": [
        app.make("text", {
            id: "summary-message",
            label: "Cart Summary Message",
            default: "Taxes and shipping calculated at checkout"
        })
    ]
}