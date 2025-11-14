const {app} = require('@anchovie/schematic');

module.exports = {
    name: "Column",
    settings: [
        app.make("select", {
            id: "width",
            label: "Width",
            default: "fill",
            options: [
                app.option("fit-content", "Fit Content"),
                app.option("fill", "Fill Available Space")
            ]
        }),
        app.make("range", {
            id: "padding",
            label: "Padding (px)",
            min: 0,
            max: 100,
            step: 4,
            default: 0,
            unit: "px"
        })
    ],
    blocks: [
        {
            type: "@theme"
        }
    ]
};
