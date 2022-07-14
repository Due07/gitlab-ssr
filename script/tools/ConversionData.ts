// 转化成cascader 的数据
export const conversionArr = (
    arr: Array<Record<string, any> | string[]>,
    handleVal: string
) => {
    arr.forEach((item: any) => {
        item.label = item.fullname;
        item.value = item.id;
        if (handleVal && item[handleVal]) {
            item.children = [...item[handleVal]];
        }
        if (item.children) conversionArr(item.children, handleVal);
        // delete item[handleVal];
    });
    return arr;
}