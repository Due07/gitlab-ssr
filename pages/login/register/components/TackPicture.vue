<template>
<!-- hide 隐藏起来了 -->
    <div class="tack-picture flex justify-evenly hidden">
        <img
            ref="faceImg"
            :src="tackPic.url"
            width="400"
            height="500"
        />
        <canvas ref="faceCanvas" width="400" height="500"></canvas>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import * as FaceApi from 'face-api.js';
import FileUpload from '@/components/widget/FileUpload.vue';
import { LoadingServiceOptions, ElLoadingComponent } from 'element-ui/types/loading';

@Component({
    components: {
        FileUpload,
    }
})
export default class TackPicture extends Vue {
    @Prop({default: {}}) tackPic!: Record<string, string | boolean>;

    private loading!: LoadingServiceOptions & ElLoadingComponent

    thisCancas: any = ''

    thisContext!: CanvasImageData | any

    thisVideo: any = ''

    videoSize: Record<'width'| 'height', number> = {
        width: 400,
        height: 600
    }

    @Watch('tackPic', {deep: true})
    onAvaterChange(nVal: Record<string, string | boolean>) {
        if (nVal.type) {
            this.discernPic();
        }
    }

    async created() {
        this.onLoading('正在加载模型~');
        try {
            // ssdMobilenetv1 tinyFaceDetector  二选一 人脸识别模型
            await Promise.race([
                // 如果人脸识别放在本地目录的话，需要做服务端化～
                // await FaceApi.nets.tinyFaceDetector.loadFromUri('/middleware/weights'),
                // await FaceApi.nets.tinyFaceDetector.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights'),
                await FaceApi.nets.ssdMobilenetv1.loadFromUri('/middleware/weights'),
                // 面部点位识别（68点）
                await FaceApi.nets.faceLandmark68Net.loadFromUri('/middleware/weights'),

                // 识别脸部特征用于tiny算法
                await FaceApi.nets.faceLandmark68TinyNet.loadFromUri('/middleware/weights'),

                // 性别年龄
                await FaceApi.nets.ageGenderNet.loadFromUri('/middleware/weights'),

                // 识别表情
                await FaceApi.nets.faceExpressionNet.loadFromUri('/middleware/weights'),

                // 识别人脸
                await FaceApi.nets.faceRecognitionNet.loadFromUri('/middleware/weights'),

            ]).then(() => {
                this.thisCancas = (this.$refs.faceCanvas as HTMLCanvasElement).getContext('2d');
                
            }).finally(() => {
                this.loading.close();
            });
        } catch(error: any) {
            console.log(error);
            this.loading.close();
        }
    }


    mounted() {}

    // 加载图片 调用api
    discernPic() {
        this.$nextTick(() => {
            const img = new Image();
            img.src = (this.$refs.faceImg as HTMLImageElement).src;
            this.onLoading('识别中~');
            img.onload = async () => {
                await this.getFaceInterval(this.$refs.faceImg as HTMLImageElement);
            }
            img.onended =() => this.loading.close();
        })
        
    }

    async getFaceInterval(dom: HTMLImageElement) {
        const imgDom = dom;
        console.log(dom);

        // 指定识别器
        const Ssd = new FaceApi.SsdMobilenetv1Options({ minConfidence: 0.8 });

        // detectSingleFace 识别度最高的  detectAllFaces 识别全部 
        const recognitionFace = await FaceApi.detectSingleFace(imgDom, Ssd)
            .withFaceLandmarks().withFaceExpressions().withAgeAndGender().withFaceDescriptor();

        console.log(recognitionFace);

        if (recognitionFace) {
            const message = this.handleData(recognitionFace);
            // console.log(this.handleData(recognitionFace));

            this.$emit('update:tackPic', {
                type: false,
                message,
                url: '',
            });

            // canvas 绘图
            // this.thisCancas.drawImage(imgDom, 0, 0, imgDom.width, imgDom.height);

            // // 匹配尺寸
            // FaceApi.matchDimensions(imgDom, this.$refs.faceCanvas as HTMLCanvasElement)

            // const displaySize = {width: imgDom.width, height: imgDom.height};

            // // 如果显示的图像大小与原始图像不同，请调整检测到的框的大小
            // const resizedDetections = FaceApi.resizeResults(recognitionFace, displaySize)
            // // 将检测结果绘制到画布中
            // FaceApi.draw.drawDetections(this.thisCancas, resizedDetections);
            // // 面部表情
            // FaceApi.draw.drawFaceExpressions(this.thisCancas, resizedDetections, 0.5);
            // 68点位显示
            // FaceApi.draw.drawFaceLandmarks(this.thisCancas, resizedDetections);
        } else {
            this.$message.warning('未识别出人脸, 无法判断年龄or性别~');
        }

        this.loading.close();

        // base64
        // const canvasBase64 = (this.$refs.faceCanvas as HTMLCanvasElement).toDataURL('image/jpeg');
        // console.log(canvasBase64);

    }

    onLoading(val: string) {
        const { loading } = this;
        if (loading && (loading.text !== val)) {
            this.loading.close();
        }
        this.loading = this.$elementLoading.service({
            text: val,
        })
    }

    handleData(faceDate: any) {

        type dataType = Record<"name" | "value", string>;

        enum expressionType {
            angry = '生气',
            disgusted = '厌烦',
            fearful = '害怕',
            happy = '快乐',
            neutral = '暗淡',
            sad = '难过',
            surprised = '惊讶',
        }

        const face = JSON.parse(JSON.stringify(faceDate));
        const { age, gender } = face;

        const expression = Object.entries(face.expressions).reduce(
            (pre: dataType | string, [curIndex, curVal]: any[]) => {
                if (!pre) return {value: curVal, name: curIndex};
                return (pre as dataType).value > curVal ? pre : {value: curVal, name: curIndex};
            },
            '',
        )
        return `年龄大约: ${
                Math.floor(age)
            }岁, 性别: ${
                gender === 'male' ? "男" : "女"
            }, 表情: ${
                expressionType[(expression as dataType)?.name] || ''
            }`;
    }

    // 转化文件类型输出
    outPutFile() {
        // base64 -> blob -> file
        // base64
        const canvasBase64 = (this.$refs.faceCanvas as HTMLCanvasElement).toDataURL('image/jpeg');
        // console.log(canvasBase64);
        const arr = canvasBase64.split(',');

        // blob
        const blobStr: any = window.atob(arr[1]);
        let length = blobStr.length;
        const u8Arr = new Uint8Array(blobStr.length);
        while (length--) {
            u8Arr[length] = blobStr.charCodeAt(length);
        }
        // canvas图片
        // 生成 File数据流
        const canvasPic = new File([u8Arr], String(new Date()), {type: 'image/jpeg'});
        console.log(canvasPic);
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
