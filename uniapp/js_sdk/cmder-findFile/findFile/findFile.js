export default function getLocalListFile(callback) {
	// 读取地址
	const local = "file:///storage/emulated/0/";
	const MD_RegExp = /\.txt$/;
	const spot_Reg = /^\./;
	plus.io.resolveLocalFileSystemURL(local, (directoryEntry) => {
		// 设置文件路径
		const fullPath = directoryEntry.fullPath;
		// 设置文件获取列表
		const fileList = [];
		// 设置文件夹映射表 
		const directory = {};
		// 递归获取文件
		const next = (directoryEntry, callback) => {
			// 获取文件夹信息
			let directoryReader = directoryEntry.createReader();
			// 获取文件列表信息
			directoryReader.readEntries((entries) => {
				//  entries[0].isDirectory true 是文件夹  false 是文件
				// entries[0].isFile true 是文件  false 是文件夹
				for (let i = 0; i < entries.length; i++) {
					try{
						// 是文件夹 并且 不是隐藏文件 并且 文件夹映射列表里没有  则递归判断
						if (entries[i].isDirectory && !spot_Reg.test(entries[i].name) && !directory[entries[i].name]) {
							// 读取文件夹信息
							entries[i].getMetadata((msg) => {
								// 如果文件夹中有内容则递归执行
								directory[entries[i].name] = msg;
								if (msg.directoryCount > 0 || msg.fileCount > 0) {
									// 递归查找
									next(entries[i], callback);
								}
							}, (err) => {
								return callback(err, null);
							})
						} else if (entries[i].isFile && MD_RegExp.test(entries[i].name)) {
							// 获取文件信息 并插入
							entries[i].file((file) => {
								fileList.push(file)
							})
						}
					}catch(e){
						//TODO handle the exception
					}
				}
			}, err => {
				return callback(err, null);
			})
			return callback(null, fileList)
		}
		// 递归执行 获取数据
		next(directoryEntry, (err, filelist) => {
			if (err) callback && callback(err, null);
			callback && callback(null, filelist);
		});
	});
}
