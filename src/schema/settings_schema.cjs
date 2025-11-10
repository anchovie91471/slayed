const {app} = require('@anchovie/schematic');

module.exports = [
    {
        "name": "theme_info",
        "theme_name": "VAST",
        "theme_version": "1.0.0",
        "theme_author": "Michael Baggett",
        "theme_documentation_url": "https://THEME_DOCUMENTATION_URL.com",
        "theme_support_url": "https://THEME_SUPPORT_URL.com"
    },
    {
        "name": "Theme Settings",
        "settings": [
            app.header("Branding"),
            app.make("image_picker", {
                id: "logo",
                label: "Logo Image"
            }),
            app.header("Promo Bar"),
            app.make("checkbox", {
                id: "show_promo_bar",
                label: "Show Promo Bar"
            }),
            app.make("checkbox", {
                id: "collapse_promo_bar",
                label: "Collapse Promo Bar on Scroll",
                default: true
            }),
            app.make("richtext", {
                id: "promo_bar_content",
                label: "Promo Bar Content"
            }),
            app.header("Predictive Search"),
            app.make("checkbox", {
                id: "enable_predictive_search",
                label: "Enable Predictive Search"
            }),
            app.header("Modal"),
            app.make("checkbox", {
                id: "enable_modal",
                label: "Enable Modal"
            }),
            app.make("text", {
                id: "modal_title",
                label: "Title",
                default: "Modal Title"
            }),
            app.make("text", {
                id: "modal_description",
                label: "Description",
                default: "Modal Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque totam cum cupiditate officia et quaerat blanditiis culpa? Hic, nesciunt id."
            })
        ]
    }
]