<template>
    <div>
        <LoginHeader/>
        <div class="reset login-form overflow-hidden">
            <h3 class="text-center font-semibold reset-title">重置密码</h3>
            <el-form
                ref="resetForm"
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
                        @click="onGetCodeBtn('resetForm', 'form', 3)"
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
export default class resetIndex extends Vue {
    private form = {
        phone: '',
        code: '',
        countryCode: '86',
        password: '',
    };

    private countryCodeList = []

    private submitLoading = false

    private isShowPassWord = false

    private errorMessage = {}

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
        }
    }

    async mounted() {
        this.countryCodeList = await (this as any).getCountryCodeList();
    }

    onSubmit() {
        (this.$refs.resetForm as Form).validate(
            (bool: boolean, obj: Record<string, any>) => {
                if (bool) {
                    this.errorMessage = {};
                    this.submitLoading = true;
                    this.$Http.post('/auth/reset-password', this.form)
                        .then(() => {
                            this.$message.success('重置成功～');
                            this.$router.push({ name: 'login' });
                        })
                        .catch((error: any) => {
                            const code = {
                                2002: 'code',
                                2001: 'phone',
                                2003: '2003',
                            };
                            this.errorMessage[code[error.code]] = error.message;
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
// @import './index.scss';
@import '~/assets/styles/login/form.scss';
@import '~/assets/styles/login/index.scss';
</style>