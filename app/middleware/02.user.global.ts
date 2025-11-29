export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore()

  authStore.refreshUser()
})
