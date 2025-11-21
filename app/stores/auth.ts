// todo
// interface Permission {
//   name: string
//   description: string
// }
//
// // todo
// interface Team {
//   uuid: string
//   name: string
// }

// todo
// interface User {
//   email: string
//   forcePasswordChange: boolean
//   fullname: string
//   lastPasswordChange: string
//   nonExpiryPassword: boolean
//   permissions: Array<Permission>
//   suspended: boolean
//   teams: Array<Team>
//   username: string
// }

export const useAuthStore = defineStore('auth', () => {
  const { $api } = useNuxtApp()

  const { token } = useJwt()

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
    // todo
  }

  return {
    login,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
