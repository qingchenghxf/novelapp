<template>
	<view class="content">
		<view class="" v-for="(item, index) in list" :key="index" :name="item.name">
			<view>【{{ item.humansize }}】:{{ item.name }}</view>
		</view>

		<view class="u-flex u-margin-top-25 ">
			<view class="u-flex-1 u-padding-right-10"><button type="default" @click="checkedAll()">全选</button></view>
			<view class="u-flex-1 u-padding-left-10" @click="ceshi"><button type="primary">导入</button></view>
		</view>
	</view>
</template>

<script>
import md5 from '@/common/md5.js';

export default {
	data() {
		return {
			list: [],
			isall: false
		};
	},
	onLoad() {
		try {
			this.getTxtList();
		} catch (e) {
			console.log(e);
			//TODO handle the exception
		}
	},
	methods: {
		getTxtList() {
			uni.showLoading({
				title: '扫描中请稍等...'
			});
			let self = this;
			// 读取地址
			const local = 'file:///storage/emulated/0/';
			const MD_RegExp = /\.txt$/;
			const spot_Reg = /^\./;
			try {
				plus.io.resolveLocalFileSystemURL(local, directoryEntry => {
					// 设置文件路径
					const fullPath = directoryEntry.fullPath;
					// 设置文件获取列表
					// const fileList = [];
					// 设置文件夹映射表
					const directory = {};
					// 递归获取文件
					const next = directoryEntry => {
						// 获取文件夹信息
						let directoryReader = directoryEntry.createReader();
						// 获取文件列表信息
						directoryReader.readEntries(
							entries => {
								//  entries[0].isDirectory true 是文件夹  false 是文件
								// entries[0].isFile true 是文件  false 是文件夹
								for (let i = 0; i < entries.length; i++) {
									try {
										// 是文件夹 并且 不是隐藏文件 并且 文件夹映射列表里没有  则递归判断
										if (entries[i].isDirectory && !spot_Reg.test(entries[i].name) && !directory[entries[i].name]) {
											// 读取文件夹信息
											entries[i].getMetadata(
												msg => {
													// 如果文件夹中有内容则递归执行
													directory[entries[i].name] = msg;
													if (msg.directoryCount > 0 || msg.fileCount > 0) {
														// 递归查找
														next(entries[i]);
													}
												},
												err => {
													console.log(err);
												}
											);
										} else if (entries[i].isFile && MD_RegExp.test(entries[i].name)) {
											// 获取文件信息 并插入
											// entries[i].file(file => {
											// 	if (file.size > 102400) {
											// 		file['checked'] = false;
											// 		file['disabled'] = false;
											// 		file['humansize'] =
											// 			(file.size > 1048576 ? file.size / 1024 / 1024 : file.size / 1024).toFixed(2) + (file.size > 1048576 ? 'MB' : 'KB');
											// 		self.list.push(file);
											// 	}
											// });
										}
									} catch (e) {
										console.log(e);
									}
								}
							},
							err => {
								console.log(err);
							}
						);
					};
					// 递归执行 获取数据
					next(directoryEntry);
				});
			} catch (e) {
				//TODO handle the exception
			}
			uni.hideLoading();
		},
		// 选中某个复选框时，由checkbox时触发
		checkboxChange(e) {
			console.log(e);
		},
		// 选中任一checkbox时，由checkbox-group触发
		checkboxGroupChange(e) {
			console.log(e);
		},
		// 全选
		checkedAll() {
			this.list.map(val => {
				val.checked = this.isall ? false : true;
			});
			this.isall = !this.isall;
		},
		ceshi() {
			console.log('ecshi');
		},
		daorubook() {
			console.log('doaru');
			// 获取需要被导入的信息
			let hasids = [];
			// this.list.map(val => {
			// 	if(val.checked){
			// 		hasids.push(md5(val.name))
			// 	}
			// });
			console.log(hasids);
		}
	}
};
</script>

<style>
.content {
	padding: 10px;
}
</style>
