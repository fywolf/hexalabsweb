export default defineCachedEventHandler(async () => {
  const config = useRuntimeConfig()

  const data = await $fetch(`${config.panelUrl}/api/application/billing/catalog`, {
    headers: {
      Authorization: `Bearer ${config.panelApiKey}`,
      Accept: 'application/json',
    },
  })

  return data
}, {
  maxAge: 300, // cache for 5 minutes
})
