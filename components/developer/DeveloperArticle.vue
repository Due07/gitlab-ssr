<template>
    <div class="component-developer-article">
        <el-carousel
            trigger="hover"
            arrow="never"
            direction="horizontal"
            :loop="true"
            :height="isPC ? '206px' : '130px'"
        >
            <el-carousel-item
                v-for="i in bannerList"
                :key="i.id"
            >
                <img
                    v-if="i.gotoPage"
                    :src="i.url"
                    alt="banner"
                    @click="gotoInfo(i.id)"
                >

                <a
                    v-else-if="i.link"
                    :href="i.link"
                    target="_blank"
                >
                    <img
                        :src="i.url"
                        alt="banner"
                    >
                </a>

                <img
                    v-else
                    :src="i.url"
                    alt="banner"
                >
            </el-carousel-item>
        </el-carousel>

        <div class="box-content">
            <div class="box-type flex">
                <div
                    v-for="(i, j) in typeList"
                    :key="j"
                    :class="{'active': isType === i.type}"
                    class="type-item"
                    @click="changeType(i.type)"
                >{{ i.name }}</div>
            </div>

            <div
                v-for="(i, j) in articleList"
                :key="j"
                class="item"
                @click="gotoInfo(i.id)"
            >
                <div
                    :class="!isPC ? 'flex-wrap' : ''"
                    class="flex justify-between"
                >
                    <div class="content">
                        <p class="item-title text-line-2">{{ i.title }}</p>
                        <p class="item-content text-line-2">{{ i.content }}</p>

                        <div
                            v-for="(x, y) in i.labelList"
                            :key="y"
                            class="label"
                        >#{{ x }}</div>
                    </div>

                    <img
                        v-if="i.cover"
                        class="cover"
                        :src="i.cover"
                        alt="cover"
                    >
                </div>

                <div class="foot flex justify-between items-center">
                    <div class="foot-left flex items-center">
                        <img
                            class="avatar"
                            :src="i.userAvatar"
                            alt="userName"
                        >
                        {{ i.userName }}
                        <div class="date">{{ i.time }}</div>
                    </div>

                    <div class="foot-right flex items-center">
                        <img
                            class="look"
                            src="~/assets/image/home/look.png"
                            alt="look"
                        >
                        {{ i.look }}
                        <img
                            class="message"
                            src="~/assets/image/home/message.png"
                            alt="message"
                        >
                        {{ i.message }}
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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Carousel, CarouselItem } from 'element-ui';

@Component({
    components: {
        ElCarousel: Carousel,
        ElCarouselItem: CarouselItem,
    },
})
export default class DeveloperArticleComponent extends Vue {
    isPC = false;

    bannerList: Array<any> = [];

    typeList = [
        {
            type: 1,
            name: '案例',
        },
        {
            type: 2,
            name: '用例',
        },
        {
            type: 3,
            name: '技术教学',
        },
        {
            type: 4,
            name: '产品教程',
        },
    ];

    isType = 1;

    articleList: Array<any> = [];

    created() {
        this.getBannerList();
        this.getArticleList();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    getBannerList() {
        this.bannerList = [
            {
                id: 1,
                url: require('~/assets/image/developer/banner-01.png'),
                link: 'https://gitlab.cn/blog/2022/06/01/gitlab-fuzzing-testing/',
                gotoPage: true,
            },
            {
                id: 2,
                url: require('~/assets/image/developer/banner-02.png'),
                link: 'https://mp.weixin.qq.com/s/OwgoGQGsnpKSUbjftYU3Sw',
                gotoPage: true,
            },
            {
                id: 3,
                url: require('~/assets/image/developer/banner-03.png'),
                link: 'https://forum.gitlab.cn/t/topic/606',
                gotoPage: true,
            },
            {
                id: 4,
                url: require('~/assets/image/developer/banner-04.png'),
                link: 'https://mp.weixin.qq.com/s/rNHYJn6cvKJA2FvhyYBQMg',
                gotoPage: true,
            },
            {
                id: 6,
                url: require('~/assets/image/developer/banner-05.png'),
                link: 'https://gitlab.cn/jihulab101/',
                gotoPage: false,
            },
            {
                id: 7,
                url: require('~/assets/image/developer/banner-06.png'),
                link: 'https://forum.gitlab.cn/c/8-category/8',
                gotoPage: false,
            },
        ];
    }

    // 获取文章列表
    getArticleList() {
        const articleList = [
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

        if (this.isType === 1) {
            this.articleList = articleList;
        } else {
            this.articleList = articleList.filter((i: any) => i.type === this.isType);
        }
    }

    // 改变类型
    changeType(type: number) {
        this.isType = type;
        this.getArticleList();
    }

    gotoInfo(id: string) {
        this.$router.push({
            path: './developerArticleInfo',
            params: {},
            query: {
                articleId: id,
            },
        });
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/developer/article.scss';
</style>
