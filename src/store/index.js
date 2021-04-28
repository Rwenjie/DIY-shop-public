import { createStore } from 'vuex'

import cart from "./modules/cart"

import { userInfo,} from "network/login";

import {
    GET_USER_DETAIL,
    STATE_LOGIN
} from './mutations-type.js'

const state = {
  /*  cookie: false, // 保存cookie*/
    // 用户基本信息
    token: "",
    profile: {
        userId: null,
        username: null,
        profileUrl: 'https://rwenjie-blog.oss-cn-hangzhou.aliyuncs.com/div/member/profile/default%20avatar.png',
        miToke: null,
        tel: null,
        openId: null,
        wxToken: null,
    },
    //登录状态
    loginState: !!sessionStorage.getItem("tokenStr"),
};

const store = createStore({
    state,
    mutations:{
        [GET_USER_DETAIL](state, res) {
            state.profile.userId = res.obj.id;
            state.profile.profileUrl = res.obj.profileUrl;
            state.profile.tel = res.obj.tel;
            state.profile.username = res.obj.username;
        },
        [STATE_LOGIN](state) {
            state.loginState = true;
            console.log(state.loginState);
        },

    },
    actions: {
        //登录成功后获取用户信息
/*        getUserDetail(context) {

        },*/
        //用户登录成功后保存信息和改变登录后的状态
        loginSuccess(context) {
            userInfo().then( res=> {
                context.commit(GET_USER_DETAIL, res);
                context.commit(STATE_LOGIN);
            });
        }
    },
    getters: {

    },
    modules: {
        cart
    }
});

//导出store
export default store