<template>
    <div class="component-footer">
        <div class="container">
            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="footer-content flex justify-between"
            >
                <div
                    :class="!isPC ? 'flex-wrap' : ''"
                    class="footer-left inline-flex"
                >
                    <div
                        v-for="(i, j) in linkList"
                        :key="j"
                        class="footer-item"
                    >
                        <p class="title">{{ i.name }}</p>

                        <p
                            v-for="(x, y) in i.list"
                            :key="y"
                        >
                            <a :href="x.link">{{ x.name }}</a>
                        </p>
                    </div>
                </div>

                <div class="footer-right">
                    <img
                        src="~/assets/image/logo.png"
                        alt="logo"
                    >
                </div>
            </div>

            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="footer-foot flex justify-between align-items"
            >
                <div
                    :class="!isPC ? 'justify-between' : ''"
                    class="footer-left flex"
                >
                    <img
                        src="~/assets/image/footer/share-01.png"
                        alt="share"
                    >
                    <img
                        src="~/assets/image/footer/share-02.png"
                        alt="share"
                    >
                    <img
                        src="~/assets/image/footer/share-03.png"
                        alt="share"
                    >
                    <img
                        src="~/assets/image/footer/share-04.png"
                        alt="share"
                    >
                    <img
                        src="~/assets/image/footer/share-05.png"
                        alt="share"
                    >
                    <img
                        src="~/assets/image/footer/share-06.png"
                        alt="share"
                    >
                </div>

                <div class="footer-right">
                    <p>Git 为 Software Freedom Conservancy 的注册商标，GitLab 为 GitLab B.V.的注册商标，我们已获授权使用“极狐GitLab”。</p>
                    <p>鄂ICP备2021008419号-1</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FooterComponent extends Vue {
    isPC = false;

    linkList: Array<any> = [];

    created() {
        this.getLinkList();
    }

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    getLinkList() {
        this.linkList = [
            {
                name: '解决方案',
                list: [
                    {
                        name: '专业服务',
                        link: 'https://gitlab.cn/services/',
                    },
                    {
                        name: '企业级解决方案',
                        link: 'https://gitlab.cn/enterprise/',
                    },
                    {
                        name: 'CI/CD',
                        link: 'https://gitlab.cn/stages-devops-lifecycle/continuous-integration/',
                    },
                    {
                        name: '源代码管理',
                        link: 'https://gitlab.cn/stages-devops-lifecycle/source-code-management/',
                    },
                    {
                        name: 'Auto DevOps',
                        link: 'https://gitlab.cn/stages-devops-lifecycle/auto-devops/',
                    },
                    {
                        name: 'DevSecOps',
                        link: 'https://gitlab.cn/solutions/dev-sec-ops/',
                    },
                    {
                        name: '敏捷支付',
                        link: 'https://gitlab.cn/solutions/agile-delivery/',
                    },
                    {
                        name: '价值流管理',
                        link: 'https://gitlab.cn/solutions/value-stream-management/',
                    },
                    {
                        name: 'GitOps',
                        link: 'https://gitlab.cn/solutions/gitops/',
                    },
                    {
                        name: '价格',
                        link: 'https://gitlab.cn/pricing/',
                    },
                ],
            },
            {
                name: '资源',
                list: [
                    {
                        name: '文档',
                        link: 'https://docs.gitlab.cn/',
                    },
                    {
                        name: '社区',
                        link: 'https://gitlab.cn/community/',
                    },
                    {
                        name: '论坛',
                        link: 'https://forum.gitlab.cn/',
                    },
                    {
                        name: '博客',
                        link: 'https://gitlab.cn/blog/',
                    },
                    {
                        name: '培训认证',
                        link: 'https://gitlab.cn/services/education/',
                    },
                    {
                        name: '开源项目支持',
                        link: 'https://gitlab.cn/solutions/open-source/',
                    },
                    {
                        name: '开源合作伙伴',
                        link: 'https://gitlab.cn/solutions/open-source/partners/',
                    },
                    {
                        name: '未来独角兽计划',
                        link: 'https://gitlab.cn/solutions/startups/',
                    },
                    {
                        name: '公益教育',
                        link: 'https://gitlab.cn/solutions/education/',
                    },
                    {
                        name: '下载安装',
                        link: 'https://gitlab.cn/install/',
                    },
                ],
            },
            {
                name: '支持',
                list: [
                    {
                        name: '技术支持',
                        link: 'https://gitlab.cn/support/',
                    },
                    {
                        name: '合作伙伴计划',
                        link: 'https://gitlab.cn/partners/',
                    },
                    {
                        name: '获取帮助',
                        link: 'https://gitlab.cn/get-help/',
                    },
                ],
            },
            {
                name: '关于我们',
                list: [
                    {
                        name: '公司介绍',
                        link: 'https://gitlab.cn/company/',
                    },
                    {
                        name: '联系我们',
                        link: 'https://gitlab.cn/company/contact',
                    },
                    {
                        name: '新闻动态',
                        link: 'https://gitlab.cn/press/',
                    },
                    {
                        name: '为什么选择极狐GitLab？',
                        link: 'https://gitlab.cn/is-it-any-good/',
                    },
                    {
                        name: '极狐 Handbook',
                        link: 'https://gitlab.cn/handbook/',
                    },
                ],
            },
        ];
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/home/footer.scss';
</style>
