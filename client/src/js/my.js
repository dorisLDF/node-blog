var App = {
  uploadImg: function(e) {
    var file = e.target.files[0],
      formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    $.ajax({
      url: '/api//uploadImg',
      type: 'post',
      data: formData,
      contentType: false, 
      processData: false,
      cache: false,
      success: function(data) {
        console.log(data);
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