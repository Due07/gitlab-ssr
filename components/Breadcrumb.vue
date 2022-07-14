<template>
    <div class="component-breadcrumb container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                v-for="(i, j) in data"
                :key="j"
                :to="{ name: i.route, params: i.params, query: i.query }"
            >{{ i.name }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Breadcrumb, BreadcrumbItem } from 'element-ui';

@Component({
    components: {
        ElBreadcrumb: Breadcrumb,
        ElBreadcrumbItem: BreadcrumbItem,
    },
})
export default class BreadcrumbComponent extends Vue {
    @Prop() private data: Array<any> | undefined

    linkList: Array<any> = [];

    created() {
        this.getLinkList();
    }

    getLinkList() {
        this.linkList = [
        ];
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/home/breadcrumb.scss';
</style>
