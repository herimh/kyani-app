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

    API_SERVER: 'http://mobile-admin.mikyanidist.com/api/v1/',
    //API_SERVER: 'http://mobile-admin.dev/api/v1/',
    USER_API_TOKEN_KEY: 'user_api_token',
    USER_DATA_KEY: 'user_data',
    SERVER_TOKEN: 'server_token',

    ajaxRequest: function (_type, _url, _data, _callback, _extra_data) {
        $.ajax({
            type: _type,
            url: _url,
            dataType: 'json',
            data: _data,
            crossDomain: true,
            success: function (data) {
                _callback(data, _extra_data);
            },
            error: function (e) {
                console.log('Error: ' + e.message);
            }
        });
    },

    set_storage_data: function(key, data){
        window.localStorage.setItem(key, data);
    },

    get_storage_data: function(key){
        return window.localStorage.getItem(key);
    },

    clear_storage: function(){
        window.localStorage.clear();
    },

    remove_storage_data: function (key) {
        window.localStorage.removeItem(key);
    },

    getServerToken: function(){
        return app.get_storage_data(app.SERVER_TOKEN);
    },

    setServerToken: function (data) {
        app.set_storage_data(app.SERVER_TOKEN, data);
    },

    getUserApiToken: function () {
        return app.get_storage_data(app.USER_API_TOKEN_KEY);
    },

    setUserApiToken: function(data){
        app.set_storage_data(app.USER_API_TOKEN_KEY, data);
    },

    getUserData: function () {
        return {
            id: app.get_storage_data('user.id'),
            email: app.get_storage_data('user.email'),
            api_token: app.get_storage_data('user.api_token'),
            name: app.get_storage_data('user.name'),
            last_name: app.get_storage_data('user.last_name'),
            notes: app.get_storage_data('user.notes'),
            level: app.get_storage_data('user.level'),
            role: app.get_storage_data('user.role')
        }
    },

    setUserData: function(data) {
        app.set_storage_data('user.id', data.id);
        app.set_storage_data('user.email', data.email);
        app.set_storage_data('user.api_token', data.api_token);
        app.set_storage_data('user.name', data.name);
        app.set_storage_data('user.last_name', data.last_name);
        app.set_storage_data('user.level', data.level);
        app.set_storage_data('user.notes', data.notes);
        app.set_storage_data('user.role', data.role);
    },

    onBackKeyDown: function () {

        if(navigator.device!= undefined && navigator.device.platform === "iOS" && parseInt(navigator.device.version) === 9){
            //console.log("version" + device.version);
            //console.log("iOS 9");
            alert('navigator.device');
            history.go(0);
        }else if (navigator.app != undefined ){
            alert('navigator.app');
            navigator.app.backHistory();
        }
        else{
            alert('window');
            window.history.back();
        }
    },

    /*onBackKeyDown: function () {
        if( this.phonegapNavigationEnabled && nav && nav.app && nav.app.backHistory )
        {
            nav.app.backHistory();
        } else {
            window.history.back();
        }
    },*/

    finishOnBackDown: function(){
        if (typeof cordova !== 'undefined') {
            if (navigator.app) {
                navigator.app.exitApp();
            }
            else if (navigator.device) {
                navigator.device.exitApp();
            }
        } else {
            window.close();
            $timeout(function () {
                self.showCloseMessage = true;
            });
        }
    },

    exitApp: function(){
        if (navigator.app) {
            navigator.app.exitApp();
        }
        else if (navigator.device) {
            navigator.device.exitApp();
        }
    }
};
