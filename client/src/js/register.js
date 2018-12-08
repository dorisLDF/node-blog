$('#registerBtn').click(function() {
  var phone = $('#phone').val();
  var pwd = $('#pwd').val();
  $.ajax({
    url: '/api/users/addUsers',
    type: 'post',
    data: {
      phone,
      pwd
    },
    success: function(data) {
      console.log(data);
      if (data.code === 0) {
        alert('注册成功');
        window.location.href = '/';
      } else {
        alert(data.message);
      }
    }
  });
});