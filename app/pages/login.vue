<script setup lang="ts">
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: 'Login',
  description: 'Sign In to your account',
})

const schema = z.object({
  username: z.string('Username is required'),
  password: z.string('Password is required'),
})

type Schema = z.output<typeof schema>

const fields: AuthFormField[] = [
  {
    name: 'username',
    type: 'text',
    label: 'Username',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
  },
]

const route = useRoute()
const { login } = useAuthStore()

const loginError = shallowRef(false)

function onSubmit(payload: FormSubmitEvent<Schema>) {
  loginError.value = false
  login(payload.data).then(() => {
    navigateTo((route.query.redirect as string) || { name: 'dashboard' })
  }).catch(() => {
    loginError.value = true
  })
}
</script>

<template>
  <UAuthForm :schema="schema" title="Login" :fields="fields" class="max-w-md" description="Sign In to your account" @submit="onSubmit">
    <template v-if="loginError" #validation>
      <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
    </template>
  </UAuthForm>
</template>
