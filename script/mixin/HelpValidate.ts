import { Vue, Component } from 'vue-property-decorator';
import { isValidPhoneNumber } from 'libphonenumber-js';

@Component
export default class extends Vue {

    // 校验手机号
    validPhone(rule: any, value: string, callback: Function, code: string) {
        const test = /^1[3456789]\d{9}$/;

        // 国际手机号验证
        const validPhoneNumber = isValidPhoneNumber(`+${code}${value}`);
        // 中国手机号验证
        const chinaValidPhone = code === '86' ? test.test(value) : true;

        if (!validPhoneNumber || !chinaValidPhone) {
            return callback(new Error('手机号码格式错误，请重新输入'));
        }
        callback();
    }

    // 校验密码
    validPassWord(rule: any, value: string, callback: Function) {
        const test = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
        if (!test.test(value)) {
            return callback(new Error('密码格式不正确, 请重新输入'));
        }
        callback();
    }

    // 邮箱
    validEmail(rule: any, value: string, callback: Function) {
        const test = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/;
        if (!test.test(value)) {
            return callback(new Error('邮箱格式有误，请重新输入邮箱'));
        }
        callback();
    }

    // checkbox
    validCheckbox(rule: any, value: string, callback: Function) {
        if (!value) return callback(new Error('请勾选协议'));
        return callback();
    }
}