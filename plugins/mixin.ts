import { Vue, Component } from 'vue-property-decorator';
@Component({})
export default class extends Vue {
    /**
     * arr : 传递的数组
     * replce: 替换的字符串
     * replaceAll: 要替换的字符串
     */
    // handleGetArr(arr: Array<Object>, replace: 'string', replaceAll: 'string') {
    handleGetArr(Obj: any) {
        const { arr, replace, replaceAll } = Obj;
        return arr.map((ele: any) => {
            const name = ele?.code.replace(replace, '').replaceAll(replaceAll, '').toLowerCase();
            return {
                name,
                content: ele.content,
            };
        });

    }
}
