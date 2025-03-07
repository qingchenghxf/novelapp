<template>
	<view class="main">
		<u-tabs :list="cates" :is-scroll="true" :show-bar="true" :current="current" @change="change"></u-tabs>
		<!-- 新书上架 -->
		<view class="listbook">
			<navigator v-for="(item, index) in cates[current]['books']" :key="index" :url="'/pages/bookinfo/bookinfo?id=' + item.id" class="book">
				<image :src="item.pic?item.pic:'/static/nopic.jpg'" lazy-load></image>
				<view class="book_info">
					<text class="title">{{ item.name }}</text>
					<text class="author">作者：{{ item.author }} | 类别：{{ item.c_name }}</text>
					<text class="intro">简介：{{ item.summary }}</text>
					<u-tag type="error" shape="square" size="mini" :text="item.status == 1 ? '已完结' : '连载中'" mode="plain" />
				</view>
			</navigator>
		</view>
		<u-divider class="loading" id="loading" v-if="loading">{{ loadtext }}</u-divider>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>
<script>
export default {
	data() {
		return {
			scrollTop:0,
			cates: [{ books: [] }],
			current: 0,
			loading: false,
			loadtext: '加载中'
		};
	},
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
	onLoad: function() {
		var user = uni.getStorageSync('user');
		this.getList();
	},
	onReachBottom() {
		if (!this.loading) {
			this.getNewest();
		}
	},
	methods: {
		/**
		 * 获取分类
		 */
		getList: function() {
			var self = this;
			this.$u.api
				.getCategorys()
				.then(res => {
					if (res.status !== 0) {
						return this.$u.toast(res.msg);
					}
					console.log(res.data);
					uni.setStorage({
						key:"allcategorys",
						data:res.data
					})
					let categorys=[];
					res.data.forEach((item, i) => {
						categorys[i]={books:[],name:item.name,id:item.cid,page:1}
					});
					this.cates=categorys;
					this.getNewest();
				})
				.catch(err => {
					console.log(err);
				});
		},

		getNewest: function() {
			if (this.loading) {
				return;
			}

			this.loadtext = '加载中';
			this.loading = true;
			var self = this;
			this.$u.api
				.getByCid({
					size: 20,
					page: this.cates[this.current].page,
					cid: this.cates[this.current].id
				})
				.then(res => {
					if (res.status !== 0) {
						return this.$u.toast(res.msg);
					}
					this.cates[this.current].page++;
					if (res.data.length < 1) {
						this.loadtext = '没有了';
						return;
					}
					this.cates[this.current].books = this.cates[this.current].books.concat(res.data);
					this.loading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},
		change(val) {
			this.current = val;
			if (this.cates[this.current]['books'].length < 1) {
				this.loadtext = '加载中';
				this.loading = false;
				this.getNewest();
			}
		}
	}
};
</script>
<style>
.main {
	padding-top: var(--status-bar-height);
}
</style>
