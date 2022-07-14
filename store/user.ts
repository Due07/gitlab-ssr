const state = () => ({
    user: {},
    token: '',
})

const mutations = {
    setUser: (state: Record<string, any>, data: Record<string, any>) => {
        state.user = data;
    },
    setToken: (state: Record<string, any>, data: string) => {
        state.token = data
    }
}

const actions = {
    getUser: ({ commit }: any, data: Record<string, any>) => {
        sessionStorage.setItem('user', JSON.stringify(data));
        commit('setUser', data);
    },
    getToken: ({ commit }: any, data: string) => {
        sessionStorage.setItem('token', data);
        commit('setToken', data);
    },
}

export default {
    namespaced: false,
    state,
    mutations,
    actions,
}