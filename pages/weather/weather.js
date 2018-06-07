//weather.js
//获取应用实例
const app = getApp()

Page({
  data: {
    weather: '天气',
    location: '',
    updateTime: '',
    weatherStatus: '',
    temperature: "",
    showImg: '',
    hourlyList: [],
    forecastList: [],
  },

  onLoad: function () {
    var that = this;

    wx.showLoading({
      title: '加载中..',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    });

    wx.getLocation({
      success: function (res) {
        wx.request({
          url: 'https://free-api.heweather.com/s6/weather?location=' + res.latitude + ',' + res.longitude + '&key=5f63bb77018b4301932b3fd3506cf885', data: {},
          success: function (ops) {
            console.log(ops);
            let hList = ops.data.HeWeather6[0].hourly
            hList.forEach((item) => {
              item.time = item.time.substring(10); //要截取字段的字符串
            })
            let fList = ops.data.HeWeather6[0].daily_forecast
            fList.forEach((item) => {
              item.date = item.date.substring(5); //要截取字段的字符串
            })
            that.setData({
              location: ops.data.HeWeather6[0].basic.location,
              updateTime: ops.data.HeWeather6[0].update.loc.substring(10),
              weatherStatus: ops.data.HeWeather6[0].now.cond_txt,
              showImg: ops.data.HeWeather6[0].now.cond_code,
              temperature: ops.data.HeWeather6[0].now.tmp + "℃",
              hourlyList: hList,
              forecastList: fList
            });
          }
        });

        // wx.request({
        //   url: 'https://free-api.heweather.com/s6/weather/now?location=' + res.latitude + ',' + res.longitude + '&key=5f63bb77018b4301932b3fd3506cf885', data: {},
        //   success: function (ops) {
        //     console.log(ops);
        //     that.setData({
        //       location: ops.data.HeWeather6[0].basic.location,
        //       updateTime: ops.data.HeWeather6[0].update.loc.substring(10),
        //       weatherStatus: ops.data.HeWeather6[0].now.cond_txt,
        //       showImg: ops.data.HeWeather6[0].now.cond_code,
        //       temperature: ops.data.HeWeather6[0].now.tmp + "℃",
        //     });
        //   }
        // });
        // wx.request({
        //   url: 'https://free-api.heweather.com/s6/weather/hourly?location=' + res.latitude + ',' + res.longitude + '&key=5f63bb77018b4301932b3fd3506cf885', data: {},
        //   success: function (ops) {
        //     console.log(ops.data.HeWeather6[0].hourly);
        //     let dataList = ops.data.HeWeather6[0].hourly
        //     dataList.forEach((item) => {
        //       item.time = item.time.substring(10); //要截取字段的字符串
        //     })
        //     that.setData({
        //       hourlyList: dataList,
        //     });
        //   }
        // });
        // wx.request({
        //   url: 'https://free-api.heweather.com/s6/weather/forecast?location=' + res.latitude + ',' + res.longitude + '&key=5f63bb77018b4301932b3fd3506cf885', data: {},
        //   success: function (ops) {
        //     let dataList = ops.data.HeWeather6[0].daily_forecast;
        //     dataList.forEach((item) => {
        //       item.date = item.date.substring(5); //要截取字段的字符串
        //     })
        //     that.setData({
        //       forecastList: ops.data.HeWeather6[0].daily_forecast
        //     });
        //   }
        // });
        wx.hideLoading();
      }
    })
  },
})