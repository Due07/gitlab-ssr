<template>
    <div class="page-home">
        <div class="module-banner">
            <div class="container">
                <div>
                    <el-carousel
                        trigger="hover"
                        arrow="never"
                        direction="horizontal"
                        :loop="true"
                        :height="isPC ? '387px' : '126px'"
                    >
                        <el-carousel-item
                            v-for="i in bannerList"
                            :key="i.id"
                        >
                            <a
                                v-if="i.link"
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
                </div>
            </div>
        </div>

        <div class="module-video module container">
            <div class="box-title flex justify-between items-center">
                <div class="left flex items-center">
                    <img
                        class="img-search inline-block"
                        src="~/assets/image/home/module-icon-01.png"
                        alt="search"
                    >
                    精选视频
                </div>
                <div
                    class="right flex items-center"
                    @click="gotoVideoAll()"
                >
                    查看更多
                    <img
                        class="img-search inline-block"
                        src="~/assets/image/home/more.png"
                        alt="more"
                    >
                </div>
            </div>

            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="box-content flex justify-between"
            >
                <div
                    v-for="(i, j) in videoList"
                    :key="j"
                    class="item"
                    @click="gotoVideoInfo(i.id)"
                >
                    <img
                        class="cover"
                        :src="i.cover"
                        alt="vedio"
                    >
                    <div class="content flex flex-col justify-between">
                        <p class="text-line-3">{{ i.title }}</p>
                        <div class="foot flex items-center self-end">
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

                    <img
                        class="video-icon"
                        src="~/assets/image/home/video-icon.png"
                        alt="icon"
                    >
                </div>
            </div>
        </div>

        <div class="module-article module">
            <div class="container">
                <div class="box-title flex justify-between items-center">
                    <div class="left flex items-center">
                        <img
                            class="img-search inline-block"
                            src="~/assets/image/home/module-icon-02.png"
                            alt="search"
                        >
                        精选文章
                    </div>
                    <div
                        class="right flex items-center"
                        @click="gotoArticleAll()"
                    >
                        查看更多
                        <img
                            class="img-search inline-block"
                            src="~/assets/image/home/more.png"
                            alt="more"
                        >
                    </div>
                </div>

                <div
                    :class="!isPC ? 'flex-wrap' : ''"
                    class="box-content flex justify-between"
                >
                    <div
                        class="left"
                        @click="gotoArticleInfo(articleForm.id)"
                    >
                        <img
                            class="cover"
                            :src="articleForm.cover"
                            alt="cover"
                        >

                        <div class="content">
                            <p class="item-title text-line-2">{{ articleForm.title }}</p>
                            <p class="item-content text-line-1">{{ articleForm.content }}</p>
                        </div>

                        <div class="foot flex justify-between items-center">
                            <div class="foot-left flex items-center">
                                <img
                                    class="avatar"
                                    :src="articleForm.userAvatar"
                                    alt="userName"
                                >
                                {{ articleForm.userName }}
                            </div>

                            <div class="foot-right flex items-center">
                                <img
                                    class="look"
                                    src="~/assets/image/home/look.png"
                                    alt="look"
                                >
                                {{ articleForm.look }}
                                <img
                                    class="like"
                                    src="~/assets/image/home/like.png"
                                    alt="like"
                                >
                                {{ articleForm.like }}
                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <div
                            v-for="(i, j) in articleList"
                            :key="j"
                            class="item"
                            @click="gotoArticleInfo(i.id)"
                        >
                            <p class="item-title text-line-2">{{ i.title }}</p>
                            <p class="item-content text-line-1">{{ i.content }}</p>

                            <div class="foot flex justify-between items-center">
                                <div class="foot-left flex items-center">
                                    <img
                                        class="avatar"
                                        :src="i.userAvatar"
                                        alt="userName"
                                    >
                                    {{ i.userName }}
                                </div>

                                <div class="foot-right flex items-center">
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
        </div>

        <div class="module-activity module container">
            <div class="box-title flex justify-between items-center">
                <div class="left flex items-center">
                    <img
                        class="img-search inline-block"
                        src="~/assets/image/home/module-icon-03.png"
                        alt="search"
                    >
                    最新活动
                </div>
                <div
                    class="right flex items-center"
                    @click="gotoActivityAll()"
                >
                    查看更多
                    <img
                        class="img-search inline-block"
                        src="~/assets/image/home/more.png"
                        alt="more"
                    >
                </div>
            </div>

            <div class="box-content">
                <div
                    v-for="(i, j) in activityList"
                    :key="j"
                    class="activity-item inline-flex flex-col justify-between"
                    @click="gotoActivityInfo(i.id)"
                >
                    <div>
                        <img
                            class="cover"
                            :src="i.cover"
                            alt="cover"
                        >

                        <p class="item-date">{{ i.date }}</p>
                        <p class="item-time">{{ i.time }}</p>
                    </div>

                    <p class="item-content text-line-2">{{ i.title }}</p>
                </div>
            </div>
        </div>

        <div class="module-questions module container">
            <div class="box-title flex justify-between items-center">
                <div class="left flex items-center">
                    <img
                        class="img-search inline-block"
                        src="~/assets/image/home/module-icon-04.png"
                        alt="search"
                    >
                    精选问答
                </div>
                <div
                    class="right flex items-center"
                    @click="gotoQuestionsMore"
                >
                    查看更多
                    <img
                        class="img-search inline-block"
                        src="~/assets/image/home/more.png"
                        alt="more"
                    >
                </div>
            </div>

            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="box-content flex justify-between"
            >
                <div class="left">
                    <div
                        v-for="(i, j) in questionList"
                        :key="j"
                        class="question-item"
                        @click="gotoQuestion(i.link)"
                    >
                        <p class="item-title text-line-2">{{ i.title }}</p>
                        <p class="item-content">{{ i.content }}</p>

                        <img
                            class="avatar"
                            :src="i.userAvatar"
                            alt="userName"
                        >
                    </div>
                </div>

                <div class="right flex justify-around items-center">
                    <div class="box-label">
                        <a
                            v-for="(i, j) in labelList"
                            :key="j"
                            class="label-item"
                            :href="i.link"
                            target="_blank"
                        >#{{ i.name }}</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="module-builder flex flex-col items-center">
            <!-- <p>MVP of RTE community</p> -->
            <p>极狐共建者计划</p>
            <p>极狐GitLab自成立以来，受到越来越多用户的关注和使用，为了构建良好的开发生态、服务更多产品、并连接广大开发者，我们正式启动极狐共建者计划，诚邀您的加入！</p>

            <div
                class="btn"
                @click="gotoBuilder"
            >查看详情</div>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Carousel, CarouselItem } from 'element-ui';
