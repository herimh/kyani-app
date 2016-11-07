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
var login = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    //TODO: document ready
    onDeviceReady: function() {
        var emailInput = document.getElementById('login_email');
        var passwordInput = document.getElementById('login_password');
        var loginForm = document.getElementById('login_form');
        var registerButton = document.getElementById('user_register');

        var loginRequest = {
            doRequest: function (e) {
                if (e.preventDefault) e.preventDefault();
                var data = {
                    '_token': app.getServerToken(),
                    'email': emailInput.value,
                    'password': passwordInput.value
                };

                app.ajaxRequest('POST', app.API_SERVER + 'login', data, loginRequest.successResponse, null);

                return false;
            },
            successResponse: function(data, extra_data){
                if (data.failed !== undefined){
                    console.log('failed');
                    console.log(data);
                    //TODO: send failed message
                }else {
                    redirectLoginSuccess(data)
                }
            }
        };

        var redirectLoginSuccess = function (user_data){
            app.setUserApiToken(user_data.api_token);
            app.setUserData(user_data);

            window.location = 'videos.html';
        };

        var redirectLoginFailed = function(){

        };

        var redirectRegister = function(){

        };

        registerButton.addEventListener('click', redirectRegister, true);
        //submitButton.addEventListener('click', loginRequest.doRequest, true);
        loginForm.addEventListener('submit', loginRequest.doRequest);
    },

    onLoginRequest: function () {

    },

    onLoginResponse: function(){

    }

    /*ajaxResponse: function(data, extra_data){
        console.log(data);
    }*/


};
