const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("footer", {
        class: "footer",
        tag: "footer"
    }),
    "settings": [
        app.paragraph("t:sections.footer.settings.paragraph"),
    ]
}