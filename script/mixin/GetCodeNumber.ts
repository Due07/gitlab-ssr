import { Form } from 'element-ui';
import { Vue, Component } from 'vue-property-decorator';
import { isValidPhoneNumber } from 'libphonenumber-js';
@Component
export default class extends Vue {
    [x: string]: any;

    private getCode = {
        name: '获取验证码',
        disabled: false,
        loading: false,
    }

    // 获取国家区号
    async getCountryCodeList() {
        let data = this.$store.state.countryCode.countryCode;
        if (!data.length) {
            await this.$store.dispatch('countryCode/getCountryCode');
            data = this.$store.state.countryCode.countryCode;
        }
        return data;
    }

    /**
     * 
     * @param refs 为表单的ref
     * @param form 表单的form
     * @param type 类型: 1.注册 2:登录 3:重置 ——> 在第三方下,1: GITLAB 2: GITHUB 3: GITEE
     * @param hidePassWord 是否隐藏密码 -> 第三方绑定手机使用
     * @returns 
     */
    onGetCodeBtn(
        refs: string,
        form: string,
        type = 1,
        hidePassWord = "",
    ) {
        const forms = {
            ...this[form],
            type,
        }

        const test = /^1[3456789]\d{9}$/;
        (this.$refs[refs] as Form).validateField('phone');
        // 国际手机号验证
        const validPhoneNumber = isValidPhoneNumber(`+${forms.countryCode}${forms?.phone}`);
        // 中国手机号验证
        const chinaValidPhone = forms.countryCode === '86' ? test.test(forms?.phone) : true;
        if (!validPhoneNumber || !chinaValidPhone || this.getCode.disabled) return;

        this.getCode.loading = true;
        // 发送验证码
        const request = hidePassWord ? '/user/send-oauth2-sms' : '/user/send-sms';

        this.$Http.post(request, forms).then((res: any) => {
            if (hidePassWord) this[hidePassWord] = res;
            this.countDown();
        }).catch(() => this.getCode.loading = false);

    }

    //倒计时 60s
    countDown() {
        let time = 60;
        let timer = setInterval((() => {
            if (time < 1) {
                this.getCode = {
                    name: '重新获取验证码',
                    disabled: false,
                    loading: false,
                };
                clearInterval(timer);
            } else {
                this.getCode = {
                    name: `${time}s后重新获取`,
                    disabled: true,
                    loading: false,
                };
            }
            time--;
        }), 1000);
    }
}