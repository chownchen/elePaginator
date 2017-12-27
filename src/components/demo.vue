<template>
    <div class="busDriverWrap">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-light">demo</div>
            </el-col>
        </el-row>
        <el-row>
            <el-form :inline="true" :model="formInline" class="demo-form-inline right-align">
                <el-form-item label="所属企业">
                    <el-select v-model="formInline.enterprise" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="租赁公司">
                    <el-select v-model="formInline.enterpriseChild" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市">
                    <el-select v-model="formInline.city" placeholder="">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-light">司机信息列表</div>
            </el-col>
        </el-row>

        <!--options 为传值对象，后面为子集执行方法-->
        <!--‘getBtnInfo’+index（第几个按钮） 为按钮点击事件获取 index从1开始-->
        <!--‘getopInfo’+index 为下拉框点击事件获取 index从1开始-->
        <v-pagination
            :options="options"
            @refreshPageIndex="refreshPage"
            @getBtnInfo1="getItem1"
            @getBtnInfo2="getItem2"
            @getPopInfo1="getPop1"
            @getPopInfo2="getPop2"
            @getPopInfo3="getPop3"
            @SelectionChange="checkBoxChoose"
            @singleChoose="singleChoose"
        ></v-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
    import {BM} from '../common/common.js'
    import pagination from './view/pagination'
    import {mapGetters} from 'vuex'
    import {filterNumber} from './../common/jsFilter.js'
    import frozeIcon from './../assets/images/reject.png'
    import starIcon from './../assets/images/ic_evaluate.png'
    import watchIcon from './../assets/images/ic_eye.png'
    export default {
        data () {
            return {
                formInline: {
                    enterprise: '',
                    enterpriseChild: '',
                    city: '',
                    businessId: '',
                    keyword: '',
                    remark: ''
                },
                options: {
                    itemTr: [],
                    list: [],
                    itemVal: [],
                    count: 0,
                    currentPage: 1,
                    needIndex: false,
                    needCheckBox: false
                }
            }
        },
        mounted(){
            getList(this)
        },
        methods: {
            onSubmit() {
                let that = this
                getList(that)
            },
            refreshPage(index) {
                // 分页重新请求数据
                let that = this
                that.options.currentPage = +index
                getList(that)
            },

            /**
             *   option中包含
             *   name, 点击的button名称
             *   btnIndex, 点击button索引
             *   row, 被点击当前行的数据
             *   rowIndex  当前行索引
             * 第一个按钮被点击的后执 item为该条信息的所有数据
             * 方法命名规则getItem + n （n为当前被点击的第n个按钮）
             */

            getItem1(option){
                let that = this
                let tbList = that.options.list
                let needStransform = false

                // 如果需要点击后隐藏按钮的操作。
                // item中增加了字段showBtn1（第一个按钮，这个由自己点击的按钮）控制按钮隐藏显示。

                tbList.forEach(function (item, key, arr) {
                    if (item.driverId == option.row.driverId) {
                        arr[key]['showBtn' + option.btnIndex] = false
                    }
                })

//      调用ajax通知已改变数据
//      $.ajax()

                // 再次渲染分页列表
                renderPagination(that, tbList, that.options.count, needStransform)
                console.log('btnClick1', option)
            },
            getItem2(option){
                console.log('btnClick2', option)
            },

            /**
             *   option中包含
             *   name, 点击的popover名称
             *   popIndex, 点击popover索引
             *   row, 被点击当前行的数据
             *   rowIndex  当前行索引
             */

            getPop1(option){
                console.log('popClick1', option)
            },
            getPop2(option){
                console.log('popClick2', option)
            },
            getPop3(option){
                console.log('popClick3', option)
            },

            checkBoxChoose(val){
                /**
                 * 多选拿到选择的tab列表数据
                 */

                console.log('checkBoxChoose', val)
            },
            singleChoose(val){
                /**
                 * 单选拿到选择的tab列表数据
                 */
                console.log('checkBoxChoose', val)
            }
        },
        components: {
            'v-pagination': pagination   // 引用分页组件
        }
    }

    function getList(that) {

        // 这些数据都可以通过ajax获取到，这里只做模拟
        let list = [
            {
                addressCard: "",
                carId: 3936,
                carType: "斑马专车",
                city: "武汉市",
                description: "111",
                driverId: 18,
                email: "",
                enterprise_id: 91,
                idCardBack: "",
                idCardFront: "http://7xt8hn.com2.z0.glb.qiniucdn.com/项目的组件构成.png",
                identifyCardNumber: "",
                jobSeniorityCard: "",
                load: "4",
                name: "程亮",
                parentEnterpriseId: 1,
                phone: "18942908490",
                time: 1498998625,
                plateNum: "vv",
                remark: 2,
                status: 1,
                type: null,
                volume: "3.6*1.6*1.3",
            },
            {
                addressCard: "",
                carId: 3936,
                carType: "斑马专车",
                city: "武汉市",
                description: "111",
                driverId: 19,
                email: "",
                enterprise_id: 91,
                time: 1498998625,
                idCardBack: "",
                idCardFront: "http://7xt8hn.com2.z0.glb.qiniucdn.com/项目的组件构成.png",
                identifyCardNumber: "",
                jobSeniorityCard: "",
                load: "4",
                name: "程亮",
                parentEnterpriseId: 1,
                phone: "18942908490",
                plateNum: "vv",
                remark: 1,
                status: 1,
                type: null,
                volume: "3.6*1.6*1.3",
            },
            {
                addressCard: "",
                carId: 3936,
                carType: "斑马专车",
                city: "武汉市",
                description: "111",
                driverId: 20,
                email: "",
                enterprise_id: 91,
                time: 1498998625,
                idCardBack: "",
                idCardFront: "http://7xt8hn.com2.z0.glb.qiniucdn.com/项目的组件构成.png",
                identifyCardNumber: "",
                jobSeniorityCard: "",
                load: "4",
                name: "程亮",
                parentEnterpriseId: 1,
                phone: "18942908490",
                plateNum: "vv",
                remark: 2,
                status: 1,
                type: null,
                volume: "3.6*1.6*1.3",
            },
            {
                addressCard: "",
                carId: '',
                carType: "斑马专车",
                city: "武汉市",
                description: "111",
                driverId: 21,
                email: "",
                enterprise_id: 91,
                time: 1498998625,
                idCardBack: "",
                idCardFront: "http://7xt8hn.com2.z0.glb.qiniucdn.com/项目的组件构成.png",
                identifyCardNumber: "",
                jobSeniorityCard: "",
                load: "4",
                name: "程亮",
                parentEnterpriseId: 1,
                phone: "18942908490",
                plateNum: "vv",
                remark: 1,
                status: 1,
                type: null,
                volume: "3.6*1.6*1.3",
            },
            {
                addressCard: "",
                carId: '',
                carType: "斑马专车",
                city: "武汉市",
                description: "111",
                driverId: 23,
                email: "",
                enterprise_id: 91,
                time: 1498998625,
                idCardBack: "",
                idCardFront: "http://7xt8hn.com2.z0.glb.qiniucdn.com/项目的组件构成.png",
                identifyCardNumber: "",
                jobSeniorityCard: "",
                load: "4",
                name: "程亮",
                parentEnterpriseId: 1,
                phone: "18942908490",
                plateNum: "vv",
                remark: 2,
                status: 1,
                type: null,
                volume: "3.6*1.6*1.3",
            },
            {
                addressCard: "",
                carId: '',
                carType: "斑马专车",
                city: "武汉市",
                description: "111",
                driverId: 24,
                email: "",
                enterprise_id: 91,
                time: 1498998625,
                idCardBack: "",
                idCardFront: "http://7xt8hn.com2.z0.glb.qiniucdn.com/项目的组件构成.png",
                identifyCardNumber: "",
                jobSeniorityCard: "",
                load: "4",
                name: "程亮",
                parentEnterpriseId: 1,
                phone: "18942908490",
                plateNum: "vv",
                remark: 11,
                status: 1,
                type: null,
                volume: "3.6*1.6*1.3",
            }]

        let count = 22

        renderPagination(that, list, count)

    }

    function renderPagination(that, list, count) {
        /**
         * 获取接口数据后需要配置如下字段传入pagination组件中
         * detail的type == 1  字段为类似tatus转换成具体数据的（暂时）
         * operator的type == 2 时是 配置按钮和下拉菜单
         * detail，operator 这两个字段不固定，可以自定义
         */

        let operator = {
            width: 200,
            data: [{
                item: '修改',         // 按钮名称
                index: '1',           // 按钮为第几个
                buttonType: 'Button', //按钮类型  Button/Popover
                type: 'info',             // el-button类型
                icon: '',
                showItem(item){
//          需要通过baseCode对应的carId字段判断是否需要展示button, 返回true为展示，false为隐藏
                    if (item.carId) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }, {
                item: '取消绑定',
                index: '2',
                buttonType: 'Popover',
                type: 'primary',
                child: [{
                    item: '删除',              // 按钮名称 必选
                    imgUrl: frozeIcon,         // 下拉列表中小图标地址 可选
                    showItem(item){            // 可选
                        // 方法同btn 的showItem
                        return true;
                    }
                }, {
                    item: '取消绑定',
                    imgUrl: starIcon
                }, {
                    item: '复制',
                }]
            }]
        }

        /**
         * type == 1
         * showIt为true：  仅保留value对应的某个字段的值， 可配多个{}
         * showIt为false： 过滤掉value对应的某个字段的值， 可配多个{}
         *
         * type == 2
         *时间戳转换，转换后的值在 新增字段timeElValue中
         *
         * type == 3
         * 时间戳转换，转换后的值在 新增字段remarkElValue中
         */

            // 筛选后会新增一个字段，字段名为被修改的字段 + ‘ElValue’, 如   remarkElValue （为了避免和接口提供字段重复覆盖）
        let detail = [
                {
                    type: 1,
                    showIt: false,   // showIt为true时，展示driverId == 18的数据列，showIt为false时，展示driverId != 18的数据列，可另外增加筛选条件
                    key: 'driverId',
                    value: '20'
                },
                {
                    type: 2,              // 时间转换
                    key: 'time',        // 字段名称
                    data: []
                },
                {
                    type: 3,              // 转换
                    key: 'remark',        // 字段名称
                    data: [
                        {
                            key: 1,
                            value: '待定'
                        },
                        {
                            key: 2,
                            value: '确定'
                        },
                        {
                            key: '',       //else选项，除去两个之外的其他数值
                            value: '不确定选项'
                        }]
                },
                {
                    type: 4,              // 自定义筛选
                    key: 'plateNum',        // 字段名称
                    fn(key) {             // 参数key是plateNum对应的值
                        return key + '自定义';
                    }
                },
                {
                    type: 4,              // 自定义筛选
                    key: 'plateNum',        // 字段名称
                    fn(key) {             //可以通过 js-filter方法来写常用的过滤字段
                        return filterNumber(key);
                    }
                },
            ]

        // 调用BM.transformParam方法处理list数据，满足列表要求
        list = BM.transformParam(list, detail)

        //  如果列表中需要图片，字段配置可这样：
        //          icon为图片对应字段，code为文字对应字段，中间imgUrl为固定值（不改）
        //          例子见lineManagement.vue（线路管理页面）
        //          1: 图片加文字："icon,imgUrl,code",
        //          2: 仅展示图片 ："icon,imgUrl",
        //          let itemValueList = ['id', 'city', 'tag', 'code', 'icon,imgUrl,code', 'name', 'type', 'start_addr', 'end_addr', 'price', 'remark', operator]

        let DriverInfoItem = ['司机编号', '司机姓名', '联系电话', '车辆编号', '车牌号', '车型', '司机来源', '时间', '操作']
        let itemValueList = ['driverId', 'name', 'phone', 'carId', 'plateNumElValue', 'carType', 'remarkElValue', 'timeElValue', operator]

        /**
         *  pagination     接收的所有字段
         *  itemTr         table顶部标题展示
         *  list           列表数据
         *  itemVal        每一列对应的字段
         *  count          列表条数
         *  currentPage    当前页，默认为0
         *  needIndex      是否需要排头序号
         *  needCheckBox   是否需要排头序号
         */

        that.options = {
            itemTr: DriverInfoItem,
            list: list,
            itemVal: itemValueList,
            count: count,
            currentPage: that.options.currentPage,
            needIndex: true,
            needCheckBox: true
        }
    }
</script>

<style lang="scss">

    // css编写以scss编写，每个页面最外层套用一个div，以便避免影响其他页面样式
    // 没用scoped是因为加上后无法对部分elementui样式重写

    .busDriverWrap {
        padding: 22px;

        .grid-content {
            border-radius: 4px;
            min-height: 36px;
            line-height: 36px;
            text-indent: 10px;
        }

        .bg-purple-light {
            background: #e5e9f2;
        }

        .el-row {
            padding-bottom: 22px;
        }
    }
</style>
