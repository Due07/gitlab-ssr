<template>
    <div class="page-activity-info">
        <Breadcrumb :data="breadcrumbList" />

        <div
            :class="!isPC ? 'flex-wrap' : ''"
            class="module-content container flex justify-between items-start"
        >
            <div class="left">
                <div
                    :class="!isPC ? 'flex-wrap' : ''"
                    class="box-title flex justify-between items-center"
                >
                    <p class="text-line-2">{{ dataForm.title }}</p>
                    <a
                        class="btn-apply"
                        :href="dataForm.link"
                        target="_blank"
                    >立即报名</a>
                </div>

                <div class="box-msg">
                    <p>
                        活动时间：
                        <span>{{ dataForm.date }} {{ dataForm.time }}</span>
                    </p>
                    <p>
                        活动地点：
                        <span>{{ dataForm.address }}</span>
                    </p>
                </div>

                <!-- <img
                    v-if="dataForm.cover"
                    class="box-cover"
                    :src="dataForm.cover"
                    alt="cover"
                > -->

                <div class="box-rich-text">
                    <ActivityOne v-if="dataForm.id === 1" />

                    <ActivityTwo v-else-if="dataForm.id === 2" />

                    <ActivityThere v-else-if="dataForm.id === 3" />

                    <ActivityFour v-else-if="dataForm.id === 4" />

                    <ActivityFive v-else />
                </div>
            </div>

            <div class="right">
                <div class="module-share module-x">
                    <div class="box-title flex items-center">
                        <img
                            class="more"
                            src="~/assets/image/developer/share.png"
                            alt="more"
                        >
                        分享到
                    </div>

                    <div class="bshare-custom share-item flex justify-between items-center">
                        <div class="bsPromo bsPromo2"></div>
                        <a
                            title="分享到微信"
                            class="bshare-weixin"
                            href="javascript:void(0);"
                        ></a>
                        <a
                            title="分享到新浪微博"
                            class="bshare-sinaminiblog"
                        ></a>
                    </div>
                </div>

                <div class="module-x">
                    <div class="box-title flex items-center">
                        <img
                            class="more"
                            src="~/assets/image/developer/module-x-02.png"
                            alt="more"
                        >
                        相关推荐
                    </div>

                    <div
                        v-for="(i, j) in recommendList"
                        :key="j"
                        class="item"
                        @click="gotoInfo(i.id)"
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
            </div>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue';
import ActivityOne from '@/components/activity/ActivityOne.vue';
import ActivityTwo from '@/components/activity/ActivityTwo.vue';
import ActivityThere from '@/components/activity/ActivityThere.vue';
import ActivityFour from '@/components/activity/ActivityFour.vue';
import ActivityFive from '@/components/activity/ActivityFive.vue';

@Component({
    components: {
        Footer,
        ActivityOne,
        ActivityTwo,
        ActivityThere,
        ActivityFour,
        ActivityFive,
    },
})
export default class ActivityInfoPage extends Vue {
    isPC = false;

    activityId = 1;

    breadcrumbList = [
        {
            name: '活动',
            route: 'home-activity',
            params: {},
            query: {},
        },
        {
            name: '详情',
            route: 'home-activityInfo',
            params: {
                id: this.activityId,
            },
            query: {},
        },
    ];

    recommendList: Array<any> = [];

    dataForm: any = {};

    @Watch('$route')

    onUrlChange(val: any) {
        if (val.query.activityId) this.activityId = Number(val.query.activityId);

        this.fetchData();
        this.getRecommendList();
    }

    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.isPC = document.body.clientWidth > 768;

        const route: any = this.$route;
        if (route.query.activityId) this.activityId = Number(route.query.activityId);

        this.fetchData();
        this.getRecommendList();
    }

    fetchData() {
        const dataList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/4653857988423',
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/5656018458023',
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/3653721910323',
            },
            {
                id: 4,
                date: '2022.06.08',
                time: '18:00-21:00',
                title: '极狐GitLab大讲坛之极狐GitLab软件测试指“难”',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-04.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/5652815633123',
            },
            {
                id: 5,
                date: '2022.05.25',
                time: '20:00-21:00',
                title: '极狐GitLab大讲坛之核心资产保护—代码防泄露',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-05.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/3649685772823',
            },
        ];

        this.dataForm = dataList.filter((i: any) => i.id === this.activityId)[0];
    }

    getRecommendList() {
        this.recommendList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/4653857988423',
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/5656018458023',
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/3653721910323',
            },
            {
                id: 4,
                date: '2022.06.08',
                time: '18:00-21:00',
                title: '极狐GitLab大讲坛之极狐GitLab软件测试指“难”',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-04.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/5652815633123',
            },
            {
                id: 5,
                date: '2022.05.25',
                time: '20:00-21:00',
                title: '极狐GitLab大讲坛之核心资产保护—代码防泄露',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-05.png'),
                address: '线上',
                link: 'https://8282503607756.huodongxing.com/event/3649685772823',
            },
        ];
    }

    release() {
        this.$router.push({
            path: './activityRelease',
            params: {},
        });
    }

    gotoInfo(id: string) {
        this.$router.push({
            path: './activityInfo',
            params: {},
            query: {
                activityId: id,
            },
        });
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
