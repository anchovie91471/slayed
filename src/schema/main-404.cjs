const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("404 Section", {
        class: "section-404",
        tag: "section"
    }),
    "settings": []
}