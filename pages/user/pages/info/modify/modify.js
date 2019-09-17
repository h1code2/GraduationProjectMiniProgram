// pages/user/pages/info/modify/modify.js
const app = getApp();
const settings = require('../../.../../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: null,
    userClass: null,
    userID: null,
    modifiable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: settings.getUrl('/user_info/'),
      data: {
        openid: app.globalData.openid
      },
      success: function(res) {
        var data = res.data;
        if (data.code == 200) {
          that.setData({
            userName: data.data.name,
            userClass: data.data.class,
            userID: data.data.studentID
          });
          if (that.data.userName) {
            that.setData({
              modifiable: false
            })
          }
        } else {
          wx.showToast({
            title: '数据异常，联系管理员',
          })
        }
      }
    })
  },

  /**
   * 获取输入的名字
   */
  userName: function(event) {
    var that = this;
    that.setData({
      userName: event.detail.value
    })
  },

  /**
   * 获取输入的班级
   */
  userClass: function(event) {
    var that = this;
    that.setData({
      userClass: event.detail.value
    })
  },

  /**
   * 获取输入的学号
   */
  userID: function(event) {
    var that = this;
    that.setData({
      userID: event.detail.value
    })
  },

  /**
   * 获取输入的新密码
   */
  userNewPassword: function(event) {
    var that = this;
    that.setData({
      userNewPassword: event.detail.value
    })
  },

  /**
   * 提交修改信息
   */
  modifyUserInfo: function() {
    var that = this;
    var userName = that.data.userName;
    var userClass = that.data.userClass;
    var userID = that.data.userID;
    if (userName != null & userClass != null & userID != null) {
      wx.showModal({
        title: '温馨提示',
        content: '请确定你输入的内容无误（不验证真实性），信息不真实可能影响接收授权。',
        success: function(res) {
          if (res.confirm == true) { //仅仅判断用户点击确定键
            wx.request({
              url: settings.getUrl('/modifyUserInfo/'),
              data: {
                openId: app.globalData.openid,
                userName: userName,
                userClass: userClass,
                userID: userID
              },
              success: function(res) {
                wx.showModal({
                  title: '提示',
                  content: '用户信息已经更新,默认密码:123456789',
                });
                setTimeout(function() {
                  wx.reLaunch({
                    url: '/pages/lock/lock',
                  })
                }, 1800)
              }
            })
          }
        }
      })
    } else {
      wx.showModal({
        title: '错误提示',
        content: '请检查输入内容格式，内容不能为空！',
      })
    }
  }
})