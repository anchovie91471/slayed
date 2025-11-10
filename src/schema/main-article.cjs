const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Main Article Section", {
        class: "section-main-carticle",
        tag: "section"
    }),
    "settings": []
}