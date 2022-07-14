<template>
    <div class="page-activity-all">
        <Breadcrumb :data="breadcrumbList" />

        <div class="box-content container">
            <div
                v-for="(i, j) in activityList"
                :key="j"
                class="item"
                @click="gotoActivity(i.id)"
            >
                <img
                    v-if="i.cover"
                    class="cover"
                    :src="i.cover"
                    alt="cover"
                >

                <p
                    :class="!i.cover? 'no-img': ''"
                    class="text-line-2"
                >{{ i.title }}</p>
                <div
                    :class="!i.cover? 'no-img': ''"
                    class="item-time"
                >{{ i.time }}</div>

                <div
                    v-if="!i.cover"
                    class="item-content text-line-2"
                >{{ i.content }}</div>

                <a
                    class="btn-apply"
                    :href="i.link"
                    target="_blank"
                >立即报名</a>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue';

@Component({
    components: {
        Footer,
    },
})
export default class ActivityAllPage extends Vue {
    isPC = false;

    breadcrumbList = [
        {
            name: '活动',
            route: 'home-activity',
            params: {},
            query: {},
        },
        {
            name: '全部活动',
            route: 'home-activityAll',
            params: {},
            query: {},
        },
    ];

    activityList: Array<any> = [];

    created() {
        this.fetchData();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    fetchData() {
        this.activityList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
                link: 'https://8282503607756.huodongxing.com/event/4653857988423',
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
                link: 'https://8282503607756.huodongxing.com/event/5656018458023',
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
                link: 'https://8282503607756.huodongxing.com/event/3653721910323',
            },
            {
                id: 4,
                date: '2022.06.08',
                time: '18:00-21:00',
                title: '极狐GitLab大讲坛之极狐GitLab软件测试指“难”',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-04.png'),
                link: 'https://8282503607756.huodongxing.com/event/5652815633123',
            },
            {
                id: 5,
                date: '2022.05.25',
                time: '20:00-21:00',
                title: '极狐GitLab大讲坛之核心资产保护—代码防泄露',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-05.png'),
                link: 'https://8282503607756.huodongxing.com/event/3649685772823',
            },
        ];
    }

    gotoActivity(id: string) {
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
