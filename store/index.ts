import Vue from 'vue';
import Vuex from 'vuex';
import countryCode from './countryCode';
import user from './user';
import districtCode from './districtCode';

Vue.use(Vuex);
const store = () => new Vuex.Store({
    modules: {
        countryCode,
        districtCode,
        user,
    },
    actions: {

    },
})

export default store;