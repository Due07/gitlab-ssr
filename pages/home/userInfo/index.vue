<template>
    <div class="page-user-info">
        <Breadcrumb :data="breadcrumbList" />

        <div class="container user-info-content flex justify-between items-start">
            <div class="left">
                <div class="box-avatar flex flex-col items-center">
                    <img
                        v-if="userForm.avatar"
                        :src="userForm.avatar"
                        alt="avatar"
                    >
                    <img
                        v-else
                        src="~/assets/image/empty-user-avatar.png"
                        alt="avatar"
                    >
                    {{ userForm.email || userForm.nickname }}
                </div>

                <div
                    :class="isModule === 1 ? 'active' : ''"
                    class="item flex justify-around items-center"
                    @click="changeModule(1)"
                >
                    个人信息
                    <img
                        v-if="isModule === 1"
                        src="~/assets/image/home/more.png"
                        alt="more"
                    >
                </div>

                <div
                    :class="isModule === 2 ? 'active' : ''"
                    class="item flex justify-around items-center"
                    @click="changeModule(2)"
                >
                    账号绑定
                    <img
                        v-if="isModule === 2"
                        src="~/assets/image/home/more.png"
                        alt="more"
                    >
                </div>
            </div>

            <div
                v-if="isModule === 1"
                class="right flex flex-col items-center"
            >
                <div class="input-item user-avatar flex items-center">
                    <div class="label">头像</div>

                    <FileUpload v-model="form.avatar">
                        <img
                            v-if="form.avatar"
                            :src="form.avatar"
                            alt="avatar"
                        />
                        <img
                            v-else
                            src="~/assets/image/user-icon.png"
                            alt="avatar"
                        >
                    </FileUpload>
                </div>

                <div class="input-item flex items-center">
                    <div class="label">昵称</div>
                    <el-input
                        class="flex-1"
                        v-model.trim="form.nickname"
                    ></el-input>
                </div>

                <div class="input-item flex items-center">
                    <div class="label">地区</div>
                    <el-cascader
                        class="flex-1"
                        v-model="form.provinceAndCity"
                        :options="regionOptions"
                        :props="{ expandTrigger: 'click' }"
                        clearable
                    >
                    </el-cascader>
                </div>

                <div class="input-item flex items-center">
                    <div class="label">生日</div>
                    <el-date-picker
                        class="flex-1"
                        v-model="form.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                    ></el-date-picker>
                </div>

                <div class="input-item flex items-center">
                    <div class="label">公司</div>
                    <el-input
                        class="flex-1"
                        v-model.trim="form.company"
                    ></el-input>
                </div>

                <div class="input-item flex items-center">
                    <div class="label">职位</div>
                    <el-input
                        class="flex-1"
                        v-model.trim="form.position"
                    ></el-input>
                </div>

                <div class="input-item flex items-center">
                    <div class="label">个人签名</div>
                    <el-input
                        class="flex-1"
                        v-model.trim="form.sign"
                        type="textarea"
                        rows="4"
                        maxlength="50"
                        show-word-limit
                    ></el-input>
                </div>

                <el-button
                    class="btn-save flex justify-around items-center"
                    :loading="saveLoading"
                    @click="handleSave"
                >保 存</el-button>
            </div>

            <el-form
                ref="userEmailForm"
                :model="form"
                v-else
                class="right flex flex-col items-center"
                label-position="left"
                @submit.native.prevent
                :rules="rules"
            >
                <el-form-item
                    prop="email"
                    class="input-item flex items-center"
                    label="邮箱"
                >
                    <el-input
                        class="flex-1"
                        v-model="form.email"
                        :disabled="Boolean(userForm.email)"
                        placeholder="请输入未被绑定的邮箱"
                    ></el-input>
                </el-form-item>

                <el-button
                    v-show="!userForm.email"
                    class="btn-save flex justify-around items-center"
                    :loading="saveLoading"
                    @click="handleSave"
                >立即绑定</el-button>
            </el-form>
        </div>

        <Popup
            v-show="emailType"
            :form.sync="form"
            :emailType.sync="emailType"
            @setForm="onSetForm"
            @validEmail="this.validEmail"
        />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Input, DatePicker, Form } from 'element-ui';
import FileUpload from '@/components/widget/FileUpload.vue';
import HelpValidate from '@/script/mixin/HelpValidate';
import Popup from './components/Popup/index.vue';

@Component({
    components: {
        ElInput: Input,
        ElDatePicker: DatePicker,
        FileUpload,
        Popup,
    },
    mixins: [HelpValidate],
})
export default class UserInfoPage extends Vue {
    private regionOptions: Record<string, any>[] = []

    private saveLoading = false

    isPC = false;

    breadcrumbList = [
        {
            name: '首页',
            route: 'home',
            params: {},
            query: {},
        },
        {
            name: '个人中心',
            route: 'home-userInfo',
            params: {},
            query: {},
        },
    ];

    userForm: any = {};

    form: any = {};

    isModule = 1;

    emailType = false;

    get rules () {
        return {
            email: [{
                required: true,
                message: '邮箱不能为空',
                trigger: 'blur',
            },{
                required: true,
                validator: (this as any).validEmail,
                trigger: 'blur',
            }],
        };
    }

    created() {}

    async mounted() {
        this.isPC = document.body.clientWidth > 768;

        await this.$store.dispatch('districtCode/getDistrictCode');
        const { districtCode } = this.$store.state.districtCode;
        this.regionOptions = districtCode;

        await this.$Http.get('/user')
            .then((res: any) => {
                // 生日的 年year 月month 日day
                res.birthday = res.year
                    ? `${res.year}-${res.month || '01'}-${res.day || '01'}`
                    : "";

                // 地区数组
                res.provinceAndCity = [res.provinceId, res.cityId];
                // 如果有区号
                if (res.areaId) {
                    res.provinceAndCity.push(res.areaId);
                }
                this.userForm = {...res};
                this.form = {...res};
                this.$store.dispatch('getUser', res);
                this.$store.dispatch('getToken', res.token);
            })
            .catch((error: any) => console.error(error));
    }

    // 绑定后的信息
    onSetForm(form: Record<string, string>) {
        this.form = this.userForm = form;
        this.$store.dispatch('getUser', form);
    }

    changeModule(isModule: number) {
        this.isModule = isModule;
    }

    handleSave() {
        this.saveLoading = true;
        // 保存信息
        if (this.isModule === 1) {
            // 年year 月month 日day
            const [year, month, day] = this.form?.birthday?.split('-') ?? Array(3).fill(null);
            const userForm = {
                ...this.form,
                year,
                month,
                day,
            }
            this.$Http.post('/user', userForm).then(() => {
                this.$message.success('保存成功');

                this.onSetForm(userForm);
            })
            .catch((error: any) => console.error(error))
            .finally(() => this.saveLoading = false);
        } else {
            // 绑定邮箱
            (this.$refs.userEmailForm as Form).validate((bool: boolean) => {
                if (bool) {
                    this.emailType = true;
                }
            })
            this.saveLoading = false;
        }
        console.log('handleSave');
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
