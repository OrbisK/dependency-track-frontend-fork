export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { token } = useJwt()

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
  })

  return {
    provide: {
      api: $api,
    },
  }
})
