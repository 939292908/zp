/*
 * @Author: your name
 * @Date: 2019-10-24 17:51:40
 * @LastEditTime: 2019-10-28 17:59:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \map-web\static\vendors\hydraCard.js
 */
import * as d3 from 'd3v4';
var hydra =
    /******/
    (function (modules) { // webpackBootstrap
        /******/ // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/ // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/
            if (installedModules[moduleId]) {
                /******/
                return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
            };
            /******/
            /******/ // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/
            return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/ // define getter function for harmony exports
        /******/
        __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
                /******/
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ // define __esModule on exports
        /******/
        __webpack_require__.r = function (exports) {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module'
                });
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', {
                value: true
            });
            /******/
        };
        /******/
        /******/ // create a fake namespace object
        /******/ // mode & 1: value is a module id, require it
        /******/ // mode & 2: merge all properties of value into the ns
        /******/ // mode & 4: return value when already ns object
        /******/ // mode & 8|1: behave like require
        /******/
        __webpack_require__.t = function (value, mode) {
            /******/
            if (mode & 1) value = __webpack_require__(value);
            /******/
            if (mode & 8) return value;
            /******/
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/
            var ns = Object.create(null);
            /******/
            __webpack_require__.r(ns);
            /******/
            Object.defineProperty(ns, 'default', {
                enumerable: true,
                value: value
            });
            /******/
            if (mode & 2 && typeof value != 'string')
                for (var key in value) __webpack_require__.d(ns, key, function (key) {
                    return value[key];
                }.bind(null, key));
            /******/
            return ns;
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
                /******/
                function getDefault() {
                    return module['default'];
                } :
                /******/
                function getModuleExports() {
                    return module;
                };
            /******/
            __webpack_require__.d(getter, 'a', getter);
            /******/
            return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        /******/ // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 0);
        /******/
    })
        /************************************************************************/
        /******/
        ([
            /* 0 */
            /***/
            (function (module, exports, __webpack_require__) {

                __webpack_require__(1);
                var hydra = {};

                hydra.version = '0.1.1';
                hydra.graph = __webpack_require__(5);

                module.exports = hydra;

                /***/
            }),
            /* 1 */
            /***/
            (function (module, exports) {

                // removed by extract-text-webpack-plugin

                /***/
            }),
            /* 2 */
            ,
            /* 3 */
            ,
            /* 4 */
            ,
            /* 5 */
            /***/
            (function (module, exports, __webpack_require__) {

                module.exports = function () {
                    /**
                     * 定义命名空间
                     * @namespace graph
                     */
                    var graph = {},
                        tree,
                        opt = {
                            selector: '#hydra', // 渲染图形的DOM节点
                            type: 'force', // 类型，目前有 力导向图 force ,树形图tree,level层次图，levelTree层次组合树形图，social社会关系图,forceCard,forceCircle
                            workObjectTitle: '', // 层次图level 工作对象的title
                            width: 800, // 画布宽
                            height: 600, // 画布高
                            offsetTop: 0, // 与顶部的距离
                            offsetLine: 10, // 力导向图节点之间多条连线之间的距离
                            offsetLineWidth: 100, // 卡片之间折线的固定宽度
                            selectorScroll: '', // 选择器，选择被卷曲元素父级(计算菜单的位置)
                            isHideSuperpositionBtn: false, // 是否隐藏hover菜单中，叠加按钮
                            showJoin: false, //是否显示串并图标
                            showFilterCondition: false,//是否显示高级筛选按钮
                            relatedColor: 'red',
                            allowMulituple: false, //允许多选
                            allowNodeDbclick: false, // 允许使用按钮扩展,搭配 expandlist 使用
                            expandlist: [], // 扩展按钮,'edit', 'del', 'expand', 'add', 'lock'
                            allowDrag: false, // 允许针对单个node拖拽
                            allowThumbnail: true, // 显示缩略图
                            allowMarker: true, // 是否需要流动箭头
                            isHideMarkerOutsideClick: true, // 再点击画布空白处是否隐藏流动箭头
                            markerSize: 8, // 流动箭头的大小
                            showToptag: false, // 显示实体顶部标签， 后期自定义标签
                            showToptagMenu: false, // 显示实体顶部标签菜单
                            isGroup: true,//是否对节点进行分组
                            isEvtNodeClick: true,// 是否添加节点的点击事件
                            highlightText: '', // 实体高亮文本
                            nodeEleSize: {
                                width: 290,
                                height: 142
                            },
                            node: { // 节点的配置信息
                                isEdit: false, // 是否扩展编辑操作按钮,默认为false
                                borderColor: "#d7d7d7",
                                top: "",
                                right: "",
                                bottom: "",
                                left: "",
                                textColor: null
                            },
                            topTagColors: { // 实体顶部自定义标签 通过'showToptag'控制显示隐藏
                                '户': '#4298c7',
                                '案': '#eb4826',
                                '朝': '#6668c6',
                                '境': '#8d3b65',
                                '社': '#bc4166',
                                '危': '#f19d38',
                                '宗': '#bf6b27',
                                '打': '#bc4166',
                                '族': '#f19d38',
                                '暴': '#8d3b65',
                            },
                            iconTagPath: {
                                '户': 'M116.9,971l-67.8-62C122.7,803.5,160.4,667,161.4,500.4V183.8h310.8c-15.5-36.8-32.9-71.7-52.3-103.6l98.8-15.5c16.5,35.8,32,75.5,47.4,119.1h306.9v344.7H251.4C245.6,698.9,201.1,847.1,116.9,971z M252.4,273.9v164.6h527.7V273.9H252.4z',
                                '案': 'M460.6,642.8v-69.7h93v69.7h369.9v79.4H631c68.7,58.1,171.4,105.5,306.9,140.4l-39.7,80.4c-156.9-54.2-271.1-123-344.7-208.2v228.5h-93V732.8c-65.8,83.3-178.2,154.9-338.9,216.9l-50.3-81.3c147.2-44.5,250.8-93,310.8-146.2H87.8v-79.4H460.6z M518.7,253.5c-14.5,18.4-28.1,35.8-41.6,51.3h416.3v73.6H734.6c-30,38.7-62,70.7-94.9,95.9c80.4,20.3,162.7,43.6,246.9,70.7l-53.3,69.7c-93.9-32.9-188.8-62.9-283.7-88.1c-101.7,46.5-233.3,70.7-394.1,73.6l-50.3-75.5c135.6,0,243-10.7,320.5-30c-61-14.5-122-27.1-182-38.7c24.2-26.1,47.4-52.3,70.7-77.5H118.8v-73.6h257.6c20.3-25.2,39.7-50.3,59.1-75.5L518.7,253.5z M899.2,288.4H814v-68.7H196.3v68.7H111V143.2h347.6c-11.6-21.3-24.2-41.6-37.8-61l95.9-15.5c11.6,23.2,22.3,48.4,33.9,76.5h348.6V288.4z M632,378.4H415.1l-36.8,39.7c52.3,8.7,105.5,19.4,159.8,32C574.8,428.8,606.8,404.6,632,378.4z',
                                '朝': 'M255.3,150.9V69.6h91v81.3h173.3v83.3H346.3v68.7h145.2v359.2H349.2v66.8h157.8v86.2H349.2v150.1h-92V815.1H67.5v-86.2h189.8v-66.8H111V302.9h144.3v-68.7H80.1v-83.3H255.3z M408.3,444.3v-62.9H197.2v62.9H408.3z M408.3,517.9H197.2v64.9h211.1V517.9z M540,972.9l-70.7-64.9C535.1,818,569,703.8,570,564.3V104.4h343.7v759.1c0,62-32,93.9-94.9,93.9H718.1l-25.2-90c34.9,1.9,66.8,3.9,95.9,3.9c21.3,0,32-13.6,32-39.7V655.4H656.2C641.6,782.2,602.9,887.7,540,972.9z M662,557.6c0,3.9-1,8.7-1,13.6h159.8V423H662V557.6z M820.8,190.6H662v148.1h158.8V190.6z',
                                '境': 'M355,741.5C269.8,784.1,178.8,820,82,849L57.8,748.3c32-6.8,63.9-14.5,95.9-23.2v-335h-93V301h93V77.3h92V301h76.5v89.1h-76.5v305c36.8-13.6,72.6-29,109.4-46.5V741.5z M876.9,422v319.5H758.8v105.5c0,18.4,6.8,28.1,21.3,28.1h65.8c8.7,0,15.5-4.8,20.3-12.6c5.8-9.7,9.7-37.8,11.6-86.2l81.3,26.1c-5.8,72.6-16.5,116.2-31,130.7c-15.5,13.6-37.8,20.3-66.8,20.3H754.9c-58.1,0-86.2-30-86.2-89.1v-123h-82.3c-11.6,55.2-35.8,100.7-70.7,136.5c-40.7,37.8-108.4,67.8-203.3,91l-34.9-82.3c77.5-14.5,133.6-35.8,168.5-62.9c26.1-21.3,44.5-49.4,55.2-82.3h-95.9V422H876.9z M588.4,140.2c-7.7-22.3-16.5-42.6-25.2-61L661,62.8c7.7,23.2,15.5,49.4,22.3,77.5h226.6v75.5h-97.8c-7.7,29-18.4,58.1-30,85.2h155.9v76.5H351.2V301h141.4c-9.7-31-19.4-59.1-31-85.2h-81.3v-75.5H588.4z M792.7,548.8v-54.2H489.6v54.2H792.7z M792.7,612.8H489.6V667h303.1V612.8zM727.8,215.8H553.5c8.7,27.1,17.4,55.2,26.1,85.2H693C708.5,272.9,720.1,244.8,727.8,215.8z',
                                '社': 'M87.8,687.3l-29-96.8c126.8-103.6,213-204.3,257.6-303.1H82v-88.1h136.5c-14.5-36.8-30-71.6-46.5-106.5l87.1-24.2c19.4,47.4,35.8,91,47.4,130.7h102.6v77.5c-24.2,67.8-62,135.6-114.3,203.3c54.2,31,105.5,65.8,152,106.5L394.7,666c-34.9-35.8-69.7-65.8-103.6-91v389.2h-90V585.6C166.2,620.5,128.5,654.4,87.8,687.3z M712.3,79.2v276.9h214v90h-214v397h236.3v90H377.3v-90h242.1v-397H411.2v-90h208.2V79.2H712.3z',
                                '危': 'M930.8,305.8H666.4c29-25.8,62.3-60,99.7-102.6v-65.8H404c12.3-18.1,25.2-37.8,38.7-59.1l-94.9-20.3c-78.1,119.4-172.3,213-282.7,280.8l62,74.6c27.7-18.7,49.4-34.5,64.9-47.4V542c-3.9,154.3-45.2,273.7-123.9,358.3l74.6,65.8C233,859.6,280.4,718.2,284.9,542V394.8h645.8V305.8z M548.3,305.8H261.7c30.3-29,58.4-59.4,84.2-91h300.2C606.7,254.1,574.1,284.5,548.3,305.8z M870.7,735.7c-5.8,52.9-12.9,87.8-21.3,104.6c-9.7,15.5-33.9,23.2-72.6,23.2H526c-32.3,0-48.4-12.9-48.4-38.7V567.2H711v70.7c0,27.8-11.3,41.6-33.9,41.6c-31,0-67.8-1.9-110.4-5.8l22.3,86.2c40,1.9,81.7,2.9,124.9,2.9c60-3.9,90.4-35.2,91-93.9v-183H383.7v372.8c0,60,33.6,90,100.7,90h319.5c54.2,0,91.3-8.4,111.3-25.2c19.4-17.4,33.9-70.7,43.6-159.8L870.7,735.7z',
                                '宗': 'M362.8,709.6c-55.2,85.2-123,158.8-203.3,222.7l-55.2-72.6c76.5-59.1,141.4-128.8,193.6-208.2L362.8,709.6zM357,960.4l-20.3-87.1c32.9,3.9,64.9,6.8,93.9,6.8c32.9,0,49.4-13.6,49.4-39.7V606H109.1v-88.1H906V606H570v256.6c0,64.9-36.8,97.8-108.4,97.8H357z M893.4,367.8h-91V248.7H213.7v121h-90V161.6h342.8c-6.8-27.1-14.5-51.3-22.3-74.6l92-15.5c8.7,27.1,17.4,57.1,25.2,90h332.1V367.8z M771.4,345.5v87.1H246.6v-87.1H771.4z M918.6,863.5l-65.8,65.8C806.2,859.7,742.3,786.1,661,706.7l62-60C800.4,718.3,866.3,790.9,918.6,863.5z',
                                '暴': 'M333.9,358l-154-0.5l0.8-280.8l669.1,2L849,359.5L694.1,359l-0.1,43.6l206.2,0.6l-0.2,69.7l-206.2-0.6   l-0.1,44.5l253.7,0.8l-0.2,76.5l-215.9-0.7c52.2,44.7,128.5,80.8,229.1,108.2l-38,79.3c-73.5-26.7-134.4-56.9-182.7-90.6   c-31.1,22.5-66.3,43.1-105.7,61.7l-45.3-59.2c33.6-15.4,63.3-32.4,89.2-51c-16.7-14.9-31.2-31.1-43.4-48.5l-230.4-0.7   c-18.1,20.6-35,37.7-50.5,51.2c33.5,22.1,58,39.2,73.4,51.5l-51.5,51.2c-21.2-18.8-48.3-38.2-81.2-58.3   c-52.4,33.4-113.5,63.2-183.3,89.5l-47.2-77.6c102.1-28.1,180.9-64,236.6-107.7l-222.7-0.7l0.2-76.5l255.6,0.8l0.1-44.5l-208.2-0.6   l0.2-69.7l208.2,0.6L333.9,358z M439,815.3c-77,43.7-173.2,83.1-288.9,118.2L116.5,854c118.9-29.3,220-64.5,303.4-105.6L439,815.3z    M760.1,292.4l0.1-42.6l-490.9-1.5l-0.1,42.6L760.1,292.4z M269.5,187.4l490.9,1.5l0.1-42.6l-490.9-1.5L269.5,187.4z M366,944.8   l-17.2-78.5c32.9,4,65.2,6,96.8,6.1c18.7,0.1,28.1-8.3,28.2-25.1l0.7-228.5l89.1,0.3l-0.7,248.8c-0.2,51.6-30.2,77.4-90.3,77.2   L366,944.8z M421.5,516l184,0.6l0.1-44.5l-184-0.6L421.5,516z M421.9,401.8l184,0.6l0.1-43.6l-184-0.6L421.9,401.8z M626.1,763.6   c106.4,30.7,203.8,67.1,292.1,109.3l-48.6,74.4c-93.4-52.6-188.5-93.5-285.3-122.9L626.1,763.6z',
                                '打': 'M449.1,534.3c-42.6,18.1-85.2,35.5-127.8,52.3v272.1c0,62.6-32.3,93.9-96.8,93.9h-99.7l-21.3-89.1   c34.2,3.2,63.9,4.8,89.1,4.8c23.9,0,35.8-11.3,35.8-33.9v-215c-47.1,14.9-93,28.4-137.5,40.7L68.5,573   c57.4-12.3,110.7-26.1,159.8-41.6V326.1H84V238h144.3V71.4h93V238h118.1v88.1H321.3v172.3c42.6-16.8,85.2-35.2,127.8-55.2V534.3z    M463.6,135.4h491.9v89.1H806.3v626.5c0,66.5-31.3,99.7-93.9,99.7H550.7l-20.3-89.1c58.1,3.2,108.1,4.8,150.1,4.8   c21.9,0,32.9-12.9,32.9-38.7V224.4H463.6V135.4z',
                                '族': 'M83.6,194.9h141.4c-16.8-41.3-34.5-78.4-53.3-111.3l92-16.5c15.5,32.3,31.6,74.9,48.4,127.8h114.3V282H246.2   v117.2h175.3c0,250.5-4.8,404.7-14.5,462.8c-7.7,58.7-49.7,88.1-125.9,88.1c-7.7,0-24.5-1.6-50.3-4.8l-18.4-75.5   c28.4,2.6,46.8,3.9,55.2,3.9c32.9,0,52.3-16.5,58.1-49.4c5.2-31,8.4-144.6,9.7-340.8h-90c-5.8,215.6-44.9,375-117.2,478.3l-68.7-60   c63.9-96.8,96.8-252.4,98.8-466.7V282H83.6V194.9z M555.1,252C526.7,316.6,497,370.8,466,414.7l-57.1-68.7   c47.8-68.4,88.1-163,121-283.7l85.2,19.4c-7.7,25.8-16.5,53.3-26.1,82.3h336V252H555.1z M603.5,449.5   c-20.7,44.5-45.2,84.2-73.6,119.1l-52.3-64.9C517,451.5,551.2,378.2,580.3,284l75.5,15.5c-3.9,15.5-10.3,37.4-19.4,65.8H894v84.2   H744.9c-1.9,43.3-4.8,83.9-8.7,122h205.3v88.1H751.6c47.1,107.2,118.1,181.1,213,221.7l-49.4,78.4c-91-46.5-161.7-125.9-212-238.2   c-31.6,94.9-97.5,174.3-197.5,238.2l-57.1-70.7c89.1-57.4,148.1-127.5,177.2-210.1l5.8-19.4H460.2v-88.1H649   c3.9-38.1,6.8-78.7,8.7-122H603.5z'
                            },
                            fiveTagColor: {
                                '政': '#666666',
                                '宗': '#008000',
                                '商': '#f49e00',
                                '恐': '#333333',
                                '黑': '#999999'
                            },
                            fiveTagPath: {
                                '政': 'M238.1,211L136.4,35c-3.5-6.1-13.3-6.1-16.9,0L17.9,211c-1.8,3-1.8,6.7,0,9.7c1.8,3,4.9,4.9,8.4,4.9h203.3  c3.5,0,6.7-1.8,8.4-4.9C239.8,217.7,239.8,214.1,238.1,211z M128,212.2l0-10.4c-1.7,0.9-3.1,2.1-4.9,2.9l-5.4-7.2  c3.8-1.6,7.1-3.7,10.3-5.8l0-25.2c-0.3,0.5-0.5,1-0.8,1.4l-4.9-6.5h-8.4v21.4c4.5-1.3,8.7-2.7,12.8-4.1v8.2  c-11.3,4.1-24.5,7.8-39.6,11.2l-2.4-8.1c1.9-0.4,3.6-0.8,5.5-1.2v-42.4h8.3v40.4c2.4-0.6,4.6-1.1,6.9-1.7v-50H87.4v-8.6h40v8.6  h-13.5v17.8h9.8v5.6c1.7-3.1,2.9-6.9,4.3-10.4L128,44l97.5,168L128,212.2z M166.5,204.7l5-7.4c-7.2-4.3-13.5-10.2-18.9-17.8  c6.3-10.2,9.8-22.8,10.5-37.6h6.1v-8.6H142c1-4.3,1.9-8.7,2.7-13.4l-8.6-1c-1.6,11.2-4.5,20.7-8,29.6v18.3c1.9-3,3.7-6.1,5.3-9.3  c2.6,8,5.7,15.2,9.3,21.7c-3.8,5-8.9,9.1-14.6,12.7v10.2c7.6-4.2,14.3-9.1,19.5-15.2C152.8,194.2,159.3,200.3,166.5,204.7z   M137.9,146.4c0.6-1.5,1-3.1,1.6-4.6h15.1c-0.4,11.2-2.7,20.9-7,29.4C143.6,163.9,140.5,155.7,137.9,146.4z',
                                '商': 'M123.2,126.3H86.7v8.5h18.9c1.7,3,3.1,6.2,4.4,9.6H90.6v60.3H99v-37.5l5.5,7.1c1.9-1.1,3.6-2.3,5.4-3.5v23.9  h36.3V170c1.3,1.3,2.9,2.7,4,4l6.6-6.5c-5.1-5-11.4-10.1-18.9-15.2l-5.9,5.7c5.8,4.3,10.3,8.2,14.2,12.1h-35.5  c4.9-3.6,9.3-7.7,13.1-12.2l-6.2-5.5c-5,5.5-11.1,10.3-18.6,14.4v-14.6h58v40.1c0,3.2-1.2,4.8-3.4,4.8l-8.9-0.3l2.2,8h9.5  c6,0,9.1-3.6,9.1-10.7v-49.8h-20c1.6-2.9,3.1-6,4.6-9.6h19.5v-8.5H133c-0.9-2.8-1.8-5.4-2.7-7.7l-9.8,1.5  C121.4,121.9,122.4,124.1,123.2,126.3z M118.5,177.9h19.2v8.8h-19.2V177.9z M140.4,134.8c-1.4,3.3-2.9,6.4-4.6,9.6h-16.9  c-1.1-3.5-2.4-6.7-3.7-9.6H140.4z M238.1,211L136.4,35c-3.5-6.1-13.3-6.1-16.9,0L17.9,211c-1.8,3-1.8,6.7,0,9.7  c1.8,3,4.9,4.9,8.4,4.9h203.3c3.5,0,6.7-1.8,8.4-4.9C239.8,217.7,239.8,214.1,238.1,211z M30.8,212.4L128,44l97.5,168L30.8,212.4z',
                                '宗': 'M142.5,180c7.8,7.6,13.9,14.7,18.4,21.4l6.3-6.3c-5-7-11.3-13.9-18.8-20.8L142.5,180z M107.6,174.7  c-5,7.6-11.2,14.3-18.6,20l5.3,7c7.7-6.1,14.2-13.2,19.5-21.4L107.6,174.7z M89.5,170.4h35.6v22.5c0,2.5-1.6,3.8-4.7,3.8  c-2.8,0-5.9-0.3-9-0.7l2,8.4h10c6.9,0,10.4-3.2,10.4-9.4v-24.6H166v-8.5H89.5V170.4z M123.8,127.7H90.9v20h8.6v-11.6h56.5v11.4h8.7  v-19.8h-31.9c-0.7-3.2-1.6-6-2.4-8.6l-8.8,1.5C122.4,122.8,123.2,125.1,123.8,127.7z M102.7,145.4v8.4h50.4v-8.4H102.7z M238.1,211  L136.4,35c-3.5-6.1-13.3-6.1-16.9,0L17.9,211c-1.8,3-1.8,6.7,0,9.7c1.8,3,4.9,4.9,8.4,4.9h203.3c3.5,0,6.7-1.8,8.4-4.9  C239.8,217.7,239.8,214.1,238.1,211z M30.8,212.4L128,44l97.5,168L30.8,212.4z',
                                '恐': 'M238.1,211L136.4,35c-3.5-6.1-13.3-6.1-16.9,0L17.9,211c-1.8,3-1.8,6.7,0,9.7c1.8,3,4.9,4.9,8.4,4.9h203.3  c3.5,0,6.7-1.8,8.4-4.9C239.8,217.7,239.8,214.1,238.1,211z M30.8,212.4L128,44l97.5,168L30.8,212.4z M142.8,191.7  c-0.8,1.1-2.2,1.8-4.1,1.8h-19.9c-1.7,0-2.5-1-2.5-3.1v-20.8h-8.6v22.6c0,6.3,2.8,9.5,8.4,9.5h24.2c3.8,0,6.7-0.8,8.5-2.5  c2-1.8,3.3-7.4,4.1-16.7l-8.1-2.5C144.5,186.4,143.8,190.4,142.8,191.7z M85.5,195.8l7.4,4.7c4.1-7.4,7.2-16.1,9.4-26.2l-8.3-1.7  C92.3,180.9,89.4,188.6,85.5,195.8z M130.6,168l-8,2.5c2.7,4.9,5.2,10.6,7.5,17l7.9-3.5C135.9,178.3,133.4,173,130.6,168z   M126.1,121.7v14.7c0,6.8-0.6,11.6-1.6,14.5c-0.7,2.1-2.2,4.5-4.3,7.2v-6.9c-3.9,1.1-7.9,2.1-11.9,3.1v-24.2h11.5v-8.2H88v8.2h11.8  v26c-4.3,0.7-8.6,1.5-13.1,2l1.9,8.1c10.8-1.8,21-4.1,30.4-6.7c-0.2,0.2-0.4,0.4-0.6,0.6l6.8,5.8c3.7-4.3,6.2-8.5,7.4-12.4  c0.6-2.8,1.1-6.5,1.3-11.1c3.5,4.7,6.4,9.1,8.5,13.1l6.5-4.6c-2.1-3.8-5.2-8.2-9.2-13.4l-5.7,3.5c0-1.5,0.1-3,0.1-4.6v-6.9h15.3  v28.3c0,4.7,2.3,7.1,7.1,7.1h6.1c2.6,0,4.5-1,5.6-2.9c0.9-1.9,1.8-6.8,2.5-14.5l-6.9-2.3c-0.4,6.1-0.6,9.7-1,10.7  c-0.4,1.1-0.8,1.7-1.6,1.7h-1.6c-1.3,0-1.9-0.8-1.9-2.3v-33.6H126.1z M150.8,171.7c4.2,7.1,8,15.4,11.3,24.7l8.1-3.6  c-3.2-8.4-7-16.4-11.5-23.8L150.8,171.7z',
                                '黑': 'M150.6,187.4c4.5,5.8,8.1,11.1,10.8,15.7l7-4.9c-2.6-4.3-6.2-9.2-11.1-15L150.6,187.4z M130.9,186.1  c2.4,4.8,4.4,10.4,6,16.7l8.5-1.9c-1.9-5.9-4.1-11.4-6.6-16.4L130.9,186.1z M87.9,200.2L96,203c3-4.8,5.5-10.6,7.4-17.1l-7.7-2  C93.5,190.4,90.9,195.9,87.9,200.2z M111.5,186.5c1.7,4.8,3.2,10.3,4.4,16.6l8.6-2c-1.5-5.9-3.3-11.3-5.1-16.4L111.5,186.5z   M136.5,142.2l7.1,2.5c2.2-3.9,4.1-8.4,5.6-13.5l-7.3-1.9C140.3,134.4,138.5,138.8,136.5,142.2z M162.1,153.9v-33.5H94.3v33.5h29.5  v5.9H93v7.6h30.8v5.8H87.6v7.9h81v-7.9h-36.2v-5.8h30.8v-7.6h-30.8v-5.9H162.1z M124,146.4h-21.3v-18.5H124V146.4z M132.2,146.4  v-18.5h21.4v18.5H132.2z M119.2,142.8c-1.5-4.9-3.3-9.3-5.3-13l-7,2.3c2,4.1,3.8,8.3,5.2,12.5L119.2,142.8z M238.1,211L136.4,35  c-3.5-6.1-13.3-6.1-16.9,0L17.9,211c-1.8,3-1.8,6.7,0,9.7c1.8,3,4.9,4.9,8.4,4.9h203.3c3.5,0,6.7-1.8,8.4-4.9  C239.8,217.7,239.8,214.1,238.1,211z M30.8,212.4L128,44l97.5,168L30.8,212.4z'
                            },
                            // 层次图类别颜色
                            levelTypeColor: {
                                '头目': '#ce4343',
                                '头目': '#ed8f21',
                                '头目': '#e8d71d',
                                '头目': '#4264d7',
                            },
                            properties: {
                                profession: "焊工",
                                HJD: "地址",
                                STATE: "状态",
                                RYBQ: "标签",
                                politicsStatus: "",
                                STATE_COLOR: "",
                                XM: "姓名",
                                phone: "电话",
                                PERSON_ID: "编号",
                                FIVE_ONE_PROPERTY: "",
                                GENDER: "性别",
                                PERSON_DESCRIPTION: "备注",
                                SFZHM: "身份证号"
                            },
                            // 卡片显示的属性字段
                            RYProperties: ['XM', 'SFZHM', 'HJD', 'RYBQ'],
                            TPProperties: ['mapName', 'deptName'],
                            personLabel: {
                                '社会面': '#008800',
                                '收押': '#cb4324',
                                '收教': '#f7b940',
                                '境外': '#ffe900',
                                '死亡': '#6B6B6B',
                                '去向不明': '#0000fe'
                            },
                            fiveOneArr: ['政', '宗', '商', '恐', '黑'],
                            tree: {
                                treeW: 350, //如果类型为social，请设置狂傲为800，400
                                treeH: 240
                            },
                            circle: {
                                r: 32,
                                color: "#fff",
                                stroke: "#009AED",
                                strokeSelectd: "#ABC700",
                                strokefixed: "#C9C9C9",
                                selected: "#fff",
                                zoomColor: "blue",
                                fixedColor: '#a1a1a1',
                                fillColor: '#f2f2f2'
                            },
                            NTConfig: {
                                NT_R: 40,
                                NTViewArea_Stroke: 'blue',
                                NTViewArea_StrokeWidth: 1,
                                NTRect_Fill: 'white',
                                NTNode_Stroke: 'red',
                                NTNode_StrokeWidth: 1,
                                NTNode_Fill: '#d7d7d7',
                                NTLink_Stroke: '#7d7b7b',
                                NTLink_StrokeWidth: 1,
                                NTLink_Fill: 'none',
                                NTSelected_Stroke: 'blue',
                                NTSelected_StrokeWidth: 1,
                                NTSelected_Fill: 'blue',
                                ThumbnailSize: .2, //默认略缩图缩放比
                                ThumbScale: 5 // 缩略图对应主屏幕移动的比例
                            },
                            icons: [],
                            useOverlap: false, //启用叠加
                            overlapData: [], //叠加数据，需要在useOverlap为true时使用
                            useForce: false, //启用力导向 默认值均为false
                            selectNode: function () { }, //实体选中事件
                            selectLink: function () { }, //关系选中事件
                            expandEvt: function () { }, //扩展按钮事件
                            bgclickEvt: function () { }, //画布双击事件
                            topTagClickEvt: function () { }, //实体顶部标签事件
                            stackClickEvt: function () { },
                            marriageClickEvt: function () { },
                            allStackClickEvt: function () { },
                            tpsCreateEvt: function () { },//创建图谱关联列表的事件
                            mouseoutEvt: function () { }, //鼠标移出事件
                            sideButtonEvt: function () { }, //编辑模式下侧边按钮的事件
                            linkClick: function () { }, //连线单击事件
                            linkDbClick: function () { }, //双击连线或者线上的文本
                            completed: function () { },//加载完成回调事件
                            filterConditionClickEvt: function () { },//高级查询条件点击事件
                            nodeDblClick: function () { },//节点的双击事件
                            caseClueEvt: function () { },//节点中案件线索的点击事件
                            keypressEvt: function () { },//键盘按下事件，(左右键)
                        },
                        Node = __webpack_require__(6)(graph),
                        Link = __webpack_require__(7)(graph),
                        saveAsPng = __webpack_require__(8)(),
                        license = __webpack_require__(9)(graph),
                        nodeObjs = [],
                        linkObjs = [],
                        graphContainer, container, bg_rect, simulation,
                        node, nodeGroup, link, linkGroup, relationGroup, relations, relationLabelGroup, relLabels, relMarkerGroup, relmarkers,
                        linkText, linkTextGroup,
                        initIsFinish = false,
                        isDragging = false,
                        initOnce = true,
                        svgScale = d3.zoomIdentity,//当前缩放比
                        selectedNodesArr = [],
                        selectedLinkLabelsArr = [],
                        selectedLinkLabelRectsArr = [],
                        eventType = '', //键盘触发事件的类型
                        touching = false,
                        area_x, area_y, area_w, area_h, //框选用变量
                        BoxArea, brushGroup, g_o,
                        ctrlKey,
                        g_main_init = false,
                        delObjArr = [],
                        repeatViewId = {}, //key是viewid, val是对应的nodeid
                        repeatNodes = {}, //key是重复的nodeid, val是被取代的nodeid
                        ThumbnailTR = d3.zoomIdentity,
                        NT, NTNode, NTLink, NTRect, NTPath, NTSelected, ntsrect, mleft, mtop,
                        viewCenter,
                        startPoint,
                        viewNodeObjs = [],
                        thumbScale = { k: 1, x: 0, y: 0 },
                        nodeAndBoxrange = void 0,//节点和屏幕边界并集[minX, minY, maxX, maxY]
                        js5, stop_ticked = false,
                        tick = 0,
                        fitAllSelectionNodes = null,
                        fitSelectionNode = null;
                    //渲染力导向的DOM
                    function redrawForceContent() {
                        node = nodeGroup.selectAll("g").data(nodeObjs);
                        node = node.enter().append("g")
                            .attr("type", "node")
                            .attr("nodeType", function (d) {
                                return d.nodeType;
                            })
                            .attr("id", function (d) {
                                return 'node-' + d.id;
                            })
                            .merge(node);

                        var circles = node.append('circle')
                            .attr('class', 'clrcle')
                        node.append('path')
                            .attr('d', function (d) {
                                return d.exist && d.image ? '' : d.icon.path
                            })
                            .attr('fill', function (d) {
                                return !d.exist ? '#a1a1a1' : (d.color || (d.icon && d.icon.color));
                            })
                            .attr('transform', function (d) {
                                if (!d.exist) {
                                    return 'translate(-14,-15)scale(0.028)';
                                }
                                return 'translate(-23,-24)scale(0.045)';
                            });

                        node.append('image')
                            .attr('xlink:href', function (d) {
                                return d.exist ? d.image : '';
                            })
                            .attr('style', function (d) {
                                return (!d.image || !d.exist) ? 'display:none' : '';
                            })
                            .attr('width', 65)
                            .attr('height', 75)
                            .attr('transform', function (d) {
                                return 'translate(-19,-22)scale(0.58)';
                            });

                        // node.insert('rect',':first-child')
                        nodeBox.insert('rect', ':first-child')
                            .attr('class', 'noderect')
                            .attr('style', function (d) {
                                if (!d.exist || !d.getPropLength()) {
                                    return 'display:none';
                                }
                            })
                            .attr('stroke', function (d) {
                                return d.color || (d.icon && d.icon.color);
                            })
                            .attr('stroke-width', 1)
                            .attr('fill', '#f2f2f2');

                        node.append("text")
                            .attr('id', function (d) {
                                return 'node-label-' + d.id;
                            })
                            .attr('y', opt.circle.r + 14).attr('text-anchor', 'middle')
                            .selectAll('tspan')
                            .data(function (d) {
                                var a = d.getPropList(),
                                    arr = [];
                                if (a.length > 3) {
                                    arr = a.slice(0, 2);
                                    arr.push('...');
                                } else {
                                    arr = a;
                                }
                                return arr;
                            }).enter().append('tspan').attr('dy', function (d, i) {
                                return 14;
                            }).attr('x', -1).text(function (d) {
                                return d;
                            });

                        link = linkGroup.selectAll("path").data(linkObjs).enter().append("path")
                            .attr("id", function (d) {
                                return "link-" + d.id;
                            })
                            .attr("source", function (d) {
                                return "node-" + d.source.id;
                            })
                            .attr("target", function (d) {
                                return "node-" + d.target.id;
                            })
                            .attr("stroke-width", function (d) {
                                return Math.sqrt(d.value);
                            })
                            .attr("stroke", function (d) {
                                return d.color == undefined || d.color == "" ? "#000" : d.color;
                            })
                            .attr("fill", "none");
                        linkText = linkTextGroup.selectAll("g").data(linkObjs).enter();

                        linkText = linkText.append("g")
                            .attr("id", function (d) {
                                return "link-label-" + d.id;
                            })
                            .attr("source", function (d) {
                                return "link-label-" + d.source.id;
                            })
                            .attr("target", function (d) {
                                return "link-label-" + d.target.id;
                            })
                            .attr('text-anchor', 'middle')
                            .attr('style', function (d) {
                                return d.source == d.target ? 'display:none' : 'display:block';
                            });

                        linkText.append("text")
                            .attr('type', 'linktext')
                            .attr("id", function (d) {
                                return "link-text-" + d.id;
                            })
                            .selectAll('tspan').data(function (d) {
                                return [d.getPropList()[0]];
                            })
                            .enter()
                            .append('tspan')
                            .attr('x', 0)
                            .attr('dy', function (text, i, arr) {
                                return i == 0 ? (arr.length - 1) * -15 / 2 : 15;
                            })
                            .text(function (d) {
                                return d;
                            })
                            .attr('fill', '#666');

                        linkText.insert('rect', ':first-child')
                            .attr('class', 'linkrect')
                            .attr('fill', '#fff')
                            .attr("fill-opacity", function (d) {
                                return !d.getPropLength() ? 0 : 1;
                            })
                            .attr('stroke', '#ccc')
                            .attr('stroke-width', function (d) {
                                return !d.getPropLength() ? 0 : 1;
                            })
                            .attr('id', function (d) {
                                return 'link-label-rect-' + d.id;
                            })
                            .attr('linkid', function (d) {
                                return d.id;
                            })

                            .attr('width', function (d) {
                                return d.getPropWidth();
                            })
                            .attr('height', function (d) {
                                return d.getPropHeight();
                            })
                            .attr('x', function (d) {
                                return 0;
                            })
                            .attr('y', function (d) {
                                return -2;
                            })
                            .attr('rx', 16)
                            .attr('ry', 16);

                        var ellipsis = linkText.append('g')
                            .attr('class', 'ellipsis')
                            .attr('style', 'display:none');

                        ellipsis.append('circle')
                            .attr('r', 14)
                            .attr('fill', '#fff')
                            .attr('stroke-width', 1)
                            .attr('stroke', '#dadada')
                        ellipsis.append('text')
                            .attr('style', 'font-size:16px')
                            .text('...')

                        var more = linkText.append('g')
                            .attr('class', function (d) {
                                return d.getPropLength() > 1 ? 'more' : 'nomore'
                            });
                        more.append('circle')
                            .attr('r', 5)
                            .attr('fill', '#fff')
                            .attr('stroke-width', 1)
                            .attr('stroke', '#8b8b8b')
                        more.append('text').text('...')

                        //显示标签
                        addEvent();
                    }
                    // 渲染树形结构的DOM
                    function redrawTreeContent(flag = true) {
                        var hideId = '';
                        node = nodeGroup.selectAll("g").data(nodeObjs);
                        node = node.enter().append("g")
                            .attr("type", "node")
                            .attr("nodeType", function (d) {
                                return d.data.nodeType;
                            })
                            .attr('style', function (d) {
                                if (!d.data.exist) {
                                    hideId = d.data.id;
                                    return 'display:none';
                                }
                                return '';
                            })
                            .attr("id", function (d) {
                                return 'node-' + d.data.id;
                            })
                            .classed('node', true)
                            .merge(node);
                        createCardNodeElement(node, "data")
                        createCardLinkElement(linkGroup, hideId, "");
                        if (opt.node.isEdit && flag) drawTreeSideButton();
                        //显示标签
                        draw();
                        // viewData();
                        graphContainer.attr('style', 'display:block;');
                        graph.displayAdapt();
                        addEvent();
                        // console.log('加载')
                        // Thumbnail();
                    }
                    // 渲染层次结构的DOM
                    function redrawLevelContent() {
                        // 添加层次图的外边框
                        var rectBox = container.insert('rect', ':first-child')
                            .attr('class', 'rect-box');
                        let tmps = nodeObjs.filter(x => {
                            return x.data.typeName == opt.workObjectTitle
                        })
                        let tmpObjs = nodeObjs
                        if (tmps.length > 0 && tmps[0].data.nodes.length <= 0) {
                            tmpObjs = tmps
                        }
                        node = nodeGroup.selectAll("g").data(tmpObjs);
                        // node = nodeGroup.selectAll("g").data(nodeObjs);
                        node = node.enter().append("g")
                            .attr("nodeType", function (d) {
                                return d.data.nodeType;
                            })
                            .attr("id", function (d) {
                                return 'node-' + d.id;
                            })
                            .classed('node-list', true)
                            .merge(node);
                        var nodeLevelGroup = node.append('g')
                            .attr('class', 'node-level-group')
                            .attr('transform', function (d, i) {
                                return 'translate(0, 0)';
                            });

                        var nodeLeftGroup = nodeLevelGroup.append('g')
                            .attr('class', 'node-left-group')
                            .attr('transform', function (d, i) {
                                return 'translate(0, 10)';
                            });
                        var nodeLeft = nodeLeftGroup.append('rect')
                            .attr("width", 2)
                            .attr("height", 24)
                            .attr('class', 'node-level-left')
                            .attr('stroke', function (d) {
                                return d.data.color || opt.levelTypeColor[d.data.typeName] || '#d7d7d7'
                            })
                            .attr('stroke-width', 2)
                            .attr('fill', function (d) {
                                return 'transparent'
                            })
                            .attr('y', -(opt.circle.r))
                            .attr('x', function (d) {
                                return 10;
                            })
                        var nodeLeftText = nodeLeftGroup.append('text')
                            .attr('class', 'node-level-left-text')
                            .attr("x", 25)
                            .attr('y', -13)
                            .attr('font-size', '18')
                            .attr('font-weight', 'bold')
                            .text(function (d) {
                                return d.data.typeName + ' (' + d.data.nodes.length + ')'
                            });
                        var nodeRightGroup = nodeLevelGroup.append('g')
                            .attr('class', 'node-right-group')
                            .attr('transform', function (d, i) {
                                let x = opt.nodeEleSize.width / 2 + 25
                                let y = opt.nodeEleSize.height / 2 + 28
                                return `translate(${x}, ${y})`;
                            });
                        // 创建卡片信息Node
                        var nodeRight = nodeRightGroup.selectAll('g')
                            .data(function (d, i) {
                                return d.data.nodes
                            })
                            .enter()
                            .append('g')
                            .attr("type", "node")
                            .attr('class', 'node')
                            .attr("id", function (d) {
                                return 'node-' + d.data.id;
                            })
                            .attr('transform', function (d, i) {
                                var x = 0;
                                var y = 0;
                                y = parseInt(i / 4) * (opt.nodeEleSize.height + 35);
                                x = (i % 4) * (opt.nodeEleSize.width + 20)
                                d.x = x + d.x;
                                d.y = y + d.y;
                                return 'translate(' + x + ', ' + y + ')';
                            })
                            .attr('x', function (d) {
                                return d.x
                            })
                            .attr('y', function (d) {
                                return d.y
                            });

                        createCardNodeElement(nodeRight, "data")
                        if (opt.node.isEdit) {
                            createCardEditButtonHorizontal(nodeRightGroup, {
                                width: opt.nodeEleSize.width,
                                height: opt.nodeEleSize.height,
                                sideBUttonText: d => d.type,
                                nodeType: d => d.type,
                                display: d => {
                                    return d.data && d.data.nodes.length >= 1 && d.data.typeName == opt.workObjectTitle ? 'display:none' : ''
                                },
                                rectX: opt.nodeEleSize.width / 2 + 8,
                                rectY: -(opt.nodeEleSize.height / 2),
                                textX: (opt.nodeEleSize.width + 10),
                                textY: opt.nodeEleSize.height / 2 - 40,
                                pathX: opt.nodeEleSize.width,
                                pathY: opt.nodeEleSize.height / 2 - 30,
                                textData: () => opt.node.right,
                                transform: d => {
                                    var x = 0;
                                    var y = 0;
                                    let childs = (d.data && d.data.nodes) || [];
                                    let childLength = childs.length + (opt.node.isEdit ? 1 : 0);
                                    let row = childLength % 4 != 0 ? parseInt(childLength / 4) + 1 : parseInt(childLength / 4);
                                    y = (row == 1 && parseInt(childLength / 4) == row) ? (row - 1) * (opt.nodeEleSize.height + 35) : (row - 1) * (opt.nodeEleSize.height + 35);
                                    x = (parseInt(childs.length % 4) - 1) * (opt.nodeEleSize.width + 20) + 10;
                                    return 'translate(' + x + ', ' + y + ')';
                                }
                            })
                        }
                        graphContainer.attr('style', 'display:block;');
                        var lineData = tmpObjs.map((x, i) => i);
                        var lineGroup = node.append("line")
                            .attr("x1", 0)
                            .attr('stroke', function (d, i) {
                                return i == lineData.length - 1 ? "transparent" : "#d7d7d7"
                            })
                            .attr('stroke-width', 2);
                        node
                            .attr("transform", function (d, i) {
                                d.x = 0;
                                return "translate(" + d.x + "," + d.y + ")";
                            }).attr("x", d => d.x)
                            .attr("y", d => d.y);
                        lineGroup
                            .attr('y1', (d, i) => _calculateLevelLineDriverPath(d, i))
                            .attr('x2', 1280)
                            .attr('y2', (d, i) => _calculateLevelLineDriverPath(d, i));
                        var va = document.getElementById('viewArea').getBBox();
                        rectBox.attr('width', 1280)
                            .attr('height', va.height + 60)
                            .attr('stroke', '#d7d7d7')
                            .attr('stroke-width', 3)
                            .attr('fill', function (d) {
                                return 'transparent'
                            });
                        graph.displayAdapt();
                        addEvent();
                    }
                    // 计算层次图分隔线的位置
                    function _calculateLevelLineDriverPath(d, i) {
                        let childs = (d.data && d.data.nodes) || [];
                        if (d.data && d.data.typeName == opt.workObjectTitle) {
                            if (childs.length <= 4) {
                                return 200;
                            } else {
                                let childLength = childs.length + (opt.node.isEdit ? 1 : 0);
                                let row = childLength % 4 != 0 ? parseInt(childLength / 4) + 1 : parseInt(childLength / 4);
                                row = row == 0 ? 1 : row;
                                return (row - 1) * (opt.nodeEleSize.height + 35) + 200;
                            }
                        } else {
                            let childLength = childs.length + (opt.node.isEdit ? 1 : 0);
                            let row = childLength % 4 != 0 ? parseInt(childLength / 4) + 1 : parseInt(childLength / 4);
                            row = row == 0 ? 1 : row;
                            return (row - 1) * (opt.nodeEleSize.height + 35) + 200;
                        }
                    }
                    // 渲染层次树形结构DOM
                    function redrawLevelTreeContent() {
                        redrawTreeContent(false);
                    }
                    // 渲染社会关系树结构的DOM
                    function redrawSocialTreeContent() {
                        var hideIds = [];
                        var nodes = nodeObjs
                        node = nodeGroup.selectAll("g").data(nodes);
                        node = node.enter().append("g")
                            .attr("nodeType", function (d) {
                                return d.data.nodeType;
                            })
                            .attr('style', function (d) {
                                if (d.data.id == 'root' || !d.data.exist) {
                                    hideIds.push(d.data.id);
                                    return 'display:none';
                                }
                                if (d.data.type && d.data.dtype != 'root') {
                                    hideIds.push(d.data.id);
                                }
                                return '';
                            })
                            .classed('parent-node', true)
                            .merge(node);
                        var nodeRectBox = node.append('rect')
                            .attr('class', 'node-rect-box')
                            .attr('style', function (d) {
                                if (d.data.nodeType == 'QB_ZP_TP' || d.data.id == 'root') {
                                    return 'display:none'
                                }
                            });

                        var childNodeGroup = node.append('g')
                            .attr('class', 'child-nodes')
                            .attr('style', function (d) {
                                if (d.data.id == 'root') {
                                    hideIds.push(d.data.id);
                                    return 'display:none'
                                }
                            });
                        var childNode = childNodeGroup.selectAll('g.node')
                            .data(function (d) {
                                if (d.parent == null || d.data.nodeType == 'QB_ZP_TP' || (d.data.nodeType == 'QB_ZP_RY' && d.parent.data.nodeType == 'QB_ZP_TP')) {
                                    let arr = [d.data];
                                    let tmpArr = arr.map(c => {
                                        return {
                                            data: c,
                                            parent: d.parent,
                                            length: arr.length,
                                            x: d.x,
                                            y: d.y
                                        }
                                    })
                                    return tmpArr
                                } else {
                                    let arr = d.children
                                    let tmpArr = arr.map(c => {
                                        return {
                                            data: c.data,
                                            parent: d.parent,
                                            length: arr.length,
                                            x: c.x,
                                            y: c.y
                                        }
                                    })
                                    return tmpArr;
                                }
                            })
                            .enter()
                            .append('g')
                            .attr("type", "node")
                            .attr('class', 'node')
                            .attr('id', function (d) {
                                return 'node-' + d.data.id
                            })
                            .attr('transform', function (d, i) {
                                var x = 0;
                                var y = 0;
                                if (d.data.id != 'root' && d.data.dtype != 'root' && d.data.children.length <= 0) {
                                    if (d.length < 2) {
                                        y = parseInt(i / 2) * (opt.nodeEleSize.height + 35) + opt.circle.r * 2;
                                        x = (i % 2) * (opt.nodeEleSize.width + 20)
                                    } else {
                                        y = parseInt(i / 2) * (opt.nodeEleSize.height + 35) + opt.circle.r * 2;
                                        x = (i % 2) * (opt.nodeEleSize.width + 20) - (opt.nodeEleSize.width + 20) / 2
                                    }
                                }
                                // d.y = y + d.y;
                                // d.x = x + d.x;
                                return 'translate(' + x + ', ' + y + ')';
                            })
                            .attr('x', function (d) {
                                return d.x
                            })
                            .attr('y', function (d) {
                                return d.y
                            });

                        createCardNodeElement(childNode, 'data');
                        //给第一个人员的根节点添加添加按钮
                        if (opt.node.isEdit) {
                            createEditButtonHorizontal(childNode, {
                                width: opt.nodeEleSize.width,
                                height: 30,
                                sideBUttonText: d => {
                                    return d.data ? d.data.dtype : null
                                },
                                nodeType: d => d.data.nodeType,
                                display: d => {
                                    if (d.data.nodeType == 'QB_ZP_RY' && d.parent && d.parent.data.nodeType == 'QB_ZP_TP') {
                                        return "cursor: default;"
                                    } else {
                                        return "display:none"
                                    }
                                },
                                rectX: -(opt.nodeEleSize.width / 2),
                                rectY: opt.nodeEleSize.height / 2 + 10,
                                textY: opt.nodeEleSize.height / 2 + 10 + 20,
                                textData: () => { return [opt.node.right] }
                            })
                        }
                        // 类型的渲染
                        node.append('rect')
                            .attr('height', 35)
                            .attr('width', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return (opt.nodeEleSize.width + 6);
                                } else {
                                    if (d.children && d.children.length >= 2) {
                                        return (opt.nodeEleSize.width * 2 + 60);
                                    } else {
                                        return (opt.nodeEleSize.width + 40);
                                    }
                                }
                            })
                            .attr('fill', '#0668c8')
                            .attr('x', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return -(opt.nodeEleSize.width / 2 + 3);
                                } else {
                                    if (d.children.length < 2) {
                                        return -(opt.nodeEleSize.width / 2 + 20);
                                    } else {
                                        return -(opt.nodeEleSize.width * 2 + 60) / 2
                                    }
                                }
                            })
                            .attr('y', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return -opt.nodeEleSize.height / 2 - 35
                                } else {
                                    return -opt.nodeEleSize.height / 2
                                }
                            })
                            .attr('style', function (d) {
                                if (d.data.nodeType == 'QB_ZP_TP' || !d.data.exist) {
                                    return 'display:none'
                                }
                            });
                        var nodeRectBoxText = node.append('text')
                            .attr('class', 'node-rect-box-text')
                            .attr("text-anchor", "middle")
                            .attr('style', function (d) {
                                if (d.data.id == 'root' || !d.data.exist) {
                                    return "display:none"
                                } else {
                                    return "cursor: default;"
                                }
                            })
                            .attr("y", function (d) {
                                if (_socialTreeCondition(d)) {
                                    return -opt.nodeEleSize.height / 2 - 35 + 24
                                } else {
                                    return -opt.nodeEleSize.height / 2 + 24
                                }
                            })
                            .attr("fill", '#fff')
                            .text(function (d) {
                                let type = d.data.type;
                                if (d.data.dtype != 'root') {
                                    type = type + ' (' + d.children.length + ')'
                                }
                                return type
                            })
                            .attr('style', function (d) {
                                if (d.data.nodeType == 'QB_ZP_TP') {
                                    return 'display:none'
                                }
                            });
                        createCardLinkElement(linkGroup, hideIds, "");
                        draw();
                        // viewData();
                        nodeRectBox
                            .attr('width', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return (opt.nodeEleSize.width + 6);
                                } else {
                                    if (d.children && d.children.length >= 2) {
                                        return (opt.nodeEleSize.width * 2 + 60);
                                    } else {
                                        return (opt.nodeEleSize.width + 40);
                                    }
                                }
                            })
                            .attr('height', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return (opt.nodeEleSize.height + 5);
                                } else {
                                    let childs = (d.data && d.data.children) || [];
                                    let row = childs.length % 2 != 0 ? parseInt(childs.length / 2) + 1 : parseInt(childs.length / 2);
                                    return row * (opt.nodeEleSize.height + 35) + opt.circle.r * 2;
                                }
                            })
                            .attr('x', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return -(opt.nodeEleSize.width / 2 + 3);
                                } else {
                                    if (d.children.length < 2) {
                                        return -(opt.nodeEleSize.width / 2 + 20);
                                    } else {
                                        return -(opt.nodeEleSize.width * 2 + 60) / 2
                                    }
                                }
                            })
                            .attr('y', -opt.nodeEleSize.height / 2)
                            .attr('stroke', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return 'transparent'
                                } else {
                                    return '#d7d7d7'
                                }
                            })
                            .attr('stroke-width', 3)
                            .attr('fill', function (d) {
                                if (_socialTreeCondition(d)) {
                                    return 'transparent'
                                } else {
                                    return '#fff'
                                }
                            });
                        graphContainer.attr('style', 'display:block;');
                        graph.displayAdapt();
                        addEvent();
                    }
                    // 社会关系分组图计算条件
                    function _socialTreeCondition(d) {
                        return d.parent && d.parent.data.id == 'root' || (d.data.nodeType == 'QB_ZP_RY' && d.parent && d.parent.data.nodeType == 'QB_ZP_TP')
                    }
                    // 渲染力导向图元素为卡片形式的DOM
                    function redrawForceCardContent() {
                        node = nodeGroup.selectAll("g").data(nodeObjs);
                        node = node.enter().append("g")
                            .attr("type", "node")
                            .attr("nodeType", function (d) {
                                return d.nodeType;
                            })
                            .attr("id", function (d) {
                                d = opt.type == 'tree' ? d.data : d;
                                return 'node-' + d.id;
                            })
                            .classed('node', true)
                            .merge(node);
                        createCardNodeElement(node)
                        createForceLinkElement("");
                        if (linkObjs.length >= 200) {
                            simulation
                                .alphaMin(0.01)
                                .alphaTarget(0)
                                .alphaDecay(0.05)
                                .velocityDecay(0.2);
                        }
                        simulation.nodes(nodeObjs)
                            .on("tick", ticked);
                        simulation
                            .on("end", ticked_end);
                        simulation
                            .force("link")
                            .links(linkObjs);
                        addEvent();
                        graphContainer.attr('style', 'display:block;');
                        graph.displayAdapt();
                    }
                    // 渲染力导向图元素为圆形形式的DOM
                    function redrawForceCircleContent() {
                        node = nodeGroup.selectAll("g").data(nodeObjs);
                        node = node.enter().append("g")
                            .attr("type", "node")
                            .attr("nodeType", function (d) {
                                return d.nodeType;
                            })
                            .attr("id", function (d) {
                                return 'node-' + d.id;
                            })
                            .classed('node', true)
                            .merge(node);
                        createCircleNodeElement(node)
                        createForceLinkElement("")
                        simulation.nodes(nodeObjs)
                            .on("tick", ticked);
                        simulation
                            .on("end", ticked_end);
                        simulation
                            .force("link")
                            .links(linkObjs);
                        addEvent();
                        graphContainer.attr('style', 'display:block;');
                        graph.displayAdapt();
                    }
                    // 创建卡片元素
                    function createCardNodeElement(nodeRight, property = "") {
                        //实体最外层外框
                        var nodeBox = nodeRight.append('rect')
                            .attr("width", opt.nodeEleSize.width)
                            .attr("height", opt.nodeEleSize.height)
                            .attr("nodeType", function (d) {
                                return formatNodeElementData(d, property).nodeType;
                            })
                            .attr('class', 'node-box')
                            .attr('fill', function (d) {
                                var nodeType = formatNodeElementData(d, property).nodeType
                                if (nodeType == 'QB_ZP_TP') {
                                    return 'rgba(0,0,0,0)';
                                } else {
                                    return '#fff'
                                }
                            })
                            .attr('style', function (d) {
                                var nodeType = formatNodeElementData(d, property).nodeType
                                if (nodeType == 'QB_ZP_TP') {
                                    return 'display:none';
                                }
                            })
                            .attr("stroke", function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType == 'QB_ZP_TP') {
                                    return 'rgba(0,0,0,0)';
                                } else {
                                    return data.borderColor || data.color || '#d7d7d7'; //绿色边框
                                }
                            })
                            .attr('stroke-width', 5)
                            .attr('y', -(opt.nodeEleSize.height / 2))
                            .attr('x', function (d) {
                                return - opt.nodeEleSize.width / 2;
                            })
                            .attr("rx", "5");
                        // 图谱标识
                        nodeRight.insert('circle', ':first-child')
                            .attr('class', 'node-circle')
                            .attr('r', 40)
                            .attr('fill', '#fff')
                            .attr("stroke", function (d) {
                                var data = formatNodeElementData(d, property)
                                // return data.icon ? (data.icon.color) : '#d7d7d7';
                                return !data.exist ? '#a1a1a1' : (data.color || (data.icon && data.icon.color));
                            })
                            .attr('stroke-width', 5)
                            .attr('style', function (d) { //判断是叠加姻亲的隐藏图谱类型
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType == 'QB_ZP_TP' && data.isShow == false) {
                                    return 'display:block';
                                } else {
                                    return 'display:none';
                                }
                            })
                            .on("mousemove", function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.opacity == undefined || data.opacity == 1) {
                                    createPanel(data, d3.event);
                                }
                            })
                            .on("mouseout", function () {
                                var selector = document.querySelector(opt.selector);
                                var panel = selector.querySelector('.panel');
                                if (panel) panel.style.display = 'none'
                            });
                        // 图谱标识中图谱类型的Path
                        nodeRight.append('path')
                            .classed('node-path', true)
                            .attr('d', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.exist && data.image ? '' : (data.icon ? data.icon.path : "")
                            })
                            .attr('fill', function (d) {
                                var data = formatNodeElementData(d, property)
                                return !data.exist ? '#a1a1a1' : (data.color || (data.icon && data.icon.color));
                            })
                            .attr('transform', function (d) {
                                var data = formatNodeElementData(d, property)
                                if (!data.exist) {
                                    return 'translate(-7,-8)scale(0.028)';
                                }
                                return 'translate(-23,-23)scale(0.045)';
                            })
                            .attr('style', function (d) { //判断是叠加姻亲的隐藏图谱类型
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType == 'QB_ZP_TP' && data.isShow == false) {
                                    return 'display:block';
                                } else {
                                    return 'display:none';
                                }
                            })
                            .on("mouseover", function (d) {
                                var data = formatNodeElementData(d, property);
                                if (data.opacity == undefined || data.opacity == 1) {
                                    if (data.nodeType == 'QB_ZP_TP') {
                                        var selector = document.querySelector(opt.selector);
                                        var panel = selector.querySelector('.panel');
                                        if (panel) {
                                            // panel.style.display = 'block'; // 此处事件重复了，创建面板createPanel时，已经判断了
                                        }
                                    }
                                }
                            })
                            .on("mouseout", function () {
                                var selector = document.querySelector(opt.selector);
                                var panel = selector.querySelector('.panel');
                                // if (panel) panel.style.display = 'block'
                            });
                        // 人员图片
                        nodeRight.append('image')
                            .attr('xlink:href', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.exist ? data.image : '';
                            })
                            .attr('style', function (d) {
                                var data = formatNodeElementData(d, property)
                                return (!data.image || !data.exist) ? 'display:none' : '';
                            })
                            .attr('width', opt.nodeEleSize.width / 3) //137
                            .attr('height', 165 * (opt.nodeEleSize.width / 3) / 137) //165
                            .attr('transform', function (d) {
                                let imageScale = { k: 1, x: 0, y: 0 };
                                imageScale.x = -opt.nodeEleSize.width / 2 + 2;
                                imageScale.y = -opt.nodeEleSize.height / 2 + 2;
                                return `translate(${imageScale.x},${imageScale.y})scale(${imageScale.k})`;
                            })
                            .on("mouseover", function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.opacity == undefined || data.opacity == 1) {
                                    if (data.nodeType == 'QB_ZP_RY') {
                                        createPanel(data, d3.event);
                                    }
                                }
                            })
                            .on("mouseout", function () {
                                var selector = document.querySelector(opt.selector);
                                var panel = selector.querySelector('.panel');
                                if (panel) panel.style.display = 'none'
                            });

                        // 五位一体,属性数
                        var fiveAttrTag = nodeRight.append('g')
                            .attr('class', 'fiveAttrTag')
                            .attr('transform', function (d, i) {
                                let x = -opt.nodeEleSize.width / 2 + opt.nodeEleSize.width / 3 + 8
                                let y = -opt.nodeEleSize.height / 2 + 6 + 61 + 24
                                return `translate(${x}, ${y})`;
                            })
                            .filter(d => {
                                var data = formatNodeElementData(d, property)
                                return data.nodeType == 'QB_ZP_RY'
                            });
                        fiveAttrTag.append('text')
                            .classed('rybqAttr', true)
                            .attr('y', 15)
                            .text(d => {
                                var data = formatNodeElementData(d, property)
                                var a = data.getPropList()
                                let RYBQList = a.filter(x => x.name == 'RYBQ')
                                if (RYBQList.length > 0) {
                                    let item = RYBQList[0]
                                    if (item.val != item.label + "数：0") { //标签数
                                        var bq = item.val.split(',');
                                        item.val = item.label + "数：" + bq.length;
                                    }
                                    return item.val
                                } else {
                                    return opt.properties['RYBQ'] + "数：0"
                                }
                            })
                        var tlisFive = fiveAttrTag.selectAll('g')
                            .data(function (d) {
                                var data = formatNodeElementData(d, property)
                                var fiveOne = [];
                                if (data.nodeType != 'QB_ZP_TP' && data.nodeType != 'QB' && data.properties && data.properties.FIVE_ONE_PROPERTY) {
                                    if (data.properties.FIVE_ONE_PROPERTY.indexOf(',') != -1) {
                                        var fiveArr = data.properties.FIVE_ONE_PROPERTY.split(',');
                                        fiveArr.sort(function (a, b) {
                                            return opt.fiveOneArr.indexOf(a) - opt.fiveOneArr.indexOf(b);
                                        })
                                        fiveOne = fiveArr;
                                    } else {
                                        fiveOne.push(data.properties.FIVE_ONE_PROPERTY);
                                    }
                                }
                                var arrs = [];
                                for (var key in fiveOne) {
                                    arrs.push({
                                        type: fiveOne[key],
                                        tps: data.tplxs[key],
                                        name: data.properties.XM,
                                        relationName: data.gxmc,
                                        color: opt.fiveTagColor[fiveOne[key]],
                                        oid: data.oid,
                                        tpids: data.tpids,
                                        parentTpid: data.tpid, //多图串并时，当前叶子节点的根节点 parentTpid
                                        sfzhm: data.properties.SFZHM,
                                    });
                                }
                                return arrs;
                            })
                            .enter()
                            .append('g')
                            .attr('class', 'tlisFive')
                            .attr('transform', function (d, i) {
                                return 'translate(' + (i * 19 + 65) + ', 0)';
                            });

                        tlisFive.append('path')
                            .attr('class', 'tlisFivepath')
                            .attr('fill', function (d) {
                                return d.color;
                            })
                            .attr('transform', 'translate(-1, -1),scale(0.08)')
                            .attr('d', function (d, i) {
                                var paths = opt.fiveTagPath
                                return paths[d.type];
                            });

                        //关系名称
                        nodeRight.append('text')
                            .attr('class', 'gxmc')
                            .attr("y", function (d) {
                                var data = formatNodeElementData(d, property)
                                return opt.node.isEdit && opt.node.bottom ? opt.nodeEleSize.height / 2 + 22 + 38 : opt.nodeEleSize.height / 2 + 22
                                // return data.pid ? 105 : (opt.node.isEdit && opt.node.bottom ? 145 : 105)
                            })
                            .attr("text-anchor", "middle")
                            .append('tspan')
                            .attr("font-size", 14)
                            .attr("fill", "#f86d73")
                            .text(function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.gxmc
                            });
                        nodeBox.insert('rect', ':first-child')
                            .attr('class', 'noderect')
                            .attr('style', function (d) {
                                var data = formatNodeElementData(d, property)
                                if (!data.exist || !data.getPropLength()) {
                                    return 'display:none';
                                }
                            })
                            .attr('stroke', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.color || (data.icon && data.icon.color);
                            })
                            .attr('stroke-width', 1)
                            .attr('fill', '#f2f2f2');
                        // 人员状态
                        var labelGroup = nodeRight.append('g')
                            .classed('personal-label', true)
                            .attr('x', -opt.nodeEleSize.width / 2 + 2)
                            .attr('y', 165 * (opt.nodeEleSize.width / 3) / 137 - (opt.nodeEleSize.height / 2) + 2)
                            .attr('transform', function (d) {
                                let imageScale = { k: 1, x: 0, y: 0 };
                                imageScale.x = -opt.nodeEleSize.width / 2 + 2;
                                imageScale.y = 165 * (opt.nodeEleSize.width / 3) / 137 - (opt.nodeEleSize.height / 2) + 2;
                                return `translate(${imageScale.x},${imageScale.y})scale(${imageScale.k})`;
                            })
                            .filter(d => {
                                var data = formatNodeElementData(d, property)
                                return data.nodeType == 'QB_ZP_RY'
                            });
                        var label = labelGroup.append("rect")
                            .attr("width", opt.nodeEleSize.width / 3)
                            .attr("height", 21)
                            .attr('fill', function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType != 'QB_ZP_TP') {
                                    if (data.properties && data.properties.STATE) {
                                        return '#' + data.properties.STATE_COLOR;
                                    } else {
                                        return '#ccc'
                                    }
                                } else {
                                    return 'rgba(0,0,0,0)'
                                }
                            });

                        labelGroup.append('text')
                            .attr("text-anchor", "middle")
                            .attr("dx", '3.8em')
                            .attr("dy", '1.2em')
                            .append("tspan")
                            .attr("fill", (d) => {
                                var data = formatNodeElementData(d, property)
                                if (data.properties && data.properties.STATE && data.properties.STATE_COLOR == 'ffe900') {
                                    return '#666';
                                } else {
                                    return '#fff'
                                }
                            })
                            .attr("font-size", 13)
                            .text(function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType != 'QB_ZP_TP') {
                                    if (data.properties && data.properties.STATE) {
                                        return data.properties.STATE;
                                    } else {
                                        return '空'
                                    }
                                }
                            });

                        // 添加风险等级\案件、线索
                        var riskGroup = nodeRight.append('g')
                            .classed('risk-anjian-group', true)
                            .attr('transform', d => {
                                let x = -opt.nodeEleSize.width / 2 + opt.nodeEleSize.width / 3 + 8
                                let y = -opt.nodeEleSize.height / 2 + 6 + 61
                                return `translate(${x}, ${y})`;
                            })
                            .filter(d => {
                                var data = formatNodeElementData(d, property)
                                return data.nodeType == 'QB_ZP_RY'
                            })
                        riskGroup = riskGroup.selectAll('g.risk-anjian')
                            .data(function (d) {
                                var data = formatNodeElementData(d, property)
                                let arr = []
                                if (data.riskLevel) {
                                    let riskObj = data.riskLevel
                                    arr.push({
                                        key: 'risk',
                                        name: riskObj.levelLabel,
                                        val: riskObj.score,
                                        color: riskObj.color,
                                        sfzhm: data.properties.SFZHM,
                                        node: data
                                    })
                                }
                                if (data.caseClueStats) {
                                    let caseClueStats = data.caseClueStats
                                    caseClueStats.forEach(x => {
                                        if (x.name == '案件') {
                                            arr.push({
                                                key: 'anjian',
                                                name: x.name,
                                                val: x.count,
                                                color: '#d74348',
                                                sfzhm: data.properties.SFZHM,
                                                node: data
                                            })
                                        } else if (x.name == '线索') {
                                            arr.push({
                                                key: 'line',
                                                name: x.name,
                                                val: x.count,
                                                color: '#4264d7',
                                                sfzhm: data.properties.SFZHM,
                                                node: data
                                            })
                                        }
                                    })
                                }
                                return arr;
                            })
                            .enter()
                            .append('g')
                            .classed('risk-anjian', true)
                            .attr('transform', (d, i) => {
                                let x = i * 60
                                return `translate(${x}, 0)`;
                            })
                        riskGroup.append('rect')
                            .attr('rx', 1)
                            .attr('stroke-width', 1)
                            .attr('stroke', (d, i) => {
                                return d.color || '#d7d7d7'
                            })
                            .attr('fill', d => {
                                if (d.key == 'risk') {
                                    return d.color
                                } else if (d.key == 'anjian') {
                                    return '#ffffff'
                                } else if (d.key == 'line') {
                                    return '#ffffff'
                                }
                                return '#ffffff'
                            })
                            .attr('width', 56)
                            .attr('height', 20)
                            .on('click', (d) => {
                                d3.event.preventDefault();
                                d3.event.stopPropagation();
                                opt.caseClueEvt(d);
                            });
                        riskGroup.append('text')
                            .attr('dx', 3)
                            .attr('dy', '1.3em')
                            .attr('fill', d => {
                                if (d.key == 'risk') {
                                    return '#ffffff'
                                } else if (d.key == 'anjian') {
                                    return d.color
                                } else if (d.key == 'line') {
                                    return d.color
                                }
                                return '#000000'
                            })
                            .text(d => {
                                return d.name + ": " + d.val
                            })
                            .attr('cursor', 'default')
                            .on('click', (d) => {
                                d3.event.preventDefault();
                                d3.event.stopPropagation();
                                opt.caseClueEvt(d);
                            });
                        // 人员姓名、地址、身份证号,属性数等
                        nodeRight.append("text")
                            .attr('class', 'eletext')
                            .attr('id', function (d) {
                                var data = formatNodeElementData(d, property)
                                return 'node-label-' + data.id;
                            })
                            .attr('y', function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType != 'QB_ZP_TP') {
                                    return -(opt.nodeEleSize.height / 2) + 6;
                                } else {
                                    return 45;
                                }
                            })
                            .attr('x', function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType != 'QB_ZP_TP') {
                                    return -25; //卡片缩小
                                } else {
                                    return 0;
                                }
                            })
                            .attr('text-anchor', function (d) {
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType == 'QB_ZP_TP') {
                                    return 'middle';
                                }

                            })
                            .attr('style', function (d) { //判断是叠加姻亲的隐藏图谱类型
                                var data = formatNodeElementData(d, property)
                                if (data.nodeType == 'QB_ZP_TP' && data.isShow == true) {
                                    return 'display:none';
                                } else {
                                    return 'display:block';
                                }
                            })
                            .selectAll('tspan')
                            .data(function (d) {
                                var data = formatNodeElementData(d, property)
                                var a = data.getPropList(),
                                    arr = [];
                                a.forEach(x => {
                                    var tmpPropArr = []
                                    x.opacity = data.opacity
                                    x.nodeId = data.id
                                    if (x.name == 'HJD') {
                                        if (x.val.indexOf('新疆维吾尔自治区') != -1) {
                                            x.val = x.val.replace('新疆维吾尔自治区', '');
                                        } else if (x.val.indexOf('新疆') != -1) {
                                            x.val = x.val.replace('新疆', '')
                                        } else if (x.val.indexOf('阿克苏地区') != -1) {
                                            x.val = x.val.replace('阿克苏地区', '')
                                        }
                                        x.vals = x.val;
                                        if (x.val.length >= 14) {
                                            x.val = x.val.substring(0, 11) + '...';
                                        } else {
                                            x.val = x.val;
                                        }
                                    } else if (x.name == 'mapName' || x.name == 'deptName') {
                                        // x.val = '很多时候，当我们电脑安装多个浏览器时，会有一个默认的浏览器设置，这样在通过链接打开网页时，会直接开启该浏览器，那么WIN10中如何设置呢，小编手把手教您。'
                                        x.vals = x.val;
                                        if (x.val.length > 20) {
                                            x.val = x.val.substring(0, 20);
                                            var subVals = x.vals.substring(20)
                                            var rows = subVals.length % 20 != 0 ? parseInt(subVals.length / 20) + 1 : parseInt(subVals.length / 20);
                                            for (var i = 0; i < rows; i++) {
                                                if (i == 1) {
                                                    tmpPropArr.push({
                                                        vals: x.vals,
                                                        name: x.name,
                                                        val: subVals.substring(0, 18) + '...',
                                                        opacity: data.opacity,
                                                        nodeId: data.id
                                                    })
                                                    subVals = subVals.substring(18)
                                                } else if (i < 1) {
                                                    tmpPropArr.push({
                                                        vals: x.vals,
                                                        name: x.name,
                                                        val: subVals.substring(0, 20),
                                                        opacity: data.opacity,
                                                        nodeId: data.id
                                                    })
                                                    subVals = subVals.substring(20)
                                                }
                                            }
                                        } else {
                                            x.val = x.val;
                                        }
                                    }
                                    if (x.name != 'GXMC' && x.name != 'RYBQ') {
                                        arr.push(x)
                                        arr.push.apply(arr, tmpPropArr)
                                    }
                                })
                                return arr;
                            }).enter().append('tspan').attr('fill', function (d) {
                                var data = d
                                if (data.name == 'GXMC') {
                                    return '#f86d73';
                                } else if (data.name == 'XM') {
                                    return '#000';
                                }
                            }).attr('dy', function (d, i) {
                                var data = d
                                if (data.name == 'GXMC') { //控制关系名称字段下移
                                    return 57; //卡片缩小
                                } else {
                                    return 17;
                                }
                            }).attr('font-weight', function (d) {
                                var data = d
                                if (data.name == 'XM') {
                                    return 'bold';
                                }
                            })
                            .attr('x', function (d) {
                                var data = d
                                if (data.name == 'mapName') {
                                    return 0;
                                } else if (data.name == 'deptName') {
                                    return 0;
                                } else if (data.name == 'GXMC') { //控制关系名称字段下移
                                    // return -20;  //卡片缩小
                                    return -20;
                                } else {
                                    // return -70;  //卡片缩小
                                    let x = -opt.nodeEleSize.width / 2 + opt.nodeEleSize.width / 3 + 8
                                    return x;
                                }
                            }).html(function (d) {
                                var data = d
                                return ('' + data.val).replace(eval('/' + opt.highlightText + '/g'), '<tspan fill="red">' + opt.highlightText + '</tspan>');
                            }).attr('font-size', function (d) {
                                if (d.name == "HJD") {
                                    //return 7;
                                    return 12;
                                } else if (d.name == "GXMC") {
                                    return 14;
                                } else {
                                    return 12;
                                }
                            }).on("mouseover", function (d) {
                                var id = "#node-" + d.nodeId
                                let nodeTmp = d3.select(id)._groups;
                                let parentNodeTmp = null
                                if (nodeTmp.length > 0) {
                                    parentNodeTmp = nodeTmp[0][0].__data__
                                }
                                if ((parentNodeTmp && (parentNodeTmp.data ? (parentNodeTmp.data.opacity == undefined || parentNodeTmp.data.opacity == 1) : (parentNodeTmp.opacity == undefined || parentNodeTmp.opacity == 1)))) {
                                    if (d.name == 'HJD' && d.val.indexOf('...') != -1) {
                                        createTitleBox(d, d3.event)
                                    }
                                }
                            }).on("mouseout", function () {
                                var selector = document.querySelector(opt.selector);
                                var titleBox = selector.querySelector('.titleBox');
                                if (titleBox) titleBox.style.display = 'none';
                            });

                        //实体底部标签
                        if (opt.showToptag) {
                            var taglis = nodeRight.append('g')
                                .attr('class', 'taglis')
                                .attr('transform', function (d, i) {
                                    var data = formatNodeElementData(d, property)
                                    var num = data.getTplxs().length;
                                    if (num) {
                                        let x = -opt.nodeEleSize.width / 2 + opt.nodeEleSize.width / 3 + 8
                                        let y = opt.nodeEleSize.height / 2 - 22
                                        return `translate(${x}, ${y})`;
                                    }
                                });
                            var tlis = taglis.selectAll('g')
                                .data(function (d) {
                                    var data = formatNodeElementData(d, property)
                                    var arr = [];
                                    for (var key in data.tplxs) {
                                        arr.push({
                                            type: key,
                                            tps: data.tplxs[key],
                                            name: data.properties.XM,
                                            relationName: data.gxmc || data.typeName,
                                            color: opt.topTagColors[key],
                                            oid: data.oid,
                                            tpids: data.tpids,
                                            parentTpid: data.tpid, //多图串并时，当前叶子节点的根节点 parentTpid
                                            sfzhm: data.properties.SFZHM,
                                            opacity: data.opacity,
                                            nodeId: data.id
                                        });
                                    }
                                    return arr;
                                })
                                .enter()
                                .append('g')
                                .attr('class', 'tlis')
                                .attr('transform', function (d, i) {
                                    return 'translate(' + i * 20 + ', 0)';
                                }).on("mouseover", function (d) {
                                    var id = "#node-" + d.nodeId
                                    let nodeTmp = d3.select(id)._groups;
                                    let parentNodeTmp = null
                                    if (nodeTmp.length > 0) {
                                        parentNodeTmp = nodeTmp[0][0].__data__
                                    }
                                    if ((parentNodeTmp && (parentNodeTmp.data ? (parentNodeTmp.data.opacity == undefined || parentNodeTmp.data.opacity == 1) : (parentNodeTmp.opacity == undefined || parentNodeTmp.opacity == 1)))) {
                                        opt.tpsCreateEvt(d.tps, d, d3.event, parentNodeTmp)
                                        if (opt.showToptagMenu) {
                                            createlist(d.tps, d, d3.event, parentNodeTmp)
                                        }
                                        if (document.querySelector('.panel')) {
                                            document.querySelector('.panel').style.display = 'none';
                                        }
                                    }
                                });


                            tlis.append('rect')
                                .attr('class', 'tlisrect')
                                .attr('width', 17)
                                .attr('height', 17)
                                .attr('rx', 3)
                                .attr('ry', 3)
                                .attr('fill', function (d) {
                                    return opt.topTagColors[d.type];
                                })
                                .attr('transform', function (d, i) {
                                    return 'translate(0, 0)';
                                });

                            tlis.append('path')
                                .attr('class', 'tlispath')
                                .attr('fill', 'white')
                                .attr('transform', 'translate(1, 1),scale(0.015)') //卡片缩小
                                .attr('d', function (d, i) {
                                    var paths = opt.iconTagPath
                                    return paths[d.type];
                                });
                            tlis.append('circle')
                                .attr('class', 'tliscircle')
                                //.attr('r',10)  //卡片缩小
                                .attr('r', 6)
                                .attr('fill', function (d) {
                                    //return 'red';
                                    return d.color
                                })
                                .attr('transform', function (d, i) {
                                    // return 'translate(35,-5)';  //卡片缩小
                                    return 'translate(17,-1)';
                                })
                            var textL = tlis.append('text') //图谱标签个数底部圆形icon
                                .attr('class', 'tlistext')
                                .attr('stroke', '#fff')
                                .attr('stroke-width', '0')
                                .text(function (d) {
                                    //             return d.tps.length;
                                })
                                .attr('transform', function (d, i) {
                                    if (d.tps.length >= 100) {
                                        return 'translate(11, 2)scale(0.7)';
                                    } else if (d.tps.length >= 10) {
                                        // return 'translate(29, -2)'; //卡片缩小
                                        return 'translate(13, 2)scale(0.7)';
                                    } else {
                                        // return 'translate(32, -2)'; //卡片缩小
                                        return 'translate(14, 2)scale(0.7)';
                                    }

                                });
                            textL.append('tspan') //涉及到的图谱标签个数
                                .attr('font-size', function (d, i) {
                                    if (d.tps.length >= 100) {
                                        return '10';
                                    } else {
                                        return '12';
                                    }
                                })
                                .attr('fill', '#fff')
                                .text(function (d) {
                                    return d.tps.length;
                                })
                                .attr('x', function (d) {
                                    if (10 > d.tps.length > 0) {
                                        return 1
                                    } else {
                                        return -1
                                    }
                                })
                        }
                    }
                    // 创建圆形元素
                    function createCircleNodeElement(nodeRight, property = "") {
                        nodeRight.append('circle')
                            .attr('class', 'node-circle-bg')
                            .attr('r', 36)
                            .attr('fill', '#ffffff');
                        nodeRight.append('circle')
                            .attr('class', 'node-circle')
                            .attr('r', 36)
                            .attr('fill', function (d) {
                                var data = formatNodeElementData(d, property)
                                return (data.properties.mapTypeName ? colorRgba(opt.topTagColors[data.properties.mapTypeName], 0.4) : data.properties.circleFill)
                            })
                            .attr('stroke', function (d) {
                                var data = formatNodeElementData(d, property)
                                return (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : data.properties.circleStroke)
                            })
                            .attr('stroke-width', 5);
                        nodeRight.append('path')
                            .attr('class', 'node-path')
                            .attr('d', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.exist && data.nodePath ? data.nodePath : (data.properties.mapTypeName ? opt.iconTagPath[data.properties.mapTypeName] : "")
                            })
                            .attr('fill', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.color ? data.color : (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : '#a1a1a1')
                            })
                            .attr('transform', function (d) {
                                var data = formatNodeElementData(d, property)
                                return 'translate(-14,-26)scale(0.025)';
                            });
                        nodeRight.append('text')
                            .attr('class', 'node-text-path')
                            .attr('font-size', '14px')
                            .attr('fill', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.properties.circleTextFill
                            })
                            .attr('y', function (d) {
                                return 0;
                            })
                            .attr('x', function (d) {
                                return 0;
                            })
                            .attr('text-anchor', 'middle')
                            .text(function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.properties.nodePathText
                            });
                        nodeRight.append('text')
                            .attr('class', 'node-text')
                            .attr('font-size', '14px')
                            .attr('fill', function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.color ? data.color : (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : data.properties.circleTextFill)
                            })
                            .attr('y', function (d) {
                                return 24;
                            })
                            .attr('x', function (d) {
                                return 0;
                            })
                            .attr('text-anchor', 'middle')
                            .text(function (d) {
                                var data = formatNodeElementData(d, property)
                                return data.properties.personCount + '/' + data.properties.totalPersonCount
                            });
                        nodeRight.append('text')
                            .attr('class', 'node-eletext')
                            .attr('font-size', '14px')
                            .attr('y', function (d) {
                                return 40;
                            })
                            .attr('x', function (d) {
                                return 0;
                            })
                            .attr('text-anchor', 'middle')
                            .selectAll('tspan')
                            .data(function (d) {
                                var data = formatNodeElementData(d, property)
                                var a = data.getPropList(),
                                    arr = [];
                                a.forEach(x => {
                                    var tmpPropArr = []
                                    if (x.name == 'mapName' || x.name == 'deptName') {
                                        // x.val = '很多时候，当我们电脑安装多个浏览器时，会有一个默认的浏览器设置，这样在通过链接打开网页时，会直接开启该浏览器，那么WIN10中如何设置呢，小编手把手教您。'
                                        x.vals = x.val;
                                        if (x.val.length > 20) {
                                            x.val = x.val.substring(0, 20);
                                            var subVals = x.vals.substring(20)
                                            var rows = subVals.length % 20 != 0 ? parseInt(subVals.length / 20) + 1 : parseInt(subVals.length / 20);
                                            for (var i = 0; i < rows; i++) {
                                                if (i == 1) {
                                                    tmpPropArr.push({
                                                        vals: x.vals,
                                                        name: x.name,
                                                        val: subVals.substring(0, 18) + '...'
                                                    })
                                                    subVals = subVals.substring(18)
                                                } else if (i < 1) {
                                                    tmpPropArr.push({
                                                        vals: x.vals,
                                                        name: x.name,
                                                        val: subVals.substring(0, 20)
                                                    })
                                                    subVals = subVals.substring(20)
                                                }
                                            }
                                        } else {
                                            x.val = x.val;
                                        }
                                        arr.push(x)
                                        arr.push.apply(arr, tmpPropArr)
                                    }
                                })
                                return arr;
                            }).enter().append('tspan')
                            .attr('dy', function (d, i) {
                                return 17;
                            }).attr('x', 0)
                            .html(function (d) {
                                var data = d
                                return ('' + data.val).replace(eval('/' + opt.highlightText + '/g'), '<tspan fill="red">' + opt.highlightText + '</tspan>');
                            });

                    }
                    // 创建树卡片link连线的元素
                    function createCardLinkElement(linkGroup, hideIds, property = "") {
                        link = linkGroup.selectAll("path").data(linkObjs).enter().append("path")
                            .classed('link', true)
                            .attr("id", function (d) {
                                //return "link-" + d.target.data.id; })
                                return "link-" + (d.id || d.target.data.id);
                            })
                            .attr('style', function (d) {
                                return !d.source ? "display:none" : (hideIds.indexOf(d.source.data.id) != -1 || d.source.data.id == d.source.data.comparedId || d.source.data.comparedId == 'root') ? 'display:none' : '';

                            })
                            .attr("source", function (d) {
                                return "node-" + (d.source && d.source.data.id);
                            })
                            .attr("target", function (d) {
                                return "node-" + d.target.data.id;
                            })
                            .attr("stroke-width", function (d) {
                                return d.width || 1;
                            })
                            .attr("stroke", function (d) {
                                if (d.target.data.pid) {
                                    return d.color || opt.relatedColor;
                                }
                                return !d.color ? "#000" : d.color;
                            })
                            .attr("nodeType", function (d) {
                                return d.target.data.nodeType;
                            })
                            .attr("fill", "none");
                        if (!opt.overlapData.length) {
                            relationGroup.selectAll("path").data([]).exit().remove();
                            relationLabelGroup.selectAll("g").data([]).exit().remove();
                            relationGroup.selectAll('*').remove();
                            relationLabelGroup.selectAll('*').remove();
                        }
                        if (opt.useOverlap && opt.overlapData.length) {
                            relations = relationGroup.selectAll("path").data(graph.getOverlap()).enter().append("path")
                                .attr("id", function (d) {
                                    return "rel-" + d.id;
                                })
                                .attr("stroke-width", function (d) {
                                    return 1;
                                })
                                .attr("stroke", function (d) {
                                    return d.color || 'blue';
                                })
                                .attr("fill", 'none');

                            relLabels = relationLabelGroup.selectAll("g").data(graph.getOverlap()).enter().append("g")
                                .attr("id", function (d) {
                                    return "rel-label-" + d.id;
                                })
                                .attr('text-anchor', 'middle');
                        }
                    }
                    // 创建力导向link连线的元素
                    function createForceLinkElement(hideIds, property = "") {
                        link = linkGroup.selectAll("path").data(linkObjs).enter().append("path")
                            .classed('link', true)
                            .attr("id", function (d) {
                                return "link-" + d.id;
                            })
                            .attr("source", function (d) {
                                return "node-" + d.source.id;
                            })
                            .attr("target", function (d) {
                                return "node-" + d.target.id;
                            })
                            .attr("stroke-width", function (d) {
                                return Math.sqrt(d.value) + 1;
                            })
                            .attr("stroke", function (d) {
                                return !d.color
                                    ? d.linkShortName
                                        ? opt.topTagColors[d.linkShortName]
                                        : 'rgba(85,85,85,1)'
                                    : d.color;
                            })
                            .attr("fill", "none")
                            .on('mouseover', function (d) {
                                lineToggle(this, d, true);
                            })
                            .on('mouseleave', function (d) {
                                let obj = d3.select(this)
                                if (this.className.baseVal.indexOf('selected') == -1) {
                                    lineToggle(this, d, false);
                                }
                            })
                        linkText = linkTextGroup.selectAll("g").data(linkObjs).enter();

                        linkText = linkText.append("g")
                            .attr("id", function (d) {
                                return "link-label-" + d.id;
                            })
                            .attr("source", function (d) {
                                return "link-label-" + d.source.id;
                            })
                            .attr("target", function (d) {
                                return "link-label-" + d.target.id;
                            })
                            .attr('text-anchor', 'middle')
                            .attr('style', function (d) {
                                return d.source == d.target ? 'display:none' : 'display:block';
                            });

                        linkText.append("text")
                            .attr('class', 'linktext')
                            .attr('type', 'linktext')
                            .attr('lineNum', function (d) {
                                return d.lineNum;
                            })
                            .attr('text-anchor', 'middle')
                            .attr("id", function (d) {
                                return "link-text-" + d.id;
                            })
                            .selectAll('tspan').data(function (d) {
                                return [{
                                    lineNum: d.lineNum,
                                    text: (d.linkName)
                                }];
                            })
                            .enter()
                            .append('tspan')
                            .attr('x', -10)
                            .attr('dy', function (text, i, arr) {
                                return i == 0 ? (arr.length - 1) * -15 / 2 + 5 : 15;
                            })
                            .text(function (d) {
                                return d.text;
                            })
                            .attr('fill', '#666');

                        linkText.insert('rect', ':first-child')
                            .attr('class', 'linkrect')
                            .attr('lineNum', function (d) {
                                return d.lineNum;
                            })
                            .attr('fill', 'rgba(255,255,255,0.8)')
                            .attr('id', function (d) {
                                return 'link-label-rect-' + d.id;
                            })
                            .attr('linkid', function (d) {
                                return d.id;
                            })
                            .attr('width', function (d) {
                                return d.getPropWidth();
                            })
                            .attr('height', function (d) {
                                return 20;
                            })
                            .attr('x', function (d) {
                                return -(d.getPropWidth() + 20) / 2
                            })
                            .attr('y', function (d) {
                                return -20 / 2
                            });
                    }
                    function formatNodeElementData(d, property) {
                        return property ? d[property] : d;
                    }
                    // 根据节点类型加载不同布局模式的DOM
                    function redrawContent() {
                        switch (opt.type) {
                            case "tree":
                                redrawTreeContent();
                                break;
                            case "force":
                                redrawForceContent();
                                break;
                            case "forceCard":
                                redrawForceCardContent();
                                break;
                            case "forceCircle":
                                redrawForceCircleContent();
                                break;
                            case "level":
                                redrawLevelContent();
                                break;
                            case "levelTree":
                                redrawLevelTreeContent();
                                break;
                            case "social":
                                redrawSocialTreeContent();
                                break;
                            default:
                                redrawForceContent();
                        }
                    }
                    function drawTreeSideButton() {
                        if (opt.node.top) {
                            createEditButtonHorizontal(node, {
                                width: opt.nodeEleSize.width,
                                height: 30,
                                sideBUttonText: 'top',
                                nodeType: d => d.data.nodeType,
                                display: d => showTop(d),
                                rectX: -(opt.nodeEleSize.width / 2),
                                rectY: -(opt.nodeEleSize.height / 2) - 40,
                                textY: -(opt.nodeEleSize.height / 2) - 20,
                                textData: () => { return [opt.node.top] }
                            })
                        }
                        if (opt.node.right) {
                            createEditButtonHorizontal(node, {
                                width: 30,
                                height: opt.nodeEleSize.height,
                                sideBUttonText: 'right',
                                nodeType: d => d.data.nodeType,
                                display: d => showRight(d),
                                rectX: (opt.nodeEleSize.width / 2 + 8),
                                rectY: -(opt.nodeEleSize.height / 2),
                                textX: (opt.nodeEleSize.width / 2 + 8),
                                tspanX: (opt.nodeEleSize.width / 2) + 22,
                                tspanY: (d, i) => (i * 18) - (opt.nodeEleSize.height / 2 - 30),
                                textData: () => { return opt.node.right.split("") }
                            })
                        }
                        if (opt.node.bottom) {
                            createEditButtonHorizontal(node, {
                                width: opt.nodeEleSize.width,
                                height: 30,
                                sideBUttonText: 'bottom',
                                nodeType: d => d.data.nodeType,
                                display: d => showBottom(d),
                                rectX: -(opt.nodeEleSize.width / 2),
                                rectY: opt.nodeEleSize.height / 2 + 10,
                                textY: opt.nodeEleSize.height / 2 + 10 + 20,
                                textData: () => { return [opt.node.bottom] }
                            })
                        }

                        if (opt.node.left) {
                            createEditButtonHorizontal(node, {
                                width: 30,
                                height: opt.nodeEleSize.height,
                                sideBUttonText: 'left',
                                nodeType: d => d.data.nodeType,
                                display: d => showLeft(d),
                                rectX: -(opt.nodeEleSize.width / 2 + 38),
                                rectY: -(opt.nodeEleSize.height / 2),
                                textX: -(opt.nodeEleSize.width / 2 + 38),
                                tspanX: -(opt.nodeEleSize.width / 2 + 22),
                                tspanY: (d, i) => (i * 18),
                                textData: () => { return opt.node.left.split("") }
                            })
                        }

                        function showTop(d) {
                            // 1、判断节点是否是配偶（top,right,bottom,left）
                            // 2、判断节点是否有配偶(right)
                            // 3、判断是否有父级(top)
                            var hasParent = d.parent ? d.parent.data.nodeType == 'QB_ZP_RY' ? true : false : false;
                            var flag = d.data.pid ? false : d.data.nodeType == 'QB_ZP_RY' ? !hasParent : false;
                            return flag ? "display:block" : "display:none"
                        }

                        function showRight(d) {
                            // 1、判断节点是否是配偶（top,right,bottom,left）
                            // 2、判断节点是否有配偶(right)
                            // 3、判断是否有父级(top)
                            var hasPid = nodeObjs.some(x => x.data.pid == d.data.id)
                            hasPid = false; //添加不验证是否有配偶
                            var flag = d.data.pid ? false : hasPid ? false : (d.data.nodeType == 'QB_ZP_RY') ? true : false
                            return flag ? "display:block;" : "display:none"
                        }

                        function showBottom(d) {
                            // 1、判断节点是否是配偶（top,right,bottom,left）
                            // 2、判断节点是否有配偶(right)
                            // 3、判断是否有父级(top)
                            var flag = d.data.pid ? true : (d.data.nodeType == 'QB_ZP_RY') ? true : false
                            return flag ? "display:block" : "display:none"
                        }

                        function showLeft(d) {
                            // 1、判断节点是否是配偶（top,right,bottom,left）
                            // 2、判断节点是否有配偶(right)
                            // 3、判断是否有父级(top)
                            var flag = d.data.pid ? false : (d.data.nodeType == 'QB_ZP_RY') ? true : false
                            return flag ? "display:block" : "display:none"
                        }
                    }
                    // 创建小矩形的编辑按钮（水平方向\垂直方向）
                    function createEditButtonHorizontal(group, setting = {
                        width: opt.nodeEleSize.width,
                        height: opt.nodeEleSize.height,
                        sideBUttonText: null,
                        nodeType: function () { },
                        display: function () { },
                        rectX: null,
                        rectY: null,
                        textX: null,
                        textY: null,
                        tspanX: null,
                        tspanY: null,
                        textData: function () { }
                    }) {
                        group.append('rect')
                            .attr("width", setting.width)
                            .attr("height", setting.height)
                            .attr("sideButton", setting.sideBUttonText)
                            .attr("nodeType", setting.nodeType)
                            .attr('class', 'node-side-button')
                            .attr("style", setting.display)
                            .attr('fill', function (d) {
                                return '#fff'
                            })
                            .attr("stroke", function (d) {
                                return opt.node.borderColor; //编辑的Rect的边框色
                            })
                            .attr('stroke-width', 4)
                            .attr('y', setting.rectY)
                            .attr('x', setting.rectX)
                            .attr("rx", "5");
                        var textGroup = group.append('text')
                            .attr('class', 'node-side-button-text')
                            .attr("sideButton", setting.sideBUttonText)
                            .attr("style", setting.display)
                            .attr("x", setting.textX)
                            .attr("y", setting.textY)
                            .attr("text-anchor", "middle");
                        textGroup.selectAll('tspan')
                            .data(() => {
                                return setting.textData()
                            }).enter()
                            .append('tspan')
                            .attr('style', 'cursor: default;')
                            .attr("sideButton", setting.sideBUttonText)
                            .attr("x", setting.tspanX)
                            .attr("y", setting.tspanY)
                            .attr("font-size", 14)
                            .attr("fill", opt.node.textColor)
                            .text(d => d);
                    }
                    // 创建卡片形编辑按钮
                    function createCardEditButtonHorizontal(group, setting = {
                        width: opt.nodeEleSize.width,
                        height: 30,
                        sideBUttonText: null,
                        nodeType: function () { },
                        display: function () { },
                        rectX: null,
                        rectY: null,
                        textX: null,
                        textY: null,
                        pathX: null,
                        pathY: null,
                        textData: function () { },
                        transform: function () { }
                    }) {
                        var nodeButton = group.append('g')
                            .attr('class', 'node-side-button')
                            .attr('sideButton', setting.sideBUttonText)
                            .attr('style', setting.display)
                            .attr('transform', setting.transform);
                        nodeButton.append('rect')
                            .attr("width", setting.width)
                            .attr("height", setting.height)
                            .attr('class', 'node-side-button')
                            .attr('sideButton', setting.sideBUttonText)
                            .attr('fill', '#fff')
                            .attr("stroke", opt.node.borderColor)
                            .attr('stroke-width', 4)
                            .attr('y', setting.rectY)
                            .attr('x', setting.rectX)
                            .attr("rx", "5");
                        nodeButton.append('path')
                            .attr('class', 'node-side-button-path')
                            .attr('fill', opt.node.borderColor)
                            .attr('transform', `translate(${(opt.nodeEleSize.width - 10)}, -30),scale(0.04)`)
                            .attr('sideButton', setting.sideBUttonText)
                            .attr("d", 'M828.704099 196.575729C744.096116 112.384034 631.648434 66.016073 512 66.016073s-232.1288 46.367961-316.736783 130.559656C110.624271 280.800108 64 392.831501 64 512c0 119.199462 46.624271 231.199892 131.232254 315.424271 84.607983 84.191695 197.088348 130.559656 316.736783 130.559656s232.1288-46.367961 316.704099-130.559656c84.67163-84.255342 131.295901-196.288456 131.263217-315.455235C959.967316 392.800538 913.375729 280.800108 828.704099 196.575729zM736.00086 544.00086 544.00086 544.00086l0 192c0 17.695686-14.336138 32.00086-32.00086 32.00086s-32.00086-14.303454-32.00086-32.00086L479.99914 544.00086 288.00086 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l192 0L480.00086 288.00086c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 192 192 0c17.695686 0 32.00086 14.336138 32.00086 32.00086S753.696546 544.00086 736.00086 544.00086z')
                            .attr("x", setting.pathX)
                            .attr("y", setting.pathY);
                        nodeButton.append('text')
                            .attr('class', 'node-side-button-text')
                            .attr('sideButton', setting.sideBUttonText)
                            .attr('style', "cursor: default;")
                            .attr("text-anchor", "middle")
                            .attr("x", setting.textX)
                            .attr("y", setting.textY)
                            .text(setting.textData);
                    }
                    //绘制
                    function draw(curNode) {
                        if (curNode) {
                            node
                                .filter(function (d) { return d === curNode })
                                .attr("transform", function (d) {
                                    return "translate(" + d.x + "," + d.y + ")";
                                }).attr("x", function (d) {
                                    if (!opt.useForce || d.isfixed) {
                                        d.x = d.fx || d.x;
                                        d.fx = d.x;
                                    }
                                    return d.x;
                                }).attr("y", function (d) {
                                    if (!opt.useForce || d.isfixed) {
                                        d.y = d.fy || d.y;
                                        d.fy = d.y;
                                    }
                                    return d.y;
                                })
                                .classed("fixed", function (d) {
                                    return (d.vx < 0.01) && (d.vy < 0.01);
                                });
                            let filterLink = link.filter(function (d) { return d.source == curNode || d.target == curNode; })
                            drawPathBezier(filterLink);
                            //选中效果
                            if (linkText) {
                                linkText.attr("transform", drawLinkTextPosition)
                                    .attr("style", function (d) {
                                        let result = drawLinkTextPosition(d)
                                        if (result && result.length) {
                                            return "display:block"
                                        } else {
                                            return "display:none"
                                        }
                                    });
                            };
                        } else {
                            node
                                .attr("transform", function (d) {
                                    return "translate(" + d.x + "," + d.y + ")";
                                }).attr("x", function (d) {
                                    if (!opt.useForce || d.isfixed) {
                                        d.x = d.fx || d.x;
                                        d.fx = d.x;
                                    }
                                    return d.x;
                                }).attr("y", function (d) {
                                    if (!opt.useForce || d.isfixed) {
                                        d.y = d.fy || d.y;
                                        d.fy = d.y;
                                    }
                                    return d.y;
                                })
                                .classed("fixed", function (d) {
                                    return (d.vx < 0.01) && (d.vy < 0.01);
                                });
                            drawPathBezier(link);
                            //选中效果
                            if (linkText) {
                                linkText.attr("transform", drawLinkTextPosition)
                                    .attr("style", function (d) {
                                        let result = drawLinkTextPosition(d)
                                        if (result && result.length) {
                                            return "display:block"
                                        } else {
                                            return "display:none"
                                        }
                                    });
                            };
                        }

                        if (opt.allowMarker && relMarkerGroup && relmarkers) {
                            relMarkerGroup
                                .selectAll("path")
                                .selectAll('animateMotion')
                                .attr("path", function (d) {
                                    return linkGroup.select('#link-' + d.id).attr('d');
                                });
                        }
                    }
                    function drawPathBezier(ele) {
                        switch (opt.type) {
                            case "tree":
                            case "social":
                            case "levelTree":
                                treeConstructionLinkPath(ele);
                                break;
                            case "force":
                            case "forceCard":
                            case "forceCircle":
                                forceConstructionLinkPath(ele);
                                break;
                        }
                        drawRelationLinks()
                    }
                    // 树形结构关于连线的计算
                    function treeConstructionLinkPath(ele) {
                        if (ele) {
                            ele.attr('d', function (d) {
                                if (!d.source) return "";
                                var x1 = d.source.x,
                                    y1 = d.source.y;
                                var x2 = d.target.x,
                                    y2 = d.target.y;
                                if (relMarkerGroup && opt.allowMarker) {
                                    relMarkerGroup.select('#link-mark-animate-' + d.id)
                                        .attr('path', function (item) {
                                            // ((y2 - y1) * 2 / 3 + y1)
                                            return "M" + x1 + "," + y1 + " L" + x1 + "," + ((y2 - y1) * 2 / 4 + y1) + " L" + x2 + "," + ((y2 - y1) * 2 / 4 + y1) + " L" + x2 + "," + y2;
                                        });
                                }
                                if (d.type && d.type == 'bottom') {
                                    return "M" + x1 + "," + y1 + " L" + x1 + "," + (y1 + opt.tree.treeH / 2) + " L" + x2 + "," + (y2 + opt.tree.treeH / 2) + " L" + x2 + "," + y2;
                                }
                                if (d.type && d.type == 'top') {
                                    return "M" + x1 + "," + y1 + " L" + x1 + "," + (y1 + opt.tree.treeH / 2) + " L0," + (y1 + opt.tree.treeH / 2) + " L0," + (y1 + opt.tree.treeH / 2 + 50) + " L" + x2 + "," + (y1 + opt.tree.treeH / 2 + 50) + " L" + x2 + "," + y2;
                                }
                                return "M" + x1 + "," + y1 + " L" + x1 + "," + ((y2 - y1) * 2 / 4 + y1) + " L" + x2 + "," + ((y2 - y1) * 2 / 4 + y1) + " L" + x2 + "," + y2;
                            });
                        }
                    }
                    // 力导向结构关于连线的计算
                    function forceConstructionLinkPath(ele) {
                        if (ele) {
                            ele.attr("d", function (d) {
                                //判断同nodes的link
                                var linksArr = [];
                                if (d['BothNodeLinks']) {
                                    linksArr = d['BothNodeLinks'];
                                } else {
                                    var sid = d.source.id,
                                        tid = d.target.id;
                                    ele.filter(function (e) {
                                        if (
                                            (e.source.id == sid && e.target.id == tid) ||
                                            (e.target.id == sid && e.source.id == tid)
                                        ) {
                                            linksArr.push(e.id);
                                        }
                                    });
                                }
                                let path = drawLinkPosition(d)
                                if (opt.allowMarker) {
                                    if (linksArr.indexOf(d.id) == 0) {
                                        relMarkerGroup.select('#link-mark-path-' + d.id).selectAll('animateMotion')
                                            .attr('path', path);
                                    } else {
                                        relMarkerGroup.select('#link-mark-animate-' + d.id)
                                            .attr('path', path);
                                    }
                                }
                                return path
                            });
                        }
                    }
                    // 连线绘制的位置
                    function drawLinkPosition(d) {
                        var offSets = calculateMuiltileLinkOffset(d)
                        if (offSets && offSets.length) {
                            if ('reverse' == d.direction) {
                                return "M" + d.target.x + "," + d.target.y +
                                    " L" + offSets[2] + "," + offSets[3] +
                                    " L" + offSets[0] + "," + offSets[1] +
                                    " L" + d.source.x + "," + d.source.y;
                            } else {
                                return "M" + d.source.x + "," + d.source.y +
                                    " L" + offSets[0] + "," + offSets[1] +
                                    " L" + offSets[2] + "," + offSets[3] +
                                    " L" + d.target.x + "," + d.target.y;
                            }
                        } else {
                            return ""
                        }
                    }
                    // 连线绘制文本的位置
                    function drawLinkTextPosition(d) {
                        var offSets = calculateMuiltileLinkTextOffset(d)
                        if (offSets && offSets.length) {
                            return "translate(" + (offSets[0]) + "," + (offSets[1]) + "),rotate(" + (offSets[2]) + ")"
                        } else {
                            return null
                        }
                    }
                    // 验证两个矩形是否交叉
                    function isInRect(rect1, rect2) {
                        var maxX, maxY, minX, minY
                        maxX = rect1.x + rect1.width >= rect2.x + rect2.width ? rect1.x + rect1.width : rect2.x + rect2.width
                        maxY = rect1.y + rect1.height >= rect2.y + rect2.height ? rect1.y + rect1.height : rect2.y + rect2.height
                        minX = rect1.x <= rect2.x ? rect1.x : rect2.x
                        minY = rect1.y <= rect2.y ? rect1.y : rect2.y

                        if (maxX - minX <= rect1.width + rect2.width && maxY - minY <= rect1.height + rect2.height) {
                            return true
                        } else {
                            return false
                        }
                    }
                    // 计算两个节点之间多条连线的线的偏移量
                    function calculateMuiltileLinkOffset(d, offsetWidth = opt.offsetLineWidth) {
                        var offset;
                        if (d.lineNumTotal == 1) {
                            offset = 0;
                        } else {
                            if (d.lineNum == 1) {
                                offset = -opt.offsetLine / 2;
                            } else if (d.lineNum == 2) {
                                offset = (d.lineNum) * opt.offsetLine - opt.offsetLine / 2;
                            } else if (d.lineNum > 2) {
                                if (d.lineNum % 2 === 0) {
                                    offset = (d.lineNum) * opt.offsetLine - opt.offsetLine / 2;
                                } else {
                                    offset = -((d.lineNum - 1) * opt.offsetLine + opt.offsetLine / 2);
                                }
                            }
                        }

                        // 计算两点之间的角度
                        var dx = (d.target.x - d.source.x); // X轴长度
                        var dy = (d.target.y - d.source.y); // Y轴长度
                        var sourceRect = {
                            x: d.source.x,
                            y: d.source.y,
                            width: opt.nodeEleSize.width,
                            height: opt.nodeEleSize.height
                        }
                        var targetRect = {
                            x: d.target.x,
                            y: d.target.y,
                            width: opt.nodeEleSize.width,
                            height: opt.nodeEleSize.height
                        }
                        let isIn = true
                        // 如果两个卡片相交，这不显示连线
                        isIn = isInRect(sourceRect, targetRect)
                        if (isIn) {
                            return null
                        }
                        var tanAngle = dy / dx;
                        var angle = Math.atan(tanAngle);

                        // 每个点的角度计算
                        var tanAngle_point_left = offset / offsetWidth;
                        var angle_point_left = Math.atan(tanAngle_point_left);

                        // 计算source点
                        var normalise_point = Math.sqrt((offsetWidth * offsetWidth) + (offset * offset));
                        normalise_point = normalise_point != 0 ? normalise_point : 1
                        var dy_point_left = normalise_point * Math.sin(angle + angle_point_left)
                        var dx_point_left = normalise_point * Math.cos(angle + angle_point_left)
                        var pointX_left = d.source.x <= d.target.x ? d.source.x + dx_point_left : d.source.x - dx_point_left;
                        var pointY_left = d.source.x <= d.target.x ? d.source.y + dy_point_left : d.source.y - dy_point_left;

                        // 计算target点
                        var midpoint_x_right = d.source.x <= d.target.x ? d.target.x - offsetWidth * Math.cos(angle) : d.target.x + offsetWidth * Math.cos(angle);
                        var midpoint_y_right = d.source.x <= d.target.x ? d.target.y - offsetWidth * Math.sin(angle) : d.target.y + offsetWidth * Math.sin(angle);
                        var dy_point_right = midpoint_y_right - d.source.y;
                        var dx_point_right = midpoint_x_right - d.source.x;
                        var normalise_right = Math.sqrt((dx_point_right * dx_point_right) + (dy_point_right * dy_point_right));
                        normalise_right = normalise_right != 0 ? normalise_right : 1;
                        var tanAngle_point_right = offset / normalise_right;
                        var angle_point_right = Math.atan(tanAngle_point_right);
                        var point_right_width = Math.sqrt((normalise_right * normalise_right) + (offset * offset));
                        var dy_point_right_e = point_right_width * Math.sin(angle + angle_point_right)
                        var dx_point_right_e = point_right_width * Math.cos(angle + angle_point_right)
                        var pointX_right = d.source.x <= d.target.x ? d.source.x + dx_point_right_e : d.source.x - dx_point_right_e
                        var pointY_right = d.source.x <= d.target.x ? d.source.y + dy_point_right_e : d.source.y - dy_point_right_e

                        var dxMid = Math.abs(pointX_right - pointX_left)
                        var dyMid = Math.abs(pointY_right - pointY_left)
                        var midpoint_width = Math.sqrt((dxMid * dxMid) + (dyMid * dyMid));
                        // if( Math.abs(midpoint_width) <= offsetWidth) {
                        //     offsetWidth = Math.abs(midpoint_width)
                        //     return calculateMuiltileLinkOffset(d,offsetWidth)
                        // }
                        var dxSource = Math.abs(pointX_left - d.source.x)
                        var dySource = Math.abs(pointY_left - d.source.y)

                        var dxTarget = Math.abs(pointX_right - d.source.x)
                        var dyTarget = Math.abs(pointY_right - d.source.y)
                        var sourceDistance = Math.sqrt((dxSource * dxSource) + (dySource * dySource));
                        var targetDistance = Math.sqrt((dxTarget * dxTarget) + (dyTarget * dyTarget));
                        var offSets = [pointX_left, pointY_left, pointX_right, pointY_right];
                        if (sourceDistance > targetDistance) {
                            offSets = [pointX_right, pointY_right, pointX_left, pointY_left];
                        }
                        return offSets;
                    }
                    // 计算两个节点之间多条连线文本的线的偏移量
                    function calculateMuiltileLinkTextOffset(d) {
                        var offsetPoint = calculateMuiltileLinkOffset(d)
                        if (offsetPoint && offsetPoint.length) {
                            // 两点之间的距离
                            var dx = (d.target.x - d.source.x);
                            var dy = (d.target.y - d.source.y);
                            var normalise = Math.sqrt((dx * dx) + (dy * dy));
                            normalise = normalise != 0 ? normalise : 1
                            // if(normalise <= opt.offsetLineWidth * 3) {
                            //     return null;
                            // }
                            var offSetX_Left = offsetPoint[0];
                            var offSetY_Left = offsetPoint[1];

                            var offSetX_Right = offsetPoint[2];
                            var offSetY_Right = offsetPoint[3];
                            // B
                            var offSetX = (offSetX_Left + offSetX_Right) / 2
                            var offSetY = (offSetY_Left + offSetY_Right) / 2

                            // α =arcsin（28/135）
                            var rotateTextAngle = Math.asin((d.target.y - d.source.y) / normalise) * 180 / Math.PI;
                            if (d.target.x < d.source.x && d.target.y > d.source.y) {
                                rotateTextAngle = -rotateTextAngle;
                            } else if (d.target.x < d.source.x && d.target.y < d.source.y) {
                                rotateTextAngle = -rotateTextAngle;
                            }

                            var rotateAngle = rotateTextAngle;

                            var offSets = [offSetX, offSetY, rotateAngle];
                            return offSets;
                        } else {
                            return null
                        }
                    }
                    // 计算两个节点之间多条连线的线的偏移量（四等分）
                    function calculateMuiltileAvgLinkOffset(d) {
                        var offset;
                        if (d.lineNum == 0) {
                            offset = 0;
                        } else if (d.lineNum == 1) {
                            offset = 0;
                        } else if (d.lineNum >= 2) {
                            if (d.lineNum % 2 === 0) {
                                offset = (d.lineNum) * opt.offsetLine;
                            } else {
                                offset = -(d.lineNum - 1) * opt.offsetLine;
                            }
                        }
                        var midpoint_X = (d.source.x + d.target.x) / 2;
                        var midpoint_Y = (d.source.y + d.target.y) / 2;
                        var midpoint_X_Left = (d.source.x + midpoint_X) / 2;
                        var midpoint_Y_Left = (d.source.y + midpoint_Y) / 2;

                        var midpoint_X_Right = (midpoint_X + d.target.x) / 2;
                        var midpoint_Y_Right = (midpoint_Y + d.target.y) / 2;

                        var dx = (d.target.x - d.source.x);
                        var dy = (d.target.y - d.source.y);

                        var dx_Left = (midpoint_X_Left - d.source.x);
                        var dy_Left = (midpoint_Y_Left - d.source.y);

                        var dx_Right = (d.target.x - midpoint_X_Right);
                        var dy_Right = (d.target.y - midpoint_Y_Right);

                        var normalise = Math.sqrt((dx * dx) + (dy * dy));
                        normalise = normalise != 0 ? normalise : 1

                        var normalise_Left = Math.sqrt((dx_Left * dx_Left) + (dy_Left * dy_Left));
                        normalise_Left = normalise_Left != 0 ? normalise_Left : 1

                        var normalise_Right = Math.sqrt((dx_Right * dx_Right) + (dy_Right * dy_Right));
                        normalise_Right = normalise_Right != 0 ? normalise_Right : 1

                        var offSetX_Left = midpoint_X_Left + offset * (dy_Left / normalise_Left);
                        var offSetY_Left = midpoint_Y_Left - offset * (dx_Left / normalise_Left);

                        var offSetX_Right = midpoint_X_Right + offset * (dy_Right / normalise_Right);
                        var offSetY_Right = midpoint_Y_Right - offset * (dx_Right / normalise_Right);

                        var offSets = [offSetX_Left, offSetY_Left, offSetX_Right, offSetY_Right];
                        return offSets;
                    }
                    // 计算两个节点之间多条连线的线的偏移量
                    function calculateLinkOffset(d) {
                        var offset;
                        if (d.lineNum == 0) {
                            offset = 0;
                        } else if (d.lineNum == 1) {
                            offset = 0;
                        } else if (d.lineNum >= 2) {
                            if (d.lineNum % 2 === 0) {
                                offset = (d.lineNum) * opt.offsetLine;
                            } else {
                                offset = -(d.lineNum) * opt.offsetLine;
                            }
                        }
                        var midpoint_X = (d.source.x + d.target.x) / 2;
                        var midpoint_Y = (d.source.y + d.target.y) / 2;

                        var dx = (d.target.x - d.source.x);
                        var dy = (d.target.y - d.source.y);

                        var normalise = Math.sqrt((dx * dx) + (dy * dy));
                        normalise = normalise != 0 ? normalise : 1

                        var offSetX = midpoint_X + offset * (dy / normalise);
                        var offSetY = midpoint_Y - offset * (dx / normalise);
                        var offSets = [offSetX, offSetY];
                        return offSets;
                    }
                    function calculateLinkTextOffset(d) {
                        var offsetPoint = calculateLinkOffset(d);
                        // P
                        var P1_X = offsetPoint[0];
                        var P1_Y = offsetPoint[1];
                        // B
                        var offSetX = (P1_X + midpoint_X) / 2;
                        var offSetY = (P1_Y + midpoint_Y) / 2;

                        // α =arcsin（28/135）
                        var rotateTextAngle = Math.asin((d.target.y - d.source.y) / normalise) * 180 / Math.PI;
                        if (d.target.x < d.source.x && d.target.y > d.source.y) {
                            rotateTextAngle = -rotateTextAngle;
                        } else if (d.target.x < d.source.x && d.target.y < d.source.y) {
                            rotateTextAngle = -rotateTextAngle;
                        }

                        var rotateAngle = rotateTextAngle;

                        var offSets = [offSetX, offSetY, rotateAngle];
                        return offSets;
                    }
                    // 绘制关系link的位置和路径
                    function drawRelationLinks() {
                        if (!opt.useOverlap || !opt.overlapData.length) return;
                        relations.attr('d', function (d) {
                            if (!d.source || !d.target) return;
                            var x1 = d.source.x,
                                y1 = d.source.y;
                            var x2 = d.target.x,
                                y2 = d.target.y;
                            return "M" + x1 + "," + y1 + " L" + x2 + "," + y2;
                        })
                        relLabels.attr("transform", function (d) {
                            var x = (d.source.x + d.target.x) / 2;
                            var y = (d.source.y + d.target.y) / 2;
                            return "translate(" + x + "," + y + ")";
                        });

                    }
                    function lineToggle(obj, d, isHover) {
                        if (isHover) {
                            link
                                .filter(link => {
                                    return link.id == d.id
                                })
                                .classed('link-active', true)
                            linkText
                                .filter(link => {
                                    return link.id == d.id
                                })
                                .classed('link-text-active', true)
                            let textNode = document.querySelector('#link-label-' + d.id);
                            if (textNode) {
                                textNode.remove();
                                document.querySelector('.link-labels').appendChild(textNode);
                            }
                        } else {
                            link
                                .filter(link => {
                                    return link.id == d.id
                                })
                                .classed('link-active', false)
                            linkText
                                .filter(link => {
                                    return link.id == d.id
                                })
                                .classed('link-text-active', false)
                        }
                    }
                    // 节点连线淡入淡出
                    function nodeMouseOverOut(nodes, flag) {
                        if (flag) {
                            const related = []
                            node.classed('svg-fadeout', function (d) {
                                d.opacity = 0.3
                                return true
                            })
                            link.classed('svg-fadeout', function (d) {
                                d.opacity = 0.3
                                return true
                            })
                            related.push.apply(related, nodes)
                            simulation.force('link').links().forEach(link => {
                                if (nodes.indexOf(link.source) != -1 || nodes.indexOf(link.target) != -1) {
                                    if (related.indexOf(link.source) === -1) { related.push(link.source) }
                                    if (related.indexOf(link.target) === -1) { related.push(link.target) }
                                }
                            })
                            node.filter(item => {
                                return related.indexOf(item) > -1
                            })
                                .classed('svg-highlight', function (d) {
                                    d.opacity = 1
                                    return true
                                })
                            link.filter(item => {
                                return nodes.indexOf(item.source) != -1 || nodes.indexOf(item.target) != -1
                            })
                                .classed('svg-highlight', function (d) {
                                    d.opacity = 1
                                    return true
                                })
                            if (linkText) {
                                linkText.classed('svg-fadeout', function (d) {
                                    d.opacity = 0.3
                                    return true
                                })
                                linkText.filter(item => {
                                    return nodes.indexOf(item.source) != -1 || nodes.indexOf(item.target) != -1
                                })
                                    .classed('svg-highlight', function (d) {
                                        d.opacity = 1
                                        return true
                                    })
                            }
                        } else {
                            graph.removeHightlight()
                        }
                    }
                    // 连线节点淡入淡出
                    function linkMouseOverOut(links, flag) {
                        if (flag) {
                            const related = []
                            node.classed('svg-fadeout', function (d) {
                                d.opacity = 0.3
                                return true
                            })
                            link.classed('svg-fadeout', function (d) {
                                d.opacity = 0.3
                                return true
                            })
                            links.forEach(link => {
                                related.push(link.source)
                                related.push(link.target)
                            })
                            node.filter(item => {
                                return related.indexOf(item) > -1
                            })
                                .classed('svg-highlight', function (d) {
                                    d.opacity = 1
                                    return true
                                })
                            link.filter(item => {
                                return links.indexOf(item) != -1
                            })
                                .classed('svg-highlight', function (d) {
                                    d.opacity = 1
                                    return true
                                })
                            if (linkText) {
                                linkText.classed('svg-fadeout', function (d) {
                                    d.opacity = 0.3
                                    return true
                                })
                                linkText.filter(item => {
                                    return links.indexOf(item) != -1
                                })
                                    .classed('svg-highlight', function (d) {
                                        d.opacity = 1
                                        return true
                                    })
                            }
                        } else {
                            graph.removeHightlight()
                        }
                    }
                    // 拖拽开始事件
                    function dragstarted(d) {
                        d3.event.sourceEvent.stopPropagation();
                        if (!opt.allowDrag || d.isfixed) return;
                        if (opt.type.indexOf('force') != -1) {
                            isDragging = true;
                            return;
                        }
                        if (!d3.event.active && opt.useForce) {
                            simulation.alphaTarget(0.3).restart();
                        }
                        d.fx = d.x;
                        d.fy = d.y;
                        isDragging = true;
                        // console.log('bindBrushDragStart',d3.event,d3.mouse(this))
                    }
                    // 拖拽中事件
                    function dragged(d) {
                        if (!opt.allowDrag || d.isfixed) return;
                        if (opt.useForce && (opt.type.indexOf('force') != -1)) {
                            d.x = d3.event.x;
                            d.y = d3.event.y;
                            // 重新绘制当前节点以及相关的链路位置即可
                            var nodeTmp = d3.select(this);
                            nodeTmp
                                .attr("transform", function (d) {
                                    return "translate(" + d.x + "," + d.y + ")";
                                }).attr("x", function (d) {
                                    if (!opt.useForce || d.isfixed) {
                                        d.x = d.fx || d.x;
                                        d.fx = d.x;
                                    }
                                    return d.x;
                                }).attr("y", function (d) {
                                    if (!opt.useForce || d.isfixed) {
                                        d.y = d.fy || d.y;
                                        d.fy = d.y;
                                    }
                                    return d.y;
                                })
                                .classed("fixed", function (d) {
                                    return (d.vx < 0.01) && (d.vy < 0.01);
                                });
                            var linkTmp = link.filter(function (v, i) {
                                return v.source.id == d.id || v.target.id == d.id
                            });
                            drawPathBezier(linkTmp);
                            var linkTextTmp = linkText.filter(function (v, i) {
                                return v.source.id == d.id || v.target.id == d.id
                            });
                            //选中效果
                            if (linkTextTmp) {
                                linkTextTmp.attr("transform", drawLinkTextPosition)
                                    .attr("style", function (d) {
                                        let result = drawLinkTextPosition(d)
                                        if (result && result.length) {
                                            return "display:block"
                                        } else {
                                            return "display:none"
                                        }
                                    });
                            }
                            return;
                        }
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                        if (!opt.useForce) {
                            draw(d);
                            Thumbnail()
                        }
                    }
                    // 拖拽结束事件
                    function dragended(d) {
                        if (!opt.allowDrag) return false;
                        if (opt.useForce && (opt.type.indexOf('force') != -1)) {
                            if (!d3.event.active)
                                simulation.alphaTarget(0);
                            // d.fx = null;
                            // d.fy = null;
                        }
                        Thumbnail()
                        isDragging = false;
                    }
                    function brushDragged(d) {
                        let dx = d3.event.dx, dy = d3.event.dy;
                        node.filter(function (d) { return d.selected; })
                            .attr("x", function (d) {
                                d.x += dx
                                return d.x;
                            }).attr("y", function (d) {
                                d.y += dy
                                return d.y;
                            }).attr("transform", function (d) {
                                return "translate(" + d.x + "," + d.y + ")";
                            });
                        let filterLink = link.filter(function (d) { return d.source.selected || d.target.selected; })
                        drawPathBezier(filterLink);
                        //选中效果
                        if (linkText) {
                            linkText
                                .filter(function (d) { return d.source.selected || d.target.selected; })
                                .attr("transform", drawLinkTextPosition)
                                .attr("style", function (d) {
                                    let result = drawLinkTextPosition(d)
                                    if (result && result.length) {
                                        return "display:block"
                                    } else {
                                        return "display:none"
                                    }
                                });
                        };
                        if (opt.allowMarker && relMarkerGroup && relmarkers) {
                            relMarkerGroup
                                .selectAll("path")
                                .selectAll('animateMotion')
                                .filter(function (d) { return d.source.selected || d.target.selected; })
                                .attr("path", function (d) {
                                    return linkGroup.select('#link-' + d.id).attr('d');
                                });
                        }
                    }
                    // 力运动结束
                    function ticked_end() {
                        // draw();
                        // viewData();
                        node.data().forEach(function (d) {
                            d.fx = d.x;
                            d.fy = d.y;
                        });

                        if (opt.useForce) {
                            initIsFinish = true;
                        }
                        opt.completed();
                        stop_ticked = true;
                        tick = 0
                        if (initOnce) {
                            graph.displayAdapt()
                            // graph.displayAdapt()
                            initOnce = false;
                        }
                        Thumbnail();
                    }
                    // 力运动
                    function ticked() {
                        tick++;
                        // draw();
                        if (!opt.useForce && (opt.type.indexOf('force') != -1)) {
                            simulation.stop();
                        }
                        if (opt.useForce) {
                            if (initOnce) {
                                if (linkObjs.length >= 1500) {
                                    if (tick <= 2) {
                                        draw();
                                    }
                                    if (simulation.alpha() <= 0.05) {
                                        draw();
                                        simulation.stop();
                                        ticked_end();
                                    }
                                } else {
                                    draw();
                                    if (tick <= 2) {
                                        graph.displayAdapt();
                                    }
                                }
                            } else {
                                if (linkObjs.length >= 1000 && simulation.alpha() <= 0.05) {
                                    draw();
                                    simulation.stop();
                                    ticked_end();
                                } else {
                                    draw();
                                }
                            }
                        }
                    }
                    // 图形开始缩放事件
                    function zoomStartEvent() {
                        const evt = d3.event
                        closeModalPanel();
                        // 阻止默认事件
                        evt.sourceEvent.stopPropagation()
                    }
                    // 图形的缩放中
                    function zoomingEvent() {
                        const evt = d3.event
                        if (JSON.stringify(svgScale) === JSON.stringify(evt.transform)) return
                        zoomEvent()
                    }
                    // 图形结束缩放事件
                    function zoomEndEvent() {
                        const evt = d3.event
                        if (!evt.shiftKey) {
                            // 结束后触发
                            zoomEvent(evt)
                        }
                    }
                    // 平移缩放事件
                    function zoomEvent() {
                        const evt = d3.event
                        if (((evt.type !== 'end' && evt.shiftKey !== undefined && !evt.shiftKey) || (evt.type !== 'end' && evt.shiftKey === undefined && !evt.sourceEvent.shiftKey) || evt.type === 'end')) {
                            svgScale = evt.transform
                            container
                                .attr('transform', d3.event.transform);
                            if (linkText) {
                                if (svgScale.k < 0.3) {
                                    linkText.attr('style', 'display:none');
                                } else {
                                    linkText.attr('style', 'display:block');
                                }
                            }
                            Thumbnail();
                        }
                        // 如果当前是框选模式下，在进行缩放时需对框选容器的大小进行更新
                        let x = (0 - svgScale.x) / svgScale.k;
                        let y = (0 - svgScale.y) / svgScale.k;
                        let width = (opt.width + 100) * (1 / svgScale.k)
                        let height = (opt.height + 100) * (1 / svgScale.k)
                        brushGroup.select('.overlay')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('width', width)
                            .attr('height', height);
                    }
                    //获取svg显示区域对象
                    function getViewArea() {
                        var offset_x = 0,
                            offset_y = 0;
                        var svgRect = d3.select('svg')
                        var svg_w = Number(svgRect.attr('width'));
                        var svg_h = Number(svgRect.attr('height'));
                        try {
                            //svg宽高
                            svg_w = svg_w / svgScale.k;
                            svg_h = svg_h / svgScale.k;

                            //可视区域左上角, 相对svg中心点的偏移
                            offset_x = svgScale.x / svgScale.k * -1;
                            offset_y = svgScale.y / svgScale.k * -1;
                        } catch (e) { }

                        var view_min_x = offset_x;
                        var view_max_x = offset_x + svg_w;
                        var view_min_y = offset_y;
                        var view_max_y = offset_y + svg_h;
                        return [
                            [view_min_x, view_min_y],
                            [view_max_x, view_max_y]
                        ];
                    }
                    function viewData(all, fun) {
                        if (fun) {
                            fun();
                        }
                        if (opt.allowThumbnail) TNViewArea();
                    }
                    //事件绑定
                    function addEvent() {
                        // 注册默认的鼠标移动高亮和框选事件
                        // bindMouse();
                        // 注册默认的键盘按下事件
                        bindKeypress();
                        // 绑定拖拽事件
                        bindDrag();
                        bindZoomPan();
                        node
                            .on('mouseover', function (d) {
                                if (!isDragging) {
                                    document.querySelector('.nodes').appendChild(this);
                                }
                                // 判断当前的数据是否有被选中的节点，有的话不加高亮效果
                                let groupNode = document.querySelectorAll('.node.selected')
                                if (opt.type.indexOf('force') != -1 && (groupNode && groupNode.length <= 0)) {
                                    nodeMouseOverOut([d], true)
                                }

                            })
                            .on("mouseout", function (d) {
                                opt.mouseoutEvt(d);
                                let groupNode = document.querySelectorAll('.node.selected')
                                var selectedGroupLength = groupNode ? groupNode.length : 0
                                var isExist = false
                                for (var i = 0; i < groupNode.length; i++) {
                                    var item = groupNode[i]
                                    if (item.id == this.id) {
                                        isExist = true;
                                        break;
                                    }
                                }
                                if (groupNode && isExist) {
                                    selectedGroupLength = selectedGroupLength - 1
                                }
                                if (opt.type.indexOf('force') != -1
                                    && this.className.baseVal.indexOf('selected') == -1
                                    && selectedGroupLength <= 0) {
                                    nodeMouseOverOut([d], false)
                                }
                            })
                            .on("mousedown", mousedownEvent);
                        if (opt.type != 'tree' && opt.type != "level") {
                            if (link) link.on("click.link", function (d) {
                                linkEventFn(d, this)
                            });
                            if (linkText) linkText.on("click", function (d) {
                                linkEventFn(d, this)
                            });
                        }
                        bg_rect.on('click.rect', function (d) {     
                            eventType = "clear"                       
                            graph.removeHightlight()                            
                            clearAllSelection()
                            if (node) {
                                node.classed('selected', false)
                                selectedNodesArr = []
                            }
                        });
                        bg_rect.on('dblclick', function () {                            
                            eventType = "clear"
                            graph.removeHightlight()
                            clearAllSelection()
                            if (node) {
                                node.classed('selected', false)
                                selectedNodesArr = []
                            }
                            opt.bgclickEvt();
                        });
                        if (opt.allowNodeDbclick) {
                            nodeGroup.selectAll('g[type="node"]').on('dblclick', evtExpandMenu);
                        }
                    }
                    // 注册鼠标事件:框选
                    function bindMouse() {
                        graphContainer.on('mousedown', mousedownEvent)
                    }
                    // 使用鼠标或触摸选择一维或二维区域
                    function bindBrush() {
                        let x = (0 - svgScale.x) / svgScale.k;
                        let y = (0 - svgScale.y) / svgScale.k;
                        brushGroup.call(d3.brush()
                            .extent([[x, y], [(opt.width + 100) * (1 / svgScale.k), (opt.height + 100) * (1 / svgScale.k)]])
                            .on("start", brushstarted)
                            .on("brush", brushed)
                            .on("end", brushended))
                            .on("click.overlay", function (d) {
                                if (node) {
                                    node.classed('selected', false)
                                }
                                graph.removeHightlight()
                                clearAllSelection()
                            });
                    }
                    // 使用鼠标或触摸选择一维或二维区域
                    function unbindBrush() {
                        let x = (0 - svgScale.x) / svgScale.k;
                        let y = (0 - svgScale.y) / svgScale.k;
                        brushGroup.call(d3.brush()
                            .extent([[x, y], [(opt.width + 100) * (1 / svgScale.k), (opt.height + 100) * (1 / svgScale.k)]])
                            .on(".brush", null));
                        brushGroup.selectAll('*').remove();
                        brushGroup.attr('fill', false)
                            .attr('pointer-events', false)
                            .attr('style', false)
                    }
                    function brushstarted() {
                        if (d3.event.sourceEvent.type !== "end") {
                            node.classed("selected", function (d) {
                                return d.selected = d.previouslySelected = ctrlKey && d.selected;
                            });
                        }
                    }
                    function brushed() {
                        if (d3.event.sourceEvent.type !== "end") {
                            var selection = d3.event.selection;
                            let x0, y0, x1, y1;
                            if (selection) {
                                x0 = selection[0][0]
                                x1 = selection[1][0]
                                y0 = selection[0][1]
                                y1 = selection[1][1]
                            }
                            node.classed("selected", function (d) {
                                return d.selected = d.previouslySelected ^
                                    (selection != null
                                        && x0 <= d.x && d.x < x1
                                        && y0 <= d.y && d.y < y1);
                            });
                        }
                    }
                    function brushended() {
                        if (d3.event.selection != null) {
                            d3.select(this).call(d3.event.target.move, null);
                        }
                    }
                    // 绑定键盘事件
                    function bindKeypress() {
                        d3.select('body').on('keydown.brush', keydownedEvent)
                        d3.select('body').on('keyup.brush', keyuppedEvent)
                    }
                    // 鼠标按下
                    function mousedownEvent(d) {
                        const event = d3.event
                        if (event != null && event.ctrlKey && event.button === 0) {
                            if (ctrlKey) {
                                d3.select(this).classed("selected", d.selected = !d.selected);
                                d3.event.stopImmediatePropagation();
                            } else if (!d.selected) {
                                node.classed("selected", function (p) { return p.selected = d === p; });
                            }
                        }
                    }
                    // 键盘按下事件
                    function keydownedEvent() {
                        const event = d3.event
                        if (!event.metaKey) {
                            // 37：左键LEFT 39：右键RIGHT
                            if (event != null && (event.keyCode === 37 || event.keyCode === 39)) {
                                let KEYCODE = event.keyCode === 37 ? 'LEFT' : 'RIGHT'
                                keydownLeftAndRightEvt(KEYCODE);
                                opt.keypressEvt(KEYCODE)
                            }
                        }
                        if (event.metaKey || event.ctrlKey) {
                            // 禁止缩放平移
                            // unbindZoomPan()
                            unbindDrag()
                            bindBrushDrag()
                            bindBrush();
                        } else {
                            // bindZoomPan()
                            bindDrag()
                            unbindBrush();
                            node.classed("selected", function (p) { return p.selected = false; });
                        }
                        ctrlKey = event.ctrlKey || event.metaKey;
                    }
                    // 键盘按键抬起事件
                    function keyuppedEvent() {
                        ctrlKey = d3.event.ctrlKey || d3.event.metaKey;
                    }
                    // 键盘左右键的事件方法
                    function keydownLeftAndRightEvt(keyCode) {
                        if (
                            fitAllSelectionNodes &&
                            fitAllSelectionNodes.nodes.length <= 0 &&
                            fitSelectionNode == null
                        )
                            return;
                        let nodes = fitAllSelectionNodes.nodes;
                        let links = fitAllSelectionNodes.links;
                        let currentNodeIndex = nodes.findIndex(
                            x => x == fitSelectionNode
                        );
                        let nextNodeIndex = 0;
                        if (currentNodeIndex == -1) nextNodeIndex = 0;
                        if (keyCode == "RIGHT") {
                            if (currentNodeIndex >= nodes.length - 1) {
                                nextNodeIndex = currentNodeIndex;
                            } else {
                                nextNodeIndex = currentNodeIndex + 1;
                            }
                        } else if (keyCode == "LEFT") {
                            if (currentNodeIndex <= 0) {
                                nextNodeIndex = 0;
                            } else {
                                nextNodeIndex = currentNodeIndex - 1;
                            }
                        }
                        fitDisplaySelection(nodes, links, nodes[nextNodeIndex]);
                        fitSelectionNode = nodes[nextNodeIndex];
                    }
                    // 绘制框选区域
                    function drawSquareRect() {
                        let x = svgScale.invertX(startPoint.x)
                        let y = svgScale.invertY(startPoint.y)
                        g_o = g_main.append("g");
                        g_o.attr("fill", "none")
                            .attr("pointer-events", "all")
                            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                            .attr("transform", "translate(" + x + "," + y + ")");
                        let squareRect = g_o.append("rect")
                            .attr("class", "overlay")
                            .attr("pointer-events", "all")
                            .attr("cursor", "crosshair")
                            .attr("fill", "#777")
                            .attr("fill-opacity", 0.3)
                            .attr("stroke", "#000000")
                            .attr("shape-rendering", "crispEdges");
                        graphContainer.on('mousemove', () => {
                            // var me = document.querySelector('.svgGraph');
                            var width = d3.event.layerX - startPoint.x;
                            var height = d3.event.layerY - startPoint.y;
                            // console.log('mousemove', { width, height }, { layerX: d3.event.layerX, layerY: d3.event.layerY })
                            squareRect.attr("width", Math.abs(width)).attr("height", Math.abs(height));
                        })
                        graphContainer.on('mouseup', () => {
                            mouseUpEvent(squareRect)
                            graphContainer.on('mousemove', null, true)
                            bindDrag();
                            bindZoomPan();
                        })

                    }
                    function mouseUpEvent(squareRect) {
                        var nodes = [];
                        // 获取选中区域的节点
                        var cBBox = squareRect.getBoundingClientRect();
                        for (const node of nodeObjs) {
                            if (!isInViewport(cBBox, node)) continue
                            nodes.push(node)
                        }
                        g_o.remove();
                        g_o = null;
                        if (nodes.length > 0) {
                            clearAllSelection();
                            graph.selectedElements(nodes, []);
                        }
                    }
                    // 注册绑定拖拽事件
                    function bindDrag() {
                        node.call(d3.drag()
                            .filter(nodeDragFilter)
                            .subject(nodeDragSubject)
                            .on("start", dragstarted)
                            .on("drag", dragged)
                            .on("end", dragended));
                    }
                    // 取消绑定拖拽事件
                    function unbindDrag() {
                        node.call(d3.drag()
                            .filter(nodeDragFilter)
                            .subject(nodeDragSubject)
                            .on('.drag', null));
                    }
                    function bindBrushDrag() {
                        node.call(d3.drag()
                            .filter(nodeDragFilter)
                            .subject(nodeDragSubject)
                            .on("start", dragstarted)
                            .on("drag", brushDragged));
                    }
                    // 注册缩放平移事件
                    function bindZoomPan() {
                        graphContainer.call(
                            d3.zoom().scaleExtent([.01, 5])
                                .extent([
                                    [-1, -1],
                                    [opt.width + 1, opt.height + 1]
                                ])
                                .on('start', zoomStartEvent)
                                .on('zoom', zoomingEvent)
                                .on('end', zoomEndEvent)
                        ).on('dblclick.zoom', null);
                    }
                    // 取消注册平移缩放事件
                    function unbindZoomPan() {
                        graphContainer.call(
                            d3.zoom()
                                .on('start', null)
                                .on('zoom', null)
                                .on('end', null)
                        )
                    }
                    // 关闭浮层
                    function closeModalPanel(evt) {
                        let target = d3.event ? d3.event.target : evt ? evt.target : null;
                        if (document.querySelector('.tlist')) { //点击空白处隐藏
                            document.querySelector('.tlist').style.display = 'none';
                        }
                        if (document.querySelector('.panel')) { //点击空白处隐藏
                            document.querySelector('.panel').style.display = 'none';
                        }
                        if (document.querySelector('.titleBox')) { //点击空白处隐藏
                            document.querySelector('.titleBox').style.display = 'none';
                        }
                        if (target && target.tagName != 'path' && target.tagName != 'circle') {
                            d3.selectAll('g.exMenuGroup').remove();
                        }
                        if (document.querySelector('#rMenu')) {
                            document.querySelector('#rMenu').style.display = 'none';
                        }
                    }
                    // 节点的点击事件
                    function evtClickNode(data) {
                        clearAllSelection();
                        selectedNodes([data.id]); // id >> nodeId
                        // 获取选中的节点
                        if (opt.allowMulituple) {
                            let selectIds = selectedNodesArr.map(x => {
                                return x.replace("#node-", "")
                            })
                            console.log('selectedNodesArr', selectedNodesArr, selectIds, nodeObjs)
                            let nodesArr = nodeObjs.filter(x => {
                                return selectIds.indexOf(x.id) != -1 || (x.data && selectIds.indexOf(x.data.id) != -1)
                            })
                            opt.selectNode && opt.selectNode(nodesArr);
                        } else {
                            opt.selectNode && opt.selectNode([data]);
                        }
                    }
                    //扩展菜单
                    function evtExpandMenu(di) {
                        if (opt.type == 'tree' && (!opt.allowNodeDbclick || !di.data.exist)) return false;
                        if ((opt.type.indexOf('force') != -1) && (!opt.allowNodeDbclick || !di.exist)) return false;
                        d3.selectAll('g.exMenuGroup').remove();
                        var arrlist = ['expand', 'edit', 'del', 'add', 'lock'];
                        arrlist = opt.expandlist.length ? opt.expandlist : arrlist;
                        var menuMap = {
                            'expand': {
                                text: '扩展',
                                color: '#4498e9',
                                hColor: '#efa10b',
                                type: 'expand',
                                path: 'M99.5 284.8h61.3v-74l260.3 260.3 43.4-43.4L198.8 162h84.8v-61.4H99.5zM869.1 825.8L603.4 560 560 603.4l260.3 260.4h-73.9v61.3h184.1V741h-61.4zM160.1 742.4H98.7v184.1h184.2v-61.3h-68.6l263.1-263.1-43.4-43.4-273.9 273.9zM742 102v61.3h90.2l-263 263.1 43.4 43.4 252.2-252.2v68.5h61.4V102z',
                                value: 5
                            },
                            'del': {
                                text: '删除',
                                color: '#1464b2',
                                hColor: '#efa10b',
                                type: 'del',
                                path: 'M568.96 512.064l326.336-326.336a39.232 39.232 0 1 0-55.552-55.552L513.408 456.512l-326.4-326.336a39.232 39.232 0 1 0-55.552 55.552l326.4 326.336L131.584 838.4a39.232 39.232 0 1 0 55.552 55.552l326.336-326.336 326.336 326.336c15.36 15.232 40.192 15.232 55.552 0a39.36 39.36 0 0 0 0-55.552l-326.4-326.336z',
                                value: 5
                            },
                            'lock': {
                                text: '锁定',
                                color: '#297dce',
                                hColor: '#efa10b',
                                type: 'lock',
                                path: 'M270.118128 307.243574C270.118128 173.883915 378.618553 65.361702 512 65.361702 645.35966 65.361702 753.860085 173.883915 753.860085 307.243574L753.860085 354.914043 270.118128 354.914043 270.118128 307.243574ZM827.914894 354.914043 819.221787 354.914043 819.221787 305.740255C819.221787 305.217362 819.091064 304.716255 819.069277 304.215149 817.413447 136.213787 680.371745 0 512 0 343.606468 0 206.564766 136.213787 204.908936 304.215149 204.887149 304.738043 204.756426 305.217362 204.756426 305.740255L204.756426 354.914043 196.085106 354.914043C130.004426 354.914043 76.255319 408.663149 76.255319 474.722043L76.255319 635.468255C76.255319 653.529872 90.874553 668.149106 108.93617 668.149106 126.976 668.149106 141.617021 653.529872 141.617021 635.468255L141.617021 474.722043C141.617021 444.699234 166.040511 420.253957 196.085106 420.253957L827.914894 420.253957C857.937702 420.253957 882.382979 444.699234 882.382979 474.722043L882.382979 796.693787C882.382979 904.344511 842.664851 948.267574 745.341277 948.267574L278.636936 948.267574C181.313362 948.267574 141.617021 904.344511 141.617021 796.693787 141.617021 778.653957 126.976 764.012936 108.93617 764.012936 90.874553 764.012936 76.255319 778.653957 76.255319 796.693787 76.255319 940.642043 144.340426 1013.629277 278.636936 1013.629277L745.341277 1013.629277C879.659574 1013.629277 947.744681 940.642043 947.744681 796.693787L947.744681 474.722043C947.744681 408.663149 893.973787 354.914043 827.914894 354.914043ZM511.991285 835.716902C536.828732 835.716902 557.025498 815.040817 557.025498 789.615115L557.025498 680.766094C578.159115 665.66754 591.03537 640.677583 591.03537 614.031796 591.03537 569.237243 555.565753 532.7872 511.991285 532.7872 468.416817 532.7872 432.9472 569.237243 432.9472 614.031796 432.9472 640.677583 445.845243 665.689328 467.000647 680.766094L467.000647 789.615115C467.000647 815.040817 487.175626 835.716902 511.991285 835.716902Z',
                                value: 5
                            },
                            'edit': {
                                text: '编辑',
                                color: '#03509a',
                                hColor: '#efa10b',
                                type: 'edit',
                                path: 'M649.118225 40.89351H143.783911C64.85209 40.89351 0 103.953634 0 181.733477V883.202699C0 961.025207 64.766759 1024 144.637228 1024h720.284861c79.955801 0 144.637228-63.102791 144.637228-140.925299V394.422734h-72.105285v488.651967c0 39.081918-32.426045 70.697312-72.531943 70.697312H144.637228c-40.105898 0-72.531943-31.572728-72.531943-70.61198V181.733477c0-38.911254 32.426045-70.61198 71.721292-70.61198h505.291648V40.89351z m-196.604232 465.953735a34.474006 34.474006 0 0 0 0 49.663049 36.735296 36.735296 0 0 0 50.98569 0L1013.399243 59.965144a34.474006 34.474006 0 0 0 0-49.663048 36.735296 36.735296 0 0 0-50.985689 0L452.513993 506.847245z',
                                value: 5
                            },
                            'add': {
                                text: '添加',
                                color: '#4faafe',
                                hColor: '#efa10b',
                                type: 'add',
                                path: 'M451.318 451.318h-364.036c-33.754 0-60.734 27.168-60.734 60.682 0 33.747 27.191 60.682 60.734 60.682h364.036v364.036c0 33.754 27.168 60.734 60.682 60.734 33.747 0 60.682-27.191 60.682-60.734v-364.036h364.036c33.754 0 60.734-27.168 60.734-60.682 0-33.747-27.191-60.682-60.734-60.682h-364.036v-364.036c0-33.754-27.168-60.734-60.682-60.734-33.747 0-60.682 27.191-60.682 60.734v364.036z',
                                value: 5
                            }
                        }
                        var dataset = arrlist.map(function (ele) {
                            return menuMap[ele];
                        });

                        if (di.data.nodeType == 'QB_ZP_TP') {
                            var exMenuGroup = d3.select(this)
                                .append('g')
                                .attr('class', 'exMenuGroup');
                            var pie = d3.pie();
                            var arc = d3.arc().innerRadius(80).outerRadius(40);
                            var arcs = exMenuGroup.selectAll("g.exMenuArc")
                                .data(pie(dataset.map(function (ele) {
                                    return ele.value;
                                })))
                                .enter()
                                .append("g")
                                .attr("class", "exMenuArc")
                                .attr("alt", function (d, i) {
                                    return dataset[i].text;
                                })
                                .on('dblclick', function (d, i) { //扩展下一层改成双击事件
                                    d3.event.preventDefault();
                                    d3.event.stopPropagation();
                                    opt.expandEvt(dataset[i], di, tree, i);
                                    d3.selectAll('g.exMenuGroup').remove();
                                });
                            arcs.append("path")
                                .attr("class", "exMenuCircle")
                                .attr("fill", function (d, i) {
                                    return dataset[i].color;

                                })
                                .attr("d", arc)
                                .on('mouseover', function (d, i) {
                                    d3.select(this)
                                        .attr('fill', dataset[i].hColor);
                                })
                                .on('mouseout', function (d, i) {
                                    d3.select(this)
                                        .attr('fill', dataset[i].color);
                                });
                            arcs.append("path")
                                .attr("class", "exMenuIcon")
                                .attr("d", function (d, i) {
                                    return dataset[i].path;
                                })
                                .attr("fill", "#fff")
                                .attr("txet-anchor", "middle")
                                .attr("transform", function (d, i) {
                                    return "translate(" + (arc.centroid(d)[0] - 10) + "," + (arc.centroid(d)[1] - 10) + ")scale(0.02)";
                                });
                        } else {
                            var exMenuGroup = d3.select(this)
                                .append('g')
                                .attr('class', 'exMenuGroup');
                            exMenuGroup
                                .append('rect')
                                .attr('class', 'exMenuRect')
                                .attr("width", opt.nodeEleSize.width)
                                .attr("height", opt.nodeEleSize.height)
                                .attr('fill', function (d) {
                                    return 'rgba(0,0,0,0.5)';
                                })
                                .attr('stroke', '#d7d7d7')
                                .attr('stroke-width', 5)
                                .attr('y', -(opt.nodeEleSize.height / 2))
                                .attr('x', function (d) {
                                    return -opt.nodeEleSize.width / 2;
                                })
                                .attr("rx", "5");

                            var pie = d3.pie();
                            var arc = d3.arc().innerRadius(80).outerRadius(40);
                            var arcs = exMenuGroup.selectAll("circle.exMenuArc")
                                .data(pie(dataset.map(function (ele) {
                                    return ele.value;
                                })))
                                .enter()
                                .append("circle")
                                .attr("class", "exMenuArc")
                                .attr("alt", function (d, i) {
                                    return dataset[i].text;
                                })
                                .attr('r', 20)
                                .attr('fill', '#fff')
                                .attr("stroke", function (d) {
                                    return '#358af6';
                                })
                                .attr('stroke-width', 2)
                                .attr('cx', function (d, i) {
                                    var to = (dataset.length - 1) * -35;
                                    return '' + parseInt(to + i * 70) + '';
                                })
                                .attr('cy', 0)
                                .on('dblclick', function (d, i) { //扩展下一层改成双击事件
                                    d3.event.preventDefault();
                                    d3.event.stopPropagation();
                                    opt.expandEvt(dataset[i], di, tree, i);
                                    d3.selectAll('g.exMenuGroup').remove();
                                });
                            var icon = exMenuGroup.selectAll("path.exMenuIcon")
                                .data(pie(dataset.map(function (ele) {
                                    return ele.value;
                                })))
                                .enter()
                                .append("path")
                                .attr("class", "exMenuIcon")
                                .attr("d", function (d, i) {
                                    return dataset[i].path;
                                })
                                .attr("fill", "#358af6")
                                .attr("txet-anchor", "middle")
                                .attr("transform", function (d, i) {
                                    var to = (dataset.length - 1) * -35 - 10;
                                    return "translate(" + parseInt(to + i * 70) + ",-9)scale(0.02)";
                                })
                                .on('dblclick', function (d, i) { //扩展下一层改成双击事件
                                    d3.event.preventDefault();
                                    d3.event.stopPropagation();
                                    opt.expandEvt(dataset[i], di, tree, i);
                                    d3.selectAll('g.exMenuGroup').remove();
                                });
                        }
                        opt.nodeDblClick(di);
                    }
                    // 
                    function linkEventFn(d, _this) {
                        if (node) {
                            node.classed('selected', false)
                            selectedNodesArr = []
                        }
                        graph.removeHightlight()
                        let groupNode = document.querySelectorAll('.link.selected')
                        var selectedGroupLength = groupNode ? groupNode.length : 0
                        var isExist = false
                        for (var i = 0; i < groupNode.length; i++) {
                            var item = groupNode[i]
                            if (item.id == _this.id) {
                                isExist = true;
                                break;
                            }
                        }
                        if (groupNode && isExist) {
                            selectedGroupLength = selectedGroupLength - 1
                        }
                        if (opt.type.indexOf('force') != -1
                            && _this.className.baseVal.indexOf('selected') == -1
                            && selectedGroupLength <= 0) {
                            opt.linkClick(d, d3.event)
                            evtClickLink(d)
                        }
                    }
                    // 点击连线
                    function evtClickLink(data) {
                        if ('shift' == eventType) {

                        } else if ('ctrl' == eventType) {
                            var id_index = selectedLinkLabelsArr.indexOf('#link-label-' + data.id);
                            if (id_index == -1) {
                                selectedLinks([data.id]);
                                if (opt.type.indexOf('force') != -1) {
                                    selectedNodes([data.source.id, data.target.id])
                                    linkMouseOverOut([data], true)
                                }
                            } else {
                                selectedLinkLabelsArr.splice(id_index, 1);
                                selectedLinkLabelRectsArr.splice(id_index, 1);

                                linkTextGroup.selectAll('#link-label-' + data.id).select("[type='linktext']").attr('class', '');
                                linkTextGroup.selectAll('#link-label-rect-' + data.id).remove();
                            }
                        } else {
                            clearAllSelection();
                            selectedLinks([data.id]);
                            if (opt.type.indexOf('force') != -1) {
                                selectedNodes([data.source.id, data.target.id])
                                linkMouseOverOut([data], true)
                            }
                        }
                    }
                    // 缩略图中点击事件
                    function evtClickNT() {
                        console.log('nt-click')
                        if (isDragging) {
                            isDragging = false
                            return
                        }
                        const ntBBox = document.querySelector('.svgNT').getBoundingClientRect()
                        const [x, y] = d3.mouse(document.querySelector('.nt-rect'))
                        let tx, ty
                        if (nodeObjs.length > viewNodeObjs.length) { // 可视屏幕中心
                            const { minX, maxX, minY, maxY } = nodeAndBoxrange
                            const rangeCenter = {
                                x: (minX + maxX) / 2,
                                y: (minY + maxY) / 2
                            }
                            tx = (viewCenter.x - rangeCenter.x) * thumbScale.k + ntBBox.width / 2
                            ty = (viewCenter.y - rangeCenter.y) * thumbScale.k + ntBBox.height / 2
                        } else { // 缩略图中心
                            tx = ntBBox.width / 2
                            ty = ntBBox.height / 2
                        }
                        // 向量偏移量
                        const vector = {
                            x: x - tx,
                            y: y - ty
                        }
                        // 赋值偏移量并重绘主画布
                        const bs = svgScale
                        bs.x -= opt.NTConfig.ThumbScale * vector.x
                        bs.y -= opt.NTConfig.ThumbScale * vector.y
                        // console.log('nt-click-scale',bs)
                        setTransform(bs.x, bs.y, bs.k, 0);
                        Thumbnail();
                        startPoint = {
                            x, y
                        }


                        // ------老的计算逻辑-----
                        // var ntsvg = document.getElementsByClassName('svgNT')[0].getBBox(),
                        //     x = d3.event.offsetX / ThumbnailTR.k - (ntsvg.width / 1) - opt.width / 2,
                        //     y = d3.event.offsetY / ThumbnailTR.k - (ntsvg.height / 1) - opt.height / 2;
                        // //  // 串并图
                        // let viewArea = document.querySelector('#viewArea').getBoundingClientRect();
                        // let viewAreaW = viewArea.width; // 串并图宽
                        // let viewAreaH = viewArea.height; // 串并图高
                        // // 缩略图中 鼠标点击的坐标
                        // let svgNToffsetX = d3.event.offsetX;
                        // let svgNToffsetY = d3.event.offsetY;
                        // let NT = document.querySelector('#NT').getBoundingClientRect(); // 缩略红点图
                        // let NTW = NT.width; // 红点图宽
                        // let NTH = NT.height; // 红点图高
                        // let svgNT = document.querySelector('.svgNT').getBoundingClientRect(); // 缩略图
                        // let NTLeft = NT.left - svgNT.left; // 因为是定位屏幕 所以top，left要减去偏差
                        // let NTTop = NT.top - svgNT.top;
                        // let NTClickX = NTW / 2 - (svgNToffsetX - NTLeft); // 与红点图中心 x 差
                        // let NTClickY = NTH / 2 - (svgNToffsetY - NTTop); // 与红点图中心 y 差

                        // // 串并图居中
                        // let svgGraph = document.querySelector('.svgGraph'); // 屏幕区
                        // let svgGraphW = svgGraph.getAttribute('width'); // 屏幕宽
                        // let svgGraphH = svgGraph.getAttribute('height'); // 屏幕高
                        // x = viewAreaW + (svgGraphW / 2) - (viewAreaW / 2) - (viewAreaW * 0.374);
                        // y = (svgGraphH / 2) - (viewAreaH / 2) - (viewAreaH * 0.306);

                        // // 再加上 缩略图折射到串并图上的圆心差
                        // x += viewAreaW * (NTClickX / NTW);
                        // y += viewAreaH * (NTClickY / NTH);

                        // // x = ((svgNToffsetX/ntsvg.width)-1)*viewArea.width;
                        // // y = ((svgNToffsetY/ntsvg.height)-0.5)*viewArea.height;
                        // // x = x - opt.width/1.7;
                        // // y = y + (opt.height)/5;
                        // // x = x - 700;
                        // // y = y + 100;
                        // setTransform(x, y, svgScale.k);
                        // Thumbnail();
                    }
                    // 鼠标移动事件
                    function evtMousemove(evt) {
                        if (isDragging) {
                            // console.log('nt-mouseover', evt)
                            const bounding = document.querySelector('.nt-rect').getBoundingClientRect()
                            const [x, y] = [evt.pageX - bounding.left, evt.pageY - bounding.top]
                            // 计算偏移量
                            const vector = {
                                x: x - startPoint.x,
                                y: y - startPoint.y
                            }
                            // 重绘
                            const bs = svgScale
                            bs.x -= opt.NTConfig.ThumbScale * vector.x
                            bs.y -= opt.NTConfig.ThumbScale * vector.y
                            setTransform(bs.x, bs.y, bs.k, 0);
                            Thumbnail();
                            // 重新记录拖拽初始位置
                            startPoint = {
                                x, y
                            }
                            isDragging = true
                        }
                    }
                    // 鼠标起来事件
                    function evtMouseup(evt) {
                        // console.log('nt-mouseup', evt)
                        isDragging = false
                        startPoint = void 0
                    }

                    function evtKeydown() {
                        if (d3.event.shiftKey) {
                            eventType = 'shift';
                            if (!g_main_init) {
                                g_main_init = true;
                                console.log('evtKeydown')
                                g_o = g_main.append("g");
                                g_o.attr("fill", "none")
                                    .attr("pointer-events", "all")
                                    .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
                                    .on('mousedown.rect touchstart.rect', evtRectBoxSelection);
                                var arr = getViewArea();
                                var view_min_x = arr[0][0];
                                var view_max_x = arr[1][0];
                                var view_min_y = arr[0][1];
                                var view_max_y = arr[1][1];
                                console.log('view', { view_min_x, view_min_y, view_max_x, view_max_y })
                                g_o.append("rect")
                                    .attr("class", "overlay")
                                    .attr("pointer-events", "all")
                                    .attr("cursor", "crosshair")
                                    .attr("x", view_min_x).attr("y", view_min_y)
                                    .attr("width", view_max_x - view_min_x).attr("height", view_max_y - view_min_y);
                                g_o.append("rect")
                                    .attr("class", "selection")
                                    .attr("cursor", "move")
                                    .attr("fill", "#777")
                                    .attr("fill-opacity", 0.3)
                                    .attr("stroke", "#000000")
                                    .attr("shape-rendering", "crispEdges");
                            }

                        } else if (d3.event.ctrlKey) {
                            eventType = 'ctrl';
                            if (d3.event.keyCode == 65) {
                                d3.event.returnValue = false;
                                graph.selectedAll();
                            }
                        }
                    }
                    function evtkeyup() {
                        if ('shift' == eventType) {
                            evtRectEnd();
                        } else if ('ctrl' == eventType) {

                        }
                        eventType = '';
                    }
                    //关系超过两条事 显示更多关系
                    function evtShowLinkMore() { }
                    //按下shift时事件
                    function evtRectBoxSelection() {
                        if ('shift' == eventType) {
                            console.log('evtRectBoxSelection')
                            touching = true;
                            var me = this,
                                p0 = d3.mouse(me);
                            var view = d3.select(d3.event.view)
                                .on("mousemove.rect", function () {
                                    evtRectMove(me, p0)
                                }, true)
                                .on("mouseup.rect", evtRectMouseup, true);
                        }
                    }
                    //按下shift时事件
                    function evtRectMove(me, p0) {
                        //关闭鼠标左键拖动整个画布的效果
                        d3.event.stopImmediatePropagation();
                        var p1 = d3.mouse(me);
                        if (p0[0] > p1[0]) {
                            area_x = p1[0], area_w = p0[0] - p1[0];
                        } else {
                            area_x = p0[0], area_w = p1[0] - p0[0];
                        }
                        if (p0[1] > p1[1]) {
                            area_y = p1[1], area_h = p0[1] - p1[1];
                        } else {
                            area_y = p0[1], area_h = p1[1] - p0[1];
                        }

                        if (!BoxArea) {
                            BoxArea = g_main.append('rect')
                                .attr('id', 'rect-move-box')
                                .attr('x', area_x).attr('y', area_y)
                                .attr('width', area_w).attr('height', area_h)
                                .attr("fill", "#777")
                                .attr("fill-opacity", 0.3)
                                .attr("stroke", "#000000")
                                .attr("shape-rendering", "crispEdges");
                        } else {
                            BoxArea.attr('x', area_x).attr('y', area_y)
                                .attr('width', area_w).attr('height', area_h);
                        }
                    }
                    //按下shift时事件
                    function evtRectMouseup() {
                        if (touching) {
                            evtRectEnd();
                        }
                    }
                    //按下shift时事件
                    function evtRectEnd() {
                        var view = d3.select(d3.event.view)
                            .on("mousemove.rect", null, true)
                            .on("mouseup.rect", null, true);
                        var nodes = [];
                        if (BoxArea) {
                            BoxArea.remove();
                            BoxArea = null;
                            //根据选择区域, 过滤nodes
                            var selectedNodes = nodeGroup.selectAll("[type='node']")
                                .filter(function (item, i) {
                                    var now_x = item.x;
                                    var now_y = item.y;
                                    var flag = (now_x <= (area_x + area_w) && now_x >= area_x) && (now_y <= (area_y + area_h) && now_y >= area_y);
                                    if (flag) {
                                        nodes.push(item.id);
                                    }
                                    return flag;
                                });
                        }
                        g_o.remove();
                        g_o = null;
                        g_main_init = false;

                        if (nodes.length > 0) {
                            clearAllSelection();
                            graph.selectedElements(nodes, []);
                        }
                        touching = false;
                    }
                    // 忽略一些拖拽启动事件
                    function nodeDragFilter(d) {
                        let tag = d3.event.target;
                        let parentNode = d3.event.target.parentNode;
                        let currentClassName = tag.className.baseVal;
                        let parentClassName = parentNode.className.baseVal;
                        let data = parentNode.__data__
                        let wirteList = ['node-text', 'node-eletext', 'node-circle', 'node-path', 'node-text-path', 'node-box']
                        let redList = ['risk-anjian', 'eletext', 'eletext selected']
                        // console.log(parentNode,d,data,currentClassName,parentClassName)
                        if (currentClassName.indexOf('node-side-button') != -1 || parentClassName.indexOf('node-side-button') != -1) {
                            opt.sideButtonEvt(data, tag.getAttribute('sideButton'), d3.event)
                            return false;
                        } else if (redList.indexOf(currentClassName) != -1 || redList.indexOf(parentClassName) != -1) {
                            // console.log('nodeDragFilter')
                            return false;
                        } else if (wirteList.indexOf(currentClassName.toLowerCase()) != -1 || wirteList.indexOf(parentClassName.toLowerCase()) != -1) {
                            if (opt.isEvtNodeClick && (d.opacity == undefined || d.opacity == 1 || (d.data && (d.data.opacity == undefined || d.data.opacity == 1)))) {
                                // console.log('clickNode',d3.event)
                                if(d3.event.button == 0) {
                                    evtClickNode(d)
                                }                                
                            }
                            return true;
                        } else {
                            // console.log('clickNode')
                            return true;
                        }

                    }
                    // 设置被拖拽的主体
                    function nodeDragSubject(d) {
                        if (opt.type != 'level') {
                            return d;
                        }
                    }
                    //选中的实体（多个）
                    function selectedNodes(idsArr) {
                        var node_ids = [],
                            node_label_ids = [];
                        for (var i = 0; i < idsArr.length; i++) {
                            var id = idsArr[i];
                            node_ids.push('#node-' + id);
                            node_label_ids.push('#node-label-' + id);
                            selectedNodesArr.push('#node-' + id);
                        }
                        if (node_ids.length == 0) return;
                        var selectFroup = nodeGroup.selectAll(node_ids.toString()).classed('selected', true);
                        redrawNode(selectFroup);
                        nodeGroup.selectAll(node_label_ids.toString()).classed('selected', true);
                    }
                    //选中的关系（多个）
                    function selectedLinks(idsArr) {
                        var link_label_ids = [],
                            link_ids = [];
                        for (var i = 0; i < idsArr.length; i++) {
                            var id = idsArr[i];
                            link_ids.push('#link-' + id);
                            link_label_ids.push('#link-label-' + id);
                            selectedLinkLabelsArr.push('#link-label-' + id);
                            selectedLinkLabelRectsArr.push('#link-label-rect-' + id);
                        }
                        if (link_label_ids.length == 0) return;
                        // 将选中的文本移植到组合的最后面
                        link_label_ids.forEach(x => {
                            let textNode = document.querySelector(x);
                            if (textNode) {
                                textNode.remove();
                                document.querySelector('.link-labels').appendChild(textNode);
                            }
                        })
                        // linkGroup.selectAll(link_ids.toString()).attr('stroke', function (d) {
                        //     return d.color || '#2296ff';
                        // });
                        link
                            .filter(link => {
                                return idsArr.indexOf(link.id) != -1
                            })
                            .classed('selected link-active', true)
                        linkTextGroup.selectAll(link_label_ids.toString()).classed('selected link-text-active', true);
                        // var link_label = linkTextGroup.selectAll(link_label_ids.toString());
                        // link_label.select('rect').classed('link-rect-active', true)
                        // link_label.select("[type='linktext']").classed('link-text-active', true);
                        var link_data = linkGroup.selectAll(link_ids.toString()).data();
                        link_data = link_data.filter(function (item) {
                            return 'forward' == item.direction || "reverse" == item.direction;
                        });

                        if (opt.allowMarker) {
                            relmarkers = relMarkerGroup.selectAll("path").data(link_data);
                            relmarkers.exit().remove();
                            relmarkers = relmarkers.enter().append("path")
                                .attr("id", function (d) {
                                    return "link-mark-path-" + d.id;
                                })
                                .attr("d", "M2,-4 L10,0 L2,4 L6,0 L2,-4")
                                .attr("markerWidth", "20").attr("markerHeight", "20").attr("viewBox", "0 0 20 20")
                                .attr("orient", "auto").attr("stroke", "red").attr("stroke-width", opt.markerSize || 8)
                                .merge(relmarkers);
                            relmarkers.append("animateMotion")
                                .attr("id", function (d) {
                                    return "link-mark-animate-" + d.id;
                                })
                                .attr("begin", "0s").attr("dur", function (d) {
                                    var path = linkGroup.select('#link-' + d.id).attr('d');
                                    var tmpArr = path.split(" ")
                                    if (tmpArr && tmpArr.length > 0) {
                                        var firstM = tmpArr[0].split(',')
                                        var lastL = tmpArr[tmpArr.length - 1].split(',')
                                        let lineLength = Math.abs(parseFloat(lastL[0].replace('L', "")) - parseFloat(firstM[0].replace('M', ""))) +
                                            Math.abs(parseFloat(lastL[1].replace('L', "")) - parseFloat(firstM[1].replace('M', "")))
                                        return (lineLength / 500) > 3 ? (lineLength / 500) + 's' : '3s'
                                    } else {
                                        return "3s";
                                    }
                                }).attr("rotate", "auto").attr("repeatCount", "indefinite")
                                .attr("path", function (d) {
                                    return linkGroup.select('#link-' + d.id).attr('d');
                                });
                        }

                        // opt.selectLink && opt.selectLink(link_ids);
                    }
                    //选中的元素
                    function selectElements(node_ids, link_ids) {
                        selectedNodes(node_ids);
                        selectedLinks(link_ids);
                        // console.log('selectElements')
                        Thumbnail();
                    }
                    //清除选中的关系
                    function clearLinkSelection() {
                        if (selectedLinkLabelsArr.length > 0) {
                            linkTextGroup.selectAll(selectedLinkLabelsArr.toString()).classed('selected link-text-active', false);
                            var link_path_marker = [];
                            for (var i = 0; i < selectedLinkLabelsArr.length; i++) {
                                var nid = selectedLinkLabelsArr[i].replace('label', 'mark-path');
                                link_path_marker.push(nid);
                            }
                            if (opt.allowMarker && opt.isHideMarkerOutsideClick) {
                                relMarkerGroup.selectAll(link_path_marker.toString()).remove();
                            }
                            selectedLinkLabelsArr = [];
                            selectedLinkLabelRectsArr = [];
                            link
                                .attr('stroke', function (d) {
                                    return !d.color
                                        ? d.linkShortName
                                            ? opt.topTagColors[d.linkShortName]
                                            : '#000000'
                                        : d.color;
                                })
                                .classed('selected link-active', false);
                        }

                    }
                    //清除选中的实体
                    //tree 与 force区分
                    function clearTreeNodeSelection() {
                        if (selectedNodesArr.length > 0) {
                            var s_node = nodeGroup.selectAll(selectedNodesArr.toString());
                            s_node.attr('class', '');
                            s_node.selectAll('text.eletext').filter(function (ele) {
                                return !ele.data.tags.length;
                            }).attr('class', '');
                            s_node.select('circle')
                                .attr('stroke', function (d) {
                                    var data = d.data;
                                    // return !data.exist ? '#a1a1a1' : data.icon && data.icon.color;
                                    return !data.exist ? '#a1a1a1' : data.isfixed ? opt.circle.fixedColor : (data.color || (data.icon && data.icon.color));
                                })
                                .filter(function (ele) {
                                    return ele.data.useKeyNode;
                                });
                            s_node.select('.node-path').attr('fill', function (d) {
                                var data = d.data;
                                return !data.exist ? '#a1a1a1' : data.isfixed ? opt.circle.fixedColor : (data.color || (data.icon && data.icon.color));
                            });
                            s_node.select('rect.node-box').attr('stroke', function (d) { //点击标签实体颜色高亮
                                d = d.data;
                                if (d.exist && d.image) {
                                    return d.color || (d.icon && d.icon.color);
                                } else {
                                    return '#d7d7d7'
                                }
                            });
                            s_node.select('rect.exMenuRect').attr('stroke', function (d) { //点击标签实体颜色高亮
                                d = d.data;
                                if (d.exist && d.image) {
                                    return d.color || (d.icon && d.icon.color);
                                } else {
                                    return '#d7d7d7'
                                }
                            });

                            selectedNodesArr = [];
                        }
                    }
                    function clearForceNodeSelection() {
                        if (selectedNodesArr.length > 0) {
                            var s_node = nodeGroup.selectAll(selectedNodesArr.toString());
                            s_node.classed('selected', false);
                            s_node.selectAll('text').filter(function (ele) {
                                return ele.tags ? !ele.tags.length : true;
                            }).classed('selected', false);
                            if (svgScale.k > 0.5) {
                                s_node.select('circle').attr('r', function (d) {
                                    return opt.circle.r * (!d.exist ? 0.65 : 1);
                                });
                            }
                            s_node.select('circle')
                                .attr('stroke', function (d) {
                                    return !d.exist ? '#a1a1a1' : d.isfixed ? opt.circle.fixedColor : (d.color || (d.icon && d.icon.color));
                                })
                                .attr('stroke-width', function (d) {
                                    return !d.exist ? 3 : 5;
                                })
                                .attr('fill', function (d) {
                                    if (!d.exist || (d.exist && d.image)) {
                                        return '#ffffff';
                                    }
                                    return d.isfixed ? opt.circle.fillColor : d.color ? '#fff' : d.icon.fill;
                                })
                                .filter(function (ele) {
                                    return ele.useKeyNode;
                                });
                            s_node.select('g.lock').selectAll('circle')
                                .attr('fill', opt.circle.fixedColor);
                            s_node.select('path').attr('fill', function (d) {
                                if (!d.exist) {
                                    return '#a1a1a1';
                                }
                                return d.isfixed ? opt.circle.fixedColor : (d.color || (d.icon && d.icon.color));
                            });
                            s_node.select('rect.noderect').attr('stroke', function (d) {
                                return d.isfixed ? opt.circle.fixedColor : (d.color || (d.icon && d.icon.color));
                            });
                            selectedNodesArr = [];
                        }
                    }
                    function clearForceCircleNodeSelection() {
                        console.log("sss",selectedNodesArr)
                        if (selectedNodesArr.length > 0) { 
                            if(opt.allowMulituple) {
                                if(eventType == "clear") {
                                    clearCircleNodeDom();
                                    selectedNodesArr = [];
                                    eventType = ""
                                }
                            }   else {
                                clearCircleNodeDom();
                                selectedNodesArr = [];
                            }                          
                        }
                        function clearCircleNodeDom() {
                            var group = nodeGroup.selectAll(selectedNodesArr.toString());
                            group.classed('selected', false);
                            group
                                .select('circle.node-circle')
                                .attr('fill', function (d) {
                                    var data = d
                                    return (data.properties.mapTypeName ? colorRgba(opt.topTagColors[data.properties.mapTypeName], 0.4) : data.properties.circleFill)
                                });
                            group.select('text.node-text')
                                .attr('fill', function (d) {
                                    var data = d
                                    return (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : data.properties.circleTextFill)
                                });
                            group.select('path.node-path')
                                .attr('fill', function (d) {
                                    var data = d
                                    return (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : '#a1a1a1')
                                });
                        }
                    }
                    function clearNodeSelection() {
                        if (opt.type == 'tree') {
                            clearTreeNodeSelection();
                        } else if (opt.type == 'forceCircle') {
                            clearForceCircleNodeSelection();
                        } else {
                            clearForceNodeSelection();
                        }
                    }
                    //清除选中的元素
                    function clearAllSelection() {
                        closeModalPanel();                        
                        clearNodeSelection();
                        clearLinkSelection();
                        // console.log('clearAllSelection')
                        Thumbnail(false);
                    }
                    function addElement() {
                        graph.clearDOM();
                        redrawContent();
                        draw();
                        // viewData();
                        // console.log('addElement')
                        Thumbnail();
                    }
                    function parseTreeNode(obj) {
                        if (obj.children && obj.children.length) {
                            for (var i = 0; i < obj.children.length; i++) {
                                obj.children[i] = parseTreeNode(obj.children[i])
                            }
                        }
                        obj.typeName = obj.type;
                        return new Node(obj);
                    }
                    /**
                     * 转换数据为Node对象
                     * @param {*} obj
                     */
                    function parseSocialLink(root, depth) {
                        if (root.children) {
                            root.children.forEach(item => {
                                if (item.depth == depth) {
                                    delete item.children;
                                } else {
                                    parseSocialLink(item, depth)
                                }
                            })
                        }
                        return root;
                    }
                    function parseSocialTreeData(data) {
                        // 过滤出树节点的数据
                        let depth = 3;
                        var dataNodes = parseTreeNode(data)
                        var root = d3.hierarchy(dataNodes)
                        var rootData = parseSocialLink(root, depth);
                        tree(rootData);
                        nodeObjs = rootData.descendants();
                        linkObjs = rootData.links();
                        nodeObjs.forEach(x => {
                            if (x.parent == null || (x.parent && (x.parent.data.id == 'root' || x.parent.data.nodeType == "QB_ZP_TP"))) {
                                x.data.dtype = 'root'
                            }
                        })
                        nodeObjs.forEach((c) => {
                            if (c.depth == depth) {
                                c.children = c.data.children.map(x => {
                                    x.typeName = c.parent.data.type
                                    return {
                                        data: new Node(x),
                                        depth: c.depth + 1,
                                        height: 1,
                                        parent: c
                                    }
                                });
                                c.children.map((j, i) => {
                                    var x = 0,
                                        y = 0;
                                    y = parseInt(i / 2) * (opt.nodeEleSize.height + 35) + opt.circle.r * 2;
                                    if (j.parent && j.parent.children.length < 2) {
                                        x = (i % 2) * (opt.nodeEleSize.width + 20)
                                    } else {
                                        x = (i % 2) * (opt.nodeEleSize.width + 20) - (opt.nodeEleSize.width + 20) / 2
                                    }
                                    j.y = y + (j.parent ? j.parent.y : j.y);
                                    j.x = x + (j.parent ? j.parent.x : j.x);
                                })
                            }
                        })
                        nodeObjs.forEach(d => {
                            d.selected = false;
                            d.previouslySelected = false;
                        })
                    }
                    function parseLevelData(data) {
                        data.forEach((item, i) => {
                            var nodes = item.data.nodes
                            var x = 0,
                                y = 0;
                            let childs = (nodes.length > 0) ? nodes : []
                            if (i >= 1) {
                                childs = data[i - 1].data.nodes
                                let childLength = 0;
                                let row = 1;
                                if (data[i - 1].data.typeName == opt.workObjectTitle) {
                                    childLength = childs.length;
                                } else {
                                    childLength = childs.length + (opt.node.isEdit ? 1 : 0);
                                }
                                if (childs.length > 0) {
                                    row = childLength % 4 != 0 ? parseInt(childLength / 4) + 1 : parseInt(childLength / 4);
                                }
                                y = data[i - 1].y + (row - 1) * (opt.nodeEleSize.height + 35) + 200 + 52;
                                data[i].y = y;
                                data[i].x = x;
                            } else {
                                data[0].y = 52
                                data[0].x = x
                                y = 52;
                            }
                            let arr = nodes.map(c => {
                                c.typeName = item.data.typeName
                                return {
                                    data: new Node(c),
                                    x: x + (opt.nodeEleSize.width / 2 + 25),
                                    y: y + (opt.nodeEleSize.height + 5)
                                }
                            })
                            item.data.nodes = arr
                        })
                        nodeObjs = data;
                    }
                    function translateDataToTree(data) {
                        //没有父节点的数据
                        let parents = data.filter(value => value.pid == 'undefined' || value.pid == null)

                        //有父节点的数据
                        let childrens = data.filter(value => value.pid !== 'undefined' && value.pid != null)

                        //定义转换方法的具体实现
                        let translator = (parents, childrens) => {
                            //遍历父节点数据
                            parents.forEach((parent) => {
                                //遍历子节点数据
                                childrens.forEach((current, index) => {
                                    //此时找到父节点对应的一个子节点
                                    if (current.pid === parent.data.type) {
                                        //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
                                        let temp = JSON.parse(JSON.stringify(childrens))
                                        temp.forEach(item => {
                                            item.data.nodes = item.data.nodes.map(x => {
                                                return new Node(x)
                                            })
                                        })
                                        //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
                                        temp.splice(index, 1)
                                        //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
                                        translator([current], temp)
                                        //把找到子节点放入父节点的childrens属性中
                                        typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
                                    }
                                })
                            })
                        }

                        //调用转换方法
                        translator(parents, childrens)

                        //返回最终的结果
                        return parents
                    }
                    function contactLevelTreeData(data) {
                        var tmpData = data.filter(x => {
                            return x.data.nodes.length > 0
                        })
                        for (var i = 0; i < tmpData.length; i++) {
                            var item = tmpData[i]
                            item.data.nodes = item.data.nodes.map(x => {
                                return new Node(x)
                            })
                            if (i == 0) {
                                item.pid = null
                            } else {
                                item.pid = tmpData[i - 1].data.type
                            }
                        }
                        var datas = translateDataToTree(tmpData)
                        var obj = parseTreeNode(datas[0])
                        return obj;
                    }
                    // 组合层次树形图的数据
                    function parseLevelTreeData(data) {
                        var obj = {}
                        obj = contactLevelTreeData(data)
                        var root = d3.hierarchy(obj)
                        tree(root);
                        // 生成节点数据
                        var treeNodeObjs = root.descendants();
                        treeNodeObjs.forEach(con => {
                            let initX = (con.data.data.nodes.length - 1) * (-opt.tree.treeW / 2)
                            let nodes = con.data.data.nodes.map((x, i) => {
                                let node = {
                                    children: con.children || [],
                                    data: x,
                                    depth: con.depth,
                                    height: con.height,
                                    parent: con.parent || null,
                                    x: initX + i * opt.tree.treeW,
                                    y: con.y
                                }
                                return node
                            })
                            nodeObjs.push.apply(nodeObjs, nodes)
                        })
                        nodeObjs.forEach(d => {
                            d.selected = false;
                            d.previouslySelected = false;
                        })
                        // 生成连线数据
                        for (var i = 1; i < treeNodeObjs.length; i++) {
                            let targets = nodeObjs.filter(x => x.depth == i)
                            targets.forEach((target, index) => {
                                if (i == 1) {
                                    linkObjs.push({
                                        source: nodeObjs.find(x => x.depth == (i - 1)),
                                        target: target
                                    })
                                } else {
                                    let parentNodes = target.parent.data.data.nodes.length
                                    if (parentNodes % 2 != 0) {
                                        let source = nodeObjs.filter(x => x.depth == (i - 1))
                                        let index = parseInt(parentNodes / 2)
                                        linkObjs.push({
                                            source: source[index],
                                            target: target
                                        })
                                    } else {
                                        let source = nodeObjs.filter(x => x.depth == (i - 1))
                                        let index = parseInt(parentNodes / 2) - 1
                                        linkObjs.push({
                                            source: source[index],
                                            target: target,
                                            type: 'top'
                                        })
                                    }
                                }
                                // 给卡片的下面添加相邻两个卡片的连线
                                if (index > 0 && i < treeNodeObjs.length - 1 && treeNodeObjs[i].children[0].data.data.nodes.length > 0) {
                                    linkObjs.push({
                                        source: targets[index - 1],
                                        target: target,
                                        type: 'bottom'
                                    })
                                }
                            })
                        }
                    }
                    function parseTreeData(msg) {
                        msg = parseTreeNode(msg)
                        var root = d3.hierarchy(msg)

                        tree(root);
                        nodeObjs = root.descendants();
                        nodeObjs.forEach(d => {
                            d.selected = false;
                            d.previouslySelected = false;
                        })
                        var ids = [];
                        var arr = nodeObjs.filter(function (ele) {
                            if (ele.data.pid) {
                                ids.push(ele.data.id);
                                return true;
                            }
                        }).map(function (ele) {
                            return {
                                source: nodeObjs.filter(function (el) {
                                    if (ele.data.pid == el.data.id) {
                                        return true;
                                    }
                                })[0],
                                target: ele
                            }
                        });
                        linkObjs = root.links();
                        linkObjs = linkObjs.filter(function (ele) {
                            if (ids.indexOf(ele.target.data.id) == -1) {
                                return true;
                            }
                        }).concat(arr).map(function (ele) {
                            return new Link(ele);
                        });
                    }
                    function parseForceData(msg) {
                        var nodes = msg.nodes;
                        var links = msg.links;
                        for (var i = 0; i < nodes.length; i++) {
                            var d = nodes[i];
                            if (repeatViewId[d.vid] == undefined) { //vid不存在
                                repeatViewId[d.vid] = d.id;
                            } else { //vid已存在
                                repeatNodes[d.id] = repeatViewId[d.vid];
                                nodes.splice(i, 1);
                            }
                        }
                        for (var j = 0; j < links.length; j++) {
                            repeatNodes[links[j].source] && (links[j].source = repeatNodes[links[j].source]);
                            repeatNodes[links[j].target] && (links[j].target = repeatNodes[links[j].target]);
                        }
                        for (var i = 0; i < nodes.length; i++) {
                            if (opt.isGroup) {
                                var item = nodes[i]
                                var filters = links.filter(x => {
                                    return x.target == item.id
                                })
                                var relationsNodes = [];
                                filters.forEach(x => {
                                    if (relationsNodes.indexOf(x.target) == -1) {
                                        relationsNodes.push(x.target)
                                    }
                                })
                                item['group'] = relationsNodes.length
                            }
                            nodeObjs.push(new Node(nodes[i]));
                        }
                        nodeObjs.forEach(d => {
                            d.selected = false;
                            d.previouslySelected = false;
                        })
                        // 验证是否存在两个节点之间存在多条连线
                        var linkKeys = links.map(x => {
                            return {
                                key: x.source + '-' + x.target,
                                count: 0
                            }
                        })
                        links.forEach(item => {
                            var existKeys = linkKeys.find(x => {
                                return x.key == (item.source + '-' + item.target)
                            })
                            if (existKeys) {
                                existKeys.count = existKeys.count + 1
                                item.lineNum = existKeys.count
                                item.lineNumTotal = linkKeys.filter(x => {
                                    return x.key == (item.source + '-' + item.target)
                                }).length
                            } else {
                                item.lineNum = 1
                                item.lineNumTotal = 1
                            }
                            item.properties = {
                                name: item.linkName
                            }
                            item.source = nodeObjs.find(x => {
                                return x.id == item.source
                            })
                            item.target = nodeObjs.find(x => {
                                return x.id == item.target
                            })
                            if (item.source && item.target) {
                                linkObjs.push(new Link(item));
                            } else {
                            }

                        })
                        // console.log('ddd',nodeObjs,linkObjs)
                    }
                    function parseData(msg) {
                        switch (opt.type) {
                            case 'tree':
                                parseTreeData(msg);
                                break;
                            case 'level':
                                parseLevelData(msg);
                                break;
                            case 'levelTree':
                                parseLevelTreeData(msg);
                                break;
                            case 'social':
                                parseSocialTreeData(msg);
                                break;
                            case 'force':
                                parseForceData(msg);
                                break;
                            case 'forceCard':
                                parseForceData(msg);
                                break;
                            case 'forceCircle':
                                parseForceData(msg);
                                break;
                        }
                    }
                    //a1是目标区域, a2是需要缩放的区域, sc是默认缩放比
                    function AreaSelfAdaption(a1, a2, sc) {
                        var rx, ry, rc = sc;
                        rc = (a2.width / a1.width) > rc ? rc : (a2.width / a1.width);
                        rc = (a2.height / a1.height) > rc ? rc : (a2.height / a1.height);
                        rc = rc * 0.9;
                        if (opt.type.indexOf('force') != -1) {
                            rx = a2.width / 2 - (a1.width / 2 + a1.x) * rc
                            if (a1.lxc != null && a1.lxc != undefined) {
                                rx = a2.width / 2 - a1.lxc * rc
                            }
                            ry = a2.height / 2 - (a1.height / 2 + a1.y) * rc
                            if (a1.lyc != null && a1.lyc != undefined) {
                                ry = a2.height / 2 - a1.lyc * rc + opt.circle.r / 2
                            }
                        } else {
                            if (a1.width < a2.width) {
                                rx = a2.width / 2 - (a1.width / 2 + a1.x) * rc
                                if (a1.lxc != null && a1.lxc != undefined) {
                                    rx = a2.width / 2 - a1.lxc * rc
                                }
                            } else {
                                rx = a2.width / 2 - (a1.width / 2 + a1.x) * rc
                                if (a1.lxc != null && a1.lxc != undefined) {
                                    rx = a2.width / 2 - a1.lxc * rc
                                }
                            }
                            if (a1.height < a2.height) {
                                ry = a2.height / 2 - (a1.height / 2 + a1.y) * rc
                                if (a1.lyc != null && a1.lyc != undefined) {
                                    ry = a2.height / 2 - a1.lyc * rc + opt.circle.r / 2
                                }
                            } else {
                                ry = a2.height / 2 - (a1.height / 2 + a1.y) * rc
                                if (a1.lyc != null && a1.lyc != undefined) {
                                    ry = a2.height / 2 - a1.lyc * rc + opt.circle.r / 2
                                }
                            }
                        }
                        return {
                            x: rx,
                            y: ry,
                            k: rc
                        };
                    }
                    // 初始化缩略图的元素
                    function initThumbnail() {
                        if (!opt.allowThumbnail) return false;
                        // 缩略图容器
                        NT = d3.select(opt.selector)
                            .append("svg").classed("svgNT", true)
                            .attr("width", opt.width * opt.NTConfig.ThumbnailSize)
                            .attr("height", opt.height * opt.NTConfig.ThumbnailSize);
                        NTRect = NT.append('rect')
                            .attr('class', 'nt-rect')
                            .attr("width", "100%")
                            .attr("height", "100%")
                            .style('fill', opt.NTConfig.NTRect_Fill);
                        // ntsrect = NT.append('rect').style('fill', '#efefef');
                        NTPath = NT.append('path')
                            .attr('fill', 'none')
                            .attr('stroke', opt.NTConfig.NTViewArea_Stroke)
                            .attr('stroke-width', opt.NTConfig.NTViewArea_StrokeWidth)
                            // .attr("d",`M10,10h205v92h-205z`)
                            .attr("d", `M10,10h${opt.width * opt.NTConfig.ThumbnailSize - 20}v${opt.height * opt.NTConfig.ThumbnailSize - 20}h-${opt.width * opt.NTConfig.ThumbnailSize - 20}z`)
                            .attr("fill-opacity", 0);

                        NT = NT.append("g")
                            .attr("transform", "scale(" + opt.NTConfig.ThumbnailSize + ")")
                            .attr('id', 'NT');
                        NTLink = NT.append("g")
                            .classed("NTLink", true)
                            .append("path")
                            .attr("stroke-width", opt.NTConfig.NTLink_StrokeWidth)
                            .attr("stroke", opt.NTConfig.NTLink_Stroke)
                            .attr("fill", opt.NTConfig.NTLink_Fill);
                        NTNode = NT.append("g")
                            .classed("NTNode", true)
                            .append("path")
                            .attr("stroke-width", opt.NTConfig.NTNode_StrokeWidth)
                            .attr("stroke", opt.NTConfig.NTNode_Stroke)
                            .attr("fill", opt.NTConfig.NTNode_Fill);

                        NTSelected = NT.append("g")
                            .classed("NTSelected", true)
                            .append("path")
                            .attr("stroke-width", opt.NTConfig.NTSelected_StrokeWidth)
                            .attr("stroke", opt.NTConfig.NTSelected_Stroke)
                            .attr("fill", opt.NTConfig.NTSelected_Fill);

                        // 注册拖拽事件
                        // d3.select('.nt-rect')
                        //     .on('click', evtClickNT);
                        //     .on('mousedown', evtNTMousedown)
                        // // 改变d3注册为body注册, 这样保证移出屏幕仍然可以拖拽
                        // document.body.addEventListener('mousemove', evt => evtMousemove(evt))
                        // document.body.addEventListener('mouseup', evt => evtMouseup(evt))
                    }
                    // 绘制缩略图的节点和连线
                    function drawThumbnail() {
                        // 先清空
                        NT.selectAll('[id*=NTColor-]').remove();
                        var NPath = "",
                            LPath = "",
                            SPath = "",
                            ColorPath = {};
                        var r = opt.NTConfig.NT_R,
                            hideId = null;
                        node.filter(function (item, i) {
                            if ((opt.type == 'tree' || opt.type == 'social') && !item.data.exist) {
                                hideId = item.data.id;
                                return false;
                            }
                            var x = item.x,
                                y = item.y;
                            var p = "M " + x + ", " + y + " m -" + r + ", 0 a " + r + "," + r + " 0 1,0 " + (r * 2) + ",0 a " + r + "," + r + " 0 1,0 -" + (r * 2) + ",0 ";
                            var color = item.color || item.data.color
                            if (color) {
                                ColorPath[color] || (ColorPath[color] = "");
                                ColorPath[color] += p;
                            } else if (selectedNodesArr.indexOf('#node-' + item.id) >= 0) {
                                SPath += p;
                            } else {
                                NPath += p;
                            }
                        });
                        link.filter(function (item, i) {
                            if ((opt.type == 'tree' || opt.type == 'social') && (item.source && (hideId == item.source.data.id))) {
                                return false;
                            }
                            item = (opt.type == 'tree' || opt.type == 'social') ? item.target.data : item;
                            LPath += d3.select('#link-' + item.id).attr("d") + " ";
                        });
                        NTNode.attr("d", NPath);
                        NTLink.attr("d", LPath);
                        NTSelected.attr("d", SPath);
                        for (var c in ColorPath) {
                            var ntc = NT.select('#NTColor-' + c.replace('#', '-'));
                            if (ntc.size() > 0) {
                                ntc.select("path").attr("d", ColorPath[c]);
                            } else {
                                NT.append("g").attr("id", "NTColor-" + c.replace('#', '-'), true).append("path")
                                    .attr("stroke-width", 1).attr("stroke", c).attr("fill", c).attr("d", ColorPath[c]);
                            }
                        }
                    }
                    // 绘制缩略图的框选的边框,蓝色框 (获取数据 / 绘制)
                    function drawThumbnailViewRect(screenRange, ntScale) {
                        // 获取矩形位置
                        const x = screenRange.minX
                        const y = screenRange.minY
                        const w = screenRange.maxX - screenRange.minX
                        const h = screenRange.maxY - screenRange.minY
                        // 绘制
                        NTPath
                            .attr('stroke-width', 1 / ntScale.k)
                            .attr("d", "M" + x + "," + y + "h" + w + "v" + h + "h-" + w + "z")
                            .attr('transform', 'translate(' + ntScale.x + ',' + ntScale.y + ')scale(' + ntScale.k + ')');
                    }
                    // 指定节点的id集返回对应的边界
                    function getNodeRange(nodeIds = []) {
                        let [minY, maxY, minX, maxX] = [1e9, -1e9, 1e9, -1e9]
                        let nodeSize = { width: opt.nodeEleSize.width, height: opt.nodeEleSize.height }
                        let node
                        const nodeMaps = nodeObjs
                        if (nodeIds.length > 0) {
                            for (var i = 0; i < nodeIds.length; i++) {
                                node = nodeMaps[nodeIds[i]]
                                if (node.data.nodeType == 'QB_ZP_TP') {
                                    let nodeBBox = document.querySelector('#node-' + node.data.id).getBoundingClientRect();
                                    let tpNodeCircleSize = { r: 40 }
                                    node.top = nodeY - tpNodeCircleSize.r
                                    node.right = nodeX + nodeBBox.width / 2
                                    node.bottom = nodeY + tpNodeCircleSize.r
                                    node.left = nodeX - nodeBBox.width / 2
                                } else {
                                    node.top = nodeY - nodeSize.height / 2
                                    node.right = nodeX + nodeSize.width / 2
                                    node.bottom = nodeY + nodeSize.height / 2
                                    node.left = nodeX - nodeSize.width / 2
                                }
                                if (minX > node.left) {
                                    minX = node.left
                                }
                                if (maxX < node.right) {
                                    maxX = node.right
                                }
                                if (minY > node.top) {
                                    minY = node.top
                                }
                                if (maxY < node.bottom) {
                                    maxY = node.bottom
                                }
                            }
                        } else { // 如果没有传递nodeIds, 则默认是所有节点
                            let nodeId
                            for (nodeId in nodeMaps) {
                                if (nodeMaps.hasOwnProperty(nodeId)) {
                                    node = nodeMaps[nodeId]
                                    let nodeX = node.x
                                    let nodeY = node.y
                                    if (node.data.nodeType == 'QB_ZP_TP') {
                                        let nodeBBox = document.querySelector('#node-' + node.data.id).getBoundingClientRect();
                                        let tpNodeCircleSize = { r: 40 }
                                        node.top = nodeY - tpNodeCircleSize.r
                                        node.right = nodeX + nodeBBox.width / 2
                                        node.bottom = nodeY + tpNodeCircleSize.r
                                        node.left = nodeX - nodeBBox.width / 2
                                    } else {
                                        node.top = nodeY - nodeSize.height / 2
                                        node.right = nodeX + nodeSize.width / 2
                                        node.bottom = nodeY + nodeSize.height / 2
                                        node.left = nodeX - nodeSize.width / 2
                                    }
                                    if (minX > node.left) {
                                        minX = node.left
                                    }
                                    if (maxX < node.right) {
                                        maxX = node.right
                                    }
                                    if (minY > node.top) {
                                        minY = node.top
                                    }
                                    if (maxY < node.bottom) {
                                        maxY = node.bottom
                                    }
                                }
                            }
                        }

                        if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
                            minY = 0
                            maxY = 0
                            minX = 0
                            maxX = 0
                        }
                        return { minX, maxX, minY, maxY }
                    }
                    // 判断节点是否再画布的可视范围内
                    function isInViewport(container, node) {
                        const rect = [0, 0, container.width, container.height]
                        return nodeIsInRect(node, rect)
                    }
                    // 判断节点是否在node范围内
                    function nodeIsInRect(node, rect) {
                        let isIn = true
                        const [x0, y0, x1, y1] = rect
                        var bodyScale = void 0;
                        var boundX0 = 0, boundY0 = 0, boundX1 = 0, boundY1 = 0;
                        if (d3.event && d3.event.transform) {
                            bodyScale = d3.event.transform;
                            boundX0 = bodyScale.invertX(x0)
                            boundY0 = bodyScale.invertY(y0)
                            boundX1 = bodyScale.invertX(x1)
                            boundY1 = bodyScale.invertY(y1)
                        } else {
                            var bodyScale = d3.zoomIdentity
                            boundX0 = bodyScale.invertX(x0)
                            boundY0 = bodyScale.invertY(y0)
                            boundX1 = bodyScale.invertX(x1)
                            boundY1 = bodyScale.invertY(y1)
                        }

                        isIn = node.x > boundX0 && node.x < boundX1 && node.y > boundY0 && node.y < boundY1
                        return isIn
                    }
                    /**
                     * 缩略图的数据和计算
                     * @param {是否重新计算位置} isCalc 
                     * @param {是否重绘缩略图} isReDrawNt 
                     */
                    function Thumbnail(isCalc = true, isReDrawNt = true) {
                        if (!opt.allowThumbnail) return false;
                        if (!isReDrawNt) return false
                        drawThumbnail();
                        if (!isCalc) return false;
                        // console.log('Thumbnail')
                        var s = 100;
                        // 父级容器的大小
                        var va = document.querySelector('.svgGraph').getBBox();
                        // // 容器的大小
                        var ntSvg = document.querySelector('.svgNT').getBoundingClientRect();
                        // 获取节点边界
                        var nodeRange = getNodeRange();
                        // 获取屏幕边界
                        var cBBox = document.querySelector('.svgGraph').getBoundingClientRect();
                        var screenRange = {}
                        if (d3.event && d3.event.transform) {
                            var bodyScale = d3.event.transform
                            screenRange = {
                                minX: bodyScale.invertX(0),
                                minY: bodyScale.invertY(0),
                                maxX: bodyScale.invertX(cBBox.width),
                                maxY: bodyScale.invertY(cBBox.height)
                            }
                        } else {
                            var bodyScale = d3.zoomIdentity
                            screenRange = {
                                minX: bodyScale.invertX(0),
                                minY: bodyScale.invertY(0),
                                maxX: bodyScale.invertX(cBBox.width),
                                maxY: bodyScale.invertY(cBBox.height)
                            }
                        }
                        // 获取可视范围内的节点
                        viewNodeObjs = [];// 可是范围内的节点的数据量
                        for (const node of nodeObjs) {
                            if (!isInViewport(cBBox, node)) continue
                            viewNodeObjs.push(node)
                        }
                        let ax, ay, ix, iy
                        // 如果节点全部显示在屏幕内
                        if (nodeObjs.length === viewNodeObjs.length) {
                            // 判断是否存在隐藏的节点
                            let existHideNode = viewNodeObjs.filter(x => x.data && !x.data.exist)
                            let isJoinMap = viewNodeObjs.filter(x => x.data && x.data.nodeType == 'QB_ZP_TP')
                            if (existHideNode.length > 0) {
                                ax = Math.max(nodeRange.maxX, screenRange.maxX)
                                ay = Math.max(nodeRange.maxY, screenRange.maxY)
                                ix = Math.min(nodeRange.minX, screenRange.minX)
                                // iy = Math.min(nodeRange.minY + (isJoinMap.length > 1 ? 80 : opt.tree.treeH), screenRange.minY)  
                                iy = Math.min(nodeRange.minY, screenRange.minY)
                            } else {
                                ax = nodeRange.maxX
                                ay = nodeRange.maxY
                                ix = nodeRange.minX
                                iy = nodeRange.minY
                            }
                        } else { // 存在节点不在屏幕内
                            ax = Math.max(nodeRange.maxX, screenRange.maxX)
                            ay = Math.max(nodeRange.maxY, screenRange.maxY)
                            ix = Math.min(nodeRange.minX, screenRange.minX)
                            iy = Math.min(nodeRange.minY, screenRange.minY)
                        }
                        // 记录整个范围的边界(节点和屏幕边界并集)
                        nodeAndBoxrange = {
                            minX: ix, maxX: ax, minY: iy, maxY: ay
                        }
                        const width = ax - ix + s
                        const height = ay - iy + s
                        var nodeBox = {
                            height: height,
                            width: width,
                            x: ix,
                            y: iy,
                            lx: ix, //计算x轴最左边的位置
                            ly: iy, //计算y轴最左边的位置
                            // lxc: centerX, //计算x轴中心点
                            // lyc: centerY, //计算y轴中心点
                        };
                        // console.log('nodeBox - ntSvg',nodeBox,ntSvg)
                        let ntScale = thumbScale = AreaSelfAdaption(nodeBox, ntSvg);
                        // console.log('screenRange', cBBox, screenRange, { ix, iy, ax, ay }, nodeAndBoxrange, ntScale, svgScale, viewNodeObjs)
                        NT.attr("transform", 'translate(' + ntScale.x + ',' + ntScale.y + ')scale(' + ntScale.k + ')');
                        NTLink.attr("stroke-width", opt.NTConfig.NTLink_StrokeWidth * 0.8 / ntScale.k)
                        // 绘制对应的矩形边框
                        if (nodeObjs.length !== viewNodeObjs.length) {
                            drawThumbnailViewRect(screenRange, ntScale)
                        }

                        // 记录屏幕中心点[缩略图]
                        viewCenter = {
                            x: (screenRange.maxX + screenRange.minX) / 2, y: (screenRange.maxY + screenRange.minY) / 2
                        }
                        // -------------老的计算逻辑----------------
                        // 父级容器的大小
                        // var va = document.querySelector('.svgGraph').getBBox();
                        // // 容器的大小
                        // var ntSvg = document.querySelector('.svgNT').getBBox();
                        // va.height += s;
                        // va.width += s;
                        // ThumbnailTR = AreaSelfAdaption(
                        //     va, ntSvg, opt.NTConfig.ThumbnailSize, true
                        // );
                        // ThumbnailTR.x = (ThumbnailTR.x + s / 2) * ThumbnailTR.k;
                        // ThumbnailTR.y = (ThumbnailTR.y + s / 2) * ThumbnailTR.k;

                        // var vas = document.getElementById('NT').getBBox();
                        // var vaSvgNt = d3.select('.svgNT')
                        // mleft = (vaSvgNt.attr('width') - (vas.width * ThumbnailTR.k + 10)) / 2;
                        // if (opt.type == 'tree') {
                        //     mleft = (Math.abs(vas.x * ThumbnailTR.k) + mleft);
                        //     mtop = (vaSvgNt.attr('height') - (vas.height * ThumbnailTR.k + 10)) / 2 + ThumbnailTR.y;
                        //     // mleft = vaSvgNt.attr('width') / 2 - (vas.width / 2 + vas.x) * ThumbnailTR.k
                        //     // mtop = vaSvgNt.attr('height') / 2 - (vas.height / 2 + vas.y) * ThumbnailTR.k
                        // } else {
                        //     mleft = ThumbnailTR.x;
                        //     mtop = ThumbnailTR.y;
                        // }
                        // NT.attr("transform", 'translate(' + mleft + ',' + mtop + ')scale(' + ThumbnailTR.k + ')');
                    }
                    /**
                     * 缩略图中 蓝色框 (获取数据 / 绘制)
                     * @function TNViewArea
                     * @param {boolean} obj - 点击缩略图的坐标 {x:'',y:''}
                     */
                    function TNViewArea(obj) {
                        var va = getViewArea();
                        va[0][0] = va[0][0] * ThumbnailTR.k + ThumbnailTR.x;
                        va[0][1] = va[0][1] * ThumbnailTR.k + ThumbnailTR.y;
                        va[1][0] = va[1][0] * ThumbnailTR.k;
                        va[1][1] = va[1][1] * ThumbnailTR.k;
                        var w = opt.width * ThumbnailTR.k / svgScale.k;
                        var h = opt.height * ThumbnailTR.k / svgScale.k;
                        var svgNT = d3.select('.svgNT');
                        var svgW = Number(svgNT.attr('width')),
                            svgH = Number(svgNT.attr('height'));

                        var x, y;
                        if ((va[1][0] - va[0][0]) < svgW) {
                            if (va[0][0] < 0) {
                                x = 0, w = w + va[0][0];
                            } else {
                                x = va[0][0];
                            }
                        } else if (va[0][0] > 0) {
                            x = va[0][0];
                        } else {
                            x = 0;
                            w = va[1][0];
                        }

                        if ((va[1][1] - va[0][1]) < svgH) {
                            if (va[0][1] < 0) {
                                y = 0, h = h + va[0][1];
                            } else {
                                y = va[0][1];
                            }
                        } else if (va[0][1] > 0) {
                            y = va[0][1];
                        } else {
                            y = 0;
                            h = va[1][1];
                        }

                        //校验
                        x = x < 0 ? 0 : x;
                        y = y < 0 ? 0 : y;
                        y += mtop;
                        w = w + x > svgW ? svgW - x : w;
                        h = h + y > svgH ? svgH - y : h;
                        if (!isNaN(x || y || w || h)) {
                            let svgGraph = document.querySelector('.svgGraph'); // 屏幕区
                            let svgGraphW = svgGraph.getAttribute('width'); // 屏幕宽
                            let svgGraphH = svgGraph.getAttribute('height'); // 屏幕高

                            let viewArea = document.querySelector('#viewArea').getBoundingClientRect(); // 图谱
                            let viewAreaW = viewArea.width; // 图谱宽
                            let viewAreaH = viewArea.height; // 图谱高
                            let viewAreaLeft = viewArea.left - 19 + viewAreaW / 2; // 中心距屏幕 left
                            // let viewAreaRight = svgGraphW - viewAreaW - viewArea.left + 19 + viewAreaW / 2; // 中心距屏幕 right
                            let viewAreaRight = window.screen.width - viewAreaW - viewArea.left - (window.screen.width - svgGraphW - 19) + viewAreaW / 2;
                            let viewAreaTop = (viewArea.top - 130) + viewAreaH / 2; // 中心距屏幕 top
                            let viewAreaBottom = svgGraphH - viewAreaH - (viewArea.top - 130) + viewAreaH / 2; // 中心距屏幕 bottom

                            let svgNT = document.querySelector('.svgNT').getBoundingClientRect(); // 缩略图
                            let svgNTW = svgNT.width; // 缩略图宽
                            let svgNTH = svgNT.height; // 缩略图高

                            let NT = document.querySelector('#NT').getBoundingClientRect(); // 缩略红点图
                            let pathW = NT.width * (svgGraphW / viewAreaW); // 蓝色框宽
                            let pathH = NT.height * (svgGraphH / viewAreaH); // 蓝色框高
                            let pathLeft = svgNTW * (viewAreaRight / svgGraphW) - (pathW / 2); // 蓝色框中心 距缩略图left
                            let pathTop = svgNTH * (viewAreaBottom / svgGraphH) - (pathH / 2); // 蓝色框中心 距缩略图top

                            // 蓝色框 宽高位置
                            w = pathW || 0;
                            h = pathH || 0;
                            x = pathLeft || 0;
                            y = pathTop || 0;
                            // 如果点击 按点击的坐标绘制位置
                            if (obj) {
                                x = obj.x - w / 2;
                                y = obj.y - h / 2;
                            }
                            // 绘制
                            NTPath.attr("d", "M" + x + "," + y + "h" + w + "v" + h + "h-" + w + "z");
                        }
                    }
                    //tree 与 force 区分
                    function redrawForceNode(group) {
                        group.select('circle').attr('r', function (d) {
                            if (!d.exist) {
                                return opt.circle.r * 0.65;
                            }
                            return opt.circle.r
                        })
                            .attr('stroke', function (d) {
                                if (!d.exist) {
                                    return '#a1a1a1';
                                }
                                // if (d.exist && d.image) {
                                // 	return '#f62400';
                                // }
                                // return d.color || d.icon.color;
                            })
                            // .attr('stroke-width', function(d){
                            // 	return !d.exist ? 3 : 5;
                            // })
                            .attr('fill', function (d) {
                                if (!d.exist || (d.exist && d.image)) {
                                    return '#ffffff';
                                }
                                return d.isfixed ? opt.circle.fillColor : (d.color || (d.icon && d.icon.color));
                            });
                        group.select('g.lock').selectAll('circle')
                            .attr('fill', function (d) {
                                return opt.circle.fixedColor
                            });
                        group.select('path').attr('fill', function (d) {
                            if (!d.exist) {
                                return '#a1a1a1';
                            }
                            return !d.isfixed ? '#fff' : opt.circle.fixedColor;
                        });
                        group.select('rect.noderect').attr('stroke', function (d) {
                            return d.color || (d.icon && d.icon.color);
                        });
                    }
                    function redrawForceCardNode(group) {
                        group
                            .select('rect.node-box')
                            .attr('stroke', function (d) { //点击标签实体颜色高亮
                                return d.color || (d.icon && d.icon.color) || '#d7d7d7';
                            });
                    }
                    function redrawForceCircleNode(group, type) {
                        if (type == 'edit') {
                            group
                                .select('circle.node-circle')
                                .attr('stroke', function (d) {
                                    var data = d
                                    return data.color ? data.color : (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : data.properties.circleStroke)
                                });
                        } else {
                            group
                                .select('circle.node-circle')
                                .attr('fill', function (d) {
                                    var data = d
                                    return (data.properties.mapTypeName ? opt.topTagColors[data.properties.mapTypeName] : data.properties.circleFill)
                                });
                            group.select('text.node-text')
                                .attr('fill', function (d) {
                                    return '#ffffff'
                                });
                            group.select('path.node-path')
                                .attr('fill', function (d) {
                                    return '#ffffff';
                                });
                        }

                    }
                    function redrawTreeNode(group) {
                        group.select('circle')
                            // .attr('r', function (d) {
                            //     if (!d.data.exist) {
                            //         return opt.circle.r * 0.65;
                            //     }
                            //     return opt.circle.r
                            // })
                            .attr('stroke', function (d) {
                                var data = d.data;
                                if (!data.exist) {
                                    return '#a1a1a1';
                                }
                                if (data.exist && data.image) {
                                    // return '#f62400';
                                    return data.color || (data.icon && data.icon.color);
                                }
                                return data.color || (data.icon && data.icon.color);
                            })
                        // .attr('stroke-width', function (d) {
                        //     return !d.data.exist ? 3 : 5;
                        // })
                        // .attr('fill', function (d) {
                        //     d = d.data;
                        //     if (!d.exist || (d.exist && d.image)) {
                        //         return '#ffffff';
                        //     }
                        //     return d.isfixed ? opt.circle.fillColor : (d.color || (d.icon && d.icon.color));
                        // });
                        // group.select('g.lock').selectAll('circle')
                        //     .attr('fill', function (d) {
                        //         return opt.circle.fixedColor
                        //     });
                        group.select('.node-path').attr('fill', function (d) {
                            var data = d.data;
                            if (!data.exist) {
                                return '#a1a1a1';
                            }
                            if (data.exist && data.image) {
                                // return '#f62400';
                                return data.color || (data.icon && data.icon.color);
                            }
                            return data.color || (data.icon && data.icon.color);
                        });
                        group.select('rect.node-box').attr('stroke', function (d) { //点击标签实体颜色高亮
                            d = d.data;
                            if (d.exist && d.image) {
                                return d.color || (d.icon && d.icon.color);
                            } else {
                                return '#d7d7d7'
                            }
                        });
                        group.select('rect.exMenuRect').attr('stroke', function (d) { //点击标签实体颜色高亮
                            d = d.data;
                            if (d.exist && d.image) {
                                return d.color || (d.icon && d.icon.color);
                            } else {
                                return '#d7d7d7'
                            }
                        });

                    }
                    function redrawNode(group, type = 'selected') {
                        switch (opt.type) {
                            case "tree":
                            case "level":
                            case "levelTree":
                            case "social":
                                redrawTreeNode(group, type);
                                break;
                            case "force":
                                redrawForceNode(group, type);
                                break;
                            case "forceCard":
                                redrawForceCardNode(group, type);
                                break;
                            case "forceCircle":
                                redrawForceCircleNode(group, type);
                                break;
                        }
                    }
                    function setTransform(x, y, k, duration = 1000) {
                        svgScale.x = x
                        svgScale.y = y
                        svgScale.k = k
                        container
                            .transition()
                            .duration(duration)
                            .attr('transform', 'translate(' + x + ',' + y + ')scale(' + k + ')');
                    }
                    // 初始化布局方式
                    function initLayout(type) {
                        var treeW = opt.node.isEdit ? opt.tree.treeW + 80 : opt.tree.treeW;
                        var treeH = opt.node.isEdit ? opt.tree.treeH + 40 : opt.tree.treeH;
                        switch (type) {
                            case "tree":
                                tree = d3.tree()
                                    .nodeSize([treeW, treeH])
                                break;
                            case "force":
                                simulation = d3.forceSimulation()
                                    .force("link", d3.forceLink().id(function (d) {
                                        return d.id;
                                    }).distance(200))
                                    .force("charge", d3.forceManyBody().strength(-1000).distanceMax(800))
                                    .force("center", d3.forceCenter(opt.width / 2 + 100, opt.height / 2 + 100))
                                    .force('collision', d3.forceCollide(1).strength(0.5));
                                simulation.nodes(nodeObjs)
                                    .on("tick", ticked);
                                simulation
                                    .on("end", ticked_end);
                                simulation
                                    .force("link")
                                    .links(linkObjs);
                                break;
                            case "forceCard":
                                simulation = d3.forceSimulation()
                                    .force("link", d3.forceLink().id(function (d) {
                                        return d.id;
                                    }).distance(800))
                                    .force("charge", d3.forceManyBody().strength(-8000).distanceMin(800).distanceMax(8000))
                                    .force("center", d3.forceCenter(opt.width / 2 + 100, opt.height / 2 + 100))
                                    .force('collision', d3.forceCollide(280).iterations(2).strength(0.5));
                                simulation.nodes(nodeObjs)
                                    .on("tick", ticked);
                                simulation
                                    .on("end", ticked_end);
                                simulation
                                    .force("link")
                                    .links(linkObjs);
                                break;
                            case "forceCircle":
                                simulation = d3.forceSimulation()
                                    .force("link", d3.forceLink().id(function (d) {
                                        return d.id;
                                    }).distance(600))
                                    .force("charge", d3.forceManyBody().strength(-8000).distanceMin(600).distanceMax(8000))
                                    .force("center", d3.forceCenter(opt.width / 2 + 100, opt.height / 2 + 100))
                                    .force('collision', d3.forceCollide(200).iterations(2).strength(0.5));
                                simulation.nodes(nodeObjs)
                                    .on("tick", ticked);
                                simulation
                                    .on("end", ticked_end);
                                simulation
                                    .force("link")
                                    .links(linkObjs);
                                break;
                            case "level":
                                break;
                            case "levelTree":
                                tree = d3.tree()
                                    .nodeSize([treeW, treeH])
                                break;
                            case "social":
                                tree = d3.tree()
                                    .nodeSize([treeW, treeH])
                                break;
                        }
                    }
                    //初始化布局和容器
                    function initialize() {
                        // 初始化页面布局
                        graphContainer = d3.select(opt.selector)
                            .append("svg")
                            .classed("svgGraph", true)
                            .attr("width", opt.width)
                            .attr("height", opt.height)
                            .attr('style', 'display:none;')
                            .attr('text-rendering', 'geometricPrecision');

                        var bgGroup = graphContainer.append("g");
                        bg_rect = bgGroup.append('rect')
                            .attr('class', 'bg-rect')
                            .attr("width", "100%")
                            .attr("height", "100%")
                            .style('fill', 'white')
                            .style('fill-opacity', 0);

                        container = bgGroup.append("g").attr("id", "viewArea");
                        linkGroup = container.append("g").attr("class", "links");
                        //if(!opt.useOverlap){
                        relationGroup = container.append("g").attr("class", "relations");
                        relationLabelGroup = container.append("g").attr("class", "rel-labels");
                        if (opt.allowMarker) {
                            relMarkerGroup = container.append("g").attr("class", "rel-markers");
                        }
                        //}
                        linkTextGroup = container.append("g").attr("class", "link-labels");
                        // 框选容器
                        brushGroup = container.append("g").attr("class", "brush");
                        nodeGroup = container.append("g").attr("class", "nodes");
                        initThumbnail();
                    }
                    function testOpt() {
                        if (!opt.icons.length) {
                            // alert('icons不存在！')
                            // return false;
                        }
                        return true;
                    }
                    // 删除link数据,真实删除
                    function deleteLinks(ids) {
                        if (ids.length > 0) {
                            for (var i = 0; i < ids.length; i++) {
                                linkTextGroup.selectAll('#link-label-' + ids[i].toString()).remove();
                                if (opt.allowMarker) {
                                    relMarkerGroup.selectAll('#link-mark-path-' + ids[i].toString()).remove();
                                }
                                linkGroup.selectAll('#link-' + ids[i].toString()).remove();
                            }
                            linkObjs = linkObjs.filter(function (ele) {
                                return !ids.some(function (x) {
                                    return (ele.id && x == ele.id)
                                })
                            })
                        }
                    }
                    // 创建面板
                    function createlist(data, allData, evt, parentNode, other = null) {
                        // 浏览器 宽高
                        let windowW = document.body.offsetWidth;
                        let windowH = document.body.offsetHeight
                        var selector = document.querySelector(opt.selector);
                        var tlist = selector.querySelector('.tlist');
                        if (!tlist) {
                            tlist = document.createElement('div');
                            tlist.className = 'tlist';
                            selector.appendChild(tlist);
                        }
                        let x = opt.selectorScroll ? 18 : 0;
                        let scrollTop = opt.selectorScroll ? document.querySelector(opt.selectorScroll).scrollTop - 18 : 0;
                        // 展示方向问题
                        let maxHeight = 250; // 自定义弹窗最大高
                        // 盒子宽高
                        let height = data.length * 34 + 10 + 34 / 2; // 智能搜索面板多出'全部叠加'，34/2 折中一下
                        height = height > maxHeight ? maxHeight : height;
                        let width = 0;
                        let maxWidth = 520 // 自定义弹窗最大宽
                        let minWidth = 280
                        data.forEach(item => {
                            var itemWidth = item.tpms.length * 15 + 100;
                            width = itemWidth > width ? itemWidth : width;
                        })
                        width = width > maxWidth ? maxWidth : width;
                        width = width > minWidth ? width : minWidth;
                        // 控制方向 （满足条件，定位时减去自身宽高）
                        let directionX = width + evt.pageX + 20 > windowW ? width - 30 : 0;
                        let directionY = height + (evt.pageY - opt.offsetTop) + scrollTop + 144 > windowH ? height : 0;

                        tlist.innerHTML = '';
                        tlist.style.position = 'absolute';
                        tlist.style.zIndex = '1001';
                        tlist.style.maxHeight = maxHeight + 'px';
                        tlist.style.minWidth = minWidth + 'px';
                        tlist.style.left = evt.pageX + 16 - x - directionX + 'px';
                        tlist.style.top = (evt.pageY - opt.offsetTop) + scrollTop + 10 - directionY + 'px';
                        tlist.style.display = 'block';
                        tlist.setAttribute('type', allData.type)
                        tlist.setAttribute('oid', allData.oid)
                        var ul = document.createElement('ul');
                        tlist.appendChild(ul);

                        var arr = [];
                        for (var i = 0; i < data.length; i++) {
                            arr[i] = document.createElement('li');
                            if (data[i].tpid) {
                                arr[i].tpid = data[i].tpid.replace('#', 'i').replace(':', '_');
                            }

                            var tuInfo = document.createElement('label');
                            tuInfo.className = 'text'
                            tuInfo.innerHTML = `${data[i].tpms}`;
                            tuInfo.title = `${data[i].tpms}`;
                            if (arr[i].tpid == allData.parentTpid || data[i].mapId == allData.parentTpid) {
                                tuInfo.style.color = '#ccc';
                            }
                            if (!data[i].dataRight) {
                                tuInfo.style.color = '#ccc';
                            }
                            var stack = document.createElement('span');
                            var marriage = document.createElement('span');
                            var allMapDesc = document.createElement('label');
                            var allStack = document.createElement('span');
                            var filterCondition = document.createElement('span');
                            var joinM = document.createElement('icon');
                            var lockEle = document.createElement('icon');
                            allMapDesc.innerHTML = '相关图谱:'
                            allMapDesc.className = 'allMapDesc';
                            allStack.innerHTML = '全部叠加';
                            allStack.className = 'allStack';
                            filterCondition.innerHTML = '更多信息';
                            filterCondition.classList = 'filter-condition'
                            stack.innerHTML = '叠';
                            marriage.innerHTML = '姻';
                            lockEle.className = 'lock-icon iconfont icon-suoding';
                            lockEle.style.color = '#ccc';
                            // 判断当前元素是否已经选中
                            if (other && other.data) {
                                let isExist = other.data.some(x => x.tpid == data[i].tpid)
                                data[i].joinSelected = isExist;
                            } else {
                                if (data[i].joinSelected == undefined) data[i].joinSelected = false
                            }
                            joinM.className = data[i].joinSelected == false ? 'join-icon iconfont icon-jiahao1' : 'join-icon iconfont success icon-xuanze'
                            joinM.title = '串并'
                            joinM.setAttribute('data-tpid', data[i].tpid)
                            if (arr[i].tpid == allData.parentTpid || data[i].mapId == allData.parentTpid) { //要叠加的图就是当前的图谱，叠和姻都变灰，禁止点击
                                stack.style.background = '#ccc';
                                marriage.style.background = '#ccc';
                                joinM.style.background = '#ccc'
                            }
                            let redList = ['配偶', '妻子', '前配偶', '前妻', '丈夫', '前夫']
                            if (!allData.relationName || redList.indexOf(allData.relationName) == -1 || ((arr[i].tpid == allData.parentTpid || data[i].mapId == allData.parentTpid) && redList.indexOf(allData.relationName) != -1)) {
                                marriage.style.background = '#ccc';
                            }
                            if (data[i].dataRight) {
                                (function (ele) {
                                    arr[i].onclick = function (e) {
                                        e.stopPropagation();
                                        opt.topTagClickEvt({
                                            tpid: data[ele].tpid,
                                            tpms: data[ele].tpms,
                                            mapId: data[ele].mapId,
                                            collectId: data[ele].collectId,
                                            villageCode: data[ele].villageCode,
                                            typeId: data[ele].typeId,
                                            color: allData.color,
                                            name: allData.name,
                                            relationName: allData.relationName,
                                            type: allData.type,
                                            oid: allData.oid,
                                            tpids: allData.tpids,
                                            parentTpid: allData.parentTpid,
                                            sfzhm: allData.sfzhm,
                                            dataRight: data[ele].dataRight
                                        });
                                        document.querySelector('.tlist').style.display = 'none';
                                        tuInfo.onclick = null;
                                    }
                                })(i);
                                (function (ele) {
                                    stack.onclick = function (e) {
                                        e.stopPropagation();
                                        // console.log('ddddd', parentNode, allData, data, data[ele])
                                        opt.stackClickEvt({
                                            tpid: data[ele].tpid,
                                            tpms: data[ele].tpms,
                                            mapId: data[ele].mapId,
                                            color: allData.color,
                                            name: allData.name,
                                            relationName: allData.relationName,
                                            type: allData.type,
                                            oid: allData.oid,
                                            parentTpid: allData.parentTpid,
                                            dataRight: data[ele].dataRight
                                        });
                                        document.querySelector('.tlist').style.display = 'none';
                                        stack.onclick = null;
                                    }
                                })(i);
                                (function (ele) {
                                    marriage.onclick = function (e) {
                                        e.stopPropagation();
                                        opt.marriageClickEvt({
                                            tpid: data[ele].tpid,
                                            tpms: data[ele].tpms,
                                            mapId: data[ele].mapId,
                                            color: allData.color,
                                            name: allData.name,
                                            relationName: allData.relationName,
                                            type: allData.type,
                                            oid: allData.oid,
                                            parentTpid: allData.parentTpid,
                                            dataRight: data[ele].dataRight
                                        });
                                        document.querySelector('.tlist').style.display = 'none';
                                        marriage.onclick = null;
                                    }
                                })(i);
                                (function (ele) {
                                    joinM.onclick = function (e) {
                                        if (data[ele].joinSelected && e.target.className.indexOf('icon-xuanze') != -1) {
                                            e.target.className = 'join-icon iconfont icon-jiahao1'
                                        } else {
                                            e.target.className = 'join-icon iconfont success icon-xuanze'
                                        }
                                        data[ele].joinSelected = e.target.className.indexOf('icon-xuanze') != -1
                                        e.stopPropagation();
                                        opt.joinClickEvt({
                                            tpid: data[ele].tpid,
                                            tpms: data[ele].tpms,
                                            mapId: data[ele].mapId,
                                            color: allData.color,
                                            name: allData.name,
                                            relationName: allData.relationName,
                                            type: allData.type,
                                            oid: allData.oid,
                                            parentTpid: allData.parentTpid,
                                            isSelected: data[ele].joinSelected,
                                            dataRight: data[ele].dataRight
                                        });
                                        // document.querySelector('.tlist').style.display = 'none';
                                        // joinM.onclick = null;
                                    }
                                })(i);
                                (function (ele) {
                                    allStack.onclick = function (e) {
                                        e.stopPropagation();
                                        opt.allStackClickEvt({
                                            tpid: data[ele].tpid,
                                            tpms: data[ele].tpms,
                                            mapId: data[ele].mapId,
                                            color: allData.color,
                                            name: allData.name,
                                            relationName: allData.relationName,
                                            type: allData.type,
                                            oid: allData.oid,
                                            parentTpid: allData.parentTpid,
                                            tps: allData.tps,
                                            dataRight: data[ele].dataRight
                                        });
                                        document.querySelector('.tlist').style.display = 'none';
                                        allStack.onclick = null;
                                    }
                                })(i);
                            }
                            (function (ele) {
                                filterCondition.onclick = function (e) {
                                    e.stopPropagation();
                                    opt.filterConditionClickEvt({
                                        mapId: allData.parentTpid,
                                        tpid: allData.parentTpid,
                                        color: allData.color,
                                        name: allData.name,
                                        relationName: allData.relationName,
                                        type: allData.type,
                                        oid: allData.oid,
                                        parentTpid: allData.parentTpid,
                                        tps: allData.tps,
                                        sfzhm: allData.sfzhm
                                    });
                                    // document.querySelector('.tlist').style.display = 'none';
                                    // filterCondition.onclick = null;
                                }
                            })(i);
                            arr[i].appendChild(tuInfo)
                            if (!data[i].dataRight) {
                                arr[i].insertBefore(lockEle, arr[i].children[0]);
                            }
                            if (opt.showJoin) {
                                arr[i].insertBefore(joinM, arr[i].children[0]);
                                // arr[i].append(joinM);
                            }
                            // 1.是否显示菜单中'叠'姻'按钮
                            if (!opt.isHideSuperpositionBtn) {
                                // arr[i].appendChild(stack);
                                // arr[i].appendChild(marriage);
                                if (data[0].typeId != "8" && data[0].typeId != "9") {
                                    arr[i].insertBefore(marriage, arr[i].children[0]);
                                    arr[i].insertBefore(stack, arr[i].children[0]);
                                }

                            }
                            ul.appendChild(arr[i]);
                        }
                        // 2.是否显示菜单中'全部叠加'按钮
                        if (!opt.isHideSuperpositionBtn) {
                            //arr[0].appendChild(allStack);
                            //全部叠加按钮修改
                            if (data[0].typeId != "8" && data[0].typeId != "9") {
                                arr[data.length + 1] = document.createElement('li');
                                arr[data.length + 1].innerText = '';
                                if (data[0].tpid) {
                                    arr[data.length + 1].tpid = data[0].tpid.replace('#', 'i').replace(':', '_');
                                }
                                arr[data.length + 1].appendChild(allStack);
                                arr[data.length + 1].className = 'li_allStack';
                                ul.insertBefore(arr[data.length + 1], arr[0]);
                            }
                        }
                        // 创建高级按钮
                        if (opt.showFilterCondition) {
                            if (!opt.isHideSuperpositionBtn) {
                                allStack.parentNode.insertBefore(allMapDesc, allStack)
                                allStack.parentNode.insertBefore(filterCondition, allStack);
                            } else {
                                arr[data.length + 1] = document.createElement('li');
                                arr[data.length + 1].innerText = '';
                                if (data[0].tpid) {
                                    arr[data.length + 1].tpid = data[0].tpid.replace('#', 'i').replace(':', '_');
                                }
                                arr[data.length + 1].appendChild(allMapDesc)
                                arr[data.length + 1].appendChild(filterCondition);
                                arr[data.length + 1].className = 'li_allStack';
                                ul.insertBefore(arr[data.length + 1], arr[0]);
                            }
                        }
                    };
                    // 创建面板
                    function createPanel(allData, evt) {
                        let windowW = document.body.offsetWidth;
                        let windowH = document.body.offsetHeight
                        if (allData.properties.MAP_DESCRIPTION || allData.properties.PERSON_DESCRIPTION) {
                            var selector = document.querySelector(opt.selector);
                            var panel = selector.querySelector('.panel');
                            if (!panel) {
                                panel = document.createElement('div');
                                panel.className = 'panel';
                                selector.appendChild(panel);
                            }
                            // 鼠标在自身上也显示/隐藏
                            panel.onmouseover = function () {
                                panel.style.display = 'block'
                            };
                            panel.onmouseout = function () {
                                panel.style.display = 'none'
                            };
                            panel.innerHTML = '';
                            panel.style.position = 'absolute';
                            panel.style.zIndex = '1002';
                            panel.style.display = 'block';
                            if (allData.nodeType == 'QB_ZP_TP') {
                                panel.innerHTML = allData.properties.MAP_DESCRIPTION;
                            } else {
                                panel.innerHTML = allData.properties.PERSON_DESCRIPTION;
                            }
                            // 文字 计算盒子宽高
                            // 宽
                            let width = panel.innerHTML.length * 16 + 20;
                            width = width > 600 ? 600 : width;
                            // 高
                            let height = Math.ceil(panel.innerHTML.length / 35) * 24 + 20;
                            height = height > 300 ? 300 : height;

                            // 计算 菜单位置
                            let directionX = evt.pageX + width > windowW ? evt.pageX - width : evt.pageX;
                            let directionY = evt.offsetY + height + 130 > windowH ? evt.offsetY - height : evt.offsetY;
                            // 设置
                            panel.style.left = directionX + 'px';
                            panel.style.top = directionY + 'px';
                            panel.style.maxWidth = '600px';
                            panel.style.maxHeight = '300px';
                        }
                    };
                    // 创建面板
                    function createTitleBox(data, evt) {
                        var selector = document.querySelector(opt.selector);
                        var titleBox = selector.querySelector('.titleBox');
                        if (!titleBox) {
                            titleBox = document.createElement('div');
                            titleBox.className = 'titleBox';
                            selector.appendChild(titleBox);
                        }
                        titleBox.innerHTML = '';
                        titleBox.style.position = 'absolute';
                        titleBox.style.left = evt.pageX + 'px';
                        titleBox.style.top = evt.offsetY + 'px';
                        titleBox.style.display = 'block';
                        titleBox.innerHTML = data.vals;
                    };
                    // rgba颜色值的计算
                    function colorRgba(sHex, alpha) {
                        // 十六进制颜色值的正则表达式
                        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
                        /* 16进制颜色转为RGB格式 */
                        let sColor = sHex.toLowerCase()
                        if (sColor && reg.test(sColor)) {
                            if (sColor.length === 4) {
                                var sColorNew = '#'
                                for (let i = 1; i < 4; i += 1) {
                                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                                }
                                sColor = sColorNew
                            }
                            // 处理六位的颜色值
                            var sColorChange = []
                            for (let i = 1; i < 7; i += 2) {
                                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
                            }
                            // return sColorChange.join(',')
                            return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
                        }
                        else {
                            return sColor
                        }
                    }
                    // 图形居中展示计算
                    function centerSelection(nodes, links) {
                        var arr = [];
                        for (var i = 0; i < nodes.length; i++) {
                            arr[i] = nodes[i];
                        }
                        for (var i = 0; i < links.length; i++) {
                            if (arr.indexOf(links[i].source) == -1) {
                                arr.push(links[i].source);
                            }
                            if (arr.indexOf(links[i].target) == -1) {
                                arr.push(links[i].target);
                            }
                        }
                        var arrx = arr.map(function (ele) {
                            return ele.x ? ele.x : (ele.x == 0 ? 0 : false);
                        }).sort(function (a, b) {
                            return a - b;
                        });
                        var arry = arr.map(function (ele) {
                            return ele.y ? ele.y : (ele.y == 0 ? 0 : false);
                        }).sort(function (a, b) {
                            return a - b;
                        });
                        // 如果只选中一个节点则设置默认的宽度和高度
                        // var sh = arry.length > 1 ? ((arry[arry.length - 1] + 100) - (arry[0] > 0 ? 0 : arry[0])) : 115;
                        // var sw = arrx.length > 1 ? ((arrx[arrx.length - 1] + 100) - (arrx[0] > 0 ? 0 : arrx[0])) : 240;
                        var sh = arry.length > 1 ? ((arry[arry.length - 1] + 100) - arry[0]) : opt.nodeEleSize.height;
                        var sw = arrx.length > 1 ? ((arrx[arrx.length - 1] + 100) - arrx[0]) : opt.nodeEleSize.width;
                        sh = sh + opt.circle.r * 4
                        var va = {
                            height: sh,
                            width: sw,
                            x: (opt.width - (sw + 100)) / 2,
                            y: (opt.height - (sh + 100)) / 2,
                            lx: arrx[0], //计算x轴最左边的位置
                            ly: arry[0], //计算y轴最左边的位置
                            lxc: (arrx[arrx.length - 1] - arrx[0]) / 2 + arrx[0], //计算x轴中心点
                            lyc: (arry[arry.length - 1] - arry[0]) / 2 + arry[0], //计算y轴中心点
                        };
                        // va.height += 100; va.width += 100;
                        var sc = AreaSelfAdaption(
                            va, {
                            width: opt.width,
                            height: opt.height
                        }, 1
                        );
                        setTransform(sc.x, sc.y, sc.k);
                    }
                    // 图形展示（如果选中的节点的宽度、或者高度超出可视区域，则从左往右排列）
                    function fitDisplaySelection(nodes, links, startNode, fitScale = 0.7) {
                        var arr = [];
                        for (var i = 0; i < nodes.length; i++) {
                            arr[i] = nodes[i];
                        }
                        for (var i = 0; i < links.length; i++) {
                            if (arr.indexOf(links[i].source) == -1) {
                                arr.push(links[i].source);
                            }
                            if (arr.indexOf(links[i].target) == -1) {
                                arr.push(links[i].target);
                            }
                        }
                        var arrx = arr.map(function (ele) {
                            return ele.x ? ele.x : (ele.x == 0 ? 0 : false);
                        }).sort(function (a, b) {
                            return a - b;
                        });
                        var arry = arr.map(function (ele) {
                            return ele.y ? ele.y : (ele.y == 0 ? 0 : false);
                        }).sort(function (a, b) {
                            return a - b;
                        });
                        // 如果只选中一个节点则设置默认的宽度和高度
                        var sh = arry.length > 1 ? ((arry[arry.length - 1] + 100) - arry[0]) : opt.nodeEleSize.height;
                        var sw = arrx.length > 1 ? ((arrx[arrx.length - 1] + 100) - arrx[0]) : opt.nodeEleSize.width;
                        sh = sh + opt.circle.r * 4
                        var va = {
                            height: sh,
                            width: sw,
                            x: (opt.width - (sw + 100)) / 2,
                            y: (opt.height - (sh + 100)) / 2,
                            lx: arrx[0], //计算x轴最左边的位置
                            ly: arry[0], //计算y轴最左边的位置
                            lxc: (arrx[arrx.length - 1] - arrx[0]) / 2 + arrx[0], //计算x轴中心点
                            lyc: (arry[arry.length - 1] - arry[0]) / 2 + arry[0], //计算y轴中心点
                        };
                        var sc = AreaSelfAdaption(
                            va, { width: opt.width, height: opt.height }, 1,
                        );
                        nodes.sort((a, b) => {
                            return a.x - b.x
                        })
                        if (sc.k < fitScale) {
                            var startNodeX = startNode ? startNode.x : arrx[0]
                            var startNodeY = startNode ? startNode.y : arry[0]
                            let index = startNode ? nodes.findIndex(x => x == startNode) : 0
                            if (index == -1) index = 0;
                            // 根据缩略值计算x,y
                            let tx = 100 - (startNodeX - 100) * fitScale
                            if (index >= nodes.length - 1) {
                                tx = opt.width / 2 - (startNodeX - 100) * fitScale
                            }
                            let ty = 50
                            let ay = opt.height / 2
                            if (arry.length > 1) {
                                if (index >= nodes.length - 1) {
                                    ty = opt.height / 2 - startNodeY * fitScale
                                } else {
                                    // 判断第二个节点是否在屏幕范围内
                                    const rect = [0, 0, container.width, container.height]
                                    let isIn = true
                                    let nextNode = nodes[index + 1]
                                    const [x0, y0, x1, y1] = rect
                                    var boundX0 = 0, boundX1 = 0;
                                    boundX0 = (x0 - tx) / fitScale
                                    boundX1 = (x1 - tx) / fitScale
                                    isIn = nextNode.x > boundX0 && nextNode.x < boundX1
                                    if (isIn) {
                                        let y1 = ((nextNode.y - startNodeY) / 2 + startNodeY)
                                        ty = ay - y1 * fitScale
                                    } else {
                                        ty = opt.height / 2 - startNodeY * fitScale
                                    }
                                }
                            } else {
                                ty = opt.height / 2 - startNodeY * fitScale
                            }
                            setTransform(tx, ty, fitScale);
                        } else {
                            setTransform(sc.x, sc.y, sc.k);
                        }
                        if (!startNode) {
                            fitAllSelectionNodes = {
                                nodes: nodes,
                                links: links
                            }
                            fitSelectionNode = null
                        }
                    }
                    // 生成图谱列表
                    graph.createTpsList = function (data, allData, evt, parentNode, other = null) {
                        createlist(data, allData, evt, parentNode, other);
                    };
                    /**
                     * 删除link数据,真实删除
                     */
                    graph.deleteLinks = function (ids) {
                        deleteLinks(ids);
                    };
                    /**
                     * 设置配置项属性 --对内
                     * @function setOptions
                     * @param {Object} msg - 配置参数
                     */
                    graph.setOptions = function (msg) {
                        opt.type = msg.type || opt.type;
                        opt.allowNodeDbclick = msg.allowNodeDbclick != undefined ? msg.allowNodeDbclick : opt.allowNodeDbclick;
                        opt.expandlist = msg.expandlist;
                        for (var key in msg) {
                            if (['circle', 'NTConfig'].indexOf(key) == -1) {
                                opt[key] = msg[key] != undefined ? msg[key] : opt[key];
                            }
                        }
                        if (msg.circle) {
                            for (var key in msg.circle) {
                                opt.circle[key] = msg.circle[key] != undefined ? msg.circle[key] : opt.circle[key]
                            }
                        }
                        if (opt.NTConfig) {
                            for (var key in msg.NTConfig) {
                                opt.NTConfig[key] = msg.NTConfig[key] != undefined ? msg.NTConfig[key] : opt.NTConfig[key]
                            }
                        }
                    };
                    /**
                     * 获取配置项
                     * @function getOptions
                     * @returns {Object}
                     */
                    graph.getOptions = function () {
                        return opt;
                    };
                    /**
                     * 设置icons
                     * @function setIcons
                     * @param {data} msg - 配置icons
                     */
                    graph.setIcons = function (data) {
                        opt.icons = data;
                    };
                    /**
                     * 获取icons配置
                     * @function getIcons
                     * @returns {object}
                     */
                    graph.getIcons = function () {
                        return opt.icons;
                    };
                    /**
                     * 设置叠加数据
                     * @function setOverlap
                     * @param {array} data - 叠加数据
                     */
                    graph.setOverlap = function (data) {
                        opt.overlapData = data;
                    };
                    /**
                     * 获取叠加数据
                     * @function getOverlap
                     * @returns {array}
                     */
                    graph.getOverlap = function () {
                        if (opt.useOverlap && opt.overlapData.length) {
                            //处理叠加数据
                            //合并重复
                            var arr = [],
                                addStstus = false;
                            var overlapData = JSON.parse(JSON.stringify(opt.overlapData))
                            arr[0] = overlapData[0];
                            for (var i = 1; i < overlapData.length; i++) {
                                for (var j = 0; j < arr.length; j++) {
                                    if ((arr[j].source == overlapData[i].source || arr[j].source == overlapData[i].target) && (arr[j].target == overlapData[i].source || arr[j].target == overlapData[i].target)) {
                                        arr[j].text += (',' + overlapData[i].text);
                                        addStstus = true;
                                        break;
                                    }
                                }
                                if (!addStstus) {
                                    arr.push(overlapData[i]);
                                    addStstus = false;
                                }
                            }

                            let tmpOverlapData = arr.map(function (ele) {
                                ele.source = graph.getNodeByParams(ele.source, 'id');
                                ele.target = graph.getNodeByParams(ele.target, 'id');
                                ele.text = ele.text.split(',');
                                return ele;
                            });
                            return tmpOverlapData;
                        } else {
                            return [];
                        }
                    };
                    /**
                     * 启用/禁用叠加
                     * @function disabledOverlap
                     * @param {boolean} type - 类型true/false
                     */
                    graph.disabledOverlap = function (type) {
                        opt.useOverlap = !type;
                    };

                    /**
                     * 重启 - 对内
                     * @function restart
                     */
                    graph.restart = function () {
                        initIsFinish = false;
                        isDragging = false;
                        if (opt.type == 'force' || opt.type == 'forceCard' || opt.type == 'forceCircle') {
                            simulation.restart();
                            simulation.alpha(1);
                        }
                    };
                    /**
                     * 设置力节点之间的距离(最小800，最大8000，默认800)
                     */
                    graph.setForceDistance = function (distance, defaultMin = 800, defaultMax = 8000) {
                        // simulation = d3.forceSimulation()
                        if (distance > defaultMax) {
                            distance = defaultMax
                        } else if (distance < defaultMin) {
                            distance = defaultMin
                        }
                        if (simulation) {
                            simulation.stop();
                            initOnce = true;
                            stop_ticked = false
                            node.data().forEach(function (d) {
                                d.fx = null;
                                d.fy = null;
                            });
                            simulation.force('link').distance(distance);
                            simulation.force('charge').distanceMin(distance);
                            simulation.restart();
                            simulation.alpha(1);
                        }
                    }
                    /**
                     * 清除全部 - 对内
                     * @function clear
                     */
                    graph.clear = function () {
                        initOnce = true;
                        stop_ticked = false;
                        nodeObjs = [];
                        viewNodeObjs = [];
                        linkObjs = [];
                        repeatViewId = {};
                        repeatNodes = {};
                        fitAllSelectionNodes = null;
                        fitSelectionNode = null;
                        svgScale = d3.zoomIdentity;
                        svgScale.k = 1;
                        svgScale.x = 0;
                        svgScale.y = 0;
                        // simulation = null;
                        // 移除缩略图上注册的body事件
                        document.body.removeEventListener('mousemove', evt => evtMousemove)
                        document.body.removeEventListener('mouseup', evt => evtMouseup)
                        graph.clearDOM();
                        nodeGroup.selectAll("g").data([]).exit().remove();
                        linkGroup.selectAll("path").data([]).exit().remove();
                        linkTextGroup.selectAll("g").data([]).exit().remove();
                        if (opt.useOverlap) {
                            relationGroup.selectAll("path").data([]).exit().remove();
                            relationLabelGroup.selectAll("g").data([]).exit().remove();
                        }
                    };
                    /**
                     * 清除DOM - 对内
                     * @function clearDOM
                     */
                    graph.clearDOM = function () {
                        linkGroup.selectAll('*').remove();
                        nodeGroup.selectAll('*').remove();
                        linkTextGroup.selectAll('*').remove();
                        if (opt.useOverlap) {
                            relationGroup.selectAll('*').remove();
                            relationLabelGroup.selectAll('*').remove();
                        }
                    };
                    /**
                     * 初始化svg
                     * @function init
                     */
                    graph.init = function () {
                        initLayout(opt.type);
                        license.test(initialize);
                    }
                    /**
                     * 载入数据
                     * @function load
                     * @param {object} msg - 需要载入的数据
                     */
                    graph.load = function (msg) {
                        if (!testOpt()) {
                            return false;
                        }
                        if (!msg || !msg.id) {
                            console.warn('数据缺失！');
                        }
                        graph.clear();
                        parseData(msg);
                        // graph.removeElements(msg)
                        // graph.restart();
                        redrawContent();
                    };
                    /**
                     * 添加单个实体
                     * @function addNode
                     * @param {object} ele - 单个实体数据
                     */
                    graph.addNode = function (ele) {
                        nodeObjs.push(new Node(ele));
                        addElement();
                    };
                    /**
                     * 添加单个关系
                     * @function addLink
                     * @param {object} ele - 单个关系数据
                     */
                    graph.addLink = function (ele) {
                        linkObjs.push(new Link(ele));
                        addElement();
                    };
                    /**
                     * 通过id移除关系数据
                     * @function removeLinkDataById
                     * @param {string} id - 需要移除的对象的id
                     */
                    graph.removeLinkDataById = function (id) {
                        linkObjs = linkObjs.filter(function (ele) {
                            return ele.id != id;
                        });
                    };
                    /**
                     * 通过起始点获取关系对象
                     * @function getLinkBySourceAndTarget
                     * @param {string} source - 起点对象id
                     * @param {string} target - 终点对象id
                     * @returns {Array}
                     */
                    graph.getLinkBySourceAndTarget = function (source, target) {
                        return linkObjs.filter(function (ele) {
                            return (ele.source == source || ele.source == target) && (ele.target == source || ele.target == target);
                        });
                    };
                    /**
                     * 关键词查询
                     * @function search
                     * @param {string} text - 关键词
                     */
                    graph.search = function (text) {
                        if (!text) {
                            alert('请输入要查找的内容！');
                            return false;
                        }
                        var searchNodes = nodeObjs.filter(function (ele) {
                            if (!ele.exist) return false;
                            if (ele.showProperties && ele.showProperties.length) {
                                for (var i = 0; i < ele.showProperties.length; i++) {
                                    if (('' + ele.properties[ele.showProperties[i]]).indexOf(text) != -1) {
                                        return true;
                                    }
                                }
                            } else {
                                for (var key in ele.properties) {
                                    if (('' + ele.properties[key]).indexOf(text) != -1) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        });

                        var searchLinks = linkObjs.filter(function (ele) {
                            if (ele.showProperties && ele.showProperties.length) {
                                for (var i = 0; i < ele.showProperties.length; i++) {
                                    if (('' + ele.properties[ele.showProperties[i]]).indexOf(text) != -1) {
                                        return true;
                                    }
                                }
                            } else {
                                for (var key in ele.properties) {
                                    if (('' + ele.properties[key]).indexOf(text) != -1) {
                                        return true;
                                    }
                                }
                            }
                            return false;
                        });

                        if (!searchNodes.length && !searchLinks.length) {
                            return false;
                        }
                        graph.selectedElements(searchNodes.map(function (ele) {
                            return ele.id;
                        }), searchLinks.map(function (ele) {
                            return ele.id;
                        }));
                        graph.centerSelection(searchNodes, searchLinks);
                    };
                    /**
                     * 通过标签查询
                     * @function searchByTag
                     * @param {string} tag - 标签
                     */
                    graph.searchByTag = function (tag) {
                        var searchNodes = nodeObjs.filter(function (ele) {
                            for (var i = 0; i < ele.tags.length; i++) {
                                if (tag == ele.tags[i].num) {
                                    return true;
                                }
                            }
                            return false;
                        });

                        var searchLinks = linkObjs.filter(function (ele) {
                            for (var i = 0; i < ele.tags.length; i++) {
                                if (tag == ele.tags[i].num) {
                                    return true;
                                }
                            }
                            return false;
                        });
                        if (!searchNodes.length && !searchLinks.length) {
                            return false;
                        }
                        graph.selectedElements(searchNodes.map(function (ele) {
                            return ele.id;
                        }), searchLinks.map(function (ele) {
                            return ele.id;
                        }));
                        graph.centerSelection(searchNodes, searchLinks);
                    }
                    /**
                     * 居中选中
                     * @function centerSelection
                     * @param {Array} nodes - 选中的实体
                     * @param {Array} links - 选中的关系
                     */
                    graph.centerSelection = function (nodes, links) {
                        centerSelection(nodes, links);
                        // viewData();
                        // console.log('centerSelection')
                        Thumbnail();
                        addEvent();
                    };
                    graph.fitDisplaySelection = function (nodes, links, startNode, fitScale = 0.7) {
                        fitDisplaySelection(nodes, links, startNode, fitScale);
                        // viewData();
                        console.log('fitDisplaySelection')
                        Thumbnail();
                        addEvent();
                    };
                    // 获取当前图形的缩放值
                    graph.getTransform = function () {
                        return svgScale;
                    };
                    // 设置当前图形的缩放值
                    graph.setTransform = function (x, y, k, duration = 1000) {
                        setTransform(x, y, k, duration = 1000)
                    }
                    /**
                     * 移除高亮效果
                     */
                    graph.removeHightlight = function () {
                        if (node) {
                            node.classed('svg-fadeout', function (d) {
                                d.opacity = 1
                                return false
                            })
                            node.classed('svg-highlight', function (d) {
                                d.opacity = 1
                                return false
                            })
                        }
                        if (link) {
                            link.classed('svg-fadeout', function (d) {
                                d.opacity = 1
                                return false
                            })
                            link.classed('svg-highlight', function (d) {
                                d.opacity = 1
                                return false
                            })
                        }

                        if (linkText) {
                            linkText.classed('svg-fadeout', function (d) {
                                d.opacity = 1
                                return false
                            })
                            linkText.classed('svg-highlight', function (d) {
                                d.opacity = 1
                                return false
                            })
                        }
                    };
                    /**
                     * 高亮选中的节点及相关联的节点的连线和节点并且居中居中选中
                     * @function centerSelection
                     * @param {Array} nodes - 选中的实体
                     * @param {Array} links - 选中的关系
                     */
                    graph.highlightAndCenterSelection = function (nodes, links) {
                        graph.removeHightlight();
                        node.classed('selected', false);
                        node.filter(item => {
                            return nodes.indexOf(item) != -1
                        })
                            .classed('selected', true);
                        if (nodes.length > 0) {
                            centerSelection(nodes, links);
                            nodeMouseOverOut(nodes, true)
                            viewData();
                            // if (opt.allowThumbnail) TNViewArea({
                            //     x:va.x,
                            //     y:va.y
                            // });
                            addEvent();
                        }

                    };
                    /**
                     * 锁定/解锁实体
                     * @function fixedNode
                     * @param {boolean} type - 实体状态
                     */
                    graph.fixedNode = function (type) {
                        var ids = graph.getSelection().node;
                        nodeObjs.forEach(function (ele) {
                            if (type == ele.isfixed) return;
                            if (ids.indexOf(ele.id) != -1) {
                                ele.isfixed = type;
                                var obj = d3.select('#node-' + ele.id);
                                obj.select('circle')
                                    .attr('fill', function (d) {
                                        if (d.exist && d.image) {
                                            return '#fff';
                                        }
                                        return type ? opt.circle.fillColor : (d.color || (d.icon && d.icon.color));
                                    })
                                    .attr('stroke-width', function (d) {
                                        return !d.exist ? 3 : 5;
                                    })
                                    .attr('stroke', function (d) {
                                        if (d.exist && d.image) {
                                            return '#f62400';
                                        }
                                        return d.color || (d.icon && d.icon.color);
                                    });
                                obj.select('path').attr('fill', function (d) {
                                    if (!type) {
                                        d.fx = null;
                                        d.fy = null;
                                    }
                                    return type ? opt.circle.fixedColor : '#fff';
                                });
                                obj.select('rect.noderect').attr('stroke', function (d) {
                                    return d.color || (d.icon && d.icon.color);
                                });
                                if (type) {
                                    var lock = obj.append('g').attr('class', 'lock');
                                    lock.append('circle').attr('transform', 'translate(0,-' + opt.circle.r + ')');
                                    lock.append('circle').attr('transform', 'translate(' + opt.circle.r + ',0)');
                                    lock.append('circle').attr('transform', 'translate(0,' + opt.circle.r + ')');
                                    lock.append('circle').attr('transform', 'translate(-' + opt.circle.r + ',0)');
                                    lock.selectAll('circle').attr('r', 6).attr('stroke-width', 2).attr('stroke', '#fff').attr('fill', '#a1a1a1');
                                } else {
                                    obj.select('g.lock').remove();
                                }
                            }
                        });
                    };
                    /**
                     * 启用/禁用力导向
                     * @function useForce
                     * @param {boolean} type - 状态
                     */
                    graph.useForce = function (type) {
                        opt.useForce = type;
                        if (type) {
                            nodeObjs.forEach(function (ele) {
                                ele.fx = null;
                                ele.fy = null;
                            });
                            simulation.restart();
                        }
                    };

                    /**
                     * 获取选中对象 实体和线
                     * @function getSelection
                     * @returns {Object}
                     */
                    graph.getSelection = function () {
                        return {
                            node: selectedNodesArr.map(function (ele) {
                                return ele.replace(/\#node\-/, "")
                            }),
                            link: selectedLinkLabelsArr.map(function (ele) {
                                return ele.replace(/\#link\-label\-/, "")
                            })
                        };
                    };
                    /**
                     * 通过Id获取实体
                     * @function getNodeById
                     * @param {String} id - 实体Id  暂时用oid
                     * @returns {Object}
                     */
                    graph.getNodeByParams = function (id, type, parentId = null) {
                        return nodeObjs.filter(function (ele) {
                            if (parentId) {
                                return id == ele.data[type] && parentId == (ele.parent && ele.parent.data[type]);
                            } else {
                                return id == ele.data[type];
                            }
                        })[0];
                    };
                    /**
                     * 获取数据
                     * @function getData
                     * @returns {Object}
                     */
                    graph.getData = function () {
                        switch (opt.type) {
                            case 'social':
                                // .filter(x => x.data.type != "" && x.data.id != 'root')
                                let nodeArr = nodeObjs
                                let tmpNodeObjs = [];
                                nodeArr.forEach(d => {
                                    if (_socialTreeCondition(d)) {
                                        let arr = [d.data];
                                        let tmpArr = arr.map(c => {
                                            return {
                                                data: c,
                                                x: d.x,
                                                y: d.y
                                            }
                                        })
                                        tmpNodeObjs.push.apply(tmpNodeObjs, tmpArr)
                                    } else {
                                        let arr = d.children
                                        let tmpArr = arr.map(c => {
                                            return {
                                                data: c.data,
                                                x: c.x,
                                                y: c.y
                                            }
                                        })
                                        tmpNodeObjs.push.apply(tmpNodeObjs, tmpArr)
                                    }
                                })
                                return {
                                    links: linkObjs,
                                    nodes: tmpNodeObjs
                                };
                                break;
                            case 'level':
                                let nodeArrLevel = nodeObjs
                                let tmpNodeObjsLevel = [];
                                nodeArrLevel.forEach(x => {
                                    let nodes = x.data.nodes
                                    tmpNodeObjsLevel.push.apply(tmpNodeObjsLevel, nodes)
                                })
                                return {
                                    links: linkObjs,
                                    nodes: tmpNodeObjsLevel
                                };
                                break;
                            default:
                                return {
                                    links: linkObjs,
                                    nodes: nodeObjs
                                };
                                break;
                        }
                    };
                    /**
                     * 通过类型选取实体
                     * @function selectedByType
                     * @param {String} nodeType - 类型
                     */
                    graph.selectedByType = function (nodeType) {
                        graph.selectedElements(nodeObjs.filter(function (ele) {
                            return ele.nodeType == nodeType;
                        }).map(function (ele) {
                            return ele.id;
                        }), []);
                    }
                    /**
                     * 导出数据
                     * @function exportJson
                     * @returns {Object}
                     */
                    graph.exportJson = function () {
                        return {
                            links: linkObjs,
                            nodes: nodeObjs
                        };
                    };
                    /**
                     * 关键节点凸显/恢复
                     * @function showKeyNode
                     * @param {boolean} type - 节点凸显状态
                     */
                    graph.showKeyNode = function (type, id, color) {
                        var ids = nodeObjs.filter(function (ele) {
                            ele.data.useKeyNode = false;
                            if (ele.data.oid == id) {
                                ele.data.useKeyNode = true;
                                ele.data.isKeyNode = type;
                            } else {
                                ele.data.useKeyNode = false;
                            }
                            return ele.data.isKeyNode;
                        }).map(function (ele) {
                            return '#node-' + ele.data.id;
                        }).toString();
                        // viewData();
                        // console.log('showKeyNode')
                        Thumbnail();
                        nodeGroup.selectAll(ids).attr('transform', function (d) {
                            if (d.data.useKeyNode) {
                                graph.editNodeColor([d.data.id], color);
                            }
                            d.data.nodeScale = 1;
                            return 'translate(' + d.x + ',' + d.y + ')' + (type ? 'scale(' + d.data.nodeScale + ')' : '');
                        });
                    };
                    /**
                     * 加标签
                     * @function addTag
                     * @param {Number} num - 标签编号
                     * @param {String} text - 标签内容
                     */
                    graph.addTag = function (num, text) {
                        if (!selectedNodesArr.length && !selectedLinkLabelsArr.length) {
                            alert('请选中实体或关系！');
                            return false;
                        }
                        if (selectedNodesArr.length) {
                            graph.addNodeTag(num, text);
                        }
                        if (selectedLinkLabelsArr.length) {
                            graph.addLinkTag(num, text);
                        }
                    }
                    /**
                     * 添加实体标签
                     * @function addNodeTag
                     * @param {Number} num - 标签编号
                     * @param {String} text - 标签内容
                     */
                    graph.addNodeTag = function (num, text) {
                        d3.selectAll(selectedNodesArr.join(',')).each(function (ele) {
                            var tag = d3.select(this).selectAll('.tag'),
                                tagText;
                            var rh = Number(d3.select(this).select('rect.noderect').attr('height'));
                            var rw = Number(d3.select(this).select('rect.noderect').attr('width'));
                            if (!tag.size()) {
                                tag = d3.select(this)
                                    .append('g')
                                    .attr('class', 'tag')
                                    .attr('transform', 'translate(' + (-14 - rw / 2) + ',' + (opt.circle.r + rh / 2 + 6) + ')');
                                tag.append('rect').attr('class', 'tagrect');
                                tag.append('text').attr('class', 'list');
                            }

                            //添加标签
                            //处理标签数据
                            var samel = ele.tags.filter(function (el) {
                                if (el.num == num) {
                                    el.text = text;
                                }
                                return el.num == num;
                            }).length;
                            if (!samel) {
                                ele.tags.push({
                                    num: num,
                                    text: text
                                });
                            }
                            nodeObjs.forEach(function (el) {
                                if (el.id == ele.id) {
                                    el.tags = ele.tags;
                                }
                            });
                            tag.select('text.list').selectAll('tspan').data([]).exit().remove();
                            tag.select('text.list')
                                .attr('y', rh / 2 + 7)
                                .selectAll('tspan')
                                .data(ele.tags)
                                .enter()
                                .append('tspan')
                                .attr('x', 22)
                                .attr('dy', 16)
                                .text(function (d) {
                                    return d.num + '.' + (d.text.length > 10 ? (d.text.slice(0, 10) + '...') : d.text);
                                });

                            tag.select('rect.tagrect')
                                .attr('y', rh / 2 + 7)
                                .attr('x', 14)
                                .attr('fill', '#f2f2f2')
                                .attr('rx', 10)
                                .attr('ry', 10)
                                .attr('height', function (d) {
                                    return d.tags.length * 14 + 10;
                                })
                                .attr('width', function (d) {
                                    var arr = ele.tags.map(function (el) {
                                        return el.text.length;
                                    }).sort(function (a, b) {
                                        return b - a;
                                    });
                                    var sw = (arr[0] > 10 ? 10 : arr[0]) * 10 + 34;
                                    return sw > rw ? sw : rw;
                                })

                            if (!tag.select('circle').size()) {
                                tag.append('circle')
                                    .attr('class', 'tagcircle')
                                    .attr('r', 10)
                                    .attr('stroke-width', 1)
                                    .attr('stroke', '#ccc')
                                    .attr('fill', '#efefef');
                                tag.append('text')
                                    .attr('class', 'tagnums')
                                    .attr('fill', 'red')
                                    .attr('text-anchor', 'middle')
                                    .attr('transform', 'translate(0,4)')
                                    .text(ele.tags.length);
                            } else {
                                tag.select('text.tagnums').text(ele.tags.length);
                            };
                        });
                    }
                    /**
                     * 设置高亮文本，执行之后需重新load数据
                     * @function setHighlightText
                     * @param {String} text - 需要高亮的内容
                     */
                    graph.setHighlightText = function (text) {
                        opt.highlightText = text;
                    }
                    /**
                     * 添加关系tag
                     * @function addLinkTag
                     * @param {Number} num - 标签编号
                     * @param {String} text - 标签内容
                     */
                    graph.addLinkTag = function (num, text) {
                        d3.selectAll(selectedLinkLabelsArr.join(',')).each(function (ele) {
                            var tag = d3.select(this).selectAll('.tag'),
                                tagText;
                            var trans = d3.select(this).select('[type="linktext"]').attr('transform').match(/\(.+\)/)[0].slice(1, -1).split(',');
                            var textsize = d3.select(this).select('[type="linktext"]').selectAll('text').size();
                            if (!tag.size()) {
                                tag = d3.select(this)
                                    .append('g')
                                    .attr('class', 'tag')
                                    .attr('transform', 'translate(' + trans[0] + ',' + (trans[1] + (textsize == 2 ? 5 : 15)) + ')');
                            }
                            if (tag.select('[alt="' + num + '"]').size()) {
                                tagText = tag.select('[alt="' + num + '"]');
                                tagText.select('.tagnum').text(num);
                                tagText.select('.tagtext').text(text);
                                for (var i = 0; i < ele.tags.length; i++) {
                                    if (ele.tags[i].num == num) {
                                        ele.tags[i].text = text;
                                    };
                                };
                            } else {
                                tagText = tag.append('text')
                                    .attr('y', tag.selectAll('text').size() * 26)
                                    .attr('alt', num);
                                tagText.append('tspan')
                                    .attr('class', 'tagnum')
                                    .attr('fill', 'red')
                                    .attr('font-size', 18)
                                    .text(num);
                                tagText.append('tspan')
                                    .attr('class', 'tagtext')
                                    .attr('fill', 'black')
                                    .text(text);
                                ele.tags.push({
                                    num: num,
                                    text: text
                                });
                            };
                        });
                    }
                    /* GCQ  */
                    /**
                     * 选中node or link  selectedElements
                     * @function selectedElements
                     * @param {Array} nodes - 实体id
                     * @param {Array} links - 关系id
                     */
                    graph.selectedElements = function (nodes, links) {
                        clearAllSelection();
                        selectElements(nodes, links);
                    };
                    /**
                     * 反选
                     * @function invertSelection
                     */
                    graph.invertSelection = function () {
                        var invert_ids = [];
                        node.filter(function (d) {
                            if (selectedNodesArr.indexOf('#node-' + d.id) == -1) {
                                invert_ids.push(d.id);
                            }
                            return false;
                        });
                        clearAllSelection();
                        selectElements(invert_ids, []);
                    };
                    /**
                     * 全选 selectedAll
                     * @function selectedAll
                     */
                    graph.selectedAll = function () {
                        clearAllSelection();
                        var invert_ids = [];
                        node.filter(function (d) {
                            if (selectedNodesArr.indexOf(d.id) == -1) {
                                invert_ids.push(d.id);
                            }
                            return false;
                        });
                        selectElements(invert_ids, []);
                    };
                    /**
                     * 根据ID删除
                     * @function romoveElementsById
                     * @param {Array} nodeids - 实体id
                     * @param {Array} linkids - 关系id
                     */
                    graph.romoveElementsById = function (nodeids, linkids) {
                        var delObj = {};
                        var temp_link_arr = [],
                            temp_link_label_arr = [];
                        if (nodeids.length > 0) {
                            var temp_nodeids = [];
                            for (var i = 0; i < nodeids.length; i++) {
                                var id = nodeids[i];
                                temp_nodeids.push('#node-' + id);
                                var link_s = "[source='node-" + id + "']";
                                var link_t = "[target='node-" + id + "']";
                                temp_link_arr.push(link_s);
                                temp_link_arr.push(link_t);

                                var link_label_s = "[source='link-label-" + id + "']";
                                var link_label_t = "[target='link-label-" + id + "']";
                                temp_link_label_arr.push(link_label_s);
                                temp_link_label_arr.push(link_label_t);

                                var index = selectedNodesArr.indexOf('#node-' + id);
                                if (index >= 0) {
                                    selectedNodesArr.splice(index, 1);
                                }

                                var vid = nodeGroup.select('#node-' + id).data()[0].vid;
                                delete repeatViewId[vid];
                            }

                            var t = nodeGroup.selectAll(temp_nodeids.toString());
                            delObj['nodes'] = t.data();
                            t.remove();
                            nodeObjs = graph.removeDeleted(nodeObjs, delObj['nodes']);
                            node = graph.removeDeleted(node, delObj['nodes']);
                        }

                        if (linkids.length > 0 || temp_link_arr.length > 0) {
                            var temp_linkids = [],
                                temp_linkTextids = [],
                                temp_linkMark = [];
                            var del_links_arr = [];
                            for (var i = 0; i < linkids.length; i++) {
                                temp_linkids.push('#link-' + linkids[i]);
                                temp_linkTextids.push('#link-label-' + linkids[i]);
                                if (opt.allowMarker) {
                                    temp_linkMark.push('#link-mark-path-' + linkids[i]);
                                }
                            }

                            if (temp_linkids.length > 0) {
                                linkTextGroup.selectAll(temp_linkTextids.toString()).remove();
                                linkGroup.selectAll(temp_linkMark.toString()).remove();

                                var t = linkGroup.selectAll(temp_linkids.toString());
                                del_links_arr = t.data();
                                t.remove();
                                //删除对应的link
                                del_links_arr.map(function (ele) {
                                    temp_link_arr.push('#link-' + ele.id);
                                    return false;
                                });
                            }

                            if (temp_link_arr.length > 0) {
                                t = linkGroup.selectAll(temp_link_arr.toString());
                                del_links_arr = del_links_arr.concat(t.data());
                                t.remove();
                            }
                            delObj['links'] = del_links_arr;
                            linkObjs = graph.removeDeleted(linkObjs, delObj['links']);
                            link = graph.removeDeleted(link, delObj['links']);
                            linkText = graph.removeDeleted(linkText, delObj['links']);

                            for (var i in del_links_arr) {
                                var index = selectedLinkLabelsArr.indexOf('#link-label-' + del_links_arr[i].id);
                                if (index >= 0) {
                                    selectedLinkLabelsArr.splice(index, 1);
                                    selectedLinkLabelRectsArr.splice(index, 1);
                                };
                            };
                        }

                        delObj = JSON.parse(JSON.stringify(delObj));
                        if (delObj.nodes == undefined) {
                            delObj['nodes'] = [];
                        }
                        if (delObj.links == undefined) {
                            delObj['links'] = [];
                        }
                        var d_links = delObj['links'].filter(function (ele) {
                            ele['source'] = ele['source'].id;
                            ele['target'] = ele['target'].id;
                            return ele;
                        });
                        delObj['links'] = d_links;

                        if (temp_link_label_arr.length > 0) {
                            linkTextGroup.selectAll(temp_link_label_arr.toString()).remove();
                        }
                        if (JSON.stringify(delObj) === '{}') {
                            return false;
                        } else {
                            delObjArr.push(delObj);
                            draw();
                            // console.log('romoveElementsById')
                            Thumbnail();
                        };
                    }
                    /**
                     * 清除已删除项(数据)
                     * @function removeDeleted
                     * @param {object} obj
                     * @param {Array} item
                     * @returns {Array}
                     */
                    graph.removeDeleted = function (obj, item) {
                        return obj.filter(function (ele) {
                            return item.map(function (el) {
                                return el.id;
                            }).indexOf(ele.id) == -1;
                        });
                    }
                    /**
                     * 撤销删除
                     * @function revokeDeleted
                     */
                    graph.revokeDeleted = function () {
                        if (delObjArr.length > 0) {
                            var delObj = delObjArr[delObjArr.length - 1];
                            delObjArr.splice(delObjArr.length - 1, 1);
                            graph.addElements(delObj);
                        } else { };
                    };
                    /**
                     * 编辑元素
                     * @function editElement
                     * @param {String} id - id
                     * @param {String} key - key
                     * @param {String} val - 值
                     * @param {boolean} hidden - false:修改 properties true:修改hiddenProperties
                     */
                    graph.editElement = function (id, key, val, hidden) {
                        var last_selected = d3.select('[id*=' + id + ']');
                        if (last_selected.size() == 1) {
                            //修改绑定属性
                            var pro = last_selected.data()[0];
                            if (hidden) {
                                pro['hiddenProperties'] = pro['hiddenProperties'] ? pro['hiddenProperties'] : {};
                                pro['hiddenProperties'][key] = val;
                            } else {
                                pro['properties'] = pro['properties'] ? pro['properties'] : {};
                                pro['properties'][key] = val;
                            }
                            if ('node' == pro.type) {
                                last_selected.select('text').selectAll('tspan').data([]).exit().remove();
                                last_selected.select('text').selectAll('tspan').data(function () {
                                    if (pro.isShowAll) {
                                        return pro.getPropList();
                                    } else {
                                        var arr = pro.getPropList().slice(0, 2);
                                        arr.push('...');
                                        return arr;
                                    }
                                }).enter().append('tspan').attr('dy', function (d, i) {
                                    return 14;
                                }).attr('x', -1).text(function (d) {
                                    return d;
                                });
                            } else if ('link' == pro.type) {
                                //关系修改 暂未实现
                                var link_label = linkTextGroup.select('#link-label-' + pro.id);
                                link_label.select("text[type='linktext']").selectAll("tspan").remove();
                                link_label.select("text[type='linktext']")
                                    .selectAll('tspan').data(function (d) {
                                        return [d.getPropList()[0]];
                                    }).enter().append('tspan').attr('x', 0)
                                    .attr('dy', function (text, i, arr) {
                                        return i == 0 ? (arr.length - 1) * -15 / 2 : 15;
                                    }).text(function (d) {
                                        return d;
                                    });

                                link_label.select('.linkrect')
                                    .attr('width', function (d) {
                                        return document.getElementById('link-text-' + d.id).getBBox().width + (d.getPropLength() > 1 ? 40 : 30);
                                    })
                                    .attr('height', function (d) {
                                        return document.getElementById('link-text-' + d.id).getBBox().height + 15;
                                    });
                            };
                        };
                    };
                    /**
                     * 选取两端和对端   selectedPath 选取路径上的节点(node,link)
                     * @function selectedBothEnds
                     * @param {Array} nodeids - 实体id
                     * @param {Array} linkids - 关系id
                     * @param {String} selectedPath
                     */
                    graph.selectedBothEnds = function (nodeids, linkids, selectedPath) {
                        var s_nodes = [],
                            s_links = [];
                        if (nodeids.length > 0) {
                            selectedPath && s_nodes.push(nodeids);
                            linkObjs.filter(function (ele) {
                                return nodeids.indexOf(ele.source.id) >= 0 || nodeids.indexOf(ele.target.id) >= 0;
                            }).map(function (link) {
                                var end1id = link.source.id;
                                var end2id = link.target.id;
                                if (selectedPath) {
                                    s_links.push(link.id);
                                    if (s_nodes.indexOf(end1id) == -1) {
                                        s_nodes.push(end1id);
                                    }
                                    if (s_nodes.indexOf(end2id) == -1) {
                                        s_nodes.push(end2id);
                                    }
                                } else {
                                    if (s_nodes.indexOf(end1id) == -1 && nodeids.indexOf(end1id) == -1) {
                                        s_nodes.push(end1id);
                                    }
                                    if (s_nodes.indexOf(end2id) == -1 && nodeids.indexOf(end2id) == -1) {
                                        s_nodes.push(end2id);
                                    }
                                };
                            });

                        }

                        if (linkids.length > 0) {
                            linkObjs.filter(function (ele) {
                                return linkids.indexOf(ele.id) >= 0;
                            }).map(function (link) {
                                var end1id = link.source.id;
                                var end2id = link.target.id;
                                selectedPath && s_links.push(link.id);
                                s_nodes.push(end1id);
                                s_nodes.push(end2id);
                            });
                        }

                        graph.selectedElements(s_nodes, s_links);
                    }
                    /**
                     * 根据link获得两端node
                     * @function getLinkNodes
                     * @param {String} id - 关系id
                     * @returns {Object}
                     */
                    graph.getLinkNodes = function (id) {
                        var l = linkObjs.filter(function (ele) {
                            return id == ele.id;
                        });
                        return {
                            "source": l[0].getSource(),
                            "target": l[0].getTarget()
                        };
                    }
                    /**
                     * 根据node获得link
                     * @function getNodeLinks
                     * @param {String} id - 实体id
                     * @returns {Array}
                     */
                    graph.getNodeLinks = function (id) {
                        var n = nodeObjs.filter(function (ele) {
                            return id == ele.id;
                        });
                        return n[0].getLinks();
                    }
                    /**
                     * 获得可视区域
                     * @function getViewArea
                     * @returns {object}
                     */
                    graph.getViewArea = function () {
                        return getViewArea();
                    }
                    /**
                     * 批量删除nodes/links
                     * @function removeElements
                     * @param {array} new_data - 新数据
                     */
                    graph.removeElements = function (data) {
                        nodeGroup.selectAll("g").data(data.nodes).exit().remove();
                        linkGroup.selectAll("path").data(data.links).exit().remove();
                        linkTextGroup.selectAll("g").data(data.links).exit().remove();
                    }
                    /**
                     * 批量添加nodes/links
                     * @function addElements
                     * @param {array} new_data - 添加的数据
                     */
                    graph.addElements = function (new_data) {
                        linkGroup.selectAll('*').remove();
                        nodeGroup.selectAll('*').remove();
                        linkTextGroup.selectAll('*').remove();

                        if (new_data.nodes && new_data.nodes.length) {
                            var new_nodeObjs = [],
                                new_data_nodes = [];
                            for (var i = 0; i < new_data.nodes.length; i++) {
                                var d = new_data.nodes[i];
                                if (repeatViewId[d.vid] == undefined) { //vid不存在
                                    repeatViewId[d.vid] = d.id;
                                    new_nodeObjs.push(new Node(d));
                                    new_data_nodes.push(d);
                                } else { //vid已存在
                                    repeatNodes[d.id] = repeatViewId[d.vid];
                                };
                            }
                            nodeObjs = nodeObjs.concat(new_nodeObjs);
                        }
                        if (new_data.links && new_data.links.length) {
                            var new_linkObjs = [],
                                new_data_links = [];
                            for (var i = 0; i < new_data.links.length; i++) {
                                var l = new_data.links[i];
                                if (repeatNodes[l.source] != undefined) {
                                    l.source = repeatNodes[l.source];
                                }
                                if (repeatNodes[l.target] != undefined) {
                                    l.target = repeatNodes[l.target];
                                }
                                new_linkObjs.push(new Link(l));
                                new_data_links.push(l);
                            }
                            linkObjs = linkObjs.concat(new_linkObjs);
                        }

                        redrawContent();
                        draw();
                        // viewData();
                        // console.log('addElements')
                        Thumbnail();
                        count = 0;
                        addEvent();
                    };
                    /**
                     * 窗口自适应
                     * @function displayAdapt
                     */
                    graph.displayAdapt = function (duration = 1000) {
                        // console.log('displayAdapt')
                        var va = document.getElementById('viewArea').getBBox();
                        va.height += 100;
                        va.width += 100;
                        var sc = AreaSelfAdaption(
                            va, {
                            width: opt.width,
                            height: opt.height
                        }, 1
                        );
                        setTransform(sc.x, sc.y, sc.k, duration);
                        Thumbnail(true);
                        // viewData();
                    };
                    /**
                     * 设置svg大小
                     * @function setSize
                     * @param {object} size - svg大小
                     * @param {Number} num - 略缩图距离浏览器左边的距离（可以省略）
                     */
                    graph.setSize = function (size, num) {
                        d3.select('svg')
                            .attr('width', size.width)
                            .attr('height', size.height);
                        if (document.querySelector('.svgGraph')) {
                            var svgGraph = document.querySelector('.svgGraph').getBoundingClientRect();
                            d3.select('svg.svgNT').attr('style', 'left:' + ((svgGraph.left || num) + 25) + 'px');
                            graph.displayAdapt();
                        }
                    }
                    /**
                     * 导出图片
                     * @function exportPic
                     * @param {String} name 导出的文件名
                     */
                    graph.exportPic = function (name) {
                        stop_ticked = true;
                        var maxConvasSize = 30000
                        //后台实现
                        // var svg = document.querySelector('.svgGraph').outerHTML;
                        var limit = 100;
                        var va = document.getElementById('viewArea').getBBox();

                        if (va.width > maxConvasSize || va.height > maxConvasSize) {

                            var width = va.width > maxConvasSize ? maxConvasSize : va.width
                            var height = va.height > maxConvasSize ? maxConvasSize : va.height
                            var scale = width > height ? width / va.width : height / va.height
                            d3.select('.svgGraph').attr('width', width + limit / 2).attr('height', height + limit / 2);

                            // var svg = document.getElementsByClassName('svgGraph')[0].getBBox();
                            var rx = width / 2 - (va.width / 2 + va.x) * scale + limit / 2
                            var ry = height / 2 - (va.height / 2 + va.y) * scale + limit / 2
                            var tr = 'translate(' + rx + ',' + ry + ')scale(' + scale + ')';
                            container.attr('transform', tr);
                            viewData(true);
                            saveAsPng.saveSvgAsSvg(d3.select('.svgGraph'), name + ".svg")
                        } else {
                            d3.select('.svgGraph').attr('width', va.width + limit).attr('height', va.height + limit);
                            var tr = 'translate(' + (-va.x + limit / 2) + ',' + (-va.y + limit / 2) + ')scale(1)';
                            container.attr('transform', tr);
                            viewData(true);
                            saveAsPng.saveSvgAsSvg(d3.select('.svgGraph'), name + ".svg")
                            // saveAsPng.saveSvgAsPng(document.querySelector(".svgGraph"), name + ".png"); //保存成图片
                        }

                        saveAsPng.svgAsDataUri(document.querySelector(".svgGraph"), {}, function (uri) { //转换成base64编码
                            var img = new Image();
                            img.src = uri;
                            var canvas = document.createElement('canvas');
                            var content = canvas.getContext('2d');
                            img.onload = function () {
                                content.drawImage(img, 0, 0);
                                canvas.toDataURL();
                                d3.select('.svgGraph').attr('width', opt.width).attr('height', opt.height);
                                container.attr('transform', 'translate(' + svgScale.x + ',' + svgScale.y + ')scale(' + svgScale.k + ')');
                                viewData();
                                stop_ticked = false;
                            };
                        });
                    }
                    /**
                     * 获取重复数据
                     * @function getRepeatData
                     * @returns {Object}
                     * @param {Array} msg
                     * @returns {Object}
                     */
                    graph.getRepeatData = function (msg) {
                        return {
                            viewId: repeatViewId,
                            nodesId: repeatNodes
                        };
                    }
                    /**
                     * 选取单个对象
                     * @function select
                     * @param {string} msg - 查询id
                     * @returns {Array}
                     */
                    graph.select = function (msg) {
                        return d3.select(msg);
                    }
                    /**
                     * 选取多个对象
                     * @function selectAll
                     * @param {string} msg - 查询ids
                     * @returns {Array}
                     */
                    graph.selectAll = function (msg) {
                        return d3.selectAll(msg);
                    }
                    /**
                     * 修改实体颜色
                     * @function editNodeColor
                     * @param {Array} ids - 需要修改的实体的id
                     * @param {string} color - 色值
                     */
                    graph.editNodeColor = function (ids, color, parentId = null) {
                        if (ids.length == 0) {
                            return;
                        }
                        var nids = ids.map(function (ele) {
                            return '#node-' + ele;
                        });

                        var group = nodeGroup.selectAll(nids.toString());
                        var data = group.data();
                        data.map(function (ele) {
                            if (parentId == null) {
                                if (opt.type.indexOf('force') != -1) {
                                    ele.color = color;
                                } else {
                                    ele.data.color = color;
                                }
                            } else {
                                if (opt.type.indexOf('force') != -1) {
                                    ele.color = color;
                                } else {
                                    if (ele.parent.data.id == parentId) {
                                        ele.data.color = color;
                                    }
                                }
                            }
                        });
                        redrawNode(group, 'edit');
                        // console.log('editNodeColor')
                        Thumbnail();
                    };
                    /**
                     * 修改关系颜色
                     * @function editLinkColor
                     * @param {Array} ids - 需要修改的关系的id
                     * @param {string} color - 色值
                     */
                    graph.editLinkColor = function (ids, color) {
                        if (ids.length == 0) {
                            return;
                        }
                        var lids = [],
                            llids = [];
                        for (var i in ids) {
                            lids.push('#link-' + ids[i]);
                            llids.push('#link-label-' + ids[i]);
                        }
                        var group = d3.selectAll(lids.toString());
                        var data = group.data();
                        data.map(function (ele) {
                            ele.color = color;
                        });
                        group.attr("stroke", color);

                        var link_label = linkTextGroup.selectAll(llids.toString());
                        link_label.select('rect').attr('stroke', function (d) {
                            return d.color || '#2296ff';
                        });
                    };
                    /**
                     * 修改关系连线宽度
                     * @function editLinkWidth
                     * @param {Array} ids - 需要修改的关系的id
                     * @param {Number} w - 宽度
                     */
                    graph.editLinkWidth = function (ids, w) {
                        if (ids.length == 0) {
                            return;
                        }
                        var lids = ids.map(function (ele) {
                            return '#link-' + ele;
                        });
                        var group = d3.selectAll(lids.toString());
                        var data = group.data();
                        data.map(function (ele) {
                            ele.value = w;
                        });
                        group.attr("stroke-width", w);
                    };

                    return graph;
                };

                /***/
            }),
            /* 6 */
            /***/
            (function (module, exports) {

                module.exports = function (graph) {
                    /**
                     * 实体对象
                     * @class Node
                     * @constructor Node
                     * @property {string} type - 类型
                     * @property {Array} links - 关系
                     * @property {Array} tags  - 标签
                     * @property {Boolean} isfixed - 锁定状态
                     * @property {Boolean} useKeyNode - 关键节点
                     * @property {Boolean} isShowAll - 是否全部展示
                     * @property {Boolean} showTags - 标签显示状态
                     * @property {Number} nodeScale - 实体缩放大小
                     * @property {String} icon - 实体图标
                     */
                    function Node(data) {
                        this.type = 'node';
                        this.links = [];
                        this.tags = [];
                        for (var key in data) {
                            this[key] = data[key];
                        }
                        this.isfixed = false;
                        this.useKeyNode = false;
                        this.isShowAll = false;
                        this.showTags = false;
                        this.nodeScale = 1;
                        this.icon = this.getIcon();
                        this.showProperties = this.getShowProperties();
                    }
                    Node.prototype = {
                        /**
                         * 获取 nodeType
                         * @function getType
                         * @memberof Node.prototype
                         * @returns {String}
                         */
                        getType: function () {
                            return this.nodeType;
                        },
                        /**
                         * 获取 vid
                         * @function getKey
                         * @memberof Node.prototype
                         * @returns {String}
                         */
                        getKey: function () {
                            return this.vid;
                        },
                        /**
                         * 获取 关系
                         * @function getLinks
                         * @memberof Node.prototype
                         * @returns {Array}
                         */
                        getLinks: function () {
                            var me = this;
                            return graph.getData().links.filter(function (ele) {
                                return ele.source == me.id || ele.target == me.id;
                            });
                        },
                        /**
                         * 获取 id
                         * @function getId
                         * @memberof Node.prototype
                         * @returns {String}
                         */
                        getId: function () {
                            return this.id;
                        },
                        /**
                         * 获取 选中项
                         * @function getSelection
                         * @memberof Node.prototype
                         * @returns {Array}
                         */
                        getSelection: function () {
                            return d3.select('#node-' + this.id);
                        },
                        /**
                         * 获取 与实体相连的实体
                         * @function getSiblings
                         * @memberof Node.prototype
                         * @returns {Array}
                         */
                        getSiblings: function () {
                            var arr = [],
                                temp = '';
                            var objs = this.getLinks();
                            for (var i = 0; i < objs.length; i++) {
                                temp = this.id == objs[i].source ? objs[i].target : objs[i].source;
                                if (arr.indexOf(temp) == -1) {
                                    arr.push(temp);
                                }
                            }
                            return arr;
                        },
                        getShowProperties: function () {
                            let showProperties = []
                            let opt = graph.getOptions();
                            if (this.nodeType == 'QB_ZP_TP') {
                                showProperties = opt.TPProperties
                            } else if (this.nodeType == 'QB_ZP_RY') {
                                showProperties = opt.RYProperties
                            }
                            return showProperties;
                        },
                        /**
                         * 获取 实体properties
                         * @function getPropList
                         * @memberof Node.prototype
                         * @returns {Array}
                         */
                        getPropList: function () {
                            var arr = [];
                            for (var key in this.properties) {
                                //清除空值 && (!this.showProperties.length || this.showProperties.indexOf(key) != -1)
                                if (this.properties.XM == '') {
                                    this.properties.XM = '空';
                                } else if (!this.properties.HJD || this.properties.HJD == 'null') {
                                    this.properties.HJD = '空';
                                } else if (this.properties.GXMC == '') {
                                    this.properties.GXMC = '空';
                                } else if (this.properties.SFZHM == '') {
                                    this.properties.SFZHM = '空';
                                } else if (this.properties.RYBQ == '') {
                                    this.properties.RYBQ = graph.getOptions().properties['RYBQ'] + "数：0";
                                }
                                if (this.properties[key] && (!this.showProperties ? true : (!this.showProperties.length || this.showProperties.indexOf(key) != -1))) {
                                    let propIndex = this.showProperties.indexOf(key)
                                    arr.push({
                                        name: key,
                                        label: graph.getOptions().properties[key],
                                        val: this.properties[key],
                                        index: propIndex
                                    });
                                }
                            }
                            arr.sort((a, b) => {
                                return a.index - b.index
                            })
                            return arr;
                        },
                        /**
                         * 获取 实体properties最大宽
                         * @function getPropWidth
                         * @memberof Node.prototype
                         * @returns {Number}
                         */
                        getPropWidth: function () {
                            var lenArr = this.getPropList().map(function (ele) {
                                return calStrWidth(ele.val.toString(), 10)
                            })
                            lenArr = lenArr.sort(function (a, b) {
                                return b - a;
                            });
                            if (lenArr.length) {
                                return lenArr[0]
                            }
                            return 0;
                        },
                        /**
                         * 获取 实体properties最大高
                         * @function getPropHeight
                         * @memberof Node.prototype
                         * @returns {Number}
                         */
                        getPropHeight: function () {
                            return this.getPropLength() * (12 + 4);
                        },
                        /**
                         * 获取 实体properties数据的length属性
                         * @function getPropLength
                         * @memberof Node.prototype
                         * @returns {Number}
                         */
                        getPropLength: function () {
                            return this.getPropList().length;
                        },
                        /**
                         * 获取 实体 icon
                         * @function getIcon
                         * @memberof Node.prototype
                         * @returns {String}
                         */
                        getIcon: function () {
                            var me = this;
                            var icons = graph.getIcons(),
                                sex = ['女', 0, 'female'],
                                option = graph.getOptions();
                            if (icons.length > 0) {
                                for (var i = 0; i < icons.length; i++) {
                                    var icon = {};
                                    if (icons[i].type == this.iconType) {
                                        if (sex.indexOf(this.properties.XB) != -1 || sex.indexOf(this.properties.gender) != -1) {
                                            for (var key in icons[i]) {
                                                icon[key] = icons[i][key];
                                            }
                                            icon.path = icons[i].path_n;
                                            return icon;
                                        }
                                        if (this.iconType == 'tupu' && !!this.properties.label) {
                                            icon = {
                                                "path": option.iconTagPath[this.properties.label],
                                                "color": option.topTagColors[this.properties.label],
                                                "avatar": icons[i].avatar,
                                                "type": icons[i].type,
                                                "fill": icons[i].fill,
                                                "desc": icons[i].desc
                                            }
                                            return icon;
                                        }
                                        return icons[i];
                                    }
                                }
                            } else {
                                var icon = {};
                                if (this.iconType == 'tupu' && !!this.properties.label) {
                                    icon = {
                                        "path": option.iconTagPath[this.properties.label],
                                        "color": option.topTagColors[this.properties.label],
                                        "avatar": "icon-tupu",
                                        "type": this.iconType,
                                        "fill": "#e5f5fd",
                                        "desc": "图谱"
                                    }
                                    return icon;
                                } else {
                                    icon = {
                                        path: "M257.368334 626.757572c0-17.27141 14.109039-31.13719 31.380449-31.13719h448.935027c17.39304 0 31.502079 13.987409 31.502079 31.13719v56.314527h34.299561v-56.314527c-0.12163-36.124005-29.556004-65.193491-65.80164-65.193491H288.748783c-36.367265 0-65.801639 29.191115-65.80164 65.193491v56.314527h34.299561v-56.314527z m0 0M381.795463 331.684048c0 72.612899 58.868749 131.481649 131.481648 131.481649 72.612899 0 131.481649-58.868749 131.481649-131.481649s-58.868749-131.481649-131.481649-131.481649c-72.612899 0-131.481649 58.868749-131.481648 131.481649z m0 0M707.276399 748.508849c0 27.4883 14.717187 52.908897 38.434968 66.653047 23.839411 13.74415 53.152156 13.74415 76.991567 0 23.839411-13.74415 38.434969-39.164746 38.434968-66.653047 0-27.4883-14.717187-52.908897-38.434968-66.653047a77.035353 77.035353 0 0 0-76.991567 0c-23.717781 13.74415-38.434969 39.164746-38.434968 66.653047z m0 0M436.285545 748.508849c0 27.4883 14.595558 52.908897 38.434968 66.653047 23.839411 13.74415 53.152156 13.74415 76.991567 0 23.839411-13.74415 38.434969-39.164746 38.434968-66.653047 0-27.4883-14.717187-52.908897-38.434968-66.653047a77.035353 77.035353 0 0 0-76.991567 0c-23.717781 13.74415-38.434969 39.164746-38.434968 66.653047z m0 0M162.13232 748.508849c0 27.4883 14.717187 52.908897 38.434968 66.653047 23.839411 13.74415 53.152156 13.74415 76.991567 0 23.839411-13.74415 38.434969-39.164746 38.434968-66.653047 0-27.4883-14.717187-52.908897-38.434968-66.653047a77.035353 77.035353 0 0 0-76.991567 0C176.849507 695.599952 162.13232 721.020549 162.13232 748.508849z m0 0M496.127331 417.18969h34.056301v322.683454h-34.056301z",
                                        "color": "#009aed",
                                        "avatar": "icon-tupu",
                                        "type": this.iconType,
                                        "fill": "#e5f5fd",
                                        "desc": "图谱"
                                    }
                                }
                            }
                        },
                        getTplxs: function () {
                            var arr = [];
                            for (var key in this.tplxs) {
                                arr.push({
                                    mame: key,
                                    path: this.tplxs[key]
                                })
                            }
                            return arr;
                        },
                        /**
                         * 设置 实体 color 属性
                         * @function setColor
                         * @memberof Node.prototype
                         * @param {String} color - 色值
                         */
                        setColor: function (color) {
                            graph.editNodeColor([this.id], color);
                        }
                    }

                    function calStrWidth(str, w) {
                        //calculate string width
                        var full = (function (str) {
                            var re = /[\u4E00-\u9FA5]|[\uff00-\uffff]|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/g;
                            if (re.test(str)) {
                                return str.match(re).length;
                            } else {
                                return 0;
                            }
                        }(str));
                        var len = str.length;
                        return Math.ceil((len + full) * w / 2);
                    }
                    return Node;
                };


                /***/
            }),
            /* 7 */
            /***/
            (function (module, exports) {

                module.exports = function (graph) {
                    /**
                     * 关系对象
                     * @class Link
                     * @constructor Link
                     * @property {string} type - 类型
                     * @property {Array} tags  - 标签
                     */
                    function Link(data) {
                        this.type = 'link';
                        this.tags = [];
                        for (var key in data) {
                            this[key] = data[key];
                        }
                    }
                    Link.prototype = {
                        /**
                         * 获取 source
                         * @function getSource
                         * @memberof Link.prototype
                         * @returns {String}
                         */
                        getSource: function () {
                            return this.source;
                        },
                        /**
                         * 获取 target
                         * @function getTarget
                         * @memberof Link.prototype
                         * @returns {String}
                         */
                        getTarget: function () {
                            return this.target;
                        },
                        /**
                         * 获取 id
                         * @function getId
                         * @memberof Link.prototype
                         * @returns {String}
                         */
                        getId: function () {
                            return this.id;
                        },
                        /**
                         * 获取 关系properties
                         * @function getPropList
                         * @memberof Link.prototype
                         * @returns {Array}
                         */
                        getPropList: function () {
                            var arr = [];
                            for (var key in this.properties) {
                                //清除空值 && (!this.showProperties.length || this.showProperties.indexOf(key) != -1)
                                if (this.properties[key] && (!this.showProperties ? true : (!this.showProperties.length || this.showProperties.indexOf(key) != -1))) {
                                    arr.push(this.properties[key]);
                                }
                            }
                            return arr;
                        },
                        /**
                         * 获取 关系properties最大宽
                         * @function getPropWidth
                         * @memberof Link.prototype
                         * @returns {Number}
                         */
                        getPropWidth: function () {
                            var lenArr = this.getPropList().map(function (ele) {
                                return calStrWidth(ele.toString(), 10)
                            })
                            lenArr = lenArr.sort(function (a, b) {
                                return b - a;
                            });
                            if (lenArr.length) {
                                return lenArr[0] + (this.getPropLength() > 1 ? 40 : 35)
                            }
                            return 0;
                        },
                        /**
                         * 获取 关系properties最大高
                         * @function getPropHeight
                         * @memberof Link.prototype
                         * @returns {Number}
                         */
                        getPropHeight: function () {
                            return 16 + 15;
                        },
                        /**
                         * 获取 关系properties数据的length属性
                         * @function getPropLength
                         * @memberof Link.prototype
                         * @returns {Number}
                         */
                        getPropLength: function () {
                            return this.getPropList().length;
                        },
                        /**
                         * 获取 中心点
                         * @function getCenter
                         * @memberof Link.prototype
                         * @returns {Object}
                         */
                        getCenter: function () {
                            var x = (this.source.x + this.target.x) / 2;
                            var y = (this.source.y + this.target.y) / 2;
                            return {
                                x: x,
                                y: y
                            };
                        },
                        /**
                         * 设置 关系 color 属性
                         * @function setColor
                         * @memberof Link.prototype
                         * @param {String} color - 色值
                         */
                        setColor: function (color) {
                            graph.editLinkColor([this.id], color);
                        },
                        /**
                         * 设置 关系联系 width 属性
                         * @function setWidth
                         * @memberof Link.prototype
                         * @param {Number} num - 宽度值
                         */
                        setWidth: function (num) {
                            graph.editLinkWidth([this.id], num);
                        }
                    }

                    function calStrWidth(str, w) {
                        //calculate string width
                        var full = (function (str) {
                            var re = /[\u4E00-\u9FA5]|[\uff00-\uffff]|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5/g;
                            if (re.test(str)) {
                                return str.match(re).length;
                            } else {
                                return 0;
                            }
                        }(str));
                        var len = str.length;
                        return Math.ceil((len + full) * w / 2);
                    }
                    return Link;
                };

                /***/
            }),


            /* 8 */
            /***/
            (function (module, exports, __webpack_require__) {

                var __WEBPACK_AMD_DEFINE_RESULT__;
                /**
                 * 将svg保存为png图片
                 */
                module.exports = function () {
                    //---svg2png start---
                    var out$ = true && exports || true && {} || this;

                    var doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

                    function isElement(obj) {
                        return obj instanceof HTMLElement || obj instanceof SVGElement;
                    }

                    function requireDomNode(el) {
                        if (!isElement(el)) {
                            throw new Error('an HTMLElement or SVGElement is required; got ' + el);
                        }
                    }

                    function isExternal(url) {
                        return url && url.lastIndexOf('http', 0) == 0 && url.lastIndexOf(window.location.host) == -1;
                    }

                    function inlineImages(el, callback) {
                        requireDomNode(el);

                        var images = el.querySelectorAll('image'),
                            left = images.length,
                            checkDone = function () {
                                if (left === 0) {
                                    callback();
                                }
                            };

                        checkDone();
                        for (var i = 0; i < images.length; i++) {
                            (function (image) {
                                var href = image.getAttributeNS("http://www.w3.org/1999/xlink", "href");
                                if (href) {
                                    if (isExternal(href.value)) {
                                        console.warn("Cannot render embedded images linking to external hosts: " + href.value);
                                        return;
                                    }
                                }
                                var canvas = document.createElement('canvas');
                                var ctx = canvas.getContext('2d');
                                var img = new Image();
                                img.crossOrigin = "Anonymous";
                                href = href || image.getAttribute('href');
                                if (href) {
                                    img.src = href;
                                    img.onload = function () {
                                        canvas.width = img.width;
                                        canvas.height = img.height;
                                        ctx.drawImage(img, 0, 0);
                                        image.setAttributeNS("http://www.w3.org/1999/xlink", "href", canvas.toDataURL('image/png'));
                                        left--;
                                        checkDone();
                                    }
                                    img.onerror = function () {
                                        console.log("Could not load " + href);
                                        left--;
                                        checkDone();
                                    }
                                } else {
                                    left--;
                                    checkDone();
                                }
                            })(images[i]);
                        }
                    }

                    function styles(el, selectorRemap) {
                        var css = "";
                        var sheets = document.styleSheets;
                        for (var i = 0; i < sheets.length; i++) {
                            try {
                                var rules = sheets[i].cssRules;
                            } catch (e) {
                                console.warn("Stylesheet could not be loaded: " + sheets[i].href);
                                continue;
                            }

                            if (rules != null) {
                                for (var j = 0; j < rules.length; j++) {
                                    var rule = rules[j];
                                    if (typeof (rule.style) != "undefined") {
                                        var match, selectorText;

                                        try {
                                            selectorText = rule.selectorText;
                                        } catch (err) {
                                            console.warn('The following CSS rule has an invalid selector: "' + rule + '"', err);
                                        }

                                        try {
                                            if (selectorText) {
                                                match = el.querySelector(selectorText);
                                            }
                                        } catch (err) {
                                            console.warn('Invalid CSS selector "' + selectorText + '"', err);
                                        }

                                        if (match) {
                                            var selector = selectorRemap ? selectorRemap(rule.selectorText) : rule.selectorText;
                                            css += selector + " { " + rule.style.cssText + " }\n";
                                        } else if (rule.cssText.match(/^@font-face/)) {
                                            css += rule.cssText + '\n';
                                        }
                                    }
                                }
                            }
                        }
                        return css;
                    }

                    function getDimension(el, clone, dim) {
                        var v = (el.viewBox && el.viewBox.baseVal && el.viewBox.baseVal[dim]) ||
                            (clone.getAttribute(dim) !== null && !clone.getAttribute(dim).match(/%$/) && parseInt(clone.getAttribute(dim))) ||
                            el.getBoundingClientRect()[dim] ||
                            parseInt(clone.style[dim]) ||
                            parseInt(window.getComputedStyle(el).getPropertyValue(dim));
                        return (typeof v === 'undefined' || v === null || isNaN(parseFloat(v))) ? 0 : v;
                    }

                    function reEncode(data) {
                        data = encodeURIComponent(data);
                        data = data.replace(/%([0-9A-F]{2})/g, function (match, p1) {
                            var c = String.fromCharCode('0x' + p1);
                            return c === '%' ? '%25' : c;
                        });
                        return decodeURIComponent(data);
                    }

                    function uriToBlob(uri) {
                        const byteString = window.atob(uri.split(',')[1]);
                        const mimeString = uri.split(',')[0].split(':')[1].split(';')[0]
                        const buffer = new ArrayBuffer(byteString.length);
                        const intArray = new Uint8Array(buffer);
                        for (let i = 0; i < byteString.length; i++) {
                            intArray[i] = byteString.charCodeAt(i);
                        }
                        return new Blob([buffer], {
                            type: mimeString
                        });
                    }

                    out$.svgAsDataUri = function (el, options, cb) {
                        requireDomNode(el);

                        options = options || {};
                        options.scale = options.scale || 1;
                        options.responsive = options.responsive || false;
                        var xmlns = "http://www.w3.org/2000/xmlns/";

                        inlineImages(el, function () {
                            var outer = document.createElement("div");
                            var clone = el.cloneNode(true);
                            var width, height;
                            if (el.tagName == 'svg') {
                                width = options.width || getDimension(el, clone, 'width');
                                height = options.height || getDimension(el, clone, 'height');
                            } else if (el.getBBox) {
                                var box = el.getBBox();
                                width = box.x + box.width;
                                height = box.y + box.height;
                                clone.setAttribute('transform', clone.getAttribute('transform').replace(/translate\(.*?\)/, ''));

                                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
                                svg.appendChild(clone)
                                clone = svg;
                            } else {
                                console.error('Attempted to render non-SVG element', el);
                                return;
                            }

                            clone.setAttribute("version", "1.1");
                            if (!clone.getAttribute('xmlns')) {
                                clone.setAttributeNS(xmlns, "xmlns", "http://www.w3.org/2000/svg");
                            }
                            if (!clone.getAttribute('xmlns:xlink')) {
                                clone.setAttributeNS(xmlns, "xmlns:xlink", "http://www.w3.org/1999/xlink");
                            }

                            if (options.responsive) {
                                clone.removeAttribute('width');
                                clone.removeAttribute('height');
                                clone.setAttribute('preserveAspectRatio', 'xMinYMin meet');
                            } else {
                                clone.setAttribute("width", width * options.scale);
                                clone.setAttribute("height", height * options.scale);
                            }

                            clone.setAttribute("viewBox", [
                                options.left || 0,
                                options.top || 0,
                                width,
                                height
                            ].join(" "));

                            var fos = clone.querySelectorAll('foreignObject > *');
                            for (var i = 0; i < fos.length; i++) {
                                if (!fos[i].getAttributeNS('xml', 'xmlns')) {
                                    fos[i].setAttributeNS(xmlns, "xmlns", "http://www.w3.org/1999/xhtml");
                                }
                            }

                            outer.appendChild(clone);

                            var css = styles(el, options.selectorRemap);
                            var s = document.createElement('style');
                            s.setAttribute('type', 'text/css');
                            s.innerHTML = "<![CDATA[\n" + css + "\n]]>";
                            var defs = document.createElement('defs');
                            defs.appendChild(s);
                            clone.insertBefore(defs, clone.firstChild);

                            var svg = doctype + outer.innerHTML;
                            var uri = 'data:image/svg+xml;base64,' + window.btoa(reEncode(svg));
                            if (cb) {
                                cb(uri);
                            }
                        });
                    }

                    out$.svgAsPngUri = function (el, options, cb) {
                        requireDomNode(el);

                        out$.svgAsDataUri(el, options, function (uri) {
                            var image = new Image();
                            image.crossOrigin = "Anonymous";
                            image.onload = function () {
                                var canvas = document.createElement('canvas');
                                canvas.width = image.width;
                                canvas.height = image.height;
                                var context = canvas.getContext('2d');
                                if (options && options.backgroundColor) {
                                    context.fillStyle = options.backgroundColor;
                                    context.fillRect(0, 0, canvas.width, canvas.height);
                                }
                                context.drawImage(image, 0, 0);
                                var a = document.createElement('a'),
                                    png;
                                try {
                                    png = canvas.toDataURL('image/png');
                                } catch (e) {
                                    if ((typeof SecurityError !== 'undefined' && e instanceof SecurityError) || e.name == "SecurityError") {
                                        console.error("Rendered SVG images cannot be downloaded in this browser.");
                                        return;
                                    } else {
                                        throw e;
                                    }
                                }
                                cb(png);
                            }
                            image.onerror = function () {
                                console.error(
                                    'There was an error loading the data URI as an image on the following SVG\n',
                                    window.atob(uri.slice(26)), '\n',
                                    "Open the following link to see browser's diagnosis\n",
                                    uri);
                            }
                            image.src = uri;
                        });
                    }

                    function download(name, uri) {
                        // var a = document.createElement('a');
                        // a.download = name;
                        // a.href = uri;
                        // document.body.appendChild(a);
                        // a.addEventListener("click", function(e) {
                        //     a.parentNode.removeChild(a);
                        // });
                        // a.click();
                        if (navigator.msSaveOrOpenBlob) navigator.msSaveOrOpenBlob(uriToBlob(uri), name);
                        else {
                            const saveLink = document.createElement('a');
                            if ('download' in saveLink) {
                                saveLink.download = name;
                                saveLink.style.display = 'none';
                                document.body.appendChild(saveLink);
                                try {
                                    const blob = uriToBlob(uri);
                                    const url = URL.createObjectURL(blob);
                                    saveLink.href = url;
                                    saveLink.onclick = () => requestAnimationFrame(() => URL.revokeObjectURL(url));
                                } catch (e) {
                                    console.warn('This browser does not support object URLs. Falling back to string URL.');
                                    saveLink.href = uri;
                                }
                                saveLink.click();
                                document.body.removeChild(saveLink);
                            } else {
                                window.open(uri, '_temp', 'menubar=no,toolbar=no,status=no');
                            }
                        }
                    }

                    out$.saveSvg = function (el, name, options) {
                        requireDomNode(el);

                        options = options || {};
                        out$.svgAsDataUri(el, options, function (uri) {
                            download(name, uri);
                        });
                    }

                    out$.saveSvgAsPng = function (el, name, options) {
                        requireDomNode(el);

                        options = options || {};
                        out$.svgAsPngUri(el, options, function (uri) {
                            download(name, uri);
                        });
                    }

                    out$.saveSvgAsSvg = function (el, name) {
                        var xml = (new XMLSerializer()).serializeToString(el.node()); // convert node to xml string
                        var uri = 'data:application/octet-stream;base64,' + window.btoa(reEncode(xml));
                        download(name, uri);
                    }

                    // if define is defined create as an AMD module
                    if (true) {
                        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
                            return out$;
                        }).call(exports, __webpack_require__, exports, module),
                            __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = function () {
                                return __WEBPACK_AMD_DEFINE_RESULT__
                            }));
                    }


                    return out$;
                };


                /***/
            }),
            /* 9 */
            /***/
            (function (module, exports, __webpack_require__) {

                /**
                   licence 校验
                **/
                module.exports = function () {
                    var licence = {},
                        openTime = new Date().getTime(),
                        license, js5,
                        appjs = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1].src,
                        init_callback;

                    //rsa
                    ! function (t, e) {
                        true ? e(exports) : undefined
                    }(this, function (t) {
                        "use strict";
                        var e = "0123456789abcdefghijklmnopqrstuvwxyz";

                        function a(t) {
                            return e.charAt(t)
                        }

                        function i(t, e) {
                            return t & e
                        }

                        function u(t, e) {
                            return t | e
                        }

                        function r(t, e) {
                            return t ^ e
                        }

                        function n(t, e) {
                            return t & ~e
                        }

                        function s(t) {
                            if (0 == t) return -1;
                            var e = 0;
                            return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e
                        }

                        function o(t) {
                            for (var e = 0; 0 != t;) t &= t - 1, ++e;
                            return e
                        }
                        var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

                        function c(t) {
                            var e, i, r = "";
                            for (e = 0; e + 3 <= t.length; e += 3) i = parseInt(t.substring(e, e + 3), 16), r += h.charAt(i >> 6) + h.charAt(63 & i);
                            for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16), r += h.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16), r += h.charAt(i >> 2) + h.charAt((3 & i) << 4)); 0 < (3 & r.length);) r += "=";
                            return r
                        }

                        function f(t) {
                            var e, i = "",
                                r = 0,
                                n = 0;
                            for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
                                var s = h.indexOf(t.charAt(e));
                                s < 0 || (0 == r ? (i += a(s >> 2), n = 3 & s, r = 1) : 1 == r ? (i += a(n << 2 | s >> 4), n = 15 & s, r = 2) : 2 == r ? (i += a(n), i += a(s >> 2), n = 3 & s, r = 3) : (i += a(n << 2 | s >> 4), i += a(15 & s), r = 0))
                            }
                            return 1 == r && (i += a(n << 2)), i
                        }
                        var l, p = function (t, e) {
                            return (p = Object.setPrototypeOf || {
                                __proto__: []
                            }
                                instanceof Array && function (t, e) {
                                    t.__proto__ = e
                                } || function (t, e) {
                                    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                                })(t, e)
                        };
                        var g, d = function (t) {
                            var e;
                            if (void 0 === l) {
                                var i = "0123456789ABCDEF",
                                    r = " \f\n\r\t \u2028\u2029";
                                for (l = {}, e = 0; e < 16; ++e) l[i.charAt(e)] = e;
                                for (i = i.toLowerCase(), e = 10; e < 16; ++e) l[i.charAt(e)] = e;
                                for (e = 0; e < r.length; ++e) l[r.charAt(e)] = -1
                            }
                            var n = [],
                                s = 0,
                                o = 0;
                            for (e = 0; e < t.length; ++e) {
                                var h = t.charAt(e);
                                if ("=" == h) break;
                                if (-1 != (h = l[h])) {
                                    if (void 0 === h) throw new Error("Illegal character at offset " + e);
                                    s |= h, 2 <= ++o ? (n[n.length] = s, o = s = 0) : s <<= 4
                                }
                            }
                            if (o) throw new Error("Hex encoding incomplete: 4 bits missing");
                            return n
                        },
                            v = {
                                decode: function (t) {
                                    var e;
                                    if (void 0 === g) {
                                        var i = "= \f\n\r\t \u2028\u2029";
                                        for (g = Object.create(null), e = 0; e < 64; ++e) g["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                                        for (e = 0; e < i.length; ++e) g[i.charAt(e)] = -1
                                    }
                                    var r = [],
                                        n = 0,
                                        s = 0;
                                    for (e = 0; e < t.length; ++e) {
                                        var o = t.charAt(e);
                                        if ("=" == o) break;
                                        if (-1 != (o = g[o])) {
                                            if (void 0 === o) throw new Error("Illegal character at offset " + e);
                                            n |= o, 4 <= ++s ? (r[r.length] = n >> 16, r[r.length] = n >> 8 & 255, r[r.length] = 255 & n, s = n = 0) : n <<= 6
                                        }
                                    }
                                    switch (s) {
                                        case 1:
                                            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                                        case 2:
                                            r[r.length] = n >> 10;
                                            break;
                                        case 3:
                                            r[r.length] = n >> 16, r[r.length] = n >> 8 & 255
                                    }
                                    return r
                                },
                                re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
                                unarmor: function (t) {
                                    var e = v.re.exec(t);
                                    if (e)
                                        if (e[1]) t = e[1];
                                        else {
                                            if (!e[2]) throw new Error("RegExp out of sync");
                                            t = e[2]
                                        }
                                    return v.decode(t)
                                }
                            },
                            m = 1e13,
                            y = function () {
                                function t(t) {
                                    this.buf = [+t || 0]
                                }
                                return t.prototype.mulAdd = function (t, e) {
                                    var i, r, n = this.buf,
                                        s = n.length;
                                    for (i = 0; i < s; ++i)(r = n[i] * t + e) < m ? e = 0 : r -= (e = 0 | r / m) * m, n[i] = r;
                                    0 < e && (n[i] = e)
                                }, t.prototype.sub = function (t) {
                                    var e, i, r = this.buf,
                                        n = r.length;
                                    for (e = 0; e < n; ++e)(i = r[e] - t) < 0 ? (i += m, t = 1) : t = 0, r[e] = i;
                                    for (; 0 === r[r.length - 1];) r.pop()
                                }, t.prototype.toString = function (t) {
                                    if (10 != (t || 10)) throw new Error("only base 10 is supported");
                                    for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; 0 <= r; --r) i += (m + e[r]).toString().substring(1);
                                    return i
                                }, t.prototype.valueOf = function () {
                                    for (var t = this.buf, e = 0, i = t.length - 1; 0 <= i; --i) e = e * m + t[i];
                                    return e
                                }, t.prototype.simplify = function () {
                                    var t = this.buf;
                                    return 1 == t.length ? t[0] : this
                                }, t
                            }(),
                            b = "…",
                            T = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
                            S = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

                        function E(t, e) {
                            return t.length > e && (t = t.substring(0, e) + b), t
                        }
                        var w, D = function () {
                            function i(t, e) {
                                this.hexDigits = "0123456789ABCDEF", t instanceof i ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = e)
                            }
                            return i.prototype.get = function (t) {
                                if (void 0 === t && (t = this.pos++), t >= this.enc.length) throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
                            }, i.prototype.hexByte = function (t) {
                                return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
                            }, i.prototype.hexDump = function (t, e, i) {
                                for (var r = "", n = t; n < e; ++n)
                                    if (r += this.hexByte(this.get(n)), !0 !== i) switch (15 & n) {
                                        case 7:
                                            r += "  ";
                                            break;
                                        case 15:
                                            r += "\n";
                                            break;
                                        default:
                                            r += " "
                                    }
                                return r
                            }, i.prototype.isASCII = function (t, e) {
                                for (var i = t; i < e; ++i) {
                                    var r = this.get(i);
                                    if (r < 32 || 176 < r) return !1
                                }
                                return !0
                            }, i.prototype.parseStringISO = function (t, e) {
                                for (var i = "", r = t; r < e; ++r) i += String.fromCharCode(this.get(r));
                                return i
                            }, i.prototype.parseStringUTF = function (t, e) {
                                for (var i = "", r = t; r < e;) {
                                    var n = this.get(r++);
                                    i += n < 128 ? String.fromCharCode(n) : 191 < n && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
                                }
                                return i
                            }, i.prototype.parseStringBMP = function (t, e) {
                                for (var i, r, n = "", s = t; s < e;) i = this.get(s++), r = this.get(s++), n += String.fromCharCode(i << 8 | r);
                                return n
                            }, i.prototype.parseTime = function (t, e, i) {
                                var r = this.parseStringISO(t, e),
                                    n = (i ? T : S).exec(r);
                                return n ? (i && (n[1] = +n[1], n[1] += +n[1] < 70 ? 2e3 : 1900), r = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4], n[5] && (r += ":" + n[5], n[6] && (r += ":" + n[6], n[7] && (r += "." + n[7]))), n[8] && (r += " UTC", "Z" != n[8] && (r += n[8], n[9] && (r += ":" + n[9]))), r) : "Unrecognized time: " + r
                            }, i.prototype.parseInteger = function (t, e) {
                                for (var i, r = this.get(t), n = 127 < r, s = n ? 255 : 0, o = ""; r == s && ++t < e;) r = this.get(t);
                                if (0 === (i = e - t)) return n ? -1 : 0;
                                if (4 < i) {
                                    for (o = r, i <<= 3; 0 == (128 & (+o ^ s));) o = +o << 1, --i;
                                    o = "(" + i + " bit)\n"
                                }
                                n && (r -= 256);
                                for (var h = new y(r), a = t + 1; a < e; ++a) h.mulAdd(256, this.get(a));
                                return o + h.toString()
                            }, i.prototype.parseBitString = function (t, e, i) {
                                for (var r = this.get(t), n = "(" + ((e - t - 1 << 3) - r) + " bit)\n", s = "", o = t + 1; o < e; ++o) {
                                    for (var h = this.get(o), a = o == e - 1 ? r : 0, u = 7; a <= u; --u) s += h >> u & 1 ? "1" : "0";
                                    if (s.length > i) return n + E(s, i)
                                }
                                return n + s
                            }, i.prototype.parseOctetString = function (t, e, i) {
                                if (this.isASCII(t, e)) return E(this.parseStringISO(t, e), i);
                                var r = e - t,
                                    n = "(" + r + " byte)\n";
                                (i /= 2) < r && (e = t + i);
                                for (var s = t; s < e; ++s) n += this.hexByte(this.get(s));
                                return i < r && (n += b), n
                            }, i.prototype.parseOID = function (t, e, i) {
                                for (var r = "", n = new y, s = 0, o = t; o < e; ++o) {
                                    var h = this.get(o);
                                    if (n.mulAdd(128, 127 & h), s += 7, !(128 & h)) {
                                        if ("" === r)
                                            if ((n = n.simplify()) instanceof y) n.sub(80), r = "2." + n.toString();
                                            else {
                                                var a = n < 80 ? n < 40 ? 0 : 1 : 2;
                                                r = a + "." + (n - 40 * a)
                                            }
                                        else r += "." + n.toString();
                                        if (r.length > i) return E(r, i);
                                        n = new y, s = 0
                                    }
                                }
                                return 0 < s && (r += ".incomplete"), r
                            }, i
                        }(),
                            x = function () {
                                function c(t, e, i, r, n) {
                                    if (!(r instanceof R)) throw new Error("Invalid tag value.");
                                    this.stream = t, this.header = e, this.length = i, this.tag = r, this.sub = n
                                }
                                return c.prototype.typeName = function () {
                                    switch (this.tag.tagClass) {
                                        case 0:
                                            switch (this.tag.tagNumber) {
                                                case 0:
                                                    return "EOC";
                                                case 1:
                                                    return "BOOLEAN";
                                                case 2:
                                                    return "INTEGER";
                                                case 3:
                                                    return "BIT_STRING";
                                                case 4:
                                                    return "OCTET_STRING";
                                                case 5:
                                                    return "NULL";
                                                case 6:
                                                    return "OBJECT_IDENTIFIER";
                                                case 7:
                                                    return "ObjectDescriptor";
                                                case 8:
                                                    return "EXTERNAL";
                                                case 9:
                                                    return "REAL";
                                                case 10:
                                                    return "ENUMERATED";
                                                case 11:
                                                    return "EMBEDDED_PDV";
                                                case 12:
                                                    return "UTF8String";
                                                case 16:
                                                    return "SEQUENCE";
                                                case 17:
                                                    return "SET";
                                                case 18:
                                                    return "NumericString";
                                                case 19:
                                                    return "PrintableString";
                                                case 20:
                                                    return "TeletexString";
                                                case 21:
                                                    return "VideotexString";
                                                case 22:
                                                    return "IA5String";
                                                case 23:
                                                    return "UTCTime";
                                                case 24:
                                                    return "GeneralizedTime";
                                                case 25:
                                                    return "GraphicString";
                                                case 26:
                                                    return "VisibleString";
                                                case 27:
                                                    return "GeneralString";
                                                case 28:
                                                    return "UniversalString";
                                                case 30:
                                                    return "BMPString"
                                            }
                                            return "Universal_" + this.tag.tagNumber.toString();
                                        case 1:
                                            return "Application_" + this.tag.tagNumber.toString();
                                        case 2:
                                            return "[" + this.tag.tagNumber.toString() + "]";
                                        case 3:
                                            return "Private_" + this.tag.tagNumber.toString()
                                    }
                                }, c.prototype.content = function (t) {
                                    if (void 0 === this.tag) return null;
                                    void 0 === t && (t = 1 / 0);
                                    var e = this.posContent(),
                                        i = Math.abs(this.length);
                                    if (!this.tag.isUniversal()) return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
                                    switch (this.tag.tagNumber) {
                                        case 1:
                                            return 0 === this.stream.get(e) ? "false" : "true";
                                        case 2:
                                            return this.stream.parseInteger(e, e + i);
                                        case 3:
                                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + i, t);
                                        case 4:
                                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
                                        case 6:
                                            return this.stream.parseOID(e, e + i, t);
                                        case 16:
                                        case 17:
                                            return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                                        case 12:
                                            return E(this.stream.parseStringUTF(e, e + i), t);
                                        case 18:
                                        case 19:
                                        case 20:
                                        case 21:
                                        case 22:
                                        case 26:
                                            return E(this.stream.parseStringISO(e, e + i), t);
                                        case 30:
                                            return E(this.stream.parseStringBMP(e, e + i), t);
                                        case 23:
                                        case 24:
                                            return this.stream.parseTime(e, e + i, 23 == this.tag.tagNumber)
                                    }
                                    return null
                                }, c.prototype.toString = function () {
                                    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
                                }, c.prototype.toPrettyString = function (t) {
                                    void 0 === t && (t = "");
                                    var e = t + this.typeName() + " @" + this.stream.pos;
                                    if (0 <= this.length && (e += "+"), e += this.length, this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"), e += "\n", null !== this.sub) {
                                        t += "  ";
                                        for (var i = 0, r = this.sub.length; i < r; ++i) e += this.sub[i].toPrettyString(t)
                                    }
                                    return e
                                }, c.prototype.posStart = function () {
                                    return this.stream.pos
                                }, c.prototype.posContent = function () {
                                    return this.stream.pos + this.header
                                }, c.prototype.posEnd = function () {
                                    return this.stream.pos + this.header + Math.abs(this.length)
                                }, c.prototype.toHexString = function () {
                                    return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
                                }, c.decodeLength = function (t) {
                                    var e = t.get(),
                                        i = 127 & e;
                                    if (i == e) return i;
                                    if (6 < i) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                                    if (0 === i) return null;
                                    for (var r = e = 0; r < i; ++r) e = 256 * e + t.get();
                                    return e
                                }, c.prototype.getHexStringValue = function () {
                                    var t = this.toHexString(),
                                        e = 2 * this.header,
                                        i = 2 * this.length;
                                    return t.substr(e, i)
                                }, c.decode = function (t) {
                                    var r;
                                    r = t instanceof D ? t : new D(t, 0);
                                    var e = new D(r),
                                        i = new R(r),
                                        n = c.decodeLength(r),
                                        s = r.pos,
                                        o = s - e.pos,
                                        h = null,
                                        a = function () {
                                            var t = [];
                                            if (null !== n) {
                                                for (var e = s + n; r.pos < e;) t[t.length] = c.decode(r);
                                                if (r.pos != e) throw new Error("Content size is not correct for container starting at offset " + s)
                                            } else try {
                                                for (; ;) {
                                                    var i = c.decode(r);
                                                    if (i.tag.isEOC()) break;
                                                    t[t.length] = i
                                                }
                                                n = s - r.pos
                                            } catch (t) {
                                                throw new Error("Exception while decoding undefined length content: " + t)
                                            }
                                            return t
                                        };
                                    if (i.tagConstructed) h = a();
                                    else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber)) try {
                                        if (3 == i.tagNumber && 0 != r.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                                        h = a();
                                        for (var u = 0; u < h.length; ++u)
                                            if (h[u].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.")
                                    } catch (t) {
                                        h = null
                                    }
                                    if (null === h) {
                                        if (null === n) throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                                        r.pos = s + Math.abs(n)
                                    }
                                    return new c(e, o, n, i, h)
                                }, c
                            }(),
                            R = function () {
                                function t(t) {
                                    var e = t.get();
                                    if (this.tagClass = e >> 6, this.tagConstructed = 0 != (32 & e), this.tagNumber = 31 & e, 31 == this.tagNumber) {
                                        for (var i = new y; e = t.get(), i.mulAdd(128, 127 & e), 128 & e;);
                                        this.tagNumber = i.simplify()
                                    }
                                }
                                return t.prototype.isUniversal = function () {
                                    return 0 === this.tagClass
                                }, t.prototype.isEOC = function () {
                                    return 0 === this.tagClass && 0 === this.tagNumber
                                }, t
                            }(),
                            B = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
                            A = (1 << 26) / B[B.length - 1],
                            O = function () {
                                function b(t, e, i) {
                                    null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
                                }
                                return b.prototype.toString = function (t) {
                                    if (this.s < 0) return "-" + this.negate().toString(t);
                                    var e;
                                    if (16 == t) e = 4;
                                    else if (8 == t) e = 3;
                                    else if (2 == t) e = 1;
                                    else if (32 == t) e = 5;
                                    else {
                                        if (4 != t) return this.toRadix(t);
                                        e = 2
                                    }
                                    var i, r = (1 << e) - 1,
                                        n = !1,
                                        s = "",
                                        o = this.t,
                                        h = this.DB - o * this.DB % e;
                                    if (0 < o--)
                                        for (h < this.DB && 0 < (i = this[o] >> h) && (n = !0, s = a(i)); 0 <= o;) h < e ? (i = (this[o] & (1 << h) - 1) << e - h, i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & r, h <= 0 && (h += this.DB, --o)), 0 < i && (n = !0), n && (s += a(i));
                                    return n ? s : "0"
                                }, b.prototype.negate = function () {
                                    var t = M();
                                    return b.ZERO.subTo(this, t), t
                                }, b.prototype.abs = function () {
                                    return this.s < 0 ? this.negate() : this
                                }, b.prototype.compareTo = function (t) {
                                    var e = this.s - t.s;
                                    if (0 != e) return e;
                                    var i = this.t;
                                    if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;
                                    for (; 0 <= --i;)
                                        if (0 != (e = this[i] - t[i])) return e;
                                    return 0
                                }, b.prototype.bitLength = function () {
                                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + U(this[this.t - 1] ^ this.s & this.DM)
                                }, b.prototype.mod = function (t) {
                                    var e = M();
                                    return this.abs().divRemTo(t, null, e), this.s < 0 && 0 < e.compareTo(b.ZERO) && t.subTo(e, e), e
                                }, b.prototype.modPowInt = function (t, e) {
                                    var i;
                                    return i = t < 256 || e.isEven() ? new I(e) : new N(e), this.exp(t, i)
                                }, b.prototype.clone = function () {
                                    var t = M();
                                    return this.copyTo(t), t
                                }, b.prototype.intValue = function () {
                                    if (this.s < 0) {
                                        if (1 == this.t) return this[0] - this.DV;
                                        if (0 == this.t) return -1
                                    } else {
                                        if (1 == this.t) return this[0];
                                        if (0 == this.t) return 0
                                    }
                                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                                }, b.prototype.byteValue = function () {
                                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                                }, b.prototype.shortValue = function () {
                                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                                }, b.prototype.signum = function () {
                                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                                }, b.prototype.toByteArray = function () {
                                    var t = this.t,
                                        e = [];
                                    e[0] = this.s;
                                    var i, r = this.DB - t * this.DB % 8,
                                        n = 0;
                                    if (0 < t--)
                                        for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | this.s << this.DB - r); 0 <= t;) r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r, i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --t)), 0 != (128 & i) && (i |= -256), 0 == n && (128 & this.s) != (128 & i) && ++n, (0 < n || i != this.s) && (e[n++] = i);
                                    return e
                                }, b.prototype.equals = function (t) {
                                    return 0 == this.compareTo(t)
                                }, b.prototype.min = function (t) {
                                    return this.compareTo(t) < 0 ? this : t
                                }, b.prototype.max = function (t) {
                                    return 0 < this.compareTo(t) ? this : t
                                }, b.prototype.and = function (t) {
                                    var e = M();
                                    return this.bitwiseTo(t, i, e), e
                                }, b.prototype.or = function (t) {
                                    var e = M();
                                    return this.bitwiseTo(t, u, e), e
                                }, b.prototype.xor = function (t) {
                                    var e = M();
                                    return this.bitwiseTo(t, r, e), e
                                }, b.prototype.andNot = function (t) {
                                    var e = M();
                                    return this.bitwiseTo(t, n, e), e
                                }, b.prototype.not = function () {
                                    for (var t = M(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];
                                    return t.t = this.t, t.s = ~this.s, t
                                }, b.prototype.shiftLeft = function (t) {
                                    var e = M();
                                    return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e
                                }, b.prototype.shiftRight = function (t) {
                                    var e = M();
                                    return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e
                                }, b.prototype.getLowestSetBit = function () {
                                    for (var t = 0; t < this.t; ++t)
                                        if (0 != this[t]) return t * this.DB + s(this[t]);
                                    return this.s < 0 ? this.t * this.DB : -1
                                }, b.prototype.bitCount = function () {
                                    for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += o(this[i] ^ e);
                                    return t
                                }, b.prototype.testBit = function (t) {
                                    var e = Math.floor(t / this.DB);
                                    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
                                }, b.prototype.setBit = function (t) {
                                    return this.changeBit(t, u)
                                }, b.prototype.clearBit = function (t) {
                                    return this.changeBit(t, n)
                                }, b.prototype.flipBit = function (t) {
                                    return this.changeBit(t, r)
                                }, b.prototype.add = function (t) {
                                    var e = M();
                                    return this.addTo(t, e), e
                                }, b.prototype.subtract = function (t) {
                                    var e = M();
                                    return this.subTo(t, e), e
                                }, b.prototype.multiply = function (t) {
                                    var e = M();
                                    return this.multiplyTo(t, e), e
                                }, b.prototype.divide = function (t) {
                                    var e = M();
                                    return this.divRemTo(t, e, null), e
                                }, b.prototype.remainder = function (t) {
                                    var e = M();
                                    return this.divRemTo(t, null, e), e
                                }, b.prototype.divideAndRemainder = function (t) {
                                    var e = M(),
                                        i = M();
                                    return this.divRemTo(t, e, i), [e, i]
                                }, b.prototype.modPow = function (t, e) {
                                    var i, r, n = t.bitLength(),
                                        s = F(1);
                                    if (n <= 0) return s;
                                    i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6, r = n < 8 ? new I(e) : e.isEven() ? new P(e) : new N(e);
                                    var o = [],
                                        h = 3,
                                        a = i - 1,
                                        u = (1 << i) - 1;
                                    if (o[1] = r.convert(this), 1 < i) {
                                        var c = M();
                                        for (r.sqrTo(o[1], c); h <= u;) o[h] = M(), r.mulTo(c, o[h - 2], o[h]), h += 2
                                    }
                                    var f, l, p = t.t - 1,
                                        g = !0,
                                        d = M();
                                    for (n = U(t[p]) - 1; 0 <= p;) {
                                        for (a <= n ? f = t[p] >> n - a & u : (f = (t[p] & (1 << n + 1) - 1) << a - n, 0 < p && (f |= t[p - 1] >> this.DB + n - a)), h = i; 0 == (1 & f);) f >>= 1, --h;
                                        if ((n -= h) < 0 && (n += this.DB, --p), g) o[f].copyTo(s), g = !1;
                                        else {
                                            for (; 1 < h;) r.sqrTo(s, d), r.sqrTo(d, s), h -= 2;
                                            0 < h ? r.sqrTo(s, d) : (l = s, s = d, d = l), r.mulTo(d, o[f], s)
                                        }
                                        for (; 0 <= p && 0 == (t[p] & 1 << n);) r.sqrTo(s, d), l = s, s = d, d = l, --n < 0 && (n = this.DB - 1, --p)
                                    }
                                    return r.revert(s)
                                }, b.prototype.modInverse = function (t) {
                                    var e = t.isEven();
                                    if (this.isEven() && e || 0 == t.signum()) return b.ZERO;
                                    for (var i = t.clone(), r = this.clone(), n = F(1), s = F(0), o = F(0), h = F(1); 0 != i.signum();) {
                                        for (; i.isEven();) i.rShiftTo(1, i), e ? (n.isEven() && s.isEven() || (n.addTo(this, n), s.subTo(t, s)), n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);
                                        for (; r.isEven();) r.rShiftTo(1, r), e ? (o.isEven() && h.isEven() || (o.addTo(this, o), h.subTo(t, h)), o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h), h.rShiftTo(1, h);
                                        0 <= i.compareTo(r) ? (i.subTo(r, i), e && n.subTo(o, n), s.subTo(h, s)) : (r.subTo(i, r), e && o.subTo(n, o), h.subTo(s, h))
                                    }
                                    return 0 != r.compareTo(b.ONE) ? b.ZERO : 0 <= h.compareTo(t) ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h), h.signum() < 0 ? h.add(t) : h) : h
                                }, b.prototype.pow = function (t) {
                                    return this.exp(t, new V)
                                }, b.prototype.gcd = function (t) {
                                    var e = this.s < 0 ? this.negate() : this.clone(),
                                        i = t.s < 0 ? t.negate() : t.clone();
                                    if (e.compareTo(i) < 0) {
                                        var r = e;
                                        e = i, i = r
                                    }
                                    var n = e.getLowestSetBit(),
                                        s = i.getLowestSetBit();
                                    if (s < 0) return e;
                                    for (n < s && (s = n), 0 < s && (e.rShiftTo(s, e), i.rShiftTo(s, i)); 0 < e.signum();) 0 < (n = e.getLowestSetBit()) && e.rShiftTo(n, e), 0 < (n = i.getLowestSetBit()) && i.rShiftTo(n, i), 0 <= e.compareTo(i) ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));
                                    return 0 < s && i.lShiftTo(s, i), i
                                }, b.prototype.isProbablePrime = function (t) {
                                    var e, i = this.abs();
                                    if (1 == i.t && i[0] <= B[B.length - 1]) {
                                        for (e = 0; e < B.length; ++e)
                                            if (i[0] == B[e]) return !0;
                                        return !1
                                    }
                                    if (i.isEven()) return !1;
                                    for (e = 1; e < B.length;) {
                                        for (var r = B[e], n = e + 1; n < B.length && r < A;) r *= B[n++];
                                        for (r = i.modInt(r); e < n;)
                                            if (r % B[e++] == 0) return !1
                                    }
                                    return i.millerRabin(t)
                                }, b.prototype.copyTo = function (t) {
                                    for (var e = this.t - 1; 0 <= e; --e) t[e] = this[e];
                                    t.t = this.t, t.s = this.s
                                }, b.prototype.fromInt = function (t) {
                                    this.t = 1, this.s = t < 0 ? -1 : 0, 0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
                                }, b.prototype.fromString = function (t, e) {
                                    var i;
                                    if (16 == e) i = 4;
                                    else if (8 == e) i = 3;
                                    else if (256 == e) i = 8;
                                    else if (2 == e) i = 1;
                                    else if (32 == e) i = 5;
                                    else {
                                        if (4 != e) return void this.fromRadix(t, e);
                                        i = 2
                                    }
                                    this.t = 0, this.s = 0;
                                    for (var r = t.length, n = !1, s = 0; 0 <= --r;) {
                                        var o = 8 == i ? 255 & +t[r] : C(t, r);
                                        o < 0 ? "-" == t.charAt(r) && (n = !0) : (n = !1, 0 == s ? this[this.t++] = o : s + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s, this[this.t++] = o >> this.DB - s) : this[this.t - 1] |= o << s, (s += i) >= this.DB && (s -= this.DB))
                                    }
                                    8 == i && 0 != (128 & +t[0]) && (this.s = -1, 0 < s && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), n && b.ZERO.subTo(this, this)
                                }, b.prototype.clamp = function () {
                                    for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t;)--this.t
                                }, b.prototype.dlShiftTo = function (t, e) {
                                    var i;
                                    for (i = this.t - 1; 0 <= i; --i) e[i + t] = this[i];
                                    for (i = t - 1; 0 <= i; --i) e[i] = 0;
                                    e.t = this.t + t, e.s = this.s
                                }, b.prototype.drShiftTo = function (t, e) {
                                    for (var i = t; i < this.t; ++i) e[i - t] = this[i];
                                    e.t = Math.max(this.t - t, 0), e.s = this.s
                                }, b.prototype.lShiftTo = function (t, e) {
                                    for (var i = t % this.DB, r = this.DB - i, n = (1 << r) - 1, s = Math.floor(t / this.DB), o = this.s << i & this.DM, h = this.t - 1; 0 <= h; --h) e[h + s + 1] = this[h] >> r | o, o = (this[h] & n) << i;
                                    for (h = s - 1; 0 <= h; --h) e[h] = 0;
                                    e[s] = o, e.t = this.t + s + 1, e.s = this.s, e.clamp()
                                }, b.prototype.rShiftTo = function (t, e) {
                                    e.s = this.s;
                                    var i = Math.floor(t / this.DB);
                                    if (i >= this.t) e.t = 0;
                                    else {
                                        var r = t % this.DB,
                                            n = this.DB - r,
                                            s = (1 << r) - 1;
                                        e[0] = this[i] >> r;
                                        for (var o = i + 1; o < this.t; ++o) e[o - i - 1] |= (this[o] & s) << n, e[o - i] = this[o] >> r;
                                        0 < r && (e[this.t - i - 1] |= (this.s & s) << n), e.t = this.t - i, e.clamp()
                                    }
                                }, b.prototype.subTo = function (t, e) {
                                    for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) r += this[i] - t[i], e[i++] = r & this.DM, r >>= this.DB;
                                    if (t.t < this.t) {
                                        for (r -= t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;
                                        r += this.s
                                    } else {
                                        for (r += this.s; i < t.t;) r -= t[i], e[i++] = r & this.DM, r >>= this.DB;
                                        r -= t.s
                                    }
                                    e.s = r < 0 ? -1 : 0, r < -1 ? e[i++] = this.DV + r : 0 < r && (e[i++] = r), e.t = i, e.clamp()
                                }, b.prototype.multiplyTo = function (t, e) {
                                    var i = this.abs(),
                                        r = t.abs(),
                                        n = i.t;
                                    for (e.t = n + r.t; 0 <= --n;) e[n] = 0;
                                    for (n = 0; n < r.t; ++n) e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
                                    e.s = 0, e.clamp(), this.s != t.s && b.ZERO.subTo(e, e)
                                }, b.prototype.squareTo = function (t) {
                                    for (var e = this.abs(), i = t.t = 2 * e.t; 0 <= --i;) t[i] = 0;
                                    for (i = 0; i < e.t - 1; ++i) {
                                        var r = e.am(i, e[i], t, 2 * i, 0, 1);
                                        (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1)
                                    }
                                    0 < t.t && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp()
                                }, b.prototype.divRemTo = function (t, e, i) {
                                    var r = t.abs();
                                    if (!(r.t <= 0)) {
                                        var n = this.abs();
                                        if (n.t < r.t) return null != e && e.fromInt(0), void (null != i && this.copyTo(i));
                                        null == i && (i = M());
                                        var s = M(),
                                            o = this.s,
                                            h = t.s,
                                            a = this.DB - U(r[r.t - 1]);
                                        0 < a ? (r.lShiftTo(a, s), n.lShiftTo(a, i)) : (r.copyTo(s), n.copyTo(i));
                                        var u = s.t,
                                            c = s[u - 1];
                                        if (0 != c) {
                                            var f = c * (1 << this.F1) + (1 < u ? s[u - 2] >> this.F2 : 0),
                                                l = this.FV / f,
                                                p = (1 << this.F1) / f,
                                                g = 1 << this.F2,
                                                d = i.t,
                                                v = d - u,
                                                m = null == e ? M() : e;
                                            for (s.dlShiftTo(v, m), 0 <= i.compareTo(m) && (i[i.t++] = 1, i.subTo(m, i)), b.ONE.dlShiftTo(u, m), m.subTo(s, s); s.t < u;) s[s.t++] = 0;
                                            for (; 0 <= --v;) {
                                                var y = i[--d] == c ? this.DM : Math.floor(i[d] * l + (i[d - 1] + g) * p);
                                                if ((i[d] += s.am(0, y, i, v, 0, u)) < y)
                                                    for (s.dlShiftTo(v, m), i.subTo(m, i); i[d] < --y;) i.subTo(m, i)
                                            }
                                            null != e && (i.drShiftTo(u, e), o != h && b.ZERO.subTo(e, e)), i.t = u, i.clamp(), 0 < a && i.rShiftTo(a, i), o < 0 && b.ZERO.subTo(i, i)
                                        }
                                    }
                                }, b.prototype.invDigit = function () {
                                    if (this.t < 1) return 0;
                                    var t = this[0];
                                    if (0 == (1 & t)) return 0;
                                    var e = 3 & t;
                                    return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e
                                }, b.prototype.isEven = function () {
                                    return 0 == (0 < this.t ? 1 & this[0] : this.s)
                                }, b.prototype.exp = function (t, e) {
                                    if (4294967295 < t || t < 1) return b.ONE;
                                    var i = M(),
                                        r = M(),
                                        n = e.convert(this),
                                        s = U(t) - 1;
                                    for (n.copyTo(i); 0 <= --s;)
                                        if (e.sqrTo(i, r), 0 < (t & 1 << s)) e.mulTo(r, n, i);
                                        else {
                                            var o = i;
                                            i = r, r = o
                                        }
                                    return e.revert(i)
                                }, b.prototype.chunkSize = function (t) {
                                    return Math.floor(Math.LN2 * this.DB / Math.log(t))
                                }, b.prototype.toRadix = function (t) {
                                    if (null == t && (t = 10), 0 == this.signum() || t < 2 || 36 < t) return "0";
                                    var e = this.chunkSize(t),
                                        i = Math.pow(t, e),
                                        r = F(i),
                                        n = M(),
                                        s = M(),
                                        o = "";
                                    for (this.divRemTo(r, n, s); 0 < n.signum();) o = (i + s.intValue()).toString(t).substr(1) + o, n.divRemTo(r, n, s);
                                    return s.intValue().toString(t) + o
                                }, b.prototype.fromRadix = function (t, e) {
                                    this.fromInt(0), null == e && (e = 10);
                                    for (var i = this.chunkSize(e), r = Math.pow(e, i), n = !1, s = 0, o = 0, h = 0; h < t.length; ++h) {
                                        var a = C(t, h);
                                        a < 0 ? "-" == t.charAt(h) && 0 == this.signum() && (n = !0) : (o = e * o + a, ++s >= i && (this.dMultiply(r), this.dAddOffset(o, 0), o = s = 0))
                                    }
                                    0 < s && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(o, 0)), n && b.ZERO.subTo(this, this)
                                }, b.prototype.fromNumber = function (t, e, i) {
                                    if ("number" == typeof e)
                                        if (t < 2) this.fromInt(1);
                                        else
                                            for (this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(b.ONE.shiftLeft(t - 1), this);
                                    else {
                                        var r = [],
                                            n = 7 & t;
                                        r.length = 1 + (t >> 3), e.nextBytes(r), 0 < n ? r[0] &= (1 << n) - 1 : r[0] = 0, this.fromString(r, 256)
                                    }
                                }, b.prototype.bitwiseTo = function (t, e, i) {
                                    var r, n, s = Math.min(t.t, this.t);
                                    for (r = 0; r < s; ++r) i[r] = e(this[r], t[r]);
                                    if (t.t < this.t) {
                                        for (n = t.s & this.DM, r = s; r < this.t; ++r) i[r] = e(this[r], n);
                                        i.t = this.t
                                    } else {
                                        for (n = this.s & this.DM, r = s; r < t.t; ++r) i[r] = e(n, t[r]);
                                        i.t = t.t
                                    }
                                    i.s = e(this.s, t.s), i.clamp()
                                }, b.prototype.changeBit = function (t, e) {
                                    var i = b.ONE.shiftLeft(t);
                                    return this.bitwiseTo(i, e, i), i
                                }, b.prototype.addTo = function (t, e) {
                                    for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) r += this[i] + t[i], e[i++] = r & this.DM, r >>= this.DB;
                                    if (t.t < this.t) {
                                        for (r += t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;
                                        r += this.s
                                    } else {
                                        for (r += this.s; i < t.t;) r += t[i], e[i++] = r & this.DM, r >>= this.DB;
                                        r += t.s
                                    }
                                    e.s = r < 0 ? -1 : 0, 0 < r ? e[i++] = r : r < -1 && (e[i++] = this.DV + r), e.t = i, e.clamp()
                                }, b.prototype.dMultiply = function (t) {
                                    this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp()
                                }, b.prototype.dAddOffset = function (t, e) {
                                    if (0 != t) {
                                        for (; this.t <= e;) this[this.t++] = 0;
                                        for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e]
                                    }
                                }, b.prototype.multiplyLowerTo = function (t, e, i) {
                                    var r = Math.min(this.t + t.t, e);
                                    for (i.s = 0, i.t = r; 0 < r;) i[--r] = 0;
                                    for (var n = i.t - this.t; r < n; ++r) i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
                                    for (n = Math.min(t.t, e); r < n; ++r) this.am(0, t[r], i, r, 0, e - r);
                                    i.clamp()
                                }, b.prototype.multiplyUpperTo = function (t, e, i) {
                                    --e;
                                    var r = i.t = this.t + t.t - e;
                                    for (i.s = 0; 0 <= --r;) i[r] = 0;
                                    for (r = Math.max(e - this.t, 0); r < t.t; ++r) i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
                                    i.clamp(), i.drShiftTo(1, i)
                                }, b.prototype.modInt = function (t) {
                                    if (t <= 0) return 0;
                                    var e = this.DV % t,
                                        i = this.s < 0 ? t - 1 : 0;
                                    if (0 < this.t)
                                        if (0 == e) i = this[0] % t;
                                        else
                                            for (var r = this.t - 1; 0 <= r; --r) i = (e * i + this[r]) % t;
                                    return i
                                }, b.prototype.millerRabin = function (t) {
                                    var e = this.subtract(b.ONE),
                                        i = e.getLowestSetBit();
                                    if (i <= 0) return !1;
                                    var r = e.shiftRight(i);
                                    B.length < (t = t + 1 >> 1) && (t = B.length);
                                    for (var n = M(), s = 0; s < t; ++s) {
                                        n.fromInt(B[Math.floor(Math.random() * B.length)]);
                                        var o = n.modPow(r, this);
                                        if (0 != o.compareTo(b.ONE) && 0 != o.compareTo(e)) {
                                            for (var h = 1; h++ < i && 0 != o.compareTo(e);)
                                                if (0 == (o = o.modPowInt(2, this)).compareTo(b.ONE)) return !1;
                                            if (0 != o.compareTo(e)) return !1
                                        }
                                    }
                                    return !0
                                }, b.prototype.square = function () {
                                    var t = M();
                                    return this.squareTo(t), t
                                }, b.prototype.gcda = function (t, e) {
                                    var i = this.s < 0 ? this.negate() : this.clone(),
                                        r = t.s < 0 ? t.negate() : t.clone();
                                    if (i.compareTo(r) < 0) {
                                        var n = i;
                                        i = r, r = n
                                    }
                                    var s = i.getLowestSetBit(),
                                        o = r.getLowestSetBit();
                                    if (o < 0) e(i);
                                    else {
                                        s < o && (o = s), 0 < o && (i.rShiftTo(o, i), r.rShiftTo(o, r));
                                        var h = function () {
                                            0 < (s = i.getLowestSetBit()) && i.rShiftTo(s, i), 0 < (s = r.getLowestSetBit()) && r.rShiftTo(s, r), 0 <= i.compareTo(r) ? (i.subTo(r, i), i.rShiftTo(1, i)) : (r.subTo(i, r), r.rShiftTo(1, r)), 0 < i.signum() ? setTimeout(h, 0) : (0 < o && r.lShiftTo(o, r), setTimeout(function () {
                                                e(r)
                                            }, 0))
                                        };
                                        setTimeout(h, 10)
                                    }
                                }, b.prototype.fromNumberAsync = function (t, e, i, r) {
                                    if ("number" == typeof e)
                                        if (t < 2) this.fromInt(1);
                                        else {
                                            this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this), this.isEven() && this.dAddOffset(1, 0);
                                            var n = this,
                                                s = function () {
                                                    n.dAddOffset(2, 0), n.bitLength() > t && n.subTo(b.ONE.shiftLeft(t - 1), n), n.isProbablePrime(e) ? setTimeout(function () {
                                                        r()
                                                    }, 0) : setTimeout(s, 0)
                                                };
                                            setTimeout(s, 0)
                                        }
                                    else {
                                        var o = [],
                                            h = 7 & t;
                                        o.length = 1 + (t >> 3), e.nextBytes(o), 0 < h ? o[0] &= (1 << h) - 1 : o[0] = 0, this.fromString(o, 256)
                                    }
                                }, b
                            }(),
                            V = function () {
                                function t() { }
                                return t.prototype.convert = function (t) {
                                    return t
                                }, t.prototype.revert = function (t) {
                                    return t
                                }, t.prototype.mulTo = function (t, e, i) {
                                    t.multiplyTo(e, i)
                                }, t.prototype.sqrTo = function (t, e) {
                                    t.squareTo(e)
                                }, t
                            }(),
                            I = function () {
                                function t(t) {
                                    this.m = t
                                }
                                return t.prototype.convert = function (t) {
                                    return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
                                }, t.prototype.revert = function (t) {
                                    return t
                                }, t.prototype.reduce = function (t) {
                                    t.divRemTo(this.m, null, t)
                                }, t.prototype.mulTo = function (t, e, i) {
                                    t.multiplyTo(e, i), this.reduce(i)
                                }, t.prototype.sqrTo = function (t, e) {
                                    t.squareTo(e), this.reduce(e)
                                }, t
                            }(),
                            N = function () {
                                function t(t) {
                                    this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
                                }
                                return t.prototype.convert = function (t) {
                                    var e = M();
                                    return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && 0 < e.compareTo(O.ZERO) && this.m.subTo(e, e), e
                                }, t.prototype.revert = function (t) {
                                    var e = M();
                                    return t.copyTo(e), this.reduce(e), e
                                }, t.prototype.reduce = function (t) {
                                    for (; t.t <= this.mt2;) t[t.t++] = 0;
                                    for (var e = 0; e < this.m.t; ++e) {
                                        var i = 32767 & t[e],
                                            r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                                        for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV, t[++i]++
                                    }
                                    t.clamp(), t.drShiftTo(this.m.t, t), 0 <= t.compareTo(this.m) && t.subTo(this.m, t)
                                }, t.prototype.mulTo = function (t, e, i) {
                                    t.multiplyTo(e, i), this.reduce(i)
                                }, t.prototype.sqrTo = function (t, e) {
                                    t.squareTo(e), this.reduce(e)
                                }, t
                            }(),
                            P = function () {
                                function t(t) {
                                    this.m = t, this.r2 = M(), this.q3 = M(), O.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t)
                                }
                                return t.prototype.convert = function (t) {
                                    if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
                                    if (t.compareTo(this.m) < 0) return t;
                                    var e = M();
                                    return t.copyTo(e), this.reduce(e), e
                                }, t.prototype.revert = function (t) {
                                    return t
                                }, t.prototype.reduce = function (t) {
                                    for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);
                                    for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m);) t.subTo(this.m, t)
                                }, t.prototype.mulTo = function (t, e, i) {
                                    t.multiplyTo(e, i), this.reduce(i)
                                }, t.prototype.sqrTo = function (t, e) {
                                    t.squareTo(e), this.reduce(e)
                                }, t
                            }();

                        function M() {
                            return new O(null)
                        }

                        function q(t, e) {
                            return new O(t, e)
                        }
                        "Microsoft Internet Explorer" == navigator.appName ? (O.prototype.am = function (t, e, i, r, n, s) {
                            for (var o = 32767 & e, h = e >> 15; 0 <= --s;) {
                                var a = 32767 & this[t],
                                    u = this[t++] >> 15,
                                    c = h * a + u * o;
                                n = ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) + (c >>> 15) + h * u + (n >>> 30), i[r++] = 1073741823 & a
                            }
                            return n
                        }, w = 30) : "Netscape" != navigator.appName ? (O.prototype.am = function (t, e, i, r, n, s) {
                            for (; 0 <= --s;) {
                                var o = e * this[t++] + i[r] + n;
                                n = Math.floor(o / 67108864), i[r++] = 67108863 & o
                            }
                            return n
                        }, w = 26) : (O.prototype.am = function (t, e, i, r, n, s) {
                            for (var o = 16383 & e, h = e >> 14; 0 <= --s;) {
                                var a = 16383 & this[t],
                                    u = this[t++] >> 14,
                                    c = h * a + u * o;
                                n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u, i[r++] = 268435455 & a
                            }
                            return n
                        }, w = 28), O.prototype.DB = w, O.prototype.DM = (1 << w) - 1, O.prototype.DV = 1 << w;
                        O.prototype.FV = Math.pow(2, 52), O.prototype.F1 = 52 - w, O.prototype.F2 = 2 * w - 52;
                        var j, L, H = [];
                        for (j = "0".charCodeAt(0), L = 0; L <= 9; ++L) H[j++] = L;
                        for (j = "a".charCodeAt(0), L = 10; L < 36; ++L) H[j++] = L;
                        for (j = "A".charCodeAt(0), L = 10; L < 36; ++L) H[j++] = L;

                        function C(t, e) {
                            var i = H[t.charCodeAt(e)];
                            return null == i ? -1 : i
                        }

                        function F(t) {
                            var e = M();
                            return e.fromInt(t), e
                        }

                        function U(t) {
                            var e, i = 1;
                            return 0 != (e = t >>> 16) && (t = e, i += 16), 0 != (e = t >> 8) && (t = e, i += 8), 0 != (e = t >> 4) && (t = e, i += 4), 0 != (e = t >> 2) && (t = e, i += 2), 0 != (e = t >> 1) && (t = e, i += 1), i
                        }
                        O.ZERO = F(0), O.ONE = F(1);
                        var K = function () {
                            function t() {
                                this.i = 0, this.j = 0, this.S = []
                            }
                            return t.prototype.init = function (t) {
                                var e, i, r;
                                for (e = 0; e < 256; ++e) this.S[e] = e;
                                for (e = i = 0; e < 256; ++e) i = i + this.S[e] + t[e % t.length] & 255, r = this.S[e], this.S[e] = this.S[i], this.S[i] = r;
                                this.i = 0, this.j = 0
                            }, t.prototype.next = function () {
                                var t;
                                return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255]
                            }, t
                        }();
                        var k, _, z = 256,
                            Z = null;
                        if (null == Z) {
                            Z = [];
                            var G = void (_ = 0);
                            if (window.crypto && window.crypto.getRandomValues) {
                                var $ = new Uint32Array(256);
                                for (window.crypto.getRandomValues($), G = 0; G < $.length; ++G) Z[_++] = 255 & $[G]
                            }
                            var Y = function (t) {
                                if (this.count = this.count || 0, 256 <= this.count || z <= _) window.removeEventListener ? window.removeEventListener("mousemove", Y, !1) : window.detachEvent && window.detachEvent("onmousemove", Y);
                                else try {
                                    var e = t.x + t.y;
                                    Z[_++] = 255 & e, this.count += 1
                                } catch (t) { }
                            };
                            window.addEventListener ? window.addEventListener("mousemove", Y, !1) : window.attachEvent && window.attachEvent("onmousemove", Y)
                        }

                        function J() {
                            if (null == k) {
                                for (k = new K; _ < z;) {
                                    var t = Math.floor(65536 * Math.random());
                                    Z[_++] = 255 & t
                                }
                                for (k.init(Z), _ = 0; _ < Z.length; ++_) Z[_] = 0;
                                _ = 0
                            }
                            return k.next()
                        }
                        var X = function () {
                            function t() { }
                            return t.prototype.nextBytes = function (t) {
                                for (var e = 0; e < t.length; ++e) t[e] = J()
                            }, t
                        }();
                        var Q = function () {
                            function t() {
                                this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
                            }
                            return t.prototype.doPublic = function (t) {
                                return t.modPowInt(this.e, this.n)
                            }, t.prototype.doPrivate = function (t) {
                                if (null == this.p || null == this.q) return t.modPow(this.d, this.n);
                                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0;) e = e.add(this.p);
                                return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
                            }, t.prototype.setPublic = function (t, e) {
                                null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16), this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
                            }, t.prototype.enct = function (t) {
                                var e = function (t, e) {
                                    if (e < t.length + 11) return console.error("Message too long for RSA"), null;
                                    for (var i = [], r = t.length - 1; 0 <= r && 0 < e;) {
                                        var n = t.charCodeAt(r--);
                                        n < 128 ? i[--e] = n : 127 < n && n < 2048 ? (i[--e] = 63 & n | 128, i[--e] = n >> 6 | 192) : (i[--e] = 63 & n | 128, i[--e] = n >> 6 & 63 | 128, i[--e] = n >> 12 | 224)
                                    }
                                    i[--e] = 0;
                                    for (var s = new X, o = []; 2 < e;) {
                                        for (o[0] = 0; 0 == o[0];) s.nextBytes(o);
                                        i[--e] = o[0]
                                    }
                                    return i[--e] = 2, i[--e] = 0, new O(i)
                                }(t, this.n.bitLength() + 7 >> 3);
                                if (null == e) return null;
                                var i = this.doPublic(e);
                                if (null == i) return null;
                                var r = i.toString(16);
                                return 0 == (1 & r.length) ? r : "0" + r
                            }, t.prototype.setPrivate = function (t, e, i) {
                                null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16), this.e = parseInt(e, 16), this.d = q(i, 16)) : console.error("Invalid RSA private key")
                            }, t.prototype.setPrivateEx = function (t, e, i, r, n, s, o, h) {
                                null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16), this.e = parseInt(e, 16), this.d = q(i, 16), this.p = q(r, 16), this.q = q(n, 16), this.dmp1 = q(s, 16), this.dmq1 = q(o, 16), this.coeff = q(h, 16)) : console.error("Invalid RSA private key")
                            }, t.prototype.generate = function (t, e) {
                                var i = new X,
                                    r = t >> 1;
                                this.e = parseInt(e, 16);
                                for (var n = new O(e, 16); ;) {
                                    for (; this.p = new O(t - r, 1, i), 0 != this.p.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.p.isProbablePrime(10););
                                    for (; this.q = new O(r, 1, i), 0 != this.q.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.q.isProbablePrime(10););
                                    if (this.p.compareTo(this.q) <= 0) {
                                        var s = this.p;
                                        this.p = this.q, this.q = s
                                    }
                                    var o = this.p.subtract(O.ONE),
                                        h = this.q.subtract(O.ONE),
                                        a = o.multiply(h);
                                    if (0 == a.gcd(n).compareTo(O.ONE)) {
                                        this.n = this.p.multiply(this.q), this.d = n.modInverse(a), this.dmp1 = this.d.mod(o), this.dmq1 = this.d.mod(h), this.coeff = this.q.modInverse(this.p);
                                        break
                                    }
                                }
                            }, t.prototype.dect = function (t) {
                                var e = q(t, 16),
                                    i = this.doPrivate(e);
                                return null == i ? null : function (t, e) {
                                    var i = t.toByteArray(),
                                        r = 0;
                                    for (; r < i.length && 0 == i[r];)++r;
                                    if (i.length - r != e - 1 || 2 != i[r]) return null;
                                    ++r;
                                    for (; 0 != i[r];)
                                        if (++r >= i.length) return null;
                                    var n = "";
                                    for (; ++r < i.length;) {
                                        var s = 255 & i[r];
                                        s < 128 ? n += String.fromCharCode(s) : 191 < s && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & i[r + 1]), ++r) : (n += String.fromCharCode((15 & s) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]), r += 2)
                                    }
                                    return n
                                }(i, this.n.bitLength() + 7 >> 3)
                            }, t.prototype.generateAsync = function (t, e, n) {
                                var s = new X,
                                    o = t >> 1;
                                this.e = parseInt(e, 16);
                                var h = new O(e, 16),
                                    a = this,
                                    u = function () {
                                        var e = function () {
                                            if (a.p.compareTo(a.q) <= 0) {
                                                var t = a.p;
                                                a.p = a.q, a.q = t
                                            }
                                            var e = a.p.subtract(O.ONE),
                                                i = a.q.subtract(O.ONE),
                                                r = e.multiply(i);
                                            0 == r.gcd(h).compareTo(O.ONE) ? (a.n = a.p.multiply(a.q), a.d = h.modInverse(r), a.dmp1 = a.d.mod(e), a.dmq1 = a.d.mod(i), a.coeff = a.q.modInverse(a.p), setTimeout(function () {
                                                n()
                                            }, 0)) : setTimeout(u, 0)
                                        },
                                            i = function () {
                                                a.q = M(), a.q.fromNumberAsync(o, 1, s, function () {
                                                    a.q.subtract(O.ONE).gcda(h, function (t) {
                                                        0 == t.compareTo(O.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(i, 0)
                                                    })
                                                })
                                            },
                                            r = function () {
                                                a.p = M(), a.p.fromNumberAsync(t - o, 1, s, function () {
                                                    a.p.subtract(O.ONE).gcda(h, function (t) {
                                                        0 == t.compareTo(O.ONE) && a.p.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(r, 0)
                                                    })
                                                })
                                            };
                                        setTimeout(r, 0)
                                    };
                                setTimeout(u, 0)
                            }, t.prototype.sign = function (t, e, i) {
                                var r = function (t, e) {
                                    if (e < t.length + 22) return console.error("Message too long for RSA"), null;
                                    for (var i = e - t.length - 6, r = "", n = 0; n < i; n += 2) r += "ff";
                                    return q("0001" + r + "00" + t, 16)
                                }((W[i] || "") + e(t).toString(), this.n.bitLength() / 4);
                                if (null == r) return null;
                                var n = this.doPrivate(r);
                                if (null == n) return null;
                                var s = n.toString(16);
                                return 0 == (1 & s.length) ? s : "0" + s
                            }, t.prototype.verify = function (t, e, i) {
                                var r = q(e, 16),
                                    n = this.doPublic(r);
                                return null == n ? null : function (t) {
                                    for (var e in W)
                                        if (W.hasOwnProperty(e)) {
                                            var i = W[e],
                                                r = i.length;
                                            if (t.substr(0, r) == i) return t.substr(r)
                                        }
                                    return t
                                }(n.toString(16).replace(/^1f+00/, "")) == i(t).toString()
                            }, t
                        }();
                        var W = {
                            md2: "3020300c06082a864886f70d020205000410",
                            md5: "3020300c06082a864886f70d020505000410",
                            sha1: "3021300906052b0e03021a05000414",
                            sha224: "302d300d06096086480165030402040500041c",
                            sha256: "3031300d060960864801650304020105000420",
                            sha384: "3041300d060960864801650304020205000430",
                            sha512: "3051300d060960864801650304020305000440",
                            ripemd160: "3021300906052b2403020105000414"
                        };
                        var tt = {};
                        tt.lang = {
                            extend: function (t, e, i) {
                                if (!e || !t) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
                                var r = function () { };
                                if (r.prototype = e.prototype, t.prototype = new r, (t.prototype.constructor = t).superclass = e.prototype, e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e), i) {
                                    var n;
                                    for (n in i) t.prototype[n] = i[n];
                                    var s = function () { },
                                        o = ["toString", "valueOf"];
                                    try {
                                        /MSIE/.test(navigator.userAgent) && (s = function (t, e) {
                                            for (n = 0; n < o.length; n += 1) {
                                                var i = o[n],
                                                    r = e[i];
                                                "function" == typeof r && r != Object.prototype[i] && (t[i] = r)
                                            }
                                        })
                                    } catch (t) { }
                                    s(t.prototype, i)
                                }
                            }
                        };
                        var et = {};
                        void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}), et.asn1.ASN1Util = new function () {
                            this.integerToByteHex = function (t) {
                                var e = t.toString(16);
                                return e.length % 2 == 1 && (e = "0" + e), e
                            }, this.bigIntToMinTwosComplementsHex = function (t) {
                                var e = t.toString(16);
                                if ("-" != e.substr(0, 1)) e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                                else {
                                    var i = e.substr(1).length;
                                    i % 2 == 1 ? i += 1 : e.match(/^[0-7]/) || (i += 2);
                                    for (var r = "", n = 0; n < i; n++) r += "f";
                                    e = new O(r, 16).xor(t).add(O.ONE).toString(16).replace(/^-/, "")
                                }
                                return e
                            }, this.getPEMStringFromHex = function (t, e) {
                                return hextopem(t, e)
                            }, this.newObject = function (t) {
                                var e = et.asn1,
                                    i = e.DERBoolean,
                                    r = e.DERInteger,
                                    n = e.DERBitString,
                                    s = e.DEROctetString,
                                    o = e.DERNull,
                                    h = e.DERObjectIdentifier,
                                    a = e.DEREnumerated,
                                    u = e.DERUTF8String,
                                    c = e.DERNumericString,
                                    f = e.DERPrintableString,
                                    l = e.DERTeletexString,
                                    p = e.DERIA5String,
                                    g = e.DERUTCTime,
                                    d = e.DERGeneralizedTime,
                                    v = e.DERSequence,
                                    m = e.DERSet,
                                    y = e.DERTaggedObject,
                                    b = e.ASN1Util.newObject,
                                    T = Object.keys(t);
                                if (1 != T.length) throw "key of param shall be only one.";
                                var S = T[0];
                                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + S + ":")) throw "undefined key: " + S;
                                if ("bool" == S) return new i(t[S]);
                                if ("int" == S) return new r(t[S]);
                                if ("bitstr" == S) return new n(t[S]);
                                if ("octstr" == S) return new s(t[S]);
                                if ("null" == S) return new o(t[S]);
                                if ("oid" == S) return new h(t[S]);
                                if ("enum" == S) return new a(t[S]);
                                if ("utf8str" == S) return new u(t[S]);
                                if ("numstr" == S) return new c(t[S]);
                                if ("prnstr" == S) return new f(t[S]);
                                if ("telstr" == S) return new l(t[S]);
                                if ("ia5str" == S) return new p(t[S]);
                                if ("utctime" == S) return new g(t[S]);
                                if ("gentime" == S) return new d(t[S]);
                                if ("seq" == S) {
                                    for (var E = t[S], w = [], D = 0; D < E.length; D++) {
                                        var x = b(E[D]);
                                        w.push(x)
                                    }
                                    return new v({
                                        array: w
                                    })
                                }
                                if ("set" == S) {
                                    for (E = t[S], w = [], D = 0; D < E.length; D++) {
                                        x = b(E[D]);
                                        w.push(x)
                                    }
                                    return new m({
                                        array: w
                                    })
                                }
                                if ("tag" == S) {
                                    var R = t[S];
                                    if ("[object Array]" === Object.prototype.toString.call(R) && 3 == R.length) {
                                        var B = b(R[2]);
                                        return new y({
                                            tag: R[0],
                                            explicit: R[1],
                                            obj: B
                                        })
                                    }
                                    var A = {};
                                    if (void 0 !== R.explicit && (A.explicit = R.explicit), void 0 !== R.tag && (A.tag = R.tag), void 0 === R.obj) throw "obj shall be specified for 'tag'.";
                                    return A.obj = b(R.obj), new y(A)
                                }
                            }, this.jsonToASN1HEX = function (t) {
                                return this.newObject(t).getEncodedHex()
                            }
                        }, et.asn1.ASN1Util.oidHexToInt = function (t) {
                            for (var e = "", i = parseInt(t.substr(0, 2), 16), r = (e = Math.floor(i / 40) + "." + i % 40, ""), n = 2; n < t.length; n += 2) {
                                var s = ("00000000" + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
                                if (r += s.substr(1, 7), "0" == s.substr(0, 1)) e = e + "." + new O(r, 2).toString(10), r = ""
                            }
                            return e
                        }, et.asn1.ASN1Util.oidIntToHex = function (t) {
                            var h = function (t) {
                                var e = t.toString(16);
                                return 1 == e.length && (e = "0" + e), e
                            },
                                e = function (t) {
                                    var e = "",
                                        i = new O(t, 10).toString(2),
                                        r = 7 - i.length % 7;
                                    7 == r && (r = 0);
                                    for (var n = "", s = 0; s < r; s++) n += "0";
                                    i = n + i;
                                    for (s = 0; s < i.length - 1; s += 7) {
                                        var o = i.substr(s, 7);
                                        s != i.length - 7 && (o = "1" + o), e += h(parseInt(o, 2))
                                    }
                                    return e
                                };
                            if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
                            var i = "",
                                r = t.split("."),
                                n = 40 * parseInt(r[0]) + parseInt(r[1]);
                            i += h(n), r.splice(0, 2);
                            for (var s = 0; s < r.length; s++) i += e(r[s]);
                            return i
                        }, et.asn1.ASN1Object = function () {
                            this.getLengthHexFromValue = function () {
                                if (void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
                                if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                                var t = this.hV.length / 2,
                                    e = t.toString(16);
                                if (e.length % 2 == 1 && (e = "0" + e), t < 128) return e;
                                var i = e.length / 2;
                                if (15 < i) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                                return (128 + i).toString(16) + e
                            }, this.getEncodedHex = function () {
                                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV
                            }, this.getValueHex = function () {
                                return this.getEncodedHex(), this.hV
                            }, this.getFreshValueHex = function () {
                                return ""
                            }
                        }, et.asn1.DERAbstractString = function (t) {
                            et.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function () {
                                return this.s
                            }, this.setString = function (t) {
                                this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s)
                            }, this.setStringHex = function (t) {
                                this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }, void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
                        }, tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object), et.asn1.DERAbstractTime = function (t) {
                            et.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function (t) {
                                return utc = t.getTime() + 6e4 * t.getTimezoneOffset(), new Date(utc)
                            }, this.formatDate = function (t, e, i) {
                                var r = this.zeroPadding,
                                    n = this.localDateToUTC(t),
                                    s = String(n.getFullYear());
                                "utc" == e && (s = s.substr(2, 2));
                                var o = s + r(String(n.getMonth() + 1), 2) + r(String(n.getDate()), 2) + r(String(n.getHours()), 2) + r(String(n.getMinutes()), 2) + r(String(n.getSeconds()), 2);
                                if (!0 === i) {
                                    var h = n.getMilliseconds();
                                    if (0 != h) {
                                        var a = r(String(h), 3);
                                        o = o + "." + (a = a.replace(/[0]+$/, ""))
                                    }
                                }
                                return o + "Z"
                            }, this.zeroPadding = function (t, e) {
                                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
                            }, this.getString = function () {
                                return this.s
                            }, this.setString = function (t) {
                                this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(t)
                            }, this.setByDateValue = function (t, e, i, r, n, s) {
                                var o = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
                                this.setByDate(o)
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }
                        }, tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object), et.asn1.DERAbstractStructured = function (t) {
                            et.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function (t) {
                                this.hTLV = null, this.isModified = !0, this.asn1Array = t
                            }, this.appendASN1Object = function (t) {
                                this.hTLV = null, this.isModified = !0, this.asn1Array.push(t)
                            }, this.asn1Array = new Array, void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
                        }, tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object), et.asn1.DERBoolean = function () {
                            et.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff"
                        }, tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object), et.asn1.DERInteger = function (t) {
                            et.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function (t) {
                                this.hTLV = null, this.isModified = !0, this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                            }, this.setByInteger = function (t) {
                                var e = new O(String(t), 10);
                                this.setByBigInteger(e)
                            }, this.setValueHex = function (t) {
                                this.hV = t
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }, void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
                        }, tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object), et.asn1.DERBitString = function (t) {
                            if (void 0 !== t && void 0 !== t.obj) {
                                var e = et.asn1.ASN1Util.newObject(t.obj);
                                t.hex = "00" + e.getEncodedHex()
                            }
                            et.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function (t) {
                                this.hTLV = null, this.isModified = !0, this.hV = t
                            }, this.setUnusedBitsAndHexValue = function (t, e) {
                                if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
                                var i = "0" + t;
                                this.hTLV = null, this.isModified = !0, this.hV = i + e
                            }, this.setByBinaryString = function (t) {
                                var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                                8 == e && (e = 0);
                                for (var i = 0; i <= e; i++) t += "0";
                                var r = "";
                                for (i = 0; i < t.length - 1; i += 8) {
                                    var n = t.substr(i, 8),
                                        s = parseInt(n, 2).toString(16);
                                    1 == s.length && (s = "0" + s), r += s
                                }
                                this.hTLV = null, this.isModified = !0, this.hV = "0" + e + r
                            }, this.setByBooleanArray = function (t) {
                                for (var e = "", i = 0; i < t.length; i++) 1 == t[i] ? e += "1" : e += "0";
                                this.setByBinaryString(e)
                            }, this.newFalseArray = function (t) {
                                for (var e = new Array(t), i = 0; i < t; i++) e[i] = !1;
                                return e
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }, void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
                        }, tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object), et.asn1.DEROctetString = function (t) {
                            if (void 0 !== t && void 0 !== t.obj) {
                                var e = et.asn1.ASN1Util.newObject(t.obj);
                                t.hex = e.getEncodedHex()
                            }
                            et.asn1.DEROctetString.superclass.constructor.call(this, t), this.hT = "04"
                        }, tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString), et.asn1.DERNull = function () {
                            et.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500"
                        }, tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object), et.asn1.DERObjectIdentifier = function (t) {
                            var h = function (t) {
                                var e = t.toString(16);
                                return 1 == e.length && (e = "0" + e), e
                            },
                                s = function (t) {
                                    var e = "",
                                        i = new O(t, 10).toString(2),
                                        r = 7 - i.length % 7;
                                    7 == r && (r = 0);
                                    for (var n = "", s = 0; s < r; s++) n += "0";
                                    i = n + i;
                                    for (s = 0; s < i.length - 1; s += 7) {
                                        var o = i.substr(s, 7);
                                        s != i.length - 7 && (o = "1" + o), e += h(parseInt(o, 2))
                                    }
                                    return e
                                };
                            et.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function (t) {
                                this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t
                            }, this.setValueOidString = function (t) {
                                if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
                                var e = "",
                                    i = t.split("."),
                                    r = 40 * parseInt(i[0]) + parseInt(i[1]);
                                e += h(r), i.splice(0, 2);
                                for (var n = 0; n < i.length; n++) e += s(i[n]);
                                this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e
                            }, this.setValueName = function (t) {
                                var e = et.asn1.x509.OID.name2oid(t);
                                if ("" === e) throw "DERObjectIdentifier oidName undefined: " + t;
                                this.setValueOidString(e)
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }, void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
                        }, tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object), et.asn1.DEREnumerated = function (t) {
                            et.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function (t) {
                                this.hTLV = null, this.isModified = !0, this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                            }, this.setByInteger = function (t) {
                                var e = new O(String(t), 10);
                                this.setByBigInteger(e)
                            }, this.setValueHex = function (t) {
                                this.hV = t
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }, void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
                        }, tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object), et.asn1.DERUTF8String = function (t) {
                            et.asn1.DERUTF8String.superclass.constructor.call(this, t), this.hT = "0c"
                        }, tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString), et.asn1.DERNumericString = function (t) {
                            et.asn1.DERNumericString.superclass.constructor.call(this, t), this.hT = "12"
                        }, tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString), et.asn1.DERPrintableString = function (t) {
                            et.asn1.DERPrintableString.superclass.constructor.call(this, t), this.hT = "13"
                        }, tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString), et.asn1.DERTeletexString = function (t) {
                            et.asn1.DERTeletexString.superclass.constructor.call(this, t), this.hT = "14"
                        }, tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString), et.asn1.DERIA5String = function (t) {
                            et.asn1.DERIA5String.superclass.constructor.call(this, t), this.hT = "16"
                        }, tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString), et.asn1.DERUTCTime = function (t) {
                            et.asn1.DERUTCTime.superclass.constructor.call(this, t), this.hT = "17", this.setByDate = function (t) {
                                this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)
                            }, this.getFreshValueHex = function () {
                                return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV
                            }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
                        }, tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime), et.asn1.DERGeneralizedTime = function (t) {
                            et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t), this.hT = "18", this.withMillis = !1, this.setByDate = function (t) {
                                this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)
                            }, this.getFreshValueHex = function () {
                                return void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV
                            }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date), !0 === t.millis && (this.withMillis = !0))
                        }, tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime), et.asn1.DERSequence = function (t) {
                            et.asn1.DERSequence.superclass.constructor.call(this, t), this.hT = "30", this.getFreshValueHex = function () {
                                for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                                    t += this.asn1Array[e].getEncodedHex()
                                }
                                return this.hV = t, this.hV
                            }
                        }, tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured), et.asn1.DERSet = function (t) {
                            et.asn1.DERSet.superclass.constructor.call(this, t), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function () {
                                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                                    var i = this.asn1Array[e];
                                    t.push(i.getEncodedHex())
                                }
                                return 1 == this.sortFlag && t.sort(), this.hV = t.join(""), this.hV
                            }, void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
                        }, tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured), et.asn1.DERTaggedObject = function (t) {
                            et.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function (t, e, i) {
                                this.hT = e, this.isExplicit = t, this.asn1Object = i, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = i.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1)
                            }, this.getFreshValueHex = function () {
                                return this.hV
                            }, void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag), void 0 !== t.explicit && (this.isExplicit = t.explicit), void 0 !== t.obj && (this.asn1Object = t.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
                        }, tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
                        var it = function (i) {
                            function r(t) {
                                var e = i.call(this) || this;
                                return t && ("string" == typeof t ? e.parseKey(t) : (r.hasPrivateKeyProperty(t) || r.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)), e
                            }
                            return function (t, e) {
                                function i() {
                                    this.constructor = t
                                }
                                p(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
                            }(r, i), r.prototype.parseKey = function (t) {
                                try {
                                    var e = 0,
                                        i = 0,
                                        r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? d(t) : v.unarmor(t),
                                        n = x.decode(r);
                                    if (3 === n.sub.length && (n = n.sub[2].sub[0]), 9 === n.sub.length) {
                                        e = n.sub[1].getHexStringValue(), this.n = q(e, 16), i = n.sub[2].getHexStringValue(), this.e = parseInt(i, 16);
                                        var s = n.sub[3].getHexStringValue();
                                        this.d = q(s, 16);
                                        var o = n.sub[4].getHexStringValue();
                                        this.p = q(o, 16);
                                        var h = n.sub[5].getHexStringValue();
                                        this.q = q(h, 16);
                                        var a = n.sub[6].getHexStringValue();
                                        this.dmp1 = q(a, 16);
                                        var u = n.sub[7].getHexStringValue();
                                        this.dmq1 = q(u, 16);
                                        var c = n.sub[8].getHexStringValue();
                                        this.coeff = q(c, 16)
                                    } else {
                                        if (2 !== n.sub.length) return !1;
                                        var f = n.sub[1].sub[0];
                                        e = f.sub[0].getHexStringValue(), this.n = q(e, 16), i = f.sub[1].getHexStringValue(), this.e = parseInt(i, 16)
                                    }
                                    return !0
                                } catch (t) {
                                    return !1
                                }
                            }, r.prototype.gprbk = function () {
                                var t = {
                                    array: [new et.asn1.DERInteger({
                                        int: 0
                                    }), new et.asn1.DERInteger({
                                        bigint: this.n
                                    }), new et.asn1.DERInteger({
                                        int: this.e
                                    }), new et.asn1.DERInteger({
                                        bigint: this.d
                                    }), new et.asn1.DERInteger({
                                        bigint: this.p
                                    }), new et.asn1.DERInteger({
                                        bigint: this.q
                                    }), new et.asn1.DERInteger({
                                        bigint: this.dmp1
                                    }), new et.asn1.DERInteger({
                                        bigint: this.dmq1
                                    }), new et.asn1.DERInteger({
                                        bigint: this.coeff
                                    })]
                                };
                                return new et.asn1.DERSequence(t).getEncodedHex()
                            }, r.prototype.gprbkB64 = function () {
                                return c(this.gprbk())
                            }, r.prototype.gpubk = function () {
                                var t = new et.asn1.DERSequence({
                                    array: [new et.asn1.DERObjectIdentifier({
                                        oid: "1.2.840.113549.1.1.1"
                                    }), new et.asn1.DERNull]
                                }),
                                    e = new et.asn1.DERSequence({
                                        array: [new et.asn1.DERInteger({
                                            bigint: this.n
                                        }), new et.asn1.DERInteger({
                                            int: this.e
                                        })]
                                    }),
                                    i = new et.asn1.DERBitString({
                                        hex: "00" + e.getEncodedHex()
                                    });
                                return new et.asn1.DERSequence({
                                    array: [t, i]
                                }).getEncodedHex()
                            }, r.prototype.gpubkB64 = function () {
                                return c(this.gpubk())
                            }, r.wordwrap = function (t, e) {
                                if (!t) return t;
                                var i = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
                                return t.match(RegExp(i, "g")).join("\n")
                            }, r.prototype.gprk = function () {
                                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                                return t += r.wordwrap(this.gprbkB64()) + "\n", t += "-----END RSA PRIVATE KEY-----"
                            }, r.prototype.gpuk = function () {
                                var t = "-----BEGIN PUBLIC KEY-----\n";
                                return t += r.wordwrap(this.gpubkB64()) + "\n", t += "-----END PUBLIC KEY-----"
                            }, r.hasPublicKeyProperty = function (t) {
                                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
                            }, r.hasPrivateKeyProperty = function (t) {
                                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
                            }, r.prototype.parsePropertiesFrom = function (t) {
                                this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff)
                            }, r
                        }(Q),
                            rt = function () {
                                function t(t) {
                                    t = t || {}, this.default_key_size = parseInt(t.default_key_size, 10) || 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = null
                                }
                                return t.prototype.setKey = function (t) {
                                    this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new it(t)
                                }, t.prototype.sprk = function (t) {
                                    this.setKey(t)
                                }, t.prototype.spuk = function (t) {
                                    this.setKey(t)
                                }, t.prototype.dect = function (t) {
                                    try {
                                        return this.getKey().dect(f(t))
                                    } catch (t) {
                                        return !1
                                    }
                                }, t.prototype.enct = function (t) {
                                    try {
                                        return c(this.getKey().enct(t))
                                    } catch (t) {
                                        return !1
                                    }
                                }, t.prototype.sign = function (t, e, i) {
                                    try {
                                        return c(this.getKey().sign(t, e, i))
                                    } catch (t) {
                                        return !1
                                    }
                                }, t.prototype.verify = function (t, e, i) {
                                    try {
                                        return this.getKey().verify(t, f(e), i)
                                    } catch (t) {
                                        return !1
                                    }
                                }, t.prototype.getKey = function (t) {
                                    if (!this.key) {
                                        if (this.key = new it, t && "[object Function]" === {}.toString.call(t)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                                        this.key.generate(this.default_key_size, this.default_public_exponent)
                                    }
                                    return this.key
                                }, t.prototype.gprk = function () {
                                    return this.getKey().gprk()
                                }, t.prototype.gprkB64 = function () {
                                    return this.getKey().gprbkB64()
                                }, t.prototype.gpuk = function () {
                                    return this.getKey().gpuk()
                                }, t.prototype.gpukB64 = function () {
                                    return this.getKey().gpubkB64()
                                }, t.version = "3.0.0-rc.1", t
                            }();
                        window.LE = rt, t.LE = rt, t.default = rt, Object.defineProperty(t, "__esModule", {
                            value: !0
                        })
                    });

                    //获得md5 -- start
                    /*
                     * Configurable variables. You may need to tweak these to be compatible with
                     * the server-side, but the defaults work in most cases.
                     */
                    var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
                    var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
                    var chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */

                    /*
                     * These are the functions you'll usually want to call
                     * They take string arguments and return either hex or base-64 encoded strings
                     */
                    function hex_md5(s) {
                        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
                    }

                    function b64_md5(s) {
                        return binl2b64(core_md5(str2binl(s), s.length * chrsz));
                    }

                    function str_md5(s) {
                        return binl2str(core_md5(str2binl(s), s.length * chrsz));
                    }

                    function hex_hmac_md5(key, data) {
                        return binl2hex(core_hmac_md5(key, data));
                    }

                    function b64_hmac_md5(key, data) {
                        return binl2b64(core_hmac_md5(key, data));
                    }

                    function str_hmac_md5(key, data) {
                        return binl2str(core_hmac_md5(key, data));
                    }

                    /*
                     * Perform a simple self-test to see if the VM is working
                     */
                    function md5_vm_test() {
                        return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
                    }

                    /*
                     * Calculate the MD5 of an array of little-endian words, and a bit length
                     */
                    function core_md5(x, len) {
                        /* append padding */
                        x[len >> 5] |= 0x80 << ((len) % 32);
                        x[(((len + 64) >>> 9) << 4) + 14] = len;

                        var a = 1732584193;
                        var b = -271733879;
                        var c = -1732584194;
                        var d = 271733878;

                        for (var i = 0; i < x.length; i += 16) {
                            var olda = a;
                            var oldb = b;
                            var oldc = c;
                            var oldd = d;

                            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

                            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

                            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

                            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

                            a = safe_add(a, olda);
                            b = safe_add(b, oldb);
                            c = safe_add(c, oldc);
                            d = safe_add(d, oldd);
                        }
                        return Array(a, b, c, d);

                    }

                    /*
                     * These functions implement the four basic operations the algorithm uses.
                     */
                    function md5_cmn(q, a, b, x, s, t) {
                        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
                    }

                    function md5_ff(a, b, c, d, x, s, t) {
                        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
                    }

                    function md5_gg(a, b, c, d, x, s, t) {
                        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
                    }

                    function md5_hh(a, b, c, d, x, s, t) {
                        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
                    }

                    function md5_ii(a, b, c, d, x, s, t) {
                        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
                    }

                    /*
                     * Calculate the HMAC-MD5, of a key and some data
                     */
                    function core_hmac_md5(key, data) {
                        var bkey = str2binl(key);
                        if (bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

                        var ipad = Array(16),
                            opad = Array(16);
                        for (var i = 0; i < 16; i++) {
                            ipad[i] = bkey[i] ^ 0x36363636;
                            opad[i] = bkey[i] ^ 0x5C5C5C5C;
                        }

                        var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
                        return core_md5(opad.concat(hash), 512 + 128);
                    }

                    /*
                     * Add integers, wrapping at 2^32. This uses 16-bit operations internally
                     * to work around bugs in some JS interpreters.
                     */
                    function safe_add(x, y) {
                        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                        return (msw << 16) | (lsw & 0xFFFF);
                    }

                    /*
                     * Bitwise rotate a 32-bit number to the left.
                     */
                    function bit_rol(num, cnt) {
                        return (num << cnt) | (num >>> (32 - cnt));
                    }

                    /*
                     * Convert a string to an array of little-endian words
                     * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
                     */
                    function str2binl(str) {
                        var bin = Array();
                        var mask = (1 << chrsz) - 1;
                        for (var i = 0; i < str.length * chrsz; i += chrsz)
                            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
                        return bin;
                    }

                    /*
                     * Convert an array of little-endian words to a string
                     */
                    function binl2str(bin) {
                        var str = "";
                        var mask = (1 << chrsz) - 1;
                        for (var i = 0; i < bin.length * 32; i += chrsz)
                            str += String.fromCharCode((bin[i >> 5] >>> (i % 32)) & mask);
                        return str;
                    }

                    /*
                     * Convert an array of little-endian words to a hex string.
                     */
                    function binl2hex(binarray) {
                        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                        var str = "";
                        for (var i = 0; i < binarray.length * 4; i++) {
                            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
                        }
                        return str;
                    }

                    /*
                     * Convert an array of little-endian words to a base-64 string
                     */
                    function binl2b64(binarray) {
                        var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                        var str = "";
                        for (var i = 0; i < binarray.length * 4; i += 3) {
                            var triplet = (((binarray[i >> 2] >> 8 * (i % 4)) & 0xFF) << 16) |
                                (((binarray[i + 1 >> 2] >> 8 * ((i + 1) % 4)) & 0xFF) << 8) |
                                ((binarray[i + 2 >> 2] >> 8 * ((i + 2) % 4)) & 0xFF);
                            for (var j = 0; j < 4; j++) {
                                if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
                                else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
                            }
                        }
                        return str;
                    }

                    //获得md5 -- end
                    function getLic(callback) {
                        var licURL = appjs.substr(0, appjs.lastIndexOf('/') + 1) + 'hydra.lic';
                        d3.html(licURL, function (a, b) {
                            license = d3.select(b)._groups[0][0].textContent;
                            if (typeof license == 'undefined') {
                                console.log('error 0 没有找到lic', licURL);
                                return false;
                            } else {
                                callback();
                            }
                        });
                    }

                    function valLic() {
                        var v = true;
                        var k = function (p, a, c, k, e, d) {
                            e = function (c) {
                                return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
                            };
                            if (!''.replace(/^/, String)) {
                                while (c--) d[e(c)] = k[c] || e(c);
                                k = [function (e) {
                                    return d[e]
                                }];
                                e = function () {
                                    return '\\w+'
                                };
                                c = 1
                            };
                            while (c--)
                                if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
                            return p
                        }('7/d/a+4+g+f+2+3/6/h+0/5+b+c/9++e/1+8=', 62, 18, '2lk7pjb8tra|6AECQD9HJXvA3uFkCTlosrRlSVA7HD5ej04VyBrHxb|7bM54qpsbYLRNI9ZyFri2VgxsrFDKVZHswq1TfdNWHQkLBxXEECQQDxxQmmMc94WnonKNVNsRg3lT6j6lJ5HxhUUNZPpqHZeErDDvRbPvhzyjxN65EgFsKSh84oZKT7|AsrUkumY5OnAkEAmbV3ofJkMAasdc1|KWheOHusu4hwIDAQABAoGAYDVovwim4J86XysGwAVkLUnhguqG0yoAi8C2tUvRyQDvJOOIPfNAnphPXSrRFRm|L8XqDZ|MH|MIICXAIBAAKBgQCRKiQPr5hqvQ61IG72zO5K|MWUyIdTRM3utvkMxGl3seykbwsFNlVUfDd1cUrYU5xnLSW18|RoXBSq0lWxE3QJBAIrYoXhovJelb6P6PSpSaFy1z4t40lmV8C1ba0kfzHianA5vKI8thoHARrkEOP7sDg3T3V|apX0c4eNFBkjnV61goxrFYPHI5ZAbsIYJP|ert|krbNOq19LQIQJAatAcdTpoaMnAUfCuXEazZksfg5eQnEZqn0WfiU0bEFMe5JKEzpNBfRaKEfrTARRNHiO1pw7f|m5ZgSORUW8OgByb30uhB89r9j8VukptRBRs0Edi0MWBCiWEPVyH9SyKvAd1KlS7M3d9V4NVYRxpdaPG7lrWJlJw87rG0yyzJe96Ds|ph87QT7M9UZ|s46Zu2CSuA5MZVIbu5CTiUuXtsyteglye0csQys|vF4oLTOp3uXMRoqF|xQkZ80qXoAHNzJSKzfxRL79chHI3v8N'.split('|'), 0, {});
                        var domain = document.domain;
                        var crypt = new LE();
                        crypt.sprk(k);
                        var d = crypt.dect(license);
                        var da = d.split('\n');
                        if (openTime > parseInt(da[0])) {
                            v = false;
                        }
                        var sa = da[1].split(',');
                        if (sa.indexOf(domain) < 0) {
                            v = false;
                        }
                        js5 = da[2];
                        v && protectScript(init_callback);
                    }

                    function protectScript(callback) {
                        d3.html(appjs, function (a, b) {
                            var v = true;
                            var html = d3.select(b)._groups[0][0].textContent;
                            var jsMd5 = hex_md5(html);
                            (jsMd5 != js5) && (v = false);
                            callback();
                        });
                    }

                    licence.test = function (callback) {
                        callback();
                        // init_callback = callback;
                        // getLic(valLic);
                    }
                    return licence;
                };
                /***/
            })


            /******/
        ]);

export default hydra;
