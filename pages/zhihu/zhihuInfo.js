Page({
  data: {
    content: '<div style="color:red"><h2>aaa</h2></div>',
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      success:function(ops){
        console.log(ops);

        that.setData({
          content: ops.data.body.replace("<script type=“text/javascript”>window.daily=true</script>",""),
        });
      }
    })
  },
}) 