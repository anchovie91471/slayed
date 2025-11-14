const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Main Collection Section", {
        class: "section-main-collection",
        tag: "section"
    }),
    "enabled_on": {
        "templates": ["collection"]
    },
    "settings": [
        {
            "type": "header",
            "content": "Quick View"
        },
        app.make("checkbox", {
            id: "enable_quick_view",
            label: "Enable Quick View",
            default: true,
            info: "Add quick view button to product cards"
        }),
        app.make("checkbox", {
            id: "quick_view_show_description",
            label: "Show Product Description",
            default: true
        }),
        app.make("checkbox", {
            id: "quick_view_show_full_details",
            label: "Show Full Product Details",
            default: false,
            info: "Include additional product information and collapsible blocks"
        })
    ]
}