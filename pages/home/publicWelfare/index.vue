<template>
    <div class="page-public-welfare">
        <div class="module">
            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="container flex justify-between items-center"
            >
                <div class="item-img flex justify-around">
                    <img
                        src="~/assets/image/publicWelfare/public-welfare-01.png"
                        alt="publicWelfare"
                    >
                </div>

                <div>
                    <p class="item-title">开源项目公益支持计划</p>
                    <p class="item-msg">开源开放，人人贡献！极狐GitLab也乐于为拥有同一理念的人提供支持！</p>
                    <a
                        class="btn-more flex justify-around items-center"
                        href="https://gitlab.cn/solutions/open-source"
                        target="_blank"
                    >了解更多</a>
                </div>
            </div>
        </div>

        <div class="module">
            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="container flex justify-between items-center"
            >
                <div>
                    <p class="item-title">初创企业未来独角兽计划</p>
                    <p class="item-msg">寻找未来独角兽，极狐GitLab 助力初创企业加速发展！</p>
                    <a
                        class="btn-more flex justify-around items-center"
                        href="https://gitlab.cn/solutions/startups"
                        target="_blank"
                    >了解更多</a>
                </div>

                <div class="item-img flex justify-around">
                    <img
                        src="~/assets/image/publicWelfare/public-welfare-02.png"
                        alt="publicWelfare"
                    >
                </div>
            </div>
        </div>

        <div class="module">
            <div
                :class="!isPC ? 'flex-wrap' : ''"
                class="container flex justify-between items-center"
            >
                <div class="item-img flex justify-around">
                    <img
                        src="~/assets/image/publicWelfare/public-welfare-03.png"
                        alt="publicWelfare"
                    >
                </div>

                <div>
                    <p class="item-title">教育公益计划</p>
                    <p class="item-msg">支持国内开源行业和数字技术发展，为中国技术人才培养贡献力量</p>
                    <a
                        class="btn-more flex justify-around items-center"
                        href="https://gitlab.cn/solutions/education"
                        target="_blank"
                    >了解更多</a>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class PublicWelfarePage extends Vue {
    isPC = false;

    mounted() {
        this.isPC = document.body.clientWidth > 768;
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
