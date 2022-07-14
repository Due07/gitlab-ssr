<template>
    <div>
        <LoginHeader/>
        <div class="login overflow-hidden">
            <h3 class="text-center font-semibold login-title">账号登录</h3>
            <el-form
                ref="loginForm"
                class="login-form-form"
                :model="form"
                :rules="rules"
            >
                <el-form-item class="code-item" prop="phone" :error="errorMessage.phone">
                    <el-select
                        class="country-code"
                        v-model="form.countryCode">
                        <el-option
                            v-for="item in countryCodeList"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                        class="phone-number"
                        v-model.trim="form.phone"
                        placeholder="请输入手机号码或邮箱"
                    ></el-input>
                </el-form-item>
                <el-form-item  prop="password" :error="errorMessage.password">
                    <el-input
                        class="password-input"
                        :type="isShowPassWord ? 'text' : 'password'"
                        v-model.trim="form.password"
                        placeholder="请输入密码"
                    >
                        <i
                            v-show="form.password"
                            slot="suffix"
                            class="el-input__icon el-icon-view"
                            :class="{ 'hide': !this.isShowPassWord }"
                            @click.stop="isShowPassWord = !isShowPassWord"
                        ></i>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="login-select flex justify-between">
                <span
                    class="register cursor-pointer"
                    @click="$router.push({name: 'login-register'})"
                >注册账号</span>
                <span
                    class="reset cursor-pointer"
                    @click="$router.push({name: 'login-reset'})"
                >忘记密码</span>
            </div>

            <div class="submit-btn">
                <el-button
                    class="line-flex align-center justify-center"
                    @click="onSubmit"
                    :loading="submitLoading"
                >
                    登 录
                </el-button>
            </div>

            <div class="login-other-mode">
                <div class="other-mode-title text-center">其他登录方式</div>

                <div class="other-mode-content flex justify-evenly">
                    <img
                        class="cursor-pointer"
                        src="~/assets/image/login/gitlab.png"
                        alt="gitlab"
                        @click="onOpen('gitlab')"
                    />
                    <img
                        class="cursor-pointer"
                        src="~/assets/image/login/github.png"
                        alt="github"
                        @click="onOpen('github')"
                    />
                    <img
                        class="cursor-pointer"
                        src="~/assets/image/login/gitee.png"
                        alt="gitee"
                        @click="onOpen('gitee')"
                    />
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import { Form } from 'element-ui';
import { Vue, Component } from 'vue-property-decorator';
import HelpValidate from '@/script/mixin/HelpValidate';
import { isValidPhoneNumber } from 'libphonenumber-js';

@Component({
    mixins: [HelpValidate],

    // 动态设置title meta
    head() {
        return {
            title: '',
        }
    },

    // 中间件
    middleware(ctx) {
        // console.log(ctx);
    },

    // 校验 如：身份校验入口
    validate({params, query, store}) {
        return true;
    },

    // 请求 通常跟store差不多，不过不能更改本实例下的数据 如：下面👇的form
    fetch() {
        // 这里可以用this， 因为它创建在beforeCreated  和 Created之间
    },

    // 执行在vue实例化之前，存在于服务端内 可修改实例下的数据 如：下面👇的form
    asyncData({ query }) {
        //这里用不了this， 但是他有vue实例的上下文
        console.log('asyncData', query);
    },
})
export default class loginIndex extends Vue {
    private form = {
        countryCode: '86',
        password: '',
        phone: '',
    };

    private submitLoading = false

    private errorMessage: Record<string, string> = {}

    private countryCodeList = []

    private isShowPassWord = false

    get rules() {
        return {
            phone: [{
                required: true,
                message: '手机号码或邮箱不能为空',
                trigger: 'blur',
            },{
                required: true,
                validator: this.validPhone,
                trigger: 'blur',
            }],
            password: [
                {
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur',
                },
                // {
                //     required: true,
                //     validator: (this as any).validPassWord,
                //     trigger: 'blur',
                // },
            ]
        }
    }

    async mounted() {
        const data = this.$store.state.countryCode.countryCode;
        if (!data?.length) {
            await this.$store.dispatch('countryCode/getCountryCode');
        }
        this.countryCodeList = this.$store.state.countryCode.countryCode;
    }

    // 校验邮箱 or 手机号
    validPhone(rule: any, value: string, callback: Function) {
        // 邮箱
        if (value.includes('@')) {
            const test = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/;
            if (!test.test(value)) {
                return callback(new Error('邮箱格式有误，请重新输入邮箱'));
            }
        } else {
            //手机号
            const test = /^1[3456789]\d{9}$/;
            // 国际手机号验证
            const validPhoneNumber = isValidPhoneNumber(`+${this.form.countryCode}${value}`);
            // 中国手机号验证
            const chinaValidPhone = this.form.countryCode === '86' ? test.test(value) : true;

            if (!validPhoneNumber || !chinaValidPhone) {
                return callback(new Error('手机号码格式错误，请重新输入'));
            }
        }
        callback();
    }

    onSubmit() {
        (this.$refs.loginForm as Form).validate(
            (bool: boolean, obj: Record<string, any>) => {
                if (bool) {
                    this.errorMessage = {};
                    this.submitLoading = true;
                    const form: Record<string, any> = {
                        ...this.form,
                        // 1. 验证码 2. 密码
                        type: 2,
                    }

                    // 是否邮箱
                    if (form.phone.includes('@')) {
                        form.email = form.phone;
                        delete form.phone;
                    }
                    // /auth/sms-login 电话  /auth/email-login 邮箱
                    this.$Http.post(
                        `/auth/${form.email ? 'email-login': 'sms-login'}`,
                        form,
                    )
                        .then((res: Record<string, any>) => {
                            console.log(res);
                            // 共享 token / user
                            this.$store.dispatch('getUser', res);
                            this.$store.dispatch('getToken', res.token ?? '');
                            this.$router.push({ name: 'home' });
                        })
                        .catch((res: any) => {
                            const code = {
                                2001: 'phone',
                                2003: 'password',
                            }
                            this.errorMessage[code[res.code]] = res.message;
                        })
                        .finally(() => this.submitLoading = false);
                }
            },
        );

        // validateField 对部分字段进行校验
    }


    // 跳转第三方
    onOpen(val: string) {
        const loading = this.$elementLoading.service({
            body: true,
        });
        const link = {
            'github': '/auth/github-login',
            'gitlab': '/auth/jihu-login',
            'gitee': '/auth/gitee-login',
        };

        this.$Http.get(link[val]).then((url: string) => window.location.href = url)
            .finally(() => loading.close());
    }
}
</script>

<style lang="scss">
@import './index.scss';
@import '~/assets/styles/login/index.scss';
</style>