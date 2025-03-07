// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数

	// 此处使用了传入的params参数，一切自定义即可
	let getByViews = (params = {}) => vm.$u.post('/api/getbooklistbyviews', params);
	let getByTime = (params = {}) => vm.$u.post('/api/getbooklistbytime', params);
	
	// 图书详情和目录
	let getDetail = (params = {}) => vm.$u.post('/api/getbookinfo', params);
	
	// 首页banner
	let getBanner = (params = {}) => vm.$u.post('/api/getbanner', params);
	
	// 获取分类信息
	let getCategorys = (params = {}) => vm.$u.post('/api/categorylist', params);
	
	// 根据分类名字获取图书
	let getByCname = (params = {}) => vm.$u.post('/api/getbooklistbycategory', params);
	let getByCid = (params = {}) => vm.$u.post('/api/getbooklistbycid', params);
	
	let getRankList = (params = {}) => vm.$u.post('/api/getbooklistbyrank', params);

	let getText = (params = {}) => vm.$u.post('/api/getcontent', params);

	let getSearch = (params = {}) => vm.$u.post('/api/search', params);
	// 更新阅读量
	let updateViews = (params = {}) => vm.$u.post('/api/updateviews', params);
	// 注册or登录
	let loginto = (params = {}) => vm.$u.post('/member/login', params);

	// 修改密码
	let editpass = (params = {}) => vm.$u.post('/member/editpass', params);


	vm.$u.api = {
		getByViews,
		getByTime,
		getBanner,
		getCategorys,
		getByCname,
		getByCid,
		getRankList,
		getDetail,
		getText,
		getSearch,
		updateViews,
		loginto,
		editpass
	};
}

export default {
	install
}
