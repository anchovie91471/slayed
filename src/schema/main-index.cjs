const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("Main Index Section", {
        class: "section-main-index",
        tag: "section"
    }),
}