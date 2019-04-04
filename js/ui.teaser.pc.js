// JavaScript Document
$(function() {
	
	if ($('body.ui-pc').length > 0) {
		$('.jq_partnership_hide').bind('click', function() {
			$('.jq_partnership').click();
		});
		
		$('.js-food-top-visual-play-bg').bind('click', function() {
			$('.js-food-play-close').click();
		});
	} else {
		$('.jq_partnership_hide').bind('click', function() {
			$('.jq_partnership').click();
		});
		
		$('.js-food-top-visual-play-bg').bind('click', function() {
			$('.js-food-play-close').click();
		});
	}
	
	// Main Vod Play Start
	if ( $('body').hasClass('ui-touchevent') ) {
		if ( $('body.ui-touchevent .js-food-play-box').length > 0 ) {
			$('body.ui-touchevent .js-food-play-box')[0].addEventListener('touchmove', function(event) {
				event.preventDefault();
				return false;
			}, false );
		}
	}
	
	$('.js_main_section_visual_play_open').on('click', function(event) {

		if($(this).hasClass('disabled')) return;

		p.play();
		$('html, body').addClass('overflowHidden');
		$('.js-food-play-box').show().addClass('enabled');

		if($('html').hasClass('csstransforms') && !$('body').hasClass('ui-browser-ie')) {
			var bgEl = $('.js-food-play-box > .food-top-visual-play-bg');
			var playerEl = $('.js-food-play-box > .food-top-visual-play-inner');
			var closeBtnEl = $('.js-food-play-box .food-top-visual-play-vod-close');

			TweenMax.set(bgEl, {opacity:0});
			TweenMax.to(bgEl, .3, {opacity:.8, ease:Power2.easeOut});

			TweenMax.set(playerEl, {scale:.9, y:50, opacity:0});
			TweenMax.to(playerEl, .5, {scale:1, y:0, opacity:1, ease:Power2.easeOut});

			TweenMax.set(closeBtnEl, {scale:.9, opacity:0});
			TweenMax.to(closeBtnEl, .5, {scale:1, opacity:1, delay:.5, ease:Power2.easeOut});
		}

		//return false;
		event.preventDefault();
	});
	
	$('.js-food-play-close').on('click', function() {
		$('.js-food-play-box').hide().removeClass('enabled');
		$('html, body').removeClass('overflowHidden');
		// if ( $('body').hasClass('ui-browser-ie') ) {
		// 	swfobject.getObjectById("cjplayer").Mpause();
		// } else {
		// 	p.pause();
		// }
		p.mediaStop();

		//makeVideo();
		return false;
	});
	// Main Vod Play End
	
	// Background Festival Pic Start
	function festivalFade() {
		var $el = $('.jq_bg_festival');
		var $currentItem = $el.find('li.selected');
		var $nextItem = $currentItem.next('li');
		var tiemNum = 1.5;
		
		if ( $nextItem.length == 0 ) {
			$nextItem = $el.find('li').eq(0);
		}
		
		var $elastic = new TimelineMax();
		
		$elastic.to($currentItem, tiemNum, {opacity:0, ease:Linear.easeNone})
		.to($nextItem, tiemNum, {opacity:1, ease:Linear.easeNone, onComplete:function() {
			$el.find('li').removeClass('selected');
			$nextItem.addClass('selected');
		}},0);
	}
	
	setInterval(function() {
		festivalFade();
	},4000);
	// Background Festival Pic End
	
	// Partnership Box Start
	$('.jq_partnership').bind('click', function() {
		var $el = $('#partnership');
		var $link = $(this);
		var $link_on = $link.find('span.on');
		var $link_off = $link.find('span.off');
		var $down_link = $el.find('.jq_partnership_down');
		var $bg = $el.find('.jq_partnership_bg');
		var $light = $el.next('.jq_partnership_hide');
		
		var tiemNum = 0.3;
		
		var $elastic = new TimelineMax();
		
		if ( $el.hasClass('on') ) {
			$el.removeClass('on');
			
			$elastic.to($link_on, tiemNum, {opacity:1, ease:Cubic.easeIn})
			.to($link_off, tiemNum, {opacity:0, ease:Cubic.easeIn},0)
			.to($down_link, tiemNum, {opacity:1, ease:Cubic.easeIn},0)
			.to($el, tiemNum, {bottom:-474, ease:Cubic.easeIn},0)
			.to($bg, tiemNum, {opacity:0.6, ease:Cubic.easeIn},0)
			.to($light, tiemNum, {opacity:0, ease:Cubic.easeIn, onComplete:function() {
				$light.hide();
			}},0);
		} else {
			$el.addClass('on');
			$light.show();
			
			$elastic.to($link_on, tiemNum, {opacity:0, ease:Cubic.easeOut})
			.to($link_off, tiemNum, {opacity:1, ease:Cubic.easeOut},0)
			.to($down_link, tiemNum, {opacity:0, ease:Cubic.easeOut},0)
			.to($el, tiemNum, {bottom:0, ease:Cubic.easeOut},0)
			.to($bg, tiemNum, {opacity:1, ease:Cubic.easeOut},0)
			.to($light, tiemNum, {opacity:0.8, ease:Cubic.easeOut},0);
		}
		return false;
	});
	// Partnership Box End
	
	// Footer Newsletter Start
	$('.newsletter-keyword-input').bind('focus', function() {
		var $el = $(this);
		var placeholder = $el.data('placeholder');

		if ( $el.val() == placeholder ) {
			$el.val('');
		}
	}).bind('blur', function() {
		var $el = $(this);
		var placeholder = $el.data('placeholder');

		if ( $el.val() == placeholder || $el.val().replace(/ /g, '') == '' ) {
			$el.val(placeholder);
		}
	});
	// Footer Newsletter End
	
});

