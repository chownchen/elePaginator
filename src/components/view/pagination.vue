<!--author zdchen-->

<template>
  <div class="paginationWrap">
    <!--列表-->
    <el-row>
      <el-table
        :data="options.list"
        border
        style="width: 100%"
        highlight-current-row
        @current-change="chooseChange"
        @selection-change="handleSelectionChange"
        @cell-click="handleRowClick"
      >

        <!--选择框部分-->
        <el-table-column
          v-if="options.needCheckBox"
          resizable
          type="selection"
          width="55">
        </el-table-column>

        <!--序号部分-->
        <el-table-column
          resizable
          v-if="options.needIndex"
          type="index" width="80"
          label="序号">
        </el-table-column>

        <!--浏览部分-->
        <el-table-column
          resizable
          v-for="(item, index) in options.itemTr" :key="tableKey"
          v-if="typeof options.itemVal[index] == 'string'"
          :label="item">
          <template scope="scope">
            <span v-if="options.itemVal[index].split(',').length == 1">{{ scope.row[options.itemVal[index]] }}</span>
            <span v-else>
                <span v-if="options.itemVal[index].split(',').length == 2">
                  <img :src="scope.row[options.itemVal[index].split(',')[0]]" class="tableImg" alt="">
                </span>
                <span v-else>
                    <div v-if="options.itemVal[index].split(',').length == 3">
                      <img :src="scope.row[options.itemVal[index].split(',')[0]]" class="tableImg" alt="">
                      <span>{{scope.row[options.itemVal[index].split(',')[2]]}}</span>
                    </div>
                </span>
            </span>
          </template>
        </el-table-column>

        <!--点击操作-->
        <el-table-column
          resizable
          v-for="(item, index) in options.itemTr" :key="tableKey"
          v-if="typeof options.itemVal[index] == 'object' && options.itemVal[index].type == 2"
          :width="options.itemVal[index].data.length > 1 ? '220': '140'"
          :label="item">
          <template scope="scope">

              <!--按钮样式-->
              <el-button
                v-for="(keyItem, _index) in options.itemVal[index].data" :key="tableKey"
                @click="buttonClick(keyItem.item, keyItem.index, scope.row, scope.$index + 1, $event)"
                v-if="keyItem.buttonType == 'Button'"
                v-show="showBtn(keyItem, scope.row)"
                :type="keyItem.type" :icon="keyItem.icon" size="small">
                {{keyItem.item}}
              </el-button>

              <!--弹出框样式-->
              <el-popover
                v-for="keyItem in options.itemVal[index].data" :key="tableKey"
                v-if="keyItem.buttonType == 'Popover'"
                placement="bottom"
                width="100"
                class="button-wrap"
                style="display: inline-block !important;"
                trigger="click">
                  <div v-show="popVisible">
                    <div class="list"
                         v-for="(childList, popIndex) in keyItem.child"
                         v-show="showItem(childList, scope.row)"
                         @click="popoverClick(childList.item, popIndex + 1, scope.row, scope.$index + 1, $event)">
                      <img v-if="childList.imgUrl" :src="childList.imgUrl" class="popImg" alt="">
                      <span class="">{{childList.item}}</span>
                    </div>
                  </div>
                <el-button
                  :type="keyItem.type" size="small"
                  slot="reference"
                  class="button-on"
                  @click="popVisible = true"
                >{{keyItem.item}}</el-button>
              </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <!--列表及分页-->
    <el-row v-show="options.list.length > 0">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPageData"
          :page-size="options.pageSize || 10"
          layout="prev, pager, next, jumper"
          :total="options.count">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
//    import popGroup from './../assets/images/bus.png'
    export default {
      props: {
        options: {
          type: Object
        },
      },
      data () {
          return {
            tableKey: 2,
            currentPageData: this.options.currentPage,
            popVisible: false,
          }
      },
      methods:{
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {  // 当前页控制
          this.$emit('refreshPageIndex', val)
          console.log(`当前页: ${val}`)
        },
        showBtn(keyItem, item){
          if(keyItem.showMode === undefined){
            return true
          }else {
            return keyItem.showMode(item)
          }
        },
        showItem(childList, item){
          if(childList.showPop === undefined){
            return true
          }else {
            return childList.showPop(item)
          }
        },

        /**
         *   btnOption中包含
         *   name, 点击的button名称
         *   btnIndex, 点击button索引
         *   row, 被点击当前行的数据
         *   rowIndex  当前行索引
         */

        buttonClick(name, btnIndex, row, rowIndex) {  // 按钮点击事件
          let btnOption = {
            name, btnIndex, row, rowIndex
          }
          this.$emit(`getBtnInfo${btnIndex}`, btnOption)
        },

        /**
         *   popOption中包含
         *   name, 点击的popover名称
         *   popIndex, 点击popover索引
         *   row, 被点击当前行的数据
         *   rowIndex  当前行索引
         */

        popoverClick(name, popIndex, row, rowIndex,e) {  // 下拉框点击事件
          this.popVisible = false
          let popOption = {
            name, popIndex, row, rowIndex
          }
          this.$emit(`getPopInfo${popIndex}`, popOption)
        },
        handleSelectionChange(row) {   // 选择框事件
          this.$emit(`SelectionChange`, row)
        },
        chooseChange(currentRow, oldCurrentRow){
          this.$emit(`singleChoose`, {currentRow, oldCurrentRow})
        },
        handleRowClick(row) {
          this.$emit(`handleRowClick`, row)
        },
      }
    }
</script>

<style lang="scss">
  .paginationWrap {

    /*******分页样式重写********/
    .el-pagination{
      padding:36px 0;
      text-align:center;

      .btn-prev, .btn-next  {
        border: none;
      }

      .el-pager li {
        border: none;
      }
    }
    .el-pager li.active{
      background:#ff7801;
      border:none;
    }
    .el-pagination--small .btn-next,
    .el-pagination--small .btn-prev,
    .el-pagination--small .el-pager li,
    .el-pagination--small .el-pager li:last-child{
      font-size:14px;
      min-wdith:30px;
    }

    .tableImg {
      width: 40px;
      height: 40px;
    }
  }

/*******重写popover样式，控制展现隐藏********/
  .el-popover {
    padding: 0;
    margin-top: 5px !important;
    border: none !important;

    .popper__arrow{
      display: none !important;
    }

    .list {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      color: #666;

      .popImg {
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
        margin: 0 11px 0 14px;
      }

      &:hover{
        background: rgba(0, 0, 0, 0.02);
      }
    }
  }

</style>
