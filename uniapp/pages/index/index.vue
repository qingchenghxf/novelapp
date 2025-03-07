<template>
	<view class="body">
		<view id="search">
			<u-search bg-color="#fff" border-color="#eee" placeholder="输入书名" :clearabled="true" shape="square" @search="search" :animation="true"></u-search>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots indicator-active-color="#2979ff" autoplay circular class="swiper">
			<swiper-item v-for="(item, index) in banner" :key="index" :alt="item.title">
					<image :src="item.pic" @click="gotourl(item)"></image>
			</swiper-item>
		</swiper>

		<!-- 人气热门 -->
		<view class="listbook">
			<u-section color="#2979ff" class="title" title="热门推荐" :right="false"></u-section>
			<navigator v-for="(item, index) in hotbooks" :key="index" :url="'/pages/bookinfo/bookinfo?id=' + item.id" class="book">
				<image :src="item.pic?item.pic:'/static/nopic.jpg'"></image>
				<view class="book_info">
					<text class="title">{{ item.name }}</text>
					<text class="author">作者：{{ item.author }} | 类别：{{ item.c_name }}</text>
					<text class="intro">简介：{{ item.summary }}</text>
					<u-tag type="warning" :text="item.status == 1 ? '已完结' : '连载中'" mode="plain" shape="square" size="mini" />
				</view>
			</navigator>
		</view>
		<!-- 新书上架 -->
		<view class="listbook">
			<u-section color="#2979ff" class="title" title="新书上架" :right="false"></u-section>
			<navigator v-for="(item, index) in newbooks" :key="index" :url="'/pages/bookinfo/bookinfo?id=' + item.id" class="book">
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
			// 当前显示
			hotbooks: [],
			newbooks: [],
			loading: false,
			loadtext: '加载中',
			page: 1,
			banner: [],
			keyword: '',
			scrollTop:0
		};
	},
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
	},

	onReachBottom() {
		if (!this.loading) {
			this.getNewest();
		}
	},
	onLoad: function() {
		console.log("uid",this.vuex_uid);
		// this.$u.vuex("vuex_uid",100)
		var user = uni.getStorageSync('user');
		this.$u.api
			.getByViews({
				size: 10
			})
			.then(res => {
				if (res.status !== 0) {
					return this.$u.toast(res.msg);
				}
				this.hotbooks = this.hotbooks.concat(res.data);
			})
			.catch(err => {
				console.log(err);
			});
		this.getNewest();
		this.getBanners();
	},

	methods: {
		gotourl(item){
			console.log(item);
			if(/^\d+$/.test(item.url)){
				uni.navigateTo({
					url:"../bookinfo/bookinfo?id=" + item.url
				});
				return;
			}
			
			if(!item.url){
				return false;
			}
			// #ifndef H5
				uni.navigateTo({
					url:"../web/web?url="+decodeURIComponent(item.url)+(item.title?'&title='+decodeURIComponent(item.title):'')
				});
			// #endif
			
			// #ifdef H5
				location.href=item.url;
			// #endif
			
		},
		/**
		 * 获取Banner图
		 */
		getBanners: function(times) {
			var self = this;
			this.$u.api
				.getBanner({
					size: 4
				})
				.then(res => {
					if (res.status !== 0) {
						return this.$u.toast(res.msg);
					}
					this.banner = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},

		/**
		 * 获取最新图书
		 */
		getNewest: function() {
			if (this.loading) {
				return;
			}
			this.loadtext = '加载中';
			this.loading = true;
			var self = this;
			this.$u.api
				.getByTime({
					size: 20,
					page: this.page
				})
				.then(res => {
					console.log(res);
					if (res.status !== 0) {
						return this.$u.toast(res.msg);
					}
					this.page++;
					if (res.data.length < 1) {
						this.loadtext = '没有了';
						return;
					}
					this.newbooks = this.newbooks.concat(res.data);
					this.loading = false;
				})
				.catch(err => {
					console.log(err);
				});
		},

		/**
		 * 点击搜索按钮
		 */
		search: function(val) {
			this.keyword = val;
			if (this.keyword != '') {
				uni.navigateTo({
					url: '/pages/searchRes/searchRes?keyword=' + this.keyword
				});
			}
		}
	}
};
</script>
<style>
.body {
	overflow-y: hidden;
}
/*轮播图*/
.swiper {
	height: 300rpx;
}
.swiper image {
	height: 300rpx;
	width: 100%;
}
.listbook {
	margin-bottom: 20px;
}

.title {
	margin-bottom: 10px;
	padding-left: 10px;
}
#loading {
	margin: 25px auto;
}
#search {
	margin-top: var(--status-bar-height);
}
</style>
