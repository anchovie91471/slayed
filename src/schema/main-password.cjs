const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Password Section", {
        class: "section-main-password",
        tag: "section"
    }),
    "settings": []
}