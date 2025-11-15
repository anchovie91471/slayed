const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Divider", {
        class: "divider-section",
        tag: "section"
    }),
    "settings": [
        app.make("select", {
            id: "style",
            label: "Divider Style",
            default: "solid",
            options: [
                app.option("solid", "Solid"),
                app.option("dotted", "Dotted"),
                app.option("dashed", "Dashed")
            ]
        }),
        app.make("color", {
            id: "color",
            label: "Divider Color",
            default: "#e5e7eb"
        }),
        app.make("range", {
            id: "thickness",
            label: "Thickness",
            min: 1,
            max: 10,
            step: 1,
            unit: "px",
            default: 1
        }),
        app.make("select", {
            id: "width",
            label: "Width",
            default: "container",
            options: [
                app.option("full", "Full Width"),
                app.option("container", "Container Width"),
                app.option("narrow", "Narrow")
            ]
        }),
        app.make("range", {
            id: "spacing_top",
            label: "Spacing Top",
            min: 0,
            max: 100,
            step: 5,
            unit: "px",
            default: 40
        }),
        app.make("range", {
            id: "spacing_bottom",
            label: "Spacing Bottom",
            min: 0,
            max: 100,
            step: 5,
            unit: "px",
            default: 40
        })
    ],
    "presets": [
        {
            "name": "Divider"
        }
    ]
};
