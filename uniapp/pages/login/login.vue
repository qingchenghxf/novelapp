<template>
	<view class="wrap">
		<u-navbar  title="登录&注册"></u-navbar>
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录书趣app</view>
			<input class="u-border-bottom" type="text" v-model="username" placeholder="请输入用户名" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<view class="tips">未注册的用户名将自动创建账号</view>
			<u-button type="primary" @click="submit">立即登录</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password:""
		}
	},

	methods: {
		submit() {
			if(this.username.length<3 ||this.password.length<3 ){
				this.$u.toast('用户名和密码长度不得小于3');
				return
			}
			this.$u.api.loginto({
					username:this.username,
					password:this.password
				})
				.then(res => {
					if (res.status !== 0) {
						return this.$u.toast(res.msg);
					}
					this.$u.toast("登录成功")
					this.$u.vuex("vuex_userinfo",res.data.userinfo);
					this.$u.vuex("vuex_uid",res.data.userinfo['id']);
					this.$u.vuex("vuex_token",res.data.token);
					uni.navigateBack({
						
					});
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding-top: 40px;
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		.u-border-bottom {
			text-align: left;
			padding-bottom: 8px;
			padding-top: 8px;
			margin: 10px auto 10px;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 20rpx;
		}
	
	}
}
</style>
