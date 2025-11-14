const {app} = require('@anchovie/schematic');

module.exports = {
    name: "Image",
    settings: [
        app.make("image_picker", {
            id: "image",
            label: "Image"
        }),
        app.make("select", {
            id: "image_ratio",
            label: "Image Aspect Ratio",
            default: "adapt",
            options: [
                app.option("adapt", "Adapt to Image"),
                app.option("square", "Square (1:1)"),
                app.option("portrait", "Portrait (4:5)"),
                app.option("landscape", "Landscape (16:9)")
            ]
        }),
        app.make("url", {
            id: "link",
            label: "Link"
        }),
        app.make("select", {
            id: "width",
            label: "Width",
            default: "fill",
            options: [
                app.option("fit-content", "Fit Content"),
                app.option("fill", "Fill Available Space")
            ]
        })
    ]
};
