const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Main Collection Section", {
        class: "section-main-collection",
        tag: "section"
    }),
    "enabled_on": {
        "template": "collection"
    },
}