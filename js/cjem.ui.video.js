/*
@siopo1
CJ E&M Meida Player
*/

var _version = "201509031743";
var AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH = 'http://ma194-r.analytics.edgesuite.net/config/beacon-3409.xml';
var videoData = null;
var vr_mobile_chk = false;

(function ($) {

    var _globaloptions = {
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        railalign: "right",
        isFirst: false,
        isflash: false,
        ismobile: false,
        isios: false,
        isipad: false,
        isglobal: false,
        isandroid: false,
        isad: false,
        isadno: false,
        isadnoPlay: false,
        ischrome: false,
        adroid_num: 0,
        wmode: "opaque",
        jsonType: "json",
        width: 640,
        height: 360,
        track: 0,
        isfile: false,
        isyoutube: false,
        isConfigYoutube: false,
        adPlaying: false,
        youtubePlaying: false,
        cdn_chk: false,
        isautotrack: false,
        isautotrackstart: false,
        youtube_mc: null,
        youtube_id: '',
        youtube_box_id: '',
        youtube_box_mc: '',
        chromeless: 'N',
        buy_fn: null,
        nologin_fn: null,
        no19_fn: null,
        login19_fn: null,
        istmp: false,
        isMobileUI: true,
        limittime: 'N',
        istitle: 'N',
        ad_skip_num: 5,
        cdn_type: null,
        
        
        float_arr:[],
        
        media_events: {
            loadstart: 0,
            progress: 0,
            suspend: 0,
            abort: 0,
            error: 0,
            emptied: 0,
            stalled: 0,
            loadedmetadata: 0,
            loadeddata: 0,
            canplay: 0,
            canplaythrough: 0,
            playing: 0,
            waiting: 0,
            seeking: 0,
            seeked: 0,
            ended: 0,
            durationchange: 0,
            timeupdate: 0,
            play: 0,
            pause: 0,
            ratechange: 0,
            volumechange: 0,
            networkState: 0
        }
    };

    jQuery.cjvideoskin = {
        play_btn: null,
        play_btn: null,
        now_txt: null,
        total_txt: null,
        sound_btn: null
    }

    // 비디오 클레스
    var cjVideoClass = function (myopt, me) {


        log("CJ Video Class");
        
        var self = this;

        this.version = '1.0.0';
        this.name = 'cjvideo';
        this.v = -1;
        this.me = me;
        this.opt = {
            doc: $("body"),
            win: false,
            alwaysQualityBtn:false
        };
        this.videoData = {
            nowtime: 0,
            opt: null,
            totaltime: 0,
            ad_data: null,
            info_data: null,
            user_data: null,
            login_chk: false,
            isAdultBlock: false,
            trackListType: "null",
            trackList: null,
            lang: {
                error: 'The clip has not been loaded properly.',
                adIng: "광고중",
                adSkip: "광고 건너뛰기"
            },
            message: {
                nohdselect: "비로그인시에는 일반음질로 듣기만 가능합니다.<br/>로그인해주세요.",
                cmtlogin: "로그인을 하셔야 댓글을 남기실수 있습니다.<br/>로그인 하시겠습니까?",
                ppsMobile: "사용중인 이용권은 모바일 웹에서 1분 미리 듣기만 가능합니다.\n전곡 듣기는 모바일 앱 또는 PC 웹에서 이용 가능합니다.",
                adultAuth: "이 컨텐츠는 청소년유해매체물로서 청소년보호법 등에 따라 19세 미만의 청소년이 이용할 수 없습니다. <br/>성인인증 후 이용할 수 있습니다.",
                loginNoAge: "<br/><span style='color: #777;'>이 컨텐츠는 청소년유해매체물로서<br/>청소년보호법 등에 따라 실명인증 없이는 이용이 불가능합니다.</span><br/><b>CJONE으로 로그인하시면 실명인증이 가능합니다.</b></span>"

                ,
                mobile: {
                    adultAuth: "이 컨텐츠는 청소년유해매체물로서 청소년보호법 등에 따라 19세 미만의 청소년이 이용할 수 없습니다. \n성인인증 후 이용할 수 있습니다. \n성인인증 하시겠습니까?",
                    loginNoAge: "이 컨텐츠는 청소년유해매체물로서 \n청소년보호법 등에 따라 실명인증 없이는 이용이 불가능합니다. \nCJONE으로 로그인하시면 실명인증이 가능합니다.",
                    networkWarning: "LTE/3G 환경에서는 추가 데이터 요금이 발생할 수 있습니다."
                }
            },
            file: {
                css: "http://player.interest.me/flv/service/player/css/mediaPlayer_201510081612.css?v=1"
                ,globalCss : "http://static.global.mnet.com/data/od/css/chat/mediaPlayer.css?v=1"
//                  css:"//52.80.153.48/guide/css/mediaPlayer.css?v=" + _version
            }
            ,urlJsStr : "//player.interest.me/include/js/player/"
            ,urlCssStr : "//player.interest.me/flv/service/player/css/"
            
        };
        this.boxid = self.me.attr('id') + "-box";
        this.id = self.me.attr('id');
        this.box_mc = null;
        this.player_mc = null;
        this.btn_mc = null;
        this.btnQuality_mc = false;
        this.overview_mc = null;
        this.adView_mc = null;
        this.video_mc = null;
        this.media_mc = null;
        this.config_obj = {};
        this.one_obj = {};
        this.one_chk = false;
        this.info_obj = {};
        this.user_obj = {};
        this.cdn_obj = {};
        this.data_arr = [];
        this.data_num = 0;
        this.player_arr = [];
        this.original_obj = {};
        this.before_ad_arr = [];
        this.after_ad_arr = [];
        this.spinner = null;
        this.skin = {};
        this.timer_ent;
        this.returnStatus = myopt.returnStatus;
        this.mediaData = {};
        this.control_chk = false;
        this.control_mc = null;
        this.playing = false;

        $.extend(this.opt, _globaloptions);
        $.extend(jQuery.cjvideoskin, {
            boxid: this.boxid,
            clip_start: myopt.clip_start,
            clip_end: myopt.clip_end
        });
        
        // Ajax 셋팅 캐쉬 타는걸로 (기본이 false로 들어가는데 그러면 getScript 를 통한 로드를 시도할때 뒤에 난수가 붙음)
        $.ajaxSetup({
          cache: true
        });

        //return
        myopt.returnStatus = "";

        log(self.me.attr('id'));
        myopt.boxid = this.boxid;

        // Options for internal use
        this.opt.snapbackspeed = 80;
        this.win = self.opt.win || (this.ispage ? $(window) : this.doc);

        //data Object
        document['cjvideo_' + this.boxid] = self.me;
        self.me.data('cjvideo', self);
        
        self.me.attr('class', 'orr');
        log(self.me.attr('id'));
        log("~~~~~~~~~~~~~~~~~~~~");
        for (i in myopt) {
            log(i + " : " + myopt[i]);
        }
        log("~~~~~~~~~~~~~~~~~~~~");


        if (myopt || false) {
            for (var a in myopt) {
                if (typeof self.opt[a] == "undefined") self.opt[a] = myopt[a];
                
                if(a == 'videoData') $.extend( self.videoData, myopt[a] );
            }
            for (var a in self.opt) {
                if (typeof myopt[a] != "undefined") self.opt[a] = myopt[a];
            }
        }
        
        self.videoData.opt = self.opt;
        
        // 글로벌인 경우
        if(self.opt.isglobal) {
            self.videoData.urlJsStr = "//static.global.mnet.com/data/od/js/player/";
            self.videoData.urlCssStr = "//static.global.mnet.com/data/od/css/player/";
            self.videoData.file.css = self.videoData.file.globalCss;
        } else {
            
        }

        if (dataChk(self.opt.error)) self.videoData.lang.error = decodeURIComponent(self.opt.error);

        if (dataChk(self.opt.cdn)) {
            if (typeof self.opt.cdn !== 'object') {
                self.opt.cdn = escape(self.opt.cdn);
            }
        }

        if (dataChk(self.opt.cdn_list)) self.opt.cdn = self.opt.cdn_list;
        if (dataChk(self.opt.youtube)) {
            self.opt.isyoutube = true;
        };

        // 버전 체크
        this.getAndroidVersion = function(ua) {
            ua = (ua || navigator.userAgent).toLowerCase(); 
            var match = ua.match(/android\s([0-9\.]*)/);
            return match ? match[1] : false;
        };
        this.version = function () {
            var osAgent = navigator.userAgent.toLowerCase();
            
            if (((osAgent.indexOf("iphone") != -1) || (osAgent.indexOf("ipod") != -1) || (osAgent.indexOf("ipad") != -1))) {
                self.opt.ismobile = true;
                self.opt.isios = true;

                if (osAgent.indexOf("ipad") != -1) {
                    self.opt.isipad = true;
                }
            }
            if ((osAgent.indexOf("android") != -1)) {
                self.opt.ismobile = true;
                var re = new RegExp("android[\\/\\s](\\d+\\.\\d+)");
                re.test(osAgent);
                self.opt.adroid_num = RegExp["$1"];
                if (self.opt.adroid_num < 3) {
                    self.opt.isad = true;
                    self.opt.isadno = true;
                } else {}
                self.opt.isandroid = true;
            }
            if ((osAgent.indexOf("chrome") != -1)) {
                self.opt.ischrome = true;
            }
            if (osAgent.indexOf("opera tv") != -1) {
                self.opt.ismobile = true;
                self.opt.isios = true;
                self.opt.isipad = true;
            }
            
            var lg_str = osAgent.split('cjapp')[0];
            if (lg_str.indexOf("lg") != -1) {
                self.opt.islg = true;
            }
            
            if (self.opt.ismobile) {
                $('body').addClass("player-control--touch");
            } else {
                $('body').addClass("player-control--mouse");
            }

            /*
			if(osAgent.indexOf("window") != -1 || osAgent.indexOf("mac") != -1) {
               $('body').addClass("player-control--mouse");
            } else {
                $('body').addClass("player-control--touch");
            }
			*/

            if (swfobject.hasFlashPlayerVersion("10.2") && !self.opt.ios) {
                self.opt.isflash = true;
            } else {
                self.opt.isflash = false;
            }
            if (self.opt.isandroid || self.opt.isios) self.opt.isflash = false;
            
            
            if (self.opt.mode == "html5" || !dataChk(self.opt.flash)) {
                self.opt.mode = "html5";
                self.opt.isflash = false;
                self.opt.isMobileUI = true;
                //self.opt.stream_type = "streaming";
            }
            
            //
            //self.opt.ismobile=true;
            //self.opt.isios=true;
            //self.opt.isflash=false;

            // 안드 3이하 생방이면 플래시로만 지원하도록.
            if (self.opt.isadno && self.opt.onair == "Y") {
                self.opt.isflash = true;
                self.opt.isMobileUI = false;
                //("안드 3이하 생방이면 플래시로만 지원하도록.");
                //mobile_chk = false;
            }
            
            $.each(self.opt, function(i, item) {
                   log(i + " : " + item, "color:blue");
            })
            
            
            
            videoData = self.opt;
        };

        // 플레이어 생성
        this.makeVideo = function () {

            // 키보드 이벤트.. 
            $(document).off("keydown");
            $(document).keydown(function (e) {

                if ($(e.target).is("input")) return;
                if ($(e.target).is("textarea")) return;
                log("e.keyCode : " + e.keyCode);

                switch (e.keyCode) {

                    // esc
                case 27:
                    swfobject.getObjectById(self.id).volumeToggle();
                    break;

                    // 스페이스
                case 32:
                    swfobject.getObjectById(self.id).playToggle();
                    break;

                    // Prev
                case 37:
                    swfobject.getObjectById(self.id).skipMinus(e.shiftKey);
                    break;

                    // Next
                case 39:
                    swfobject.getObjectById(self.id).skipPlus(e.shiftKey);
                    break;

                    // 볼륨 +
                case 38:
                    //swfobject.getObjectById(self.id).volumePlus();
                    break;

                    // 볼륨 -
                case 40:
                    //swfobject.getObjectById(self.id).volumeMinus();
                    break;

                    // 음소거
                case 77:
                    swfobject.getObjectById(self.id).volumeToggle();
                    break;

                    // 삭제
                case 46:
                    break;
                }
            })

            self.opt.width = self.me.width();
            self.opt.height = self.me.height();

            if (self.me.height() < 100 || self.me[0].style.height == '100%') {
                self.opt.width = "100%"
                self.opt.height = "100%"
            }

            // BOX 생성
            if (!dataChk($('#' + self.boxid).get(0))) {
                //self.me.attr('id', self.boxid);
                self.me.wrap('<div id="' + self.boxid + '" class="cjVideo-box" ><div class="player-box"/></div>');
                //return;
                self.box_mc = $("#" + self.boxid);
                self.player_mc = self.box_mc.find(".player-box");
                self.box_mc.append('<div class="playbtn" style="display:none"><div class="btn"></div><div class="img"></div></div>');

                self.box_mc.resize(self.resize);

                try {
                    //*
                    //self.box_mc.css({'-ms-user-select': 'none','-moz-user-select': '-moz-none','-khtml-user-select': 'none','-webkit-user-select': 'none','user-select': 'none'});
                    self.box_mc.on("contextmenu", function (e) {
                        //return false;
                    });
                    //*/
                } catch (e) {

                }
            }
            
            
            var videoContainer = $('#' + self.boxid).get(0);
            videoData.isfullscreenbox = false;
            if (videoContainer.requestFullscreen
                || videoContainer.mozRequestFullScreen
                || videoContainer.webkitRequestFullscreen
                || videoContainer.msRequestFullscreen) {
                videoData.isfullscreenbox = true;
            }

            self.btn_mc = self.box_mc.find('.playbtn');
            var btnGo_obj = self.box_mc.find('.playbtn .btn');
            btnGo_obj.removeClass('btn');
            btnGo_obj.addClass('btnGo');
            btnGo_obj.before('<div class="btnCustom"></div>');
            btnGo_obj.before('<div class="btnBG"></div>');
            var btnCustom_obj = self.box_mc.find('.btnCustom');
            var btnBG_obj = self.box_mc.find('.btnBG');

            // CSS
            self.box_mc.css({
                'position': 'relative',
                'width': self.opt.width,
                'height': self.opt.height,
                'background-color': '#000'
            });
            self.box_mc.find('.player-box').css({
                'width': '100%',
                'height': '100%',
                'min-height': '100%',
                'background-color': '#000'
            });
            self.box_mc.find('#' + self.id).css({
                'width': '100%',
                'height': '100%',
                'min-height': '100%'
            });


            var t_width_num = Math.floor(self.box_mc.height() / 2.6);
            if (t_width_num > 120) t_width_num = 120;
            if (t_width_num == 0) t_width_num = 65;
            t_width_num = 65;

            if (!self.opt.isflash || dataChk(self.opt.youtube)) {
                self.box_mc.find('.playbtn').css({
                    'z-index': '9999',
                    'position': 'absolute',
                    'top': '0',
                    'height': '100%',
                    'width': '100%',
                    'background-color': 'transparents',
                    'text-align': 'center',
                    'overflow': 'hidden'
                });
                self.box_mc.find('.playbtn a').css({
                    'display': 'table-cell',
                    'line-height': 'normal',
                    'width': '100%',
                    'height': '100%',
                    'vertical-align': 'middle'
                });
                self.box_mc.find('.playbtn img').css({
                    'display': 'inline-block',
                    'text-align': 'center',
                    'vertical-align': 'center',
                    'visibility': 'visible',
                    'max-width': 'none',
                    'max-height': 'none'
                });

                btnGo_obj.css({
                    'position': 'absolute',
                    'border': '0',
                    'border-radius': t_width_num + 'px',
                    'height': t_width_num + 'px',
                    'width': t_width_num + 'px',
                    'left': '50%',
                    'top': '50%',
                    'margin': '-' + (t_width_num / 2 + 3) + 'px 0 0 -' + (t_width_num / 2 + 3) + 'px',
                    'text-indent': '-9999px'
                        //,'background':'rgba(0,0,0,0.75)'
                        ,
                    'z-index': '99999'
                        //,'box-shadow':'0px 0px 20px rgba(0,0,0,1)'
                        ,
                    'opacity': '.9'
                });
                btnGo_obj.append("<div class='arrow1'></div>");
                btnGo_obj.append("<div class='arrow2'></div>");
                btnGo_obj.find('div.arrow2').css({
                    'content': '',
                    'position': 'absolute',
                    'left': '' + (t_width_num / 2 - t_width_num / 3.2 / 3) + 'px',
                    'top': '' + (t_width_num / 2 - t_width_num / 5) + 'px',
                    'border-color': 'transparent transparent transparent #fff',
                    'border-style': 'solid',
                    'border-width': '' + (t_width_num / 5) + 'px 0 ' + (t_width_num / 5) + 'px ' + (t_width_num / 3.2) + 'px'
                });
                btnGo_obj.find('div.arrow1').css({
                    'content': '',
                    'position': 'absolute',
                    'left': '' + (t_width_num / 2 - t_width_num / 3.2 / 3 + 1) + 'px',
                    'top': '' + (t_width_num / 2 - t_width_num / 5 + 1) + 'px',
                    'border-color': 'transparent transparent transparent #000',
                    'border-style': 'solid',
                    'border-width': '' + (t_width_num / 5) + 'px 0 ' + (t_width_num / 5) + 'px ' + (t_width_num / 3.2) + 'px'

                    ,
                    '-webkit-filter': 'blur(1px)',
                    '-moz-filter': 'blur(1px)',
                    '-o-filter': 'blur(1px)',
                    '-ms-filter': 'blur(1px)',
                    'filter': 'blur(1px)'
                });
                btnBG_obj.css({
                    'position': 'absolute',
                    'border': '0',
                    'border-radius': t_width_num + 'px',
                    'height': t_width_num + 'px',
                    'width': t_width_num + 'px',
                    'left': '50%',
                    'top': '50%',
                    'margin': '-' + (t_width_num / 2 + 3) + 'px 0 0 -' + (t_width_num / 2 + 3) + 'px',
                    'text-indent': '-9999px',
                    'background': 'rgba(0,0,0,0.75)',
                    'z-index': '99999'
                        //,'box-shadow':'0px 0px 20px rgba(0,0,0,1)'
                        ,
                    'opacity': '.9'
                });


                /*
                
				*/
                if (typeof self.btn_mc.find('.btnGo span.icon_play').get(0) != 'undefined') {
                    self.btn_mc.find('.btnGo span.icon_play').remove();
                }

                self.box_mc.append('<div class="videoOverView" style="position:absolute;top:0;left:0;z-index:9999;width:100%;overflow:hidden;"><p class="videotitle" style="color:#fff;font-family:AppleSDGothicNeo-Regular,맑은고딕,Malgun Gothic,돋움,Dotum,Helvetica,Arial;font-size:14px;opacity:1;margin:0;padding:0px 6px;position:relative;z-index:1;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;min-width: 0;heignt:26px;line-height:32px;"></p><div style="width:100%;height:100%;background:#000;opacity:.75;position:absolute;top:0;"></div></div>');
                self.overview_mc = self.box_mc.find('.videoOverView');


                self.box_mc.append('<div class="videoErrorTxt" style="display:none;width:100%;height:100%;overflow:hidden;position:absolute;z-index:9999;background:rgba(0, 0, 0, 0.9);top:0;left:0;"><p style="position:absolute;top:50%;text-align:center;width:100%;overflow:hidden;color:#fff;padding:0 10px;margin:0;box-sizing:border-box;"></p></div>');
                self.box_mc.append('<div class="videoiOSADTxt"><p><span style="opacity:0">본 영상은 광고 후 재생됩니다.</span></p></div>');
                self.box_mc.append('<div id="videoPlayerDisabled" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:999999;background:#000;opacity:0.5;display:none;"></div>');

                log("#Video Tag Make");


                if (self.opt.ui_site == "mnet") {
                    btnBG_obj.remove();
                    btnGo_obj.remove();
                    btnCustom_obj.html('<svg version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 640 360" enable-background="new 0 0 640 360" xml:space="preserve"><g id="MnetPlayBtn"><g opacity="0.7" enable-background="new"><image overflow="visible" opacity="0.15" width="111" height="85" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAABVCAYAAABHJLqrAAAACXBIWXMAAAsSAAALEgHS3X78AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABBJJREFUeNrsnUlvE0EQhcdjxziEWOyEBARhOSE4IARC4gASvxsOwIH1wCI4ICEkzBYggbCEbEMVeQ3tyTiEiYkH6XvSU0t2ew7+/Lqr24eqJeVUy42ovLLc+NcQ1js3eMjc1AjAjYFbMM9rzCL3DV4qUC15u3mvuW1uALA0uEXzJ/Nb84x5TnaQyxuFVxO4YfMe84Sg+XjMvM+8BQ6l9d38xvzU3BFEH6fM3wQwKwMvpG3UvN98ynzafEgg9yl5QzAorQUl742APTffM983vzLPrpXCRo+H1pU2T9mk+YT5rPmkXhtW4tjzNr507jCPKWnHFYpd5kfmZ0qjv7e0HnhhmTygpJ0TvEmBa2lODXB9Uarib8S8TXaYR803lcQX5q/5BDYKltEhQXJwl81ntGyO6r2U77uvqkW1xVbVE20xGNWcee2F8/Ee2Cj4FfgHjihxDu6wHpqStE1L4Y6oEJzV0ul743S8fNZzH3RIB7W/XdAa3NY8wG1eElMFqyFYDu2d+bOOF1kMrybiY0rbRVWXuznHDRRiAJgpgR/iva8epW5ESbtkPq+CpcUeN/AENmWvOF+a34e9L40mtrRJHspVlWiwe2ARl1oSFSFeRfqV17gO4MOAqxTAcMM1Lk4/z9cBUFNU4ysv9rnqLJ9bxOWYODXzyWsn3VdewKsOvEI+aW4Cf/NUG2AXn7RgEqo2xK7NEP3HlQwCHgIeAh7wEPAQ8BDwgIeAh4AHPAQ8BDwEPOAh4CHgIeABDwEPAQ94CHgIeAh4wEPAQ8BDwAMeAh4CHvAQ8BDwEPCAh4CHgAc8BDwEPAQ84CHgIeAh4AEPVQ5exldSaWVF8Ip6l6JqQVvFJ43eCB0UPwGwkuBW8QnJc6Le5uupJnwHXqXgxb1l34pXV/K8W7A3GoqbzaLBa1k8psRnJp88Bzgnqs81zgGwEuCKuHT1zwsA3d6vzVue7ExW2rLR+HCwe91r813ztWSlCfCv7pX1HhVNaAzlAGnFNrjUfTQ/Nl9NVpr/duJ6JA/PiS7qdQe3W+kL3StJ4OYkzsF5h0rv0nzbfEPFymy8ldULPrwkh4aIW5Pf7S9p+vvv07agxDm4O1ouHyQrPWMX48n1HuR96fyiKmdBD61rOY2XUED2J2lh1fumPe6J+ZbAeZ/0V0XHt17wwoOmVeFM6/WmgC3n4GW4lJcVlK86fL9QcXLFfN38UOAKj26NHr+GJT2wo4c6wPc6KHrvUm+BGTfiQ+UU35xM6TjgSbsvaLPRyrdKf1r2Qsfg0LN0QlWoj3GLUlRO8c1JRyHp5C5KsrXgrEepEtaStwtiO6GP+kb2usVoZZvRAXxurbSVgZdERwValPb/IB7/W5Al67xXLvvF16g2+wowSUr8EfBDgAEAeiNbtRQYd9IAAAAASUVORK5CYII="  transform="matrix(1 0 0 1 264.5 137.5002)"></image><g><path fill="#FFFFFF" d="M372,204c0,8.285-6.717,15-15,15h-74c-8.284,0-15-6.715-15-15v-48c0-8.284,6.716-15,15-15h74 c8.283,0,15,6.716,15,15V204z"/></g></g><polyline points="309.417,199.25 309.417,162.25 337.25,180.75 	"/></g></svg>');

                    btnCustom_obj.css({
                        'content': '',
                        'position': 'absolute',
                        'left': 0,
                        'top': 0,
                        'width': '100%',
                        'height': '100%',
                        'z-index': '99999'
                    });
                }
            }

            //self.spinner = new Spinner({lines: 9, length: 0, width: 6, radius: 10, corners: 1, rotate: 0, color: '#fff', speed: 1.2, trail: 60, shadow: false, hwaccel: false, className: 'spinner', zIndex: 2e9});

            self.loading(true);




            /*
			self.box_mc.append('<div id="svgLoading" style="position:absolute;top:0;left:0;z-index:999999"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px">\
				<g>\
					<g>\
						<path fill="none" d="M6,17.407c1.19,0.644,2.552,1.01,4,1.01c4.649,0,8.417-3.768,8.417-8.417S14.649,1.583,10,1.583 S1.583,5.351,1.583,10c0,0.339,0.026,0.671,0.065,1C1.977,13.773,3.648,16.134,6,17.407z"/>\
						<path fill="none" d="M10,0C4.477,0,0,4.477,0,10c0,0.337,0.018,0.671,0.05,1h1.598c-0.039-0.329-0.065-0.661-0.065-1 c0-4.649,3.768-8.417,8.417-8.417S18.417,5.351,18.417,10S14.649,18.417,10,18.417c-1.448,0-2.81-0.366-4-1.01V18H4.018 c1.669,1.25,3.736,2,5.982,2c5.523,0,10-4.477,10-10S15.523,0,10,0z"/>\
						<path fill="#FFFDFD" d="M6,17.407C3.648,16.134,1.977,13.773,1.648,11H0.05c0.285,2.864,1.784,5.364,3.968,7H6V17.407z"/>\
					</g>\
					<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="12.3433" y1="4.0215" x2="7.1348" y2="17.313">\
						<stop  offset="0.0559" style="stop-color:#FFFFFF;stop-opacity:0"/>\
						<stop  offset="0.9356" style="stop-color:#FFFFFF"/>\
					</linearGradient>\
					<path fill-rule="evenodd" clip-rule="evenodd" fill="url(#SVGID_1_)" d="M20,10c0-5.523-4.477-10-10-10S0,4.477,0,10 s4.477,10,10,10S20,15.523,20,10z M1.583,10c0-4.649,3.768-8.417,8.417-8.417S18.417,5.351,18.417,10S14.649,18.417,10,18.417 S1.583,14.649,1.583,10z"/>\
					<g>\
						<path fill="none" d="M1.583,10c0,1.448,0.366,2.81,1.01,4c1.423,2.63,4.206,4.417,7.407,4.417c4.649,0,8.417-3.768,8.417-8.417 S14.649,1.583,10,1.583S1.583,5.351,1.583,10z"/>\
						<path fill="none" d="M10,0v1.583c4.649,0,8.417,3.768,8.417,8.417S14.649,18.417,10,18.417c-3.201,0-5.983-1.787-7.407-4.417 H0.837C2.381,17.53,5.9,20,10,20c5.523,0,10-4.477,10-10S15.523,0,10,0z"/>\
						<path fill="#FFFFFF" d="M1.583,10c0-4.649,3.768-8.417,8.417-8.417V0C4.477,0,0,4.477,0,10c0,1.423,0.302,2.774,0.837,4h1.756 C1.95,12.81,1.583,11.448,1.583,10z"/>\
					</g>\
					<circle fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" cx="10" cy="0.784" r="0.784"/>\
					<animate attributeName="transform" attributeType="XML" type="rotate" from="0 10 10" to="360 10 10" dur=".8s" repeatCount="indefinite" />\
				</g>\
			</svg></div>');
			*/

            /////////////////////////////////////////////////////


            // HTML5 video플레이어
            this.make_chk = false;
            this.preloadAD_chk = false;

            this.preloadAD = function () {

                if (dataChk(self.opt.ad)) {
                    self.adAction();
                    //return;
                }

            }

            this.htmlMake = function () {
                
                if(dataChk(self.cdn_obj)){
                    if(dataChk(self.cdn_obj.youtube)) {
                        self.opt.youtube = self.cdn_obj.youtube;
                        self.opt.isyoutube = true;
                        self.opt.isConfigYoutube = true;
                        self.cdn_obj.youtube = null;
                        
                        self.mediaControl.youtubeUpdate();
                        self.youtubeMake();
                        return;
                    }
                }

                if (!self.preloadAD_chk) {

                    if (dataChk(self.opt.ad)) {
                        self.preloadAD_chk = true;
                        self.adAction();
                        return;
                    }
                } else {

                }

                log("make : ");

                if (self.opt.cover != "") {
                    if (typeof self.opt.cover != 'object') {} else {
                        var p = 9999;
                        var url_str = "";
                        for (var i in self.opt.cover) {

                            if (i !== "none") {
                                var n = Number(self.opt.cover[i].width);

                                if (self.opt.width < n && p > n) {
                                    url_str = self.opt.cover[i].url;
                                }
                                if (self.opt.width < n) {
                                    p = n;
                                }
                            }

                        }

                        if (dataChk(url_str)) {
                            self.opt.cover = url_str;
                        }

                    }
                }

                if (self.make_chk) {
                    if (self.opt.istitle == "Y") {
                        if (dataChk(self.info_obj.title)) {
                            self.box_mc.find('p.videotitle').html(self.info_obj.title);
                        } else {
                            self.box_mc.find('p.videotitle').remove();
                        }
                    } else {
                        self.box_mc.find('p.videotitle').remove();
                    }

                    if (self.opt.cover != "") {
                        self.opt.cover = decodeURIComponent(self.opt.cover);

                        if (self.btn_mc.find('.img img').attr('src') != self.opt.cover) {
                            self.btn_mc.find('.img img').attr('src', self.opt.cover);
                            self.btn_mc.find('.img img').animate({
                                'opacity': 0
                            }, 0);
                            self.btn_mc.find('.img img').load(function () {
                                $(this).animate({
                                    'opacity': 1
                                }, 300);
                            });
                        }

                        if (self.video_mc != null) {
                            self.video_mc.attr('poster', self.opt.cover);
                        }
                    }

                    if (self.opt.isautotrack) {
                        self.playClick();
                    } else {
                        self.btn_mc.show();
                        self.loading(false);
                    }
                    return;
                }

                self.make_chk = true;
                //log(this);

                if (dataChk(self.opt.gas) && !self.opt.cdn_chk) {


                    this.cdnLoad = function ($chk) {

                        log("htmlMake > cdnLoad", "font-size:20px;background-color:blue;color:white;");

                        if (self.info_obj.adult == "Y" && !$chk) {
                            //VideoUtil.noAdult();
                            return;
                        }

                        var file_chk = false;
                        a = self.info_obj.cdn;

                        if (dataChk(a)) {
                            if (typeof a == "object") {
                                a = a[0].url;
                            }
                        } else {
                            if (dataChk(self.cdn_obj)) {
                                if (dataChk(self.cdn_obj.serverurl)) {
                                    a = self.cdn_obj.serverurl;
                                    file_chk = true;
                                }
                                if (dataChk(self.cdn_obj.fileurl)) {
                                    a = self.cdn_obj.fileurl;
                                    file_chk = true;
                                }
                            }
                        }

                        if (file_chk) {
                            self.cdnOk("0", self.cdn_obj);
                        } else {
                            loadData(unescape(a), self.opt.jsonType, this.cdnOk, this.cdnError);
                        }
                    };

                    this.cdnOk = function ($type, $data) {
                        
                        log("cdn Load OK");
                        var url_str = "";
                        self.cdn_obj = $data;

                        if (dataChk($data.data)) {
                            var m_url = $data.data[0].url + "?token=" + $data.data[0].token;
                            log("Mnet Mobile : " + m_url);
                            url_str = m_url;

                            //* 이용권은 있지만 권리가 없어서 1분재생만 가능한 곡 008
                            if ($data.data[0].result == "003") {
                                alert($data.data[0].msg);
                            }

                            if (!self.adultAuthChecking($data.data[0].result)) {
                                return;
                            }

                        } else {
                            if (dataChk($data.serverurl) && dataChk($data.fileurl)) {
                                url_str = $data.serverurl + $data.fileurl;
                            } else if (dataChk($data.fileurl)) {
                                url_str = $data.fileurl;
                            } else {
                                url_str = $data.serverurl;
                            }
                        }

                        self.original_obj = {
                            poster: self.opt.cover,
                            src: url_str
                        };
                        self.player_arr.push(self.original_obj);
                        self.opt.track = self.player_arr.length - 1;

                        log(self.player_arr)
                        log("@@@");
                        
                        self.opt.cdn_chk = true;
                        self.htmlMake();
                    };
                    this.cdnError = function ($type, $data) {
                        log("cdn Load Error");
                        self.setError(self.videoData.lang.error);
                        //VideoUtil.htmlVideoMake();
                    };
                    this.cdnLoad();
                    //return;
                }

                for (var i in self.player_arr[self.opt.track]) {
                    //original_obj[i] = [mobileVideo_obj[i]];
                }

                self.me.html('');

                if (self.video_mc !== null) {
                    self.video_mc.remove();
                    self.me.find('#adContainer').remove();
                }


                self.me.append($('<video id="' + self.id + '-video" width="' + self.opt.width + '" height="' + self.opt.height + '" preload="auto" webkit-playsinline="webkit-playsinline"></video>'));
                self.me.append('<div id="adContainer" style="display:none;position:absolute;top:0;left:0;right:0;bottom:0;margin-bottom:45px;box-sizing:border-box;overflow:hidden;z-index: 99999999;"></div>');
                self.video_mc = $('#' + self.id + '-video');
               
                self.btn_mc.show();
                self.player_mc.hide();

                if (self.opt.istitle == "Y") {
                    if (dataChk(self.info_obj.title)) {
                        self.box_mc.find('p.videotitle').html(self.info_obj.title);
                    } else {
                        self.box_mc.find('p.videotitle').remove();
                    }
                } else {
                    self.box_mc.find('p.videotitle').remove();
                }

                if (dataChk(self.opt.cover)) {
                    self.opt.iscover = true;
                    self.opt.cover = decodeURIComponent(self.opt.cover);
                    self.btn_mc.find('.img').html('<img src="' + self.opt.cover + '"  alt="" />');

                    var target = self.btn_mc.find('.img img');
                    TweenMax.set(target, {
                        z: 0.1,
                        opacity: 0
                    });

                    self.btn_mc.find('.img img').load(function () {

                        TweenMax.killTweensOf(target);
                        TweenMax.to(target, .6, {
                            opacity: 1,
                            ease: "Cubic.easeOut"
                        });

                    });
                    self.video_mc.attr('poster', self.opt.cover);
                } else {
                    var url_str = "";
                    if (dataChk(self.opt.server) && dataChk(self.opt.stream)) {
                        url_str = self.opt.server + self.opt.stream;
                    } else if (dataChk(self.opt.stream)) {
                        url_str = self.opt.stream;
                    } else {
                        url_str = self.opt.server;
                    }

                    if(dataChk(url_str)) {
                        self.opt.iscover = false;
                        self.opt.isstartvideo = true; // 시작할때 커버 없고 로컬 비디오일때..
                        self.video_mc.append('<source src="' + url_str + '" type="video/mp4" />');
                        self.player_mc.show();
                    }
                   
                }

                var click_str = 'click'
                if (self.opt.ismobile) {
                    click_str = 'tap'
                }

                self.btn_mc.find('.btnCustom').on(click_str, function () {
                    self.playClick();
                });

                if (dataChk(self.opt.targetPlayBtn)) {
                    $.each(self.opt.targetPlayBtn, function (i, item) {
                        $(item).data('cdn_type', i);
                        $(item).on(click_str, function () {
                            self.opt.cdn_type = $(item).data('cdn_type');
                            self.playClick();
                        });
                    });


                }

                if (dataChk(self.opt.youtube)) {
                    //self.opt.youtube_box_id = self.id + '-youtube-box';
                    //
                    //self.box_mc.append('<div id="'+self.opt.youtube_box_id+'" id="type" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:9999;opacity:0"></div>');
                    //
                    //var tag = document.createElement('script');
                    //tag.src = "http://www.youtube.com/player_api";
                    //var firstScriptTag = document.getElementsByTagName('script')[0];
                    //firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }

                self.loading(false);
                self.resize();

                if (self.opt.isadno && self.opt.onair == "Y") {
                    self.cdnOutLoad();
                } else {
//                    if (self.opt.isandroid) {
                    if (self.opt.iswebview) {
                        if (self.opt.autoplay == "Y") {
                            self.playClick();
                        }
                    }
                    
                }

                self.adYoutubeSetting();
                
                try {
                    if(dataChk(self.videoData.info_data)) {
                        if($.isArray(self.videoData.info_data.cdn)) {
                            self.makeElement.insertQualityUI();

                        }
                    }
                    
                    
                    window['MF_vodInfoLoadOk']();
                } catch (e) {
                }
            };

            this.youtubeMake = function () {

                cjvideoTmpPlayer = self;
                self.opt.youtube = unescape(self.opt.youtube);

                youtubeF_str = "";
                youtube_arr = self.opt.youtube.split("?");
                
                if (youtube_arr.length > 1) {
                    if(self.opt.youtube.indexOf('/v/') != -1) {
                        youtube2_arr = String(youtube_arr[0]).split("/v/");
                        if (youtube2_arr.length > 1) {
                            youtubeF_str = youtube2_arr[youtube2_arr.length - 1];
                        }
                    } else {
                        youtube_arr = self.opt.youtube.split("&");
                        for (var youtubei_str in youtube_arr) {
                            youtube2_arr = String(youtube_arr[youtubei_str]).split("v=");
                            if (youtube2_arr.length > 1) {
                                youtubeF_str = youtube2_arr[1];
                                break;
                            }
                        }
                    }
                    
                } else {
                    youtube_arr = youtube_arr[0].split("/");
                    youtubeF_str = youtube_arr[youtube_arr.length - 1];
                }

                self.opt.youtube_id = youtubeF_str;
                log("#Youtube ID : " + youtubeF_str);

                // 로드
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                self.opt.youtube_box_id = self.id + '-youtube-box';
                self.box_mc.find('#mediaControlArea').before('<div id="' + self.opt.youtube_box_id + '" id="type" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;"></div>');
                self.btn_mc.css({'pointer-events':'none'})


                // 로드
                /*
				var tag = document.createElement('script');
				tag.src = "http://gdata.youtube.com/feeds/api/videos?max-results=1&v=2&alt=json-in-script&callback=cjemYTinfoLoadOk&q=" + self.opt.youtube_id;
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                */
                //self.info_obj.title
                
                try {
                    window['videoControlInit']();
                } catch (e) {}
            };

            this.youtubeLoad = function () {

                self.opt.youtube_box_id = self.id + '-youtube-box';
                self.box_mc.append('<div id="' + self.opt.youtube_box_id + '" id="type" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:9999;opacity:0;"></div>');

                var tag = document.createElement('script');
                tag.src = "http://www.youtube.com/player_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                
                
            }

            // 플래시
            this.swfMake = function ($onairad) {
                
                if (!swfobject.hasFlashPlayerVersion("9")) {

                    // 플래시설치안되어있을때. 
                    if (navigator.appName == 'Netscape') {
                        var language = navigator.language; 
                    } else {
                        var language = navigator.browserLanguage; 
                    }
                    
                    if (language.indexOf('ko') > -1) {
                        
                        self.box_mc.find('#' + self.id).html('<div class="viewInfo">고객님의 브라우저에 Adobe Flash Player가 설치되어 있지 않습니다.<br>Adobe Flash Player를 설치하시면<br>영상서비스를 보다 원활하게 이용하실 수 있습니다.<br/><br/><a href="http://get.adobe.com/flashplayer/" target="_blank">설치하기</a></div></div>');
                    } else {
                        self.box_mc.find('#' + self.id).html('<div class="viewInfo">Need Adobe Flash Player to watch this video.<br><a href="http://get.adobe.com/flashplayer/" target="_blank">Download Flash Player</a></div></div>');
                    }
                    self.box_mc.find('#' + self.id + ' .viewInfo').css({
                        'color': '#ccc',
                        'position': 'absolute',
                        'top': '50%',
                        'width': '100%',
                        'margin': '-' + self.box_mc.find('#' + self.id + ' .viewInfo').height() / 1.5 + 'px 0 0 0',
                        'text-align': 'center',
                        'font-family': 'Heletica, 맑은 고딕, arial',
                        'font-size': '14px',
                        'font-weight': 'normal',
                        'line-height': '24px'
                    });
                    self.box_mc.find('#' + self.id + ' .viewInfo a').css({
                        'color': '#000',
                        'font-family': 'Heletica, 맑은 고딕, arial',
                        'font-size': '14px',
                        'font-weight': 'bold',
                        'background-color': '#fff',
                        'padding': '8px 12px',
                        'border-radius': '3px'
                    });
                    $('body').addClass('no-player');
                    self.loading(false);

                } else {
                    if (!dataChk(swfobject.getObjectById(self.id))) {
                        //("# Flash Make");
                        log("# Flash Make");
                        if ($onairad == "Y") {
                            self.opt.onairAD = schedule_ad_mc.find('img').attr('src');
                        } else {
                            self.opt.onairAD = "N";
                        }
                        self.opt.data = escape(self.opt.data);

                        if (dataChk(self.opt.gas)) {
                            self.opt.gas = escape(self.opt.gas);
                        }
                        var cv = self.me.data('__cjvideo') || false;

                        //log(self.me);

                        swfobject.embedSWF(self.opt.flash, self.id, '100%', '100%', '10.2', self.opt.flashInstall, self.opt, {
                            allowscriptaccess: 'always',
                            menu: 'false',
                            wmode: self.opt.wmode,
                            allowFullScreen: 'true',
                            bgcolor: '#111111'
                        }, {
                            id: self.id
                        });

                        mousewheelFlashID = self.id;
                        //flashWheelOver("externalMouseEvent");
                        externalWheelEventInit();

                        self.loading(false);

                        if (this.opt.chromeless == "Y") {
                            self.loading(true);
                        }
                    }
                }

            };

            // 모바일용 json데이타 로드
            this.dataLoad = function () {

                if (dataChk(self.opt.data)) {
                    var track_arr = String(self.opt.vodID).split(",");
                    var a = unescape(self.opt.data);
                    var s = "";
                    if (track_arr.length > 0) {
                        s += "vodId=" + track_arr[0].split("_")[0] + "_" + track_arr[0].split("_")[1];
                        if (a.split("?").length == 1) {
                            s = "?" + s;
                            a = a + s;
                        }
                    }
                    
                    // 쇼미더머니를 위한 jsonCallback!! 20150824
                    var _jsonCallback = "";
                    if (dataChk(self.opt.jsonpCallback)) {
                        _jsonCallback = self.opt.jsonpCallback;
                    }
                
                    if(self.opt.jsonType == "jsonp") {
                        loadData(a, self.opt.jsonType, self.configOk, self.configError, "get", "", _jsonCallback);
                    } else {
                        
                        
                        loadData(a, self.opt.jsonType, self.configOk, self.configError);
                    }
                    
                } else {

                    if (typeof self.opt.cdn == "object") {
                        if (dataChk(self.opt.cdn)) {

                            $.each(self.opt.cdn, function (i, item) {
                                if (self.opt.cdn_type == null && item.select) {
                                    self.info_obj.cdn = item.url;
                                } else if (self.opt.cdn_type == item.quality) {
                                    self.info_obj.cdn = item.url;
                                }
                            });
                            self.opt.cdn_type = null;

                        }
                    } else {
                        self.info_obj.cdn = self.opt.cdn;
                    }

                    log(self.opt.cdn)
                    log(self.info_obj.cdn)

                    self.htmlMake();
                }
            };

            this.configOk = function ($type, $data) {

                log("@Config Load OK");
                self.config_obj = $data;
                

                log(self.config_obj)
                
                


                // file one
                if (dataChk(self.config_obj.data)) {
                    if (dataChk(self.config_obj.data.config)) {
                        self.one_chk = true;
                        self.one_data = self.config_obj;
                        self.config_obj = self.config_obj.data.config;
                        if (dataChk(self.one_data.data.cdn)) {
                            self.cdn_obj = self.one_data.data.cdn;
                        }
                    }
                }

                // limittime reset
                if (dataChk(self.config_obj.mode)) {
                    if (dataChk(self.config_obj.mode.limit_time)) {
                        self.opt.limittime = self.config_obj.mode.limit_time;
                    }
                }

                if (self.one_chk && dataChk(self.one_data.data.info)) {
                    log("#INFO Load NO");
                    //VideoUtil.infoOk("0", self.one_data.data.info);
                    self.infoLoadOK("0", self.one_data.data.info);
                } else {

                    a = self.config_obj.url.song;
                    if (self.opt.onair == "Y") a = self.config_obj.url.onair;

                    try {
                        if (dataChk(self.opt.vodID) && String(a).indexOf('?') == -1) {
                            a += "?id=" + self.opt.vodID.split("_")[0];
                            a += "&ctype=" + self.opt.vodID.split("_")[1];
                        }
                    } catch (e) {

                    }

                    loadData(a, self.opt.jsonType, self.infoLoadOK, self.infoLoadError);
                }
            }
            this.configError = function ($type, $data) {
                log("error");
            };
            this.infoLoadOK = function ($type, $data) {
                log("Info Load OK");
                self.info_obj = $data;

                // 20140320 로그 관련
                self.videoData.info_data = self.info_obj;
                
                log(self.videoData.info_data);

                // 20141107 광고 넣어주기..
                try {
                    if(dataChk(self.opt.ad)) {
                        
                    } else {
                        if (dataChk(self.videoData.info_data.url.ad)) {
                            if (String(self.videoData.info_data.url.ad).indexOf('http://adverweb.cjenm.com/movie.mezzo') != -1) {
                                self.opt.ad_jsonCallback = null;
                                self.opt.ad_jsonType = "json"
                            }
                            if (!dataChk(self.opt.ad)) {
                                self.opt.ad = escape(self.videoData.info_data.url.ad);

                                if (dataChk(self.videoData.info_data.mode)) {
                                    if (self.videoData.info_data.mode.ad == "N") {
                                        self.opt.ad = "";
                                    }
                                }
                            }
                        }
                    }
                    
                    
                } catch (e) {}

                videoLog.reset();
                
                if(dataChk(self.opt.cover)) {
                    
                } else {
                    self.opt.cover = self.info_obj.cover;
                }
                

                //				if(self.info_obj.no_country == "Y") {
                //					self.noCountry();
                //				} else {

                if (!dataChk(self.config_obj.url)) {
                    self.config_obj.url = {};
                }
                //					
                if (dataChk(self.config_obj.url.userinfo) || (self.one_chk && dataChk(self.one_data.data.userinfo))) {
                    self.userinfoLoad();
                } else {
                    //VideoUtil.cdnLoad();
                    self.htmlMake();
                }
                //				}
            };

            this.noCountry = function () {
                alert(self.config_obj.message.no_country.replace("<br>", "\n"));
            };

            this.infoLoadError = function ($type, $data) {
                log("error");
            };
            this.userinfoLoad = function () {

                var a = "";
                try {
                    if (dataChk(self.opt.vodID)) {
                        a += "?id=" + self.opt.vodID.split("_")[0];
                        a += "&ctype=" + self.opt.vodID.split("_")[1];
                    }
                } catch (e) {

                }


                if (self.one_chk && dataChk(self.one_data.data.userinfo)) {
                    log("#userinfo Load NO");
                    //VideoUtil.infoOk("0", self.one_data.data.info);
                    self.userinLoadOk("0", self.one_data.data.userinfo);
                } else {
                    loadData(self.config_obj.url.userinfo + a, self.opt.jsonType, self.userinLoadOk, self.userinLoadError);
                }
            };
            this.userinLoadOk = function ($type, $data) {
                log("userinfo Load OK");

                self.userinfo_obj = $data;
                self.videoData.user_data = self.userinfo_obj;

                if (dataChk(self.videoData.user_data.billtype)) {
                    self.videoData.user_data.billtype = String(self.videoData.user_data.billtype).replace('Tg==', 'TiAg');
                    self.videoData.user_data.billtype = String(self.videoData.user_data.billtype).replace('WQ==', 'WSAg');
                }
                if (dataChk(self.videoData.user_data.aodbilltype)) {
                    self.videoData.user_data.aodbilltype = String(self.videoData.user_data.aodbilltype).replace('Tg==', 'TiAg');
                    self.videoData.user_data.aodbilltype = String(self.videoData.user_data.aodbilltype).replace('WQ==', 'WSAg');
                }
                if (dataChk(self.videoData.user_data.vodbilltype)) {
                    self.videoData.user_data.vodbilltype = String(self.videoData.user_data.vodbilltype).replace('Tg==', 'TiAg');
                    self.videoData.user_data.vodbilltype = String(self.videoData.user_data.vodbilltype).replace('WQ==', 'WSAg');
                }

                if (String(self.videoData.user_data.id).length > 0) {
                    self.videoData.login_chk = true;
                } else {
                    self.videoData.login_chk = false;
                }

                if (self.info_obj.adult == "Y" && parseInt(self.videoData.user_data.adult, 10) !== 1) {
                    //VideoUtil.noAdult();
                    self.videoData.isAdultBlock = true;
                } else {}
                self.htmlMake();
            };

            this.userinLoadError = function ($type, $data) {
                log("userinfo Load Error");
                this.cdnLoad();
            };


            this.cdnOutLoad = function ($chk) {

                
                try {log(self.opt.stream_type);
                    if (self.opt.stream_type == "streaming" || self.opt.stream_type == "download") {
                        var url = self.opt.server;
                        if (!dataChk(url)) {
                            url = self.opt.stream;
                        }

                    
                        if (dataChk(self.opt.set_mobile)) {
                            if (dataChk(self.opt.set_mobile.server)) {
                                url = self.opt.set_mobile.server;
                            }
                            if (dataChk(self.opt.set_mobile.stream)) {
                                url = self.opt.set_mobile.stream;
                            }
                        }

                        self.original_obj = {
                            poster: self.opt.cover,
                            src: decodeURIComponent(url)
                        };
                        self.player_arr.push(self.original_obj);
                        self.opt.track = self.player_arr.length - 1;
                        self.playAction();
                        return;
                    }
                } catch (e) {
                    log('Direct Stream Error!');
                }

                if (self.info_obj.adult == "Y" && !$chk) {
                    //VideoUtil.noAdult();
                    return;
                }

                a = self.info_obj.cdn;
                
                if (dataChk(a)) {
                    if (typeof a == "object") {
                        // 화질선택
                        a = a[self.cdn_multi_target].url;
                    }
                }

                //
                var cdnJsonType = self.opt.jsonType;
                var rootUrl = a;
                var prameter = "";

                if (dataChk(a)) {
                    if (a.indexOf('sa.mnet.com') !== -1) {
                        cdnJsonType = 'jsonp';
                        a = decodeURIComponent(String(a).replace(/http:\/\/m.mnet.com\/proxyMobileStream.asp\?LoadURL=/gi, ''));

                        rootUrl = a.split('?')[0];
                        prameter = a.split('?')[1];
                        var pItem = prameter.split('&');
                        prameter = "";
                        var n = 0;

                        for (var i in pItem) {
                            log(i);
                            if (pItem[i].split('=')[0] == 'user_info') {
                                // prameter = pItem[i];
                            } else {
                                if (n == 0) {
                                    prameter += "" + pItem[i];
                                } else {
                                    prameter += "&" + pItem[i];
                                }
                                n++;
                            }
                        }

                        rootUrl = a;
                        prameter = "";
                    } else {}
                }

                log("rootUrl:" + rootUrl);
                log("prameter:" + prameter);

                if (self.one_chk && dataChk(self.one_data.data.cdn)) {
                    log("#cdn Load NO");
                    self.cdnOutOk("0", self.one_data.data.cdn);
                } else {
                    //					loadData(rootUrl, cdnJsonType, self.cdnOutOk, self.cdnOutError, 'GET', prameter);
                    loadData(decodeURIComponent(rootUrl), cdnJsonType, self.cdnOutOk, self.cdnOutError, 'GET', prameter);
                }
            };

            this.adultAuthChecking = function ($type) {

                if ($type == "009") {

                    self.loading(false);
                    //VideoUtil.mediaStatus("stop");
                    self.playing = false;
                    self.playEnd();
                    if (self.overview_mc !== null) {
                        self.overview_mc.show();
                    }

                    self.spinner = null;
                    $('#videoPlayerDisabled').show();

                    
                    var cf = confirm(self.videoData.message.mobile.adultAuth, function(){
                        window.location = self.videoData.user_data.auth_url + window.location;
                    }, function(){
                    });
                    if(cf == undefined) {
                    } else if(cf) {
                        window.location = self.videoData.user_data.auth_url + window.location;
                    } else {
                    }
                    return false;
                } else {
                    if (dataChk(self.userinfo_obj)) {
                        if (self.userinfo_obj.id.length > 0) {
                            self.loginUserBuy();
                        }
                    }
                    return true;
                }
            }

            this.cdnOutOk = function ($type, $data) {
                log("cdn Load OK2");
                log($data);
                self.cdn_obj = $data;

                var url_str = "";

                if (dataChk($data.data)) {
                    var m_url = $data.data[0].url + "?token=" + $data.data[0].token;
                    
                    // 20150714
                    if(self.opt.onair && $data.data[0].token == "-") {
                        m_url = $data.data[0].url;
                    }
                    
                    url_str = m_url;

                    //* 이용권은 있지만 권리가 없어서 1분재생만 가능한 곡 008
                    if ($data.data[0].result == "003") {
                        alert($data.data[0].msg);
                    }

                    if (!self.adultAuthChecking($data.data[0].result)) {
                        return;
                    }
                    //*/

                } else {
                    if (dataChk($data.fileurl)) {
                        url_str = $data.fileurl;
                    } else {
                        url_str = $data.serverurl;
                    }
                }

                self.original_obj = {
                    poster: self.opt.cover,
                    src: url_str
                };

                self.player_arr.push(self.original_obj);
                self.opt.track = self.player_arr.length - 1;
                
                if (self.opt.isadno) {
                    self.playAction();
                } else {
                    self.playAction();
                }
                self.opt.cdn_chk = true;
            };
            this.cdnOutError = function ($type, $data) {
                log("cdn Load Error");
                self.setError(self.videoData.lang.error);
            };

            this.loadCSSOK = function () {

                log("ok CSS");
                

                if (self.opt.isMobileUI) {
                    //					if(self.opt.isipad ||
                    if (self.opt.isios ||
                        self.opt.isandroid ||
                       self.opt.mode == "html5") {

                        self.mediaControl.init();
                    }
                }

                // 실제 모바일 옵션 어떻게?


                if (self.opt.isyoutube) {
                    
                    self.mediaControl.init();
                    self.youtubeMake();
                    return;
                } else {

                }
                if ((!self.opt.isflash && self.opt.ismobile) || self.opt.mode == "html5") {

                    if (self.opt.isyoutube) {
                        self.youtubeMake();
                    } else {

                        var data_arr = String(self.opt.data).split('|');
                        if (data_arr.length > 1) {

                            if (String(data_arr[0]).length == 1) {
                                if (String(data_arr[0]) == "1") {
                                    self.opt.isautotrackstart = true;
                                }
                                data_arr.shift();
                            }
                            self.data_arr = data_arr;
                            self.opt.data = self.data_arr[self.data_num];
                        }
                        self.dataLoad();
                    }

                } else {
                    self.swfMake();
                }
                
                try {
                    window['videoControlInit']();
                } catch (e) {}
            }
            
            if (self.opt.isMobileUI || self.opt.isyoutube) {
                //				if(self.opt.isipad ||
                if (self.opt.isios ||
                    self.opt.isandroid || self.opt.isyoutube || self.opt.mode == "html5") {
                    $('<link/>', {
                        rel: 'stylesheet',
                        type: 'text/css',
                        href: self.videoData.file.css
                    }).appendTo('head');
                }
            }

            $.getScript(self.videoData.urlJsStr + "jquery.mobile-events.min.js", function () {
                $.getScript(self.videoData.urlJsStr + "TweenMax.min.js", function () {
                    
                    log("load ok Default JS Library");
                    self.loadCSSOK();
                });
            });

            //this.loadCSSOK();

        };
        
        this.cdn_multi_target = 0;
        this.makeElement = {
            
            insertQualityUI : function() {
                
                
                
                
                var target_btn_obj = self.btn_mc;
                
                self.box_mc.addClass('multi-quality');
                
                if(self.opt.alwaysQualityBtn) {
                    self.box_mc.addClass('multi-quality--always')
                    self.box_mc.append('<div class="playbtn-quality"></div>');
                } else {
                    target_btn_obj.append('<div class="playbtn-quality"></div>');
                }
                
                self.videoData.info_data.cdn.reverse();
                
                var cdn_el = self.box_mc.find('.playbtn-quality');
                var control_cdn_el = $('#mediaControl #rightArea .quality');
                var cdn_data = self.videoData.info_data.cdn;
                
                self.mediaControl.qualityControl = cdn_el;
                
                
                $.each(cdn_data, function(i, item){
                    
                    var el_str;
                    if(item.select == "Y") {
                        self.cdn_multi_target = i;
                        el_str = '<div class="selected">' + item.name + '</div>';
                    } else {
                        el_str = '<div>' + item.name + '</div>';
                    }
                    
                    cdn_el.append(el_str);
                    
                    control_cdn_el.append(el_str);
                });
                
                var click_str = 'click'
                if (self.opt.ismobile) click_str = 'tap';
                
                cdn_el.find('> div').on(click_str, function(){
                    cdn_el.find('> div').removeClass('selected');
                    $(this).addClass('selected');
                    self.cdn_multi_target = $(this).index();
                    
                    control_cdn_el.find('> div').removeClass('selected');
                    control_cdn_el.find('> div').eq(self.cdn_multi_target).addClass('selected');
                    
                    if(!self.opt.adSkipClick) {
                        self.stop();
                    }
                    self.playClick();
                });
                
                control_cdn_el.find('> div').on(click_str, function(){
                    control_cdn_el.find('> div').removeClass('selected');
                    $(this).addClass('selected');
                    self.cdn_multi_target = $(this).index();
                    
                    if(!self.opt.adSkipClick) {
                        self.stop();
                    }
                    self.playClick();
                });
                
                self.resize();
                
            }
            
        }

        // 모바일에서 재생 시작.
        this.playClick = function () {

            log("PLAY CLICK", 'font-size:40px;');
            
            
            try {
                window['MF_playclick_touch']();
            } catch (e) {}

//            self.playEnd();
            
            if(self.opt.adSkipClick) {
                self.stop();
            }
            
            if (dataChk(self.opt.cdn)) {
                if (typeof self.opt.cdn == "object") {
                    if (dataChk(self.opt.cdn)) {
                        $.each(self.opt.cdn, function (i, item) {
                            if (self.opt.cdn_type == null && item.select) {
                                self.info_obj.cdn = item.url;
                            } else if (self.opt.cdn_type == item.quality) {
                                self.info_obj.cdn = item.url;
                            }
                        });
                        self.opt.cdn_type = null;
                    }
                }
            }

            try {
                // 생방송 관련한 로직
                if(self.opt.onair == "Y") {
                    switch(String(self.info_obj.onairfree).toUpperCase()) {
                        
                        // 무료회원까지는 생방보기
                        case "B":
                            if (self.videoData.login_chk) {
                            } else {
                                
                                var cf = confirm(self.config_obj.message.onairfreelogin.replace("<br>", "\n") + '\n로그인 하시겠습니까?', function(){
                                    parent["mnetAuth"].login();
                                }, function(){
                                });
                                if(cf == undefined) {
                                } else if(cf) {
                                    parent["mnetAuth"].login();
                                } else {
                                }
                                
                                return;
                            }
                            break;
                        
                        // 무료회원 및 비회원 생방보기
                        case "C":
                            break;
                        
                        // 유료회원만 생방보기
                        case "A":
                            if (self.videoData.login_chk) {
                                if (self.videoData.user_data.vodbilltype == "WSAg") {

                                } else {
                                    
                                    var cf = confirm(self.config_obj.message.buy.replace("<br>", "\n") + '\n이용권을 구매하시겠습니까?', function(){
                                        parent.location.href = "http://m.mnet.com/pay/";
                                    }, function(){
                                    });
                                    if(cf == undefined) {
                                    } else if(cf) {
                                        parent.location.href = "http://m.mnet.com/pay/";
                                    } else {
                                    }
                                    return;
                                }
                            } else {

                                var cf = confirm(self.config_obj.message.login.replace("<br>", "\n") + '\n로그인 하시겠습니까?', function(){
                                    parent["mnetAuth"].login();
                                }, function(){
                                });
                                if(cf == undefined) {
                                } else if(cf) {
                                    parent["mnetAuth"].login();
                                } else {
                                }
                                return;
                            }
                            break;
                    }
                    
                }
                
                if (self.config_obj.mode.no_country == "Y") {
                    self.noCountry();
                    return;
                }
                if (self.info_obj.no_country == "Y") {
                    self.noCountry();
                    return;
                }
            } catch (e) {}
            
            

            if (self.videoData.isAdultBlock) {
                if (self.videoData.login_chk) {
                    if (dataChk(self.opt.login19_fn)) {
                        window[self.opt.login19_fn]();
                    } else {
                        //loginNoAge
                        alert("본 곡은 19세 이상 감상 가능한 곡으로,\n고객님께서는 이용이 제한되는 음원입니다. ");
                    }
                } else {
                    if (dataChk(self.opt.no19_fn)) {
                        window[self.opt.no19_fn]();
                    } else {
                        
                        
                        var cf = confirm('해당 컨텐츠는 청소년유해매체물로서 청소년보호법 등에 따라\n19세 미만의 청소년이 이용할 수 없습니다.\n성인 인증 후 이용할 수 있습니다.\n로그인 하시겠습니까?', function(){
                            parent["mnetAuth"].login();
                        }, function(){
                            return;
                        });
                        if(cf == undefined) {
                            return;
                        } else if(cf) {
                            parent["mnetAuth"].login();
                        } else {
                            return;
                        }

                    }
                }
                return;
            }
            
            // 모바일환경에서 3G / LTE 경고문..
            if(self.opt.ismobile && self.opt.networkWarning == "Y") {
                var cf = confirm(self.videoData.message.mobile.networkWarning, function(){
                    self.opt.networkWarning = false;
                    self.playClick();
                }, function(){
                    return false;
                });
                if(cf == undefined) {
                    return false;
                } else if(cf) {
                    self.opt.networkWarning = false;
                } else {
                    return;
                }
            }
            
            try {
                window['MF_playclick']();
            } catch (e) {}
            
            self.playFirst();

            // 유투브.....
            if (self.opt.isyoutube) {

                //$('#'+self.opt.youtube_box_id).css({'left':0,'top':0});

                //self.loading(true);
                self.player_mc.hide();
                self.btn_mc.hide();

                //$('#'+self.opt.youtube_box_id).css({'left':0,'top':0});
                self.opt.youtube_mc.playVideo();
                return;
            } else {
                self.player_mc.show();
            }

            //임시.. 파일로 플레이 모드로 만들어놔야 재생됨..
            log("TMP 만들기");
            log(self.media_mc);
            
            if(self.opt.isstartvideo) {
                
            } else {
                self.video_mc.html('');
            }
            
            if (self.video_mc.find('source').length == 0) {
                if (self.opt.isandroid && self.opt.ischrome) {
                    self.video_mc.append('<source src="http://player.interest.me/flv/service/player/blank.mp4" type="video/mp4" />');
                    //self.video_mc.append('<source type="video/mp4" />');
                } else {
                    self.video_mc.append('<source type="video/mp4" />');
                }
            }
            
            if (self.opt.isandroid) {
                self.video_mc.css({
                    'position': 'relative',
                    'left': -999
                });
                //self.video_mc.css({'position':'relative','width':3,'height':100});
            } else {
                self.video_mc.css({
                    'position': 'relative',
                    'width': '100%',
                    'height': '100%'
                });
            }

            self.media_mc.load();
            self.media_mc.play();
            self.media_mc.pause();


            self.loading(true);
            self.player_mc.hide();
            self.btn_mc.hide();

            self.opt.istmp = true;
            self.opt.isFirst = true;
            
            
            if (self.opt.isandroid && self.opt.ischrome) {
                if (!self.opt.isFirst) {
                    self.goMediaAction();
                }
            } else {
                self.goMediaAction();
            }
            // self.goMediaAction();


            return;

            /*
            self.btn_mc.find('.btnGo').css({
                'opacity': '0',
                'transition': 'all .2s ease-out',
            });
            self.btn_mc.find('.btnBG').css({
                'opacity': '1',
                '-ms-transform': 'scale(10,10)',
                '-ms-transform-origin': '50% 50%',
                '-webkit-transform': 'scale(10,10)',
                '-webkit-transform-origin': '50% 50%;',
                'transform': 'scale(10, 10)',
                'transform-origin': '50% 50%',
                'transition': 'all .3s ease-in',
                'background': 'rgba(0, 0, 0, 1)'
            });
            */
            self.playClickAction();
            return;
            self.loading(false, 1);

            setTimeout(function () {
                self.playClickAction();
            }, 300);

        };

        this.playClickAction = function () {

        }

        // 플레이어 시작. 재생가능한 시점부터
        this.playIMA_chk = true
        this.goMediaAction = function () {



            log("goMediaAction");
            self.opt.istmp = false;
            //return;
            log(self.opt, 'font-size:40px;');

            // 기본 광고 정보 로드
            if (dataChk(self.opt.gas) && self.playIMA_chk) {

            } else {
                if (self.adAction_chk) {
                    self.adAction_chk = false;
                    self.adPlayAction(self.adPreinfo);
                    return;
                }
            }
            
            self.btn_mc.hide();
            
            log("self.opt.cdn_chk = " + self.opt.cdn_chk)
            log("self.opt.gas = " + self.opt.gas)
            log("self.opt.adPlaying = " + self.opt.adPlaying)

            if (self.opt.adPlaying) {
                self.playAction();
            } else {
                if (self.opt.cdn_chk || dataChk(self.opt.gas)) {
                    self.playAction();
                } else {
                    self.cdnOutLoad(true);
                }
            }
        };

        this.adPreinfo = null;
        this.adAction_chk = false;

        this.adAction = function () {
            //
            self.opt.ad = decodeURIComponent(self.opt.ad);
            log("#AD : " + self.opt.ad);
            var _jsontype = self.opt.jsonType;
            if (dataChk(self.opt.ad_jsonType)) _jsontype = self.opt.ad_jsonType;


            var _jsonCallback = "";
            if (dataChk(self.opt.ad_jsonCallback)) {
                _jsonCallback = self.opt.ad_jsonCallback;
            }
            log("_jsontype : " + self.opt.ad_jsonType);
            log("_jsonCallback : " + _jsonCallback);
            
            var uid = new Date();
            uid = uid.getTime() + '_' + Math.round(Math.random()*1000);
            
            var ad_str = self.opt.ad;
            
            if(String(self.opt.ad).indexOf('?') > -1) {
                ad_str = ad_str + '&m_uid=' + uid;
            } else {
                ad_str = ad_str + '?m_uid=' + uid;
            }
            
            loadData(ad_str, _jsontype, function ($type, $data) {

                // 광고 정보 로드 완료
                //*
                var noad_chk = true;
                log("ad Config load ok!!");

                $($data.data).each(function (i, item) {
                    switch ($data.data[i].type) {

                    case "time_before_":
                        noad_chk = false;
                        videoCallPlayFn = self.adPlayAction;
                        loadJsonpCallback($data.data[0].url, "jsonp", function (e) {

                        }, function () {
                            self.adErrorAction();
                        });
                        break;

                    case "time_before":
                        noad_chk = false;
                        videoCallPlayFn = self.adPlayAction;
                        loadData($data.data[0].url, _jsontype, function ($type, $data) {
                            self.adPreinfo = $data.data[0];
                            self.adAction_chk = true;
                            // self.adPlayAction($data.data[0]);
                        }, function () {
                            self.adErrorAction();
                        });
                        break;

                    case "google":

                        log("GOOGLE", "color:red;");

                        self.opt.gas = $data.data[0].url;
                        $('#adContainer').show();

                        log("self.opt.gas = " + self.opt.gas);
                        //self.goMediaAction();

                        break;

                    default:
                        //self.goMediaAction();
                        break;
                    }
                });

                // 새로운 광고 솔류션 타입 변환
                var ad_loop_num;
                var ad_loop_target_num;
                var ad_total_arr = [];

                if (dataChk($data.start_ad)) {
                    for (ad_loop_num in $data.start_ad) {
                        ad_total_arr.push($data.start_ad[ad_loop_num]);
                    }
                }
                if (dataChk($data.play_ad)) {
                    for (ad_loop_num in $data.play_ad) {
                        ad_total_arr.push($data.play_ad[ad_loop_num]);
                    }
                }
                if (dataChk($data.end_ad)) {
                    for (ad_loop_num in $data.end_ad) {
                        ad_total_arr.push($data.end_ad[ad_loop_num]);
                    }
                }

                for (ad_loop_num in ad_total_arr) {
                    var i_data = ad_total_arr[ad_loop_num];
                    if (dataChk(i_data.movie_api)) {

                        var m_api_arr = i_data.movie_api.split(".");
                        if (m_api_arr[m_api_arr.length - 1] !== "mp4") {
                            i_data.content = i_data.movie_api + self.me.width() + "/" + self.me.height();
                        } else {
                            i_data.content = i_data.movie_api;
                        }

                    }
                    if (dataChk(i_data.image_url)) {
                        i_data.content = i_data.image_url;
                    }
                    if (dataChk(i_data.skip)) {
                        if (parseInt(i_data.skip) > 0) {
                            i_data.skiptime = i_data.skip;
                            i_data.skip = "1";
                        }
                    }

                    i_data.url = i_data.randing_url;
                    
                    // 20150811 click api...
                    if (!dataChk(i_data.randing_url)) {
                        if (dataChk(i_data.click_api)) {
                            i_data.url = i_data.click_api;
                            i_data.click_api = null;
                        }
                    }
                    log(i_data);


                    switch (parseInt(i_data.ad_type)) {
                        // pre-roll
                        case 7:
                            noad_chk = false;

                            self.adPreinfo = i_data;
                            self.adAction_chk = true;

                            // self.adPlayAction(i_data);
                            break;
                            
                        // 띠배너..
                        case 10:
                            
                            i_data.name = "Liner_Banner";
                            i_data.starttime = i_data.start_time;
                            i_data.endtime = i_data.end_time;
                            i_data.position= {
                                left: "50%",
                                bottom: "20"
                            }
                            i_data.repeat = true;
                            i_data.resize = true;
                            i_data.close_chk = true;
                            i_data.alwaysClose_chk = true;
                            i_data.alpha = ".4";
                            
                            var w = Math.min(self.opt.width - 74, 360);
                            
                            $('#mediaOverlay .overlayBottom').append('<div class="bottom_img">\
                                <div class="img"><img src="'+i_data.image_url+'" style="width:'+(w)+'px;" /></div>\
                                <div class="closeBtn"><svg  version="1.1" id="Layer_1" xmlns="&ns_svg;" xmlns:xlink="&ns_xlink;" width="17.553" height="17.553" viewBox="-1.258 -1.268 17.553 17.553" overflow="visible" enable-background="new -1.258 -1.268 17.553 17.553" xml:space="preserve"><g>\
                                    <line fill="none" stroke="#ffffff" stroke-width="2" x1="1" y1="1" x2="14" y2="14"/>\
                                    <line fill="none" stroke="#ffffff" stroke-width="2" x1="14" y1="1" x2="1" y2="14"/>\
                                    </g>\
                                </svg>\
                                </div>\
                             </div>');
                            
                            var child_mc = $('#mediaOverlay .overlayBottom > div').last();
                            child_mc.data("float", i_data);
                            child_mc.data("delno", self.opt.float_arr.length);
                            
                            child_mc.find('.img').on('tap', function() {
                                self.pause();
                                window.open(i_data.randing_url);
                                return false;
                            });
                            child_mc.find('.closeBtn').on('tap', function() {
                                self.opt.float_arr.splice(child_mc.data('delno'), 1);
                                child_mc.remove();
                                return false;
                            });
                            
                            self.opt.float_arr.push(child_mc);
                            break;
                    }

                }

                log("noad_chk : " + noad_chk);
                if (noad_chk) {
                    // self.goMediaAction();
                }

                self.htmlMake();

            }, function ($type, $data) {


                self.htmlMake();
                /*
				self.btn_mc.hide();
				self.cdnOutLoad(true);
                */

            }, "get", "", _jsonCallback);

            self.opt.ad = "";
        };

        this.adClick = function () {
            if (dataChk(self.videoData.ad_data.url)) {

                self.mediaControl.adClickView();

                //self.media_mc.stop();
                self.opt.adPlaying = false;
                self.opt.adSkipClick = true;
                self.media_mc.currentTime = self.media_mc.duration;


                window.open(self.videoData.ad_data.url + "&sec=" + self.videoData.nowtime);
                
                try {
                    self.videoData.nowtime = 0;
                    self.adView_mc.hide();
                } catch (e) {

                }

                self.playing = false;
                self.player_mc.hide();
                self.btn_mc.show();


                self.media_box.addClass('no-animation');
                self.media_box.addClass('out');
                $('body').removeClass('media-con-on');
                
                self.resize();
            }
        };

        this.adPlayAction = function (ad_obj) {

            log("adPlayAction");

            ad_obj.src = ad_obj.content;
            self.videoData.ad_data = ad_obj;
            self.player_arr.splice(0, 0, ad_obj);
            self.opt.adPlaying = true;
            self.video_mc.attr('poster', '');

            if (self.opt.isios && !self.opt.isipad) {

                var ios_ad_mc = self.box_mc.find('.videoiOSADTxt');

                ios_ad_mc.show();
                ios_ad_mc.find('span').css({
                    'opacity': '1',
                    'transition': 'opacity .4s ease-out',
                    '-moz-transition': 'opacity .4s ease-out',
                    '-webkit-transition': 'opacity .4s ease-out'
                })


                self.loading(false);

                setTimeout(function () {
                    ios_ad_mc.find('span').css({
                        'opacity': '0'
                    })
                }, 2600);
                setTimeout(function () {
                    ios_ad_mc.hide();
                    self.loading(true);
                    self.goMediaAction();
                    self.mediaControl.adView();
                }, 3000);

            } else {
                self.goMediaAction();
                self.mediaControl.adView();
            }


        }

        this.adErrorAction = function () {

            log("adErrorAction");
            self.goMediaAction();
        }

        this.playAction = function () {
            // 통계..
            var akamai_chk = false;
            if (dataChk(self.cdn_obj.staturl)) {
                akamai_chk = true;
                AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH = self.cdn_obj.staturl;
            } else if (dataChk(self.opt.PLUGIN_URL)) {
                akamai_chk = true;
                AKAMAI_MEDIA_ANALYTICS_CONFIG_FILE_PATH = self.opt.PLUGIN_URL;
            } else {
                self.playActionView();
            }

            log(self.cdn_obj)
            log("통계 : " + akamai_chk)

            if (akamai_chk) {
                $.getScript("http://79423.analytics.edgesuite.net/html5/akamaihtml5-min.js", function () {
                    setAkamaiMediaAnalyticsData("title", "HTML5Title");
                    self.playActionView();
                    // Here you can use anything you defined in the loaded script
                });
            }
        };

        this.playActionView = function () {

            log("playActionView");

            if (self.video_mc == null) return;
            
            if(self.opt.isstartvideo) {
                
            } else {
                self.video_mc.html('');
            }
            
            self.btn_mc.hide();
            self.player_mc.show();
            self.player_mc.css({
                "left": 0
            });

            if (dataChk(self.opt.gas)) {
                self.adYoutubeAction();

            } else {
                self.playActionViewGo();
            }
        }
        
        

        this.playActionViewGo = function () {

            log("playActionViewGo", 'font-size:40px;')
            
            

            if (self.video_mc.find('source').length == 0) {
                self.video_mc.append('<source src="' + self.player_arr[self.opt.track].src + '" type="video/mp4" />');
            }
            
            
            self.box_mc.find('#mediaControlArea').show();

            if (self.opt.isMobileUI && self.control_chk) {

                if (self.opt.adPlaying) {
                    self.video_mc.prop('controls', false);
                } else {
                    
                    if (self.control_chk) {
                        self.video_mc.prop('controls', false);
                        
                    } else {
                        self.video_mc.prop('controls', true);
                    }
                    
                    //201509031008 LG 폰에서 전체화면이 안되서 컨트롤 유지
                    if(self.opt.islg) {
                        
                        if(self.opt.adroid_num <= 4.4 && self.opt.isandroid) {
                            
                            $('body').addClass('ua-lg-block');
                            self.box_mc.find('#mediaControlArea').hide();
                            self.video_mc.prop('controls', true);
                        }
                    }
                }
            } else {
                self.video_mc.prop('controls', true);
            }

            self.video_mc.css({
                'position': 'relative',
                'left': 0
            });
            
            // Dash Mode
            if(/(\.mpd)$/i.test(self.player_arr[self.opt.track].src) || String(self.player_arr[self.opt.track].src).indexOf('.mpd') != -1) {
                
                log("DASH");
                
                if(typeof Dash != "undefined") {
                    log("Dash Init");
                    
                    var context = new Dash.di.DashContext();
                    var player = new MediaPlayer(context);

                    player.startup();
                    player.debug.setLogToBrowserConsole(false);
//                    player.setAutoPlay(false);

                    player.attachView(self.media_mc);
                    player.attachSource(self.player_arr[self.opt.track].src);
                    
                } else {
                    log("Not Init Dash..");
                }
                return;
            }
            
            if(self.opt.ismobile && vr_mobile_chk) {
                
                var pathArray = location.href.split( '/' );
                var protocol = pathArray[0];
                var host = pathArray[2];
                var browser_url = protocol + '//' + host;
                
                
                pathArray = String(self.player_arr[self.opt.track].src).split( '/' );
                protocol = pathArray[0];
                host = pathArray[2];
                var stream_url = protocol + '//' + host;
                
                if(browser_url != stream_url) {
                    self.media_mc.crossOrigin = "Anonymous";
                }
            }
            
            self.media_mc.load();

            // 스트림 에러
            self.video_mc.find('source').get(0).addEventListener('error', function (e) {
                //("eeror")
                //self.setError(self.videoData.lang.error);
            }, true);

            if (self.opt.isadno) {

            }

            if (self.opt.istmp) {
                return;
            }


            if (self.opt.isandroid) {

                log("goAndplay");
                var goAndplay = setInterval(function () {

                    if (self.mediaReadyState !== String(self.media_mc.readyState)) {

                        log("self.media_mc.readyState : " + self.media_mc.readyState);

                        if (self.media_mc.readyState == 2 || self.media_mc.readyState == 3 || self.media_mc.readyState == 4) {
                            clearInterval(goAndplay);
                            self.playMediaView();
                        }

                        if (self.media_mc.readyState == 0) {
                            if (self.opt.ischrome) {
                                clearInterval(goAndplay);
                                self.playMediaView();
                            }
                        }

                        self.mediaReadyState = String(self.media_mc.readyState);
                    }
                }, 100);

                self.media_mc.addEventListener("canplay", self.playCanPlayView, false);
            } else {

                log("goAndplay");
                var goAndplay = setInterval(function () {

                    if (self.mediaReadyState !== String(self.media_mc.readyState)) {

                        log("self.media_mc.readyState : " + self.media_mc.readyState);

                        if (self.media_mc.readyState == 1 || self.media_mc.readyState == 0 || self.media_mc.readyState == 3 || self.media_mc.readyState == 3 || self.media_mc.readyState == 4) {
                            clearInterval(goAndplay);
                            self.playMediaView();
                        }

                        self.mediaReadyState = String(self.media_mc.readyState);
                    }
                }, 100);

                self.media_mc.addEventListener("canplay", self.playCanPlayView, false);
                //self.media_mc.play();
            }
        }

        this.mediaReadyState = -1;
        this.mediaReadyGo_chk = false;

        this.playCanPlayView = function () {

            self.playMediaView();
        }

        this.playMediaView = function () {
            log("playMediaView");
            log("self.mediaReadyGo_chk : " + self.mediaReadyGo_chk);

            if (self.mediaReadyGo_chk) {
                return;
            }

            self.mediaReadyGo_chk = true;

            var goAndplay = setInterval(function () {
                clearInterval(goAndplay);

                //self.loading(false);
                self.media_mc.play();
                self.media_mc.removeEventListener("canplay", self.playCanPlayView, false);

                try {
                    // if(self.opt.isandroid) self.media_mc.webkitEnterFullScreen();
                } catch (e) {}

            }, 100);
        };

        this.youtubeControler = null;
        this.youtubeAdMgr = null;

        this.adYoutubeSetting = function () {

            if (typeof google != "object") {
                self.opt.gas = null;
                return;
            } else if (typeof google.ima != "object") {
                self.opt.gas = null;
                return;
            }

            var MainController = function (playerController) {
                this.playing = false;
                this.adsActive = false;
                this.adsDone = false;

                this.playerController = playerController;
                this.adsController = new AdsController(this, this.playerController);

                this.adTagUrl = unescape(self.opt.gas);

                //this.adTagUrl = 'http://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=%2F6062%2Fiab_vast_samples&ciu_szs=300x250%2C728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]&cust_params=iab_vast_samples%3Dlinear';
            };

            MainController.prototype.onClick = function () {

                if (!this.adsDone) {
                    this.adsController.initialUserAction();
                    this.playerController.preloadContent(this.bind(this, this.loadAds));
                    this.adsDone = true;
                    self.playIMA_chk = false;
                    return;
                }

                if (this.adsActive) {
                    if (this.playing) {
                        this.adsController.pause();
                    } else {
                        this.adsController.resume();
                    }
                } else {
                    if (this.playing) {
                        this.playerController.pause();
                    } else {
                        this.playerController.play();
                    }
                }
                this.playing = !this.playing;
            };


            MainController.prototype.bind = function (thisObj, fn) {
                return function () {
                    fn.apply(thisObj, arguments);
                };
            };

            // 광고 끝나고..
            MainController.prototype.resumeAfterAd = function () {
                this.playerController.play();
                this.adsActive = false;

            };
            MainController.prototype.pauseForAd = function () {
                this.adsActive = true;
                this.playing = true;

                $('#adContainer').css({
                    'margin-bottom': 40
                });
                self.video_mc.hide();
            };
            MainController.prototype.adClicked = function () {
                this.playing = false;
            };
            MainController.prototype.loadAds = function () {
                this.adsController.requestAds(this.adTagUrl);
            };

            var PlayerController = function () {
                this.contentPlayer = self.media_mc;
                this.adContainer = document.getElementById('adContainer');
                this.width = self.opt.width;

                $('#adContainer').css({
                    'margin-bottom': 0
                });
                this.height = self.opt.height - 40;
                this.adPlaying = false;
            };
            PlayerController.prototype.setAdPlaying = function (adPlaying) {
                this.adPlaying = adPlaying;
            };
            PlayerController.prototype.preloadContent = function (contentLoadedAction) {
                contentLoadedAction();
            };
            PlayerController.prototype.play = function () {
                log("PlayerController.prototype.play");
                //this.contentPlayer.play();

                $('#adContainer').css({
                    'margin-bottom': 40
                });

                self.opt.adPlaying = false;
                self.opt.youtubePlaying = false;
                self.box_mc.removeClass("play-youtube");

                self.video_mc.show();
                self.playActionViewGo();

            };
            PlayerController.prototype.pause = function () {
                log("PlayerController.prototype.pause");
                self.loading(false);
                this.contentPlayer.pause();
            };
            PlayerController.prototype.isMobilePlatform = function () {
                return this.contentPlayer.paused &&
                    (navigator.userAgent.match(/(iPod|iPhone|iPad)/) ||
                        navigator.userAgent.toLowerCase().indexOf('android') > -1);
            };

            var AdsController = function (controller, player) {
                this.controller = controller;
                this.player = player;
                this.adDisplayContainer = new google.ima.AdDisplayContainer(this.player.adContainer);
                this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
                this.adsManager = null;
                this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, false, this);
                this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, false, this);
            };
            AdsController.prototype.initialUserAction = function () {
                this.adDisplayContainer.initialize();
            };

            AdsController.prototype.requestAds = function (adTagUrl) {
                var adsRequest = new google.ima.AdsRequest();
                adsRequest.adTagUrl = adTagUrl;
                adsRequest.linearAdSlotWidth = this.player.width;
                adsRequest.linearAdSlotHeight = this.player.height;
                adsRequest.nonLinearAdSlotWidth = this.player.width;
                adsRequest.nonLinearAdSlotHeight = this.player.height;
                this.adsLoader.requestAds(adsRequest);
            };

            AdsController.prototype.onAdsManagerLoaded = function (adsManagerLoadedEvent) {
                this.adsManager = adsManagerLoadedEvent.getAdsManager(this.player.contentPlayer);
                this.processAdsManager(this.adsManager);
            };

            AdsController.prototype.processAdsManager = function (adsManager) {
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.onContentPauseRequested, false, this);
                adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.onContentResumeRequested, false, this);
                adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, false, this);
                var events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
          google.ima.AdEvent.Type.CLICK,
          google.ima.AdEvent.Type.COMPLETE,
          google.ima.AdEvent.Type.FIRST_QUARTILE,
          google.ima.AdEvent.Type.LOADED,
          google.ima.AdEvent.Type.MIDPOINT,
          google.ima.AdEvent.Type.PAUSED,
          google.ima.AdEvent.Type.STARTED,
          google.ima.AdEvent.Type.THIRD_QUARTILE];
                for (var index in events) {
                    adsManager.addEventListener(events[index], this.onAdEvent, false, this);
                }

                adsManager.init(this.player.width, this.player.height, google.ima.ViewMode.NORMAL);
                adsManager.start();
            };

            AdsController.prototype.pause = function () {
                log("AdsController.prototype.pause");
                if (this.adsManager) {
                    this.adsManager.pause();
                }
            };

            AdsController.prototype.resume = function () {
                log("AdsController.prototype.resume");
                if (this.adsManager) {
                    this.adsManager.resume();
                    var obj = new Object();
                    obj.type = "playing";
                    self.state(obj);
                }
            };

            AdsController.prototype.onContentPauseRequested = function (adErrorEvent) {
                log("AdsController.prototype.onContentPauseRequested");
                this.controller.pauseForAd();
            };

            AdsController.prototype.onContentResumeRequested = function (adErrorEvent) {
                log("AdsController.prototype.onContentResumeRequested");
                this.controller.resumeAfterAd();
            };

            AdsController.prototype.onAdEvent = function (adEvent) {
                log("youtube ad : " + adEvent.type, "color:white;background-color:red;")
                if (adEvent.type == google.ima.AdEvent.Type.CLICK) {
                    this.controller.adClicked();
                }
                var ad = adEvent.getAd();

                self.youtubeAdMgr = ad;

                var obj = new Object();
                var adM = this.adsManager;
                log(ad.isLinear(), "color:white;background-color:red;")

                switch (adEvent.type) {
                case google.ima.AdEvent.Type.LOADED:
                    obj.type = "loadstart";
                    self.state(obj);


                    if (!ad.isLinear()) {

                        //self.video_mc.show();
                        //self.media_mc.play();
                    } else {

                    }
                    break;

                case google.ima.AdEvent.Type.STARTED:

                    $('#adContainer').show();

                    if (!ad.isLinear()) {

                        self.opt.adPlaying = false;
                        self.opt.youtubePlaying = false;
                        self.box_mc.removeClass("play-youtube");
                        self.playActionViewGo();
                    } else {

                        $('#adContainer').css({
                            'margin-bottom': 40
                        });

                        self.box_mc.addClass("play-youtube");
                        self.opt.adPlaying = true;
                        self.opt.youtubePlaying = true;
                        self.mediaControl.adView();

                        obj.type = "playing";

                        intervalTimer = setInterval(function () {

                            var obj = {};
                            obj.nowTime = ad.getDuration() - Math.round(adM.getRemainingTime());
                            obj.totalTime = ad.getDuration();

                            self.videoData.nowtime = obj.nowTime;
                            self.videoData.totaltime = obj.totalTime;

                            self.state({
                                type: "timeupdate"
                            });

                        }, 300);


                        self.state(obj);
                    }
                    break;
                case google.ima.AdEvent.Type.PAUSED:
                    obj.type = "pause";
                    //self.state(obj);
                    self.state(obj);

                    this.controller.playing = !this.controller.playing;
                    break;


                case google.ima.AdEvent.Type.COMPLETE:

                    clearInterval(intervalTimer);

                    log("google.ima.AdEvent.Type.COMPLETE", "color:red;")

                    self.state({
                        type: "end"
                    });

                    self.opt.adPlaying = false;
                    self.opt.youtubePlaying = false;
                    self.box_mc.removeClass("play-youtube");
                    self.video_mc.show();
                    break;

                case google.ima.AdEvent.ALL_ADS_COMPLETED:
                case "allAdsCompleted":
                    $('#adContainer').hide();
                    break;
                }

            };

            AdsController.prototype.onAdError = function (adErrorEvent) {
                log("adErrorEvent : " + adErrorEvent, "color:white;background-color:red;");

                if (this.adsManager) {
                    this.adsManager.destroy();
                }
                this.controller.resumeAfterAd();
            };


            self.youtubeControler = new MainController(new PlayerController());
        }
        this.adYoutubeAction = function () {

            self.loading(true);
            self.youtubeControler.onClick();

        }

        this.state = function (event) {

            self.opt.media_events[event.type] = self.opt.media_events[event.type] + 1;

            if (event.type == "loadstart" || event.type == "waiting") {
                self.loading(true);
                //VideoUtil.mediaStatus("bufferStart");
                //nowstate_str = event.type;

                //self.opt.isFirst = true;

                if (self.opt.isandroid && self.opt.ischrome) {
                    if (self.opt.istmp) {
                        //self.goMediaAction();
                    }
                }
            }

            if (event.type == "stalled") {
				if(self.opt.onair == "Y" && self.opt.ischrome) {
					self.media_mc.pause();
					self.media_mc.play();
				}
			}

            if (event.type == "loadedmetadata") {
                if (self.opt.isandroid) {
                    self.video_mc.css({
                        'position': 'relative',
                        'top': 0,
                        'left': 0
                    });
                }
            }
            if (event.type == "canplay") {

                if (self.opt.isandroid && self.opt.ischrome) {
                    if (self.opt.istmp) {
                        self.media_mc.pause();
                        self.goMediaAction();
                    }
                }
            }
            if (event.type == "playing") {
                //self.loading(false);
                //VideoUtil.mediaStatus("playing");
                //self.opt.isFirst = false;

                if (self.opt.isFirst && !self.opt.adPlaying) {

                    try {
                        window['MF_vodStart'](self.data_num);
                    } catch (e) {

                    }
                    //self.playFirst();
                } else {
                    try {
                        window['MF_vodResume'](self.data_num);
                    } catch (e) {}
                }

                self.playing = true;
                self.opt.isautotrack = false;
                
                if(self.opt.adPlaying) {
                    
                } else {
                    self.opt.isFirst = false;
                }
                
                if (self.overview_mc !== null) {
                    self.overview_mc.hide();
                }
                
                if(self.opt.onair == "Y") {
                    //self.loading(false);
                }
                //VideoUtil.playing();
            }
            if (event.type == "timeupdate") {


                if (!self.opt.istmp) {
                    //self.loading(false);
                }

                if (self.opt.youtubePlaying) {

                } else {

                    if (self.opt.isyoutube) {

                        var obj = {};
                        obj.nowTime = self.videoData.nowtime;
                        obj.totalTime = self.videoData.totaltime;

                    } else {

                        var obj = {};
                        var a = self.media_mc.duration;
                        if (isNaN(a)) {
                            a = 0;
                        }
                        obj.nowTime = self.media_mc.currentTime.toFixed(0);
                        obj.totalTime = a.toFixed(0);

                        self.videoData.nowtime = obj.nowTime;
                        self.videoData.totaltime = obj.totalTime;

                    }

                    if (!self.opt.istmp) {;
                        self.progress(obj);
                    }
                }
                

                if (self.videoData.totaltime > 0) {
                    self.loading(false);
                } else if(self.videoData.totaltime == 0 && self.opt.onair == "Y") {
                    self.loading(false);
                }

                try {
                    window['Flash_mediaProgress']([obj]);
                } catch (e) {}
                //VideoUtil.mediaProgress(obj);
                //VideoUtil.update();
            } else {

            }
            if (event.type == "pause") {
                if (!self.opt.istmp) {
                    //self.loading(false);
                }
                
                if(self.playing) {
                    try {
                        window['MF_vodPause'](self.data_num);
                    } catch (e) {}
                }
                
                self.playing = false;

                if (self.overview_mc !== null) {
                    self.overview_mc.show();
                }
                
                
            }
            if (event.type == "ended") {
                if (!self.opt.istmp) {
                    self.loading(false);
                }
                //VideoUtil.mediaStatus("stop");
                self.playing = false;
                self.playEnd();
                
                if (self.overview_mc !== null) {
                    self.overview_mc.show();
                }
                
                self.opt.adSkipClick = false;
            }

            switch (event.type) {
            case "suspend":
            case "progress":
            case "timeupdate":
                break;
            default:
                if (!self.opt.istmp) {
                    log("			#" + self.id + " : " + event.type);
                }
                break;
            }

            self.mediaControl.stats(event.type);
        };

        this.userinfoCheck = function () {
            
            // 생방송 관련한 로직
            if(self.opt.onair == "Y") {
                switch(String(self.info_obj.onairfree).toUpperCase()) {

                    // 무료회원까지는 생방보기
                    case "B":
                        if (self.videoData.login_chk) {
                            return true;
                        } else {
                        }
                        break;

                    // 무료회원 및 비회원 생방보기
                    case "C":
                        return true;
                        break;

                    // 유료회원만 생방보기
                    case "A":
                        break;
                }

            }
            
            if (dataChk(self.videoData.user_data)) {
                if (self.videoData.user_data.vodbilltype == "WSAg") {
                    return true;
                } else {
                    if (dataChk(self.videoData.user_data.login)) {
                        if (self.info_obj.free == "Y") {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        if (self.info_obj.free == "Y" && self.info_obj.freeLogin == "N") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            } else {
                return true;
            }
        };

        this.progress = function (obj) {

            if (self.media_mc != null) {
                if (self.media_mc.videoWidth > 0) {
                    if (self.opt.isandroid) {
                        self.video_mc.css({
                            'position': 'relative',
                            'top': 0,
                            'left': 0
                        });
                        //self.resize();
                    } else {
                        
                    }
                }
            }

            if (!self.opt.adPlaying && dataChk(self.opt.limittime)) {
                if (self.opt.limittime !== "N" && !self.userinfoCheck()) {
                    if (obj.nowTime >= parseInt(self.opt.limittime, 10)) {
                        //self.media_mc.currentTime = 0;
                        self.media_mc.pause();
                        self.playClose();
                        self.playEnd();
                        try {
                            if (dataChk(self.opt.limittime_fn)) {
                                window[self.opt.limittime_fn]();
                            } else {
                                alert("미리보기영상은 \n 1분 30초만 제공됩니다.");
                            }
                        } catch (e) {}
                        window['MF_vodEnd']();
                    }
                }
            }

            if (obj.totalTime > 0) {
                //if(obj.nowTime == obj.totalTime && _update_chk) {
                if (obj.nowTime == obj.totalTime) {
                    self.playEndTimeAction();
                }
            }

            if (!self.opt.isflash && !self.opt.adPlaying && !self.opt.istmp) {
                videoLog.set(self);
            }
            
            if(self.opt.adPlaying) {
                videoLog.adVideoEntAPI(self);
            }
            
            // 오버레이
            $.each(self.opt.float_arr, function(i, item){
                var float_data = item.data('float');
                var view_chk = false;
                if (dataChk(float_data.starttime) && dataChk(float_data.endtime)) {
                    if (Number(float_data.starttime) < obj.nowTime && Number(float_data.endtime) > obj.nowTime) {
                        item.addClass('on');
                    } else {
                        item.removeClass('on');
                    }
                }
            });

        };

        this.playEndTimeAction = function () {
            
            if (self.opt.adPlaying && !self.opt.adSkipClick) {

                try {
                    self.videoData.nowtime = 0;
                    self.media_mc.currentTime = 0;
                    self.adView_mc.hide();

                } catch (e) {

                }

                self.loading(true);
                self.playing = false;
                self.playEnd();
                
                self.media_mc.pause();
                self.opt.adPlaying = false;
                self.video_mc.attr('poster', self.opt.cover);
                self.player_mc.show();
                self.btn_mc.hide();
                self.cdnOutLoad(true);
                
            } else {

                if (self.data_num < self.data_arr.length - 1) {

                    if (self.opt.isautotrackstart) {
                        self.opt.isautotrack = true;
                        self.nextTrack(self.data_num + 1);
                    }

                }
            }
        }

        this.nextTrack = function ($track_num) {

            try {
                self.videoData.nowtime = 0;
                self.media_mc.currentTime = 0;
                self.adView_mc.hide();
            } catch (e) {

            }

            self.loading(true);
            self.playing = false;
            self.playEnd();
            if (self.media_mc !== null) {
                self.media_mc.pause();
                if (self.video_mc !== null) {
                    self.video_mc.attr('poster', '');
                }
            }

            self.opt.adPlaying = false;
            self.player_mc.show();
            self.btn_mc.hide();

            self.data_num = $track_num;
            self.opt.data = self.data_arr[self.data_num];

            try {
                window['MF_trackChange'](String(self.data_num));
            } catch (e) {}

            self.dataLoad();
        }

        this.playClose = function () {
            try {
                if (!self.opt.adPlaying) {
                    self.media_mc.webkitExitFullscreen();
                    self.media_mc.mozCancelFullscreen();
                    self.media_mc.exitFullscreen();
                }
            } catch (e) {}
        }

        this.playFirst_chk = false;

        this.playFirst = function () {

            if (self.playFirst_chk) return;

            if (dataChk(self.userinfo_obj)) {

                //Free Video
                if (self.info_obj.free == "Y") {
                    //("free");
                } else {
                    if (self.userinfo_obj.id.length > 0) {
                        //self.loginUserBuy();
                    } else {
                        if (self.userinfo_obj.aodbilltype == "TiAg" && self.userinfo_obj.vodbilltype == "TiAg") {
                            if (dataChk(self.opt.nologin_fn)) {
                                window[self.opt.nologin_fn]();
                            }
                        }
                    }
                }
            }

            self.video_mc = $('#' + self.id + '-video');
            self.media_mc = document.getElementById(self.id + '-video');

            for (key in self.opt.media_events) {
                self.media_mc.addEventListener(key, self.state, false);
            }

            if (document.createElement('video').canPlayType) {} else {
                // 비디오태그 지원하지않음.
            }

            self.playFirst_chk = true;
        }

        this.loginUserBuy = function () {
            if (self.userinfo_obj.aodbilltype == "TiAg" && self.userinfo_obj.vodbilltype == "TiAg") {

                if (self.info_obj.free == "Y") {} else {
                    try {
                        if (dataChk(self.opt.buy_fn)) {
                            window[self.opt.buy_fn]();
                        }
                    } catch (e) {

                    }
                }

            }
        }

        this.playEnd = function () {

            log("playEnd", "color:blue");
            log(self.opt.adPlaying);

            self.player_mc.hide();
            self.btn_mc.show();
            self.playClose();

            self.opt.cdn_chk = false;
            self.mediaReadyGo_chk = false;
            self.mediaReadyState = -1;

            self.mediaControl.end();

            try {
                self.videoData.nowtime = 0;
                self.media_mc.currentTime = 0;
                
                if(!self.opt.adPlaying && !self.opt.adSkipClick) {
                    window['MF_vodEnd']();
                }
            } catch (e) {

            }

            self.loading(false);

        };

        this.loading_view_chk = false;
        this.loading_hide_chk = false;
        this.loading = function ($chk, $hide) {

            try {
                if(!Spinner) {
                    return;
                }
            } catch(e) {
                return;
            }
            
            try {

                var err = getErrorObject();
                var caller_line = err.stack.split("\n")[4];
                var index = caller_line.indexOf("at ");
                var clean = caller_line.slice(index + 2, caller_line.length);
                clean = String(clean).split(":");

                //log("loading : " + $chk + " : " + clean[clean.length - 2]);
            } catch (e) {}

            //if(!dataChk(self.spinner)) return;
            self.loading_view_chk = $chk;

            if ($chk) {
                if (dataChk(self.spinner)) self.spinner.stop();

                var sh = self.opt.height / 200;
                if (sh > 1.5) sh = 1.5;
                if (isNaN(sh)) sh = 1;

                self.spinner = new Spinner({
                    lines: 10,
                    length: Math.round(sh * 5),
                    width: 1,
                    radius: Math.round(sh * 5),
                    corners: 1,
                    rotate: 0,
                    direction: 1,
                    color: '#fff',
                    speed: 1,
                    trail: 60,
                    shadow: false,
                    hwaccel: false,
                    className: 'spinner',
                    zIndex: 2e9
                });
                self.spinner.spin(self.box_mc.get(0));
                $('.spinner').css({
                    'top': '50%',
                    'left': '50%'
                });

            } else {
                self.spinner.stop();
            }
            if ($hide == 1) {
                self.loading_hide_chk = true;
            } else if ($hide == 2) {
                self.loading_hide_chk = false;
            }

            if (self.loading_hide_chk) {

                $(self.spinner.el).hide();
            } else {

                $(self.spinner.el).show();
            }
        };

        this.resize = function () {
            self.opt.width = self.box_mc.width();
            self.opt.height = self.box_mc.height();
            
            if(self.mediaControl.qualityControl != null && self.opt.alwaysQualityBtn) {
                self.mediaControl.qualityControl.show();
                if(self.mediaControl.qualityControl.height() > 0) {
                    var q_z = self.mediaControl.qualityControl.css('zoom');
                    self.box_mc.css({
                        'height': Math.ceil(self.box_mc.parent().height() - self.mediaControl.qualityControl.height() * q_z)
                    });

                    self.mediaControl.qualityControl.css({
                        'bottom' : - Math.ceil(self.mediaControl.qualityControl.height())
                    })
                }
            }
            
            if(self.opt.adPlaying) {
                self.box_mc.css({
                    'height': '100%'
                }); 
                
                if(self.mediaControl.qualityControl != null) {
                    self.mediaControl.qualityControl.css({
                        'bottom' : 0
                    })
                    self.mediaControl.qualityControl.hide();
                }
            }

            self.media_mc = document.getElementById(self.id + '-video');
            if (self.media_mc != null && self.media_mc.addEventListener) {
                var _w = self.opt.width;
                var _h = _w / (self.media_mc.videoWidth / self.media_mc.videoHeight);
                
                if (_h > self.opt.height) {
                    _h = self.opt.height;
                    _w = _h / (self.media_mc.videoHeight / self.media_mc.videoWidth);
                }

                if (self.opt.youtubePlaying) {
                    _w = self.opt.width;
                    _h = _w / 16 * 9;

                    $('#adContainer > div').width(_w);
                    $('#adContainer > div').height(_h - 40);
                }
                

                self.player_mc.css({
                    'width': _w,
                    'height': _h
                });
                self.video_mc.attr({
                    'width': self.opt.width,
                    'height': self.opt.height
                });
                
                if(self.opt.isios) {
                    self.video_mc.attr({
                        'width': _w,
                        'height': _h
                    });
                    /*
                    self.video_mc.css({
                        'height': 'auto',
                        'margin-top': (self.opt.height - _h)/2
                    });
                    */
                }
            }

            try {
                self.btn_mc.find('img').ResizeImage({
                    width: self.opt.width,
                    height: self.opt.height,
                    crop: true
                });


                var sh = self.opt.height / 200;
                if (sh > 1.5) sh = 1.5;
                self.box_mc.find('.playbtn .btnBG').css({
                    '-webkit-transform': 'scale(' + sh + ',' + sh + ')',
                    'transform': 'scale(' + sh + ',' + sh + ')'
                });
                self.box_mc.find('.playbtn .btnGo').css({
                    '-webkit-transform': 'scale(' + sh + ',' + sh + ')',
                    'transform': 'scale(' + sh + ',' + sh + ')'
                });
            } catch (e) {}

            var sh = self.opt.height / 200;
            if (sh > 1.5) sh = 1.5;

            if (self.loading_view_chk) {
                self.spinner.stop();
                self.spinner = new Spinner({
                    lines: 10,
                    length: Math.round(sh * 5),
                    width: 1,
                    radius: Math.round(sh * 5),
                    corners: 1,
                    rotate: 0,
                    direction: 1,
                    color: '#fff',
                    speed: 1,
                    trail: 60,
                    shadow: false,
                    hwaccel: false,
                    className: 'spinner',
                    zIndex: 2e9
                });
                self.spinner.spin(self.box_mc.get(0));
            }

            $('.spinner').css({
                'top': '50%',
                'left': '50%'
            });
            
            try {
                self.mediaControl.resize();
            } catch(e) {
                
            }


            //btn_obj.find('.btn2').css({'width':width,'height':height,'position':'absolute','z-index':99});
        };

        /*
		######### 영상컨트롤 #########
		*/
        this.mediaControl = {

            thisFirstPlaying: true

            ,
            drag_chk: false,
            firstViewTimer: null,
            hideTimer: null,
            skip_num: -1,
            skip_click_chk: false

            ,
            bgcolor: null
            
            ,mediaControl_box : null
            ,qualityControl : null

            ,
            init: function () {
                
                if(this.init_chk) return;
                
                    
                this.init_chk = true;
                log("Media Control init");

                self.mediaControl.setting();
            }
            
            ,youtubeUpdate: function() {
                if (self.opt.isyoutube) {
                    self.box_mc.addClass('player-mode--youtube');
                    if(!videoData.isfullscreenbox) {
                        self.box_mc.find('#mediaControlArea').hide();
                    }
                }
            }

            ,
            setting: function () {

                log("Media Control Setting");

                try {
                    //*
                    self.box_mc.css({
                        '-ms-user-select': 'none',
                        '-moz-user-select': '-moz-none',
                        '-khtml-user-select': 'none',
                        '-webkit-user-select': 'none',
                        'user-select': 'none'
                    });
                    //*/
                } catch (e) {

                }

                try {
                    document.addEventListener("fullscreenchange", self.mediaControl.fsEvt);
                    document.addEventListener("webkitfullscreenchange", self.mediaControl.fsEvt);
                    document.addEventListener("mozfullscreenchange", self.mediaControl.fsEvt);
                    document.addEventListener("MSFullscreenChange", self.mediaControl.fsEvt);
                } catch (e) {
                    log("전체화면 체인지 이벤트 에러");
                    log(e);
                }

                self.box_mc.append('<div id="mediaADview">\
									   <p class="adTxt">' + self.videoData.lang.adIng + '</p>\
									   <div class="clickArea"></div>\
								   </div>');
                self.adView_mc = self.box_mc.find('#mediaADview');
                self.adView_mc.find('.clickArea').on('tap', function () {
                    self.adClick();
                });
                self.adView_mc.hide();

                self.box_mc.append('<div id="mediaControlArea" class="out no-animation">\
										<div id="mediaControlDimm"/>\
										<div id="mediaControl">\
											<div id="timeline">\
												<div id="timelinePer"><div id="timelinePointer"></div></div>\
												<div class="time">\
													<span class="nowTime">00:00</span>\
													<span class="totalTime">00:00</span>\
												</div>\
											</div>\
											<div id="leftArea">\
												<div class="bgImg playBtn lineRight"></div>\
												<div class="bgImg stopBtn lineRight"></div>\
												<div class="time">\
													<span class="nowTime">00:00</span>\
													<span class="totalTime">00:00</span>\
													<span class="onair">방송중</span>\
												</div>\
											</div>\
											<div id="rightArea">\
												<div class="quality"></div>\
												<div class="bgImg volumeBtn lineLeft"></div>\
												<div class="bgImg fullBtn lineLeft"></div>\
												<div class="bgImg extendBtn lineLeft" style="display:none;">\
                                                    <div class="off"><svg version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"	 y="0px" width="18px" height="18px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="6.865,0 2.955,0 0,0 0,2.954 0,6.907 0.955,6.907 	0.955,0.954 6.865,0.954 "/><line fill="#800000018000000180000001" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" x1="1" y1="1" x2="7.463" y2="7.463"/><g>	<defs>		<polygon id="SVGID_1_" points="11.135,18.05 15.045,18.05 18,18.05 18,15.096 18,11.143 17.045,11.143 17.045,17.096 			11.135,17.096 		"/>	</defs>	<use xlink:href="#SVGID_1_"  overflow="visible" fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF"/>	<clipPath id="SVGID_2_">		<use xlink:href="#SVGID_1_"  overflow="visible"/>	</clipPath></g><line fill="#800000018000000180000001" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" x1="17" y1="17" x2="10.536" y2="10.581"/></svg></div>\
                                                    <div class="on"><svg version="1.1" id="레이어_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"	 y="0px" width="18px" height="18px" viewBox="0 0 18 18" enable-background="new 0 0 18 18" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="1,7.907 4.91,7.907 7.865,7.907 7.865,4.953 7.865,1 	6.91,1 6.91,6.953 1,6.953 "/><line fill="#800000018000000180000001" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" x1="6.729" y1="6.729" x2="0.266" y2="0.266"/><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#FFFFFF" points="16.865,10 12.955,10 10,10 10,12.955 10,16.908 	10.955,16.908 10.955,10.954 16.865,10.954 "/><line fill="#800000018000000180000001" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" x1="11" y1="11" x2="17.463" y2="17.463"/></svg></div>\
                                                </div>\
											</div>\
										</div>\
                                        <div id="mediaOverlay">\
                                            <div class="overlayBottom"></div>\
                                        </div>\
								  	</div>');
                
                
                
                this.mediaControl_box = self.me.parent().parent().find('#mediaControl');

                if (self.opt.isyoutube) {
                    self.box_mc.addClass('player-mode--youtube');
                }

                if(self.opt.hide_fullscreen == 'Y') {
                    this.mediaControl_box.find('#rightArea').hide();
                }
                
                if ($('body').hasClass("player-control--touch")) {
                    //$('#mediaControl').addClass('mobileView');
                }

                self.control_chk = true;
                //self.box_mc.find('#mediaControlArea').hide();
                self.media_box = self.box_mc.find('#mediaControlArea');
                self.control_mc = self.box_mc.find('#mediaControl');
                //self.media_box.removeClass('no-animation');

                
                
                
                if (dataChk(self.opt.color)) {
                    self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css({
                        'background': '#' + self.opt.color
                    });
                }
                
                this.bgcolor = self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css('background-color');


                self.control_mc.on('tap', function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    clearTimeout(self.mediaControl.firstViewTimer);

                });

                $('html').on('tap', function (e) {
                    var skip_chk = false;
                    try {
                        $.each(e.originalEvent.path, function(i,item){
                            if($(item).hasClass('no-body-evt')) {
                                skip_chk = true;
                            }
                        })
                    } catch(e) {}
                    
                    if(skip_chk) return;
                    
                    self.mediaControl.out();
                    clearTimeout(self.mediaControl.hideTimer);
                });

                self.box_mc.on('mouseover', function (e) {
                    if(self.box_mc.hasClass('stats-playing')) {
                        self.box_mc.addClass('ui-over');   
                    }
                });
                self.box_mc.on('mouseout', function (e) {
                    self.box_mc.removeClass('ui-over');
                });


                self.box_mc.find('#mediaControlDimm').on('tap', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    clearTimeout(self.mediaControl.firstViewTimer);

                    if (self.playing) {
                        
                        
                        if (self.media_box.hasClass('out')) {
                            self.media_box.removeClass('no-animation');
                            self.media_box.removeClass('out');
                            $('body').addClass('media-con-on');
                            self.mediaControl.closeEvt();
                        } else {
                            clearTimeout(self.mediaControl.hideTimer);
                            self.mediaControl.out();
                        }
                    } else {
                        if (self.media_box.hasClass('out')) {
                            self.media_box.removeClass('no-animation');
                            self.media_box.removeClass('out');
                            $('body').addClass('media-con-on');
                        }
                        self.media_mc.play();
                    }
                });

                self.control_mc.find('.playBtn').on('tap', function () {
                    clearTimeout(self.mediaControl.firstViewTimer);

                    log(self.playing);
                    log(self.opt.youtubePlaying);

                    if (self.opt.youtubePlaying) {
                        self.youtubeControler.onClick();
                    } else {
                        if (self.opt.isyoutube) {

                            if (self.playing) {
                                self.opt.youtube_mc.pauseVideo();
                            } else {
                                self.opt.youtube_mc.playVideo();
                            }
                        } else {
                            if (self.playing) {
                                self.media_mc.pause();
                            } else {
                                self.media_mc.play();
                            }
                        }
                    }
                });

                self.control_mc.find('.stopBtn').on('tap', function () {

                    if (self.opt.youtubePlaying) {} else {
                        if (self.opt.isyoutube) {
                            self.opt.youtube_mc.stopVideo();
                        } else {
                            self.playEnd();
                        }
                    }
                });

                self.control_mc.find('.fullBtn').on('tap', function () {
                    self.mediaControl.fsClick();
                });
                self.control_mc.find('.extendBtn').on('tap', function () {
                    self.mediaControl.exClick();
                });
                
                
                self.control_mc.find('.chatToggle').on('tap', function () {
                    
                    self.control_mc.find('.chatToggle').find('.on').toggle();
                    self.control_mc.find('.chatToggle').find('.off').toggle();
                    
                    window['MF_chatToggle']();
                });
                
                

                self.control_mc.find('#timeline').get(0).ondragstart = function () {
                    return event.ctrlKey;
                };
                self.control_mc.find('#timeline').on('tapstart', function () {
                    return false;
                });
                self.control_mc.find('#timeline').on('tapstart', function (e, touch) {

                    self.media_box.addClass('dragg');

                    if (self.opt.adPlaying) return;
                    if (self.media_box.hasClass('out')) return;


                    clearTimeout(self.mediaControl.firstViewTimer);
                    clearTimeout(self.mediaControl.hideTimer);
                    self.media_box.removeClass('no-animation');
                    self.media_box.removeClass('out');
                    $('body').addClass('media-con-on');
                    self.mediaControl.drag_chk = true;

                    try {
                        e.pageX = touch.offset.x;
                    } catch (e) {}
                    
                    var p_num = e.pageX;
                    
                    if(self.opt.ismobile) {
                        p_num = e.pageX - self.box_mc.offset().left;
                    }
                    
                    var w_num = p_num / self.opt.width * 100;
                    if (w_num > 100) w_num = 100;
                    self.control_mc.find('#timeline #timelinePer').css({
                        'width': w_num + "%"
                    });
                    return false;
                });
                
                self.control_mc.find('#timeline').on('tapend', function () {

                    self.media_box.removeClass('dragg');

                    if (self.opt.adPlaying) return;
                    if (self.media_box.hasClass('out')) return;

                    if (self.mediaControl.drag_chk) {
                        var seek_num = self.control_mc.find('#timeline #timelinePer').width() / self.opt.width * self.videoData.totaltime;
                        if (self.opt.isyoutube) {
                            self.opt.youtube_mc.seekTo(seek_num, true);
                        } else {
                            self.media_mc.currentTime = self.control_mc.find('#timeline #timelinePer').width() / self.opt.width * self.videoData.totaltime;
                        }
                    }
                    self.mediaControl.drag_chk = false;

                });
                self.control_mc.find('#timeline').on('tapmove', function (e, touch) {
                    if (!self.mediaControl.drag_chk) return;
                    if (self.opt.adPlaying) return;
                    if (self.media_box.hasClass('out')) return;

                    try {
                        e.pageX = touch.offset.x;
                    } catch (e) {
                        
                    }
                    var p_num = e.pageX;
                    
                    if(self.opt.ismobile) {
                        p_num = e.pageX - self.box_mc.offset().left;
                    }
                    
                    var w_num = p_num / self.opt.width * 100;
                    if (w_num > 100) w_num = 100;
                    self.control_mc.find('#timeline #timelinePer').css({
                        'width': w_num + "%"
                    });
                    return false;
                });
                
            }
            
            ,exClick : function() {
                window["MF_fullToggle"]();
            }
            
            ,fsClick : function() {
                
                
                var fs_state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

                if (fs_state) {

                    try {

                        if (document.exitFullscreen) {
                            document.exitFullscreen();
                        } else if (document.mozCancelFullScreen) {
                            document.mozCancelFullScreen();
                        } else if (document.webkitExitFullscreen) {
                            document.webkitExitFullscreen();
                        } else if (document.msExitFullscreen) {
                            document.msExitFullscreen();
                        }

                    } catch (e) {

                    }
                    
                } else {
                    
                    
                    
                    
                    try {

                        var videoContainer = $('#' + self.boxid).get(0);
                        var container_chk = false;
                        
                        /*
                        if (videoContainer.requestFullscreen) {
                            videoContainer.requestFullscreen();
                        } else if (videoContainer.mozRequestFullScreen) {
                            videoContainer.mozRequestFullScreen();
                        } else if (videoContainer.webkitRequestFullscreen) {
                            
                            try {
                                videoContainer.webkitRequestFullscreen();
                            } catch(e) {
                            }
                            
                            
                        } else if(videoContainer.msRequestFullscreen){
                            videoContainer.msRequestFullscreen();
                        } else {
                          //*/
                            
                            if (self.media_mc.requestFullscreen) {
                                self.media_mc.requestFullscreen();
                            } else if (self.media_mc.mozRequestFullScreen) {
                                self.media_mc.mozRequestFullScreen();
                            } else if (self.media_mc.webkitRequestFullscreen) {
                                self.media_mc.webkitRequestFullscreen();
                            } else if (self.media_mc.webkitEnterFullScreen) {
                                self.media_mc.webkitEnterFullScreen();
                            } else if (self.media_mc.msRequestFullscreen) {
                                self.media_mc.msRequestFullscreen();
                            } else {
                            }
                            
                        //}
                        return;

                    } catch (e) {
                        log(e);
                    }
                    
                    
                    
                }
            }

            ,
            fsEvt: function () {
                var fs_state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;

                clearTimeout(self.mediaControl.firstViewTimer);
                log('fullscreen : ' + fs_state);

                if (fs_state) {
                    // self.mediaControl.out();
                    $('body').addClass('fullscreen-video');
                } else {
                    $('body').removeClass('fullscreen-video');
                    self.media_box.removeClass('no-animation');
                    self.media_box.removeClass('out');
                    $('body').addClass('media-con-on');
                    if (self.playing) {
                        self.mediaControl.closeEvt();
                    }
                }
                
                self.mediaControl.resize();
            }

            ,
            closeEvt: function () {
                clearTimeout(self.mediaControl.hideTimer);
                self.mediaControl.hideTimer = setTimeout(function () {
                    if (self.playing) {
                        self.mediaControl.out();
                    }
                }, 3000);
            }

            ,
            out: function () {
                if (self.opt.adPlaying) {

                } else {
                    if (self.playing) {
                        $('body').removeClass('media-con-on');
                        self.media_box.addClass('out');
                    }
                }
            }

            ,
            stats: function () {
                if (!self.control_chk) return;
                if (self.opt.istmp) return;


                switch (arguments[0]) {
                case "loadstart":
                    self.box_mc.removeClass('stats-playing');
                    self.box_mc.removeClass('stats-pause');
                    
                    self.resize();
                    if (self.opt.adPlaying) {
                    } else {
                        if (self.opt.onair == "Y") {
                            self.media_box.addClass('onair');
                        }   
                    }
                    break;
                case "playing":
                    self.box_mc.removeClass('stats-pause');
                    self.box_mc.addClass('stats-playing');
                    self.player_mc.show();
                    self.btn_mc.hide();

                    self.resize();
                    if (self.opt.adPlaying) {
                        

                        self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css({
                            'background': '#ffd800'
                        });

                        self.media_box.addClass('ad');
                        $('body').addClass('media-ad-playing');
                        self.media_box.removeClass('over');

                        if (!self.opt.youtubePlaying) {
                            videoLog.adViewApiCall(self.videoData.ad_data);
                        } else {
                            self.media_box.addClass('over');
                        }

                    } else {
                        self.adView_mc.hide();

                        if (dataChk(this.bgcolor)) {
                            self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css({
                                'background-color': this.bgcolor
                            });
                        } else {
                            if (dataChk(self.opt.color)) {
                                self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css({
                                    'background': '#' + self.opt.color
                                });
                            } else {
                                if (dataChk(self.config_obj)) {
                                    if (dataChk(self.config_obj.style)) {
                                        if (dataChk(self.config_obj.style.color)) {
                                            self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css({
                                                'background': '#' + config_obj.style.color
                                            });
                                        }
                                    }
                                }
                            }
                        }

                        self.media_box.removeClass('ad');
                        $('body').removeClass('media-ad-playing');

                        if (self.opt.onair == "Y") {
                            self.media_box.addClass('onair');
                        }

                    }

                    self.media_box.removeClass('no-animation');
                    self.media_box.removeClass('out');
                        $('body').addClass('media-con-on');
                    if (self.mediaControl.thisFirstPlaying) {
                        self.mediaControl.firstViewTimer = setTimeout(function () {
                            self.mediaControl.out();
                        }, 3000);
                    }
                    self.mediaControl.thisFirstPlaying = false;
                    self.control_mc.find('.playBtn').addClass('playing');
                    self.mediaControl.closeEvt();
                    break;
                case "pause":
                    self.box_mc.removeClass('stats-playing');
                    self.box_mc.addClass('stats-pause');
                    self.control_mc.find('.playBtn').removeClass('playing');
                    break;
                case "ended":
                    self.box_mc.removeClass('stats-playing');
                    self.box_mc.removeClass('stats-pause');
                    self.control_mc.find('.playBtn').removeClass('playing');
                    break;
                case "timeupdate":

                    self.mediaControl.adTimeupdate(self.videoData.nowtime);

                    if (!self.mediaControl.drag_chk) {

                        if (self.videoData.totaltime == 1) self.videoData.totaltime = 0;
                        if (self.videoData.nowtime < 0) self.videoData.nowtime = 0;
                        if (self.videoData.totaltime < 0) self.videoData.totaltime = 0;

                        self.control_mc.find('#timeline #timelinePer').css({
                            'width': self.videoData.nowtime / self.videoData.totaltime * 100 + "%"
                        });
                        self.control_mc.find('.time .nowTime').html(mediaControl.timeConverting(self.videoData.nowtime));
                        self.control_mc.find('.time .totalTime').html(mediaControl.timeConverting(self.videoData.totaltime));
                    }
                    break;
                }
            }

            ,
            end: function () {

                if (self.opt.adPlaying && !self.opt.youtubePlaying && !self.mediaControl.skip_click_chk) {
                    videoLog.adPreAllApiCall(self.videoData.ad_data);
                }
                self.mediaControl.skip_click_chk = false;
                if (!self.control_chk) return;

                if (dataChk(this.bgcolor)) {
                    self.mediaControl.mediaControl_box.find('#timeline #timelinePer').css({
                        'background-color': this.bgcolor
                    });
                }

                self.media_box.removeClass('ad');
                $('body').removeClass('media-ad-playing');
                self.mediaControl.thisFirstPlaying = true;
            }

            ,
            adView: function () {
                if (!self.control_chk) return;
                self.adView_mc.show();
                self.mediaControl.adTimeupdate(0);

            }

            // 광고 스킵 버튼 활성화
            ,
            adTimeupdate: function ($num) {
                if (dataChk(self.videoData.ad_data)) {
                    if (dataChk(self.videoData.ad_data.skip)) {
                        if (dataChk(self.videoData.ad_data.skiptime)) {
                            self.opt.ad_skip_num = self.videoData.ad_data.skiptime;
                        }

                        var tmp_skip_num = self.opt.ad_skip_num - $num;

                        if (self.mediaControl.skip_num !== tmp_skip_num) {
                            if (tmp_skip_num < 1) {
                                self.adView_mc.find('p').html(self.videoData.lang.adSkip);
                                self.adView_mc.find('p').on('tapstart', function () {

                                    videoLog.adPreSkipApiCall(self, self.videoData.ad_data);

                                    self.mediaControl.skip_click_chk = true;
                                    self.control_mc.find('#timeline #timelinePer').css({
                                        'width': "0%"
                                    });
                                    self.control_mc.find('.time .nowTime').html(mediaControl.timeConverting(0));
                                    self.playEndTimeAction();
                                });

                            } else {
                                self.adView_mc.find('p').html(self.videoData.lang.adIng + " " + tmp_skip_num);
                            }
                        }
                        self.mediaControl.skip_num = tmp_skip_num;
                    }
                }
            }

            // 광고 클릭했을때 UI활성화.
            ,
            adClickView: function () {

                self.media_box.addClass('over');

                videoLog.adPreSkipApiCall(self, self.videoData.ad_data, true);
                videoLog.adClickApiCall(self, self.videoData.ad_data);

            }
            
            ,resize : function() {
                
                var fs_state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
                var target = self.box_mc.find('#mediaControlArea');
                var zoom_num = Number(Math.min(target.find('> #mediaControl').height() / 37, 2)).toFixed(1);
                
                if(!self.opt.ismobile) {
                    
                    zoom_num = 1;
                    
                    if(fs_state) {
                        zoom_num = 1.5;
                    }
                    
                    target.find('#mediaControl').css({
                        'zoom': zoom_num
                    });
                    
                } else {
                    
                    zoom_num = 1;
                    
                    target.find('#mediaControl > div').css({
                        'zoom': zoom_num
                    });
                    target.find('#mediaOverlay').css({
                        'zoom': zoom_num
                    });
                    self.box_mc.find('.playbtn-quality').css({
                        'zoom': zoom_num
                    });
                    
                    if(self.mediaControl.qualityControl != null && self.opt.alwaysQualityBtn) {
                        var n = 100;
                        var total_num = self.mediaControl.qualityControl.find('div').length;
                        $.each(self.mediaControl.qualityControl.find('div'), function(i, item) {
                            var t = Math.floor(100 / total_num);
                            if(i == total_num - 1) t = n;
                            $(item).css({'width': t + '%'});
                            n -= t;
                        });
                    }
                }
                
                
            }
        }

        // 기본셋팅
        this.defaultSetting = function () {
            if (window.attachEvent) {
                window.attachEvent("onresize", function () {
                    self.resize();
                });
            } else {
                window.addEventListener("resize", function () {
                    self.resize();
                });
            }
            self.me.resize(function () {
                self.resize();
            });
        };

        this.setError = function ($error) {
            var error_mc = self.box_mc.find('.videoErrorTxt');
            error_mc.find('p').html($error);
            error_mc.show();
            error_mc.find('p').css({
                'top': self.opt.height / 2 - error_mc.find('p').height() / 2
            });
            self.loading(false);
        };

        this.playerStatus = function () {

            if (arguments[0] !== "timeupdate") {
                log(arguments[0]);
            }
            switch (arguments[0]) {
            case "loading":
                if (this.opt.chromeless == "Y") {
                    self.loading(true);
                }
                self.timerStart();
                break;
            case "buffering":
                if (this.opt.chromeless == "Y") {
                    self.loading(true);
                }
                self.timerStop();
                break;
            case "play":
                    
                if (this.opt.chromeless == "Y") {
                    self.loading(false);
                }


                self.timerStart();
                break;
            case "stop":
            case "pause":
                if (this.opt.chromeless == "Y") {
                    self.loading(false);
                }
                self.timerStop();
                break;

            case "timeupdate":
                break;
            }

            try {
                if (dataChk(jQuery.cjvideoskin.mediaStatus)) {
                    jQuery.cjvideoskin.mediaStatus(arguments[0], arguments[1]);
                }
                self.returnStatus(arguments[0]);
            } catch (e) {
                //log(e);
            }
        };

        this.timerStart = function () {
            clearInterval(self.timer_ent);
            self.timer_ent = setInterval(function () {
                self.timerEnter();
            }, 100);
        };
        this.timerEnter = function () {
            try {
                var data = swfobject.getObjectById(self.id).getMediaInfo();
                self.playerStatus('timeupdate', data);
            } catch (e) {

            }

            //control.enterFrameFunc(data.nowTime);
        };
        this.timerStop = function () {
            clearInterval(self.timer_ent);
        };


        this.playToggle = function () {
            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).playToggle();
            } else {
                if (self.playing) {
                    self.media_mc.pause();
                } else {
                    self.media_mc.play();
                }
            }
        }
        
        this.getMediaInfo = function() {
            var obj = {}
            
            if (self.opt.isflash) {
                obj = swfobject.getObjectById(self.id).getMediaInfo();
            } else {
                obj = {
                    "nowTime":self.videoData.nowtime
                    ,"totalTime":self.videoData.totaltime
                }
            }
            
            return obj
        }

        this.play = function () {
            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).playToggle();
            } else {
                self.media_mc.play();
            }
        };

        this.stop = function () {
            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).Mstop();
            } else {
                self.media_mc.pause();
                self.playClose();
                self.playEnd();
            }
        };

        this.pause = function () {
            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).Mpause();
            } else {
                self.media_mc.pause();
            }
        };

        this.seek = function () {
            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).Mseek(arguments[0]);
            } else {
                if(self.opt.isyoutube){
                    cjvideoTmpPlayer.opt.youtube_mc.seekTo(arguments[0]);
                } else {
                    self.media_mc.currentTime = arguments[0];
                }
                
            }
        };

        this.seekPosition = function () {
            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).seekPosition(arguments[0]);
            } else {
                self.media_mc.currentTime = arguments[0] * self.videoData.totaltime;
            }
        };

        this.volume = function () {
            swfobject.getObjectById(self.id).volume(arguments[0]);
        };

        this.setMediaData = function () {
            self.mediaData = arguments[0];

            if (dataChk(jQuery.cjvideoskin.mediaDataLoadOk)) {
                jQuery.cjvideoskin.mediaDataLoadOk(arguments[0]);
            }
        };

        this.playlistOutlistAutoChange = function () {
            swfobject.getObjectById(self.id).playlistOutlistAutoChange(arguments[0]);
        };

        this.trackListChange = function () {

            var track_num = arguments[0];

            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).trackListChange(track_num);
            } else {
                self.opt.cdn = String(track_num).split('|')[1];
                self.opt.cover = String(track_num).split('|')[2];
                self.nextTrack(0);
            }
        };

        this.trackChange = function () {
            var track_num = arguments[0];

            if (self.opt.isflash) {
                swfobject.getObjectById(self.id).trackChange(track_num);
            } else {
                self.nextTrack(track_num);
            }

            log("track_num : " + track_num);
        };

        this.init = function () {
            self.version();
            self.makeVideo();
            self.defaultSetting();

            if (dataChk(jQuery.cjvideoskin.init)) {
                jQuery.cjvideoskin.init();
            }
        };

        self.init();



        //$('body').append('<div id="testdebug" style="position:absolute;top:0;left:0;background:#000;color:#fff;" />');
        //self.init();
    };

    //////////////////////

    var cjVideoArray = function (doms) {
        var self = this;
        this.length = 0;
        this.name = "cjvideoarray";

        this.each = function (fn) {
            var i = 0;
            for (var a = 0; a < self.length; a++) fn.call(self[a], i++);
            return self;
        };

        this.push = function (cv) {
            self[self.length] = cv;
            self.length++;
        };
        /**
         *
         * Remove a scrollbar from this array when it is destroyed
         * @param  { object } nice: the scrollbar to remove
         *
         */
        this.remove = function (cv) {
            self.each(function (i) {
                if (this.id === cv.id) {
                    delete self[i];
                    self.length--;
                }
            });
        };

        this.eq = function (idx) {
            return self[idx];
        };

        if (doms) {
            for (a = 0; a < doms.length; a++) {
                var cv = $.data(doms[a], '__cjvideo') || false;
                if (cv) {
                    this[this.length] = cv;
                    this.length++;
                }
            };
        }

        return this;
    };


    var loadJsonpCallback = function ($src, $type, $okF, $errorF) {
        log("@loadJsonpCallback : " + $src + " : " + $type);

        $get = "GET";
        $data = "";

        log("$data : " + $data + "/");

        $data = decodeURIComponent($data);

        log("$get : " + $get);
        log("$data : " + $data + "/");

        if ($type == "json" || $type == "jsonp") {
            jQuery.ajax({
                type: $get,
                data: $data,
                url: $src,
                xhrFields: {
                    withCredentials: true
                },
                dataType: $type,
                cache: false,
                jsonp: "callback",
                jsonpCallback: "parseRequest",
                success: function (data) {
                    $okF($type, data);
                },
                error: function (xhr, status, error) {
                    log("@json error : " + error);
                    $errorF($type, $errorF);
                }
            });
        }
    };


    var jscallback = function ($url, $type, onLoad, onError, $get, $data) {
        videoCallbackType = $type;
        videoCallback[videoCallbackType] = true;
        var url = $url + "?callback=parseRequest";
        log("#JS URL : " + url);
        var script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('language', 'javascript');
        var jscallload = document.getElementsByTagName('head')[0].appendChild(script);
        jscallload.onload = onLoad;
        jscallload.onerror = onError;
    }


    $.fn.make = function () {
        log(this);
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            //cv.init();
        });
    };

    $.fn.opt = function () {
        var obj = {}
        
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                obj = cv.opt;
            }
            
        });
        
        return obj
    };

    $.fn.playToggle = function () {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : playToggle");
                cv.playToggle();
            }
        });
    };

    $.fn.play = function () {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : Play");
                cv.play();
            }
        });
    };


    $.fn.mediaStop = function () {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : Stop");
                cv.stop();
            }
        });
    };

    $.fn.pause = function () {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : Pause");
                cv.pause();
            }
        });
    };

    $.fn.seek = function (opt, opt2) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : seek " + opt + " : " + opt2);
                cv.seek(opt, opt2);
            }
        });
    };

    $.fn.seekPosition = function () {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : seekPosition " + opt);
                cv.seekPosition(opt);
            }
        });
    };

    $.fn.volume = function (opt) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                log("Player : volume " + opt);
                cv.volume(opt);
            }
        });
    };

    $.fn.getMediaInfo = function () {
        var obj = {}
        
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                obj = cv.getMediaInfo();
            }
            
        });
        
        return obj
    };

    $.fn.trackChange = function ($num) {

        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            cv.trackChange($num);
        });
    };

    $.fn.trackListChange = function ($num) {

        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            cv.trackListChange($num);
        });
    };

    $.fn.trackRefresh = function (data, id) {

        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            swfobject.getObjectById(cv.id).trackRefresh(data, id);
        });
    };

    $.fn.mediaStatus = function (opt) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                cv.playerStatus(opt);
            }
        });
    };

    $.fn.mediaProgress = function (opt, obj) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                cv.playerStatus(opt, obj);
            }
        });
    };
    $.fn.setMediaData = function (opt) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                cv.setMediaData(opt);
            }
        });
    };
    $.fn.mediaResize = function (opt) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                cv.resize(opt);
            }
        });
    };
    $.fn.playlistOutlistAutoChange = function (opt) {
        this.each(function () {
            var cv = $.data(this, '__cjvideo') || false;
            if (cv) {
                cv.playlistOutlistAutoChange(opt);
            }
        });
    };

    $.fn.getNiceScroll = function (index) {
        if (typeof index == "undefined") {
            return new cjVideoArray(this);
        } else {
            var cv = $.data(this[index], '__cjvideo') || false;
            return cv;
        }
    };

    $.extend(jQuery.expr[':'], {
        cjvideo: function (a) {
            return ($.data(a, '__cjvideo')) ? true : false;
        }
    });

    $.fn.cjvideo = function (wrapper, opt) {
        if (typeof opt == "undefined") {
            if ((typeof wrapper == "object") && !("jquery" in wrapper)) {
                opt = wrapper;
                wrapper = false;
            }
        }

        // TODO clear this array
        var ret = new cjVideoArray();

        if (typeof opt == "undefined") opt = {};

        if (wrapper || false) {
            opt.doc = $(wrapper);
            opt.win = $(this);
        }
        var docundef = !("doc" in opt);
        if (!docundef && !("win" in opt)) opt.win = $(this);

        this.each(function () {
            var cv = $(this).data('__cjvideo') || false;
            if (!cv) {
                opt.doc = (docundef) ? $(this) : opt.doc;
                cv = new cjVideoClass(opt, $(this));
                $(this).data('__cjvideo', cv);
            }
            ret.push(cv);
        });
        return (ret.length == 1) ? ret[0] : ret;
    };

    window.cjVideo = {
        getjQuery: function () {
            return jQuery
        }
    };

    if (!$.cjvideo) {
        $.cjvideo = new cjVideoArray();
        $.cjvideo.options = _globaloptions;
    }

})(jQuery);

