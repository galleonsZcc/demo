var msgPop = {
	msgInterval:null,
	show:function(parameter){
		var msgPopObj = this;
		if (msgPopObj.msgInterval) {
			clearInterval(msgPopObj.msgInterval);
		};
		var settings = {
			msgType : 1,						//弹出框类型 -1：错误， 0：警告， 1：成功，  2：疑问
			msgTitle : '',						//对话信息标题，弹出框中加粗显示，无则不填
			msgContent : '',					//对话信息内容，无则不填
			countDown : -1,						//倒计时，无则不填
			selfHelpClose : false,				//是否显示右上角关闭按钮,msgType等于-1时，值必须为true
			callback : function(){}
		};
		if(parameter){
			$.extend(settings,parameter);
		}
		var typeName = '';
		switch(settings.msgType){
			case -1:
				typeName = 'error';
				break;
			case 0:
				typeName = 'warning';
				break;
			case 1:
				typeName = 'succ';
				break;
			case 2:
				typeName = 'ask';
				break;
			default:
				typeName = 'succ';
		}
		if(settings.msgType == -1){
			settings.selfHelpClose = true;
		}
		if(typeof(settings.callback) == 'function'){
			msgPopObj.func = settings.callback;
		}
		var isOnlySucc = false;
		var msgObj = $(window.top.document).find('.ui-msgpop');
		
		msgObj.find('.ui-poptip-content').empty();
		//显示右上角关闭按钮
		if(settings.selfHelpClose){
			msgObj.find('.ui-poptip-close').show();
		}else{
			msgObj.find('.ui-poptip-close').hide();
		}
		//icon
		var icon_str = '<div class="ui-msgpop-icon icon-'+typeName+'"></div><div class="content" ></div>';
		msgObj.find('.ui-poptip-content').append(icon_str);
		//对话框title
		if (settings.msgTitle != '') {
			var title_str = '<div class="ui-msgpop-content-title" >'+settings.msgTitle+'</div>';
			msgObj.find('.ui-poptip-content').find('.content').append(title_str);
		}
		//对话框信息内容
		if (settings.msgContent != '') {
			var msg_str = '<div class="ui-msgpop-content-msg" >'+settings.msgContent+'</div>';
			msgObj.find('.ui-poptip-content').find('.content').append(msg_str);
		}else{
			var _title = msgObj.find('.ui-poptip-content').find('.content').find('.ui-msgpop-content-title');
			if (_title.length) {
				_title.css({'line-height':'25px'});
			};
		}
		//对话框按钮
		if(!(settings.msgType == 1 && settings.selfHelpClose == false && settings.countDown < 0)){
			var btn_str = '<div class="ui-msgpop-content-btn"></div>';
			msgObj.find('.ui-poptip-content').find('.content').append(btn_str);
			var btnObj = msgObj.find('.ui-poptip-content').find('.content').find('.ui-msgpop-content-btn');

			var _str = '';
			if (settings.msgType == 1 && settings.countDown > 0) {
				_str = '<input type="button" class="bogda_btn_orange_b1 btn_true" value="知道了"/><span class="ui-msgpop-countdown ml5"><font class="countdown-number">'+settings.countDown+'</font><font class="ml3">秒后将自动关闭窗口</font></span>';
				
			}else if (settings.msgType == 0 || settings.msgType == 2) {
				_str = '<input type="button" class="bogda_btn_orange_b1 btn_true" value="确 定"/><input type="button" class="bogda_btn_white_b1 ml10 btn_false" value="取 消"/>';
			}else if (settings.msgType == -1){
				_str = '<input type="button" class="bogda_btn_orange_b1 btn_true" value="知道了"/>';
			}
			btnObj.append(_str);
		}else{
			isOnlySucc = true;
		}
		msgObj.show();
		var _top = (mainObj.ClientH() - msgObj.height()) / 2;
		if (_top < 0) {top = 0};
		var _left = (mainObj.ClientW() - msgObj.width()) / 2;
		if (_left < 0) {_left = 0};
		msgObj.hide();
		msgObj.css({'position':'fixed','top':_top+'px','left':_left+'px','z-index':9999});
		msgObj.show();
		//如果有倒计时
		if (settings.countDown > 0) {
			msgPopObj.msgInterval = setInterval(function(){
				if (settings.countDown > 0) {
					settings.countDown -= 1;
					msgObj.find('font.countdown-number').text(settings.countDown);
				}else{
					msgPopObj.hide(true);
				}
			},1000);
		};
		//如果只是简单成功提示
		if (isOnlySucc) {
			setTimeout(function(){
				msgPopObj.hide(true);
			},3000);
		};
		//绑定关闭事件
		msgObj.find('.btn_true,.ui-close').bind('click',function(){
			msgPopObj.hide(true);
		});
		msgObj.find('.btn_false').bind('click',function(){
			msgPopObj.hide(false);
		});
	},
	func : function(){},
	hide : function(isCallBack){
		var msgObj = $(window.top.document).find('.ui-msgpop');
		msgObj.hide();
		if (isCallBack) {
			this.func();
		};
	}
};