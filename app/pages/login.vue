<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({
  layout: 'auth',
})

const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: t('title'),
  description: t('description'),
})

const schema = z.object({
  username: z.string(t('validation.username.required')),
  password: z.string(t('validation.password.required')),
})

type Schema = z.output<typeof schema>

const fields: AuthFormField[] = [
  {
    name: 'username',
    type: 'text',
    label: t('fields.username'),
  },
  {
    name: 'password',
    type: 'password',
    label: t('fields.password'),
  },
]

const route = useRoute()
const { login } = useAuthStore()

const loginError = shallowRef(false)

const localeRoute = useLocaleRoute()

function onSubmit(payload: FormSubmitEvent<Schema>) {
  loginError.value = false
  login(payload.data).then(() => {
    const dashboard = localeRoute({ name: 'dashboard' })
    navigateTo((route.query.redirect as string) || dashboard)
  }).catch(() => {
    loginError.value = true
  })
}
</script>

<template>
  <UAuthForm :schema="schema" :title="t('title')" :fields="fields" class="max-w-md" :description="t('description')" @submit.prevent="onSubmit">
    <template v-if="loginError" #validation>
      <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
    </template>
  </UAuthForm>
</template>

<i18n lang="yaml">
en:
  title: "Login"
  description: "Sign In to your account"
  error: "Error signing in"
  fields:
    username: "Username"
    password: "Password"
  validation:
    username:
      required: "Username is required"
    password:
      required: "Password is required"
de:
  title: "Anmeldung"
  description: "Melden Sie sich bei Ihrem Konto an"
  error: "Fehler bei der Anmeldung"
  fields:
    username: "Benutzername"
    password: "Passwort"
  validation:
    username:
      required: "Benutzername ist erforderlich"
    password:
      required: "Passwort ist erforderlich"
</i18n>