function MF_vodInfoLoadOk() {
	$('.js_main_section_visual_play_open').removeClass('disabled');
}

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-csspointerevents-csstransforms-csstransitions-mediaqueries-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in C)if(C.hasOwnProperty(l)){if(e=[],n=C[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=S.className,t=Modernizr._config.classPrefix||"";if(_&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),_?S.className.baseVal=n:S.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):_?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(){var e=n.body;return e||(e=i(_?"svg":"body"),e.fake=!0),e}function l(e,t,r,o){var s,l,u,f,d="modernizr",c=i("div"),p=a();if(parseInt(r,10))for(;r--;)u=i("div"),u.id=o?o[r]:d+(r+1),c.appendChild(u);return s=i("style"),s.type="text/css",s.id="s"+d,(p.fake?p:c).appendChild(s),p.appendChild(c),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),c.id=d,p.fake&&(p.style.background="",p.style.overflow="hidden",f=S.style.overflow,S.style.overflow="hidden",S.appendChild(p)),l=t(c,e),p.fake?(p.parentNode.removeChild(p),S.style.overflow=f,S.offsetHeight):c.parentNode.removeChild(c),!!l}function u(e,n){return!!~(""+e).indexOf(n)}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function d(e,n){return function(){return e.apply(n,arguments)}}function c(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?d(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+p(n[o])+":"+r+")");return s=s.join(" or "),l("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,o,s){function a(){d&&(delete P.style,delete P.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var l=m(e,o);if(!r(l,"undefined"))return l}for(var d,c,p,v,y,h=["modernizr","tspan"];!P.style;)d=!0,P.modElem=i(h.shift()),P.style=P.modElem.style;for(p=e.length,c=0;p>c;c++)if(v=e[c],y=P.style[v],u(v,"-")&&(v=f(v)),P.style[v]!==t){if(s||r(o,"undefined"))return a(),"pfx"==n?v:!0;try{P.style[v]=o}catch(g){}if(P.style[v]!=y)return a(),"pfx"==n?v:!0}return a(),!1}function y(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+T.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),c(a,n,t))}function h(e,n,r){return y(e,t,t,n,r)}var g=[],C=[],w={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var S=n.documentElement,_="svg"===S.nodeName.toLowerCase(),x=function(){var n=e.matchMedia||e.msMatchMedia;return n?function(e){var t=n(e);return t&&t.matches||!1}:function(n){var t=!1;return l("@media "+n+" { #modernizr { position: absolute; } }",function(n){t="absolute"==(e.getComputedStyle?e.getComputedStyle(n,null):n.currentStyle).position}),t}}();w.mq=x,Modernizr.addTest("mediaqueries",x("only all"));var b="Moz O ms Webkit",T=w._config.usePrefixes?b.split(" "):[];w._cssomPrefixes=T;var E=w._config.usePrefixes?b.toLowerCase().split(" "):[];w._domPrefixes=E;var z={elem:i("modernizr")};Modernizr._q.push(function(){delete z.elem});var P={style:z.elem.style};Modernizr._q.unshift(function(){delete P.style}),w.testAllProps=y,w.testAllProps=h,Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)}),Modernizr.addTest("csstransitions",h("transition","all",!0)),Modernizr.addTest("csspointerevents",function(){var e=i("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents}),o(),s(g),delete w.addTest,delete w.addAsyncTest;for(var N=0;N<Modernizr._q.length;N++)Modernizr._q[N]();e.Modernizr=Modernizr}(window,document);