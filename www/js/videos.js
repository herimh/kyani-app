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
var videos = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        $(document)
            .on('click', '.menu-item', function(e){
                e.preventDefault();
                loadItemVideos.doRequest($(e.target).parent(), $(e.target).data('id'));
                return false;
            })
            .on('click', '#app_exit', function(e){
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
                        self.showCloseMessage = true;  //since the browser can't be closed (otherwise this line would never run), ask the user to close the window
                    });
                }

            })
            .on('click', '#app_logout', function(e){
                app.clear_storage();
                window.location = 'index.html';
            });


        //Funciones que responden a los eventos
        var loadItemVideos = {
            doRequest: function(menuElement, menuItemId){
                var url = app.API_SERVER+'menu_item/'+menuItemId+'/videos';
                console.log(url);
                app.ajaxRequest('GET', url, null, loadItemVideos.successResponse, menuElement)
            },
            successResponse: function (videos_data, menuElement) {
                $('#loading_container').css('display', 'none');

                $('#videos_list').html('');
                for (var i=0; i< videos_data.length; i++){
                    var video = videos_data[i];

                    var newVideo = "<li class=\"collection-item avatar\">" +
                        "<i class=\"material-icons circle red\">play_arrow</i><a href=\""+ video.url+"\"><span class=\"title\">"+ video.title +"</span></a>" +
                        "<p></p> <a href=\""+ video.url +"\" class=\"secondary-content\">" +
                        "<i class=\"material-icons\">grade</i></a></li>";

                    $('#videos_list').append(newVideo);
                }


                $('.menu-item').parent().removeClass('active');
                $(menuElement).addClass('active');
            }
        };
    },

    onDeviceReady: function() {
        $(".button-collapse").sideNav();

        var userData = app.getUserData();
        document.getElementById('profile_name').innerHTML = userData.name + ' '+userData.last_name;
        document.getElementById('profile_email').innerHTML = userData.email;

        //var videosContainer = document.getElementById('videos_container');
        //var appLogout = document.getElementById('app_logout');

        var loadMenu = {
            doRequest: function () {
                app.ajaxRequest('GET', app.API_SERVER+'partner_menu', null, loadMenu.successResponse, null);
            },
            successResponse: function (menu_data, extra_data) {

                var menuItems = '';
                for (var i=0; i< menu_data.length; i++){
                    if (menu_data[i].menu_items !== undefined && menu_data[i].menu_items.length > 0){
                        menuItems += '<li><a class="subheader">'+ menu_data[i].name +'</a></li>';

                        for (var j=0; j< menu_data[i].menu_items.length; j++){
                            menuItems += ' <li><a class="waves-effect menu-item" href="#" data-id="'+ menu_data[i].menu_items[j].id +'" data-key="' + menu_data[i].menu_items[j].key + '">' +
                                '<i class="material-icons">'+ menu_data[i].menu_items[j].icon +'</i>' + menu_data[i].menu_items[j].name + '</a></li>';
                        }
                    }
                }

                $(menuItems).insertAfter($("#menu_profile"));
                $('.menu-item:eq(5)').click();

            }
        };

        loadMenu.doRequest();

        /*var createVideoList = function(videos){
            for (var i = 0; i<videos.length; i++){
                var video = videos[i];

                var newVideo = "<li class=\"collection-item avatar\">" +
                    "<i class=\"material-icons circle red\">play_arrow</i><a href=\""+ video.url+"\"><span class=\"title\">"+ video.title +"</span></a>" +
                    "<p></p> <a href=\""+ video.url +"\" class=\"secondary-content\">" +
                    "<i class=\"material-icons\">grade</i></a></li>";

                videosContainer.insertAdjacentHTML('beforeend', newVideo);
            }
        };*/
    }

};
