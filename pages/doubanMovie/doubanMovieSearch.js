// pages/doubanMovie/doubanMovieSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    searchStart: 0,
    searchCount: 12,
    searchTotal: 1000,
    searchResult: [],
    isHideLoadMore: false,
    isComplete:false,
    initImg:'../resources/img/initImg.png',

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
    if (that.data.searchValue == ""){
      wx.showToast({
        title: '请输入要搜索的电影名！',
        icon: 'none',
      })
      return;
    }
    that.setData({
      searchStart: 0,
      searchTotal: 1000,
      searchResult: [],
    });
    that.updateMovie();
  },

  updateMovie:function(e){
    var that = this;
    if (that.data.searchTotal > that.data.searchStart) {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      that.setData({ //把选中值放入判断值
        isHideLoadMore: true,
      })
      wx.request({
        url: 'https://i-test.com.cn/v2/movie/search?q=' + that.data.searchValue + '&start=' + that.data.searchStart + '&count=' + that.data.searchCount,
        // url: 'https://i-test.com.cn/v2/movie/search?q=天龙八部&start=' + that.data.searchStart + '&count=' + that.data.searchCount,
        header: {
          "Content-Type": "json"
        },
        success: function (ops) {
          console.log(ops);
          that.setData({
            searchResult: that.data.searchResult.concat(ops.data.subjects),
            isHideLoadMore: false,
            searchTotal: ops.data.total,
          });
          wx.hideNavigationBarLoading() //完成停止加载
        },
      })
    } else {
      // 全部加载完成
      that.setData({ //把选中值放入判断值
        isComplete: true
      })
      setTimeout(function () {
        // complete
        that.setData({ //把选中值放入判断值
          isComplete: false
        })
      }, 1500);
    }
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
    // wx.showNavigationBarLoading() //在标题栏中显示加载

    // //模拟加载
    // setTimeout(function() {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   wx.stopPullDownRefresh() //停止下拉刷新
    // }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    
    that.setData({ //把选中值放入判断值
      searchStart: that.data.searchStart + that.data.searchCount
    })
    that.updateMovie();


    //模拟加载
    // setTimeout(function() {
    //   // complete
    //   wx.hideNavigationBarLoading() //完成停止加载
    //   that.setData({ //把选中值放入判断值
    //     isHideLoadMore: false
    //   })
    // }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})