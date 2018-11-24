import Vue from 'vue'
import departpicker from '../components/common/departpicker'

const components = [departpicker];
components.map(component => {
    Vue.component(component.name, component)
})
export default {
    departpicker
}
