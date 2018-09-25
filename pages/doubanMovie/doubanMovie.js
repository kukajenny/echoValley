//doubanMovie.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    in_theaters: [],
    coming_soon: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中..',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });
    wx.request({
        url: 'https://i-test.com.cn/v2/movie/in_theaters',
        header: {
          "Content-Type": "json"
        },
        success: function(ops) {
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
        success: function(ops) {
          console.log(ops);
          that.setData({
            coming_soon: ops.data.subjects
          });
          wx.hideLoading();
        },
      })
  },
  gotoSearch: function (e) {
    wx.navigateTo({
      url:'doubanMovieSearch'
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})