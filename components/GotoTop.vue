<template>
    <div class="component-goto-top">
        <img
            v-if="visible"
            src="~/assets/image/footer/goto-top.png"
            alt="gotoTop"
            @click="gotoTop()"
        >
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class GotoTopComponent extends Vue {
    visible = false;

    mounted() {
        document.onscroll = () => {
            let res = document.body.scrollTop || document.documentElement.scrollTop;
            if (res >= 800) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        };
    }

    gotoTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/home/gotoTop.scss';
</style>
