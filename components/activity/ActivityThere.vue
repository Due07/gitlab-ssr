<template>
    <div class="activity-there">
        <div
            class="event-intro tab-content"
            id="eventContentAreaMain"
            style="margin-bottom: 0px;"
        >
            <!--                <p class="event_userAdd-title">活动详情</p>-->
            <!-- 所有 p：white-space: pre; -->
            <div
                class="  "
                id="event_desc_page"
            >
                <p><img
                        src="http://cdn.huodongxing.com/file/ue/20161108/11BEE25B2911E5E0E85C4D74DD27864502/30884540753000781.jpeg"
                        title="主海报-无二维码.png"
                        alt="主海报-无二维码.png"
                    ></p>
                <p><br></p>
                <div
                    class="okr-block-clipboard"
                    data-okr="%7B%22okrDelta%22%3A%5B%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9B%B4%E5%A4%9A%E7%B2%BE%E5%BD%A9%E8%AE%AE%E9%A2%98%EF%BC%9A%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90%E7%BB%83%E6%AD%A6%E5%9C%BA%20%E2%80%9C%E5%85%AD%E8%84%89%E7%A5%9E%E5%89%91%E2%80%9D%20%E9%9B%86%E6%88%90%E4%B8%93%E9%A2%98%EF%BC%9A%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E5%85%AD%E8%84%89%E7%A5%9E%E5%89%91%EF%BC%88%E4%B8%8B%EF%BC%89%E6%9E%81%E7%8B%90GitLab%20%E9%9B%86%E6%88%90Harbor%EF%BC%8CJira%EF%BC%8CJenkins%EF%BC%8CSonarqube%20%22%7D%7D%2C%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%407%E6%9C%8813%E6%97%A5%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90%E7%BB%83%E6%AD%A6%E5%9C%BA%20%E2%80%9C%E5%90%B8%E6%98%9F%E5%A4%A7%E6%B3%95%E2%80%9D%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80%E4%B8%93%E9%A2%98%EF%BC%9A%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90GitLab%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80%E7%B3%BB%E5%88%97%E4%B8%8A%E6%9C%9F%20%E2%80%94%E2%80%94%20%E6%9E%81%E7%8B%90GitLab%E5%A4%87%E4%BB%BD%E3%80%81%E5%8D%87%E7%BA%A7%E3%80%81%E6%81%A2%E5%A4%8D%E3%80%81%E7%89%88%E6%9C%AC%E8%BF%81%E7%A7%BB%20%20%22%7D%7D%2C%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%408%E6%9C%8817%E6%97%A5%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90GitLab%20%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E5%9F%BA%E7%A1%80%E7%B3%BB%E5%88%97%E4%B8%8B%E6%9C%9F%20%E2%80%94%E2%80%94%20%E6%9E%81%E7%8B%90GitLab%E5%B8%B8%E8%A7%81%E7%B3%BB%E7%BB%9F%E7%AE%A1%E7%90%86%E9%85%8D%E7%BD%AE%E3%80%81API%E8%B0%83%E7%94%A8%20%22%7D%7D%2C%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%409%E6%9C%8814%E6%97%A5%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90%E7%BB%83%E6%AD%A6%E5%9C%BA%20%E2%80%9C%E5%8C%97%E5%86%A5%E7%A5%9E%E5%8A%9F%E2%80%9D%20CI%2FCD%E5%9F%BA%E7%A1%80%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90GitLab%20CI%2FCD%E5%9F%BA%E7%A1%80%E7%B3%BB%E5%88%97%E4%B8%8A%E6%9C%9F%20%E2%80%94%E2%80%94%20%E6%9E%81%E7%8B%90GitLab%E7%9A%84yml%E8%AF%AD%E6%B3%95%E3%80%81%E5%B8%B8%E7%94%A8%E5%8F%98%E9%87%8F%E3%80%81Runner%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE%20%22%7D%7D%2C%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%4010%E6%9C%8819%E6%97%A5%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%E6%9E%81%E7%8B%90GitLab%20CI%2FCD%E5%9F%BA%E7%A1%80%E7%B3%BB%E5%88%97%E4%B8%8B%E6%9C%9F%20%E2%80%94%E2%80%94%20%E6%9E%81%E7%8B%90GitLab%E7%9A%84%E9%AB%98%E9%98%B6%E7%94%A8%E6%B3%95%EF%BC%8C%E5%A6%82%E5%88%86%E5%B8%83%E5%BC%8F%E7%BC%93%E5%AD%98%E3%80%81%E5%AE%89%E5%85%A8%E6%89%AB%E6%8F%8F%20%22%7D%7D%2C%7B%22opType%22%3A%22text%22%2C%22options%22%3A%7B%22text%22%3A%22%4011%E6%9C%8816%E6%97%A5%22%7D%7D%5D%7D%2C%7B%22lineType%22%3A%22text%22%2C%22lineOptions%22%3A%7B%7D%2C%22lineContent%22%3A%5B%5D%7D%5D%2C%22businessKey%22%3A%22lark-doc%22%7D"
                ></div>
                <div
                    data-zone-id="0"
                    data-line-index="0"
                    style=""
                ><span style="font-size: 18px;">更多精彩议题：</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="1"
                    style=""
                ><span style="font-size: 18px;">极狐练武场 “六脉神剑” 集成专题：</span></div>
                <p style=""><span style="font-size: 18px;">六脉神剑（下）极狐GitLab 集成Harbor，Jira，Jenkins，Sonarqube @7月13日</span></p>
                <p style=""><span style="font-size: 18px;"><br></span></p>
                <div
                    data-zone-id="0"
                    data-line-index="3"
                    style=""
                ><span style="font-size: 18px;">极狐练武场 “吸星大法” 系统管理基础专题：</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="4"
                    style=""
                ><span style="font-size: 18px;">极狐GitLab 系统管理基础系列上期 —— 极狐GitLab备份、升级、恢复、版本迁移 &nbsp;@8月17日</span></div>
                <p style=""><span style="font-size: 18px;">极狐GitLab 系统管理基础系列下期 —— 极狐GitLab常见系统管理配置、API调用 @9月14日</span></p>
                <p style=""><span style="font-size: 18px;"><br></span></p>
                <div
                    data-zone-id="0"
                    data-line-index="6"
                    style=""
                ><span style="font-size: 18px;">极狐练武场 “北冥神功” CI/CD基础</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="7"
                    style=""
                ><span style="font-size: 18px;">极狐GitLab CI/CD基础系列上期 —— 极狐GitLab的yml语法、常用变量、Runner安装配置 @10月19日</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="8"
                    style=""
                ><span style="font-size: 18px;">极狐GitLab CI/CD基础系列下期 —— 极狐GitLab的高阶用法，如分布式缓存、安全扫描 @11月16日</span></div>
                <div
                    data-zone-id="0"
                    data-line-index="9"
                    style=""
                ></div>
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
                        data-desc=""
                    >
                        <img
                            src="https://cdn.huodongxing.com/logo/guest/201611/1435/8282503607756/894540756280846.jpg"
                            alt="嘉宾头像"
                        >

                        <div class="guest_list_itemMessage">
                            <p class="guest_name">
                                唐恩
                            </p>
                            <p class="guest_name2">
                                极狐专业服务交付工程师
                            </p>
                            <p class="guest_name_company">

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
                    <span class="icon-favorites-before"></span><span>收藏</span><span class="num">41</span>
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
export default class ActivityThere extends Vue {
    gotoComment() {
        const height = (document.querySelector('.box-content') as any).scrollHeight + 66;
        document.body.scrollTop = height || 0;
        document.documentElement.scrollTop = height || 0;
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/activity/activityOne.scss';
</style>
