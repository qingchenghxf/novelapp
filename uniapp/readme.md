## 已完成的功能

1. 小说列表
2. 排行榜
3. 分类显示
4. 添加书架
5. 阅读界面翻页效果
6. 搜索
7. 会员登录注册模块
8. 后端接口
9. 已开源简单后端管理系统(分类管理、小说管理、章节管理、导入txt、banner等)
![](https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/8486d930-8583-11eb-9d18-53054d3876a9_4.png?image_process=quality,q_70/format,webp&v=1645716102)
10. 桌面采集软件(有偿)
![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-03752401-f782-4c80-b46b-b8b69bd129f8/ec5fa7b6-f128-4560-8bc4-f7fc9b3d7093.png)


## 手机扫码安装演示app

![扫码下载演示app](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-03752401-f782-4c80-b46b-b8b69bd129f8/46f3bf59-5faf-4260-8936-2d8b83c7c2df.png)

[点击下载演示apk](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-03752401-f782-4c80-b46b-b8b69bd129f8/71be3564-4c52-4526-b891-cc941a04299e.apk)



## 后端系统已实现功能(基于thinkphp6)

1. 小说分类管理
2. 小说图书管理：添加、删除、编辑、封面等
3. 小说章节管理：添加、删除等
4. txt整本导入
5. banner管理
6. ...待完善


