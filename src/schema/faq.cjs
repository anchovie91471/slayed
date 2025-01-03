const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("FAQ Section", {
        class: "faq-section"
    }),
    "settings": [
        app.make("text", {
            id: "heading",
            label: "Heading",
        }),
    ],
    "blocks": [
        {
            "name": "Item",
            "type": "item",
            "settings": [
                app.make("text", {
                    id: "heading",
                    label: "Heading",
                }),
                app.make("richtext", {
                    id: "body",
                    label: "Body Text"
                })
            ]
        }
    ],
    "presets": [
        {
            "name": "FAQ Section"
        }
    ]
};