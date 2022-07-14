<template>
    <div class="page-contribute">
        <div class="module-01">
            <div class="container">
                <div
                    :class="!isPC ? 'flex-wrap' : ''"
                    class="container flex justify-between items-center"
                >
                    <div>
                        <p class="item-title">极狐共建者计划</p>
                        <p class="item-msg">极狐GitLab自成立以来，受到越来越多用户的关注和使用，为了构建良好的开发生态、服务更多产品、并连接广大开发者，我们正式启动极狐共建者计划，诚邀您的加入！</p>
                    </div>

                    <div class="item-img flex justify-around">
                        <img
                            src="~/assets/image/contribute/contribute-01.png"
                            alt="contribute"
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="module-02">
            <p class="item-title container">共建价值</p>

            <div class="container">
                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-02.png"
                        alt="contribute"
                    >
                    <p class="item-msg">产品优惠使用权</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-03.png"
                        alt="contribute"
                    >
                    <p class="item-msg">专属服务支持</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-04.png"
                        alt="contribute"
                    >
                    <p class="item-msg">官方认证布道师</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-05.png"
                        alt="contribute"
                    >
                    <p class="item-msg">高薪就业直推</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-06.png"
                        alt="contribute"
                    >
                    <p class="item-msg">个人品牌打造</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-07.png"
                        alt="contribute"
                    >
                    <p class="item-msg">技术大咖交流</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-08.png"
                        alt="contribute"
                    >
                    <p class="item-msg">极狐官方大会VIP</p>
                </div>

                <div class="item">
                    <img
                        src="~/assets/image/contribute/contribute-09.png"
                        alt="contribute"
                    >
                    <p class="item-msg">极狐定制大礼包</p>
                </div>
            </div>
        </div>

        <div class="module-03">
            <p class="item-title container">共建体系</p>

            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="container flex"
            >
                <div class="item">
                    <div class="box-title-01 box-title flex justify-around items-center">JiHu Hero</div>

                    <p class="item-msg">极狐GitLab 社区由一群开源开放、充满热情、乐于分享的小伙伴组成，JiHu Hero 更是其中的佼佼者，愿意积极投入组织极狐GitLab 相关的主题活动、进行极狐GitLab 主题演讲、编撰极狐GitLab 相关的技术博客、视频、动画等，乐于公开向大家分享关于极狐GitLab 的一切。极狐GitLab 每年会甄选出 0-3位 候选人作为 JiHu Hero，以当年的实际情况为准。</p>

                    <a
                        class="btn-more flex justify-around items-center"
                        href="https://gitlab.cn/community/heroes/"
                        target="_blank"
                    >申请加入</a>
                </div>

                <div class="item">
                    <div class="box-title-02 box-title flex justify-around items-center">极狐用户社区领袖</div>

                    <p class="item-msg">成就如今的极狐GitLab，正是因为极狐GitLab 强大的社区基因。同样，我们也在寻找对极狐GitLab有热情，有组织能力的小伙伴与我们一起共建社区。这就是极狐GitLab开发者社区的社区领袖！</p>

                    <a
                        class="btn-more flex justify-around items-center"
                        href="https://gitlab.cn/community/contribute/engagement/"
                        target="_blank"
                    >申请加入</a>
                </div>
            </div>
        </div>

        <div class="module-04">
            <p class="item-title container">相关内容</p>

            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="container flex item-start"
            >
                <div class="left">
                    <div
                        v-for="(i, j) in leftList"
                        :key="j"
                        class="item flex items-start"
                        @click="gotoInfo(i.id)"
                    >
                        <img
                            v-if="i.cover"
                            class="cover"
                            :src="i.cover"
                            alt="cover"
                        >
                        <div>
                            <p class="box-title text-line-2">{{ i.title }}</p>
                            <p class="box-msg text-line-2">{{ i.content }}</p>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div
                        v-for="(i, j) in rightList"
                        :key="j"
                        class="item flex items-start"
                        @click="gotoInfo(i.id)"
                    >
                        <img
                            v-if="i.cover"
                            class="cover"
                            :src="i.cover"
                            alt="cover"
                        >
                        <div>
                            <p class="box-title text-line-2">{{ i.title }}</p>
                            <p class="box-msg text-line-2">{{ i.content }}</p>
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

@Component
export default class ContributePage extends Vue {
    isPC = false;

    leftList: Array<any> = [];

    rightList: Array<any> = [];

    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.isPC = document.body.clientWidth > 768;

        this.getArticleList();
    }

    // 获取文章列表
    getArticleList() {
        this.leftList = [
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
        ];

        this.rightList = [
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
        ];
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
@import './index.scss';
</style>
