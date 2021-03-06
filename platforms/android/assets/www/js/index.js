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
		console.log("android " + $.os.android);
		console.log("ios " + $.os.ios);
		console.log("iphone " + $.os.iphone);
		if ($.os.iphone) {
			imgType = "ios/";
		} else {
			imgType = "";
		}
	}
};

var imgType = "";
function onDeviceReady() {
	console.log('onDeviceReady');
	// 注册回退按钮事件监听器

	document.addEventListener("backbutton", onBackKeyDown, false);
	setTimeout("like_update()", 10000);
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

	$.ui.toggleNavMenu(false);
	// checkConnection();
	// $("#afui").get(0).className = "ios7";
	// $("#afui").get(0).className = "android";

	var fandian_list = data_get_fandian_list();
	if (fandian_list && fandian_list.length > 0) {
		console.log('index_load_list list_page ' + fandian_list.length);
		// console.log('index_load_list list_page ' + JSON.stringify(fandian_list));

		var list_content = '<ul id="fandian_list" class="list">';
		for (var i = 0; i < fandian_list.length; i++) {
			// console.log("fandian_list name " + fandian_list[i].name);
			list_content += getFandianLi(fandian_list[i].fandian_id, fandian_list[i].name, fandian_list[i].address, fandian_list[i].like);
		}
		list_content += "</ul>";

		// console.log('list_content ' + list_content);
		$('#main_c').html(list_content);

	} else {
		console.log('index_load_list null_page');

		$('#main_c').html('<div width="100%" height="100%" style="text-align:center"> <img class="wucdbj" src="img/wucdbj.png"/> <h2 class="tip">您没有录入任何菜单</h2> <input class="start_btn" type="button" value="开始扫描" onclick="scan()" /> </div>');

	}

}

function getFandianLi(id, name, address, like) {

	var li_content = "";
	li_content += "<li class='fandian_li' onclick='show_detail(" + id + ")' >";
	li_content += "<label class='fandian_line' >";
	li_content += name;
	li_content += "</label>";
	li_content += "<img class='fandian_xin' src='img/" + imgType + "xin.png'/>";
	li_content += "<img class='fandian_zan' src='img/" + imgType + "nzan.png'/>";
	li_content += "<span class='like_label' >";
	li_content += get_fandian_like(id);
	li_content += "</span>";
	li_content += "<div>";
	li_content += "<span class='address_label' >";
	li_content += "地址:" + address;
	li_content += "</span>";
	li_content += "</div>";
	li_content += "<img class='arrow' src='img/" + imgType + "arrow.png'/>";
	li_content += "</li>"

	return li_content;
}

var order_number = 0;
var order_price = 0;
var order_phone = 0;
var order_queue = {};

function show_detail(fandian_id) {
	console.log("show_detail");
	$('#scrollDiv').scroller({
		useJsScroll : true
	});
	showing_page = 1;
	var fandian_info = data_get_fandian_by_id(fandian_id);

	$('#fandian_name').html(fandian_info.name);

	var menuStr = fandian_info.menu;
	var menuObj = JSON.parse(menuStr);

	var content = "";
	for (var index = 0; index < menuObj.length; index++) {
		content += getFoodLi(menuObj[index].food_id, menuObj[index].name, menuObj[index].price, menuObj[index].like);
	}

	$('#food_list').html(content);

	order_number = 0;
	order_price = 0;
	order_queue = {};
	freshOrderBar();
	// $('#phone').attr('href', 'tel:' + fandian_info.cellphone);
	// $('#phone').html(fandian_info.cellphone);
	order_phone = fandian_info.cellphone;

	$.ui.loadContent('detail', false, false, 'slide');

}

function freshOrderBar() {
	$('#order_number').html(order_number + "");
	$('#total_price').html("¥" + order_price);
}

function getFoodLi(id, name, price, like) {
	var li_content = "";
	li_content += "<li class='food_li'>";
	li_content += "<label class='food_line' >";
	li_content += name;
	li_content += "</label>";
	li_content += "<img class='food_xin' src='img/" + imgType + "xin.png'/>";
	li_content += "<img class='food_zan' src='img/" + imgType + "nzan.png'/>";
	li_content += "<span class='food_like_label' >";
	li_content += get_food_like(id);
	li_content += "</span>";
	li_content += "<input type='button' class='price_btn' value='¥" + price + "' onclick='order(" + price + ",\"" + name + "\")'/>";
	li_content += "</li>";
	return li_content;
}

function order(price, name) {
	order_number++;
	order_price += price;
	if (order_queue[name]) {
		order_queue[name]++;
	} else {
		order_queue[name] = 1;
	}
	freshOrderBar();
}

function add_test() {

	for (var i = 0; i < 20; i++) {

		var fandian_info_obj = {};
		fandian_info_obj["fandian_id"] = i + 1 + "";
		fandian_info_obj["name"] = "测试饭店" + i;
		fandian_info_obj["cellphone"] = "12222333";
		fandian_info_obj["address"] = "test";
		fandian_info_obj["like"] = 122;

		var menuList = [];

		for (var index = 1; index < 50; index++) {
			var food = {};
			food["food_id"] = "1";
			food["fandian_id"] = "1";
			food["name"] = "好吃的";
			food["price"] = 200 + index;
			// food["price"] = 200 ;
			food["like"] = 122;
			menuList.push(food);
		}

		fandian_info_obj["menu"] = JSON.stringify(menuList);

		data_insert(fandian_info_obj);
	}

}

function back() {

	$.ui.loadContent('main', false, false, 'slide');
}

function close_footer() {
	$.ui.toggleNavMenu(false);
}

function like_update() {

	var requestRrl = getHttpUrl("like");

	var id_list = date_get_fandian_id_list();

	requestRrl += "?fandian_id=" + id_list;

	console.log('requestRrl ' + requestRrl);

	$.ajax({
		url : requestRrl,
		success : function(data) {

			if (data) {
				var proto = JSON.parse(data);
				if (proto && proto.length >= 1) {

					for (var index = 0; index < proto.length; index++) {
						// in index.js
						process(proto[index]);
					}

				}
			}

			$.ui.hideMask();
		},
		error : function(data) {
			console.log('error' + JSON.stringify(data));
			$.ui.hideMask();
		}
	});
}

function process(proto) {
	console.log('process ' + JSON.stringify(proto));

	switch(proto.p) {
		case 1:

			if (proto.c == 1) {

				var fandian_info_str = proto.t;
				var fandian_info_obj = JSON.parse(fandian_info_str);
				if (data_insert(fandian_info_obj)) {
					index_load_list();
				}
			} else {
				alert("信息不存在");
			}
			break;
		case 2:
			console.log('process 1' + proto.t);
			if (proto.c == 1) {
				update_fandian_like(proto.t);
			} else {
				alert("信息不存在");
			}
			break;
		case 3:
			console.log('process 2' + proto.t);
			if (proto.c == 1) {
				update_food_like(proto.t);
			} else {
				alert("信息不存在");
			}
			break;
		default:
			break;
	}

}

function send_order() {
	var content = "";
	for (var key in order_queue) {
		if (key) {

			content += "<li>";
			content += key;
			content += " x " + order_queue[key];
			content += "</li>";
		}
	}

	$('#order_list').html(content);
	$('#totol_price').html("总金额: ¥" + order_price);
	$('#phone').attr("href", "tel:" + order_phone);
	$('#phone').html(order_phone);

	$.ui.loadContent('order_page', false, false, 'slide');
}
