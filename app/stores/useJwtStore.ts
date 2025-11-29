import { useJwt as _useJwt } from '@vueuse/integrations/useJwt'

// todo finetune payload interface
interface Payload {
  sub: string
  exp: number
  idp: string
  permissions: Array<string>
}

export const useJwtStore = defineStore('jwt', () => {
  const token = useCookie('token', { default: () => '' })
  const { payload } = _useJwt<Payload>(token)

  return {
    token,
    payload,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useJwtStore, import.meta.hot))