**[h5端演示](http://bappdemo.wonyes.org/wonyesadmin/readapp.html)**

**[后端演示，admin，123456](http://bappdemo.wonyes.org/wonyesadmin)**

**[后端开源代码](https://gitee.com/jameson512/novelappbackend)**


## app前端使用方法


目前完整功能可下载安装演示app，效果一样，导入HBuilerx 3+ 后，直接真机调试运行即可看到效果，后端演示接口目前可用，返回信息固定

1. 打开源码 main.js ，修改接口域名为你自己的，目前的测试域名随时下线

2. 安装后端系统，[https://gitee.com/jameson512/novelappbackend](https://gitee.com/jameson512/novelappbackend) 


## 后端使用方法

后端基于thinkphp6，部署方式同tp6，可自行百度 thinkphp6 部署

0. 首先下载后端代码 [https://gitee.com/jameson512/novelappbackend](https://gitee.com/jameson512/novelappbackend) ，并上传到服务器

1. 创建站点，并将网站根目录指向后端代码的 public 目录

2. 在伪静态配置文件中添加 

``` 
location / {
	if (!-e $request_filename){
		rewrite  ^(.*)$  /index.php?s=$1  last;   break;
	}
}

```

3. 创建数据库，并导入 sql/bappdemmo.sql

4. 修改 .env 文件，填写上一步创建的数据库信息

5. 修改 public/wonyesadmin/config/pear.config.json 最底部的 api:baseurl,为你的域名

6. 在hbuildx中发行h5版，并将编译后的h5文件夹上传到 public/h5 下

7. 后端访问地址  你的域名/wonyesadmin  默认管理员admin，密码 123456



## api接口 及返回数据格式

>
>	// 按照阅读次数获取图书列表
>	getByViews
>	
>	// 按照图书上架时间倒序
>	getByTime
>	
>	// 根据分类名字或分类id获取图书
>	getByCname getByCid 
>	
>	// 排行
>	getRankList
>	
>	//搜索
>	getSearch

以上几种接口返回json格式一致
```
{
    "status": 0,
    "msg": "ok",
    "data": [
        {
            "id": 162,
            "name": "书穿后抱上男二金大腿",
            "zjnums": 20,
            "author": "兔子幺幺",
            "create_time": "2022-02-09 16:57:58",
            "update_time": "2022-02-09 16:57:58",
            "status": 0,
            "pic": "https:\/\/img.bige7.com\/bookimg\/17396.jpg",
            "views": 0,
            "summary": "书穿搞笑身心双洁专情无狗血梗娇宠抱上男二金大腿后，幸韵星成了摄政王妃！幸韵星以为自己一辈子的运气全都用在了名字上，一朝穿成书中招黑女配，幸韵星可不想落得个悬梁自尽、被赐毒酒、遭万人\r",
            "c_name": "修真",
            "length": 34996,
            "cid": 2
        },
        {
            "id": 164,
            "name": "九叔之茅山真传",
            "zjnums": 17,
            "author": "五穷",
            "create_time": "2022-02-09 16:57:58",
            "update_time": "2022-02-09 16:57:58",
            "status": 0,
            "pic": "https:\/\/img.bige7.com\/bookimg\/7689.jpg",
            "views": 0,
            "summary": "林峰“师傅，咱茅山是不是很厉害啊？”九叔“那当然咯，咱们茅山不光上面有人，下面也有人。”林峰“这么说，我这茅山真传的面子很大咯？”九叔“哼哼，那是，进了阴曹地府，你问问，谁敢不给咱们茅\r",
            "c_name": "修真",
            "length": 57482,
            "cid": 2
        }
    ]
}
```
----

>	// 图书详情和目录
>	getDetail
```
{
    "status": 0,
    "msg": "ok",
    "data": {
        "id": 30,
        "name": "斗罗大陆III龙王传说",
        "zjnums": 93,
        "author": "唐家三少",
        "create_time": "2022-02-09 16:56:59",
        "update_time": "2022-02-09 16:56:59",
        "status": 0,
        "pic": "https:\/\/www.xbiquwx.la\/files\/article\/image\/22\/22522\/22522s.jpg",
        "views": 0,
        "summary": "伴随着魂导科技的进步，斗罗大陆上的人类征服了海洋，又发现了两片大陆。魂兽也随着人类魂师的猎杀无度走向灭亡，沉睡无数年的魂兽之王在星斗大森林最后的净土苏醒，它要带领仅存的族人，向人类复仇！\r",
        "c_name": "玄幻",
        "length": 199943,
        "cid": 1,
        "zjlist": [
            "楔子",
            "第一章 觉醒日",
            "第二章 武魂觉醒",
            "第三章 小舞麟的家",
        ]
    }
}
```
----

>	
>	// 首页banner
>	getBanner
```
{
    "status": 0,
    "msg": "ok",
    "data": [
        {
            "id": 1,
            "pic": "https:\/\/bossaudioandcomic-1252317822.image.myqcloud.com\/activity\/document\/d080c591ff088fab85044dde7b0efc0b.jpg",
            "create_time": "2022-02-08 11:02:42",
            "update_time": "2022-02-08 11:02:42",
            "url": ""
        },
        {
            "id": 2,
            "pic": "https:\/\/bossaudioandcomic-1252317822.image.myqcloud.com\/activity\/document\/2c1ad692591aec7062855aaf1c46601a.jpg",
            "create_time": "2022-02-08 11:02:42",
            "update_time": "2022-02-08 11:02:42",
            "url": ""
        }
    ]
}
```
-----

>	
>	// 获取分类信息
>	getCategorys
>	
```
{
    "status": 0,
    "msg": "ok",
    "data": [
        {
            "cid": 1,
            "count": 9,
            "name": "玄幻"
        },
        {
            "cid": 2,
            "count": 21,
            "name": "修真"
        }
    ]
}
```
----

>	// 章节内容
>	
>	getText
>	
```
{
    "status": 0,
    "msg": "ok",
    "data": {
        "content": "第一章 迟到的金手指<br \/>\n\r<br \/>\n雷霆在闪烁，风雨交加，整个天地仿佛被一个巨大的黑罩子笼罩，伸手不见五指。<br \/>\r\n伴随着雷声的轰鸣。<br \/>\r\n义庄之内的一个小年轻，一边擦拭着桌子一边无奈的吐槽"
    }
}
```
		

## 使用到的开源项目

本插件使用了如下开源项目，在此致谢

1.  [uview](https://www.uviewui.com/)
2.  [zhengmengtian的阅读器界面read.vue文件](https://ext.dcloud.net.cn/plugin?id=2485)


**扣** 21二44五5零76