export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const { token } = useJwt()

  const headers: HeadersInit = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }

  if (token.value) {
    headers.Authorization = `Bearer ${token.value}`
  }

  const $api = $fetch.create({
    baseURL: config.public.apiBaseUrl ?? '',
    // headers: useRequestHeaders(['cookie', 'referer']),
    headers,
  })

  return {
    provide: {
      api: $api,
    },
  }
})
