const { app } = require('@alleyford/schematic');

module.exports =   {
    ...app.section("Contact Section", {
        class: "section-main-contact",
        tag: "section"
    }),
    "settings": [
        app.make("text", {
            id: "heading",
            label: "Page Heading",
            default: "Contact Us"
        })
    ]
}