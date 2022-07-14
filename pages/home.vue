<template>
    <div class="layout">
        <!-- PC -->
        <div class="pc-style">
            <div class="header container flex justify-between items-center">
                <img
                    class="logo inline-block"
                    src="~/assets/image/logo.png"
                    alt="logo"
                    @click="gotoHome()"
                >

                <ul class="box-nav flex-1 flex justify-between items-center">
                    <li
                        v-for="i in routerLink"
                        :key="i.id"
                        :class="{'active': routeName === i.route}"
                        class="nav-item"
                        @click="onRouteBtn(i.route, i.disabled)"
                    >
                        <nuxt-link
                            v-if="!i.disabled"
                            class="block nav-link"
                            :to="{name: i.route, params: {id: i.id}}"
                        >{{ i.name }}</nuxt-link>

                        <a
                            v-else
                            :href="i.link"
                            target="_blank"
                        >{{ i.name }}</a>
                    </li>
                </ul>

                <div
                    v-if="isLogin"
                    class="header-right flex justify-end items-center"
                >
                    <!-- <img
                        class="img-search inline-block"
                        src="~/assets/image/home/search.png"
                        alt="search"
                        @click="gotoSearch()"
                    > -->

                    <img
                        v-if="userForm.avatar"
                        class="box-avatar"
                        :src="userForm.avatar"
                        alt="avatar"
                    >
                    <img
                        v-else
                        class="box-avatar"
                        src="~/assets/image/login/user-logo.png"
                        alt="avatar"
                    />

                    <div
                        class="type-dropdown flex items-center"
                        @click="isSelect = !isSelect"
                    >
                        <div>{{ userForm.nickname }}</div>

                        <img
                            :class="isSelect ? 'show' : ''"
                            src="~/assets/image/home/arrow-gray.png"
                            alt="arrow"
                        >
                    </div>

                    <ul v-if="isSelect">
                        <li @click.stop="gotoUserInfo()">个人信息</li>
                        <li @click.stop="handleLogout()">退出</li>
                    </ul>
                </div>

                <div
                    v-else
                    class="header-right flex justify-end items-center"
                >
                    <!-- <img
                        class="img-search inline-block"
                        src="~/assets/image/home/search.png"
                        alt="search"
                        @click="gotoSearch()"
                    > -->

                    <div
                        class="cursor-pointer"
                        @click="handleLogin"
                    >注册 / 登录</div>

                    <div
                        class="btn-register cursor-pointer flex justify-around items-center"
                        @click="gotoRegister"
                    >前往极狐SaaS</div>
                </div>
            </div>
        </div>

        <!-- 移动端 -->
        <div class="mobile-style relative">
            <div class="header">
                <div class="container flex items-center justify-between">
                    <div
                        class="mobile-menu flex flex-col items-start"
                        @click="showMenu = true"
                    >
                        <div class="line"></div>
                        <div class="line"></div>
                        <div class="line"></div>
                    </div>

                    <img
                        class="logo"
                        src="~/static/logo.png"
                        alt="logo"
                        @click="gotoHome()"
                    >

                    <div
                        v-if="isLogin"
                        class="header-right flex justify-end items-center"
                    >
                        <!-- <img
                            class="img-search inline-block"
                            src="~/assets/image/home/search.png"
                            alt="search"
                            @click="gotoSearch()"
                        > -->

                        <img
                            v-if="userForm.avatar"
                            class="box-avatar"
                            :src="userForm.avatar"
                            alt="avatar"
                        >
                        <img
                            v-else
                            class="box-avatar"
                            src="~/assets/image/login/user-logo.png"
                            alt="avatar"
                        />

                        <div
                            class="type-dropdown flex items-center"
                            @click="isSelect = !isSelect"
                        >
                            <div>{{ userForm.nickname }}</div>

                            <img
                                :class="isSelect ? 'show' : ''"
                                src="~/assets/image/home/arrow-gray.png"
                                alt="arrow"
                            >
                        </div>

                        <ul v-if="isSelect">
                            <li @click.stop="gotoUserInfo()">个人信息</li>
                            <li @click.stop="handleLogout()">退出</li>
                        </ul>
                    </div>

                    <div
                        v-else
                        class="header-right flex justify-end items-center"
                    >
                        <!-- <img
                            class="img-search inline-block"
                            src="~/assets/image/home/search.png"
                            alt="search"
                            @click="gotoSearch()"
                        > -->

                        <div
                            class="cursor-pointer"
                            @click="handleLogin"
                        >注册 / 登录</div>

                        <div
                            class="btn-register cursor-pointer flex justify-around items-center"
                            @click="gotoRegister"
                        >极狐SaaS</div>
                    </div>

                    <div :class="[showMenu ? 'show' : 'out', 'menus-box']">
                        <div class="content">
                            <div class="head flex items-center justify-between">
                                <div
                                    class="menu-close"
                                    @click="showMenu = false"
                                >+</div>
                            </div>

                            <ul class="nav-item-box">
                                <li
                                    v-for="i in routerLink"
                                    :key="i.id"
                                    class="nav-item"
                                    :class="{'active': routeName === i.route}"
                                    @click="onRouteBtn(i.route, i.disabled)"
                                >
                                    <nuxt-link
                                        v-if="!i.disabled"
                                        class="block nav-link"
                                        :to="{name: i.route, params: {id: i.id}}"
                                    >
                                        {{ i.name }}
                                    </nuxt-link>

                                    <span v-else>{{ i.name }}</span>
                                </li>

                                <li
                                    class="nav-item"
                                    @click="gotoUserInfo()"
                                >个人信息</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="content-box">
            <nuxt-child></nuxt-child>
        </div>

        <GotoTop />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import GotoTop from '@/components/GotoTop.vue';

