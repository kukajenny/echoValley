//doubanMovieInfo.js
//获取应用实例
const app = getApp();

Page({
  data: {
    title:'',
    score:'',
    content:'',
    content_image:'',
    label:[],
    summary:''
  },
  //事件处理函数
  onLoad: function (option) {
    var that = this;
    wx.request({
      // url: 'https://i-test.com.cn/v2/movie/subject/'+option.id,
      url: 'https://i-test.com.cn/v2/movie/subject/26996640',
      header: {
        "Content-Type": "json"
      },
      success: function (ops) {
        console.log(ops);
        that.setData({
          title: ops.data.title,
          score:ops.data.rating.average,
          content_image: ops.data.images.small,
          label: ops.data.genres,
          summary: ops.data.summary,
        })
      },
    })
  },
})