<template>
    <div class="page-activity-release">
        <div class="module-content container">
            <div class="box-title flex justify-around">发布活动</div>

            <div class="box-input">
                <p class="require">标题</p>
                <el-input v-model="dataForm.aa"></el-input>
            </div>

            <div class="box-input">
                <p class="require">封面图</p>
                （建议16:9最佳）
                <FileUpload v-model="dataForm.bb">
                    <img
                        v-if="dataForm.bb"
                        :src="dataForm.bb"
                        alt="img"
                    />

                    <div
                        v-else
                        class="empty-img flex flex-col justify-center items-center"
                    >
                        <img
                            class="add"
                            src="~/assets/image/activity/add-img.png"
                            alt="add"
                        >
                        上传图片
                    </div>
                </FileUpload>
            </div>

            <div class="box-input">
                <p class="require">活动日期</p>
                <div>
                    <el-date-picker
                        v-model="dataForm.cc"
                        type="date"
                    />
                </div>
            </div>

            <div class="box-input">
                <p class="require">开始时间</p>
                <div>
                    <el-time-picker
                        v-model="dataForm.dd"
                        placeholder="开始时间"
                    />
                </div>
            </div>

            <div class="box-input">
                <p class="require">结束时间</p>
                <div>
                    <el-time-picker
                        v-model="dataForm.ee"
                        placeholder="结束时间"
                    />
                </div>
            </div>

            <div class="box-input">
                <p class="require">活动地点</p>
                <el-input v-model="dataForm.ff"></el-input>
            </div>

            <div class="box-input">
                <p class="require">活动外链</p>
                <el-input v-model="dataForm.gg"></el-input>
            </div>

            <div class="box-input">
                <p>活动介绍</p>
                <el-input
                    v-model="dataForm.hh"
                    type="textarea"
                    rows="5"
                ></el-input>
            </div>

            <div
                class="btn-release flex justify-around items-center"
                @click="release()"
            >发 布</div>
        </div>

        <Footer />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Input, DatePicker, TimePicker } from 'element-ui';
import FileUpload from '@/components/widget/FileUpload.vue';
import Footer from '@/components/Footer.vue';

@Component({
    components: {
        ElInput: Input,
        ElDatePicker: DatePicker,
        ElTimePicker: TimePicker,
        FileUpload,
        Footer,
    },
})
export default class ActivityReleasePage extends Vue {
    isPC = false;

    dataForm: any = {};

    mounted() {
        this.isPC = document.body.clientWidth > 768;

        this.dataForm = {
            aa: '',
            bb: '',
            cc: '',
            dd: '',
            ee: '',
            ff: '',
            gg: '',
            hh: '',
        };
    }

    release() {
        return this.$message.warning('该功能尚未开放，敬请期待！');
    }
}
</script>

<style lang="scss">
@import './index.scss';
</style>
