// pages/doubanMovie/doubanMovieSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    searchStart: 0,
    searchCount: 12,
    searchResult: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  changSearchValue: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  searchMovie: function(e) {
    var that = this;
    console.log(that.data.searchValue);
    wx.showLoading({
      title: '加载中..',
      mask: true,
    });
    wx.request({
      // url: 'https://i-test.com.cn/v2/movie/search?q=' + that.data.searchValue + '&start=' + that.data.searchStart + '&count=' + that.data.searchCount,
      url: 'https://i-test.com.cn/v2/movie/search?q=天龙八部&start=' + that.data.searchStart + '&count=' + that.data.searchCount,
      header: {
        "Content-Type": "json"
      },
      success: function(ops) {
        console.log(ops);
        that.setData({
          searchResult: ops.data.subjects
        });
        wx.hideLoading();
      },
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
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("加载中")
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})