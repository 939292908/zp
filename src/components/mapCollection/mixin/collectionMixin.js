/**
 * 图谱采集的混入功能
 */
export const mapMixin = {
    data() {
        const me = this;
        return {
            pageTypes: [{
                    name: '采集任务',
                    icon: 'iconfont icon-renwuliebiao',
                    route: '/collectTaskList',
                    query: {
                        type: '0', //图谱还是人员任务（1：人员，2：图谱，0：任务）
                        title: '采集任务列表'
                    },
                    component: "taskList",
                    hasAuth: () => {
                        // return true;
                        return me.hasPageAuth(me.constantPageMap.PAGE_Map_Collect_Task_ID)
                    }
                },
                {
                    name: '图谱列表',
                    icon: 'iconfont icon-tupucaiji',
                    route: '/collectList',
                    query: {
                        type: '2', //图谱还是人员任务（1：人员，2：图谱，0：任务）
                        title: '图谱列表'
                    },
                    component: "mapList",
                    hasAuth: () => {
                        return this.hasPageAuth(this.constantPageMap.PAGE_Map_Collect_List_ID)
                    }
                },
                {
                    name: '人员列表',
                    icon: 'iconfont icon-renyuanliebiao',
                    route: '/collectPersonList',
                    query: {
                        type: '1', //图谱还是人员任务（1：人员，2：图谱，0：任务）
                        title: '人员列表'
                    },
                    component: "personList",
                    hasAuth: () => {
                        // return true;
                        return this.hasPageAuth(this.constantPageMap.PAGE_Map_Collect_PersonList_ID)
                    }
                },
                {
                    name: '采集上传校验',
                    icon: 'iconfont icon-ziduanxiaoyan',
                    type: 'dialog',
                    component: "validateFile",
                    hasAuth: () => {
                        return this.hasFunAuth(this.constantFunMap.FUN_Collect_Upload_Valid_ID)
                    }
                }
            ],
        }
    },
    methods: {
        /**
         * 窗口大小调整
         * @function resizeHandler
         * @author julie
         */
        resizeHandler(height = 110) {
            this.$nextTick(() => {
                if (this.$refs.wrapperDetail) {
                    let wrapperDetailHeight = this.$refs.wrapperDetail.clientHeight
                    if (wrapperDetailHeight - height < 300) {
                        this.tableHeight = 300
                    } else {
                        this.tableHeight = wrapperDetailHeight - height
                    }
                } else {
                    this.tableHeight = 300
                }
            });
        },
        /**
         * 返回首页
         * @author julie
         */
        backIndex() {
            this.$router.push({
                path: '/index',
            });
        },
        /**
         * 返回采集列表页
         * @author julie
         */
        backList() {
            let pageSet = this.pageTypes.find(x => {
                return x.query.type == this.$route.query.type
            });
            this.$router.push({
                path: pageSet.route,
                query: pageSet.query
            });
        },
        /**
         * 返回采集入口首页
         * @author julie
         */
        backCollection() {
            this.$router.push({
                path: '/collect',
            });
        },
    }
}
