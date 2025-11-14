module.exports = {
  name: 'Featured Collection',
  tag: 'section',
  class: 'featured-collection-section',
  settings: [
    {
      type: 'collection',
      id: 'collection',
      label: 'Collection'
    },
    {
      type: 'text',
      id: 'heading',
      label: 'Heading',
      default: 'Featured Products'
    },
    {
      type: 'textarea',
      id: 'description',
      label: 'Description'
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
      type: 'select',
      id: 'text_alignment',
      label: 'Text Alignment',
      options: [
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
      ],
      default: 'center'
    },
    {
      type: 'range',
      id: 'products_to_show',
      label: 'Products to Show',
      min: 2,
      max: 12,
      step: 1,
      default: 8
    },
    {
      type: 'select',
      id: 'columns_desktop',
      label: 'Columns (Desktop)',
      options: [
        { value: '3', label: '3 columns' },
        { value: '4', label: '4 columns' },
        { value: '5', label: '5 columns' }
      ],
      default: '4'
    },
    {
      type: 'text',
      id: 'button_text',
      label: 'Button Text',
      info: 'Leave empty to hide button'
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
      name: 'Featured Collection'
    }
  ]
}
