const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("404 Section", {
        class: "section-404",
        tag: "section"
    }),
    "enabled_on": {
        "template": "404"
    },
    "settings": []
}