const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Multicolumn", {
        class: "multicolumn-section",
        tag: "section"
    }),
    "settings": [
        app.make("text", {
            id: "heading",
            label: "Heading",
            default: ""
        }),
        app.make("range", {
            id: "gap",
            label: "Column Gap (px)",
            min: 0,
            max: 100,
            step: 4,
            default: 16,
            unit: "px"
        }),
        app.make("select", {
            id: "alignment",
            label: "Horizontal Alignment",
            default: "flex-start",
            options: [
                app.option("flex-start", "Left"),
                app.option("center", "Center"),
                app.option("flex-end", "Right"),
                app.option("space-between", "Space Between")
            ]
        }),
        app.make("range", {
            id: "padding_top",
            label: "Padding Top (px)",
            min: 0,
            max: 100,
            step: 4,
            default: 36,
            unit: "px"
        }),
        app.make("range", {
            id: "padding_bottom",
            label: "Padding Bottom (px)",
            min: 0,
            max: 100,
            step: 4,
            default: 36,
            unit: "px"
        })
    ],
    "blocks": [
        {
            "type": "@theme"
        }
    ],
    "presets": [
        {
            "name": "Multicolumn",
            "blocks": [
                {
                    "type": "column"
                },
                {
                    "type": "column"
                },
                {
                    "type": "column"
                }
            ]
        }
    ]
};
