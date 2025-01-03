const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("Product Section", {
        class: "section-main-product",
        tag: "section"
    }),
    "settings": [
        app.make("radio", {
            id: "picker_type",
            label: "Variant Picker Type",
            default: "radio",
            options: [
                app.option("radio", "Radio Buttons"),
                app.option("select", "Select Dropdowns")
            ]
        })
    ],
    "blocks": [
        {
            "type": "collapsable_row",
            "name": "Collapsable Row",
            "settings": [
                app.make("text", {
                    id: "heading",
                    label: "Heading"
                }),
                app.make("richtext", {
                    id: "content",
                    label: "Content"
                }),
            ]
        }
    ]
}