// pages/more.js
const settings = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 远程开锁界面
   */
  remoteControl:function(){
    wx.navigateTo({
      url: '/pages/control/control',
    })
  },

  /**
   * 修改管理登录密码
   */
  modifyPassword: function () {
    wx.navigateTo({
      url: '/pages/modifypwd/modifypwd',
    })
  }
})