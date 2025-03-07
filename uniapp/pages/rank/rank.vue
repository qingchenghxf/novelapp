<template>
	<view class="main">
		<u-tabs :list="cates" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<!-- 新书上架 -->
		<view class="listbook">
			<navigator v-for="(item, index) in cates[current]['books']" :key="index" :url="'/pages/bookinfo/bookinfo?id=' + item.id" class="book">
				<image :src="item.pic?item.pic:'/static/nopic.jpg'" lazy-load></image>
				<view class="book_info">
					<text class="title">{{ item.name }}</text>
					<text class="author">{{ item.author }} | {{ item.c_name }} | {{ item.views }}人在读</text>
					<text class="intro">简介：{{ item.summary }}</text>
					<view>
						<u-tag type="error" shape="square" :text="item.status == 1 ? '已完结' : '连载中'" mode="light" size="mini" font-size="20" />
						<text class="u-tips-color u-margin-left-5">{{ item.update_time }}更新</text>
					</view>
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
			cates: [
				{
					books: [],
					name: '人气榜',
					type: 'views',
					page: 1
				},
				{
					books: [],
					name: '新书榜',
					type: 'create_time',
					page: 1
				},
				{
					books: [],
					name: '完结榜',
					type: 'status',
					page: 1
				},
				{
					books: [],
					name: '更新榜',
					type: 'update_time',
					page: 1
				}
			],
			current: 0,
			allcount: 0,
			loading: false,
			loadtext: '加载中'
		};
	},
	onLoad: function() {
		var user = uni.getStorageSync('user');
		this.getRank();
	},
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},

	onReachBottom() {
		if (!this.loading) {
			this.getRank();
		}
	},
	methods: {
		getRank: function() {
			if (this.loading) {
				return;
			}

			this.loadtext = '加载中';
			this.loading = true;
			var self = this;
			this.$u.api
				.getRankList({
					size: 10,
					page: this.cates[this.current].page,
					type: this.cates[this.current].type
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
				this.getRank();
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
