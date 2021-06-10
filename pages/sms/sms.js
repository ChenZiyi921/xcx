// pages/sms/sms.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: "未发送"
  },
  /**
   * 获取输入的手机号码
   */
  getPhone: function (e) {
    let phone = e.detail.value;
    this.setData({
      phone
    })
  },
  /**
   *获取输入的验证码
   */
  getSms: function (e) {
    let sms = e.detail.value;
    this.setData({
      u_sms: sms
    })
  },
  /**
   * 点击【点击验证】后，比较随机生成的二维码和用户输入的二维码是否一致
   */
  check: function () {
    let s_sms = this.data.s_sms;
    let u_sms = this.data.u_sms;
    if (s_sms == u_sms) {
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: '验证码输入错误',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 点击发送，调用云函数
   */
  send: function () {
    let _this = this;
    wx.cloud.callFunction({
      name: 'sms',
      data: {
        mobile: _this.data.phone,
        nationcode: '86'
      },
      success: res => {
        let sms = res.result.res.body.params[0];
        let result = res.errMsg;
        if (result == "cloud.callFunction:ok") {
          _this.setData({
            result: "发送成功",
            s_sms: sms
          })
        } else {
          _this.setData({
            result: "发送失败"
          })
        }
      },
      fail: err => {
        console.error('[云函数] [sms] 调用失败', err)
      }
    })
  }
})