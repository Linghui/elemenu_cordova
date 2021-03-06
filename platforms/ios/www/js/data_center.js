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
	if (jsonStr) {
		return JSON.parse(jsonStr);
	} else {
		return false;
	}

}

function date_get_fandian_id_list() {
	var fandian_list = data_get_fandian_list();
	if (!fandian_list) {
		return false;
	}

	var id_list = "";
	for (var i = 0; i < fandian_list.length; i++) {
		id_list += fandian_list[i].fandian_id + ",";
	}
	
	return id_list;
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

// like part start
function update_fandian_like(like_str) {
	console.log("update_fandian_like");
	var storage = window.localStorage;

	var local_like_str = storage.getItem('fandian_like');

	var like_obj = JSON.parse(like_str);
	
	var local_like;
	if (!local_like_str) {
		local_like = {};
	} else {
		local_like = JSON.parse(local_like_str);
	}

	for (var key in like_obj) {
		local_like[key] = like_obj[key];
	}

	storage.setItem('fandian_like', JSON.stringify(local_like));
}

function get_fandian_like(fandian_id) {
	var storage = window.localStorage;

	var local_like_str = storage.getItem('fandian_like');
	if (local_like_str) {

		var local_like = JSON.parse(local_like_str);
		if (local_like[fandian_id]) {
			return local_like[fandian_id]
		} else {
			return 0
		}
	}
	return 0;
}

function update_food_like(like_str) {

	var storage = window.localStorage;

	var like_obj = JSON.parse(like_str);

	var local_like_str = storage.getItem('food_like');

	var local_like;
	if (!local_like_str) {
		local_like = {};
	} else {
		local_like = JSON.parse(local_like_str);
	}

	for (var key in like_obj) {
		local_like[key] = like_obj[key];
	}

	storage.setItem('food_like', JSON.stringify(local_like));
}

function get_food_like(food_id) {
	var storage = window.localStorage;

	var local_like_str = storage.getItem('food_like');
	if (local_like_str) {

		var local_like = JSON.parse(local_like_str);
		if (local_like[food_id]) {
			return local_like[food_id]
		} else {
			return 0
		}
	}
	return 0;
}

