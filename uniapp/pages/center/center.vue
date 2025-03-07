<template>
	<view class="wrap">
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1" v-if="vuex_uid<1" @click="gopage('login')">
				<view class="u-font-18 u-p-b-20">请登录</view>
				<view class="u-font-14 u-tips-color">当前游客，登录享更多功能</view>
			</view>
			<view class="u-flex-1" v-else @click="gopage('setting')">
				<view class="u-font-18 u-p-b-20">{{vuex_userinfo.username}}</view>
				<view class="u-font-14 u-tips-color">普通会员</view>
			</view>
			
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="最近浏览" @click="gopage('viewhistory')"></u-cell-item>
				<u-cell-item icon="heart"  @click="$u.toast('开发中')" title="消息通知"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" @click="$u.toast('开发中')"  title="我的书单"></u-cell-item>
				<u-cell-item icon="photo" @click="$u.toast('开发中')"  title="上传作品"></u-cell-item>
				<u-cell-item icon="coupon" @click="$u.toast('开发中')"  title="分享应用"></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20" v-if="vuex_uid>0">
			<u-cell-group>
				<u-cell-item icon="close" title="注销登录" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:true
			}
		},
		computed:{
			pic(){
				return this.vuex_userinfo&&this.vuex_userinfo.avatar?this.vuex_userinfo.avatar:'/static/imgs/center.png'
			}
		},
		onLoad() {
			console.log(this.vuex_uid);
		},
		methods: {
			logout(){
				this.$u.vuex('vuex_userinfo',{});
				this.$u.vuex('vuex_uid',0);
			},
			gopage(type){
				uni.navigateTo({
					url:"../"+type+"/"+type
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	// background-color: #ededed;
}
.wrap{
	padding-top: 50px;
}
.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
</style>
