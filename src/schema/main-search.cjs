const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Search Section", {
        class: "section-main-search",
        tag: "section"
    }),
    "settings": []
}