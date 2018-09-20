//zhihu.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: true,
    interval: 2500,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    stories:[],
    top_stories:[],
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success:function(ops){
        console.log(ops);
          that.setData({
            top_stories: ops.data.top_stories,
            stories: ops.data.stories,
          })
      },
    })
  },
})