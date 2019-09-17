// pages/control/control.js

const settings = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lcok_ids: [],
    lock_remarks: [],
    pickerIndex: 1,
    showModal: false,
    inputPassword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.lock_infos();
  },

  /**
   * 获取门锁的ID集
   */
  lock_infos: function() {
    var self = this;
    wx.request({
      url: settings.getUrl('/lock_ids/'),
      data: {
        openid: app.globalData.openid
      },
      success: res => {
        var data = res.data.data;
        var tmp_ids = Array();
        var tmp_remarks = Array();
        for (var i = 0; i < data.length; i++) {
          tmp_ids.push(data[i].id);
          tmp_remarks.push(data[i].remark);
        }
        self.setData({
          lock_ids: tmp_ids,
          lock_remarks: tmp_remarks
        })
      }
    })
  },
  bindPickerChange: function(event) {
    this.setData({
      pickerIndex: event.detail.value
    })
  },

  /**
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},

  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },

  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    var self = this;
    wx.request({
      url: settings.getUrl('/remote_control/'),
      data: {
        openid: app.globalData.openid,
        lock_id: self.data.lock_ids[self.data.pickerIndex],
        password: self.data.inputPassword
      },
      success: res => {
        console.log(res);
        var code = res.data.code;
        var message = res.data.message;
        self.hideModal();
        if (code == 200) {
          wx.showModal({
            title: '提示',
            content: message,
            confirmText: '首页',
            success: function(res) {
              if (res.confirm) {
                wx.reLaunch({
                  url: '/pages/lock/lock',
                })
              }
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: message
          });
        }
      }
    })
  },

  /**
   * 截获输入密码
   */
  inputChangePassword: function(event) {
    this.setData({
      inputPassword: event.detail.value
    })
  }
})