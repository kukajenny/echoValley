//V2EX.js
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
    stories: [],
    top_stories: [],
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.v2ex.com/api/topics/hot.json',
      success: function (ops) {
        console.log(ops);
        that.setData({
          
        })
      },
    })
  },
})