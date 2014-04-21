function success(resultArray) {

	var scanRes = resultArray[0];

	if (/^elemenu/.test(scanRes)) {

		var jsonStr = scanRes.substring(8);

		var jsonObj = JSON.parse(jsonStr);

		var requestRrl = getHttpUrl("fandian");

		requestRrl += "?fandian_id=" + jsonObj.id;
		console.log('requestRrl' + requestRrl);

		$.ui.showMask("加载中... 请稍后");

		$.ajax({
			url : requestRrl,
			success : function(data) {
				

				if(data){
					var proto = JSON.parse(data);
					if(proto && proto.length >= 1){
						var fandian_info_str = proto[0].t;
						var fandian_info_obj = JSON.parse(fandian_info_str);
						if(data_insert(fandian_info_obj)){
							index_load_list();
						}
					}	
				}

				$.ui.hideMask();
			},
			error : function(data) {
				console.log('error' + data);
				$.ui.hideMask();
			}
		});

	} else {

		alert('扫描结果: ' + scanRes);

	}

	// NOTE: Scandit SDK Phonegap Plugin Versions 1.* for iOS report
	// the scanning result as a concatenated string.
	// Starting with version 2.0.0, the Scandit SDK Phonegap
	// Plugin for iOS reports the result as an array
	// identical to the way the Scandit SDK plugin for Android reports results.

	// If you are running the Scandit SDK Phonegap Plugin Version 1.* for iOS,
	// use the following approach to generate a result array from the string result returned:
	// resultArray = result.split("|");
}

function failure(error) {
	
}

function scan() {
	// See below for all available options.
	cordova.exec(success, failure, "ScanditSDK", "scan", ["MzySjscTEeOXwyMUN6u+RbQVe522gOFWNWgtMC0c4nM", {
		"beep" : true,
		"qr" : true,
		"2DScanning" : true
	}]);
}

function getHttpHead() {
	return "http://www.jian-yin.com:3000/";
}

function getHttpUrl(request) {

	return getHttpHead() + request;

}

