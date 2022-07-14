<template>
    <div>
        <LoginHeader/>
        <div class="login-form binding overflow-hidden">
            <h3 class="text-center font-semibold login-form-title">绑定手机号</h3>
            <el-form
                ref="bindingForm"
                class="login-form-form"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="phone">
                    <el-input v-model.trim="form.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item
                    class="code-item"
                    prop="code"
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
                        @click="onGetCodeBtn('bindingForm', 'form', form.type, 'hidePassword')"
                    >
                        {{ getCode.name }}
                    </el-button>
                </el-form-item>

                <el-form-item prop="password" v-show="!hidePassword">
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
                <span class="password-tips" v-show="!hidePassword">
                    密码由 6-16 位数字、字母或符号组成，至少包含两种字符
                </span>
            </el-form>

            <div class="submit-btn">
                <el-button
                    class="line-flex align-center justify-center"
                    @click="onSubmit"
                    :loading="submitLoading"
                >
                    保 存
                </el-button>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import { Form } from 'element-ui';
import { Vue, Component } from 'vue-property-decorator';
import Mixins from '@/script/mixin/GetCodeNumber';
import HelpValidate from '@/script/mixin/HelpValidate';

@Component({
    mixins: [Mixins, HelpValidate],
})
export default class bindingIndex extends Vue {
    private form: Record<string, string> = {
      phone: '',
      code: '',
      countryCode: '86',
      type: '',
      token: '',
    };

    private countryCodeList = [];

    private submitLoading = false

    private isShowPassWord = false

    private hidePassword = true

    get rules() {
        const password = !this.hidePassword
            ? [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur',
                },
                {
                    required: true,
                    validator: (this as any).validPassWord,
                    trigger: 'blur',
                },]
            : [];
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
            code: [
                {
                    required: true,
                    message: '验证码不能为空',
                    trigger: 'blur',
                },
            ],
            password,
        }
    }

    async mounted() {

        this.form.type = this.$route.query?.type as string ?? '';
        this.form.token = this.$route.query?.token as string ?? '';

        if (!this.form.type || !this.form.token) {
            this.$message.error('参数错误, 请重新进入~');
            setTimeout(() => this.$router.replace({ name: 'home' }), 1200);
            return;
        }

        this.countryCodeList = await (this as any).getCountryCodeList();
    }

    onSubmit() {
        (this.$refs.bindingForm as Form).validate(
            (bool: boolean, obj: Record<string, any>) => {
                if (bool) {
                    this.submitLoading = true;
                    this.$Http.post('/auth/aouth2-login', this.form)
                        .then((res: any) => {
                            console.log(res);
                            // 用户信息
                            this.$store.dispatch('getUser', res);
                            this.$store.dispatch('getToken', res?.token ?? '');

                            this.$router.replace({ name: 'home' });
                        })
                        .finally(() => this.submitLoading = false);
                }
            },
        );

        // validateField 对部分字段进行校验
    }
}
</script>
<style lang="scss">
@import '~/assets/styles/login/form.scss';
@import '~/assets/styles/login/index.scss';

.binding {
    .submit-btn {
        margin-top: 55px;

        @media screen and (max-width: 768px) {
        
        }
    }
}
</style>