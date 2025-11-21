module.exports = {
  name: 'Rich Text',
  tag: 'section',
  class: 'rich-text-section',
  settings: [
    {
      type: 'text',
      id: 'heading',
      label: 'Heading'
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
      type: 'richtext',
      id: 'text',
      label: 'Content',
      default: '<p>Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store.</p>'
    },
    {
      type: 'select',
      id: 'text_alignment',
      label: 'Text Alignment',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' }
      ],
      default: 'left'
    },
    {
      type: 'range',
      id: 'max_width',
      label: 'Content Maximum Width',
      min: 600,
      max: 1200,
      step: 100,
      unit: 'px',
      default: 800,
      info: 'Maximum width of the text content'
    },
    {
      type: 'text',
      id: 'button_text',
      label: 'Button Text',
      info: 'Leave empty to hide button'
    },
    {
      type: 'url',
      id: 'button_link',
      label: 'Button Link'
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
      default: 'primary'
    },
    {
      type: 'color',
      id: 'background_color',
      label: 'Background Color',
      default: '#ffffff'
    }
  ],
  presets: [
    {
      name: 'Rich Text'
    }
  ]
}
