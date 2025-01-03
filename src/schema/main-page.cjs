const { app } = require('@alleyford/schematic');

module.exports =   {
    ...app.section("Default Page Section", {
        class: "section-main-page",
        tag: "section"
    }),
    "settings": [
        app.make("image_picker", {
            id: "featured_image_esc",
            label: "Featured Image"
        })
    ]
}