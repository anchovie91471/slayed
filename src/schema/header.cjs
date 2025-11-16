const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Header", {
        class: "section-header sticky top-0 z-20 shadow-md",
        tag: "header"
    }),
    "settings": [
        app.paragraph("t:sections.header.settings.paragraph"),
    ]
}