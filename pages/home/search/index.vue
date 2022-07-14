<template>
    <div class="page-search">
        <div class="container">
            <div class="box-content">
                <div class="box-input flex">
                    <el-input
                        class="flex-1"
                        v-model="content"
                        placeholder="请输入关键字"
                        clearable
                    ></el-input>

                    <div
                        class="btn-search flex justify-around items-center"
                        @click="search()"
                    >搜索</div>
                </div>

                <p
                    v-if="hasSearch"
                    class="box-msg"
                >搜索结果：找到 "{{ content }}" 相关内容数量 {{ resultList.length }}</p>

                <div v-if="resultList.length > 0">
                    <div
                        v-for="(i, j) in resultList"
                        :key="j"
                        class="item"
                        @click="gotoInfo()"
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
                                src="~/assets/image/home/banner-01.png"
                                alt="cover"
                            >
                        </div>

                        <div class="foot flex justify-between items-center">
                            <div class="foot-left flex items-center">
                                <img
                                    class="avatar"
                                    src="~/assets/image/home/banner-01.png"
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

                <div
                    v-if="hasSearch && resultList.length < 1"
                    class="box-empty flex flex-col justify-between items-center"
                >
                    <img
                        class="comment"
                        src="~/assets/image/developer/no-comment.png"
                        alt="comment"
                    >
                    换个关键词试试
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Input } from 'element-ui';

@Component({
    components: {
        ElInput: Input,
    },
})
export default class SearchPage extends Vue {
    isPC = false;

    content = '';

    hasSearch = false;

    resultList: Array<any> = [];

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }

    search() {
        this.hasSearch = true;
        this.resultList = [
            {
                cover: '1',
                title: '安全领导力｜ GitLab 持续位列 Gartner AST 魔力象限',
                content: 'Gartner 在四月下旬发布了 2022 年应用程序安全测试（Application Security Testing，简称 AST）魔力象限，GitLab 位列挑战象限。',
                labelList: ['类型名', '类型名'],
                userAvatar: '',
                userName: '张三',
                date: '2022.09.12',
                look: '2.4k',
                message: '342',
                like: '342',
            },
            {
                cover: '',
                title: '不考虑安全的数字化转型都是伪命题',
                content: '以数字化为重要抓手的数字经济已经发展成为一个重要的经济形态',
                labelList: ['类型名', '类型名'],
                userAvatar: '',
                userName: '张三',
                date: '2022.09.12',
                look: '2.4k',
                message: '342',
                like: '342',
            },
            {
                cover: '1',
                title: '白皮书上新｜创新平台，开源利器：极狐 GitLab SaaS 全栈式 DevOps 平台，助力企业加速数字化',
                content: '数字化转型已经成为企业保持持续竞争力，甚至寻找自身第二条发展曲线的突破口，因此企业都将数字化转型上升到战略高度。',
                labelList: ['类型名'],
                userAvatar: '',
                userName: '张三',
                date: '2022.09.12',
                look: '2.4k',
                message: '342',
                like: '342',
            },
            {
                cover: '',
                title: '快速上手极狐GitLab设计管理功能',
                content: '什么是设计管理功能',
                labelList: ['类型名'],
                userAvatar: '',
                userName: '张三',
                date: '2022.09.12',
                look: '2.4k',
                message: '342',
                like: '342',
            },
            {
                cover: '1',
                title: '极狐(GitLab)公司获数亿元A轮融资加速推动中国开源DevOps生态建设',
                content: '2022年4月11日，北京——极狐(GitLab)(以下简称“极狐公司”)正式宣布A轮融资签约完成，融资金额达数亿元人民币。',
                labelList: ['类型名'],
                userAvatar: '',
                userName: '张三',
                date: '2022.09.12',
                look: '2.4k',
                message: '342',
                like: '342',
            },
        ];
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
