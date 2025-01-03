const { app } = require('@alleyford/schematic');

module.exports =   {
    ...app.section("Cart Section", {
        class: "section-main-collection",
        tag: "section"
    }),
    "settings": [
        app.make("text", {
            id: "summary-message",
            label: "Cart Summary Message",
            default: "Taxes and shipping calculated at checkout"
        })
    ]
}