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

                    <!-- <div class="box-rich-text">
                        <ArticleTwo />
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
import ArticleTwo from '@/components/article/ArticleTwo.vue';
import { Input } from 'element-ui';

@Component({
    components: {
        ElInput: Input,
        // GotoComment,
        Footer,
        ArticleTwo,
    },
})
export default class VideoInfoPage extends Vue {
    hasLogin = false;

    isPC = false;

    videoId = 1;

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
                id: this.videoId,
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
        if (val.query.videoId) this.videoId = Number(val.query.videoId);

        this.fetchData();
        this.getCommentList();
        this.getRecommendList();
    }

    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        this.isPC = document.body.clientWidth > 768;

        const route: any = this.$route;
        if (route.query.videoId) this.videoId = Number(route.query.videoId);

        this.fetchData();
        this.getCommentList();
        this.getRecommendList();
    }

    fetchData() {
        const dataList = [
            {
                id: 1,
                title: '极狐练武场——搞定极狐GitLab的几种方式',
                time: '2022.06.14',
                look: ' 1209',
                address: '中国广州',
                aaa: '线下',
                video: 'https://aps.roomwits.com/static/upload/d3086d1f7ba14a45a309d788f336eef7',
                cover: require('~/assets/image/developer/video-cover-01.png'),
            },
            {
                id: 2,
                title: '开源贡献的代码和远方',
                time: '2022.06.21',
                look: ' 106',
                address: '中国广州',
                aaa: '线下',
                video: 'https://aps.roomwits.com/static/upload/350e5dd54b0e49c0902372db4eb13cac',
                cover: require('~/assets/image/developer/video-cover-02.png'),
            },
            {
                id: 3,
                title: '极狐练武场——六脉神剑【中】之极狐GitLab集成Kubernetes',
                time: '2022.06.21',
                look: ' 187',
                address: '中国广州',
                aaa: '线下',
                video: 'https://aps.roomwits.com/static/upload/f506a1ca175c4ce39323ceac4da6b11e',
                cover: require('~/assets/image/developer/video-cover-03.png'),
            },
        ];

        this.dataForm = dataList.filter((i: any) => i.id === this.videoId)[0];
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
@import './index.scss';
</style>
