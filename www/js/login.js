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

        $(document)
            .on('click', '#button_go_home', function () {
                app.onBackKeyDown();
            })
    },

    //TODO: document ready
    onDeviceReady: function() {
        var emailInput = document.getElementById('login_email');
        var passwordInput = document.getElementById('login_password');
        var loginForm = document.getElementById('login_form');
        var registerButton = document.getElementById('user_register');
        var submitButton = document.getElementById('login_submit');//cJuan
        var errorLog = document.getElementById('errorLog');//cJuan
        var loading = document.getElementById('preloader');//cJuan
        var container_login = document.getElementById('container_login');//cJuan
        var container_registro = document.getElementById('container_registro');//cJuan
        var cancelar_registro = document.getElementById('cancelar_registro');//cJuan
        var register_form = document.getElementById('register_form');//cJuan

        var register_email = document.getElementById('register_email');//cJuan
        var register_password = document.getElementById('register_password');//cJuan
        var nombre = document.getElementById('nombre');//cJuan
        var apellidos = document.getElementById('apellidos');//cJuan
        var submit_register= document.getElementById('submit_register');
        var errorLog_Register= document.getElementById('errorLog_Register');
        var confirm_password = document.getElementById('confirm_password');
        var loading_register = document.getElementById('preloader_register');//cJuan



        var logincheck= {//CJuan
            doRequest: function(e){
                submitButton. disabled = true;//CJuan  
                loading.style.display= 'inline-table';
                errorLog.style.display= 'none';
                if (e.preventDefault) e.preventDefault();
                app.ajaxRequest('GET', app.API_SERVER + 'token', null, logincheck.successResponse, null);                                 
                return false;
            },
            successResponse: function(response_data, extra_data){
                app.setServerToken(response_data.token);                               
                loginRequest.doRequest();                                               
            }

        };

        var loginRequest = {            
            doRequest: function () {               
                var data = {
                    '_token': app.getServerToken(),
                    'email': emailInput.value,
                    'password': passwordInput.value
                };                
                app.ajaxRequest('POST', app.API_SERVER + 'login', data, loginRequest.successResponse, null);
            },
            successResponse: function(data, extra_data){             
                if (data.failed !== undefined){
                    console.log('failed');
                    console.log(data);
                    //TODO: send failed message
                    submitButton. disabled = false;//CJuan 
                    errorLog.style.display= 'block';
                    loading.style.display= 'none';
                }else {
                    redirectLoginSuccess(data)                                    
                }
            }
        };


        var contactToken= {//CJuan
            doRequest: function(e){
            submit_register. disabled = true;//CJuan  
            loading_register.style.display= 'inline-table';
            errorLog_Register.style.display= 'none';
            console.log('Estamos en el doRequest del contactToken');        
                if (e.preventDefault) e.preventDefault();
                app.ajaxRequest('GET', app.API_SERVER + 'token', null, contactToken.successResponse, null);                                 
                return false;
            },
            successResponse: function(response_data, extra_data){
                app.setServerToken(response_data.token);       
                console.log('guardamos el Token'+response_data.token);
                loginRegister.doRequest();                                               
            }

        };




        var loginRegister= {
            doRequest:function (e){
                //if (e.preventDefault) e.preventDefault();
                var data= {
                    '_token': app.getServerToken(),
                    'email': register_email.value,
                    'password': register_password.value,
                    'name': nombre.value,
                    'last_name': apellidos.value
                };
                if (register_password.value!=confirm_password.value)                 
                {
                    errorLog_Register.style.display= 'block';
                    submit_register. disabled = false;//CJuan  
                    loading_register.style.display= 'none';
                }
                else
                {
                    app.ajaxRequest('POST', app.API_SERVER + 'register_user', data, loginRegister.successResponse, null);
                }
                //return false;
            },
            successResponse: function (data,extra_data){
                if (success = false)
                {
                    alert('Hubo un error al Insertar');
                    submit_register. disabled = false;//CJuan  
                    loading_register.style.display= 'none';
                }
                else
                {
                    login.redirectToVideos();            
                }
                console.log(data);
            }
        };


        if (app.getUserApiToken() == null || app.getUserApiToken() == ''){            
            console.log('No hay sesión');            
        }else {
            login.redirectToVideos();            
        }

        var redirectLoginSuccess = function (user_data){
            app.setUserApiToken(user_data.api_token);
            app.setUserData(user_data);
            console.log('Redirigimos al videos');
            window.location = 'videos.html';
        };

        var redirectLoginFailed = function(){

        };
        
        var redirectRegister = function(e){
            if (e.preventDefault) e.preventDefault();            
            container_login.style.display= 'none';
            container_registro.style.display= 'block';
            return false;
        };

        var ShowLogin = function(e){       
            if (e.preventDefault) e.preventDefault();     
            container_login.style.display= 'block';
            container_registro.style.display= 'none';    
            errorLog.style.display= 'none';                 
            return false;
        };


        var ConfirmRegister= function(e){       
            if (e.preventDefault) e.preventDefault();     
            //alert('Registro con éxito');     
            //login.redirectLogin();       
            //return false;

        };


        
        registerButton.addEventListener('click', redirectRegister, true);                  
        loginForm.addEventListener('submit', logincheck.doRequest);
        cancelar_registro.addEventListener('click', ShowLogin, true);
        //register_form.addEventListener('submit', ConfirmRegister,true); 
        register_form.addEventListener('submit', contactToken.doRequest); 
    },

    redirectToVideos: function () {        
        window.location = 'videos.html';      
    },

    redirectLogin: function () {        
        console.log('Redirigimos al Login después del registro');        
        //window.location = 'login.html';   
    },

    onLoginRequest: function () {

    },

    onLoginResponse: function(){

    }
    
    /*ajaxResponse: function(data, extra_data){
        console.log(data);
    }*/


};
