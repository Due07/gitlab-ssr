import Vue from 'vue';
import { Message } from 'element-ui';

// import VueAwesomeSwiper from 'vue-awesome-swiper';
import Http from './Http';
// // 解决swiper6版本在vue下 没有引用autoplay
// // 如果降为swiper5 下build出现swiper.css 模块出错
// import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

const $Http = {
    install(vue: any) {
        vue.prototype.$Http = (new Http() as any);;
    }
}
// Swiper.use([Navigation, Pagination, Autoplay]);

// 声明Vue下全局方法类型
declare module 'vue/types/vue' {
    interface Vue {
        $Http: any,
        $elementLoading: Record<string, any>,
    }
}
export default function (context: any, inject: any) {
    const api = (new Http() as any);
    context.app.$Http = api;
    // Vue.use(VueAwesomeSwiper);
    Vue.use($Http as any);
    Vue.prototype.$message = Message;
    inject('Http', api);
}
