//lock.js
//获取应用实例
const app = getApp();
const settings = require('../../utils/util.js')
Page({
  data: {
    imageHeight: 281,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function(options) {
    var that = this;
    if (app.globalData.user == undefined) {
      wx.reLaunch({
        url: '/pages/login/login',
      })
    } else {
      wx.getSystemInfo({
        success: function(e) {
          that.setData({
            imageHeight: .88 * e.screenWidth,
            imageHeight1: .195 * e.screenWidth,
            differHeight: .685 * e.screenWidth
          });
        }
      });
      if (options.scene != undefined) {
        var scene = options.scene; // code=123&key=123
        console.log(scene);
        var arr = scene.split("_");
        var id = arr[0];
        var code = arr[1];
        wx.request({
          url: settings.getUrl('/lock_info/'), //仅为示例，并非真实的接口地址
          data: {
            lock_id: id
          },
          success(res) {
            var res = res.data
            wx.navigateTo({
              url: '/pages/lock/remark/remark?code=' + code + '&remark=' + res.data.remark + '&lock_id=' + res.data.lock_id,
            })
          }
        });
      } else {
        console.log('未接收到数据！');
      }
    }
  },

  //事件处理函数
  bindViewTap: function() {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        console.log(res);
        if (res.path != undefined) {
          var path = res.path;
          console.log(path);
          var tttt = path.split('?');
          var ttt = tttt[1].split('=');
          var tt = ttt[1].split('_'); //动态码
          console.log(tt[0]);
          console.log(tt[1]);
          wx.request({
            url: settings.getUrl('/lock_info/'), //仅为示例，并非真实的接口地址
            data: {
              lock_id: tt[0]
            },
            success(res) {
              var data = res.data;
              console.log(data);
              wx.navigateTo({
                url: '/pages/lock/remark/remark?code=' + tt[1] + '&remark=' + data.data.remark + '&lock_id=' + data.data.lock_id,
              })
            }
          });
        } else {
          console.log('未接收到数据！');
        }
      },
      fail: (res) => {
        wx.showModal({
          title: '扫码失败',
          content: '请重新尝试'
        });
      },
      complete: (res) => {
        console.log('失败还是成功，你猜！');
      }
    });
  },

  onShow: function() {
    var that = this;
    that.setData({
      userInfo: app.globalData.user
    });
  },
  goUser: function() {
    if (app.globalData.user != undefined) {
      wx.navigateTo({ //保留当前页面，跳转到应用内的某个页面（最多打开5个页面，之后按钮就没有响应的）
        url: "/pages/user/user"
      });
    } else {
      var that = this;
      wx.request({
        url: settings.getUrl('/user_info/'),
        data: {
          openid: app.globalData.openid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          app.globalData.user = res.data.data
        }
      });
    }
  }
})