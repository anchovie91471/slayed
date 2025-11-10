const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Main Blog Section", {
        class: "section-main-blog",
        tag: "section"
    }),
    "settings": []
}