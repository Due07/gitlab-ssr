<template>
    <div>
        <LoginHeader/>
        <div v-if="isRegister" class="login-form register overflow-hidden">
            <h3 class="text-center font-semibold register-title">账号注册</h3>
            <el-form
                ref="registerForm"
                class="login-form-form"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="phone" :error="errorMessage.phone">
                    <el-input v-model.trim="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item
                    class="code-item"
                    prop="code"
                    :error="errorMessage.code"
                >
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
                        class="code"
                        v-model.trim="form.code" placeholder="请输入验证码"
                    ></el-input>
                    <el-button
                        class="code-btn flex align-center justify-center"
                        :class="{'active': getCode.disabled}"
                        :loading="getCode.loading"
                        :disabled="getCode.disabled"
                        @click="onGetCodeBtn('registerForm', 'form')"
                    >
                        {{ getCode.name }}
                    </el-button>
                </el-form-item>

                <el-form-item prop="password" :error="errorMessage.password">
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
                <span class="password-tips">
                    密码由 6-16 位数字、字母或符号组成，至少包含两种字符
                </span>

                <el-form-item class="agreement" prop="checkboxType">
                    <el-checkbox v-model="form.checkboxType">
                        已阅读并同意
                        <span class="tips cursor-pointer" @click.prevent="onJump('agreement')">《账号使用协议》</span>
                        和
                        <span class="tips cursor-pointer" @click.prevent="onJump('privacy')">《隐私政策》</span>
                    </el-checkbox>
                </el-form-item>
            </el-form>

            <div class="submit-btn">
                <el-button
                    class="line-flex align-center justify-center"
                    :loading="submitLoading"
                    @click="onSubmit"
                >
                    注 册
                </el-button>
            </div>
        </div>
        <UserInformation v-else />
        <Footer/>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import UserInformation from './components/UserInformation.vue';

import Mixins from '@/script/mixin/GetCodeNumber';
import HelpValidate from '@/script/mixin/HelpValidate';

@Component({
    components: {
        UserInformation,
    },
    mixins: [Mixins, HelpValidate],
})
export default class registerIndex extends Vue {
    private form = {
        phone: '',
        code: '',
        countryCode: '86',
        password: '',
        checkboxType: false,
    };

    private countryCodeList = []

    private submitLoading = false

    private isRegister = true

    private isShowPassWord = false

    private errorMessage: Record<string, string> = {}

    get rules() {
        return {
            phone: [{
                required: true,
                message: '手机号码不能为空',
                trigger: 'blur',
            },{
                required: true,
                validator: (
                    rule: any,
                    value: string,
                    callback: Function
                ) => (this as any).validPhone(rule, value, callback, this.form.countryCode),
                trigger: 'blur',
            }],
            password: [
                {
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur',
                },
                {
                    required: true,
                    validator: (this as any).validPassWord,
                    trigger: 'blur',
                },
            ],
            code: [
                {
                    required: true,
                    message: '验证码不能为空',
                    trigger: 'blur',
                },
            ],
            checkboxType: {
                required: true,
                validator: (this as any).validCheckbox,
                message: '请阅读并勾选协议',
                trigger: ['blur', 'change'],
            },
        }
    }

    async mounted() {
        // 区号
        this.countryCodeList = await (this as any).getCountryCodeList();
    }

    onJump(val: string) {
        const link = val === 'agreement'
            ? 'https://gitlab.cn/terms/user-service-agreement/'
            : 'https://gitlab.cn/privacy/';
        window.open(link);
    }

    onSubmit() {
        // 完善信息
        this.isRegister = false;
        // (this.$refs.registerForm as Form).validate(
        //     (bool: boolean, obj: Record<string, any>) => {
        //         if (bool) {
        //             this.errorMessage = {};
        //             // 提交注册
        //             this.submitLoading = true;
        //             const form = {
        //                 ...this.form,
        //             };
        //             this.$Http.post('/user/sms-register', form)
        //                 .then((res: any) => {
        //                     // res.token
        //                     console.log(res);

        //                     // 共享
        //                     this.$store.dispatch('getUser', res ?? {});
        //                     this.$store.dispatch('getToken', res?.token ?? '');                            

        //                     // 完善信息
        //                     this.isRegister = false;
        //                 })
        //                 .catch((res: any) => {
        //                     //提交返回的错误信息
        //                     const code = {
        //                         2001: 'phone',
        //                         2002: 'code',
        //                     }
        //                     this.errorMessage[code[res.code]] = res.message;
        //                 })
        //                 .finally(() => this.submitLoading = false);
        //         }
        //     }
        // );
        
        // validateField 对部分字段进行校验
    }
}
</script>

<style lang="scss">
@import '~/assets/styles/login/form.scss';
@import '~/assets/styles/login/index.scss';
@import './index.scss';
</style>