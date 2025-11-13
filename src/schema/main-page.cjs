const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Default Page Section", {
        class: "section-main-page",
        tag: "section"
    }),
    "enabled_on": {
        "templates": "page"
    },
    "settings": [
        app.make("image_picker", {
            id: "featured_image_esc",
            label: "Featured Image"
        })
    ]
}