const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Modal", {
        class: "section-modal",
    }),
    "settings": [
        app.make("text", {
            id: "title",
            label: "Modal Title",
            default: "Modal Title"
        }),
        app.make("textarea", {
            id: "text",
            label: "Modal Text",
            default: "This is modal content. You can customize this text in the theme editor."
        }),
        app.make("range", {
            id: "auto_open_delay",
            label: "Auto-open delay (seconds)",
            min: 0,
            max: 60,
            step: 1,
            default: 1
        }),
    ]
}