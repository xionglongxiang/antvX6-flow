/* eslint-disable */
import VueRouter, { Route } from 'vue-router'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component

}