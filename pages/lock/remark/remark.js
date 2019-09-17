// pages/lock/reamrk/remark.js
const app = getApp();
const settings=require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reasonItems: [{
      msg: '签到',
      value: '签到',
      checked: true
    }, {
      msg: '上课',
      value: '上课'
    }, {
      msg: '实验',
      value: '实验'
    }, {
      msg: '其他',
      value: 'other'
    }],
    otherReason: false,
    lockReamrk: '',
    lockCode: '',
    lockID: '',
    reasonMsg: '签到' //需要设置默认值，因为不点触不会出发radioChange事件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      lockRemark: options.remark,
      lockCode: options.code,
      lockID: options.lock_id
    });
    console.log('日了狗，锁ID呢？' + options.lock_id)
  },
  
  otherRemark: function(e) {
    this.setData({
      reasonMsg: e.detail.value.replace(/\s+/g, '')
    })
  },

  radioChange: function(e) {
    var that = this;
    var reasonItems = that.data.reasonItems;
    if (e.detail.value == 'other') {
      that.setData({
        otherReason: true
      })
    } else {
      that.setData({
        otherReason: false,
        reasonMsg: e.detail.value.replace(/\s+/g, '')
      })
    }
    for (var i = 0, len = reasonItems.length; i < len; ++i) {
      reasonItems[i].checked = reasonItems[i].value == e.detail.value;
    }
    that.setData({
      reasonItems: reasonItems
    });
  },

  /**
   * 添加开锁函数
   */
  openLockFunc: function() {
    var that = this;
    console.log(that.data.reasonMsg);
    var text = that.data.reasonMsg;
    if (that.data.otherReason == false) {
      that.submitOpenLock(that.data.lockID, that.data.lockCode, that.data.reasonMsg, );
    } else {
      if (text != '') {
        that.submitOpenLock(that.data.lockID, that.data.lockCode, that.data.reasonMsg, );
      } else {
        wx.showToast({
          title: '填写备注',
        });
      }
    }
  },

  /**
   * 提交开锁
   */
  submitOpenLock: function(lockID, lockCode, reasonMsg) {
    wx.request({
      url: settings.getUrl('/open_lock/'),
      data: {
        open_id: app.globalData.openid,
        lock_id: lockID,
        code_c: lockCode,
        reason: reasonMsg
      },
      success: function(res) {
        var data = res.data;
        console.log(data)
        console.log(res);
        if (data.code == 200) {
          wx.showToast({
            title: data.message
          })
          setTimeout(function() {
            wx.reLaunch({
              url: '/pages/lock/lock',
            })
          }, 1800)
        } else {
          wx.showToast({
            title: data.message
          })
        }
      }
    })
  }
})