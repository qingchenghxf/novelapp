<template>
	<view class="main">
		<u-navbar  :title="'[' + keyword + ']的搜索结果'"></u-navbar>
		<view class="listbook" v-if="books.length > 0">
			<view class="title u-padding-left-10">
				找到相关图书
				<text class="u-main-color">【{{ counts }}】</text>
				部
			</view>
			<navigator v-for="(item, index) in books" :key="index" :url="'/pages/bookinfo/bookinfo?id=' + item.id" class="book">
				<image :src="item.pic?item.pic:'/static/nopic.jpg'" lazy-load></image>
				<view class="book_info">
					<text class="title" :class="item.name.indexOf(keyword) > -1 ? 'u-main-color' : ''">{{ item.name }}</text>
					<text class="author" :class="item.author.indexOf(keyword) > -1 ? 'u-main-color' : ''">作者：{{ item.author }} | 类别：{{ item.c_name }}</text>
					<text class="intro">简介：{{ item.summary }}</text>
					<u-tag type="error" shape="square" size="mini" :text="item.status == 1 ? '已完结' : '连载中'" mode="plain" />
				</view>
			</navigator>
		</view>
		<u-empty :text="!keyword ? '请输入搜索关键字' : '没有搜索到相关图书'" mode="list" v-else></u-empty>
		<u-divider class="loading" id="loading" v-if="loading">{{ loadtext }}</u-divider>
	</view>
</template>
<script>
export default {
	data() {
		return {
			// 当前显示
			books: [],
			loading: false,
			loadtext: '加载中',
			page: 1,
			keyword: '',
			counts: 0
		};
	},
	onReachBottom() {
		if (!this.loading) {
			this.getSearch();
		}
	},

	/**
	 * 加载完钩子
	 */
	onLoad: function(opt) {
		if (opt.keyword) {
			this.keyword = opt.keyword;
			this.getSearch();
		}
	},
	methods: {
		/**
		 * 获取最新图书
		 */
		getSearch: function() {
			if (this.loading) {
				return;
			}
			this.loadtext = '加载中';
			this.loading = true;
			var self = this;
			this.$u.api
				.getSearch({
					size: 20,
					page: this.page,
					keyword: this.keyword
				})
				.then(res => {
					if (res.status !== 0) {
						return this.$u.toast(res.msg);
					}
					if (this.page == 1) {
						this.counts = res.data.count;
					}
					this.page++;
					if (res.data.books.length < 1) {
						this.loadtext = '没有了';
						return;
					}
					this.books = this.books.concat(res.data.books);
					this.loading = false;
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>
<style></style>
