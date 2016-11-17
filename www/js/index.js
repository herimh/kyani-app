var index = {

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("backbutton", app.finishOnBackDown, false);

        $(document)
            .on('click', '.menu-item', function(e){
                e.preventDefault();
                if ($(e.target).data('key') == 'contact_form'){
                    window.location = 'contact.html';
                }else{
                    loadItemVideos.doRequest($(e.target).parent(), $(e.target).data('id'));
                }

                return false;
            })
            .on('click', '#partner_login a', function(e){
                window.location = 'login.html'
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

            });


        //Funciones que responden a los eventos
        var loadItemVideos = {
            doRequest: function(menuElement, menuItemId){
                var url = app.API_SERVER+'menu_item/'+menuItemId+'/videos';
                app.ajaxRequest('GET', url, null, loadItemVideos.successResponse, menuElement)
            },
            successResponse: function (videos_data, menuElement) {
                $('#loading_container').css('display', 'none');

                $('#videos_list').html('');
                for (var i=0; i< videos_data.length; i++){
                    var video = videos_data[i]

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

        if (app.getUserApiToken() == null || app.getUserApiToken() == ''){
            //TODO: show client screen
        }else {
            index.redirectToVideos();
        }

        var loadMenu = {
            doRequest: function () {
                app.ajaxRequest('GET', app.API_SERVER+'client_menu', null, loadMenu.successResponse, null);
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
                $('.menu-item:first').click();

            }
        };

        loadMenu.doRequest();
    },

    redirectToVideos: function () {
        window.location = 'videos.html';
    }
};
