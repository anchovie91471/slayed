const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Product Recommendations", {
        class: "section-product-recommendations",
        tag: "section"
    }),
    "settings": [
        app.make("checkbox", {
            id: "enable_recommendations",
            label: "Enable Product Recommendations",
            default: true,
            info: "Show related products using Shopify's recommendation engine"
        }),
        app.make("text", {
            id: "heading",
            label: "Heading",
            default: "You may also like"
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
