<template>
	<view class="main">
		<u-navbar title="最近浏览"></u-navbar>
		<block v-for="(item,index) in mybooks" :key="index">
				<navigator  :url="'/pages/bookinfo/bookinfo?id=' + item.id" class="book">
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
		</block>
		<navigator class="no_book_tips" hover-class="none" url="../category/category" open-type="switchTab" v-if="mybooks.length<1">暂无浏览记录</navigator>
	</view>
</template>

<script>
import {getItem,setItem,removeItem} from '@/common/appcomact.js';


export default {
	data() {
		return {
			mybooks: [],
			mybookids: [],
			left: '0rpx',
			bookWidth: 150,
			show: false
		};
	},

	onLoad: function() {
		console.log("myuid="+this.vuex_uid);
	},
	onShow: function() {
		let hasid = uni.getStorageSync('viewhistory');
		
		console.log(hasid);
			// 有变化
			this.mybookids = hasid;
			let books=[];
			hasid.forEach(it => {
				books.push(uni.getStorageSync('bookstore-' + it));
			});
			this.mybooks=books
	},
	methods: {

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
