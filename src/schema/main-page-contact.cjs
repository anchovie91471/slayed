const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Contact Section", {
        class: "section-main-contact",
        tag: "section"
    }),
    "settings": [
        app.make("text", {
            id: "heading",
            label: "Page Heading",
            default: "Contact Us"
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
        }
    ]
}