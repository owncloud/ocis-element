import translationsJson from '../l10n/translations'

import ElementFrame from './ElementFrame.vue'

// just a dummy function to trick gettext tools
function $gettext(msg) {
  return msg
}

const routes = [
  {
    name: 'element-messenger',
    path: '',
    components: {
      app: ElementFrame
    }
  }
]

const appInfo = {
  name: $gettext('Element Messenger'),
  id: 'element-messenger',
  icon: 'account_circle',
  isFileEditor: false
}

const navItems = [
  {
    name: $gettext('Element Messenger'),
    iconMaterial: appInfo.icon,
    route: {
      name: 'element-messenger',
      path: '/element-messenger'
    }
  }
]

const translations = translationsJson
export default define({
  appInfo,
  routes,
  navItems,
  translations
})
