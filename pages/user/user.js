// user.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (app.globalData.user == undefined) {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      that.setData({
        userinfo: app.globalData.user
      })
    }
  },
  openLockLogs: function() {
    var openid = app.globalData.openid;
    if (openid != undefined) {
      wx.navigateTo({
        url: '/pages/user/pages/logs/logs?openid=' + openid,
      });
    } else {
      console.log('登录信息失效');
    }
  },
  modifyUserInfo: function() {
    var openid = app.globalData.openid;
    if (openid != undefined) {
      wx.navigateTo({
        url: "/pages/user/pages/info/modify/modify"
      })
    } else {
      console.log('未检测到openid');
    }
  },

  openMorePage: function() {
    // console.log(this.data.userinfo)
    if (this.data.userinfo.permission >= 3) {
      wx.navigateTo({
        url: "/pages/more/more"
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '您无权使用更多的功能,详情可以与超级管理员联系.',
      })
    }
  }
})