const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section('Featured Collection', {
        class: "section-featured-collection"
    }),
    "settings": [
        app.make("collection", {
            id: "featured_collection",
            label: "Collection"
        }),
    ],
    "presets": [
        {
            "name": "Featured Collection"
        }
    ]
}