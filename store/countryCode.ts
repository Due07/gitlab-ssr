import Http from '@/plugins/Http';
import Vue from 'vue';
const state = () => ({
    countryCode: []
})

const mutations = {
    setCountryCode: (state: Record<string, any>, data: Record<string, any>[]) => {
        state.countryCode = data;
    },
}

const actions = {
    getCountryCode: async ({ commit, state }: any) => {
        const getCode = localStorage.getItem('countryCode');
        let data;
        if (getCode?.length) {
            data = JSON.parse(getCode);
        } else {
            const list = await Vue.prototype.$Http.post('/auth/city_code', { code: '' })
                .catch(() => []);

            // 合并重复的不过地区同个区号 
            const handleList = {};
            list.forEach((item: Record<string, any>, index: number) => {
                const list = handleList[item.code];

                // 合并重复的不过地区同个区号 
                if (list?.id) {

                    handleList[item.code] = {
                        code: item.code,
                        codeSort: item.codeSort,
                        chineseName: `${list.chineseName}/${item.chineseName}`,
                        englishName: `${list.englishName}/${item.englishName}`,
                        locale: `${list.locale}/${item.locale}`,
                    };
                } else {
                    handleList[item.code] = {...item};
                }

                // 处理成select框数据
                handleList[item.code] = {
                    ...item,
                    id: index + 1,
                    label: `+${handleList[item.code].code}(${handleList[item.code].locale})`,
                    value: handleList[item.code].code,
                }
            })
            // 处理成select框数据
            data = list.length
                ? Object.values(handleList).sort((a: any, b: any) => a.codeSort - b.codeSort)
                : [];
        }

        localStorage.setItem('countryCode', JSON.stringify(data));
        commit('setCountryCode', data);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}