function Flash_mediaStatus() {
    //$(arguments[0][1]).mediaStatus();
    var target_mv = document['cjvideo_' + arguments[0][1]];
    target_mv.mediaStatus(arguments[0][0]);
}

function Flash_mediaProgress() {
    var target_mv = document['cjvideo_' + arguments[0][1]];
    //log(target_mv.mediaStatus('timeupdate', arguments[0][0]));
}

function Flash_mediaDataloadOK() {
    log("Flash_mediaDataloadOK");
    var target_mv = document['cjvideo_' + arguments[0][1]];
    target_mv.setMediaData(arguments[0][0]);
}


var videoCallbackType = "";
var videoCallback = [];
var videoCallPlayFn;

function parseRequest(response) {
    log("@callback Data type : " + response['data'][0]['type']);
    if (dataChk(videoCallPlayFn)) {
        videoCallPlayFn(response['data'][0]);
    }
}


var cjvideoTmpPlayer;
var player;

function cjemYTinfoLoadOk(data) {

    if (!dataChk(cjvideoTmpPlayer)) {
        return;
    }

    log(data)
        // 커버
    thumb = data.feed.entry[0].media$group.media$thumbnail;
    var larget_num = 0;
    var target_num = 0;
    for (var i in thumb) {
        if (larget_num <= thumb[i].width) {
            larget_num = thumb[i].width;
            target_num = i;
        }
    }
    cjvideoTmpPlayer.opt.cover = thumb[target_num].url;
    cjvideoTmpPlayer.info_obj.title = data.feed.entry[0].title.$t;
    cjvideoTmpPlayer.youtubeLoad();
}


