<template>
    <div class="component-goto-comment">
        <img
            src="~/assets/image/footer/goto-comment.png"
            alt="gotoComment"
            @click="gotoComment()"
        >
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class GotoCommentComponent extends Vue {
    gotoComment() {
        const height = (document.querySelector('.box-content') as any).scrollHeight + 66;
        document.body.scrollTop = height || 0;
        document.documentElement.scrollTop = height || 0;
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/home/gotoComment.scss';
</style>
