const settings = require('/utils/util.js')

App({
  /**
   * 全局数据
   */
  globalData: {
    user:null,
    openid: null
  },
  /**
   * 小程序启动时自动登录
   */
  onLaunch: function() {
    // 小程序登录（获取code）
    wx.login({
      success: res => {
        if (res.code) {
          // 服务端登录
          wx.showNavigationBarLoading()
          wx.request({
            url: settings.getUrl('/handleLogin/'),
            data: {
              code: res.code
            },
            success: res => {
              // console.log(res); // 此处有个坑
              wx.hideNavigationBarLoading()
              this.globalData.openid = res.data.openid
            }
          })
        } else {
          console.log('小程序登录失败：' + res.errMsg)
        }
      }
    });
  }
})