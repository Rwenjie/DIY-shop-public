import {request} from "./request";

//账号密码登录
export function categoryList(){
    return request({
        url: '/category/listing',
    })
}