import Vue from 'vue';

// 转化成cascader 的数据
const conversionArr = (
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

const state = () => ({
    districtCode: []
})

const mutations = {
    setDistrictCode: (state: Record<string, any>, data: Record<string, any>[]) => {
        state.districtCode = data;
    },
}

const actions = {
    getDistrictCode: async ({ commit }: any) => {
        const getCode = localStorage.getItem('districtCode');
        let data;
        if (getCode?.length) {
            data = JSON.parse(getCode);
        } else {
            const list = await Vue.prototype.$Http.get('/supplier/district')
                .catch(() => []);
            data = conversionArr(list, '');
        }
        localStorage.setItem('districtCode', JSON.stringify(data));
        commit('setDistrictCode', data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}