import { stringify } from 'qs';
import axios from 'axios';
export default class {
    http: any;

    showError: boolean | undefined = true;

    constructor(prefix = '/api') {
        // prefix = prefix || process.env.VUE_APP_PREFIX as string || '';
        this.http = axios.create({
            baseURL: prefix,
            withCredentials: true,
            paramsSerializer(params) {
                return stringify(params, { arrayFormat: 'repeat' });
            },
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });

        this.http.interceptors.request.use((config: any) => {
            const token = sessionStorage.getItem('token') || ''
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        });

        this.http.interceptors.response.use(
            (response: any) => {
                if (response.data.status === 'error') {
                    // 验证码 电话 密码
                    const code = [2002, 2001, 2003];
                    if( code.includes(response.data.code)) return Promise.reject(response.data);
                    if (!this.showError) return Promise.reject(response.data);
                    return this.httpErrorHandle(response.data);
                }

                return response.data.data;
            },
            (error: any) => {
                if (!this.showError) return Promise.reject(error);

                return this.httpErrorHandle(error);
            },
        );

        const methods = ['get', 'delete', 'post', 'put', 'all', 'spread'];
        methods.map((i: string) => {
            this[i] = this.http[i] ? this.http[i] : axios[i];
            return i;
        });

        this.showError = true;
    }

    httpErrorHandle(error: any) {
        switch (error.code) {
            case 401:
                window.$nuxt.$message.error(error.message);
                // 清除信息/token
                window.$nuxt.$store.dispatch('getToken', '');
                window.$nuxt.$store.dispatch('getUser', {});
                window.$nuxt.$router.push({name: 'login'});
                break;
            case 400:
                window.$nuxt.$message.error(error.message);
                break;
            default:
                window.$nuxt.error(error.message);
                break;
        }
        return Promise.reject(error);
    }
}
