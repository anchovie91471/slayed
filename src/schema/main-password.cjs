const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Password Section", {
        class: "section-main-password",
        tag: "section"
    }),
    "enabled_on": {
        "templates": ["password"]
    },
    "settings": []
}