function onYouTubePlayerAPIReady() {

    if (!dataChk(cjvideoTmpPlayer)) {
        return;
    }

    log("onYouTubePlayerAPIReady : " + cjvideoTmpPlayer.opt.youtube_id);
    
    var autoplay = 0;
    var controls = 0;
    var autohide = 1;
    var fs = 0;
    
    if(!videoData.isfullscreenbox) {
        controls = 1;
        fs = 1;
    }
    player = new YT.Player(cjvideoTmpPlayer.opt.youtube_box_id, {
        playerVars: {
            'autoplay': autoplay,
            'controls': controls,
            'autohide': autohide,
            'fs': fs
        },
        videoId: cjvideoTmpPlayer.opt.youtube_id,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }
    });

    log("~~");
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    log("onPlayerReady");
    if (!dataChk(cjvideoTmpPlayer)) {
        return;
    }

    var y_data = event.target.getVideoData();

    cjvideoTmpPlayer.opt.youtube_mc = event.target;
    //cjvideoTmpPlayer.opt.cover = thumb[target_num].url;
    //cjvideoTmpPlayer.info_obj.title = y_data.title;
    
    if(cjvideoTmpPlayer.opt.isConfigYoutube) {
        
        cjvideoTmpPlayer.htmlMake();
        
    } else {
        loadData('https://www.googleapis.com/youtube/v3/videos?part=snippet%20&mine=true&key=AIzaSyA35NDEKBJXS43xP1yuZOScpnCE3nZwA0U&id=' + cjvideoTmpPlayer.opt.youtube_id, 'jsonp', function () {

            log("유투브 오케이");
            try {
                var data = arguments[1];
                var yt_data = data.items[0].snippet;

                cjvideoTmpPlayer.info_obj.title = yt_data.title;

                var p = 0;
                for (var i in yt_data.thumbnails) {

                    if (p < yt_data.thumbnails[i].width) {
                        cjvideoTmpPlayer.opt.cover = yt_data.thumbnails[i].url;
                    }

                    p = yt_data.thumbnails[i].width;

                    if (i == "maxres") {
                        break;
                    }
                }
                cjvideoTmpPlayer.opt.cover = String(cjvideoTmpPlayer.opt.cover).replace("https://", "http://");

                //media_data.url.pageurl = yt_data.player["default"];
                //media_data.cdn

                log("유투브 커버 :  " + cjvideoTmpPlayer.opt.cover);

            } catch (e) {
                log(e);
            }
            cjvideoTmpPlayer.htmlMake();

        }, function () {

        });
    }

    


    //event.target.mute();
    //event.target.playVideo();
    //event.target.pauseVideo();
}

