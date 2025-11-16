const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("footer", {
        class: "footer",
        tag: "footer"
    }),
    "settings": [
        app.paragraph("t:sections.footer.settings.paragraph"),
        app.make("link_list", {
            id: "footer_menu",
            label: "Footer menu",
            default: "footer"
        }),
        app.make("checkbox", {
            id: "show_social_icons",
            label: "Show social icons",
            default: true
        })
    ]
}