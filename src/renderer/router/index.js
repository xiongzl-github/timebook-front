import Vue from 'vue';
import Router from 'vue-router';
import Home from "../components/Home.vue";
import CTimeBook from "../components/CTimeBook.vue";
import CHome from "../components/CHome.vue";

Vue.use(Router)

export default new Router({
    routes: [
        //  {
        //       path: "/",
        //       name: "Login",
        //       component: Login
        //   },
        // {
        //     path: '/',
        //     name: "Home",
        //     component: Home
        // },
        {
            path: "/home",
            component: Home,
            children: [
                {
                    path: "",
                    name: "home",
                    component: CHome
                },
                {
                    path: 'timebook',
                    name: "TimeBook",
                    component: CTimeBook
                }
            ]
        },
        {
            path: "*",
            redirect: "/home"
        }
    ]
})