var onYoutubeTimeupdate = null;
var onYoutubeTimeRestart = null;

function onPlayerStateChange(event) {

    if (!dataChk(cjvideoTmpPlayer)) {
        return;
    }
    if (event.data == 1) {
        $('#' + cjvideoTmpPlayer.opt.youtube_box_id).css({
            'opacity': 1
        });
    }

    log("state : " + event.data);
    //-1 (unstarted)
    //0 (ended)
    //1 (playing)
    //2 (paused)
    //3 (buffering)
    //5 (video cued).

    clearInterval(onYoutubeTimeupdate);
    clearInterval(onYoutubeTimeRestart);

    switch (event.data) {
    case -1:
        cjvideoTmpPlayer.loading(true);
        cjvideoTmpPlayer.player_mc.hide();
        cjvideoTmpPlayer.btn_mc.hide();

        // 기본 광고 정보 로드
        /*
			if(dataChk(cjvideoTmpPlayer.opt.ad)){
				event.target.pauseVideo();
				cjvideoTmpPlayer.adAction();
				return;
			}
			//*/
        //event.target.pauseVideo();
        //setTimeout(function(){cjvideoTmpPlayer.opt.youtube_mc.playVideo();}, 1000);
        break;
    case 3:
    case 5:
        //cjvideoTmpPlayer.loading(true);
        break;
    case 1:
        cjvideoTmpPlayer.state({
            'type': 'playing'
        });
            
        cjvideoTmpPlayer.loading(false);
            
        onYoutubeTimeupdate = setInterval(function () {
            var obj = {};
            obj.nowTime = cjvideoTmpPlayer.opt.youtube_mc.getCurrentTime();
            obj.totalTime = cjvideoTmpPlayer.opt.youtube_mc.getDuration();

            cjvideoTmpPlayer.videoData.nowtime = obj.nowTime;
            cjvideoTmpPlayer.videoData.totaltime = obj.totalTime;

            cjvideoTmpPlayer.state({
                'type': 'timeupdate'
            });
            
        }, 500);
        break;
    case 2:
        cjvideoTmpPlayer.state({
            'type': 'pause'
        });
        break;
    case 0:
        cjvideoTmpPlayer.loading(false);
        cjvideoTmpPlayer.state({
            'type': 'ended'
        });
        break;
    }
    
}

