var dataGetter = {
  post: function(url, data, success){
    $.ajax({
      type:"get",
      url: url,
      data: data,
      dataType: "json",
      jsonp:"callback",
      success:function(res){

        console.log(res)
        success(res);
      }
    })
  },

  get: function(url, success){
    $.ajax({
      type:"GET",
      url: url,
      dataType: "jsonp",
      jsonp:"callback",
      success:function(res){
        success(res);
      }
    })
  },
  get2: function(url, data,success){
    $.ajax({
      type:"GET",
      url: url,
      data:data,
      dataType: "jsonp",
      jsonp:"callback",
      success:function(res){
        success(res);
      }
    })
  },

  getCap: function(url, success){
    $.ajax({
      type: 'GET',
      url: url,
      data: {
        refresh: 1
      },
      dataType:'jsonp',
      jsonp:'callback',
      success: function(res){
        success(res);
      }
    });
  }
};
