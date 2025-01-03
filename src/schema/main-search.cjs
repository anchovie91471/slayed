const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("Search Section", {
        class: "section-main-search",
        tag: "section"
    }),
    "settings": []
}