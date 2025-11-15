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
  },
}