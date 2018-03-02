/* MoneyInput https://github.com/netducks/MoneyInput */

let $=window.$||window.jQuery;

function registerMoneyInputElements()
{
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
	$(".money-amount:not([data-money-input])").each(function()
	{
		$(this).on("input",function(event)
		{
			if($(this).val()=="")
			{
				$(this).val("0,00").attr("data-prev-val","0,00");
			}
			else
			{
				var cents=parseInt($(this).val().trim().replace(".","").replace(",","")),pos=this.selectionStart;
				if(isNaN(cents))
				{
					$(this).val($(this).attr("data-prev-val"))[0].selectionEnd=pos;
				}
				else
				{
					var euros=centsToEuros(cents),backpos=$(this).val().length-pos;
					if(euros!=$(this).attr("data-prev-val"))
					{
						$(this).val(euros).attr("data-prev-val",euros);
						if(backpos>2)
						{
							this.selectionEnd=euros.length-3;
						}
					}
				}
			}
		}).attr("data-money-input","true").trigger("input");
		if($(this).val()=="")
		{
			$(this).val("0,00");
		}
		$(this).attr("data-prev-val", $(this).val());
	});
}
