<template>
    <div class="page-video-info">
        <Breadcrumb :data="breadcrumbList" />

        <div
            :class="!isPC ? 'flex-wrap' : ''"
            class="module-content container flex justify-between items-start"
        >
            <div class="left">
                <div class="box-content">
                    <!-- <img
                        v-if="dataForm.video"
                        class="box-video"
                        src="~/assets/image/home/banner-01.png"
                        alt="video"
                    > -->
                    <video
                        v-if="dataForm.video"
                        :src="dataForm.video"
                        controls
                    ></video>

                    <p class="box-title text-line-2">{{ dataForm.title }}</p>

                    <div class="box-msg flex">
                        <p>{{ dataForm.time }}</p>
                        <p>{{ dataForm.look }}播放</p>
                    </div>

                    <!-- <div>
                        <p style="margin-bottom: 20px;color: #4A4A4A;font-size: 18px;">DevOps 落地困难重重</p>
                        <p style="margin-bottom: 15px;color: #4A4A4A;font-size: 12px;">数字化转型已经成为企业保持持续竞争力，甚至寻找自身第二条发展曲线的突破口，因此企业都将数字化转型上升到战略高度。利用高质量的软件来打造高效能的信息系统将是企业数字化转型的关键，而 DevOps 是构建高质量软件的有效手段，经过十余年的发展，已经获得了业界认可。《中国 DevOps 现状调查报告 2021》显示，中国企业 DevOps 落地实践成熟度向全面级继续扩张，目前成熟度处于全面级的企业最多，为 35.40%，同比增长 8.84%；16.53% 的企业的实践成熟度处于优秀级；0.87% 的企业处于卓越级；超八成企业已在不同程度上实践敏捷开发，同比增长近三成。即使如此，DevOps 的真正落地实践，甚至在向 DevSecOps 转型的过程中却依旧充满着困难与挑战。</p>
                        <p style="margin-bottom: 20px;color: #4A4A4A;font-size: 18px;">开源带来的幸福烦恼</p>
                        <p style="margin-bottom: 15px;color: #4A4A4A;font-size: 12px;">开源的热度持续上升，企业、个人、资本都在逐渐进入开源这个赛道。开源这种通过全球异步协同来进行软件研发的软件研发模式能够让软件的交付加速，同时采用开源软件可以迅速构建起企业内部的信息系统，从而加速驱动企业数字化转型。在这个过程中，开源推动了 DevOps 的快速发展，但是略显遗憾的是，没有一个完全开源开放的 DevOps 平台来进一步推动开源的发展。</p>
                        <p style="margin-bottom: 20px;color: #4A4A4A;font-size: 18px;">工具链的复杂性带来的多米诺骨牌效应</p>
                        <p style="margin-bottom: 15px;color: #4A4A4A;font-size: 12px;">工具是 DevOps 落地实践的有效支撑，很多企业往往通过多种工具来提供提供覆盖软件开发全生命周期的 DevOps 能力。这种多工具链问题带来了诸多问题：工作人员需要花费大量的时间和精力去安装维护、配置升级多种工具链，导致没有足够的时间来通过优化 DevOps 为业务创新赋能；多工具链还存在无法将所有工具产生的数据进行有效整合，为决策者提供最有效的数据支撑，数据孤岛由此产生。这些都始于多工具链的抉择。</p>
                    </div> -->
                </div>

                <!-- <div class="module-comment">
                    <div class="box-title flex items-center">
                        <img
                            class="comment"
                            src="~/assets/image/footer/goto-comment.png"
                            alt="comment"
                        >
                        评论（{{ commentList.length }}）
                    </div>

                    <div
                        v-if="hasLogin"
                        class="box-input"
                    >
                        <el-input
                            v-model="releaseForm.content"
                            placeholder="说点什么…"
                            type="textarea"
                            rows="3"
                        ></el-input>
                    </div>

                    <div
                        v-if="hasLogin"
                        class="flex justify-end"
                    >
                        <div
                            class="btn-release flex justify-around items-center"
                            @click="release()"
                        >发布</div>
                    </div>

                    <div
                        v-if="!hasLogin"
                        class="box-no-login flex justify-around"
                    >
                        <div class="flex items-center">
                            请先
                            <div
                                class="btn-login flex justify-around items-center"
                                @click="handleLogin()"
                            >登录</div>
                            后发表评论
                        </div>
                    </div>

                    <div
                        v-if="commentList.length > 0"
                        class="box-comment"
                    >
                        <div
                            v-for="(i, j) in commentList"
                            :key="j"
                            class="comment-item flex"
                        >
                            <img
                                class="avatar"
                                src="~/assets/image/home/banner-01.png"
                                alt="avatar"
                            >
                            <div class="item-right">
                                <p class="item-name">{{ i.name }}</p>
                                <p class="item-comment">{{ i.comment }}</p>
                                <div class="item-other flex items-center">
                                    <div>{{ i.time }}</div>
                                    <div class="item-like flex items-center">
                                        <img
                                            class="like"
                                            src="~/assets/image/developer/user-like.png"
                                            alt="like"
                                            @click="i.hasLike = true"
                                        >
                                        {{ i.like }}
                                    </div>
                                    <div>回复</div>
                                </div>

                                <div
                                    v-for="(x, y) in i.list"
                                    :key="y"
                                    class="small-item flex"
                                >
                                    <img
                                        class="small-avatar"
                                        src="~/assets/image/home/banner-01.png"
                                        alt="avatar"
                                    >
                                    <div class="small-right">
                                        <p class="small-name flex">
                                            <span>{{ x.name }}</span>
                                            <span>{{ x.comment }}</span>
                                        </p>
                                        <div class="item-other flex items-center">
                                            <div>{{ x.time }}</div>
                                            <div class="item-like flex items-center">
                                                <img
                                                    v-if="x.hasLike"
                                                    class="like"
                                                    src="~/assets/image/developer/user-like-active.png"
                                                    alt="like"
                                                    @click="x.hasLike = false"
                                                >
                                                <img
                                                    v-else
                                                    class="like"
                                                    src="~/assets/image/developer/user-like.png"
                                                    alt="like"
                                                    @click="x.hasLike = true"
                                                >
                                                {{ x.like }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-else
                        class="box-empty flex flex-col justify-between items-center"
                    >
                        <img
                            class="comment"
                            src="~/assets/image/developer/no-comment.png"
                            alt="comment"
                        >
                        评论还是空空的
                    </div>
                </div> -->
            </div>

            <div class="right">
                <div class="module-x">
                    <div class="box-user flex items-center">
                        <img
                            class="avatar"
                            :src="userForm.avatar"
                            alt="avatar"
                        >
                        {{ userForm.name }}
                    </div>

                    <div class="box-btn flex justify-between items-center">
                        <div class="btn-item flex justify-between items-center">
                            <img
                                v-if="userForm.hasLike"
                                class="like"
                                src="~/assets/image/developer/user-like-active.png"
                                alt="like"
                                @click="userForm.hasLike = false"
                            >
                            <img
                                v-else
                                class="like"
                                src="~/assets/image/developer/user-like.png"
                                alt="like"
                                @click="userForm.hasLike = true"
                            >
                            {{ userForm.like }}
                        </div>

                        <div class="btn-item flex justify-between items-center">
                            <img
                                v-if="userForm.hasCollect"
                                class="collect"
                                src="~/assets/image/developer/user-collect-active.png"
                                alt="collect"
                                @click="userForm.hasCollect = false"
                            >
                            <img
                                v-else
                                class="collect"
                                src="~/assets/image/developer/user-collect.png"
                                alt="collect"
                                @click="userForm.hasCollect = true"
                            >
                            收藏
                        </div>
                    </div>
                </div>

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

        <!-- <GotoComment /> -->

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
// // import GotoComment from '@/components/developer/GotoComment.vue';
import Footer from '@/components/Footer.vue';
import { Input } from 'element-ui';

@Component({
    components: {
        ElInput: Input,
        // GotoComment,
        Footer,
    },
})
export default class VideoInfoPage extends Vue {
    hasLogin = false;

    isPC = false;

    playId = 1;

    breadcrumbList = [
        {
            name: '学习资料',
            route: 'home-developer',
            params: {},
            query: {
                isModule: 2,
            },
        },
        {
            name: '详情',
            route: 'home-developerVideoInfo',
            params: {
                id: this.playId,
            },
            query: {},
        },
    ];

    commentList: Array<any> = [];

    dataForm: any = {};

    releaseForm: any = {};

    userForm: any = {};

    recommendList: Array<any> = [];

    @Watch('$route')

    onUrlChange(val: any) {
        if (val.query.playId) this.playId = Number(val.query.playId);

        this.fetchData();
        this.getCommentList();
        this.getRecommendList();
    }

    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.isPC = document.body.clientWidth > 768;

        const route: any = this.$route;
        if (route.query.playId) this.playId = Number(route.query.playId);

        this.fetchData();
        this.getCommentList();
        this.getRecommendList();
    }

    fetchData() {
        const dataList = [
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

        this.dataForm = dataList.filter((i: any) => i.id === this.playId)[0];
        this.recommendList = dataList;

        this.userForm = {
            avatar: require('~/assets/image/activity/user-avatar.png'),
            name: '极狐GitLab',
            like: '342',
            look: '2.4k',
            hasLike: true,
            hasCollect: false,
        };
    }

    getCommentList() {
        this.commentList = [
            {
                avatar: '1',
                name: '张三',
                comment: '互联网已经彻底改变了我们的工作和生活。',
                time: '2022.09.12 12:23:23',
                like: '342',
                hasLike: false,
                list: [
                    {
                        avatar: '1',
                        name: '张三',
                        comment: '说得很好~~~~！！',
                        time: '2022.09.12 12:23:23',
                        like: '342',
                        hasLike: true,
                    },
                ],
            },
            {
                avatar: '1',
                name: '张三',
                comment: '互联网已经彻底改变了我们的工作和生活。',
                time: '2022.09.12 12:23:23',
                like: '342',
                hasLike: false,
                list: [],
            },
            {
                avatar: '1',
                name: '张三',
                comment: '互联网已经彻底改变了我们的工作和生活。',
                time: '2022.09.12 12:23:23',
                like: '342',
                hasLike: false,
                list: [
                    {
                        avatar: '1',
                        name: '张三',
                        comment: '说得很好~~~~！！',
                        time: '2022.09.12 12:23:23',
                        like: '342',
                        hasLike: true,
                    },
                ],
            },
        ];
    }

    handleLogin() {
        console.log('handleLogin');
    }

    release() {
        console.log('release');
    }

    getRecommendList() {
        // this.recommendList = [
        // ];
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
@import './index.scss';
</style>
