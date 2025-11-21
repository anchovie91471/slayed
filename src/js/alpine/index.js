export default {
  register: (Alpine) => {
    // Alpine stores
    const alpineStores = import.meta.glob('./stores/*.js', { eager: true, import: 'default' })

    for (const path in alpineStores) {
      const store = alpineStores[path]

      const name = store.name
      const storeInstance = store.store()

      Alpine.store(name, storeInstance)

      // Call init() if the store has one
      if (typeof storeInstance.init === 'function') {
        storeInstance.init()
      }
    }

    // Alpine components - auto-register all components from subdirectories
    const alpineComponents = import.meta.glob('./components/**/*.js', { eager: true, import: 'default' })

    for (const path in alpineComponents) {
      const componentFn = alpineComponents[path]

      // Extract component name from file path (e.g., './components/shared/modal.js' -> 'modal')
      const name = path.split('/').pop().replace('.js', '')

      if (name && componentFn) {
        Alpine.data(name, componentFn)
      }
    }
  },
}