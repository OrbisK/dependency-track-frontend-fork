import type { NuxtTimeProps } from '#app'
import { NuxtTime } from '#components'

type NuxtTimeLocaleProps = NuxtTimeProps

// todo: port to @nuxtjs/i18n if possible
export default defineComponent<NuxtTimeLocaleProps>({
  name: 'TimeLocale',
  props: NuxtTime.props,
  setup(props, { slots }) {
    const { locale } = useI18n()

    const mergedLocale = computed(() => {
      return props.locale ?? locale.value
    })

    return () => h(NuxtTime, { ...props, locale: mergedLocale.value }, slots.default)
  },
})
