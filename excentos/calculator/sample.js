define([
	"dojo/_base/declare",
	"dojo/number",
	"excentos/calculator/_CalculatorEngine"
], function(declare, number, _CalculatorEngine){

//ROI Calculator as Sample

return declare("excentos.calculator.sample", [_CalculatorEngine], {
	// default name: 				
	name : "xc_sample",
		
	init: function(){
		// HIER VOR NIX ANFASSEN!
		
		// declares the fields
		// ATTENTION: the correct order of the fields is important, they can only "look upwards"! 
		// (and keep everything tidy and well-documented! 
			
		// ASSUMPTIONS
		// ACHTUNG diese Variable hat einen massiven Hebel!
		this.fld("ass_costsOneTime", 45000); // Euro für Kosten Guided Selling - angenommen ist hier ein gutes Starter Package bzw. leicht darüber
		this.fld("ass_costsMonthly", 500); // Euro für Kosten Guided Selling
					
		
		// BASIC VARIABLES
		
			   
		this.fld("usr_visits", 1000); // user visits PER DAY
		this.fld("usr_conversionRate", 2.5); // % // user input
		this.fld("usr_conversionRateIncrease", 0.5); // % // user input
		this.fld("usr_shoppingCartValue", 150); // Euro // user input
		this.fld("usr_shoppingCartValueIncrease", 25); // Euro // user input
		this.fld("usr_margin", 15); // % // user input
		this.fld("usr_percentUsingGuidedSelling", 50); // % // user input
		this.fld("showCalculationDetails", false);
		
		var daysOfMonth = 30;
		
		
		this.fld("usr_conversionRatePlusIncrease", function(){
			return this.c.usr_conversionRate.val + this.c.usr_conversionRateIncrease.val;
		});
		this.fld("usr_shoppingCartValuePlusIncrease", function(){
			return this.c.usr_shoppingCartValue.val + this.c.usr_shoppingCartValueIncrease.val;
		});
		
		this.fld("usr_actualOrdersPerMonth", function(){
			return this.c.usr_visits.val * this.c.usr_conversionRate.val/100 * daysOfMonth;		
		});
		this.fld("usr_actualTransactionVolumePerMonth", function(){
			var value = this.c.usr_actualOrdersPerMonth.val * this.c.usr_shoppingCartValue.val;
			return value;		
		});

		this.fld("usr_additionalOrdersPerMonth", function(){
			return this.c.usr_visits.val  * daysOfMonth * this.c.usr_percentUsingGuidedSelling.val/100 * this.c.usr_conversionRateIncrease.val/100;			
			});
		this.fld("usr_totalOrders", function(){
			return this.c.usr_actualOrdersPerMonth.val + this.c.usr_additionalOrdersPerMonth.val;			
			});
		
		// zusätzliche Bestellungen * höherer Warenkorbwert + höherer Warenkorbwert bei den nicht zusätzlichen sondern normalen Bestellungen, die über GS abgewickelt werden..... + this.c.usr_shoppingCartValuePlusIncrease.val * this.c.usr_percentUsingGuidedSelling.val/100 * this.c.usr_visits.val  * daysOfMonth
		this.fld("usr_transactionVolumePerMonthWithAdditionalOrders", function(){
			var value = this.c.usr_additionalOrdersPerMonth.val * this.c.usr_shoppingCartValuePlusIncrease.val;
			// hier geändert von shoppinCartValue auf shoppingCartValuePlusIncrease
			return value;
			});
		
		this.fld("usr_transactionVolumePerMonthWithshoppingCartValueIncrease", function(){
			var value = this.c.usr_totalOrders.val * this.c.usr_shoppingCartValueIncrease.val;
			return value;
		});
		
		// mehr Umsatz auf die Basisbestellungen durch höhere Warenkorbwerte auf die Nutzer, die Guided Selling nutzen
		this.fld("usr_additionalTransactionVolumeWithBasicOrdersAndIncreasedShoppingCartPerMonth", function(){
			var value = this.c.usr_actualOrdersPerMonth.val * this.c.usr_percentUsingGuidedSelling.val/100 * this.c.usr_shoppingCartValueIncrease.val;
			return value;
		});
		
		
		
		
		this.fld("usr_actualOrdersPerMonthWithGuidedSelling", function(){
			// gibt die Anzahl der bereits vorher vorhandenen Bestellungen an, die jetzt mit Guided Selling abläuft
			var value = this.c.usr_actualOrdersPerMonth.val * this.c.usr_percentUsingGuidedSelling.val/100;	
			return value;
		});
		
		
		this.fld("usr_additionalTransactionVolumeWithBasicOrdersAndIncreaseShoppingCartPerMonth", function(){
			// gibt die gesteigerten Umsätze der bestehenden Bestellungen an durch höhere Warenkorbwerte
			var value = this.c.usr_actualOrdersPerMonthWithGuidedSelling.val * this.c.usr_shoppingCartValueIncrease.val;	
			return value;
		});
		
		
		// hier dann die Summe der zusätzlichen Umsätze
		this.fld("usr_additionalTransactionVolumeWithGuidedSelling", function(){
			var value = this.c.usr_transactionVolumePerMonthWithAdditionalOrders.val + this.c.usr_additionalTransactionVolumeWithBasicOrdersAndIncreaseShoppingCartPerMonth.val;
			return value;
		});
		
		//nur als grobe Schätzung der Jahresumsatz damit Nutzer abgleichen kann
		this.fld("usr_revenuePerAnnumEstimate", function(){
			var value = this.c.usr_actualOrdersPerMonth.val * this.c.usr_shoppingCartValue.val * 12;
			return value;
		});
	   
		this.fld("usr_additionalContributionMarginPerMonth", function(){
			var value = this.c.usr_margin.val/100 * this.c.usr_additionalTransactionVolumeWithGuidedSelling.val;	
			return value;
		});
		this.fld("usr_breakEven", function(){
			var value = this.c.ass_costsOneTime.val / (this.c.usr_additionalContributionMarginPerMonth.val - this.c.ass_costsMonthly.val);
			return value;
		});
		this.fld("usr_roiAfterOneYear", function(){
			return ((this.c.usr_additionalContributionMarginPerMonth.val - this.c.ass_costsMonthly.val) * 12 - this.c.ass_costsOneTime.val)/this.c.ass_costsOneTime.val;			
		});
		this.fld("usr_roiAfterThreeYears", function(){
			return ((this.c.usr_additionalContributionMarginPerMonth.val - this.c.ass_costsMonthly.val) * 36 - this.c.ass_costsOneTime.val)/this.c.ass_costsOneTime.val;			
		});

	// HIER NACH NIX ANFASSEN!
	}

});

});

