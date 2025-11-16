const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Modal", {
        class: "section-modal",
    }),
    "settings": [
        {
            type: 'text',
            id: 'title',
            label: 'Modal Title',
            default: 'Modal Title'
        },
        {
            type: 'textarea',
            id: 'text',
            label: 'Modal Text',
            default: 'This is modal content. You can customize this text in the theme editor.'
        }
    ]
}