export default {
  register: (Alpine) => {
    // Alpine stores
    const alpineStores = import.meta.glob('./stores/*.js', { eager: true, import: 'default' })

    for (const path in alpineStores) {
      const store = alpineStores[path]

      const name = store.name

      Alpine.store(name, store.store())
    }
  },
}