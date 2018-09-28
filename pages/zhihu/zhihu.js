//zhihu.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
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
    loadday: util.formatTime(new Date()),
    isHideLoadMore: false,
    isComplete: false,
  },
  //事件处理函数
  onLoad: function() {
    let _this = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function(ops) {
        console.log(ops);
        _this.setData({
          top_stories: ops.data.top_stories,
          stories: ops.data.stories,
        })
      },
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let _this = this;
    if (_this.data.stories.length < 1000) {
      _this.setData({ //把选中值放入判断值
        isHideLoadMore: true,
      })
      wx.request({
        url: 'https://news-at.zhihu.com/api/4/news/before/' + _this.data.loadday,
        success: function(ops) {
          console.log(ops);
          _this.setData({
            stories: _this.data.stories.concat(ops.data.stories),
            loadday: _this.data.loadday - 1,
            isHideLoadMore: false
          })
        },
      })
    }else{
      _this.setData({ //把选中值放入判断值
        isComplete: true
      })
      setTimeout(function () {
        // complete
        _this.setData({ //把选中值放入判断值
          isComplete: false
        })
      }, 1500);
    }
  },
})