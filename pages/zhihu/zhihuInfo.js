Page({
  data: {
    content: '',
    title:'',
    image:''
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      success:function(ops){
        console.log(ops);

        that.setData({
          content: ops.data.body.replace("<script type=“text/javascript”>window.daily=true</script>", "").replace("查看知乎讨论",""),
          title: ops.data.title,
          image: ops.data.image
        });
      }
    })
  },
}) 