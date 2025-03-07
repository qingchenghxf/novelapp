<script>

	// #ifdef APP-PLUS
	import checkappupdate from '@/js_sdk/wonyes-checkappupdate/wonyes/checkappupdate.js'
	// #endif
export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		try{
			// checkappupdate.check({
			// 	title:"检测到有新版本！",
			// 	content:"请升级app到最新版本！",
			// 	canceltext:"暂不升级",
			// 	oktext:"立即升级",
			// 	api:'http://book.wonyes.org/update.php'
			// })
		}catch(e){
			//TODO handle the exception
		}
		// #endif
	},
	onShow: function(options) {},
	onHide: function() {},
	onError: function(msg) {}
};
</script>

<style lang="scss">
@import 'uview-ui/index.scss';
[v-cloak] {
	display: none !important;
}

.book {
	height: 300rpx;
	border-bottom: 1px solid #eee;
	background: white;
	display: flex;
	
}
.book image {
	height: 250rpx;
	width: 175rpx;
	margin: 25rpx;
	box-shadow: 1px 1px 4px #666666;
}
.book_info {
	
	height: 100%;
	width: 70%;
	
}
.title {
	font-size: 30rpx;
	font-weight: bold;
	display: block;
	margin: 26rpx 0 10rpx 0;
}
.author {
	font-size: 24rpx;
	color: #888;
	display: block;
	margin-bottom: 10rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.intro {
	font-size: 24rpx;
	color: #333;
	height: 105rpx;
	ext-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
	line-height: 35rpx;
}

.loading {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	font-size: 30rpx;
}
</style>
