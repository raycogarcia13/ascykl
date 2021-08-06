import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'i18nDemo',
  setup () {
    const { t } = useI18n()
    return () => <div> { t('test')} </div>
  }
})
