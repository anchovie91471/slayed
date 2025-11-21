const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("FAQ Section", {
        class: "faq-section"
    }),
    "settings": [
        app.make("text", {
            id: "heading",
            label: "Heading",
        }),
        {
            "type": "select",
            "id": "heading_size",
            "label": "Heading Size",
            "options": [
                { "value": "text-2xl", "label": "Small" },
                { "value": "text-3xl", "label": "Medium" },
                { "value": "text-4xl", "label": "Large" }
            ],
            "default": "text-3xl"
        },
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