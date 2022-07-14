<template>
    <div class="page-developer">
        <div
            :class="!isPC ? 'flex-wrap' : ''"
            class="container flex justify-between items-start"
        >
            <div class="left">
                <div
                    v-for="i in navList"
                    :key="i.id"
                    :class="isModule === i.id ? 'active' : ''"
                    class="item flex justify-between items-center"
                    @click="changeModule(i.id)"
                >
                    <div class="flex items-center">
                        <img
                            class="nav-icon"
                            :src="i.icon"
                            alt="nav"
                        >
                        {{ i.name }}
                    </div>

                    <img
                        v-if="isModule === i.id"
                        class="more"
                        src="~/assets/image/home/more.png"
                        alt="more"
                    >
                </div>
            </div>

            <div class="center">
                <DeveloperArticle v-if="isModule === 1" />

                <DeveloperVideo v-if="isModule === 2" />

                <DeveloperPlay v-if="isModule === 3" />
            </div>

            <div class="right">
                <!-- 文章---本周热门 -->
                <div
                    v-if="isModule === 1"
                    class="module-x"
                >
                    <div class="box-title flex items-center">
                        <img
                            class="more"
                            src="~/assets/image/developer/module-x-01.png"
                            alt="more"
                        >
                        本周热门
                    </div>

                    <div
                        v-for="(i, j) in hotList"
                        :key="j"
                        class="item"
                        @click="gotoArticle(i.id)"
                    >
                        <p class="text-line-2">{{ i.title }}</p>

                        <div class="foot flex items-center">
                            <img
                                class="look"
                                src="~/assets/image/home/look.png"
                                alt="look"
                            >
                            {{ i.look }}
                            <img
                                class="like"
                                src="~/assets/image/home/like.png"
                                alt="like"
                            >
                            {{ i.like }}
                        </div>
                    </div>
                </div>

                <!-- 文章---今日推荐 -->
                <div
                    v-if="isModule === 1"
                    class="module-x"
                >
                    <div class="box-title flex items-center">
                        <img
                            class="more"
                            src="~/assets/image/developer/module-x-02.png"
                            alt="more"
                        >
                        今日推荐
                    </div>

                    <div
                        v-for="(i, j) in recommendList"
                        :key="j"
                        class="item"
                        @click="gotoArticle(i.id)"
                    >
                        <p class="text-line-2">{{ i.title }}</p>

                        <div class="foot flex items-center">
                            <img
                                class="look"
                                src="~/assets/image/home/look.png"
                                alt="look"
                            >
                            {{ i.look }}
                            <img
                                class="like"
                                src="~/assets/image/home/like.png"
                                alt="like"
                            >
                            {{ i.like }}
                        </div>
                    </div>
                </div>

                <!-- 视频---本周热门 -->
                <div
                    v-if="isModule !== 1"
                    class="module-x"
                >
                    <div class="box-title flex items-center">
                        <img
                            class="more"
                            src="~/assets/image/developer/module-x-01.png"
                            alt="more"
                        >
                        本周热门
                    </div>

                    <div
                        v-for="(i, j) in hotList"
                        :key="j"
                        :class="!isPC ? 'flex-wrap' : ''"
                        class="item flex justify-between"
                        @click="gotoVideo(i.id)"
                    >
                        <img
                            class="cover"
                            :src="i.cover"
                            alt="cover"
                        >

                        <div class="item-right">
                            <p class="text-line-2">{{ i.title }}</p>

                            <div class="foot flex items-center">
                                <img
                                    class="look"
                                    src="~/assets/image/home/look.png"
                                    alt="look"
                                >
                                {{ i.look }}
                                <img
                                    class="like"
                                    src="~/assets/image/home/like.png"
                                    alt="like"
                                >
                                {{ i.like }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DeveloperArticle from '@/components/developer/DeveloperArticle.vue';
import DeveloperVideo from '@/components/developer/DeveloperVideo.vue';
import DeveloperPlay from '@/components/developer/DeveloperPlay.vue';
import Footer from '@/components/Footer.vue';

@Component({
    components: {
        DeveloperArticle,
        DeveloperVideo,
        DeveloperPlay,
        Footer,
    },
})
export default class DeveloperPage extends Vue {
    isPC = false;

    navList = [
        {
            id: 1,
            name: '专栏文章',
            icon: require('~/assets/image/developer/nav-01.png'),
        },
        {
            id: 2,
            name: '学习资料',
            icon: require('~/assets/image/developer/nav-02.png'),
        },
        {
            id: 3,
            name: '休闲娱乐',
            icon: require('~/assets/image/developer/nav-03.png'),
        },
    ];

    isModule = 1; // 1: 专栏文章, 2: 学习资料, 3: 休闲娱乐

    hotList: Array<any> = [];

    recommendList: Array<any> = [];

    created() {
        const route: any = this.$route;
        if (route.query.isModule) this.isModule = Number(route.query.isModule);

        this.getHotList();
        this.getRecommendList();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    getHotList() {
        if (this.isModule === 1) {
            this.hotList = [
                {
                    id: 1,
                    title: '能够发现零日漏洞模糊测试威力几何？',
                    content: '',
                    userAvatar: require('~/assets/image/activity/user-avatar.png'),
                    userName: '极狐GitLab',
                    look: '2.4k',
                    like: '342',
                    time: '2022.09.12',
                    aaa: '线下',
                    cover: require('~/assets/image/developer/article-cover-01.png'),
                    labelList: ['用例'],
                    message: '342',
                    type: 2, // 1: 案例, 2: 用例, 3: 技术教学, 4: 产品教程
                },
                {
                    id: 2,
                    title: 'GitLab.com 上的开源项目不免费了？那就来极狐GitLab SaaS 玩开源！',
                    content: '',
                    userAvatar: require('~/assets/image/activity/user-avatar.png'),
                    userName: '极小狐',
                    look: '2.4k',
                    like: '342',
                    time: '2022.09.12',
                    aaa: '线下',
                    cover: require('~/assets/image/developer/article-cover-02.png'),
                    labelList: ['产品教程'],
                    message: '342',
                    type: 4, // 1: 案例, 2: 用例, 3: 技术教学, 4: 产品教程
                },
                {
                    id: 3,
                    title: 'GitLab在CockroachDB和YugabyteDB上的兼容性对比（二）-读写场景测试',
                    content: '',
                    userAvatar: require('~/assets/image/activity/user-avatar.png'),
                    userName: 'dcopensource',
                    look: '2.4k',
                    like: '342',
                    time: '2022.09.12',
                    aaa: '线下',
                    cover: require('~/assets/image/developer/article-cover-03.png'),
                    labelList: ['用例'],
                    message: '342',
                    type: 2, // 1: 案例, 2: 用例, 3: 技术教学, 4: 产品教程
                },
                {
                    id: 4,
                    title: '极狐GitLab自动化测试指南02——接口测试',
                    content: '',
                    userAvatar: require('~/assets/image/activity/user-avatar.png'),
                    userName: '武让',
                    look: '2.4k',
                    like: '342',
                    time: '2022.09.12',
                    aaa: '线下',
                    cover: require('~/assets/image/developer/article-cover-04.png'),
                    labelList: ['技术教学'],
                    message: '342',
                    type: 3, // 1: 案例, 2: 用例, 3: 技术教学, 4: 产品教程
                },
                {
                    id: 5,
                    title: '极狐GitLab自动化测试指南01——软件测试综述',
                    content: '',
                    userAvatar: require('~/assets/image/activity/user-avatar.png'),
                    userName: '武让',
                    look: '2.4k',
                    like: '342',
                    time: '2022.09.12',
                    aaa: '线下',
                    cover: require('~/assets/image/developer/article-cover-04.png'),
                    labelList: ['技术教学'],
                    message: '342',
                    type: 3, // 1: 案例, 2: 用例, 3: 技术教学, 4: 产品教程
                },
            ];
        } else if (this.isModule === 2) {
            this.hotList = [
                {
                    id: 1,
                    title: '极狐练武场——搞定极狐GitLab的几种方式',
                    time: '2022.01.13',
                    look: ' 1209',
                    like: '342',
                    address: '中国广州',
                    aaa: '线下',
                    video: 'https://aps.roomwits.com/static/upload/d3086d1f7ba14a45a309d788f336eef7',
                    cover: require('~/assets/image/developer/video-cover-01.png'),
                },
                {
                    id: 2,
                    title: '开源贡献的代码和远方',
                    time: '2022.05.13',
                    look: ' 106',
                    like: '342',
                    address: '中国广州',
                    aaa: '线下',
                    video: 'https://aps.roomwits.com/static/upload/350e5dd54b0e49c0902372db4eb13cac',
                    cover: require('~/assets/image/developer/video-cover-02.png'),
                },
                {
                    id: 3,
                    title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                    time: '2022.04.22',
                    look: ' 187',
                    like: '342',
                    address: '中国广州',
                    aaa: '线下',
                    video: 'https://aps.roomwits.com/static/upload/f506a1ca175c4ce39323ceac4da6b11e',
                    cover: require('~/assets/image/developer/video-cover-03.png'),
                },
            ];
        } else {
            this.hotList = [
                {
                    id: 1,
                    title: 'A Day in the life of a JiHu(GitLab) UX Designer',
                    time: '2022.04.28',
                    look: ' 1209',
                    like: '342',
                    address: '中国广州',
                    aaa: '线下',
                    video: 'https://aps.roomwits.com/static/upload/b76d8326e8c24b20a525d20f30e5122b',
                    cover: require('~/assets/image/developer/play-cover-01.png'),
                },
                {
                    id: 2,
                    title: '极狐boys天团首支舞曲',
                    time: '2022.04.28',
                    look: ' 106',
                    like: '342',
                    address: '中国广州',
                    aaa: '线下',
                    video: 'https://aps.roomwits.com/static/upload/94dacf2f718441a3833deaca7a96c472',
                    cover: require('~/assets/image/developer/video-cover-02.png'),
                },
            ];
        }
    }

    getRecommendList() {
        this.recommendList = [
            {
                id: 1,
                title: '能够发现零日漏洞模糊测试威力几何？',
                content: '',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极狐GitLab',
                look: '2.4k',
                like: '342',
                time: '2022.09.12',
                aaa: '线下',
                cover: require('~/assets/image/developer/article-cover-01.png'),
                labelList: ['类型名', '类型名'],
                message: '342',
            },
            {
                id: 2,
                title: 'GitLab.com 上的开源项目不免费了？那就来极狐GitLab SaaS 玩开源！',
                content: '',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                like: '342',
                time: '2022.09.12',
                aaa: '线下',
                cover: require('~/assets/image/developer/article-cover-02.png'),
                labelList: ['类型名', '类型名'],
                message: '342',
            },
            {
                id: 3,
                title: 'GitLab在CockroachDB和YugabyteDB上的兼容性对比（二）-读写场景测试',
                content: '',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: 'dcopensource',
                look: '2.4k',
                like: '342',
                time: '2022.09.12',
                aaa: '线下',
                cover: require('~/assets/image/developer/article-cover-03.png'),
                labelList: ['类型名', '类型名'],
                message: '342',
            },
            {
                id: 4,
                title: '极狐GitLab自动化测试指南02——接口测试',
                content: '',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '武让',
                look: '2.4k',
                like: '342',
                time: '2022.09.12',
                aaa: '线下',
                cover: require('~/assets/image/developer/article-cover-04.png'),
                labelList: ['类型名', '类型名'],
                message: '342',
            },
            {
                id: 5,
                title: '极狐GitLab自动化测试指南01——软件测试综述',
                content: '',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '武让',
                look: '2.4k',
                like: '342',
                time: '2022.09.12',
                aaa: '线下',
                cover: require('~/assets/image/developer/article-cover-04.png'),
                labelList: ['类型名', '类型名'],
                message: '342',
            },
        ];
    }

    changeModule(isModule: number) {
        this.isModule = isModule;
        this.getHotList();
    }

    gotoArticle(id: string) {
        this.$router.push({
            path: './developerArticleInfo',
            params: {},
            query: {
                articleId: id,
            },
        });
    }

    gotoVideo(id: string) {
        if (this.isModule === 2) {
            this.$router.push({
                path: './developerVideoInfo',
                params: {},
                query: {
                    videoId: id,
                },
            });
        } else {
            this.$router.push({
                path: './developerPlayInfo',
                params: {},
                query: {
                    playId: id,
                },
            });
        }
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
