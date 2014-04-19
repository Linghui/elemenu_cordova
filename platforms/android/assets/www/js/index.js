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
	}
};

function index_load_list() {
	console.log('index_load_list');
	var fandian_list = data_get_fandian_list();
	if (fandian_list && fandian_list.length > 0) {
		console.log('index_load_list list_page ' + fandian_list.length);
		console.log('index_load_list list_page ' + JSON.stringify(fandian_list));
		$.ui.loadContent('list_page', false, false, false)

		var list_content;
		for (var i = 0; i < fandian_list.length; i++) {
			console.log("fandian_list name " + fandian_list[i].name);
			list_content += "<li><a class='button'>";
			list_content += fandian_list[i].name;
			list_content += "</a></li>";
		}

		console.log("list_content " + list_content);
		$('#fandian_list').html(list_content);

	} else {
		console.log('index_load_list null_page');
		$.ui.loadContent('null_page', false, false, false)
	}

}