function onPlayerError(event) {
    log(event.data);
}





var loadData = function ($src, $type, $okF, $errorF, $get, $data, $jsonCallback) {
    log("@Load : " + $src + " : " + $type);

    if ($get == undefined) {
        $get = "GET";
    }
    if ($data == undefined) {
        $data = "";
    }

    log("$data : " + $data + "/");

    $data = decodeURIComponent($data);

    log("$get : " + $get);
    log("$data : " + $data + "/");


    if ($type == "json" || $type == "jsonp") {
        var obj = {
            type: $get,
            data: $data,
            url: $src,
            //xhrFields : {withCredentials : true},
            dataType: $type,
            cache: false,
            success: function (data) {
                $okF($type, data);
            },
            error: function (xhr, status, error) {
                log("@json error : " + error);
                $errorF($type, $errorF);
            }
        }
        if (dataChk($jsonCallback)) {
            obj.jsonp = "callback";
            obj.jsonpCallback = $jsonCallback;
        }

        jQuery.ajax(obj);
    }
};

var loadAjax_arr = [];
var loadAjax_num = 0;
var musicInterval_num = 0;
var loadReturnFN_tmp = null;
var loadReturnFN_arr = [];
var loadvideoData = function ($src, $type, $okF, $errorF, $get, $data) {
    if ($get == undefined) {
        $get = "GET";
    }
    if ($data == undefined) {
        $data = "";
    }
    log("@Load : " + $src + " : " + $type);

    if (!videoData.isflash && $src.indexOf('user_info.asp') == -1 && videoData.isipad) {


        loadReturnFN_tmp = $okF;
        loadReturnFN_arr[musicInterval_num] = $okF;

        if ($src.indexOf('http://player.mnet.interest.me/common/proxy_json.asp?LoadURL=') == -1) {

            if ($src.indexOf('song_info') == -1) {

                $('body').append('<iframe id="tIframeload' + musicInterval_num + '" name="tIframeload' + musicInterval_num + '" frameborder="0" style="display:none;"></iframe>');
                $('#tIframeload' + musicInterval_num).attr('src', './aod_mobile_blank.asp?LoadURL=' + encodeURIComponent($src) + '&fn=musicInterval&num=' + musicInterval_num);
                musicInterval_num++;

            } else {
                var _src = String($src).replace("song_info", "song_info_ios");

                $('#tIframeInfo').remove();
                $('body').append('<iframe id="tIframeInfo" name="tIframeInfo" frameborder="0" style="display:none;"></iframe>');
                $('#tIframeInfo').attr('src', _src);
                $('#tIframeInfo').load(function (data) {
                    log("로드완료");
                    var aa = 'tIframeInfo';
                    $okF("json", JSON.parse(String(window.frames[aa].document.body.innerHTML)));
                });
            }

        } else {
            var _src = String($src).replace("http://player.mnet.interest.me/common/proxy_json.asp?LoadURL=", "./aod_mobile_blank.asp?&fn=musicInterval&num=" + musicInterval_num + "&LoadURL=");

            $('body').append('<iframe id="tIframeload' + musicInterval_num + '" name="tIframeload' + musicInterval_num + '" frameborder="0" style="display:none;"></iframe>');
            $('#tIframeload' + musicInterval_num).attr('src', _src);
            musicInterval_num++;
        }

    } else {

        loadAjax_arr[loadAjax_num] = $.ajax({
            type: $get,
            url: $src,
            data: $data,
            dataType: $type,
            cache: false,
            timeout: 10000,
            //xhrFields: { withCredentials: true },
            success: function (data) {
                $okF($type, data);
            },
            error: function (xhr, status, error) {
                log("@json error : " + error);
                if (error !== 'abort') {
                    $errorF($type, $errorF);
                }
            }
        });
        loadAjax_num++;
    }
    
};

