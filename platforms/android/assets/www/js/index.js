/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener("deviceready", onDeviceReady, false);
	}
};
function onDeviceReady() {
	console.log('onDeviceReady');
	// 注册回退按钮事件监听器

	document.addEventListener("backbutton", onBackKeyDown, false);
	//返回键
}

var popOn = 0;

function onBackKeyDown() {
	console.log('onBackKeyDown');
	if (showing_page == 0) {
		// navigator.app.exitApp();

		if (popOn == 0) {
			popOn = 1;
			$('#afui').popup({
				title : "退出",
				message : "确认退出?",
				cancelText : "取消",
				cancelCallback : function() {
					popOn = 0;
				},
				doneText : "确定",
				doneCallback : function() {
					navigator.app.exitApp();
				}
			});
		}

	} else if (showing_page == 1) {
		back();
	} else {
		back();
	}
}

var showing_page = 0;

function index_load_list() {
	console.log('index_load_list');
	showing_page = 0;

	$("#afui").get(0).className = "bb";

	var fandian_list = data_get_fandian_list();
	if (fandian_list && fandian_list.length > 0) {
		console.log('index_load_list list_page ' + fandian_list.length);
		console.log('index_load_list list_page ' + JSON.stringify(fandian_list));

		var list_content = '<ul id="fandian_list" class="list">';
		for (var i = 0; i < fandian_list.length; i++) {
			console.log("fandian_list name " + fandian_list[i].name);
			list_content += "<li class='list_container'><a class='list' onclick='show_detail(" + fandian_list[i].fandian_id + ")'>";
			list_content += fandian_list[i].name;
			list_content += "</a></li>";
		}
		list_content += "</ul>";

		console.log('list_content ' + list_content);
		$('#main').html(list_content);

	} else {
		console.log('index_load_list null_page');

		$('#main').html('<div width="100%" height="100%" style="text-align:center"> <img class="wucdbj" src="img/wucdbj.png"/> <h2 class="tip">您没有录入任何菜单</h2> <input class="start_btn" type="button" value="开始扫描" onclick="scan()" /> </div>');

	}

}

function show_detail(fandian_id) {
	console.log("show_detail");
	showing_page = 1;
	var fandian_info = data_get_fandian_by_id(fandian_id);

	$('#fandian_name').html(fandian_info.name);

	var menuStr = fandian_info.menu;
	var menuObj = JSON.parse(menuStr);

	var content = "";
	for (var index = 0; index < menuObj.length; index++) {
		content += "<li>";
		content += menuObj[index].name;
		content += menuObj[index].price;
		content += "</li>";
	}

	$('#food_list').html(content);

	$.ui.loadContent('detail', false, false, 'slide');
}

function add_test() {

	var fandian_info_obj = {};
	fandian_info_obj["fandian_id"] = "1";
	fandian_info_obj["name"] = "测试饭店";
	fandian_info_obj["cellphone"] = "12222333";
	fandian_info_obj["address"] = "test";

	var menuList = [];

	var food = {};
	food["food_id"] = "1";
	food["fandian_id"] = "1";
	food["name"] = "好吃的";
	food["price"] = 11233;
	menuList.push(food);

	fandian_info_obj["menu"] = JSON.stringify(menuList);

	data_insert(fandian_info_obj);

}

function back() {

	$.ui.loadContent('main', false, false, 'slide');
}

