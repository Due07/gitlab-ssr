<template>
    
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as FaceApi from 'face-api.js';
@Component
export default class TackPicture extends Vue {

    thisCancas: any = ''

    thisContext: CanvasImageData | undefined

    thisVideo: any = ''

    videoSize: Record<'width'| 'height', number> = {
        width: 400,
        height: 600
    }

    async beforeCreate() {
        const loading = this.$elementLoading.service({
            text: '正在加载模型~',
        });
        try {
            // ssdMobilenetv1 tinyFaceDetector  mtcnn 三选一 人脸识别模型
            Promise.race([
                // 如果人脸识别放在本地目录的话，需要做服务端化～
                await FaceApi.nets.tinyFaceDetector.loadFromUri('/middleware/weights'),
                // await FaceApi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
                // 识别人脸
                await FaceApi.nets.faceRecognitionNet.loadFromUri('/middleware/weights'),
                // await FaceApi.nets.faceRecognitionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
                // 识别表情
                await FaceApi.nets.faceExpressionNet.loadFromUri('/middleware/weights'),
                // await FaceApi.nets.faceExpressionNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
                // 面部点位识别（68点）
                // await FaceApi.nets.faceLandmark68Net.load('/weights');
                // 识别脸部特征用于tiny算法
                await FaceApi.nets.faceLandmark68TinyNet.loadFromUri('/middleware/weights'),
                // await FaceApi.nets.faceLandmark68TinyNet.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
                //  识别身体轮廓的算法
                // await FaceApi.nets.tinyYolov2.loadFromUri('/weights');
                // await FaceApi.loadTinyYolov2Model('/weights');
            ]).finally(() => loading.close());
        } catch(error: any) {
            console.log(error);
            loading.close();
        }
    }

    mounted() {
        
    }

    // 调用摄像头权限
    getCompetence() {
        this.$nextTick(() => {
            this.thisCancas = this.$refs.canvasCamera;
            this.thisContext = this.thisCancas.getContext('2d');
            this.thisVideo = this.$refs.videoCamera;
            // 旧版本浏览器可能根本不支持mediaDevices
            if (!navigator.mediaDevices) {
                (navigator as any).menavigatordiaDevices = {};
            }
            // 是否可以有getUserMedia
            if (!navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia = (constraints) => {
                    // 首先获取现存的getUserMedia(如果存在)
                    const getUserMedia = (navigator as any).webkitGetUserMedia
                            || (navigator as any).mozGetUserMedia
                            || (navigator as any).getUserMedia;
                    // 有些浏览器不支持，会返回错误信息
                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }
                    // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                    return new Promise(((resolve, reject) => {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    }));
                };
            }

            const constraints = {
                audio: false,
                video: {
                    ...this.videoSize,
                    transform: 'scaleX(-1)'
                },
            };

            //
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                //  srcObject 媒体实时流  没有则用src 实时替换
                if ('srcObject' in this.thisVideo) {
                    this.thisVideo.srcObject = stream;
                } else {
                    this.thisVideo.src = window.URL.createObjectURL(stream);
                }
                // 视频加载后触发事件
                // e -->时长 / 尺寸 / 文本轨道
                this.thisVideo.onloadedmetadata = async (e: any) => {
                    console.log(e);
                    await this.thisVideo.play();
                    // this.$nextTick(() => this.interval(this.thisVideo));
                };
            }).catch(err => {
                console.warn(err);
            });
        });
    }
}
</script>