import Footer from '@/components/Footer.vue';

@Component({
    components: {
        ElCarousel: Carousel,
        ElCarouselItem: CarouselItem,
        Footer,
    },
})
export default class HomePage extends Vue {
    isPC = false;

    bannerList: Array<any> = [];

    videoList: Array<any> = [];

    articleList: Array<any> = [];

    activityList: Array<any> = [];

    questionList: Array<any> = [];

    labelList: Array<any> = [];

    articleForm = {};

    async created() {
        this.getBannerList();
        this.getVideoList();
        this.getArticleList();
        this.getActivityList();
        this.getQuestionList();
        this.getLabelList();

        const exchangeCode = this.$route.query.token;

        // 临时token
        if (exchangeCode) {
            await this.$Http.post(
                '/auth/exchange-token-login',
                { exchangeCode },
            ).then((form: Record<string, any>) => {
                this.$store.dispatch('getUser', form)
                this.$store.dispatch('getToken', form.token);
            }).catch(() => this.$router.push({ name: 'login' }));
        }
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    getBannerList() {
        this.bannerList = [
            {
                url: require('~/assets/image/home/banner-01.png'),
                link: '',
            },
        ];
    }

    getVideoList() {
        this.videoList = [
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
                like: '32',
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
                like: '32',
                address: '中国广州',
                aaa: '线下',
                video: 'https://aps.roomwits.com/static/upload/f506a1ca175c4ce39323ceac4da6b11e',
                cover: require('~/assets/image/developer/video-cover-03.png'),
            },
        ];
    }

