<template>
    <div class="login-header">
        <div class="security-content mx-auto">
            <h1 title="极狐社区">
                <img
                    src="~/assets/image/logo.png"
                    alt="gitlab"
                    @click="gotoHome()"
                >
            </h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
    fetchOnServer: false,

    fetch() {
        console.log('fetch', this);
    }
})
export default class loginHeader extends Vue {
    gotoHome() {
        this.$router.push({
            name: 'home',
            params: {},
        });
    }
}
</script>

<style lang="scss" scoped>
.login-header {
    width: 100%;
    height: 113px;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.03);

    @media screen and (max-width: 768px) {
        width: 100%;
    }

    .security-content {
        width: 1023px;
        height: 100%;
        padding-top: 35px;
        box-sizing: border-box;

        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }

    h1 {
        img {
            width: 103px;
            height: 43px;
            object-fit: cover;
            cursor: pointer;

            @media screen and (max-width: 768px) {
                margin: auto;
            }
        }
    }

}
</style>
