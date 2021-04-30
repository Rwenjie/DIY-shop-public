/**
 * @FileDescription:
 * @Author: Rwenjie
 * @Date: 2021/5/1
 * @LastEditors: Modified by : Rwenjie
 * @LastEditTime: Modified time : 2021/5/1
 **/

/* bus.js */

import mitt from "mitt";

const bus = {};
const emitter = mitt();

bus.$on = emitter.on;
bus.$off = emitter.off;
bus.$emit = emitter.emit;

export default bus