var mediaControl = {
    timeConverting: function (dataNum, bool) { //시간 컨버팅
        if (!bool && bool == undefined) bool = true;
        var str = "";
        var ms = s = m = h = d = 0;

        var sectime = dataNum;
        var h = parseInt(sectime / 60 / 60);
        var m = parseInt((sectime - (3600 * h)) / 60);
        var s = parseInt(sectime - (3600 * h) - (m * 60));

        bool = false;
        if (bool) {
            var ms = String(dataNum).substr(String(dataNum).indexOf(".") + 1, 1);
            str = numSet(s) + "." + ms;
        } else {
            str = numSet(s);
        }
        str = numSet(m) + ":" + str;
        if(h > 0) {
            str = h + ":" + str;
        }
        
        return str;

        function numSet(Num) {
            if (Num < 10) {
                return "0" + Num;
            } else {
                return "" + Num;
            }
        }
        return str;
    }
}

var videoLog = {

    init_chk: false,
    tmp_id: null,
    start_chk: false,
    middle_chk: false,
    end_chk: false

    ,
    chk_arr: []

    ,
    init: function () {

    }

    ,
    reset: function () {
        this.chk_arr = {};
    }

    ,
    set: function ($target) {


        logTime_tmp_num = Math.round($target.videoData.nowtime);

        if (Math.floor($target.videoData.totaltime) < 10) {
            return;
        }

        try {
            $($target.videoData.info_data.log).each(function (i, item) {
                videoLog.engine($target, item);
            });
            $($target.videoData.info_data.log[0].tracking).each(function (i, item) {
                videoLog.engine($target, item, "tracking");
            });

        } catch (e) {
            // log(e);
        }

    }

    ,engine: function ($target, item, type) {
        
        var load_chk = false;
        if (item.time == "s" && logTime_tmp_num == 0) {
            if (!videoLog.chk_arr[item.time]) {
                log("");
                log("");
                log("");
                log("로그 : " + item.time + " : " + type);
                log("");
                log("");
                log("");
                load_chk = true;
            }
            videoLog.chk_arr[item.time] = true;
        }

        // 중간로그.
        if (item.time == "m" && logTime_tmp_num >= Math.floor($target.videoData.totaltime) / 2) {
            //if (self.videoData.login_chk && self.videoData.user_data.aodbilltype == "WSAg") {
            if (!videoLog.chk_arr[item.time]) {
                log("");
                log("");
                log("");
                log("로그 : " + item.time + " : " + type);
                log("");
                log("");
                log("");
                load_chk = true;
            }
            videoLog.chk_arr[item.time] = true;
            //}
        }

        if (item.time == "e" && logTime_tmp_num == Math.floor($target.videoData.totaltime) - 1) {
            if (!videoLog.chk_arr[item.time]) {
                log("");
                log("");
                log("");
                log("로그 : " + item.time + " : " + type);
                log("");
                log("");
                log("");
                load_chk = true;
            }
            videoLog.chk_arr[item.time] = true;
        }

        if (item.time !== "s" && item.time !== "m" && item.time !== "e" && logTime_tmp_num >= parseInt(item.time)) {
            if (!videoLog.chk_arr[item.time]) {
                log("");
                log("");
                log("");
                log("로그 : " + item.time + " : " + type);
                log("");
                log("");
                log("");
                load_chk = true;
                //videoLog.ppsEngine();
            }
            videoLog.chk_arr[item.time] = true;
        }

        if (load_chk) {

            if (type == "count") {
                item.url = item.data.og.url;
            }

            videoLog.logCall($target, item.url, type);

        }
    }

    ,
    logCall: function ($target, url_str, type_str) {

        var obj = "";
        if (type_str == "tracking") {
            loadvideoData(url_str, "jsonp", loadInfoOk, loadInfoError, "GET", obj);
        } else {
            obj += "stime=" + String(Math.round($target.videoData.nowtime));
            obj += "&ct=" + String(Math.round($target.videoData.nowtime));

            if(dataChk($target.videoData.user_data)) { 
                if (dataChk($target.videoData.user_data.aodstyped)) {
                    obj += "&aodstyped=" + $target.videoData.user_data.aodstyped;
                }
                if (dataChk($target.videoData.user_data.aodchargeno)) {
                    obj += "&aodchargeno=" + $target.videoData.user_data.aodchargeno;
                }
                if (dataChk($target.videoData.user_data.aodstype)) {
                    obj += "&aodstype=" + $target.videoData.user_data.aodstype;
                }
                if (dataChk($target.videoData.user_data.vodstyped)) {
                    obj += "&vodstyped=" + $target.videoData.user_data.vodstyped;
                }
            }

            //			loadvideoData(url_str, "html", loadInfoOk, loadInfoError, "POST", obj);
            loadvideoData(url_str, "jsonp", loadInfoOk, loadInfoError, "GET", obj);
        }
        log("로그 쏘기 : " + url_str + " : " + type_str);


        function loadInfoOk() {
            log("로그쏘기 완료 : " + type_str);
        }

        function loadInfoError() {
            log("로그쏘기 에 : " + type_str);
        }
    }

    ,
    adPreSkipApiCall: function ($target, $data, $outlink_chk) {
        //_this_progress_data.nowTime;

        if (!videoLog.chk_arr["adPreSkipApiCall"]) {
            if (dataChk($data.sec_api)) {
                if ($outlink_chk) {
                    if ($target.videoData.nowtime < 15) {
                        loadvideoData($data.sec_api + "&sec=" + $target.videoData.nowtime, "json", adViewApiCallOK, adViewApiCallError);
                    }
                } else {

                    loadvideoData($data.sec_api + "&sec=" + $target.videoData.nowtime, "json", adViewApiCallOK, adViewApiCallError);
                }
            }
        }
        videoLog.chk_arr["adPreSkipApiCall"] = true;

        function adViewApiCallOK(e) {
            log("adPreSkipApiCall OK");
        }

        function adViewApiCallError(e) {
            log("adPreSkipApiCall Error : " + e);
        }
    }

    ,adPreAllApiCall: function ($data) {
        if (!videoLog.chk_arr["adPreAllApiCall"]) {
            if (dataChk($data.view_api)) {
                loadvideoData($data.view_api, "json", adViewApiCallOK, adViewApiCallError);
            }
        }
        videoLog.chk_arr["adPreAllApiCall"] = true;

        function adViewApiCallOK(e) {
            log("adPreAllApiCall OK");
        }

        function adViewApiCallError(e) {
            log("adPreAllApiCall Error : " + e);
        }
    }

    ,adViewApiCall: function ($data) {
        if (!videoLog.chk_arr["adViewApiCall"]) {
            if (dataChk($data.imps_api)) {
                loadvideoData($data.imps_api, "json", adViewApiCallOK, adViewApiCallError);
            }
        }
        videoLog.chk_arr["adViewApiCall"] = true;

        function adViewApiCallOK(e) {
            log("adViewApiCallOK");
        }

        function adViewApiCallError(e) {
            log("adViewApiCallError : " + e);
        }
    }

    ,adClickApiCall: function ($target, $data) {
        if (!videoLog.chk_arr["adClickApiCall"]) {
            if (dataChk($data.click_api)) {
                loadvideoData($data.click_api + "&sec=" + $target.videoData.nowtime, "jsonp", adClickApiCallOK, adClickApiCallError);
            }
        }
        videoLog.chk_arr["adClickApiCall"] = true;

        function adClickApiCallOK(e) {
            log("adClickApiCallOK");
        }

        function adClickApiCallError(e) {
            log("adClickApiCallError : " + e);
        }
    }
    
    ,adVideoEntCheck_arr : []

    ,adVideoEntAPI : function($target) {
        var self = this;
        var this_data = null;
        var per_num = $target.videoData.nowtime / $target.videoData.totaltime;
        //var num = Math.round(_this_progress_data.totalTime);

        log(per_num);
        this_data = $target.videoData.ad_data;

        if (dataChk(this_data.charge_time)) {
            if (dataChk(this_data.charge_api)) {
                if ($target.videoData.nowtime > this_data.charge_time - 1) {
                    self.adVideoEntQuater("charge_time", this_data.charge_api);
                }
            }
        }
        
        if (per_num > 0) {
            self.adVideoEntQuater(0, this_data.start_api);
        }
        if (per_num > 0.25) {
            self.adVideoEntQuater(0.25, this_data.firstq_api);
        }
        if (per_num > 0.5) {
            self.adVideoEntQuater(0.5, this_data.midq_api);
        }
        if (per_num > 0.75) {
            self.adVideoEntQuater(0.75, this_data.thirdq_api);
        }
        if (per_num > 0.9) {
            self.adVideoEntQuater(0.9, this_data.end_api);
        }
    }

    ,adVideoEntQuater : function($per, $data) {
        var self = this;
    
        if (!self.adVideoEntCheck_arr["p_" + String($per)]) {
            if (dataChk($data)) {
                loadvideoData($data, "jsonp", adViewApiCallOK, adViewApiCallError);
            }
            self.adVideoEntCheck_arr["p_" + String($per)] = true;
        }

        function adViewApiCallOK(e) {
            log("adVideoEntAPI OK : " + e);
        }
        function adViewApiCallError(e) {
            log("adVideoEntAPI Error : " + e);
        }
    }
}




