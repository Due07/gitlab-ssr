<template>
    <div class="email-popup fixed top-0 left-0" @click.prevent="closeBtn">
        <div class="email-content" @click.stop="">
            <i class="close el-icon-circle-close cursor-pointer" @click="closeBtn"/>
            <p class="email-title text-center">邮箱绑定</p>
            <el-form
                ref="emailForm"
                :model="emailForm"
                :rules="rules"
            >
                <el-form-item
                    prop="email"
                >
                    <el-input
                        v-model="emailForm.email"
                        placeholder="请输入邮箱地址"
                    ></el-input>
                </el-form-item>
                
                <el-form-item
                    prop="code"
                    class="email-code"
                >
                    <el-input
                        v-model="emailForm.code"
                        placeholder="请输入验证码"
                    ></el-input>

                    <el-button
                        class="code-btn"
                        :disabled="getCode.disabled"
                        :loading="codeLoading"
                        @click="getCodeNumber"
                    >
                        {{ getCode.name }}
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="submit text-center">
                <el-button
                    class="submit-button cursor-pointer"
                    :loading="submitLoading"
                    @click="submitBtn"
                >
                    保 存
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Form } from 'element-ui';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class UserInfoPopupPage extends Vue {
    @Prop() form: Record<string, any> | undefined;

    @Prop({ default: false }) emailType?: boolean;

    private getCode = {
        name: '获取验证码',
        disabled: false,
    }

    private emailForm: any = {}

    private submitLoading = false;

    private codeLoading = false;

    get rules() {
        return {
            email: [{
                required: true,
                message: '邮箱不能为空',
                trigger: 'blur',
            },{
                required: true,
                validator: (
                    rule: any,
                    value: string,
                    callback: Function
                ) => this.$emit('validEmail', rule, value, callback),
                trigger: 'blur',
            }],
            code: [{
                required: true,
                message: '验证码不能为空',
                trigger: 'blur',
            }]
        }
    }

    // @Watch('form')
    // onFormChange(nVal: Record<string, any>) {
    //     if (nVal) {
    //         this.emailForm = {...nVal};
    //     }
    // }

    @Watch('emailType')
    onEmailTypeChange(nVal: boolean) {
        if (!nVal) {
            // 关闭就重置表单
            (this.$refs.emailForm as Form).resetFields();
        } else {
            this.emailForm = {...this.form};
        }
    }

    closeBtn() {
        if (this.submitLoading) return;

        this.$emit('update:emailType', false);
    }

    // 提交绑定
    submitBtn() {
        (this.$refs.emailForm as Form).validate((bool: boolean) => {
            if (bool) {
                this.submitLoading = true;
                const form = {
                    code: this.emailForm?.code,
                    email: this.emailForm?.email,
                };
                this.$Http.post('/user/bind-email', form).then(() => {
                    this.$emit('setForm', {
                        ...this.form,
                        email: this.emailForm.email,
                        
                    });
                    this.submitLoading = false;
                    this.$message.success('绑定成功!');
                    this.closeBtn();
                }).finally(() => this.submitLoading = false);
            }
        })
    }

    getCodeNumber() {
        (this.$refs.emailForm as Form).validateField('email');
        const test = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/;
        if (
            !test.test(this.emailForm?.email)
            || this.getCode.disabled
            || this.codeLoading
        ) return;
        this.codeLoading = true;
        // 发送验证码
        this.$Http.post('/user/send-email', {
            email: this.emailForm?.email,
            type: 1,
        }).then(() => {
            this.countDown();
        }).catch(() => this.codeLoading = false);
    }

    countDown() {
        let time = 60;
        let timer = setInterval(() => {
            time--;

            if (this.codeLoading) this.codeLoading = false;

            if (time < 1 || !this.emailType) {
                this.getCode = {
                    name: !this.emailType ? '获取验证码' :'重新获取验证码',
                    disabled: false,
                };
                clearInterval(timer);
            } else {
                this.getCode = {
                    name: `${time}s后重新获取`,
                    disabled: true,
                };
            }
        }, 1000);
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>