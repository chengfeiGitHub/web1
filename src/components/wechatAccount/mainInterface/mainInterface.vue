<template>
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top-small">
      <div class="console-sub-title margin-top-large">
        <div class="pull-left">
          <span>微信公众号监控平台</span>
        </div>
      </div>
      <el-tabs>
        <el-tab-pane>
          <span slot="label" class="label-content"><i class="el-icon-tickets"></i>监控微信公众号列表</span>
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top-small">
            <span class="fa fa-yelp margin-bottom-middle">我监控的公众号</span>
            <!--<md-button class="md-raised md-primary" style="float: right;margin-right: 20px" @click="addWechatPub"><i class="el-icon-circle-plus-outline"></i>添加公众号</md-button>-->
            <button type="button" class="btn btn-default" style="float: right;margin-right: 20px" @click="addWechatPub">添加公众号</button>
          </div>
          <div>
            <el-table border :data="pageWeChat">
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="account_name" label="账号"></el-table-column>
              <el-table-column prop="account_owner" label="账号主体"></el-table-column>
              <el-table-column prop="account_info" label="账号简介"></el-table-column>
              <el-table-column prop="time_add_account" label="加入监控队列时间"></el-table-column>
              <el-table-column prop="time_last_update" label="最后一次爬取时间"></el-table-column>
              <el-table-column prop="num_total_articles" label="文章总数"></el-table-column>
              <el-table-column label="操作" >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    icon="el-icon-edit"
                    @click="deleteWechat(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="col-sm-12 text-right margin-top-middle" style="padding-bottom:10px">
            <el-pagination background @current-change="currentWeChatPage"
                           :current-page.sync="currentWeChats"
                           :page-size="pageSize"
                           layout="total,prev, pager, next"
                           :total="weChatSize">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="label-content"><i class="el-icon-tickets"></i>手机爬虫</span>
          <!--手机爬虫管理-->
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="label-content"><i class="el-icon-tickets"></i>个人兴趣点</span>
        <!--个人兴趣管理-->
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="删除公众号" :visible.sync="deleteWechatDialog" :modal-append-to-body=false>
        <div class="col-sm-12 margin-top-small">
          <p class="margin-top-small">是否删除: {{weChatSubToBeDelate.account_name}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button round  type="primary" @click="doDeleteBAUserById">确定</el-button>
            <el-button round @click="cancelDelete">取消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="添加公众号" :visible.sync="addWechatSubDialog" :modal-append-to-body=false>
        <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12 margin-top-large">
          <label class="cffex-form-label-min text-mute"><span class="text-danger"></span>公众号：</label>
          <input v-model="weChatSubToBeAdd" name="weChatSubToBeAdd" type="text" class=" form-control cffex-form-item-inline cffex-form-item-width-middle-percentage">
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button round  type="primary" @click="commitAddWeChatSub">确定</el-button>
            <el-button round @click="cancleAddWeChatSub">取消</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
// let qs = require('qs')
export default{
  data () {
    return {
      // weChat: [{'num_total_articles': '3200', 'num_total_articles_with_read_data': '32000', 'is_all_artices_in': '1', 'time_last_update': '3412341234', 'time_add_account': '3412341234', 'account_owner': '神棍网络科技有限公司1', 'account_info': '世界上最NB的科技公司1'}, {'num_total_articles': '3200', 'num_total_articles_with_read_data': '32000', 'is_all_artices_in': '1', 'time_last_update': '3412341234', 'time_add_account': '3412341234', 'account_owner': '神棍网络科技有限公司2', 'account_info': '世界上最NB的科技公司2'}]
      weChat: [],
      pageWeChat: [],
      deleteWechatDialog: false,
      addWechatSubDialog: false,
      weChatSubAccount: {},
      currentWeChats: 1,
      pageSize: 15,
      weChatSize: 1,
      weChatSubToBeDelate: {},
      weChatSubToBeAdd: ''
    }
  },
  created () {
    this.getWeChatSub()
  },
  methods: {
    getWeChatSub: function () {
      var _this = this
      this.weChat = []
      this.pageWeChat = []
      var params = new URLSearchParams()
      // 仅仅为了展示，需要添加post参数的时候直接params.append('key',value)即可
      params.append('pId', 'value1')
      this.$axios.post('http://localhost:8200/getInfo', params).then(function (response) {
        let data = response.data
        console.log('hello world' + response.data['data'])
        _this.weChat = data['data']
        _this.weChatSize = _this.weChat.length
        let start = (_this.currentWeChats - 1) * _this.pageSize
        let end = start + _this.pageSize
        for (let i = 0; i < _this.weChat.length && i < end; i++) {
          _this.pageWeChat.push(_this.weChat[i])
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    currentWeChatPage: function () {
      this.pageWeChat = []
      let start = (this.currentWeChats - 1) * this.pageSize
      let end = start + this.pageSize
      for (let i = start; i < this.weChat.length && i < end; i++) {
        this.pageWeChat.push(this.weChat[i])
      }
    },
    deleteWechat: function (row) {
      this.deleteWechatDialog = true
      this.weChatSubToBeDelate = row
    },
    cancelDelete: function () {
      this.deleteWechatDialog = false
    },
    doDeleteBAUserById: function () {
      var _this = this
      var params = new URLSearchParams()
      params.append('accountName', this.weChatSubToBeDelate['account_name'])
      this.$axios.post('http://localhost:8200/api/setting/gzh_accounts_delete', params).then(function (response) {
        let data = response.data
        if (data['error_code'] === 0) {
          _this.$message({message: '删除成功', type: 'success'})
          _this.getWeChatSub()
        } else {
          _this.$message({message: '删除失败', type: 'error'})
        }
      })
      this.deleteWechatDialog = false
    },
    addWechatPub: function () {
      this.addWechatSubDialog = true
    },
    commitAddWeChatSub: function () {
      var _this = this
      var params = new URLSearchParams()
      params.append('addAccountName', this.weChatSubToBeAdd)
      this.$axios.post('http://localhost:8200/api/setting/gzh_accounts_add', params).then(function (response) {
        let data = response.data
        if (data['error_code'] === 0) {
          _this.$message({message: '删除成功', type: 'success'})
          _this.getWeChatSub()
        } else {
          _this.$message({message: '删除失败', type: 'error'})
        }
      })
      this.addWechatSubDialog = false
    },
    cancleAddWeChatSub: function () {
      this.addWechatSubDialog = false
    }
  }
}
</script>
<style>
  .viewFramework-product-body{
    position:absolute;
    width:auto;
    top:0px;
    bottom:0px;
    left:0px;
    right:0px;
    overflow:hidden;
    overflow-y:auto;
    -o-transition:all 0.2s ease;
    -ms-transition:all 0.2s ease;
    -moz-transition:all 0.2s ease;
    -webkit-transition:all 0.2s ease;
  }
</style>
