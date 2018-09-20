//doubanMovie.js
//获取应用实例
const app = getApp();

Page({
  data: {
    in_theaters:[],
    coming_soon:[]
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://i-test.com.cn/v2/movie/in_theaters',
      header: {
        "Content-Type": "json"
      },
      success: function (ops) {
        console.log(ops);
        that.setData({
          in_theaters: ops.data.subjects
        })
      },
    }),
      wx.request({
        url: 'https://i-test.com.cn/v2/movie/coming_soon',
        header: {
          "Content-Type": "json"
        },
        success: function (ops) {
          console.log(ops);
          that.setData({
            coming_soon: ops.data.subjects
          })
        },
      })
  },
})