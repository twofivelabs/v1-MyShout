// MD(FONTS) import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // MDI(FONTS) Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { Touch, Intersect } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
    directives: { Touch, Intersect }
})

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
        values: {
            test: 'people'
        }
    },
    theme: {
        options: {
            customProperties: true
        },
        themes: {
            light: {
                primary:"#6fa7e0",
                gray:"#373d41",
                lightgray:"#eef3ff",
                myshoutOrange:"#e8b974",
                myshoutRed:"#de6969",
                myshoutGreen:"#8ce19d",
                myshoutBlue:"#6fa7e0",
                myshoutDarkGrey:"#373d41"
            }
        }
    }
})
