<template>
	<view class="main">
		<u-navbar :is-back="false" title="我的书架"></u-navbar>
		<scroll-view scroll-y v-if="mybooks.length">
			<u-swipe-action class="enabled_left_move" :show="item.show" :index="index" v-for="(item, index) in mybooks" :key="item.id" @click="click" :options="options">
				<navigator  :url="'/pages/read/read?id=' + item.id" class="book">
					<image class="cover" :src="item.pic?item.pic:'/static/nopic.jpg'"></image>
					<view class="book_info">
						<text class="title">{{ item.name }}</text>
						<text class="author">已读{{ item.progress ? item.progress : '0.00' }}% | 作者：{{ item.author }} | 类别：{{ item.c_name }}</text>
						<text class="intro u-tips-color">简介：{{ item.summary.replace(/[\s|\*|\.|·\-\——]*/g,'') }}</text>
						<view class="subject" v-if="item.lastzjlist && item.lastzjlist.length>0">
							最新:{{ item.lastzjlist[0]['name'] }}
						</view>
					</view>
				</navigator>
			</u-swipe-action>
		</scroll-view>
		<navigator class="no_book_tips" hover-class="none" url="../category/category" open-type="switchTab" v-else><u-icon name="plus" color="#ddd" size="100"></u-icon></navigator>
	</view>
</template>

<script>
import {getItem,setItem,removeItem} from '@/common/appcomact.js';


export default {
	data() {
		return {
			no_book_tips: '还没有添加图书,立即去添加',
			mybooks: [],
			mybookids: [],
			localbookids: [], //本地图书id，书名md5
			startX: 0,
			remove_index: -1,
			left: '0rpx',
			bookWidth: 150,
			show: false,
			menu: [
				{
					text: '导入本地图书',
					color: '#2979ff',
					fontSize: 38
				}
			],
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},

	onLoad: function() {
		console.log("myuid="+this.vuex_uid);
	},
	onShow: function() {
		let hasid = uni.getStorageSync('bookstore');
		let self = this;
		if (!hasid) {
			this.mybookids = [];
			let localbooks = [];
			this.mybooks.forEach(it => {
				if (it.source == 'local') {
					localbooks.push(JSON.parse(JSON.stringify(it)));
				}
			});
			this.mybooks = localbooks;
		} else if (hasid.join('.') != this.mybookids.join('.')) {
			// 有变化
			this.mybookids = hasid;
			hasid.forEach(it => {
				uni.getStorage({
					key: 'bookstore-' + it,
					success: function(res) {
						if (res.data && !self.inmybooks(res.data.id)) {
							// 只有当hasid中对应图书不在 this.mybooks中才压入
							self.mybooks.push(res.data);
						}
					}
				});
			});
			// 当前图书不存在与 hasid中，需要删除
			for (let i = 0, len = this.mybooks.length; i < len; i++) {
				if (this.mybooks[i].source == 'local') {
					continue;
				}
				let pos = hasid.indexOf(this.mybooks[i]['id']);
				if (pos === -1) {
					this.mybooks.splice(pos, 1);
				}
			}
		}
		// #ifdef APP-PLUS
		
		plus.navigator.setFullscreen(false);
		// #endif
	},
	methods: {
		click(index) {
			let b = this.mybooks[index] 
			let book_id=b.id;
			let source=b.source
			var self = this;
			uni.showModal({
				title: '是否移出书架？',
				content: '将会删除该书的阅读记录',
				success: res => {
					if (res.confirm) {
						this.mybooks.splice(index, 1);
						// 先从 mybooks 里删掉该书
						for (let i = 0, len = self.mybooks.length; i < len; i++) {
							if (self.mybooks[i].id == book_id) {
								self.mybooks.splice(i, 1);
								break;
							}
						}

		

						// 网络图书
						let hasid = uni.getStorageSync('bookstore');
						hasid=hasid?hasid:[]
						let pos = hasid.indexOf(parseInt(book_id));
						// 当前删除
						if (pos > -1) {
							hasid.splice(pos, 1);
							uni.setStorageSync('bookstore', hasid);
							this.mybookids = hasid;
						}
					}
				}
			});
		},
		showact() {
			uni.hideTabBar();
			this.show = true;
		},
		hideact() {
			this.show = false;
			setTimeout(() => {
				uni.showTabBar();
			}, 300);
		},

		inmybooks(id) {
			for (let i = 0, len = this.mybooks.length; i < len; i++) {
				if (id == this.mybooks[i]['id']) {
					return true;
				}
			}
			return false;
		}
	
	}
};
</script>
<style>
.no_book_tips {
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 600rpx;

	line-height: 600rpx;
	color: #888;
}
.enabled_left_move {
	position: relative;
}
.book .cover {
	box-shadow: none;
}
.book_info{
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.book .subject{
	word-wrap: break-word;
	white-space: nowrap;
	width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
