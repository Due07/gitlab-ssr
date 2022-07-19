<template>
    <div @click="click" class="file-upload">
        <slot></slot>
        <input
            type="file"
            ref="file"
            @change="onChange"
            :accept="accept || input.accept"
            :disabled="input.disabled"
            :multiple="input.multiple"
        />
        <div class="progress" v-if="upload_progress !== null">
            <div>{{ upload_progress }}%</div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import FileUpload from '@/script/widget/FileUpload';

@Component
export default class FileUploadComponent extends Vue {
    // props start
    @Prop() private value: any;

    @Prop() private crop: any;

    @Prop() private disabled: boolean | undefined;

    @Prop() private multiple: boolean | undefined;

    @Prop() private accept: string | undefined;

    // data start
    input: any = {
        accept: 'image/*',
        disabled: false,
        multiple: false,
    }

    upload_progress: any = null

    // mounted start
    mounted() {

        // 修复Android端调起选项无相机
        if (/Android/i.test(window.navigator.userAgent)) {
            (this.$refs.file as HTMLElement).setAttribute('capture', 'camera');
        }
    }

    // created start
    created() {}

    // watch start
    @Watch('accept', { immediate: true })

    onAcceptChanged(val: any) {
        this.input.accept = val || 'image/*';
    }

    @Watch('disabled', { immediate: true })

    onDisabledChanged(val: any) {
        this.input.disabled = val || false;
    }

    @Watch('multiple', { immediate: true })

    onMultipleChanged(val: any) {
        this.input.multiple = val || false;
    }

    // function start
    click() {
        if (this.upload_progress || this.disabled) return;
        (this.$refs.file as HTMLElement).click();
    }

    async onChange(event: any) {
        this.input.disabled = true;

        // 文件超过300m return
        if ((event.target.files[0].size / 1024 / 1024) > 16) {
            this.$message.error('图片过大');
        } else {
            this.$emit('fileChange', event.target.files);
            console.log(event.target.files);

            // 实现本地预览 FileReader-> 获取文件状态
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    // result 为base64
                    this.$emit('input', e.target.result);
                }
            }
            // 图片文件后, 即使预览图片 base64
            reader.readAsDataURL(event.target.files[0]);

            // const res: any = await (new FileUpload())
            //     .onUploadProgress((e: { loaded: number; total: number }) => {
            //         this.upload_progress = (e.loaded / e.total).toFixed(2);
            //         this.upload_progress = parseInt(`${this.upload_progress * 100}`, 10);
            //     })
            //     // 压缩
            //     // .imgOptions(this.options)
            //     .uploadStart(event.target.files);
            // for (const file of res) {
            //     this.$emit('input', file.url);
            //     this.$emit('type', file.type);
            // }
        }
        event.target.value = '';
        this.input.disabled = false;
        this.upload_progress = null;
    }
}
</script>

<style lang="scss" scoped>
.file-upload {
    // display: inline-block;
    display: block;
    cursor: pointer;
    position: relative;

    > input {
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        padding: 0;
        margin: 0;
        z-index: -1;
        display: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    > .progress {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.8);
        color: #000;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
}
</style>