/*
필요한 스크립트를 아예 한방에 넣어버리자.....
*/

/*
플래시 휠 스크립트 관련
*/

// MAC
var isMac = false;

// PC
var isPC = false;

// FIREFOX or SAFARI
var isFF = false;

// INTERNET EXPLORER
var isIE = false;

// MAC or PC
if (navigator.appVersion.toLowerCase().indexOf("mac") != -1) {
    isMac = true;
} else {
    isPC = true;
}

// IE or FF
if (navigator.appName.indexOf("Microsoft") != -1) {
    isIE = true;
} else {
    isFF = true;
}

// MouseOver
var mousewheelFlashID;
var isOverFlash = "none";
var isOverFlashFn = "externalMouseEvent";

function flashWheelOver(str) {
    $('#' + self.videoData.opt.boxid).on('wheel', function (e) {
        e.preventDefault()
    });

    isOverFlashFn = str;
    isOverFlash = mousewheelFlashID;
}

function flashWheelOut() {
    $('#' + self.videoData.opt.boxid).off('wheel');
    isOverFlash = "none";
}
    // Mouse Wheel Init
function externalWheelEventInit() {

        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', externalWheelEvent, false);
        } else {
            window.onmousewheel = externalWheelEvent;
        }
        document.onmousewheel = externalWheelEvent;
    }
    // Mouse Wheel Event
function externalWheelEvent(event) {
    if (isOverFlash != "none") {
        var e;
        if (isMac) {
            e = event;
        } else {
            if (isFF) {
                e = event;
            } else {
                e = window.event;
            }
        }
        var delta = 0;
        if (e.wheelDelta) {
            delta = e.wheelDelta / 120;
        } else if (e.detail) {
            delta = -e.detail / 3;
        }

        (delta < 0) ? delta = -1: delta = 1;

        //		delta = Math.ceil(delta);

        log(delta);

        if (/AppleWebKit/.test(navigator.userAgent)) delta /= 3;
        if (delta) {
            try {
                swfobject.getObjectById(isOverFlash)[isOverFlashFn](delta);
            } catch (e) {

            }
        }
        //		if(e.preventDefault)e.preventDefault();
        //		e.returnValue=false;
    }
}


function flashDebugger() {
    var c = arguments[0][1];
    if (c == '#ffffff') c = '#000';
    log(arguments[0][0], 'background:#eee;color:' + c)
}

function dataChk() {
    a = arguments[0];
    if (typeof a == "undefined" || a == "" || a == null) {
        s = false;
    } else {
        s = true;
    }
    return s;
}

