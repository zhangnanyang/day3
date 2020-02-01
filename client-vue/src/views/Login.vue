<template>
    <div class="about">
        <van-field v-model="username" placeholder="请输入用户名" />
        <van-field v-model="password" placeholder="请输入密码" />

        <van-button type="primary" v-show="isShow" @click="headleL('/login')">
            登录
        </van-button>
        <p v-show="isShow" @click="isShow = !isShow">没有账号，去注册</p>

        <van-button type="danger" v-show="!isShow" @click="headleL('/register')">
            注册
        </van-button>
        <p v-show="!isShow" @click="isShow = !isShow">已有账号，去登录</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: true,
            username: '',
            password: '',
        };
    },
    methods: {
        async headleL(api) {
            let { username, password, http, $router, isShow } = this;
            if (username === '') return alert('账号不能为空');
            if (password === '') return alert('密码不能为空');
            let res = await http(api, { username, password }, 'post');
            let { code, msg, data } = res.data;
            alert(msg);
            // 登陆
            if (code === 1) {
                localStorage.setItem('token', data.token);
                $router.push('/home');
            }
            // 注册
            if (code === 2) {
                isShow = !isShow;
                console.log(isShow);
            }
        },
    },
};
</script>
