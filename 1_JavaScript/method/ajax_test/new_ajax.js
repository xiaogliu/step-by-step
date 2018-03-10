function newAjax(method, url, fnSucc, fnFail) {
	// 创建XMLHttpRequest对象
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = ActiveXObject('Microsoft.XMLHTTP');
	}

	// 连接服务器
	xhr.open(method, url + '?' + new Date().getTime());

	// 发送请求,send里面如果是空参数时要不要穿null？
	xhr.send();

	// 接收响应
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
				// 这就是经常用的.then(data)或者.then(response)，参数其实就是返回的参数
				// 这里把返回的参数作为请求成功的回调函数的参数
				fnSucc(xhr.responseText);
			} else {
				// 或者与后台沟通定义的错误信息
				fnFail('请求失败' + xhr.status);
			}
		}
	}
}