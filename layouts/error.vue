<template>
    <div class="__nuxt-error-page">
        <div class="error">
            <img class="mx-auto error-logo" src="~/assets/image/error.png" alt="gitlab" />

            <div class="title" v-if="statusCode">{{ statusCode }}</div>
            <p class="description" v-if="message">
                {{ message }}
            </p>
            <p class="description">
                <a class="error-link" href="javascript:location.reload();">
                    刷新页面
                </a>
                <NuxtLink class="error-link" to="/">
                    返回首页
                </NuxtLink>
            </p>

        </div>
    </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NuxtError extends Vue {
    @Prop({default: null}) error?: Record<string, any>;

    get statusCode() {
        return (this.error && this.error.statusCode || this.error?.code) || 500;
    }

    get message () {
        return this.error?.message;
    }
}
</script>

<style lang="scss" scoped>
.__nuxt-error-page {
    padding: 1rem;
    background: #F7F8FB;
    color: #47494E;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: sans-serif;
    font-weight: 100 !important;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .error {
        max-width: 450px;
    }

    .error-logo {
        width: 20vw;

        @media screen and (max-width: 768px) {
            width: 40vw;
        }
    }

    .title {
        font-size: 2rem;
        margin-top: 15px;
        color: #47494E;
        margin-bottom: 8px;
    }

    .description {
        color: #7F828B;
        font-size: 1.5rem;
        line-height: 21px;
        margin-bottom: 10px;
    }

    a {
        color: #171321;
        text-decoration: none;
    }

    .error-link {
        display: inline-block;
        border: 0;
        background-color: #FCA326;
        width: 120px;
        height: 42px;
        border-radius: 21px;
        color: #171321;
        font-size: 1.5rem;
        line-height: 42px;
    }
}
</style>