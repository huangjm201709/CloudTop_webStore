<template>
    <div class="login-container">
        <div class="loginct-top">
            <label>云顶账号登录</label>
        </div>
        <div class="loginct-mid">
            <div class="loginct-warn">
                <span id="login-warn">{{warn}}</span>
            </div>
            <section>
                <label>账号</label>
                <input type="text" placeholder="请输入账号" v-model="name">
            </section>
            <section>
                <label>密码</label>
                <input type="password" placeholder="请输入密码" v-model="pwd">
            </section>
            <br>
            <el-button type="primary" plain @click="loginsub">登 录</el-button>
        </div>
            <div class="loginct-bottom">
                <span class="right">
                    还没有云顶账号？
                    <router-link to="/register">注册账号</router-link>
                </span>
            </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            name: "",
            pwd: "",
            warn: "",
        }
    },
    methods: {
        loginsub: function(){
            if (! this.name) {
                this.warn = "请输入账号！"
                return false
            }
            if (! this.pwd) {
                this.warn = "请输入密码！"
                return false
            }
            let postData = this.$qs.stringify({ "name": this.name, "pwd": this.pwd })
            this.$axios
                .post('http://localhost:8082/cloudtopback/api/login_api.jsp',postData)
                .then( response => {
                    if ( ! response.data ) {
                        this.warn = "账号或密码输入错误！"
                    }
                    else {
                        this.$message({
                            message: `登陆成功,欢迎您!`,
                            type: 'success'
                        });
                        sessionStorage.setItem("user",JSON.stringify(response.data))
                        this.$router.push('/meau')
                    }
                })
                .catch( () => (console.error()) )
        }
    }
}
</script>

<style scoped>
    .login-container{
        width: 30%;
        margin: 0 auto;
        margin-top: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 20px rgba(0, 0, 0, .322), 0 0 6px rgba(0, 0, 0, .04);
    }
    .loginct-top{
        background: powderblue;
        width: 100%;
        text-align: center;
        font-size: 35px;
        padding: 5px;
    }
    .loginct-mid{
        text-align: center;
        font-size: 20px;
        padding: 15px;
    }
    .loginct-bottom{
        width: 100%;
    }
    .right{
        float: right;
    }
    .loginct-warn{
        height: 25px;
    }
    #login-warn{
        text-align: center;
        color: darkorange;
        font-size: 18px;
    }
    section,span,label,p{
      margin: 10px;
    }
    input{
      height: 25px;
    }
    .el-button{
        width: 60%;
        font-size: 20px;
    }
</style>>