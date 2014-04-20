function data_insert(fandian_info) {
	console.log("data_center fandian id " + fandian_info.fandian_id);
	console.log("data_center fandian name " + fandian_info.name);
	console.log("data_center fandian name " + JSON.stringify(fandian_info));

	var fandian_list = data_get_fandian_list();

    var addedBefore = false;
	if (fandian_list) {

		for (var i = 0; i < fandian_list.length; i++) {
			console.log('fandian_list[i].fandian_id ' + fandian_list[i].fandian_id);
			if (fandian_list[i].fandian_id == fandian_info.fandian_id) {
				fandian_list[i] = fandian_info;
				addedBefore = true;
				break;
			}
		}

		console.log("addedBefore " + addedBefore);

		if (!addedBefore) {
			fandian_list.push(fandian_info);
		}

		data_set_fandian_list(fandian_list);

	} else {
		console.log("New New New");
		fandian_list = [];
		fandian_list.push(fandian_info);
		console.log("fandian_list " + JSON.stringify(fandian_list));
		console.log("fandian_list size " + fandian_list.length);
		data_set_fandian_list(fandian_list);

	}

	return true;

}

function data_set_fandian_list(fandian_list_obj) {
	var storage = window.localStorage;
	var jsonStr = JSON.stringify(fandian_list_obj);
	storage.setItem('fandian_list', jsonStr);
}

function data_get_fandian_list() {
	var storage = window.localStorage;
	var jsonStr = storage.getItem('fandian_list');
	return JSON.parse(jsonStr);
}

function data_clear() {
	console.log("data_clear");
	var storage = window.localStorage;
	storage.clear();
}

function data_get_fandian_by_id(fandian_id) {
	var fandian_list = data_get_fandian_list();

	for (var i = 0; i < fandian_list.length; i++) {
		console.log('fandian_list[i].fandian_id ' + fandian_list[i].fandian_id);
		if (fandian_list[i].fandian_id == fandian_id) {
			return fandian_list[i];
		}
	}

	return null;
}

