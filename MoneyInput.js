/* MoneyInput.js 1.2.1 — Copyright (c) 2018, Hellsh — https://github.com/hellshltd/MoneyInput.js */

console.assert(!("MoneyInput" in window));
window.MoneyInput={
	decimalSeperator:",",
	thousandSeperator:".",
	centsToEuros:function(cents)
	{
		cents = (cents / 100);
		cents = (cents + "").replace(/[^0-9+\-Ee.]/g,"");
		var n = !isFinite(+cents) ? 0 : +cents,s="",toFixedFix=function(n)
		{
			var k = Math.pow(10, 2);
			return "" + Math.round(n * k) / k;
		};
		s = (2 ? toFixedFix(n):""+Math.round(n)).split(".");
		if(s[0].length>3)
		{
			s[0]=s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, MoneyInput.thousandSeperator);
		}
		if((s[1] || "").length < 2)
		{
			s[1]=s[1]||"";
			s[1]+=new Array(2-s[1].length+1).join("0");
		}
		return s.join(MoneyInput.decimalSeperator);
	},
	textToCents:function(text)
	{
		return parseInt(text.replace(/[^0-9]*/g,""));
	},
	registerElements:function()
	{
		var $=window.$||window.jQuery;
		if(typeof $=="undefined")
		{
			console.error("MoneyInput.js requires jQuery.");
			return false;
		}
		$(".money-input:not([data-money-input]),.money-amount:not([data-money-input])").each(function()
		{
			if($(this).val()==""||$(this).val()=="0")
			{
				$(this).val("0"+MoneyInput.decimalSeperator+"00");
			}
			$(this).on("input",function(event)
			{
				var val=$(this).val().trim();
				if(val==""||val=="0")
				{
					$(this).attr("data-money-input","0"+MoneyInput.decimalSeperator+"00").val($(this).attr("data-money-input"));
					return;
				}
				var cents=MoneyInput.textToCents(val),pos=this.selectionStart;
				if(isNaN(cents)||cents>=Number.MAX_SAFE_INTEGER)
				{
					$(this).val($(this).attr("data-money-input"))[0].selectionEnd=pos;
					return;
				}
				if(!event.originalEvent)
				{
					event.originalEvent={inputType:""};
				}
				else if(!event.originalEvent.inputType)
				{
					event.originalEvent.inputType="";
				}
				var euros=MoneyInput.centsToEuros(cents);
				if(euros==$(this).attr("data-money-input"))
				{
					$(this).val(euros);
					if(event.originalEvent.inputType=="deleteContentForward")
					{
						this.selectionEnd=pos+1;
					}
					else if(event.originalEvent.inputType=="deleteContentBackward")
					{
						this.selectionEnd=pos;
					}
					return;
				}
				var _val=$(this).attr("data-money-input");
				$(this).val(euros).attr("data-money-input",euros);
				if(event.originalEvent.inputType.substr(0,13)=="deleteContent")
				{
					pos+=2;
				}
				var backpos=(_val.length-pos);
				if(backpos==0)
				{
					this.selectionEnd=euros.length-1;
				}
				else if(backpos>0)
				{
					this.selectionEnd=euros.length-3;
				}
			}).attr("data-money-input",$(this).val()).trigger("input");
		});
	}
};
function registerMoneyInputElements()
{
	console.warn("registerMoneyInputElements is deprecated; use MoneyInput.registerElements instead.");
	MoneyInput.registerElements();
}
