/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/1
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/1
 **/
import {ADD_IMAGES} from "../mutations-type";

const state = {
    images: [],
};

export default {
    state,
    mutations: {
        [ADD_IMAGES](state, imageUrl) {
            state.images = imageUrl;
        }
    },
    actions: {
        addImages(context, imageUrl) {
            context.commit(ADD_IMAGES, imageUrl);
        }
    },
    getters: {

    }
}
