const { app } = require('@alleyford/schematic');

module.exports = {
    ...app.section("Main Collection Section", {
        class: "section-main-collection",
        tag: "section"
    }),
}