const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("header", {
        class: "section-header sticky top-0 z-20 shadow-md",
        tag: "header"
    }),
    "settings": [
        app.paragraph("t:sections.header.settings.paragraph"),
    ]
}