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
            })
            .on('click', '#contact_country', function(){
                $(this).focus();
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
        var contact_whatsapp = document.getElementById('contact_whatsapp');
        var contact_country = document.getElementById('contact_country');
        var loading = document.getElementById('preloader');//cJuan


        var contactToken= {//CJuan
            doRequest: function(e){
                contact_submit. disabled = true;//CJuan
                loading.style.display= 'inline-table';

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
                    'whatsapp': contact_whatsapp.value,
                    'country': $(contact_country).find('option:selected').text(),
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

        $('#contact_form').validate({
            rules: {
                contact_email: {
                    required: true,
                    email: true
                },
                contact_name: {
                    required: true,
                    minlength: 5
                },
                contact_phone: {
                    number: true,
                    minlength: 8
                },
                contact_whatsapp: {
                    required: true,
                    number: true,
                    minlength: 10
                }
            },
            //For custom messages
            messages: {
                contact_email:{
                    required: "Escribe tu email",
                    email: "Email no válido"
                },
                contact_name:{
                    required: "Escribe tu nombre y apellidos",
                    minlength: "Escribe al menos 5 letras"
                },
                contact_phone: {
                    number: 'Solo se aceptan numeros',
                    minlength: 'Escribe al menos 8 numeros'
                },
                contact_whatsapp: {
                    required: 'El numero de whatsapp es requerido',
                    number: 'Solo se aceptan numeros',
                    minlength: 'Escribe al menos 8 numeros'
                }
            },
            submitHandler: function (form, event) {
                contactToken.doRequest(event)
            },

            errorElement : 'div',
            errorPlacement: function(error, element) {
                var placement = $(element).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element);
                }
            }
        });

                       
        //contact_form.addEventListener('submit', contactToken.doRequest);
    },

};
