<template>
    <div class="activity-one">
        <div
            class="event-intro tab-content"
            id="eventContentAreaMain"
            style="margin-bottom: 0px;"
        >
            <!--                <p class="event_userAdd-title">活动详情</p>-->
            <div
                class=""
                id="event_desc_page"
            >
                <!-- 所有 p：white-space: pre; -->
                <p style="-webkit-font-smoothing: antialiased; "><img
                        src="http://cdn.huodongxing.com/file/ue/20161108/11BEE25B2911E5E0E85C4D74DD27864502/30484555693496082.jpeg"
                        title="主海报-无二维码.png"
                        alt="主海报-无二维码.png"
                    ></p>
                <p style="-webkit-font-smoothing: antialiased; "><span style="-webkit-font-smoothing: antialiased; font-size: 18px;"><br></span></p>
                <p style="-webkit-font-smoothing: antialiased;  text-align: center;">​<br></p>
                <p style="-webkit-font-smoothing: antialiased; "><span style="-webkit-font-smoothing: antialiased; font-size: 18px;"><br></span></p>
                <p style="-webkit-font-smoothing: antialiased; "><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">更多精彩议题：</span></p>
                <p style="-webkit-font-smoothing: antialiased; "><span style="-webkit-font-smoothing: antialiased; font-size: 18px;"><br style="-webkit-font-smoothing: antialiased;"></span></p>
                <div
                    data-zone-id="0"
                    data-line-index="3"
                    style="-webkit-font-smoothing: antialiased; "
                ><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">极狐练武场 “吸星大法” 系统管理基础专题：</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="4"
                    style="-webkit-font-smoothing: antialiased; "
                ><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">极狐GitLab 系统管理基础系列上期 —— 极狐GitLab备份、升级、恢复、版本迁移 &nbsp;@8月17日</span></div>
                <p style="-webkit-font-smoothing: antialiased; "><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">极狐GitLab 系统管理基础系列下期 —— 极狐GitLab常见系统管理配置、API调用 @9月14日</span></p>
                <p style="-webkit-font-smoothing: antialiased; "><span style="-webkit-font-smoothing: antialiased; font-size: 18px;"><br style="-webkit-font-smoothing: antialiased;"></span></p>
                <div
                    data-zone-id="0"
                    data-line-index="6"
                    style="-webkit-font-smoothing: antialiased; "
                ><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">极狐练武场 “北冥神功” CI/CD基础</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="7"
                    style="-webkit-font-smoothing: antialiased; "
                ><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">极狐GitLab CI/CD基础系列上期 —— 极狐GitLab的yml语法、常用变量、Runner安装配置 @10月19日</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="8"
                    style="-webkit-font-smoothing: antialiased; "
                ><span style="-webkit-font-smoothing: antialiased; font-size: 18px;">极狐GitLab CI/CD基础系列下期 —— 极狐GitLab的高阶用法，如分布式缓存、安全扫描 @11月16日</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="9"
                    style="-webkit-font-smoothing: antialiased; "
                ></div>
                <p style="-webkit-font-smoothing: antialiased;"><br style="-webkit-font-smoothing: antialiased; color: rgb(51, 51, 51); background-color: rgb(255, 255, 255);"></p>
                <p><br></p>
            </div>
            <p class="event_userAdd-title">活动嘉宾</p>
            <div
                class=" "
                id="event_tagpage_guest"
            >
                <div class="guest_wrapper">
                    <div
                        class="guest_list_item guest_list_itemClick"
                        data-desc="云原生、DevOps、开源爱好者；
擅长云计算、容器化领域；"
                    >
                        <img
                            src="https://cdn.huodongxing.com/logo/guest/201611/1435/8282503607756/824555682415596.jpg"
                            alt="嘉宾头像"
                        >

                        <div class="guest_list_itemMessage">
                            <p class="guest_name">
                                田成林
                            </p>
                            <p class="guest_name2">
                                极狐专业服务工程师
                            </p>
                            <p class="guest_name_company">
                                极狐GitLab
                            </p>

                        </div>
                    </div>
                </div>

            </div>
            <div class="clear">
            </div>
            <br>
            <div class="func">
                <button
                    style=""
                    class="btn btn-primary icon-weixin-button"
                    onclick="javascript:$('#wechat_modal').modal('show');"
                >
                    <span class="icon-weixin"></span>分享到微信
                </button>
                <button
                    class="btn btn-like"
                    name="eventFollowBtn"
                    onclick="javascript:followThisEvent(this);"
                >
                    <span class="icon-favorites-before"></span><span>收藏</span><span class="num">46</span>
                </button>
                <a
                    style=""
                    class="btn btn-like btn-jubao"
                    href="#accuse-layer"
                    data-toggle="modal"
                >举报活动</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ActivityOne extends Vue {
}
</script>

<style lang="scss">
@import '@/assets/styles/activity/activityOne.scss';
</style>
