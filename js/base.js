var baseObj = {
	dropListDown : function(thisBox,dropBox){	//	下拉列表事件
				$(thisBox).each(function(i){
							$(this).click(function(ev){
									//$(thisBox).css({"z-index":"1"});
									$(this).children('input:text').toggleClass('current');
									$(thisBox).not(this).find(dropBox).add('.cityConBox,.otherDropDownBox').slideUp('fast');
									var ev = ev || window.event;
									$(this).find(dropBox).css({"top":($(this).outerHeight() -1)+"px"});
									if ($(this).find(dropBox).text()!='')
									{
										$(this).find(dropBox).slideToggle("fast");
										$(this).css({"z-index":"10"});
									}
									ev.stopPropagation();
								});
							$(this).delegate('a','click',function(){
									$(this).parents(thisBox).children('input:text').val($(this).text()).attr('key',$(this).attr('rel')).attr('title',$(this).text()).removeClass('current');
								});	
						});
				$('html').click(function(){
						$(thisBox).find(dropBox).hide();
						$('.dropDownConBox,.resultOUBox').hide();
						$(thisBox).children('input:text').removeClass('current');
					});		
			}
};

$(function(){
	new Numeral('#tnumeral');
	$('.ui-select-trigger').click(function(){
		$(this).parent().toggleClass('current');
		if($(this).parent().hasClass('current')){
			$(this).siblings('.ui-select-options').css({'top':'28px'}).show();
		}else{
			$(this).siblings('.ui-select-options').hide();
		}
		
	});

	baseObj.dropListDown('.dropListDown','.dropDownConBox');	// 下拉列表事件
	$(document).ready(function(){
		$('body').append('<div class="ui-poptip ui-msgpop" style="display:none;"><div class="ui-poptip-shadow"><div class="ui-poptip-container"><div class="ui-poptip-close"><a href="javascript:;" class="ui-close middle" style="float:right;"></a></div><div class="ui-poptip-content"></div></div></div></div>');
	});

	$('#showpop1').click(function(){
		msgPop.show({
			msgType : 1,
			msgTitle : '提交成功！',
			callback : function(){
				console.log('i am callback');
			}
		});
	});

	$('#showpop2').click(function(){
		msgPop.show({
			msgType : 1,
			msgTitle : '提交成功！',
			msgContent : '我是成功提示内容我是成功提示内容我是成功提示内容我是成功提示内容我是成功提示内容',
			countDown : 3,
			selfHelpClose :true
		});
	});
	$('#showpop3').click(function(){
		msgPop.show({
			msgType : -1,
			msgTitle : '提交失败！'
		});
	});
	$('#showpop4').click(function(){
		msgPop.show({
			msgType : -1,
			msgTitle : '提交失败！',
			msgContent : '我是失败内容我是失败内容我是失败内容我是失败内容我是失败内容我是失败内容我是失败内容',
			callback:function(){
				console.log('i am callback');
			}
		});
	});
	$('#showpop5').click(function(){
		msgPop.show({
			msgType : 0,
			msgTitle : '您是否要提交？',
			msgContent : '我是警告内容我是警告内容我是警告内容我是警告内容我是警告内容我是警告内容我是警告内容',
			selfHelpClose :false,
			callback:function(){
				console.log('i am callback');
			}
		});
	});

});

// var startCountDown;
// function showMsgPop(parameter){
// 	if (startCountDown) {
// 		clearInterval(startCountDown);
// 	};
// 	var settings = {
// 		msgType : 1,						//弹出框类型 -1：错误， 0：警告， 1：成功，  2：疑问
// 		msgTitle : '',						//对话信息标题，弹出框中加粗显示，无则不填
// 		msgContent : '',					//对话信息内容，无则不填
// 		countDown : -1,						//倒计时，无则不填
// 		selfHelpClose : false,				//是否显示右上角关闭按钮,msgType等于-1时，值必须为true
// 		callback : ''
// 	};
// 	if(parameter){
// 		$.extend(settings,parameter);
// 	}
// 	var typeName = '';
// 	switch(settings.msgType){
// 		case -1:
// 			typeName = 'error';
// 			break;
// 		case 0:
// 			typeName = 'warning';
// 			break;
// 		case 1:
// 			typeName = 'succ';
// 			break;
// 		case 2:
// 			typeName = 'ask';
// 			break;
// 		default:
// 			typeName = 'succ';
// 	}
// 	if(settings.msgType == -1){
// 		settings.selfHelpClose = true;
// 	}
// 	var isOnlySucc = false;
// 	var msgObj = $(window.top.document).find('.ui-msgpop');
// 	msgObj.find('.ui-poptip-content').empty();
// 	//显示右上角关闭按钮
// 	if(settings.selfHelpClose){
// 		msgObj.find('.ui-poptip-close').show();
// 	}else{
// 		msgObj.find('.ui-poptip-close').hide();
// 	}
// 	//渲染icon
// 	var icon_str = '<div class="ui-msgpop-icon icon-'+typeName+'"></div><div class="content" ></div>';
// 	msgObj.find('.ui-poptip-content').append(icon_str);
// 	//对话框title
// 	if (settings.msgTitle != '') {
// 		var title_str = '<div class="ui-msgpop-content-title" >'+settings.msgTitle+'</div>';
// 		msgObj.find('.ui-poptip-content').find('.content').append(title_str);
// 	}
// 	//对话框信息内容
// 	if (settings.msgContent != '') {
// 		var msg_str = '<div class="ui-msgpop-content-msg" >'+settings.msgContent+'</div>';
// 		msgObj.find('.ui-poptip-content').find('.content').append(msg_str);
// 	}
// 	//对话框按钮
// 	if(!(settings.msgType == 1 && settings.selfHelpClose == false && settings.countDown < 0)){
// 		var btn_str = '<div class="ui-msgpop-content-btn"></div>';
// 		msgObj.find('.ui-poptip-content').find('.content').append(btn_str);
// 		var btnObj = msgObj.find('.ui-poptip-content').find('.content').find('.ui-msgpop-content-btn');

