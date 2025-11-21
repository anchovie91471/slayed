const {app} = require('@anchovie/schematic');

module.exports = {
    ...app.section("Featured Blog Posts", {
        class: "section-featured-blog-posts",
        tag: "section"
    }),
    "settings": [
        {
            "type": "header",
            "content": "Section Settings"
        },
        {
            "type": "text",
            "id": "heading",
            "label": "Section Heading",
            "default": "Featured Articles"
        },
        {
            "type": "select",
            "id": "heading_size",
            "label": "Heading Size",
            "options": [
                { "value": "text-2xl", "label": "Small" },
                { "value": "text-3xl", "label": "Medium" },
                { "value": "text-4xl", "label": "Large" }
            ],
            "default": "text-3xl"
        },
        {
            "type": "select",
            "id": "heading_alignment",
            "label": "Heading Alignment",
            "options": [
                { "value": "left", "label": "Left" },
                { "value": "center", "label": "Center" },
                { "value": "right", "label": "Right" }
            ],
            "default": "left"
        },
        {
            "type": "blog",
            "id": "blog",
            "label": "Blog",
            "info": "Select the blog to display articles from"
        },
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
                { "value": "grid-4", "label": "4 Columns" }
            ],
            "default": "grid-3"
        },
        {
            "type": "range",
            "id": "posts_count",
            "label": "Number of Posts",
            "min": 3,
            "max": 12,
            "step": 1,
            "default": 6
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
            "default": "card-large"
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
            "content": "Spacing & Colors"
        },
        {
            "type": "color",
            "id": "background_color",
            "label": "Background Color"
        },
        {
            "type": "select",
            "id": "padding_top",
            "label": "Padding Top",
            "options": [
                { "value": "none", "label": "None" },
                { "value": "small", "label": "Small" },
                { "value": "medium", "label": "Medium" },
                { "value": "large", "label": "Large" }
            ],
            "default": "medium"
        },
        {
            "type": "select",
            "id": "padding_bottom",
            "label": "Padding Bottom",
            "options": [
                { "value": "none", "label": "None" },
                { "value": "small", "label": "Small" },
                { "value": "medium", "label": "Medium" },
                { "value": "large", "label": "Large" }
            ],
            "default": "medium"
        },
        {
            "type": "header",
            "content": "Call to Action"
        },
        {
            "type": "checkbox",
            "id": "show_view_all",
            "label": "Show View All Button",
            "default": true
        },
        {
            "type": "text",
            "id": "view_all_text",
            "label": "View All Button Text",
            "default": "View All Articles"
        },
        {
            "type": "select",
            "id": "view_all_button_style",
            "label": "View All Button Style",
            "options": [
                { "value": "primary", "label": "Primary (Gray)" },
                { "value": "branded", "label": "Branded (Blue)" },
                { "value": "gradient", "label": "Gradient (Blue to Indigo)" },
                { "value": "secondary", "label": "Secondary (White)" }
            ],
            "default": "secondary"
        },
        {
            "type": "select",
            "id": "read_more_button_style",
            "label": "Read More Button Style",
            "options": [
                { "value": "primary", "label": "Primary (Gray)" },
                { "value": "branded", "label": "Branded (Blue)" },
                { "value": "gradient", "label": "Gradient (Blue to Indigo)" },
                { "value": "secondary", "label": "Secondary (White)" },
                { "value": "ghost", "label": "Ghost (Transparent)" }
            ],
            "default": "ghost",
            "info": "Style for 'Read More' buttons on blog cards"
        }
    ]
}
