// 服务器根路径，修改时注意wxs/utils.wxs中的urlRoot
const urlRoot = 'https://lock.huangtongx.cn/api'

// 正式服务器环境
// lock: 'https://lock.huangtongx.cn/api/handleLogin/', //第三方服务器地址
// get_user_info_url: 'https://lock.huangtongx.cn/api/user_info/', //拉取用户信息地址
// register_url: 'https://lock.huangtongx.cn/api/register/', //用户注册地址
// lock_info_url: 'https://lock.huangtongx.cn/api/lock_info/', //拉取门锁信息
// open_lock_url: 'https://lock.huangtongx.cn/api/open_lock/', //拉取门锁信息
// open_lock_logs_url: 'https://lock.huangtongx.cn/api/openLockLogs/', //拉取开锁记录
// url_path: 'https://lock.huangtongx.cn/api' //拉取门锁信息

module.exports = {
  /** 
   * 将路径拼成完整URL
   */
  getUrl: function (path) {
    return urlRoot + path
  },

  /**
   * 从Cookies字符串中提取指定名称的Cookie值
   */
  getCookie: function (cookies, name) {
    var arr, reg = new RegExp(`(^|,| )${name}=([^;]*)`);
    if (arr = cookies.match(reg)) {
      return unescape(arr[2]);
    }
    return null;
  }
}