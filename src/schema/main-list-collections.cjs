const { app } = require('@anchovie/schematic');

module.exports = {
    ...app.section("Main List Collections", {
        class: "section-main-list-collections",
        tag: "section"
    }),
}