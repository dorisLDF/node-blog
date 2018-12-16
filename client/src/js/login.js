var App = {
  getCode: function() {
    $.ajax({
      url: '/api/getCode',
      type: 'get',
      success: function (data) {
        $('#yzmImg').html(data.img);
      }
    })
  },

  init() {
    this.getCode();

    // 改变二维码
    $('#yzmImg').click(() => {
      this.getCode();
    });

    // 登录
    $('#loginBtn').click(function () {
      var phone = $('#phone').val();
      var pwd = $('#pwd').val();
      var yzmCode = $('#yzm').val();
      $.ajax({
        url: '/api/login',
        type: 'post',
        data: {
          phone,
          pwd,
          yzmCode
        },
        success: function (data) {
          console.log(data);
          if (data.code === 0) {
            alert('登录成功');
            window.location.href = '/';
          } else {
            alert(data.message);
          }
        }
      });
    });
  }
};
App.init();