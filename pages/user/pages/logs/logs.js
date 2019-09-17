// pages/user/pages/logs/logs.js
const app = getApp();
const settings = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openLockLogs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: settings.getUrl('/openLockLogs/'),
      data: {
        openid: app.globalData.openid
      },
      success: function(res) {
        var obj = res.data;
        if (obj.code == 200) {
          // console.log(obj.data.result);
          that.setData({
            openLockLogs: obj.data.result
          })
          // console.log(that.renderTime(that.data.openLockLogs[0].time));
        } else {
          console.log('数据异常请联系管理员');
        }
      }
    });
  },

  renderTime: function(date) {
    var da = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
    var Year = da.getFullYear(); //ie火狐下都可以
    var Month = da.getMonth() + 1;
    var Day = da.getDate();
    var Hours = da.getHours();
    var Minutes = da.getMinutes();
    var Seconds = da.getSeconds();
    var CurrentDate = "";
    CurrentDate += Year + "-";
    if (Month >= 10) {
      CurrentDate += Month + "-";
    } else {
      CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
      CurrentDate += Day;
    } else {
      CurrentDate += "0" + Day;
    }
    if (Hours < 10) {
      Hours = "0" + Hours;
    }
    if (Minutes < 10) {
      Minutes = "0" + Minutes;
    }
    if (Seconds < 10) {
      Seconds = "0" + Seconds;
    }
    return CurrentDate + " " + Hours + ":" + Minutes + ":" + Seconds;
  }
})