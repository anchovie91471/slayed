const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Recently Viewed Products", {
        class: "section-recently-viewed",
        tag: "section"
    }),
    "settings": [
        app.make("checkbox", {
            id: "enable_recently_viewed",
            label: "Enable Recently Viewed",
            default: true,
            info: "Track and display products the customer has viewed"
        }),
        app.make("text", {
            id: "heading",
            label: "Heading",
            default: "Recently Viewed"
        }),
        app.make("range", {
            id: "products_to_show",
            label: "Products to Show",
            default: 4,
            min: 2,
            max: 8,
            step: 1
        }),
        app.make("range", {
            id: "columns_desktop",
            label: "Columns (Desktop)",
            default: 4,
            min: 2,
            max: 5,
            step: 1
        }),
        app.make("checkbox", {
            id: "exclude_current_product",
            label: "Exclude Current Product",
            default: true,
            info: "Don't show the current product in the list"
        }),
        app.make("select", {
            id: "heading_size",
            label: "Heading Size",
            default: "medium",
            options: [
                app.option("small", "Small"),
                app.option("medium", "Medium"),
                app.option("large", "Large")
            ]
        }),
        app.make("select", {
            id: "text_alignment",
            label: "Text Alignment",
            default: "center",
            options: [
                app.option("left", "Left"),
                app.option("center", "Center"),
                app.option("right", "Right")
            ]
        })
    ]
}
