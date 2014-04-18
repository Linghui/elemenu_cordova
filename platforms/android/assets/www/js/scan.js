function success(resultArray) {

	alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);

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
	alert("Failed: " + error);
}

function scan() {
	// See below for all available options.
	cordova.exec(success, failure, "ScanditSDK", "scan", ["MzySjscTEeOXwyMUN6u+RbQVe522gOFWNWgtMC0c4nM", {
		"beep" : true,
		"qr" : true,
		"2DScanning" : true
	}]);
}

