import {request} from "./request";

//商品分类列表
export function categoryList(){
    return request({
        url: '/category/listing',
    })
}

export function specificList(categoryId) {

    return request({
        url: '/specification/get/byCategoryId/'+categoryId
    })
}