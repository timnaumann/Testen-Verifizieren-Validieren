define({
	//initDone : Boolean
	//	flag that indicates the initialization state of the app.
	//	`false` means the app is not ready yet and should therefore not be presented to the user.
	//	Can be marked as 'done' / set to `true` from anywhere by calling behavior.onInitDone();
	initDone: false,
	
	constants : {
		// don't play with this, it's implemented in the serverside image scaler, too.
		DPI_SCALES : {
			"ldpi" : 0.75,
			"mdpi" : 1,
			"mhdpi" : 1.25,
			"hdpi" : 1.5,
			"xhdpi" : 2,
			"xxhdpi" : 3
		},
		DPI_DOUBLERES:{ // required in 2x-devicedpi cases (CSS in 1x, images in 2x)
						// used for 2.0 -> infinity dpi
			"ldpi":"hdpi",
			"mdpi":"xhdpi",
			"mhdpi":"mhdpi", // not a case used on retina-style devices
			"hdpi":"xxhdpi",
			"xhdpi":"xhdpi", // sharp enough already, there's no 4x
			"xxhdpi":"xxhdpi" // dito, there's no 6x
		},
		DPI_ONEPOINTFIVERES:{ // in 1,5x devicedpi cases (used for 1.5 -> 1.9999)
			"ldpi":"ldpi", // no mapping possible, not relevant
			"mdpi":"hdpi", 
			"mhdpi":"mhdpi", // not a relevant case
			"hdpi":"hdpi", // no mapping possible (unfortunately)
			"xhdpi":"xxhdpi",
			"xxhdpi":"xxhdpi" 			
		}
	}
});
