var App = {
  uploadImg: function(e) {
    var file = e.target.files[0],
      formData = new FormData();
    formData.append('img', file, file.name);
    console.log(file.size);
    if (file.size > 1024 * 1024 * 2) {
      alert('请选择小于2M的头像上传');
      return;
    }
    $.ajax({
      url: '/api/users/uploadImg',
      type: 'post',
      data: formData,
      contentType: false, 
      processData: false,
      cache: false,
      success: function(data) {
        if (data.code === 0) {
          var { headImg } = data.data;
          alert('亮闪闪的新头像来了');
          $('.head-img').attr('src', headImg);
        } else {
          alert(data.message);
        }
      }
    });
  },
  init: function() {
    var oThis = this;
    $('#upload').change(function(e) {
      oThis.uploadImg(e);
    });
  }
};

App.init();