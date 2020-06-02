<template>
    <div class="regbox">
        <div class="reg-container">
            <div class="reg-top">
                <h1>欢迎注册</h1>
                <span>
                    已有帐号？
                    <router-link to="/login">登录</router-link>
                </span>
            </div>
            <from class="reg-form">
                <div class="reg-warn">
                    <p id="reg-warn" style="color:darkblue">{{warn}}</p>
                </div>
                <section>
                    <label>账号</label>
                    <input type="text"  placeholder="请设置账号" v-model="name" maxlength="20">
                </section>
                <section>
                    <label>密码</label>
                    <input type="password" placeholder="请设置密码(8-20位)" v-model="pwd" maxlength="20">
                </section>
                <section>
                    <label>确认</label>
                    <input type="password" placeholder="请再设置一次密码(8-20位)" v-model="pwd_2" maxlength="20">
                </section>
                <div>
                    <el-button type="primary" round @click="regsub">注 册</el-button>
                </div>
            </from>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
    data(){
        return{
            name: "",
            pwd: "",
            pwd_2: "",
            warn: "",
        }
    },
    methods:{
        regsub: function(){
            if (! this.name) {
                this.warn = "请输入账号，账号不能为空！"
                return false
            }
            if (! this.pwd) {
                this.warn = "请输入密码，密码不能为空！"
                return false
            }
            if (this.pwd.length < 8) {
                this.warn = "密码不能小于8位！"
                return false
            }
            if (this.pwd !== this.pwd_2) {
                this.warn = "两次密码不一致！"
                return false
            }
            let postData = qs.stringify({ "name": this.name, "pwd": this.pwd })
            axios
                .post('http://localhost:8082/cloudtopback/api/register_api.jsp',postData)
                .then( response => {
                    if ( ! response.data ) {
                        this.warn = "用户名已存在！"
                    }
                    else {
                        this.$message({
                            message: `注册成功！`,
                            type: 'success'
                        });
                        this.$router.push('/login')
                    }
                })
                .catch( () => (console.error()) )
        }
    }
}
</script>

<style scoped>
    .regbox{
      background-image: linear-gradient(to bottom right, white , rgba(57, 160, 245, 0.185));

    }
    .reg-container{
      width: 30%;
      margin:0 auto;
      margin-top: 150px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, .322), 0 0 6px rgba(0, 0, 0, .04);
      padding: 30px;
    }
    section,h1,span,label,p{
      margin: 10px;
    }
    .el-button{
      margin-top: 20px;
      margin-left: 10px;
    }
    input{
      height: 25px;
    }
</style>