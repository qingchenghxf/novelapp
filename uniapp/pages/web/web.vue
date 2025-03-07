<template>
	<view><web-view :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	onShow() {
		
	},
	onLoad(obj) {
		this.url = decodeURIComponent(obj.url);
		if(obj.title){
			uni.setNavigationBarTitle({
				title: decodeURIComponent(obj.title)
			});
		}else{
			uni.setNavigationBarTitle({
				title:"网页"
			});
		}
	},
	methods: {}
};
</script>

<style></style>
