function billingFunction()
{
	var shippingName = document.getElementById("shippingName");  // get value of shippingName
	var shippingZip  = document.getElementById("shippingZip");   //  get value of shippingZip
	var billingName  = document.getElementById("billingName");   //  get value of billingName
	var billingZip   = document.getElementById("billingZip");    // get value of billingZip
	var checkBox     = document.getElementById("same"); // get default value of checkbox 
	// if user press checkbox
	// 1- copy value name and Zip of shipping to billing 
	// 2- set attribute tat we removed 
	if(checkBox.checked)
	{
		billingName.setAttribute("required", true);
		billingZip.setAttribute("pattern", "[0-9]{5}")
		billingName.value = shippingName.value;
		billingZip.value  = shippingZip.value ;
	}
	// if the ueser uncheck checkbox 
	// 1- put billingName and billingZip to empty string 
	// 2- make default checkbox value to false (default value) 
	else
	{
		billingName.removeAttribute("required");
		billingZip.removeAttribute("pattern");
		billingName.value = "";
		billingZip.value  = " ";
	}
}


