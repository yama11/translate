<script>
/**
 * @overview 登录页面
 *
 * @author suyanping
 */

export default {
  name: 'Login',

  data() {
    return {
      user: {
        account: '',
        password: '',
      },

      rules: {
        account: [
          this.$rules.required('账号'),
        ],
        password: [
          this.$rules.required('密码'),
        ],
      },

      submitLoading: false,
    };
  },

  computed: {
    style() {
      return { 'background-image': 'url("./../static/login.jpg")' };
    },
  },

  mounted() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('userName');
  },

  methods: {
    preSubmit() {
      this.$router.push('/home-list');

      // localStorage.userName = '测试';
      // this.$refs.form.validate((valid) => {
      //   if (!valid) return;

      //   this.submitLoading = true;

      //   this.newUser = JSON.parse(JSON.stringify(this.user));

      //   this.$http.post('/login/login/', this.user)
      //     .then((res) => {
      //       localStorage.userName = res.data.userName;
      //       localStorage.type = Number(res.data.userType);

      //       this.$router.push('/home-list');
      //     })
      //     .catch((error) => {
      //       this.$message.error(error.errMsg);
      //     })
      //     .finally(() => {
      //       this.submitLoading = false;
      //     });
      // });
    },
  },
};
</script>

<template>
  <div
    :style="style"
    class="login">
    <div class="login__panel">
      <header>
        WebComics
        <br>
        翻译平台
      </header>

      <el-form
        ref="form"
        :model="user"
        :rules="rules"
        class="login__form"
        @keydown.enter.native="preSubmit"
      >
        <el-form-item
          prop="account"
        >
          <el-input
            v-model="user.account"
            type="text"
            auto-complete="off"
            placeholder="请输入用户名"
          />
        </el-form-item>

        <el-form-item
          prop="password"
        >
          <el-input
            v-model="user.password"
            type="password"
            auto-complete="off"
            placeholder="请输入密码"
          />
        </el-form-item>

      </el-form>

      <el-button
        :loading="submitLoading"
        type="primary"
        @click="preSubmit"
      >
        登录
      </el-button>

    </div>
  </div>
</template>

<style lang="postcss">
:root {
  --login-panel-right: calc((41% - 420px) / 2);
}

.login {
  width: 100%;
  text-align: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  display: flex;
  position: relative;
}

.login__panel{
  width: 500px;
  height: 300px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  background: #DCD7D7;
  position: absolute;
  top: 150px;
  left: calc((100% - 400px) / 2);
}

.login__panel header{
  font-size: 28px;
  margin: 20px 0;
}

.login__panel form{
  width: 250px;
  margin-left: 125px;
}

.login__panel .el-button{
  width: 100px;
}
</style>
