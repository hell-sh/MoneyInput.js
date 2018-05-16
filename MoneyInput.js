/* MoneyInput.js v1.1, Copyright (c) 2018 Hellsh Ltd., https://github.com/hellshltd/MoneyInput.js */

function registerMoneyInputElements()
{
	let $=window.$||window.jQuery;
	if(typeof $=="undefined")
	{
		console.error("MoneyInput.js requires jQuery.");
		return false
	}
	let centsToEuros=function(cents)
	{
		var euros=(cents/100);
		if(cents%100==0)
		{
			euros+=".00";
		}
		else if(Math.round(cents-(Math.floor(euros)*100))%10==0)
		{
			euros+="0";
		}
		return euros.toString().replace(".", ",");
	};
	$(".money-input:not([data-money-input]),.money-amount:not([data-money-input])").each(function()
	{
		if($(this).is(".money-amount"))
		{
			console.warn(".money-amount is deprecated:", this);
		}
		if($(this).val()=="")
		{
			$(this).val("0,00");
		}
		$(this).on("input",function(event)
		{
			var cents=parseInt($(this).val().trim().replace(".","").replace(",","")),pos=this.selectionStart;
			if(isNaN(cents))
			{
				$(this).val($(this).attr("data-money-input"))[0].selectionEnd=pos;
			}
			else
			{
				var euros=centsToEuros(cents),backpos=$(this).val().length-pos;
				if(euros!=$(this).val())
				{
					$(this).val(euros).attr("data-money-input",euros);
					if(backpos > 1)
					{
						this.selectionEnd=euros.length-3;
					}
				}
			}
		}).attr("data-money-input", $(this).val()).trigger("input");
	});
}
