import Vue from 'vue';

import {
    Message, Button, Loading, Pagination,
    MessageBox, Card, Form, FormItem,
    Input, Select, Option, Checkbox,
    Cascader, DatePicker,
} from 'element-ui';

Vue.use(Button);
Vue.use(Loading);
Vue.use(Pagination);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(Cascader);
Vue.use(DatePicker);


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$elementLoading = Loading;