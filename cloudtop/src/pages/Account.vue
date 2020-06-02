<template>
  <div class="account-ct">
    <div class="home-ct" v-if="boxIndex == 0">
      <h1>我的账户</h1>
      <el-button type="info" plain @click="logout">注 销</el-button>
      <div class="items-ct">
        <div class="box" @click="orderClick" @mouseover="mOver($event)"
          @mouseleave="mLeave($event)">
          <i class="el-icon-s-order"><span class="item-title">我的订单</span></i>
          <p>追踪已购物的商品、查看订单情况</p>
        </div>
        <div class="box" @click="goodsClick" @mouseover="mOver($event)"
          @mouseleave="mLeave($event)">
          <i class="el-icon-user-solid"><span class="item-title">商品评价</span></i>
          <p>评价已购买的商品</p>
        </div>
        <div class="box" @click="addressClick" @mouseover="mOver($event)"
          @mouseleave="mLeave($event)">
          <i class="el-icon-location-information"><span class="item-title">地址</span></i>
          <p>编辑地址信息等</p>
        </div>
      </div>
    </div>
    <div class="order-ct" v-if="boxIndex == 1" >
      <h1>我的订单</h1>
      <div class="order-item" v-for="(i,index) in orderData" :key="index">
        <p>订单号：{{i[0].Order_id}}</p>
        <p>收件人：{{i[0].recipient}}</p>
        <p>电话：{{i[0].phone}}</p>
        <p>地址：{{i[0].address}}</p>
        <el-collapse value="o_detail_active" accordion>
          <el-collapse-item title="商品详情——" name="index">
            <div class="order-detail">
              <el-table
                :data="i"
                style="width: 100%">
                <el-table-column
                  prop="Goods_imgUrl"
                  label="商品图片"
                  width="180">
                  <template slot-scope="scope">
                    <img :src="scope.row.Goods_imgUrl" style="width: 50px;height:50px">
                  </template>
                </el-table-column>
                <el-table-column
                  prop="Goods_name"
                  label="商品名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="Goods_num"
                  label="商品数量"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="商品总金额"
                  width="180">
                </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="goods-ct" v-if="boxIndex == 2">
      <h1>商品评价</h1>
      <div class="goods-item" v-for="(i,index) in commentData" :key="index">
        <div class="goods-item-img">
          <img :src="i.Goods_imgUrl" width="150px" height="180px">
        </div>
        <div class="goods-item-name">
          <p style="color: blue; font-size:20px; ">{{i.Goods_name}}</p>
          <span style="background: blue; color: white">#云顶自营</span>
        </div>
        <div class="goods-com-btn">
          <el-button type="primary" icon="el-icon-edit" @click="comClick(index)">评价商品</el-button>
        </div>
        <div class="goods-item-com" v-if="comIndex == index">
          <div>
            <span>评分:</span>
            <el-rate v-model="com_star"></el-rate>
            <p>标题:</p>
            <input type="text" v-model="com_title">
            <p>正文:</p>
            <textarea row="5" cols="40" v-model="com_body"></textarea>
          </div>
          <div style="margin-left:100px;">
            <el-button type="success" @click="comSub(i)">提 交</el-button>
            <el-button type="danger" @click="recall">放 弃</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="address-ct" v-if="boxIndex == 3">
      <h1>您的地址</h1>
      <div class="address-box">
        <div class="address-msg-ct">
          <i class="el-icon-s-custom text" >{{user.recipient}}</i>
          <br>
          <i class="el-icon-phone text">{{user.phone}}</i>
          <br>
          <i class="el-icon-location text">{{user.address}}</i>
          <p>
            <el-button type="primary" plain v-show="l_editIndex == 0"
              @click="() => {l_editIndex = 1}">编辑地址
            </el-button>
          </p>
        </div>
        <i class="el-icon-right" v-if="l_editIndex == 1"></i>
        <div class="address-edit-ct" v-if="l_editIndex == 1">
          <p>收件人姓名</p>
          <input type="text" size="15px" v-model="newR">
          <p>联系电话</p>
          <input type="text" size="30px" v-model="newPhone">
          <p>配送地址</p>
          <input type="text" size="45px" v-model="newAddress">
          <p>
            <el-button type="warning" plain @click="editAddress">修改地址</el-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boxIndex: 0,
      comIndex: -1,
      star: 0,
      l_editIndex: 0,
      orderData: [],
      commentData: [],
      o_detail_active: -1,
      user: JSON.parse(sessionStorage.getItem("user")),
      com_star: 0,
      com_title: "",
      com_body: "",
      newR: "",
      newPhone: "",
      newAddress:"",
    }
  },
  methods: {
    logout (){
      sessionStorage.removeItem("user")
      this.$router.push('/login')
    },
    orderClick: function() {
      this.boxIndex = 1
    },
    o_detial_click(index) {
      this.o_detail_active = index

    },
    goodsClick: function() {
      this.boxIndex = 2
    },
    addressClick: function() {
      this.boxIndex = 3
    },
    mOver($event) {
      $event.currentTarget.className = "box-active";
    },
    mLeave($event) {
      $event.currentTarget.className = "box";
    },
    comClick(index) {
      this.comIndex = index
    },
    recall() {
      this.comIndex = -1
    },
    comSub(i) {
      let postData = this.$qs.stringify({ 
        "User_name": this.user.name, 
        "Goods_name" : i.Goods_name,
        "star": this.com_star,
        "title": this.com_title,
        "body": this.com_body,
      })
      this.$axios
        .post('http://localhost:8082/cloudtopback/api/comment_api.jsp',postData)
        .then( response => {
            this.$message({
                message: `评价成功!`,
                type: 'success'
            });
        })
        .catch( () => (console.error()) )  
    },
    
    editAddress() {
      let postData = this.$qs.stringify({ 
        "recipient": this.newR, 
        "phone": this.newPhone,
        "address": this.newAddress,
        "name": this.user.name, 
      })
      this.$axios
        .post('http://localhost:8082/cloudtopback/api/account_api.jsp',postData)
        .then( response => {
            this.$message({
                message: `修改成功!`,
                type: 'success'
            });
            this.user.recipient = this.newR
            this.user.phone = this.newPhone
            this.user.address = this.newAddress
            sessionStorage.setItem("user",JSON.stringify(this.user))
        })
        .catch( () => (console.error()) )
    }
  },
  mounted() {
    let postData = this.$qs.stringify({ 
      "User_name": this.user.name, 
    })
    this.$axios
      .post('http://localhost:8082/cloudtopback/api/OrderSearch_api.jsp',postData)
      .then( response => {
        //orderData
        let list = response.data
        this.orderData.push( [ list[0] ] )
        for (let i=1; i<list.length; i++) {
          let j = this.orderData.length - 1
          if (list[i].Order_id == list[i-1].Order_id) {
            this.orderData[j].push( list[i] )//对象放入相同的数组
          }
          else {
            this.orderData.push( [ list[i] ])
          }
        }
        //console.log(this.orderData)
        //commentData
        this.commentData.push(list[0])
        for (let i=1; i<list.length; i++) {
          if (list[i].Goods_imgUrl == list[i-1].Goods_imgUrl) {
            continue
          }
          else {
            this.commentData.push( list[i] )
          }
        }
        console.log(this.commentData)
      })
      .catch( () => (console.error()) )
  },

}
</script>

<style scoped>
  .account-ct{
    width: 60%;
    margin: 0 auto;
  }
  .items-ct{
    display: flex;
    text-align: start;
  }
  .item-title{
    font-size: 25px;
    color: gray;
    font-weight: bold;
  }
  i{
    font-size: 35px;
    color: darkblue;
  }
  .box{
    padding: 5%;
    width: 25%;
    margin: 3%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .box-active{
    background: whitesmoke;
    padding: 5%;
    width: 25%;
    margin: 3%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .order-item{
    padding: 3%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  /*商品评价*/
  .goods-item{
    padding: 3%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .goods-item-img{
    width: 30%;
  }
  .goods-item-name{
    width: 50%;
  }
  .goods-com-btn{
    width: 20%;
  }
  .goods-item-com{
    margin-top: 30px;
    width: 80%;
    border-block-start: orange solid 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 30px;
    display: flex;
    align-items: center;
  }
  /*地址*/
  .address-box{
    display: flex;
    padding: 30px;
    align-items: center;
  }
  .address-msg-ct{
    padding: 15px;
    line-height: 35px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .address-edit-ct{
    padding: 15px;
    width: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .text{
    font-size: 25px;
  }
</style>