@Component({
    components: {
        GotoTop,
    },
})
export default class IndexPage extends Vue {
    // protected my: any = this.$store.state.my;

    isPC = false;

    showMenu = false;

    routerLink: Array<any> = [
        {
            id: 1,
            name: '首页',
            route: 'home',
            link: '#',
            disabled: false,
        },
        {
            id: 2,
            name: '问答',
            route: 'home-questions',
            link: 'https://forum.gitlab.cn/',
            disabled: true,
        },
        {
            id: 3,
            name: '开发者专栏',
            route: 'home-developer',
            link: '#',
            disabled: false,
        },
        {
            id: 4,
            name: '活动',
            route: 'home-activity',
            link: '#',
            disabled: false,
        },
        {
            id: 5,
            name: '公益计划',
            route: 'home-publicWelfare',
            link: '#',
            disabled: false,
        },
        {
            id: 6,
            name: '共建者计划',
            route: 'home-contribute',
            link: '#',
            disabled: false,
        },
        {
            id: 7,
            name: '文档',
            route: 'home-documentation',
            link: 'https://docs.gitlab.cn/',
            disabled: true,
        },
    ];

    routeName: String = 'home';

    isSelect = false; // 是否显示下拉框：个人信息、退出

    userForm: any = {};

    get isLogin () {
        return this.userForm?.token;
    }

    // @Watch('$route')

    // onUrlChange(val: any) {
    //     // let matched = val.matched;
    //     // matched = matched.filter((i: any) => i.meta && i.meta.title);
    //     // let title;
    //     // const defaultSiteTitle = this.$store.state.site_title;
    //     // if (matched.length) {
    //     //     title = matched[matched.length - 1].meta.title;
    //     // }
    //     // if (title) {
    //     //     document.title = `${title} - ${defaultSiteTitle}`;
    //     // } else if (document.title !== defaultSiteTitle) {
    //     //     document.title = defaultSiteTitle;
    //     // }
    // }

    @Watch('$store.state.user', {deep: true})
    onStoreChange(nVal: Record<string, any>) {
        if (nVal.user) {
            const userStr = JSON.stringify(nVal.user);
            const formStr = JSON.stringify(this.userForm);
            if (userStr !== formStr) {
                this.userForm = nVal.user;
                // if (!this.isLogin) this.isLogin = true;
            }
        }
    }

    created() {
        const route: any = this.$route;
        this.routeName = route.name;
    }

    mounted() {
        const user = sessionStorage.getItem('user');
        if (user) {
            this.userForm = JSON.parse(user);
        }
    }

    onRouteBtn(name: string, disabled: boolean) {
        if (!disabled) {
            this.routeName = name;
        }
        // m端下判断目录是否打开
        // if (this.catalogue) this.catalogue = false;
    }

    gotoHome() {
        this.$router.push({
            name: 'home',
            params: {},
        });
    }

    gotoUserInfo() {
        this.$router.push({
            name: 'home-userInfo',
            params: {},
        });
    }

    gotoSearch() {
        console.log('gotoSearch');
        this.$router.push({
            path: './search',
            params: {},
        });
    }

    async handleLogout() {
        await this.$Http.post('/auth/logout');

        this.userForm = {};
        this.$store.dispatch('getToken', '');
        this.$store.dispatch('getUser', {});
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        this.$router.push({ name: 'home' });
        // console.log('handleLogout');
    }

    handleLogin() {
        this.$router.push({name: 'login'});
        // console.log('handleLogin');
    }

    gotoRegister() {
        // saas登录
        window.location.href = 'https://jihulab.com';

        // this.$router.push({name: 'login-register'});
        // console.log('gotoRegister');
    }
}
</script>

<style lang="scss">
@import './home.scss';
</style>
