import axios from 'axios';
import Http from '@/plugins/Http';
// import { ImageToBlob } from '@/script/widget/ImgHandle';
export default class {
    // 腾讯云
    constructor(driver = 'tencent') {
        this.driver = driver;
    }

    /**
     * 设置图片压缩选项
     * @param imgOptions
     */
    imgOptions(imgOptions) {
        this.imgOptions = imgOptions;
        return this;
    }

    /**
     * 设置ajax请求选项
     * @param ajaxOptions
     */
    ajaxOptions(ajaxOptions) {
        this.ajaxOptions = ajaxOptions;
        return this;
    }

    /**
     * 把单个文件转成文件数组
     * @param files
     */
    fileToFiles(files) {
        if (typeof files.length === 'undefined') files = [files];
        return files;
    }

    /**
     * 获取上传进度获取
     * @param callback
     */
    onUploadProgress(callback) {
        if (!this.ajaxOptions) this.ajaxOptions = {};
        this.ajaxOptions.onUploadProgress = callback;
        return this;
    }

    /**
     * 获取上传参数
     * @param driver
     * @returns {Promise<*>}
     */
    async uploadParameter(driver = null, dir = null, filename = '') {
        if (driver) this.driver = driver;
        // const params = await new RootServices().upload({ driver: this.driver, dir });
        const params = await new Http().get('/upload', {
            params: {
                driver: this.driver,
                dir,
                filename,
            },
        });
        return params;
    }

    /**
     *
     * @param parameter
     * @return {*}
     */
    handleUploadParameter(parameter) {
        if (!this.ajaxOptions) this.ajaxOptions = {};
        if (!(this.ajaxOptions.headers instanceof Object)) this.ajaxOptions.headers = {};
        if (parameter.headers instanceof Object) Object.assign(this.ajaxOptions.headers, parameter.headers);
        return parameter;
    }

    /**
     * 开始批量上传
     * @param files
     * @returns {Promise<Array>}
     */
    async uploadStart(files) {
        // 拿到的是上传文件的数据（名字，编码，时间....）
        if (files) files = this.fileToFiles(files);
        const res = [];
        for (let i = 0; i < files.length; i++) {
            res.push({
                url: await this.uploadFile(files[i]),
                // 本地
                // url: await this.uploadFileLocal(files[i]),
                type: files[i].type.split('/')[0],
            });
        }
        return res;
    }

    /**
     * 上传单个文件
     * @param file
     * @returns {Promise<*>}
     * 把文件信息进行拆分传到阿里云，转为api链接
     */
    async uploadFile(file, dir = null, driver = null) {
        const uploadParameter = this.handleUploadParameter(
            await this.uploadParameter(driver, dir, file.name),
        );
        console.log(uploadParameter);
        const formData = new FormData();
        Object.entries(uploadParameter.form).forEach(([key, value]) => {
            if (key !== 'file') formData.append(key, value);
        });
        // 设置文件名
        formData.append('Content-Disposition',
            `attachment; filename="${encodeURIComponent(file.name)}"`);
        // if (this.imgOptions && file.type.indexOf('image') >= 0) {
        //     file = await ImageToBlob(file, this.imgOptions);
        // }
        formData.append(uploadParameter.file_field, file);
        const method = uploadParameter.method.toLowerCase();
        await axios[method](uploadParameter.upload_url, formData, this.ajaxOptions);
        return uploadParameter.access_url;
    }

    /**
     * @Desc 本地上传文件
     *
     */
    async uploadFileLocal(file) {
        const formData = new FormData();
        // 设置文件名
        // formData.append('Content-Disposition',
        //     `attachment; filename="${encodeURIComponent(file.name)}"`);
        formData.append('file', file);
        console.log(file);
        // const retUrl = await new RootServices().uplocal(formData, file.name || +new Date());
        const retUrl = await new Http().post(
            `/supplier/upload/local?key=${file.name || +new Date()}`,
            formData,
        );
        return retUrl;
    }
}
