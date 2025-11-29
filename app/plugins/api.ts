export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const jwtStore = useJwtStore()
  const { token } = storeToRefs(jwtStore)
  const localeRoute = useLocaleRoute()

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  const $api = $fetch.create({
    baseURL: config.public.apiBaseUrl ?? '',
    headers,
    async onRequest({ options }) {
      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        token.value = ''
        navigateTo(localeRoute({ name: 'login' }))
      }
    },
  })

  return {
    provide: {
      api: $api,
    },
  }
})