    getArticleList() {
        const articleList = [
            {
                id: 1,
                title: '能够发现零日漏洞模糊测试威力几何？',
                content: 'dsgsdgsdfg',
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
                content: 'dsgsdgsdfg',
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
                content: 'dsgsdgsdfg',
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
                content: 'dsgsdgsdfg',
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

        this.articleList = articleList.slice(1, articleList.length);
        this.articleForm = articleList[0];
    }

    getActivityList() {
        this.activityList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
            },
            {
                id: 4,
                date: '2022.06.08',
                time: '18:00-21:00',
                title: '极狐GitLab大讲坛之极狐GitLab软件测试指“难”',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-04.png'),
            },
            {
                id: 5,
                date: '2022.05.25',
                time: '20:00-21:00',
                title: '极狐GitLab大讲坛之核心资产保护—代码防泄露',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-05.png'),
            },
        ];
    }

    getQuestionList() {
        this.questionList = [
            {
                title: '什么时候 上线？如何吧gitlab.com上的订阅 转到 gitlab.cn ',
                content: '网站反馈 ',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                link: 'https://forum.gitlab.cn/t/topic/164',
            },
            {
                title: 'CI/CD 和runner 机器上文件权限问题',
                content: '极狐GitLab CI/CD',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                link: 'https://forum.gitlab.cn/t/topic/71',
            },
            {
                title: 'gitlab页面访问都要2s以上？日志显示view_duration_s都是大于2s，请问如何优化？(机器的配置足够高)',
                content: '技术指南',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                link: 'https://forum.gitlab.cn/t/topic/443',
            },
            {
                title: '远程办公了，回老家盖房子',
                content: '远程办公',
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                link: 'https://forum.gitlab.cn/t/topic/406',
            },
        ];
    }

    getLabelList() {
        this.labelList = [
            { name: 'docker', link: 'https://forum.gitlab.cn/tag/docker' },
            { name: 'kubernetes', link: 'https://forum.gitlab.cn/tag/kubernetes' },
            { name: 'pipeline', link: 'https://forum.gitlab.cn/tag/pipeline' },
            { name: '搜索', link: 'https://forum.gitlab.cn/tag/%E6%90%9C%E7%B4%A2' },
            { name: '江狐会', link: 'https://forum.gitlab.cn/tag/%E6%B1%9F%E7%8B%90%E4%BC%9A' },
            { name: 'runner', link: 'https://forum.gitlab.cn/tag/runner' },
            { name: 'security', link: 'https://forum.gitlab.cn/tag/security' },
            { name: '集成', link: 'https://forum.gitlab.cn/tag/%E9%9B%86%E6%88%90' },
            { name: 'webhook', link: 'https://forum.gitlab.cn/tag/webhook' },
            { name: '开源软件供应链安全', link: 'https://forum.gitlab.cn/tag/%E5%BC%80%E6%BA%90%E8%BD%AF%E4%BB%B6%E4%BE%9B%E5%BA%94%E9%93%BE%E5%AE%89%E5%85%A8' },
            { name: '沙龙', link: 'https://forum.gitlab.cn/tag/%E6%B2%99%E9%BE%99' },
        ];
    }

    gotoVideoAll() {
        this.$router.push({
            path: './developer',
            params: {},
            query: {
                isModule: '2',
            },
        });
    }

    gotoVideoInfo(id: string) {
        this.$router.push({
            path: './developerVideoInfo',
            params: {},
            query: {
                videoId: id,
            },
        });
    }

    gotoArticleAll() {
        this.$router.push({
            path: './developer',
            params: {},
            query: {
                isModule: '1',
            },
        });
    }

    gotoArticleInfo(id: string) {
        this.$router.push({
            path: './developerArticleInfo',
            params: {},
            query: {
                articleId: id,
            },
        });
    }

    gotoActivityAll() {
        this.$router.push({
            path: './activityAll',
        });
    }

    gotoActivityInfo(id: string) {
        this.$router.push({
            path: './activityInfo',
            params: {},
            query: {
                activityId: id,
            },
        });
    }

    gotoQuestionsMore() {
        window.open('https://forum.gitlab.cn/');
    }

    gotoQuestion(link: string) {
        window.open(link);
    }

    gotoBuilder() {
        this.$router.push({
            path: './contribute',
            params: {},
            query: {},
        });
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
