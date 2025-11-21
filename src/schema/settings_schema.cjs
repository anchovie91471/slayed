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
    },
    {
        "name": "Social media",
        "settings": [
            app.header("Social media accounts"),
            app.make("text", {
                id: "social_facebook_link",
                label: "Facebook",
                info: "https://www.facebook.com/shopify"
            }),
            app.make("text", {
                id: "social_instagram_link",
                label: "Instagram",
                info: "https://www.instagram.com/shopify"
            }),
            app.make("text", {
                id: "social_youtube_link",
                label: "YouTube",
                info: "https://www.youtube.com/shopify"
            }),
            app.make("text", {
                id: "social_tiktok_link",
                label: "TikTok",
                info: "https://www.tiktok.com/@shopify"
            }),
            app.make("text", {
                id: "social_twitter_link",
                label: "X (Twitter)",
                info: "https://twitter.com/shopify"
            }),
            app.make("text", {
                id: "social_snapchat_link",
                label: "Snapchat",
                info: "https://www.snapchat.com/add/shopify"
            }),
            app.make("text", {
                id: "social_pinterest_link",
                label: "Pinterest",
                info: "https://www.pinterest.com/shopify"
            }),
            app.make("text", {
                id: "social_tumblr_link",
                label: "Tumblr",
                info: "https://shopify.tumblr.com"
            }),
            app.make("text", {
                id: "social_vimeo_link",
                label: "Vimeo",
                info: "https://vimeo.com/shopify"
            })
        ]
    }
]