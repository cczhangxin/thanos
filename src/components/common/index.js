import Vue from 'vue'
import departpicker from './departpicker'
const components = [departpicker];
components.map(component => {
  Vue.component(component.name, component)
})
export default {
  departpicker
}