function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    } else if (navigator.appName == 'Netscape') {
        var ua = navigator.userAgent;
        var re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function getErrorObject() {
    try {
        throw Error('')
    } catch (err) {
        return err;
    }
}

function log($str, $css) {
//        return;
    try {
        //$('#testtesttest').html($str + "<br>" + $('#testtesttest').html());

        var err = getErrorObject();
        var caller_line = err.stack.split("\n")[4];
        var index = caller_line.indexOf("at ");
        var clean = caller_line.slice(index + 2, caller_line.length);
        clean = String(clean).split(":");

        if ($css) {
            console.log('%c' + $str + ' %c :' + clean[clean.length - 2], $css, 'color: #999;');
        } else {
            console.log('%c' + $str + ' %c :' + clean[clean.length - 2], '', 'color: #999;');
        }
        if (
            (typeof $str) == 'object' ||
            (typeof $str) == 'array'
        ) {
            console.log($str);
        } else {

        }
    } catch (e) {}
}

// swfobject
eval(function (p, a, c, k, e, r) {
    e = function (c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function (e) {
            return r[e]
        }];
        e = function () {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('5 1N=9(){5 w="2S",J="21",22="3A 2K",2J="2H.2H",1u="3o/x-3f-3e",28="37",29="34",C=2y,y=2Z,Y=2Y,1Z=F,1z=[2s],V=[],1v=[],1d=[],1m,1w,1G,2m,14=F,1x=F,Q,1R,2p=H,7=9(){5 b=A y.M!=w&&A y.13!=w&&A y.O!=w,u=Y.35.W(),p=Y.3Z.W(),2r=p?/C/.U(p):/C/.U(u),1e=p?/1e/.U(p):/1e/.U(u),1A=/1A/.U(u)?3t(u.1i(/^.*1A\\/(\\d+(\\.\\d+)?).*$/,"$1")):F,D=!+"\\3r",1h=[0,0,0],d=G;3(A Y.2i!=w&&A Y.2i[22]==J){d=Y.2i[22].3a;3(d&&!(A Y.2h!=w&&Y.2h[1u]&&!Y.2h[1u].36)){1Z=H;D=F;d=d.1i(/^.*\\s+(\\S+\\s+\\S+$)/,"$1");1h[0]=I(d.1i(/^(.*)\\..*$/,"$1"),10);1h[1]=I(d.1i(/^.*\\.(.*)\\s.*$/,"$1"),10);1h[2]=/[a-2w-Z]/.U(d)?I(d.1i(/^.*[a-2w-Z]+(.*)$/,"$1"),10):0}}z 3(A C.2z!=w){1M{5 a=3d 2z(2J);3(a){d=a.2a("$2D");3(d){D=H;d=d.18(" ")[1].18(",");1h=[I(d[0],10),I(d[1],10),I(d[2],10)]}}}1U(e){}}B{X:b,16:1h,T:1A,D:D,C:2r,1e:1e}}(),3L=9(){3(!7.X){B}3((A y.R!=w&&y.R=="25")||(A y.R==w&&(y.13("1E")[0]||y.1E))){1f()}3(!14){3(A y.1g!=w){y.1g("3g",1f,F)}3(7.D&&7.C){y.1I(29,9(){3(y.R=="25"){y.2O(29,1a.17);1f()}});3(C==32){(9(){3(14){B}1M{y.3s.38("33")}1U(e){1k(1a.17,0);B}1f()})()}}3(7.T){(9(){3(14){B}3(!/30|25/.U(y.R)){1k(1a.17,0);B}1f()})()}1S(1f)}}();9 1f(){3(14){B}1M{5 t=y.13("1E")[0].1j(O("3q"));t.N.1n(t)}1U(e){B}14=H;5 a=1z.K;E(5 i=0;i<a;i++){1z[i]()}}9 1P(a){3(14){a()}z{1z[1z.K]=a}}9 1S(a){3(A C.1g!=w){C.1g("2t",a,F)}z 3(A y.1g!=w){y.1g("2t",a,F)}z 3(A C.1I!=w){2R(C,"1t",a)}z 3(A C.1t=="9"){5 b=C.1t;C.1t=9(){b();a()}}z{C.1t=a}}9 2s(){3(1Z){2Q()}z{1C()}}9 2Q(){5 b=y.13("1E")[0];5 o=O(J);o.11("24",1u);5 t=b.1j(o);3(t){5 a=0;(9(){3(A t.2a!=w){5 d=t.2a("$2D");3(d){d=d.18(" ")[1].18(",");7.16=[I(d[0],10),I(d[1],10),I(d[2],10)]}}z 3(a<10){a++;1k(1a.17,10);B}b.1n(o);t=G;1C()})()}z{1C()}}9 1C(){5 a=V.K;3(a>0){E(5 i=0;i<a;i++){5 b=V[i].L;5 c=V[i].2F;5 d={1c:F,L:b};3(7.16[0]>0){5 e=M(b);3(e){3(1r(V[i].2A)&&!(7.T&&7.T<1Q)){15(b,H);3(c){d.1c=H;d.2b=1s(b);c(d)}}z 3(V[i].2d&&1J()){5 f={};f.1B=V[i].2d;f.19=e.12("19")||"0";f.1b=e.12("1b")||"0";3(e.12("1V")){f.2j=e.12("1V")}3(e.12("2k")){f.2k=e.12("2k")}5 g={};5 p=e.13("2l");5 h=p.K;E(5 j=0;j<h;j++){3(p[j].12("1T").W()!="2n"){g[p[j].12("1T")]=p[j].12("2o")}}1y(f,g,b,c)}z{2E(e);3(c){c(d)}}}}z{15(b,H);3(c){5 o=1s(b);3(o&&A o.2q!=w){d.1c=H;d.2b=o}c(d)}}}}}9 1s(a){5 r=G;5 o=M(a);3(o&&o.1H=="J"){3(A o.2q!=w){r=o}z{5 n=o.13(J)[0];3(n){r=n}}}B r}9 1J(){B!1x&&1r("6.0.3p")&&(7.C||7.1e)&&!(7.T&&7.T<1Q)}9 1y(a,b,c,d){1x=H;1G=d||G;2m={1c:F,L:c};5 e=M(c);3(e){3(e.1H=="J"){1m=1K(e);1w=G}z{1m=e;1w=c}a.L=28;3(A a.19==w||(!/%$/.U(a.19)&&I(a.19,10)<2u)){a.19="2u"}3(A a.1b==w||(!/%$/.U(a.1b)&&I(a.1b,10)<2v)){a.1b="2v"}y.2g=y.2g.3B(0,3C)+" - 2K 3F 3G";5 f=7.D&&7.C?"3I":"3K",2f="3O="+3Y(C.2e).2V().1i(/&/g,"%26")+"&2W="+f+"&2X="+y.2g;3(A b.1l!=w){b.1l+="&"+2f}z{b.1l=2f}3(7.D&&7.C&&e.R!=4){5 g=O("20");c+="31";g.11("L",c);e.N.2x(g,e);e.1o.1O="2c";(9(){3(e.R==4){e.N.1n(e)}z{1k(1a.17,10)}})()}1q(a,b,c)}}9 2E(a){3(7.D&&7.C&&a.R!=4){5 b=O("20");a.N.2x(b,a);b.N.1F(1K(a),b);a.1o.1O="2c";(9(){3(a.R==4){a.N.1n(a)}z{1k(1a.17,10)}})()}z{a.N.1F(1K(a),a)}}9 1K(a){5 b=O("20");3(7.C&&7.D){b.2B=a.2B}z{5 d=a.13(J)[0];3(d){5 c=d.39;3(c){5 e=c.K;E(5 i=0;i<e;i++){3(!(c[i].2C==1&&c[i].1H=="3b")&&!(c[i].2C==8)){b.1j(c[i].3c(H))}}}}}B b}9 1q(a,b,c){5 r,1p=M(c);3(7.T&&7.T<1Q){B r}3(1p){3(A a.L==w){a.L=c}3(7.D&&7.C){5 d="";E(5 i P a){3(a[i]!=1Y.1X[i]){3(i.W()=="1B"){b.2n=a[i]}z 3(i.W()=="2j"){d+=\' 1V="\'+a[i]+\'"\'}z 3(i.W()!="27"){d+=\' \'+i+\'="\'+a[i]+\'"\'}}}5 e="";E(5 j P b){3(b[j]!=1Y.1X[j]){e+=\'<2l 1T="\'+j+\'" 2o="\'+b[j]+\'" />\'}}1p.3h=\'<21 27="3i:3j-3k-3l-3m-3n"\'+d+\'>\'+e+\'</21>\';1v[1v.K]=a.L;r=M(a.L)}z{5 o=O(J);o.11("24",1u);E(5 m P a){3(a[m]!=1Y.1X[m]){3(m.W()=="2j"){o.11("1V",a[m])}z 3(m.W()!="27"){o.11(m,a[m])}}}E(5 n P b){3(b[n]!=1Y.1X[n]&&n.W()!="2n"){2G(o,n,b[n])}}1p.N.1F(o,1p);r=o}}B r}9 2G(a,b,c){5 p=O("2l");p.11("1T",b);p.11("2o",c);a.1j(p)}9 1D(a){5 b=M(a);3(b&&b.1H=="J"){3(7.D&&7.C){b.1o.1O="2c";(9(){3(b.R==4){2I(a)}z{1k(1a.17,10)}})()}z{b.N.1n(b)}}}9 2I(a){5 b=M(a);3(b){E(5 i P b){3(A b[i]=="9"){b[i]=G}}b.N.1n(b)}}9 M(a){5 b=G;1M{b=y.M(a)}1U(e){}B b}9 O(a){B y.O(a)}9 2R(a,b,c){a.1I(b,c);1d[1d.K]=[a,b,c]}9 1r(a){5 b=7.16,v=a.18(".");v[0]=I(v[0],10);v[1]=I(v[1],10)||0;v[2]=I(v[2],10)||0;B(b[0]>v[0]||(b[0]==v[0]&&b[1]>v[1])||(b[0]==v[0]&&b[1]==v[1]&&b[2]>=v[2]))?H:F}9 1W(a,b,c,d){3(7.D&&7.1e){B}5 h=y.13("3u")[0];3(!h){B}5 m=(c&&A c=="3v")?c:"3w";3(d){Q=G;1R=G}3(!Q||1R!=m){5 s=O("1o");s.11("24","3x/3y");s.11("3z",m);Q=h.1j(s);3(7.D&&7.C&&A y.1L!=w&&y.1L.K>0){Q=y.1L[y.1L.K-1]}1R=m}3(7.D&&7.C){3(Q&&A Q.2L==J){Q.2L(a,b)}}z{3(Q&&A y.2M!=w){Q.1j(y.2M(a+" {"+b+"}"))}}}9 15(a,b){3(!2p){B}5 v=b?"3D":"3E";3(14&&M(a)){M(a).1o.2N=v}z{1W("#"+a,"2N:"+v)}}9 23(s){5 a=/[\\\\\\"<>\\.;]/;5 b=a.3H(s)!=G;B b&&A 2P!=w?2P(s):s}5 x=9(){3(7.D&&7.C){2y.1I("3J",9(){5 a=1d.K;E(5 i=0;i<a;i++){1d[i][0].2O(1d[i][1],1d[i][2])}5 b=1v.K;E(5 j=0;j<b;j++){1D(1v[j])}E(5 k P 7){7[k]=G}7=G;E(5 l P 1N){1N[l]=G}1N=G})}}();B{3M:9(a,b,c,d){3(7.X&&a&&b){5 e={};e.L=a;e.2A=b;e.2d=c;e.2F=d;V[V.K]=e;15(a,F)}z 3(d){d({1c:F,L:a})}},1s:9(a){3(7.X){B 1s(a)}},3N:9(d,e,f,g,h,l,m,n,o,p){5 q={1c:F,L:e};3(7.X&&!(7.T&&7.T<1Q)&&d&&e&&f&&g&&h){15(e,F);1P(9(){f+="";g+="";5 a={};3(o&&A o===J){E(5 i P o){a[i]=o[i]}}a.1B=d;a.19=f;a.1b=g;5 b={};3(n&&A n===J){E(5 j P n){b[j]=n[j]}}3(m&&A m===J){E(5 k P m){3(A b.1l!=w){b.1l+="&"+k+"="+m[k]}z{b.1l=k+"="+m[k]}}}3(1r(h)){5 c=1q(a,b,e);3(a.L==e){15(e,H)}q.1c=H;q.2b=c}z 3(l&&1J()){a.1B=l;1y(a,b,e,p);B}z{15(e,H)}3(p){p(q)}})}z 3(p){p(q)}},3P:9(){2p=F},7:7,3Q:9(){B{3R:7.16[0],3S:7.16[1],3T:7.16[2]}},3U:1r,1q:9(a,b,c){3(7.X){B 1q(a,b,c)}z{B 2S}},1y:9(a,b,c,d){3(7.X&&1J()){1y(a,b,c,d)}},1D:9(a){3(7.X){1D(a)}},1W:9(a,b,c,d){3(7.X){1W(a,b,c,d)}},1P:1P,1S:1S,3V:9(a){5 q=y.2e.3W||y.2e.3X;3(q){3(/\\?/.U(q)){q=q.18("?")[1]}3(a==G){B 23(q)}5 b=q.18("&");E(5 i=0;i<b.K;i++){3(b[i].2T(0,b[i].2U("="))==a){B 23(b[i].2T((b[i].2U("=")+1)))}}}B""},40:9(){3(1x){5 a=M(28);3(a&&1m){a.N.1F(1m,a);3(1w){15(1w,H);3(7.D&&7.C){1m.1o.1O="41"}}3(1G){1G(2m)}}1x=F}}}}();', 62, 250, '|||if||var||ua||function|||||||||||||||||||||||||doc|else|typeof|return|win|ie|for|false|null|true|parseInt|OBJECT|length|id|getElementById|parentNode|createElement|in|dynamicStylesheet|readyState||wk|test|regObjArr|toLowerCase|w3|nav|||setAttribute|getAttribute|getElementsByTagName|isDomLoaded|setVisibility|pv|callee|split|width|arguments|height|success|listenersArr|mac|callDomLoadFunctions|addEventListener|playerVersion|replace|appendChild|setTimeout|flashvars|storedAltContent|removeChild|style|el|createSWF|hasPlayerVersion|getObjectById|onload|FLASH_MIME_TYPE|objIdArr|storedAltContentId|isExpressInstallActive|showExpressInstall|domLoadFnArr|webkit|data|matchVersions|removeSWF|body|replaceChild|storedCallbackFn|nodeName|attachEvent|canExpressInstall|abstractAltContent|styleSheets|try|swfobject|display|addDomLoadEvent|312|dynamicStylesheetMedia|addLoadEvent|name|catch|class|createCSS|prototype|Object|plugin|div|object|SHOCKWAVE_FLASH|urlEncodeIfNecessary|type|complete||classid|EXPRESS_INSTALL_ID|ON_READY_STATE_CHANGE|GetVariable|ref|none|expressInstall|location|fv|title|mimeTypes|plugins|styleclass|align|param|storedCallbackObj|movie|value|autoHideShow|SetVariable|windows|main|load|310|137|zA|insertBefore|window|ActiveXObject|swfVersion|innerHTML|nodeType|version|displayAltContent|callbackFn|createObjParam|ShockwaveFlash|removeObjectInIE|SHOCKWAVE_FLASH_AX|Flash|addRule|createTextNode|visibility|detachEvent|encodeURIComponent|testPlayerVersion|addListener|undefined|substring|indexOf|toString|MMplayerType|MMdoctitle|navigator|document|loaded|SWFObjectNew|top|left|onreadystatechange|userAgent|enabledPlugin|SWFObjectExprInst|doScroll|childNodes|description|PARAM|cloneNode|new|flash|shockwave|DOMContentLoaded|outerHTML|clsid|D27CDB6E|AE6D|11cf|96B8|444553540000|application|65|span|v1|documentElement|parseFloat|head|string|screen|text|css|media|Shockwave|slice|47|visible|hidden|Player|Installation|exec|ActiveX|onunload|PlugIn|onDomLoad|registerObject|embedSWF|MMredirectURL|switchOffAutoHideShow|getFlashPlayerVersion|major|minor|release|hasFlashPlayerVersion|getQueryParamValue|search|hash|encodeURI|platform|expressInstallCallback|block'.split('|'), 0, {}));

// loading
! function (e, t, n) {
    function o(e, n) {
        var r = t.createElement(e || "div"),
            i;
        for (i in n) r[i] = n[i];
        return r
    }

    function u(e) {
        for (var t = 1, n = arguments.length; t < n; t++) e.appendChild(arguments[t]);
        return e
    }

    function f(e, t, n, r) {
        var o = ["opacity", t, ~~(e * 100), n, r].join("-"),
            u = .01 + n / r * 100,
            f = Math.max(1 - (1 - e) / t * (100 - u), e),
            l = s.substring(0, s.indexOf("Animation")).toLowerCase(),
            c = l && "-" + l + "-" || "";
        return i[o] || (a.insertRule("@" + c + "keyframes " + o + "{" + "0%{opacity:" + f + "}" + u + "%{opacity:" + e + "}" + (u + .01) + "%{opacity:1}" + (u + t) % 100 + "%{opacity:" + e + "}" + "100%{opacity:" + f + "}" + "}", a.cssRules.length), i[o] = 1), o
    }

    function l(e, t) {
        var i = e.style,
            s, o;
        if (i[t] !== n) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (o = 0; o < r.length; o++) {
            s = r[o] + t;
            if (i[s] !== n) return s
        }
    }

    function c(e, t) {
        for (var n in t) e.style[l(e, n) || n] = t[n];
        return e
    }

    function h(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var i in r) e[i] === n && (e[i] = r[i])
        }
        return e
    }

    function p(e) {
        var t = {
            x: e.offsetLeft,
            y: e.offsetTop
        };
        while (e = e.offsetParent) t.x += e.offsetLeft, t.y += e.offsetTop;
        return t
    }
    var r = ["webkit", "Moz", "ms", "O"],
        i = {},
        s, a = function () {
            var e = o("style", {
                type: "text/css"
            });
            return u(t.getElementsByTagName("head")[0], e), e.sheet || e.styleSheet
        }(),
        d = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            corners: 1,
            color: "#000",
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "auto",
            left: "auto",
            position: "relative"
        },
        v = function m(e) {
            if (!this.spin) return new m(e);
            this.opts = h(e || {}, m.defaults, d)
        };
    v.defaults = {}, h(v.prototype, {
            spin: function (e) {
                this.stop();
                var t = this,
                    n = t.opts,
                    r = t.el = c(o(0, {
                        className: n.className
                    }), {
                        position: n.position,
                        width: 0,
                        zIndex: n.zIndex
                    }),
                    i = n.radius + n.length + n.width,
                    u, a;
                e && (e.insertBefore(r, e.firstChild || null), a = p(e), u = p(r), c(r, {
                    left: (n.left == "auto" ? a.x - u.x + (e.offsetWidth >> 1) : parseInt(n.left, 10) + i) + "px",
                    top: (n.top == "auto" ? a.y - u.y + (e.offsetHeight >> 1) : parseInt(n.top, 10) + i) + "px"
                })), r.setAttribute("aria-role", "progressbar"), t.lines(r, t.opts);
                if (!s) {
                    var f = 0,
                        l = n.fps,
                        h = l / n.speed,
                        d = (1 - n.opacity) / (h * n.trail / 100),
                        v = h / n.lines;
                    (function m() {
                        f++;
                        for (var e = n.lines; e; e--) {
                            var i = Math.max(1 - (f + e * v) % h * d, n.opacity);
                            t.opacity(r, n.lines - e, i, n)
                        }
                        t.timeout = t.el && setTimeout(m, ~~(1e3 / l))
                    })()
                }
                return t
            },
            stop: function () {
                var e = this.el;
                return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = n), this
            },
            lines: function (e, t) {
                function i(e, r) {
                    return c(o(), {
                        position: "absolute",
                        width: t.length + t.width + "px",
                        height: t.width + "px",
                        background: e,
                        boxShadow: r,
                        transformOrigin: "left",
                        transform: "rotate(" + ~~(360 / t.lines * n + t.rotate) + "deg) translate(" + t.radius + "px" + ",0)",
                        borderRadius: (t.corners * t.width >> 1) + "px"
                    })
                }
                var n = 0,
                    r;
                for (; n < t.lines; n++) r = c(o(), {
                    position: "absolute",
                    top: 1 + ~(t.width / 2) + "px",
                    transform: t.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: t.opacity,
                    animation: s && f(t.opacity, t.trail, n, t.lines) + " " + 1 / t.speed + "s linear infinite"
                }), t.shadow && u(r, c(i("#000", "0 0 4px #000"), {
                    top: "2px"
                })), u(e, u(r, i(t.color, "0 0 1px rgba(0,0,0,.1)")));
                return e
            },
            opacity: function (e, t, n) {
                t < e.childNodes.length && (e.childNodes[t].style.opacity = n)
            }
        }),
        function () {
            function e(e, t) {
                return o("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
            }
            var t = c(o("group"), {
                behavior: "url(#default#VML)"
            });
            !l(t, "transform") && t.adj ? (a.addRule(".spin-vml", "behavior:url(#default#VML)"), v.prototype.lines = function (t, n) {
                function s() {
                    return c(e("group", {
                        coordsize: i + " " + i,
                        coordorigin: -r + " " + -r
                    }), {
                        width: i,
                        height: i
                    })
                }

                function l(t, i, o) {
                    u(a, u(c(s(), {
                        rotation: 360 / n.lines * t + "deg",
                        left: ~~i
                    }), u(c(e("roundrect", {
                        arcsize: n.corners
                    }), {
                        width: r,
                        height: n.width,
                        left: n.radius,
                        top: -n.width >> 1,
                        filter: o
                    }), e("fill", {
                        color: n.color,
                        opacity: n.opacity
                    }), e("stroke", {
                        opacity: 0
                    }))))
                }
                var r = n.length + n.width,
                    i = 2 * r,
                    o = -(n.width + n.length) * 2 + "px",
                    a = c(s(), {
                        position: "absolute",
                        top: o,
                        left: o
                    }),
                    f;
                if (n.shadow)
                    for (f = 1; f <= n.lines; f++) l(f, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                for (f = 1; f <= n.lines; f++) l(f);
                return u(t, a)
            }, v.prototype.opacity = function (e, t, n, r) {
                var i = e.firstChild;
                r = r.shadow && r.lines || 0, i && t + r < i.childNodes.length && (i = i.childNodes[t + r], i = i && i.firstChild, i = i && i.firstChild, i && (i.opacity = n))
            }) : s = l(t, "animation")
        }(), typeof define == "function" && define.amd ? define(function () {
            return v
        }) : e.Spinner = v
}(window, document);

//resize
//browser detect
var browser = (function () {
    var s = navigator.userAgent.toLowerCase();
    var match = /(webkit)[ \/](\w.]+)/.exec(s) ||
        /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
        /(msie) ([\w.]+)/.exec(s) ||
        /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) || [];
    return {
        name: match[1] || "",
        version: match[2] || "0"
    };
}());

(function ($) {
    $.fn.ResizeImage = function (params) {
        var pp = params;
        var crop = 0,
            obj, initchk = false,
            params, loadchk, aspectRatio = 0,
            setWidth = $(this).data('setWidth'),
            setHeight = $(this).data('setHeight'),
            isIE6 = browser.msie && (6 == ~~browser.version);
        if (typeof setWidth == 'undefined') setWidth = 0;
        if (typeof setHeight == 'undefined') setHeight = 0;
        if (!params.height && !params.width) {
            return this
        }
        if (params.height && params.width) {
            aspectRatio = params.width / params.height;
            obj = this.get(0);
            initchk = $(this).data('initchk');
            crop = $(this).data('crop');
            loadchk = $(this).data('loadchk');
            if (params.crop && !initchk) {
                $(this).data({
                    'initchk': true,
                    'crop': true
                });
                $(this).wrap('<div />');
                crop = true
            }
            if (loadchk) {
                resize()
            }
            this.init()
        }

        function resize() {
            obj.removeAttribute("height");
            obj.removeAttribute("width");
            obj.style.height = obj.style.width = "";
            var imgHeight = setHeight,
                imgWidth = setWidth,
                imgAspectRatio = imgWidth / imgHeight,
                bxHeight = params.height,
                bxWidth = params.width,
                bxAspectRatio = aspectRatio;
            if (!bxAspectRatio) {
                if (bxHeight) {
                    bxAspectRatio = imgAspectRatio + 1
                } else {
                    bxAspectRatio = imgAspectRatio - 1
                }
            }
            if (crop) {
                $(obj.parentNode).css({
                    'width': params.width,
                    'height': params.height,
                    'overflow': 'hidden',
                    'position': 'relative',
                    'margin': '0 auto'
                })
            }
            if (imgAspectRatio > bxAspectRatio) {
                if (crop) {
                    bxWidth = ~~(imgWidth / imgHeight * bxHeight);
                    $(obj).css({
                        'position': 'absolute',
                        'top': 0,
                        'left': -(bxWidth - params.width) / 2
                    })
                } else {
                    bxHeight = ~~(imgHeight / imgWidth * bxWidth)
                }
            } else {
                if (crop) {
                    bxHeight = ~~(imgHeight / imgWidth * bxWidth);
                    $(obj).css({
                        'position': 'absolute',
                        'top': -(bxHeight - params.height) / 2,
                        'left': 0
                    })
                } else {
                    bxWidth = ~~(imgWidth / imgHeight * bxHeight)
                }
            }
            obj.height = bxHeight;
            obj.width = bxWidth;
            $(obj).css({
                'max-width': bxWidth,
                'width': bxWidth,
                'height': bxHeight
            });

            if (getInternetExplorerVersion() == 7) {
                $(obj).css({
                    'max-width': bxWidth,
                    'width': 0,
                    'height': 0
                });
                setTimeout(function () {
                    $(obj).css({
                        'max-width': bxWidth,
                        'width': bxWidth,
                        'height': bxHeight
                    });
                }, 1);
            }
        }
        return $(this).load(function () {
            if (!$(this).data('loadchk') && this.width > 0) {
                obj = this;


                $(this).data({
                    'loadchk': true,
                    'setWidth': obj.width,
                    'setHeight': obj.height
                });

                setWidth = $(this).data('setWidth');
                setHeight = $(this).data('setHeight');
                resize();


                if (typeof pp.callback != 'undefined') {
                    pp.callback();
                }
            };
        }).each(function () {
            if (this.complete || isIE6) {
                $(this).trigger("load");
            }
            this.src = this.src;
        })
    }
})(jQuery);

(function ($) {
    var attachEvent = document.attachEvent,
        stylesCreated = false;

    var jQuery_resize = $.fn.resize;

    $.fn.resize = function (callback) {
        return this.each(function () {
            if (this == window)
                jQuery_resize.call(jQuery(this), callback);
            else
                addResizeListener(this, callback);
        });
    }

    $.fn.removeResize = function (callback) {
        return this.each(function () {
            removeResizeListener(this, callback);
        });
    }

    if (!attachEvent) {
        var requestFrame = (function () {
            var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
                function (fn) {
                    return window.setTimeout(fn, 20);
                };
            return function (fn) {
                return raf(fn);
            };
        })();

        var cancelFrame = (function () {
            var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
                window.clearTimeout;
            return function (id) {
                return cancel(id);
            };
        })();

        function resetTriggers(element) {
            var triggers = element.__resizeTriggers__,
                expand = triggers.firstElementChild,
                contract = triggers.lastElementChild,
                expandChild = expand.firstElementChild;
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + 'px';
            expandChild.style.height = expand.offsetHeight + 1 + 'px';
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
        };

        function checkTriggers(element) {
            return element.offsetWidth != element.__resizeLast__.width ||
                element.offsetHeight != element.__resizeLast__.height;
        }

        function scrollListener(e) {
            var element = this;
            resetTriggers(this);
            if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
            this.__resizeRAF__ = requestFrame(function () {
                if (checkTriggers(element)) {
                    element.__resizeLast__.width = element.offsetWidth;
                    element.__resizeLast__.height = element.offsetHeight;
                    element.__resizeListeners__.forEach(function (fn) {
                        fn.call(element, e);
                    });
                }
            });
        };
    }

    function createStyles() {
        if (!stylesCreated) {
            var css = '.resize-triggers { visibility: hidden; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: hidden; } .contract-trigger:before { width: 200%; height: 200%; }',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);
        }
    }

    window.addResizeListener = function (element, fn) {
        if (attachEvent) element.attachEvent('onresize', fn);
        else {
            if (!element.__resizeTriggers__) {
                if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
                createStyles();
                element.__resizeLast__ = {};
                element.__resizeListeners__ = [];
                (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
                element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
                    '<div class="contract-trigger"></div>';
                element.appendChild(element.__resizeTriggers__);
                resetTriggers(element);
                element.addEventListener('scroll', scrollListener, true);
            }
            element.__resizeListeners__.push(fn);
        }
    };

    window.removeResizeListener = function (element, fn) {
        if (attachEvent) element.detachEvent('onresize', fn);
        else {
            element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
            if (!element.__resizeListeners__.length) {
                element.removeEventListener('scroll', scrollListener);
                element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
            }
        }
    }
}(jQuery));

/**
 * jQuery.getCSS plugin
 * http://github.com/furf/jquery-getCSS
 *
 * Copyright 2010, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Inspired by Julian Aubourg's Dominoes
 * http://code.google.com/p/javascript-dominoes/
 */
(function (f, b, g) {
    var d = b.getElementsByTagName("head")[0],
        a = /loaded|complete/,
        e = {},
        c = 0,
        h;
    g.getCSS = function (j, i, l) {
        if (g.isFunction(i)) {
            l = i;
            i = {};
        }
        var k = b.createElement("link");
        k.rel = "stylesheet";
        k.type = "text/css";
        k.media = i.media || "screen";
        k.href = j;
        if (i.charset) {
            k.charset = i.charset;
        }
        if (i.title) {
            l = (function (m) {
                return function () {
                    k.title = i.title;
                    m(k, "success");
                };
            })(l);
        }
        if (k.readyState) {
            k.onreadystatechange = function () {
                if (a.test(k.readyState)) {
                    k.onreadystatechange = null;
                    l(k, "success");
                }
            };
        } else {
            if (k.onload === null && k.all) {
                k.onload = function () {
                    k.onload = null;
                    l(k, "success");
                };
            } else {
                e[k.href] = function () {
                    l(k, "success");
                };
                if (!c++) {
                    h = f.setInterval(function () {
                        var r, o, q = b.styleSheets,
                            m, n = q.length;
                        while (n--) {
                            o = q[n];
                            if ((m = o.href) && (r = e[m])) {
                                try {
                                    r.r = o.cssRules;
                                    throw "SECURITY";
                                } catch (p) {
                                    if (/SECURITY/.test(p)) {
                                        r(k, "success");
                                        delete e[m];
                                        if (!--c) {
                                            h = f.clearInterval(h);
                                        }
                                    }
                                }
                            }
                        }
                    }, 13);
                }
            }
        }
        d.appendChild(k);
    };
})(this, this.document, this.jQuery);

// JSON String
(function ($) {
    'use strict';
    var d = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        hasOwn = Object.prototype.hasOwnProperty;
    $.toJSON = typeof JSON === 'object' && JSON.stringify ? JSON.stringify : function (o) {
        if (o === null) {
            return 'null'
        }
        var a, k, name, val, type = $.type(o);
        if (type === 'undefined') {
            return undefined
        }
        if (type === 'number' || type === 'boolean') {
            return String(o)
        }
        if (type === 'string') {
            return $.quoteString(o)
        }
        if (typeof o.toJSON === 'function') {
            return $.toJSON(o.toJSON())
        }
        if (type === 'date') {
            var b = o.getUTCMonth() + 1,
                day = o.getUTCDate(),
                year = o.getUTCFullYear(),
                hours = o.getUTCHours(),
                minutes = o.getUTCMinutes(),
                seconds = o.getUTCSeconds(),
                milli = o.getUTCMilliseconds();
            if (b < 10) {
                b = '0' + b
            }
            if (day < 10) {
                day = '0' + day
            }
            if (hours < 10) {
                hours = '0' + hours
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            if (seconds < 10) {
                seconds = '0' + seconds
            }
            if (milli < 100) {
                milli = '0' + milli
            }
            if (milli < 10) {
                milli = '0' + milli
            }
            return '"' + year + '-' + b + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"'
        }
        a = [];
        if ($.isArray(o)) {
            for (k = 0; k < o.length; k++) {
                a.push($.toJSON(o[k]) || 'null')
            }
            return '[' + a.join(',') + ']'
        }
        if (typeof o === 'object') {
            for (k in o) {
                if (hasOwn.call(o, k)) {
                    type = typeof k;
                    if (type === 'number') {
                        name = '"' + k + '"'
                    } else if (type === 'string') {
                        name = $.quoteString(k)
                    } else {
                        continue
                    }
                    type = typeof o[k];
                    if (type !== 'function' && type !== 'undefined') {
                        val = $.toJSON(o[k]);
                        a.push(name + ':' + val)
                    }
                }
            }
            return '{' + a.join(',') + '}'
        }
    };
    $.evalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (a) {
        return eval('(' + a + ')')
    };
    $.secureEvalJSON = typeof JSON === 'object' && JSON.parse ? JSON.parse : function (a) {
        var b = a.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        if (/^[\],:{}\s]*$/.test(b)) {
            return eval('(' + a + ')')
        }
        throw new SyntaxError('Error parsing JSON, source is not valid.');
    };
    $.quoteString = function (b) {
        if (b.match(d)) {
            return '"' + b.replace(d, function (a) {
                var c = meta[a];
                if (typeof c === 'string') {
                    return c
                }
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
            }) + '"'
        }
        return '"' + b + '"'
    }
}(jQuery));