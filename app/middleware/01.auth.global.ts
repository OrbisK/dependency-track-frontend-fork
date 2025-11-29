export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const localeRoute = useLocaleRoute()

  if (!to.meta.guest) {
    if (authStore.isAuthenticated) {
      return
    }
    return navigateTo(localeRoute({ name: 'login', query: { redirect: from.path } }))
  }

  if (authStore.isAuthenticated) {
    return abortNavigation()
  }
})
