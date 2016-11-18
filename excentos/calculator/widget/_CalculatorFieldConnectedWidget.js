
// DEPRECATED

// SIEHE _FieldInputWidget  für nachfolgekonzept! Hier nichts mehr machen , nur zur Doku wie es früher in etwa war


define([
	// no dependencies
], function(){

return declare("excentos/calculator/_CalculatorFieldConnectedWidget", null, {
	
	newWidgetValue : function(value){
		this._newWidgetValueInProgress = true;
		// if the new value came from a field update via newFieldValue, do nothing
		// to make sure we don't get circular in this directon:
		// TODO: wird das noch benötigt? Bessere Methode finden um auf (alle möglichen)Zyklen zu prüfen, hiermit werden
		// nur Bestimmte abgefangen.
		if(this._newFieldValueInProgress){
			this._newWidgetValueInProgress = false;
			return false;
		}
		// otherwise make sure we don't get circular (disconnect from field changes)
		// TODO sicherstellen, dass das auch funktioniert
		// XXXdojo.disconnect(this._fieldConnectHandle);
		// XXXthis._fieldConnectHandle = null;
		
		// and set the new value to the field:
		if(!value || typeof this._lastValueIntermediate == "undefined"){
			// if value not set, get the value from the current value of the facetObj of this widget 
			value = this.facetObj.currentValue;
		}
		if (this.widgetType == "inputRadiobuttons"){
			//console.debug("trying to set field to boolean " + value);
			if (value == "yes"){
				value = true;
			}else{
				value = false;
			};
		}		
		if (this.widgetType == "inputSlider") {
			// because facetObj.currentValue has the type String
			// TODO: warum eigentlich String?
			value = parseFloat(value);
		}
		
		this.field.set(value);
		// XXXthis._fieldConnectHandle = dojo.connect(this.field, "newValue", this, "newFieldValue");
		this._newWidgetValueInProgress = false;		
	},

	newFieldValue : function(value){
		this._newFieldValueInProgress = true;
		if(this._newWidgetValueInProgress){
			this._newFieldValueInProgress = false;
			return false;
		} 
		// ein Versuch, updates vom Feld zu bekommen, solange man "auf Formel" ist 
		// oder ein direktes eingabefeld.
		if((this.field.isActive && !this.field.isSet) || (!this.field.isActive)){
			if (typeof value == "boolean" && this.widgetType == "inputRadiobuttons"){
				// TODO prüfen, was da tatsächlich als value geht bei checkbox und radio
				// checkbox: "1" / nix (unset) (da schauen wir aber eh' direkt auf die box deshalb)
				// radiobutton: state.name.
				//console.debug("trying to set radio to boolean " + value);
				if (value){
					value = "yes";
				}else{
					value = "no";
				};
			}
			this.facetObj.currentValue = value;
			this.updateValues();
			// done, reset and listen again			
		}					 
		this._newFieldValueInProgress = false;
	}
});

});


