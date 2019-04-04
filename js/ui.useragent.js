// JavaScript Document
(function(){
	window.agent = {
		device:null,						// 'pc','smartphone','tablet'
		os:null,
		osversion:null,
		devicecompany:null,
		devicename:null,
		browsername:null,
		browserversion:null,
		
		userAgent:navigator.userAgent,
		target:null,
		IS_TOUCH_DEVICE:null,
		_bind:function() {
			var tempArrDate, tempDate;
			this._default();			// 초기설정
		},
		// 초기설정
		_default:function() {
			this._deviceList();		// Device 분류
			this._osList();				// OS 분류
			
			$(function() {
				agent.target = $('body');
				agent._targetWrite();		// 기록
			});
		},
		// 기록
		_targetWrite:function() {
			var scope = this;
 			this.IS_TOUCH_DEVICE = !!( 'ontouchstart' in window );
			
			if ( this.IS_TOUCH_DEVICE ) {
				this.target.addClass('ui-touchevent');
			}
			
			if ( this.device == 'pc' ) {
				this.target.addClass('ui-pc');
				if ( this.browsername == 'Chrome' ) {
					this.target.addClass('ui-browser-chrome');
					this.target.removeClass('ui-touchevent');
				} else if ( this.browsername == 'Firefox' ) {
					this.target.addClass('ui-browser-firefox');
				} else 	if ( this.browsername == 'Interest Explorer' ) {
					this.target.addClass('ui-browser-ie');
					this.target.addClass('ui-browser-ie-'+parseInt(this.browserversion));
				}
			} else {
				if ( $(window).width() >= 768 ) {
					this.target.addClass('ui-tablet');
					if ( this.os == 'iOS' ) {
						this.target.addClass('ui-tablet-ios');
					} else if ( this.os == 'Android' ) {
						this.target.addClass('ui-tablet-android');
					}
				} else {
					this.target.addClass('ui-smartphone');
					if ( this.os == 'iOS' ) {
						this.target.addClass('ui-smartphone-ios');
					} else if ( this.os == 'Android' ) {
						this.target.addClass('ui-smartphone-android');
						
						if ( this.devicename.search('LG-F310') == 0 ) {
							this.target.addClass('ui-smartphone-android-LG-F310');
						}
					}
				}
				
				function useragentLandscape() {
					var tempWidth = $(window).width();
					var tempHeight = $(window).height();
				
					if ( tempWidth <= tempHeight ) {
						scope.target.addClass('ui-portrait').removeClass('ui-landscape');
					} else {
						scope.target.removeClass('ui-portrait').addClass('ui-landscape');
					}
				}
				
				$(window).bind('resize.mobileUserAgentLandscape',useragentLandscape);
				
				useragentLandscape();
			}
		},
		// Device 분류
		_deviceList:function() {
			if ( /(iPad)/gi.exec(this.userAgent) ) {
				this.device = "tablet";
			} else if ( /(Mobile)|(iPhone)|(Android)/gi.exec(this.userAgent) ) {
				this.device = "smartphone";
			} else {
				this.device = "pc";
			}
		},
		// OS 분류
		_osList:function() {
			if ( agent.device == "tablet" || agent.device == "smartphone" ) {
				// iOS
				if ( /(iPhone)|(iPad)/gi.exec(this.userAgent) ) {
					this.os = "iOS";
					this.osversion = this.userAgent.substring(this.userAgent.indexOf('OS')+3,this.userAgent.indexOf('like')-1).replace(/_/gi,'.');
					
					this.devicecompany = "Apple";
					if ( /(iPhone)/gi.exec(this.userAgent) ) {
						this.devicename = "iPhone";
					} else if ( /(iPad)/gi.exec(this.userAgent) ) {
						this.devicename = "iPad";
					}
				// Android 
				} else if ( /(Android)/gi.exec(this.userAgent) ) {
					this.os = "Android";
					tempDate = this.userAgent.substring(this.userAgent.indexOf('(')+1,this.userAgent.indexOf(')'));
					tempDate = tempDate.substring(tempDate.indexOf('Android')+8);
					tempArrDate = tempDate.split(';');
					this.osversion = tempArrDate[0];
					this.devicecompany = "";
					this.devicename = tempArrDate[tempArrDate.length-1].substring(1,tempArrDate[tempArrDate.length-1].indexOf('Build')-1);
				// Windows Phone
				} else if ( /(Windows Phone)/gi.exec(this.userAgent) ) {
					this.os = "Windows Phone";
					tempDate = this.userAgent.substring(this.userAgent.indexOf('(')+1,this.userAgent.indexOf(')'));
					tempArrDate = tempDate.split(';');
					this.osversion = tempArrDate[2].replace("Windows Phone OS ","").replace("Windows Phone ","");
					
					if ( tempArrDate.length >= 7 ) {
						this.devicecompany = tempArrDate[tempArrDate.length-2];
						this.devicename = tempArrDate[tempArrDate.length-1];
					} else {
						this.devicecompany = this.devicename = "";
					}
				// Firefox OS
				} else if ( /(Mobile)/gi.exec(this.userAgent) && /(Firefox)/gi.exec(this.userAgent) ) {
					this.os = "Firefox OS";
					this.osversion = "";
					
					this.devicecompany = "";
					this.devicename = "";
				}
			} else if ( agent.device == "pc" ){
				// Windows
				if ( /(Windows)|(WinNT)|(Win98)|(Win95)|(Win16)/gi.exec(this.userAgent) ) {
					if ( /(Windows NT 6.2)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "8";
					} else if ( /(Windows NT 6.1)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "7";
					} else if ( /(Windows NT 6.0)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "Vista";
					} else if ( /(Windows NT 5.2)/gi.exec(this.userAgent) ) {
						this.os = "Windows Server";
						this.osversion = "2003";
					} else if ( /(Windows NT 5.1)|(Windows XP)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "XP";
					} else if ( /(Windows NT 5.0)|(Windows 2000)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "2000";
					} else if ( /(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)/gi.exec(this.userAgent) ) {
						this.os = "Windows NT";
						this.osversion = "4.0";
					} else if ( /(Windows ME)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "ME";
					} else if ( /(Windows 98)|(Win98)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "98";
					} else if ( /(Windows 95)|(Win95)|(Windows_95)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "95";
					} else if ( /(Win16)/gi.exec(this.userAgent) ) {
						this.os = "Windows";
						this.osversion = "3.11";
					}
				} else if ( /(Linux)/gi.exec(this.userAgent) ) {
					this.os = "Linux";
					this.osversion = "";
				} else if ( /(SunOS)/gi.exec(this.userAgent) ) {
					this.os = "Sun OS";
					this.osversion = "";
				} else if ( /(OpenBSD)/gi.exec(this.userAgent) ) {
					this.os = "Open BSD";
					this.osversion = "";
				} else if ( /(Mac_PowerPC)|(Macintosh)/gi.exec(this.userAgent) ) {
					this.os = "Mac OS";
					this.osversion = "";
					
					if ( /(Mac OS X)/gi.exec(this.userAgent) ) {
						tempDate = this.userAgent.substring(this.userAgent.indexOf('(')+1,this.userAgent.indexOf(')'));
						tempDate = tempDate.substring(tempDate.indexOf('Android')+8);
						tempArrDate = tempDate.split(';');
						tempDate = tempArrDate[1];
						tempDate = tempDate.substring(tempDate.indexOf('Mac OS X')+9).replace(/_/gi,'.');
						this.osversion = tempDate;
					}
				}
				
				// OS
				tempArrDate = this.userAgent.split(' ');
				if ( /(Opera)/gi.exec(this.userAgent) ) {	// Opera
					this.browsername = "Opera";
					if ( /^(Mozilla)/gi.exec(this.userAgent) ) {
						if ( /(Opera)/gi.exec(tempArrDate[tempArrDate.length-1]) ) {
							this.browserversion = tempArrDate[tempArrDate.length-1].split('/')[1];
						} else {
							this.browserversion = tempArrDate[tempArrDate.length-1];
						}
					} else {
						tempArrDate= this.userAgent.split('/');
						this.browserversion = tempArrDate[tempArrDate.length-1];
					}
				} else if ( /(Chrome)/gi.exec(this.userAgent) ) {	// Chrome
					this.browsername = "Chrome";
					this.browserversion = tempArrDate[tempArrDate.length-2].split('/')[1];
				} else if ( /(Firefox)/gi.exec(this.userAgent) ) {	// Firefox
					this.browsername = "Firefox";
					this.browserversion = tempArrDate[tempArrDate.length-1].split('/')[1];
				} else if ( /(Safari)/gi.exec(this.userAgent) ) {	// Safari
					this.browsername = "Safari";
					this.browserversion = tempArrDate[tempArrDate.length-2].split('/')[1];
				} else if ( /(MSIE)/gi.exec(this.userAgent) ) {	// Interest Explorer
					this.browsername = "Interest Explorer";
					tempDate = this.userAgent.substring(this.userAgent.indexOf('MSIE'));
					this.browserversion = tempDate.substring(0,tempDate.indexOf(';')).split(' ')[1];
				}
			}
		}
	}
})();

agent._bind();		// Agent Check

var IS_TOUCH_DEVICE = !!( 'ontouchstart' in window );
var isCSS3Apply = false;
var isOrientationApply = false;

// CSS3 적용여부
if ( agent.device == 'smartphone' || agent.device == 'tablet' ) {
	/* if ( agent.os == 'iOS' || (agent.os == 'Android' && parseFloat(agent.osversion) >= 4.2) ) { */
	if ( agent.os == 'iOS' || (agent.os == 'Android' && parseFloat(agent.osversion) >= 4) ) {
		isCSS3Apply = true;
	}
/* } else if ( agent.device == 'pc' && (agent.browsername == 'Chrome' || agent.browsername == 'Firefox') ) { */
} else if ( agent.device == 'pc' && agent.browsername == 'Chrome' ) {
	isCSS3Apply = true;
}

if ("onorientationchange" in window) {
	isOrientationApply = true;
}