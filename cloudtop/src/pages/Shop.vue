<template>
  <div class="shop-ct">
    <div class="shop-title">
          <h1 v-if="this.itemlist.length == 0">您还没添加任何商品到购物车！</h1>
          <h2>购物车</h2>
          <span id="title-p">价格</span>
          <span id="title-num">数量</span>
    </div>
    <div class="shop-item" v-for="(item,index) in itemlist" :key="index">
      <div class="shop-item-img">
        <img :src="item.imgUrl" width="100%" height="100%">
      </div>
      <div class="shop-item-name">
        <p style="color: blue; font-size:20px; ">{{item.name}}</p>
        <span style="background: blue; color: white">#云顶自营</span>
      </div>
      <div class="shop-item-price">
        <p style="color: red; font-size: 30px; text-align: center;">￥{{item.price}}</p>
      </div>
      <div class="shop-item-num">
          <el-button type="success" icon="el-icon-minus" 
          @click="numMinus(index)" class="numBtn"></el-button>
          <input type="number" id="numInput" v-model="item.num">
          <el-button type="success" icon="el-icon-plus" 
          @click="numAdd(index)" class="numBtn"></el-button>
          <el-button type="primary" icon="el-icon-delete" 
          id="itemDel" @click="itemDelete(index)"></el-button>
      </div>

    </div>
    <div class="shop-count">
      <p>小计 ({{totalNum}} 件商品):￥ {{totalP}}</p>
      <el-button type="primary" plain @click="countClick">
        进入结算中心
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      itemlist: JSON.parse( sessionStorage.getItem("itemlist") ) || [],
    }
  },
  methods: {
    countClick: function () {
      if( this.itemlist.length != 0){
        sessionStorage.setItem("totalNum",this.totalNum)
        sessionStorage.setItem("totalP",this.totalP)
        this.$router.push({ path: '/address' })
      }
      else{
        this.$message({
          message: `您还未添加商品进入购物车，无法购买!`,
          type: 'error'
        });
      }
    },
    numAdd: function(i) {
      this.itemlist[i].num ++
    },
    numMinus: function(i) {
      let num = this.itemlist[i].num
      if (num > 1) {
        this.itemlist[i].num --
      }
    },
    itemDelete: function(i) {
      this.itemlist.splice(i,1)
      let listToJson = JSON.stringify(this.itemlist)
      sessionStorage.setItem("itemlist", listToJson)
    }
    
  },
  computed: {
    totalNum: function() {
      let num = 0
      for (let i of this.itemlist) {
        num += i.num
      }
      return num
    },
    totalP: function() {
      let p = 0
      for (let i of this.itemlist) {
        p += i.price * i.num
      }
      return p.toFixed(2)
    }
  }
}
</script>

<style scoped>
  .shop-ct{
    width: 80%;
    margin: 0 auto;
  }
  .shop-title{
    border-block-end: solid darkgray 2px;
  }
  #title-p{
    position: relative;
    left: 65%;
  }
  #title-num{
    position: absolute;
    right: 15%
  }
  .shop-item{
    border-block-end: solid darkgray 2px;
    display: flex;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  .shop-item-img{
    width: 10%;
    height: 150px;
  }
  .shop-item-name{
    margin-left: 2%;
    width: 50%;
  }
  .shop-item-price{
    width: 20%;
  }
  .shop-item-num{
    width: 20%;
    text-align: end;
    margin-top: 30px;
  }
  .shop-count{
    margin-top: 2%;
    text-align: right;
    font-size: 25px;
  }
  .el-button{
    position: relative;
    font-size: 20px;
    width: 25%;
  }
  .el-icon-d-arrow-right{
    position:absolute;
    background: darkblue;
    right: 0;
    color: white;
  }
  .numBtn{
    font-size: 10px;
  }
  .widebtn{
    padding: 10px;
    font-size: 25px;
    width: 60%;
  }
  #numInput{
    width: 30%;
    height: 30px;
  }
  #itemDel{
    margin-top: 30px;
    font-size: 15px;
  }
</style>