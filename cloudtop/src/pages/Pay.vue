<template>
  <div class="pay-ct">
    <div class="step">
      <el-steps :active="stepActive" :space="200">
        <el-step title="步骤 1" description="确认配送地址"></el-step>
        <el-step title="步骤 2" description="完成商品支付"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div v-if="doneIndex == 0">
      <div class="adr-title">
        <h2>信息</h2>
      </div>
      <div class="address">
        <i class="el-icon-s-custom">{{query.recipient}}</i>
        <br>
        <i class="el-icon-phone">{{query.phone}}</i>
        <br>
        <i class="el-icon-location">{{query.address}}</i>
      </div>
      <div class="pay-detail">
        <div class="pay-title">
          <h1>支付详细</h1>
        </div>
        <p><i class="el-icon-circle-check" style="color:green;font-size:20px"></i>商品总数量:{{totalNum}}</p>
        <p><i class="el-icon-circle-check" style="color:green;font-size:20px"></i>商品总金额:<span id="cost">￥{{totalP}}</span></p>
        <el-popconfirm
          id="popcon"
          confirmButtonText='确认支付'
          @onConfirm="confirm"
          cancelButtonText='取消支付'
          icon="el-icon-info"
          iconColor="red"
          title="你确定要支付吗？"
        >
          <el-button slot="reference" type="warning" id="payBtn">支  付</el-button>
        </el-popconfirm>
      </div>
    </div>
    <div v-if="doneIndex == 1">
      <h1 style="text-align:center">支付成功
        <i class="el-icon-check" 
        style="color: green;border:2px solid;border-radius:25px;"></i>
      </h1>
      <p style="text-align:center;font-size:20px;"><router-link to="/account">查看订单</router-link></p>
      <p style="text-align:center;font-size:20px;"><router-link to="/meau">继续购物</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doneIndex: 0,
      stepActive: 2,
      totalP: sessionStorage.getItem("totalP"),
      totalNum: sessionStorage.getItem("totalNum"),
      query: this.$route.query //Address传来的值
    }
  },
  methods: {
    confirm() {
      let itemlist = JSON.parse( sessionStorage.getItem("itemlist") )
      for (let i of itemlist) {
        let postData = this.$qs.stringify({
        "User_name": sessionStorage.getItem("user"),
        "Goods_id": i.id,
        "Goods_num": i.num,
        "price": i.num * i.price,
        "recipient": this.query.recipient,
        "phone": this.query.phone,
        "address": this.query.address,
        })
        this.$axios
          .post(this.$host + '/OrderInsert_api.jsp',postData)
          .then( response => {
            console.log(response.data)
          })
          .catch( () => (console.error()) )
      }
      this.doneIndex = 1
      this.stepActive = 3
      //清除购物车
      sessionStorage.removeItem("itemlist")
    },

  }
}
</script>

<style scoped>
  .step{
    margin-top: 30px;
  }
  .pay-ct{
    width: 60%;
    margin: 0 auto;
  }
  .adr-title{
    border-block-end: solid darkgray 2px;
  }
  .address{
    border-block-end: solid darkgray 2px;
    font-size: 20px;
    margin-top: 2%;
    padding-bottom: 2%;
  }
  .pay-title{
    border-block-end: solid orange 2px;
  }
  .pay-detail{
    position: relative;
  }
  #cost{
    font-size: 30px;
    font-weight: bold;
    color: orange;
  }
  #payBtn{
    position: absolute;
    right: 5%;
    font-size: 30px;
  }
  .el-button{
    font-size: 15px;
  }
</style>