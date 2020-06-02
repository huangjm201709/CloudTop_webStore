<template>
  <div class="address-ct">
    <div class="step">
      <el-steps :active="1" :space="200">
        <el-step title="步骤 1" description="确认配送地址"></el-step>
        <el-step title="步骤 2" description="完成商品支付"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="address-title-ct">
      <h1>请选择配送地址</h1>
    </div>
    <div class="address-self">
      <i class="el-icon-s-custom">{{user.recipient}}</i>
      <br>
      <i class="el-icon-phone">{{user.phone}}</i>
      <br>
      <i class="el-icon-location">{{user.address}}</i>
      <el-button type="warning" plain @click="oldlcnClick">送货到该地址</el-button>
    </div>
    <div class="address-new">
      <h2>添加新地址</h2>
      <p>收件人姓名</p>
      <input type="text" v-model="newR">
      <p>联系电话</p>
      <input type="text" v-model="newP">
      <p>配送地址</p>
      <input type="text" v-model="newA">
      <el-button type="warning" plain @click="newlcnClick">送货到该地址</el-button>
    </div>
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("user")),
      newR:"",
      newP:"",
      newA:"",
    }
  },
  methods: {
    oldlcnClick: function() {
      let query = {
        recipient: this.user.recipient,
        phone: this.user.phone,
        address: this.user.address,
      }
      this.$router.push({ path: '/pay', query: query })
    },
    newlcnClick: function() {
      let query = {
        recipient: this.newR,
        phone: this.newP,
        address: this.newA,
      }
      this.$router.push({ path: '/pay', query: query })
    }
  }
}
</script>

<style scoped>
  .step{
    margin-top: 30px;
  }
  .address-ct{
    width: 60%;
    margin: 0 auto;
  }
  .address-title-ct{
    border-block-end: solid orange 2px;
  }
  .address-self{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    font-size: 20px;
    padding: 15px;
  }
  .el-button{
    margin-top: 20px; 
    display: block;
  }
  .address-new{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 15px;
    margin-top: 25px;
  }
  .address-new input{
    width: 40%;
  }
</style>