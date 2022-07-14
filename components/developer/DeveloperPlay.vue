<template>
    <div class="component-developer-play">
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
                v-for="(i, j) in playList"
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
export default class DeveloperPlayComponent extends Vue {
    isPC = false;

    typeList = [
        {
            type: 1,
            name: '全部',
        },
        {
            type: 2,
            name: '远程办公',
        },
        {
            type: 3,
            name: '程序员日常',
        },
    ];

    isType = 1;

    isSelect = false; // 选择培训

    isActive = 1; // 1: 初级, 2: 中级, 3: 高级

    playList: Array<any> = [];

    created() {
        this.getPlayList();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    getPlayList() {
        const playList = [
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
                type: 2, // 1: 全部, 2: 远程办公, 3: 程序员日常
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
                type: 3, // 1: 全部, 2: 远程办公, 3: 程序员日常
            },
        ];

        if (this.isType === 1) {
            this.playList = playList;
        } else {
            this.playList = playList.filter((i: any) => i.type === this.isType);
        }
    }

    // 改变类型
    changeType(type: number) {
        this.isType = type;
        this.getPlayList();
    }

    // 选择培训
    changeActive(isActive: number) {
        this.isActive = isActive;
        this.isSelect = false;
    }

    gotoInfo(id: string) {
        this.$router.push({
            path: './developerPlayInfo',
            params: {},
            query: {
                playId: id,
            },
        });
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/developer/play.scss';
</style>
