const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Main Blog Section", {
        class: "section-main-blog",
        tag: "section"
    }),
    "enabled_on": {
        "templates": ["blog"],
    },
    "settings": [
        {
            "type": "header",
            "content": "Layout Settings"
        },
        {
            "type": "select",
            "id": "layout",
            "label": "Grid Layout",
            "options": [
                { "value": "grid-2", "label": "2 Columns" },
                { "value": "grid-3", "label": "3 Columns" },
                { "value": "grid-4", "label": "4 Columns" },
                { "value": "masonry", "label": "Masonry" }
            ],
            "default": "grid-3"
        },
        {
            "type": "range",
            "id": "posts_per_page",
            "label": "Posts Per Page",
            "min": 6,
            "max": 24,
            "step": 3,
            "default": 12
        },
        {
            "type": "header",
            "content": "Featured Post"
        },
        {
            "type": "checkbox",
            "id": "show_featured_post",
            "label": "Highlight First Post",
            "default": true,
            "info": "Display the first post larger than others"
        },
        {
            "type": "select",
            "id": "featured_layout",
            "label": "Featured Post Layout",
            "options": [
                { "value": "hero", "label": "Hero (Full Width)" },
                { "value": "card-large", "label": "Large Card" },
                { "value": "split", "label": "Split (Image + Content)" }
            ],
            "default": "hero"
        },
        {
            "type": "header",
            "content": "Display Options"
        },
        {
            "type": "checkbox",
            "id": "show_tags",
            "label": "Show Tags",
            "default": true
        },
        {
            "type": "checkbox",
            "id": "show_author",
            "label": "Show Author",
            "default": true
        },
        {
            "type": "checkbox",
            "id": "show_date",
            "label": "Show Date",
            "default": true
        },
        {
            "type": "checkbox",
            "id": "show_excerpt",
            "label": "Show Excerpt",
            "default": true
        },
        {
            "type": "range",
            "id": "excerpt_length",
            "label": "Excerpt Length (words)",
            "min": 20,
            "max": 100,
            "step": 10,
            "default": 40
        },
        {
            "type": "header",
            "content": "Button Style"
        },
        {
            "type": "select",
            "id": "button_style",
            "label": "Read More Button Style",
            "options": [
                { "value": "primary", "label": "Primary (Gray)" },
                { "value": "branded", "label": "Branded (Blue)" },
                { "value": "gradient", "label": "Gradient (Blue to Indigo)" },
                { "value": "secondary", "label": "Secondary (White)" }
            ],
            "default": "primary"
        },
        {
            "type": "header",
            "content": "Pagination"
        },
        {
            "type": "select",
            "id": "pagination_type",
            "label": "Pagination Style",
            "options": [
                { "value": "standard", "label": "Standard Pagination" },
                { "value": "load-more", "label": "Load More Button" },
                { "value": "infinite", "label": "Infinite Scroll" }
            ],
            "default": "load-more"
        },
        {
            "type": "text",
            "id": "load_more_text",
            "label": "Load More Button Text",
            "default": "Load More Articles"
        }
    ]
}