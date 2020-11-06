import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/Home.vue";
// import TargetSetting from "../components/TargetSetting.vue";
// import TargetPlanning from "../components/TargetPlanning.vue"
// import TargetAnalysis from "../components/TargetAnalysis.vue"
import TodoList from "../components/TodoList.vue";
import TimeRecord from "../components/TimeRecord.vue";
import Dashboard from "../components/Dashboard.vue";

Vue.use(Router)

export default new Router({
    routes: [
        //  {
        //       path: "/",
        //       name: "Login",
        //       component: Login
        //   },
        {
            path: '',
            redirect: '/home'
        },
        {
            path: "/home",
            component: Home,
            children: [{
                    path: "timeRecord",
                    name: "TimeRecord",
                    component: TimeRecord
                },
                {
                    path: "todoList",
                    name: "TodoList",
                    component: TodoList
                },
                {
                    path: "dashboard",
                    name: "Dashboard",
                    component: Dashboard
                },
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})