// 		var _str = '';
// 		if (settings.msgType == 1 && settings.countDown > 0) {
// 			_str = '<input type="button" class="bogda_btn_orange_b1 btn_true" value="知道了"/><span class="ui-msgpop-countdown ml5"><font class="countdown-number">'+settings.countDown+'</font><font>秒后将自动关闭窗口</font></span>';
			
// 		}else if (settings.msgType == 0 || settings.msgType == 2) {
// 			_str = '<input type="button" class="bogda_btn_orange_b1 btn_true" value="确 定"/><input type="button" class="bogda_btn_white_b1 ml10 btn_false" value="取 消"/>';
// 		}else if (settings.msgType == -1){
// 			_str = '<input type="button" class="bogda_btn_orange_b1 btn_true" value="知道了"/>';
// 		}
// 		btnObj.append(_str);
// 	}else{
// 		isOnlySucc = true;
// 	}
// 	msgObj.show();
// 	var _top = (mainObj.ClientH() - msgObj.height()) / 2;
// 	if (_top < 0) {top = 0};
// 	var _left = (mainObj.ClientW() - msgObj.width()) / 2;
// 	if (_left < 0) {_left = 0};
// 	msgObj.hide();
// 	msgObj.css({'position':'fixed','top':_top+'px','left':_left+'px','z-index':9999});
// 	msgObj.show();
// 	if (settings.countDown > 0) {
// 		startCountDown = setInterval('writeCountDown()',1000)
// 	};
// 	if (isOnlySucc) {
// 		setTimeout('closeMsgPop()',3000);
// 		setTimeout('msgCallback()',3000);
// 	};
// 	//绑定关闭事件
// 	msgObj.find('.btn_true,.btn_false,.ui-close').bind('click',function(){
// 		console.log('btnOnClick');
// 		$(this).closest('.ui-msgpop').hide();
// 		if(typeof(settings.callback) == 'function'){
// 			msgCallback();
// 		}
// 	});

// }

// function writeCountDown(){
// 	var _countDown = parseInt($.trim($(window.top.document).find('.ui-msgpop').find('font.countdown-number').text()));
// 	if(isNaN(_countDown)){_countDown = 0};
// 	if (_countDown > 0) {
// 		$(window.top.document).find('.ui-msgpop').find('font.countdown-number').text(_countDown - 1);
// 	}else{
// 		$(window.top.document).find('.ui-msgpop').find('input[type="button"].btn_true').trigger('click');
// 	}
// }


mainObj={
	ClientH : function(){return document.documentElement.clientHeight;},	//	捕获客户端浏览器高度
	ClientW : function(){return document.documentElement.clientWidth;},		//	捕获客户端浏览器宽度
	offsetW : function(){return document.documentElement.scrollWidth || document.body.scrollWidth;},	//	捕获页面可视区域宽
	offsetH : function(){return document.documentElement.scrollHeight || document.body.scrollHeight;}, // 	捕获页面可视区域高
	scrollW : function(){return document.documentElement.scrollLeft || document.body.scrollLeft;},// 滚动条滑动的宽度
	scrollH : function(){return document.documentElement.scrollTop || document.body.scrollTop;},// 滚动条滑动的高度
	screenW : window.screen.width,						//	捕获客户端分辨率X
	screenH : window.screen.height,						//	捕获客户端分辨率Y
	browserStr : window.navigator.userAgent.toLowerCase()	// 获取客户端浏览器字符串
}