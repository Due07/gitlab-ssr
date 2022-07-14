<template>
    <div class="page-activity">
        <div
            :class="!isPC ? 'flex-wrap' : ''"
            class="container flex justify-between items-start"
        >
            <div class="left">
                <el-carousel
                    trigger="hover"
                    arrow="never"
                    direction="horizontal"
                    :loop="true"
                    :height="isPC ? '289px' : '183px'"
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

                <div class="box-title flex items-center">
                    <img
                        class="more"
                        src="~/assets/image/activity/module-01.png"
                        alt="more"
                    >
                    活动回顾
                </div>

                <div class="box-content">
                    <div
                        v-for="(i, j) in activityList"
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
                                <div class="date">{{ i.date }}</div>
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

            <div class="right">
                <div class="module-calendar">
                    <div class="box-title flex justify-between items-center">
                        <div class="flex items-center">
                            <img
                                class="hot"
                                src="~/assets/image/activity/module-calendar.png"
                                alt="hot"
                            >
                            活动日历
                        </div>

                        <div
                            class="more"
                            @click="gotoActivityAll()"
                        >更多活动</div>
                    </div>

                    <div
                        v-for="(i, j) in calendarList"
                        :key="j"
                        class="calendar-item"
                        @click="gotoCalendar()"
                    >
                        <div class="item-title flex items-center">
                            <div class="item-date">{{ i.date }}</div>
                            <div>{{ i.time }}</div>
                            <div class="item-location">{{ i.location }}</div>
                        </div>
                        <p class="item-content text-line-1">{{ i.title }}</p>
                    </div>

                    <!-- <img
                        class="add-calendar"
                        src="~/assets/image/activity/add-calendar.png"
                        alt="add-calendar"
                        @click="handleRelease()"
                    > -->
                </div>

                <div class="module-hot">
                    <div class="box-title flex items-center">
                        <img
                            class="hot"
                            src="~/assets/image/developer/module-x-01.png"
                            alt="hot"
                        >
                        热门活动
                    </div>

                    <div
                        v-for="(i, j) in hotList"
                        :key="j"
                        class="hot-item"
                        @click="gotoInfo(i.id)"
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
                        <div class="item-time">{{ i.time }}</div>
                    </div>
                </div>
            </div>
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
export default class ActivityPage extends Vue {
    isPC = false;

    bannerList: Array<any> = [];

    activityList: Array<any> = [];

    calendarList: Array<any> = [];

    hotList: Array<any> = [];

    created() {
        this.getBannerList();
        this.getActivityList();
        this.getCalendarList();
        this.getHotList();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    getBannerList() {
        this.bannerList = [
            {
                id: 1,
                url: require('~/assets/image/activity/banner-01.png'),
                link: 'https://8282503607756.huodongxing.com/event/5652815633123',
                gotoPage: true,
            },
            {
                id: 2,
                url: require('~/assets/image/activity/banner-02.png'),
                link: 'https://8282503607756.huodongxing.com/event/4653857988423',
                gotoPage: true,
            },
            {
                id: 3,
                url: require('~/assets/image/activity/banner-03.png'),
                link: 'https://8282503607756.huodongxing.com/event/3653721910323',
                gotoPage: true,
            },
            {
                id: 4,
                url: require('~/assets/image/activity/banner-04.png'),
                link: 'https://8282503607756.huodongxing.com/event/5656018458023',
                gotoPage: true,
            },
        ];
    }

    // 获取文章列表
    getActivityList() {
        this.activityList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 4,
                date: '2022.06.08',
                time: '18:00-21:00',
                title: '极狐GitLab大讲坛之极狐GitLab软件测试指“难”',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-04.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 5,
                date: '2022.05.25',
                time: '20:00-21:00',
                title: '极狐GitLab大讲坛之核心资产保护—代码防泄露',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-05.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
        ];
    }

    // 获取日历
    getCalendarList() {
        this.calendarList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 4,
                date: '2022.06.08',
                time: '18:00-21:00',
                title: '极狐GitLab大讲坛之极狐GitLab软件测试指“难”',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-04.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
        ];
    }

    getHotList() {
        this.hotList = [
            {
                id: 1,
                date: '2022.07.13',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【下】之极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                content: '极狐GitLab与Harbor/Jira/Jenkins/SonarQube的多平台集成实践',
                cover: require('~/assets/image/activity/activity-cover-01.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 2,
                date: '2022.06.23',
                time: '20:00-21:00',
                title: '极狐GitLab 大讲坛之极狐GitLab CI/CD 和 MLOps 在 IoT 开发中的实践',
                content: '《极狐GitLab 大讲坛》是由极狐GitLab 团队策划打造的 online webinar 活动。我们期望能借助已经非常普及的网络资源，为大家带来更多关于 IT 领域的技术分享，包括但不限于 DevOps、云原生、开源等',
                cover: require('~/assets/image/activity/activity-cover-02.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
            {
                id: 3,
                date: '2022.06.15',
                time: '20:00-21:00',
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                content: '六脉神剑【中】之极狐GitLab集成Kubernetes',
                cover: require('~/assets/image/activity/activity-cover-03.png'),
                labelList: ['类型名', '类型名'],
                userAvatar: require('~/assets/image/activity/user-avatar.png'),
                userName: '极小狐',
                look: '2.4k',
                message: '342',
                like: '342',
                location: '广州',
            },
        ];
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

    gotoActivityAll() {
        this.$router.push({
            path: './activityAll',
        });
    }

    gotoCalendar() {
        console.log('gotoCalendar');
    }

    handleRelease() {
        this.$router.push({
            path: './activityRelease',
        });
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
