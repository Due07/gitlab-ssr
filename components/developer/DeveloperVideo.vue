<template>
    <div class="component-developer-video">
        <div class="box-type flex">
            <div
                v-for="(i, j) in typeList"
                :key="j"
                :class="{'active': isType === i.type}"
                class="type-item"
                @click="changeType(i.type)"
            >{{ i.name }}</div>

            <!-- <div
                class="type-dropdown flex items-center"
                @click="isSelect = !isSelect"
            >
                培训
                <img
                    :class="isSelect ? 'show' : ''"
                    src="~/assets/image/home/arrow-gray.png"
                    alt="arrow"
                >

                <ul v-show="isSelect">
                    <li
                        :class="isActive === 1 ? 'active' : ''"
                        @click.stop="changeActive(1)"
                    >初级</li>
                    <li
                        :class="isActive === 2 ? 'active' : ''"
                        @click.stop="changeActive(2)"
                    >中级</li>
                    <li
                        :class="isActive === 3 ? 'active' : ''"
                        @click.stop="changeActive(3)"
                    >高级</li>
                </ul>
            </div> -->
        </div>

        <div class="box-content">
            <div
                v-for="(i, j) in videoList"
                :key="j"
                class="item"
                @click="gotoInfo(i.id)"
            >
                <img
                    class="cover"
                    :src="i.cover"
                    alt="cover"
                >
                <p class="item-title text-line-2">{{ i.title }}</p>

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
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class DeveloperVideoComponent extends Vue {
    isPC = false;

    typeList = [
        {
            type: 1,
            name: '活动回放',
        },
        {
            type: 2,
            name: '极狐练武场',
        },
        {
            type: 3,
            name: '技术开放日',
        },
    ];

    isType = 1;

    isSelect = false; // 选择培训

    isActive = 1; // 1: 初级, 2: 中级, 3: 高级

    videoList: Array<any> = [];

    created() {
        this.getVideoList();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    // 获取视频
    getVideoList() {
        const videoList = [
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
                type: 2, // 1: 活动回放, 2: 极狐练武场, 3: 技术开放日
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
                type: 3, // 1: 活动回放, 2: 极狐练武场, 3: 技术开放日
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
                type: 2, // 1: 活动回放, 2: 极狐练武场, 3: 技术开放日
            },
        ];

        if (this.isType === 1) {
            this.videoList = videoList;
        } else {
            this.videoList = videoList.filter((i: any) => i.type === this.isType);
        }
    }

    // 改变类型
    changeType(isType: number) {
        this.isType = isType;
        this.getVideoList();
    }

    // 选择培训
    changeActive(isActive: number) {
        this.isActive = isActive;
        this.isSelect = false;
    }

    gotoInfo(id: string) {
        this.$router.push({
            path: './developerVideoInfo',
            params: {},
            query: {
                videoId: id,
            },
        });
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/developer/video.scss';
</style>
