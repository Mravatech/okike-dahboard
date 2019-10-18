import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login/Login.vue'
import Store from './store/store'
import Dashboard from './views/Dashboard/Dashboard.vue';
import Register from './views/Register/Register.vue'
import NotfoundPage from './views/404/404.vue'
import ChangePassword from "./views/Settings/ChangePassword";
import AddCategory from "./views/Category/AddCategory";
import ListCategory from "./views/Category/ListCategory";
import AddFood from "./views/Food/AddFood";
import ListFood from "./views/Food/ListFood";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    linkActiveClass:'active',

    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                public: true,  // Allow access to even if not logged in
                onlyWhenLoggedOut: true
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
        },
        {
            path: '/logout',
            name: 'logout',
        },
        {
            path: '/add/category',
            name: 'AddCategory',
            component: AddCategory,

        },
    
        {
            path: '/list/category',
            name: 'ListCategories',
            component: ListCategory,

        },
        {
            path: '/food/add',
            name: 'AddFood',
            component: AddFood,
        },
        {
            path: '/food/list',
            name: 'ListFood',
            component: ListFood,
        },
        {
            path: '/change-password',
            name: 'ChangePassword',
            component: ChangePassword,
        },
        {
            path: '*',
            name: 'not-found',
            component: NotfoundPage,
        },

    ]
});


router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
    const loggedIn = Store.getters.IS_AUTHENTICATED;

    if (!isPublic && !loggedIn) {
        return next({
            name: 'login',
        });
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next({name: 'dashboard'});
    }

    next();
});

export default router;
