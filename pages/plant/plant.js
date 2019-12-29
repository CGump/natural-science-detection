Page({
  data: {
    img: "",
    names: "",
    scores: ""
  },
  onCameraTap: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showToast({
          title: '正在识别图片',
          icon: 'loading',
          mask: true,
          duration: 20000,
        })
        that.setData({
          img: res.tempFilePaths[0],
        })
        // console.log('临时路径：' + res.tempFilePaths[0])
        wx.uploadFile({
          url: 'http://111.229.46.96:5000/test',
          filePath: res.tempFilePaths[0],
          name: 'image',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function(res){
            var data = res.data;
            that.setData({
              names:"结果：" + data
            })
            //hzg
            
            
            wx.showToast({
              title: '识别成功',
              icon: 'success',
              mask: true,
              duration: 800,
            })
          },
        })
      },
      fail: function () {

      },
      complete: function () {
        // complete
      }
    })
  },
});