const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Product Section", {
        class: "section-main-product",
        tag: "section"
    }),
    "enabled_on": {
        "templates": ["product"]
    },
    "settings": [
        {
            "type": "header",
            "content": "Product Variants"
        },
        app.make("radio", {
            id: "picker_type",
            label: "Variant Picker Type",
            default: "radio",
            options: [
                app.option("radio", "Radio Buttons"),
                app.option("select", "Select Dropdowns")
            ]
        }),
        {
            "type": "header",
            "content": "Product Gallery"
        },
        app.make("checkbox", {
            id: "enable_gallery",
            label: "Enable Image Gallery",
            default: true,
            info: "Show all product images with thumbnail navigation"
        }),
        app.make("radio", {
            id: "gallery_layout",
            label: "Thumbnail Position",
            default: "bottom",
            options: [
                app.option("bottom", "Below Image (Horizontal)"),
                app.option("left", "Left Side (Vertical)")
            ]
        }),
        app.make("range", {
            id: "gallery_thumbnail_size",
            label: "Thumbnail Size",
            default: 80,
            min: 60,
            max: 120,
            step: 10,
            unit: "px"
        }),
        {
            "type": "header",
            "content": "Image Zoom"
        },
        app.make("checkbox", {
            id: "enable_zoom",
            label: "Enable Image Zoom",
            default: true,
            info: "Allow customers to zoom product images"
        }),
        app.make("radio", {
            id: "zoom_type",
            label: "Zoom Behavior",
            default: "hover",
            options: [
                app.option("hover", "Hover Zoom (Desktop) / Tap (Mobile)"),
                app.option("lightbox", "Click to Open Lightbox"),
                app.option("both", "Both Hover and Lightbox")
            ]
        }),
        app.make("range", {
            id: "zoom_level",
            label: "Zoom Magnification",
            default: 2,
            min: 1.5,
            max: 4,
            step: 0.5,
            unit: "x"
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