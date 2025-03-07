<template>
	<view>
		<u-navbar  title="设置"></u-navbar>

		<u-upload ref="uUpload" @on-success="okay" upload-text="选择头像图片" :form-data="token" :action="action" :auto-upload="true" max-count="1"></u-upload>

		<view  class="innert">
			<u-field v-model="oldpass" label="原密码" placeholder="请填原旧密码"></u-field>
			<u-field v-model="newpass" label="新密码" placeholder="请填写新密码"></u-field>
			<u-button  @click="editpass">确认修改密码</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			action: this.apidomain + '/member/uploadavatar',
			filesArr: [],
			token: {
				token: this.vuex_token,
				userid: this.vuex_uid
			},
			oldpass:"",
			newpass:""
		};
	},
	onLoad() {
		this.token.token = this.vuex_token;
		this.token.userid = this.vuex_uid;
	},
	methods: {
		submit() {
			console.log('submit');
			let files = [];
			// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
			files = this.$refs.uUpload.lists.filter(val => {
				return val.progress == 100;
			});
			// 如果您不需要进行太多的处理，直接如下即可
			files = this.$refs.uUpload.lists;
			console.log(files);
		},
		okay(data, index, lists, name) {
			console.log('okay end');
			console.log(data);
			let userinfo = this.vuex_userinfo;
			userinfo.avatar = data.data.src;
			this.$u.vuex('vuex_userinfo', userinfo);
			console.log(this.vuex_userinfo);
			console.log(index);
			console.log(lists);
			console.log(name);
		},
		editpass(){
			if(!this.oldpass || !this.newpass){
				return this.$u.toast('新旧密码均不可为空')
			}
			if(this.oldpass==this.newpass){
				return this.$u.toast("新旧密码相同")
			}
			this.$u.api.editpass({
				oldpass:this.oldpass,
				newpass:this.newpass
			}).then(res=>{
				if (res.status !== 0) {
					return this.$u.toast(res.msg);
				}
				// this.$u.toast('修改密码成功，请重新登录');
				this.$u.vuex("vuex_userinfo",{});
				this.$u.vuex("vuex_uid",0);
				this.$u.vuex("vuex_token",'');
				uni.showModal({
					title:"修改密码成功",
					content:"请重新登录",
					success() {
						uni.navigateBack({
							
						})
					}
				})
			}).catch(err=>{
				console.log(err);
			})
		}
	}
};
</script>

<style>
.innert {
	padding: 10px;
}
</style>
