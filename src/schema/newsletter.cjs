module.exports = {
  name: 'Newsletter Signup',
  tag: 'section',
  class: 'newsletter-section',
  settings: [
    {
      type: 'text',
      id: 'heading',
      label: 'Heading',
      default: 'Subscribe to our newsletter'
    },
    {
      type: 'select',
      id: 'heading_size',
      label: 'Heading Size',
      options: [
        { value: 'text-2xl', label: 'Small' },
        { value: 'text-3xl', label: 'Medium' },
        { value: 'text-4xl', label: 'Large' }
      ],
      default: 'text-3xl'
    },
    {
      type: 'textarea',
      id: 'description',
      label: 'Description',
      default: 'Get the latest updates on new products and upcoming sales'
    },
    {
      type: 'select',
      id: 'text_alignment',
      label: 'Text Alignment',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' }
      ],
      default: 'center'
    },
    {
      type: 'text',
      id: 'button_text',
      label: 'Button Text',
      default: 'Subscribe'
    },
    {
      type: 'select',
      id: 'button_style',
      label: 'Button Style',
      options: [
        { value: 'primary', label: 'Primary (Gray)' },
        { value: 'branded', label: 'Branded (Blue)' },
        { value: 'gradient', label: 'Gradient (Blue to Indigo)' },
        { value: 'secondary', label: 'Secondary (White)' }
      ],
      default: 'branded'
    },
    {
      type: 'select',
      id: 'layout',
      label: 'Layout',
      options: [
        { value: 'inline', label: 'Inline (Email and button on same row)' },
        { value: 'stacked', label: 'Stacked (Email and button on separate rows)' }
      ],
      default: 'inline'
    },
    {
      type: 'range',
      id: 'max_width',
      label: 'Form Maximum Width',
      min: 400,
      max: 800,
      step: 50,
      unit: 'px',
      default: 600
    },
    {
      type: 'color',
      id: 'background_color',
      label: 'Background Color',
      default: '#f9fafb'
    }
  ],
  presets: [
    {
      name: 'Newsletter Signup'
    }
  ]
}
