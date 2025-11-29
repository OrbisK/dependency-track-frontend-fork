// todo
interface Permission {
  name: string
  description: string
}

// todo
interface Team {
  uuid: string
  name: string
}

// todo
interface User {
  email: string
  forcePasswordChange: boolean
  fullname: string
  lastPasswordChange: string
  nonExpiryPassword: boolean
  permissions: Array<Permission>
  suspended: boolean
  teams: Array<Team>
  username: string
}

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const jwtStore = useJwtStore()
  const { token } = storeToRefs(jwtStore)

  const { data: user, refresh: refreshUser } = useAsyncData('auth-user', (_nuxtApp, { signal }) => {
    return $api<User>('v1/user/self', { signal })
  }, {
    immediate: false,
  })

  async function login(loginData: { username: string, password: string }) {
    return $api<string>('v1/user/login', {
      method: 'POST',
      body: loginData,
      headers: {
        Accept: '*/*',
        Authorization: '',
      },
    }).then((response) => {
      token.value = response
    })
  }

  function logout() {
    token.value = ''
  }

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  return {
    login,
    logout,
    isAuthenticated,
    user: readonly(user),
    refreshUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
