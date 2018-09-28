//doubanMovie.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    in_theaters: [],
    coming_soon: [],
    top250: [],
    initImg: '../resources/img/initImg.png',
    top250Start: 0,
    top250Count: 12,
    top250Total: 250,
    isHideLoadMore: false,
    isComplete: false,
    isloaded: false,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
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
            coming_soon: ops.data.subjects,
            isloaded: true,
          });
        },
      }),
      that.loadTop250();
  },
  loadTop250: function(e) {
    var that = this;
    if (that.data.top250Total > that.data.top250Start) {
      that.setData({ //把选中值放入判断值
        isHideLoadMore: true,
      })
      wx.request({
        url: 'https://i-test.com.cn/v2/movie/top250?start=' + that.data.top250Start + '&count=' + that.data.top250Count,
        header: {
          "Content-Type": "json"
        },
        success: function(ops) {
          console.log(ops);
          that.setData({
            top250: that.data.top250.concat(ops.data.subjects),
            isHideLoadMore: false,
          });
        },
      })
    } else {
      // 全部加载完成
      that.setData({ //把选中值放入判断值
        isComplete: true
      })
      setTimeout(function() {
        // complete
        that.setData({ //把选中值放入判断值
          isComplete: false
        })
      }, 1500);
    }
  },
  gotoSearch: function(e) {
    wx.navigateTo({
      url: 'doubanMovieSearch'
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
    this.setData({
      top250Start: this.data.top250Start + this.data.top250Count
    })
    this.loadTop250();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})