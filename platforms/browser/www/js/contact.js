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
var contact = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
        $(document)
            .on('click', '#close_contact_form', function () {
                app.onBackKeyDown();
            })
            .on('click', '#button_go_home', function () {
                app.onBackKeyDown();
            });
    },

    //TODO: document ready
    onDeviceReady: function() {
        var contact_email = document.getElementById('contact_email');
        var contact_name = document.getElementById('contact_name');
        var contact_phone = document.getElementById('contact_phone');
        var contact_comment = document.getElementById('contact_comment');
        var contact_form = document.getElementById('contact_form');
        var contact_submit = document.getElementById('contact_submit');
        var loading = document.getElementById('preloader');//cJuan


        var contactToken= {//CJuan
            doRequest: function(e){
                alert('hola mundo');
                contact_submit. disabled = true;//CJuan
                loading.style.display= 'inline-table';

                console.log('Estamos en el doRequest del contactToken');

                e.preventDefault();
                app.ajaxRequest('GET', app.API_SERVER + 'token', null, contactToken.successResponse, null);
                return false;
            },
            successResponse: function(response_data, extra_data){
                app.setServerToken(response_data.token);
                console.log('guardamos el Token'+response_data.token);
                contactInsert.doRequest();
            }
        };

        var contactInsert = {            
            doRequest: function () {               
                var data = {
                    '_token': app.getServerToken(),
                    'name': contact_name.value,
                    'email': contact_email.value,
                    'phone': contact_phone.value,
                    'comments': contact_comment.value
                };                
                app.ajaxRequest('POST', app.API_SERVER + 'contact', data, contactInsert.successResponse, null);
            },
            successResponse: function(data, extra_data){             
                console.log(data);
                if (data.success != undefined && data.success == false )
                {
                    //TODO: send failed message
                    alert('Hubo un error al insertar');
                    contact_submit. disabled = false;//CJuan
                    loading.style.display= 'none';
                }
                else 
                {
                    $('#contact_form').css('display', 'none');
                    $('#success_display').css('display', 'block');
                }
            }
        };

                       
        contact_form.addEventListener('submit', contactToken.doRequest);    
    },

    redirectContact: function () {        
        console.log('Redirigimos Contact.html después del registro');        
        window.location = 'contact.html';
    },

};
