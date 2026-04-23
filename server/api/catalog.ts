export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()

  const data: any = await $fetch(`${config.panelUrl}/api/application/billing/catalog`, {
    headers: {
      Authorization: `Bearer ${config.panelApiKey}`,
      Accept: 'application/json',
    },
  })

  // Rewrite relative image paths to absolute URLs pointing at the panel's storage
  for (const category of data?.categories ?? []) {
    for (const pack of category.packs ?? []) {
      if (pack.image && !pack.image.startsWith('http')) {
        pack.image = `${config.panelUrl}/storage/${pack.image}`
      }
    }
  }

  return data
}, {
  maxAge: 300, // cache for 5 minutes
})
