import HomePage from './views/HomePage.vue'
import NotFound from './views/NotFound.vue'

export const routes = [
  { path: '/', component: HomePage, meta: { title: 'Home' } },
  { path: '/:path(.*)', component: NotFound },
]
