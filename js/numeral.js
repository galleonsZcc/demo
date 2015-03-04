var Numeral = function(element){
	this.isDecimal = false;
	this.places = 0;
	this.section = false;
	this.$element = $(element);
	this.init();
	this.listen();
};

Numeral.prototype = {
	init : function(){
		var me = this;
		var _places = this.$element.attr('data-decimal'),_section = this.$element.attr('data-section');
		if(_places){
			me.isDecimal = true;
			me.places = _places;
		}
		if(_section){
			me.section = true;
		}

	},
	listen : function(){
		this.$element.on('keydown',$.proxy(this.keydown, this))
					.on('keyup',$.proxy(this.keyup, this))
					.on('blur',$.proxy(this.blur, this));
	},
	keydown : function(e){
		var e = e||window.event, keyArray, me = this, inputValue = this.$element.val(), _decimal;
		inputValue = inputValue.replace(/,/g,'');
        var currKey = e.keyCode||e.which||e.charCode;
        if(me.isDecimal){
        	keyArray = new Array(48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,46,37,39,190,110,13);
        }else{
        	keyArray = new Array(48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,46,37,39,13); 
        }

        if(currKey ==190||currKey ==110){
			if(inputValue.indexOf('.') != -1) {
				return false;
			}
		}

        var flag = true;
        for(var i = 0;i < keyArray.length && flag; i++){  
			if(currKey == keyArray[i]){  
				flag = false;
			}
		}

		if(flag){  
			e.keyCode = 0;  
			e.returnValue=false;  
			return false;  
		}

		if(me.isDecimal){
			_decimal = inputValue.split('.')[1];
			if(_decimal && _decimal.length >= me.places){
				return false;
			}
		}
		me.parse();	
	},
	keyup : function(){

	},
	blur : function(){

	},
	parse : function(){
		var me = this, inputValue = this.$element.val(), _int, _decimal,re=/(-?\d+)(\d{3})/;
		inputValue = inputValue.replace(/,/g,'');
		if(me.section){
			if(inputValue.indexOf('.') != -1){
				_int = inputValue.split('.')[0];
				_decimal = inputValue.split('.')[1];

				while(re.test(_int)){  
	                _int=_int.replace(re,"$1,$2");
	            }

	            this.$element.val(_int+','+_decimal);
			}else{
				_int = inputValue;

				while(re.test(_int)){  
	                _int=_int.replace(re,"$1,$2");
	            }
	            this.$element.val(_int);
			}
		}
	}
};