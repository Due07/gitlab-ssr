<template>
    <div v-if="!userType" class="login-form overflow-hidden user-information">
        <h3 class="text-center font-semibold register-title">完善信息</h3>
        <el-form
            ref="userForm"
            label-position="top"
            label-width="80px"
            :model="user"
            :rules="rules"
        >
            <el-form-item class="picture-item text-center" prop="avatar">
                <FileUpload
                    v-model="user.avatar"
                >
                    <template v-if="user.avatar">
                        <img :src="user.avatar" alt="gitlab-user"/>
                    </template>
                    <template v-else>
                        <img src="~/assets/image/login/user-logo.png" alt="gitlab-user">
                    </template>
                </FileUpload>

                <TackPicture v-show="tackPic" :tackPic.sync="tackPic"></TackPicture>

                <span class="picture-tips block my-3">上传头像</span>
                <el-button size="small" plain :disabled="!user.avatar.length" @click="onTackPic">
                    识别人像
                </el-button>
                <span class="block mt-2" v-show="tackPic.message">识别结果: {{ tackPic.message }}</span>
            </el-form-item>

            <el-form-item label="昵称" class="required" prop="nickname">
                <el-input v-model.trim="user.nickname"></el-input>
            </el-form-item>
            <el-form-item label="地区" class="required" prop="provinceAndCity">
                <el-cascader
                    v-model="user.provinceAndCity"
                    :options="regionOptions"
                    :props="{ expandTrigger: 'hover' }"
                    @change="handleChange"
                    clearable
                >
                </el-cascader>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
                <el-date-picker
                    v-model="user.birthday"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    picker-options="{}"
                    clearable
                    editable
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="公司" prop="company">
                <el-input v-model.trim="user.company"></el-input>
            </el-form-item>
            <el-form-item label="职位" prop="position">
                <el-input v-model.trim="user.position"></el-input>
            </el-form-item>
            <el-form-item label="个人签名" class="required" prop="sign">
                <el-input
                    type="textarea"
                    maxlength="50"
                    show-word-limit
                    :autosize="{'minRows': 3, 'maxRows': 6}"
                    v-model="user.sign">
                </el-input>
            </el-form-item>
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
    <div v-else class="success mx-auto text-center overflow-hidden">
        <img class="success_img mx-auto" src="~/assets/image/login/success.png" alt="gitlab-success">
        
        <p class="success_tips">注册成功</p>

        <div class="success_btn flex justify-evenly">
            <button class="back_btn" @click="onBtn('home')">返回首页</button>
            <button class="login_btn" @click="onBtn('login')">立即登录</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import FileUpload from '@/components/widget/FileUpload.vue';
import { Form } from 'element-ui';
import TackPicture from './TackPicture.vue';

@Component({
    components: {
        FileUpload,
        TackPicture,
    }
})
export default class UserInformation extends Vue {
    user = {
        avatar: '',
        nickname: '',
        birthday: '',
        company: '',
        position: '',
        required: '',
        provinceAndCity: [],
    }

    tackPic = {
        type: false,
        message: '',
        url: '',
    };

    private regionOptions:Record<string, any> = [];

    private submitLoading = false;

    private userType = false

    get rules() {
        return {
            avatar: {
                required: false,
                message: '请上传头像',
                trigger: 'blur',
            },
            nickname: {
                required: true,
                message: '请填写昵称',
                trigger: 'blur',
            },
            provinceAndCity: {
                required: true,
                message: '请选择地区',
                trigger: 'blur',
            },
            sign: {
                required: true,
                message: '请填写个人签名',
                trigger: 'blur',
            },
        }
    }

    @Watch('userType')
    onUserTypeChange(nVal: boolean) {
        // 卸载页面监听关闭/刷新
        if (nVal) {
            window.onbeforeunload = () => {};
        }
    }

    async mounted() {
        // 市区
        await this.$store.dispatch('districtCode/getDistrictCode');
        const { districtCode } = this.$store.state.districtCode;
        this.regionOptions = districtCode;

        // 监听关闭/刷新 删除token/user
        window.onbeforeunload = (e: any) => {
            const event = window.event || e;
            // sessionStorage.removeItem('token');
            // sessionStorage.removeItem('user');
            event.returnValue = ('注册还未成功, 请勿离开页面');
        };
    }

    handleChange() {
        
    }

    onSubmit() {
        (this.$refs.userForm as Form).validate((bool: boolean) => {
            if (bool) {
                // const [provinceId, cityId, areaId] = this.user.region;
                // 年year 月month 日day
                const [year, month, day] = this.user?.birthday?.split('-') ?? Array(3).fill(null);
                const user = {
                    ...this.user,
                    // birthday: +new Date(this.user.birthday),
                    year,
                    month,
                    day,
                }
                this.submitLoading = true;
                this.$Http.post('/user', user)
                    .then((res: any) => {
                        this.$store.dispatch('getUser', res);
                        this.userType = true;
                    })
                    .finally(() => this.submitLoading = false);
            }
        });
    }

    // 跳转
    onBtn(val: string) {
        window.onbeforeunload = () => {};
        if (val) {
            this.$router.replace({
                name: val,
            })
        }
    }

    onTackPic() {
        this.tackPic = {
            type: true,
            url: this.user.avatar,
            message: '',
        }
    }

    beforeDestroy() {
        // console.log(1);
    }
}
</script>
<style lang="scss">
.login-form.user-information {
    min-height: 1280px;

    @media screen and (max-width: 768px) {
    
    }
    .el-date-editor,
    .el-cascader {
        width: 100%;
    }

    .picture-item {
        position: relative;
        img {
            border-radius: 50%;
            width: 84px;
            height: 84px;
            margin: auto;

            @media screen and (max-width: 768px) {
            
            }
        }
        .picture-tips {
            font-size: 10px;
            line-height: 14px;
            color: #D7D7D7;


            @media screen and (max-width: 768px) {
            
            }
        }
        input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            left: 0;
            right: 0;
            top: 0;
        }

        &.is-error {
            .el-form-item__error {
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .el-textarea {
        .el-textarea__inner {
            resize: none;
        }
    }

    .required {
        .el-form-item__label {
            position: relative;

            &::before {
                content: '*';
                position: absolute;
                color: #F63401;
                font-size: 14px;
                line-height: 20px;
                right: -10px;
                top: 50%;
                transform: translateY(-80%);

                @media screen and (max-width: 768px) {
                
                }
            }
        }
        
    }

    .submit-btn {
        margin-top: 33px;

        @media screen and (max-width: 768px) {
        
        }
    }
}

.success {
    min-height: 563px;
    width: 400px;

    @media screen and (max-width: 768px) {
    
    }

    &_img {
        margin-top: 108px;
        width: 88px;
        height: 88px;

        @media screen and (max-width: 768px) {
        
        }
    }

    &_tips {
        color: #252525;
        font-size: 26px;
        line-height: 37px;
        margin: 17px auto 54px;

        @media screen and (max-width: 768px) {
        
        }
    }

    &_btn {
        button {
            width: 120px;
            height: 42px;
            background: #fca326;
            border-radius: 21px;
            font-size: 16px;
            line-height: 22px;
            font-weight: 600;
            border: 0;

            @media screen and (max-width: 768px) {
            
            }
        }
        .back_btn {
            color: #808080;
            background: #EDEFF2;
        }

        .login_btn {
            color: #171321;
        }
    }
}
</style>