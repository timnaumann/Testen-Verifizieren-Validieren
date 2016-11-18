/*globals xcInitial:true*/
/*globals xcStartAdvisor:true*/
(function(){

	var pathParts = location.pathname.split("/"),
		hostName = location.hostname,
		baseUrl = "//"+location.host,
		project = pathParts[1],
		system = pathParts[2],
		environment = /^service/.test(hostName) && "live" ||
					  /^stage/.test(hostName) && "stage" ||
					  /^test/.test(hostName) && "test" ||
					  "local",
		serviceBaseUrl = [baseUrl,project,system].join("/");


	xcStartAdvisor = true;
	xcInitial = {
		"showWelcome": true,
		"masterApplicationName": "app_test",
		"serviceBaseUrl": serviceBaseUrl,
		"appBaseUrl": serviceBaseUrl+"/app_test",
		"serviceSmd": {
			"methods": [
				{
					"name": "jsonAdapter_v2_1.addProductsToComparison",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.clearComparisonList",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.removeProductsFromComparison",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setProfileBySerialization",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setCalculatorData",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setFacetUnanswered",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setAllFacetsInViewUnanswered",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setFacetGroupExpanded",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setFacetInGroupExpanded",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.invokeMany",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.echo",
					"parameters": [{"name": "String"}]
				}, {
					"name": "jsonAdapter_v2_1.reloadServerConfiguration",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.startImport",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.addProductRating",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setUIState",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.postEvent",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setLocale",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.getData",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.logout",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.moveToNextStageInPath",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.moveToPreviousStageInPath",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.moveToAccessibleStage",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.resetProfile",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {
					"name": "jsonAdapter_v2_1.setFacetValues",
					"parameters": [{"name": "get"}, {"name": "post"}]
				}, {"name": "jsonAdapter_v2_1.login", "parameters": [{"name": "get"}, {"name": "post"}]}
			],
			"serviceType": "JSON-RPC",
			"serviceUrl": serviceBaseUrl+"/service.jsonrpc-v2_1",
			"timeout": 5000,
			"jsonAdapter": "jsonAdapter_v2_1"
		},
		"debug": true,
		"internalSessionId": 1337,
		"theme": "default",
		"development": {
			"serviceBaseUrl": serviceBaseUrl,
			"workspaceProject": environment === "local" ? "LOCAL" : "NOTLOCAL",
			"environment": environment,
			"ajaxInitVariant": "",
			"log": (location.search.match("xcLog=([^&#]+)")||["",""])[1].split(",")
		},
		"payload": {
			"applicationItems": {
				"app_test": {
					"metaData": {
						"totalPerfectMatchCount": 1,
						"facetsHash": "1452003012988",
						"i18nHash": "1452002793792",
						"expandCollapseState": "",
						"uiState": "{\"scrollToPosition\":{\"x\":0,\"y\":1735},\"excentos_widget_carousel_Carousel_0\":2,\"excentos_widget_carousel_Carousel_4\":1}",
						"productsHash": "1452003012988",
						"name": "app_test",
						"queryChanged": false,
						"queryProfileSerialization": ""
					},
					"config": {
						"configItems": {
							"piwikSiteId": "2",
							"enableTracking": "false",
							"decoration_template": "decoration.Image",
							"theme": "default",
							"enableTrackingImpls": "excentos/tracking/Piwik"
						}
					},
					"clientI18n": {
						"clientI18nItems": {
							"serviceerrordialog_newsession_text": "Leider ist zu viel Zeit seit Ihrer letzten Eingabe vergangen und Ihre Eingaben konnten nicht mehr abgerufen werden. Sie müssen daher den Berater neu starten.",
							"product_compare": "Vergleichen",
							"comparisontable_title": "Vergleichstabelle",
							"recommendations": "",
							"product_removefromcomparison": "Produkt entfernen",
							"recommendations_norecommendations": "Zur Auswahl kein passendes Geschenk gefunden.",
							"stageinpathnavigation_next": "Weiter",
							"serviceerrordialog_newsessionaftertimeout_text": "Die Verbindung wurde wieder hergestellt, allerdings konnten Ihre Eingaben durch die Unterbrechung nicht mehr abgerufen werden. Sie müssen daher den Berater neu starten.",
							"warningtags_label": "Achtung!",
							"recommendations_top": "Ihr Top-Ergebnis",
							"serviceerrordialog_timeout_heading": "Server nicht erreichbar",
							"serviceerrordialog_error": "",
							"product_detailspagelink": "Produktdetails",
							"selectiontags": "",
							"dropdown": "",
							"serviceerrordialog_newsession_heading": "Session abgelaufen",
							"comparisontable_noproducts": "Ihr Produktvergleich enthält keine Produkte. Bitte klicken Sie bei den von Ihnen gewünschten Produkten auf „Vergleichen“ und anschließend auf „Vergleich anzeigen“.",
							"input": "",
							"serviceerrordialog_timeout": "",
							"recommendations_showmore": "Weitere Produkte anzeigen",
							"serviceerrordialog_timeout_text": "Ein Netzwerk- oder Serverproblem ist aufgetreten. Der Berater ist dadurch derzeit nicht erreichbar. Es wird versucht, die Verbindung wiederherzustellen.",
							"product_details": "Produktdetails",
							"input_unset": "Filter aufheben",
							"serviceerrordialog_error_text": "Bei Ihrer letzten Interaktion ist leider ein Fehler aufgetreten.<br>Bitte entschuldigen Sie diese Unannehnmlichkeit.",
							"product_pdf": "PDF generieren",
							"serviceerrordialog_error_reload": "Seite neu laden",
							"serviceerrordialog_newsession": "",
							"expertview": "",
							"recommendations_toprecommendationflag": "Top Geschenkidee",
							"serviceerrordialog_error_heading": "Ein Fehler ist aufgetreten",
							"selectiontags_heading": "Ihre Auswahl",
							"serviceerrordialog_newsessionaftertimeout_heading": "Session abgelaufen",
							"comparisontable": "",
							"dropdown_noselection": "keine Auswahl",
							"warningtags": "",
							"serviceerrordialog_newsessionaftertimeout": "",
							"serviceerrordialog_newsessionaftertimeout_button": "Berater neu starten",
							"stageinpathnavigation": "",
							"product_addtobasket": "In den Warenkorb",
							"recommendations_others": "Passende Alternativen",
							"product": "",
							"recommendations_results": "Wir empfehlen Ihnen",
							"serviceerrordialog_error_close": "schließen",
							"uvp_text": "UVP",
							"restart": "Beratung neu starten",
							"stageinpathnavigation_previous": "Zurück",
							"expertview_close": "schließen",
							"uvp": "",
							"comparisontable_showtable": "Zum Vergleich",
							"serviceerrordialog_newsession_button": "Berater neu starten",
							"expertview_open": "öffnen",
							"serviceerrordialog": "",
							"selectiontags_mandatory": "Diese Frage darf nicht unbeantwortet sein - bitte eine andere Antwort auswählen.",
							"expertview_jumpto": "zur Expertenansicht"
						}
					},
					"facets": {
						"facetItems": {
							"occasion": {
								"name": "occasion",
								"type": "DiscreteFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"christmas_push": {
								"name": "christmas_push",
								"type": "BoolFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1.2000000476837158,
								"active": true
							},
							"old_price": {
								"name": "old_price",
								"type": "NumberFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 0,
								"active": true
							},
							"playing_with": {
								"name": "playing_with",
								"type": "DiscreteFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"age_range": {
								"name": "age_range",
								"type": "NumberFacet",
								"multipleSelectable": false,
								"rangeSelection": true,
								"matchWeight": 1,
								"active": true
							},
							"special_occasion": {
								"name": "special_occasion",
								"type": "BoolFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"Price": {
								"name": "Price",
								"type": "NumberFacet",
								"multipleSelectable": false,
								"rangeSelection": true,
								"matchWeight": 3,
								"active": true
							},
							"presentee": {
								"name": "presentee",
								"type": "DiscreteFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"Manufacturer": {
								"name": "Manufacturer",
								"type": "DiscreteFacet",
								"multipleSelectable": true,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"relationship": {
								"name": "relationship",
								"type": "DiscreteFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"category": {
								"name": "category",
								"type": "DiscreteFacet",
								"multipleSelectable": true,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"subcategory": {
								"name": "subcategory",
								"type": "DiscreteFacet",
								"multipleSelectable": true,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"shop_category": {
								"name": "shop_category",
								"type": "DiscreteFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 1,
								"active": true
							},
							"age": {
								"name": "age",
								"type": "OrdinalFacet",
								"multipleSelectable": false,
								"rangeSelection": false,
								"matchWeight": 0,
								"active": true
							}
						}
					},
					"facetGroups": {
						"facetRootGroup": {
							"facetGroupItems": {
								"xcAjaxClient.wizard.Phase3": {
									"facetGroupItems": null,
									"decoration": "",
									"explanation": "",
									"tagItems": [],
									"label": "Interessen",
									"contentItems": {
										"stageInPathNavigationLabel": "Kategorie wählen"
									},
									"type": "STAGE",
									"facetInGroupItems": {
										"xcAjaxClient.wizard.Phase3.category": {
											"labelUnset": "",
											"facetName": "category",
											"decoration": "",
											"longQuestion": "Das Geschenk soll zu diesem Thema passen:",
											"explanation": "",
											"tagItems": [],
											"contentItems": null,
											"label": "",
											"labelAnswer": "",
											"rangeFrom": 0,
											"widgetType": "facet.input.SingleSelectCarousel",
											"facetInGroupStateItems": {
												"extension": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "extension",
													"explanation": null,
													"longLabel": "Passt gut zu ...",
													"active": true,
													"label": "Passt gut zu ...",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"baby_journey": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "baby_journey",
													"explanation": null,
													"longLabel": "Unterwegs",
													"active": true,
													"label": "Unterwegs",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.baby_journey.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"sense": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "sense",
													"explanation": null,
													"longLabel": "Die Entwicklung der Sinne",
													"active": true,
													"label": "Die Entwicklung der Sinne",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.sense.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"steps": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "steps",
													"explanation": null,
													"longLabel": "Die ersten Schritte",
													"active": true,
													"label": "Die ersten Schritte",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.steps.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"riddle": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "riddle",
													"explanation": null,
													"longLabel": "Rätsel Lösen",
													"active": true,
													"label": "Rätsel Lösen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.riddle.contentItems.decoration_image~~de_DE?version=1446823534358"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"outdoor": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "outdoor",
													"explanation": null,
													"longLabel": "Spaß im Freien",
													"active": true,
													"label": "Spaß im Freien",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.outdoor.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"sleep": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "sleep",
													"explanation": null,
													"longLabel": "Glücklich im Schlaf",
													"active": true,
													"label": "Glücklich im Schlaf",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.sleep.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"swimming": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "swimming",
													"explanation": null,
													"longLabel": "Im Schwimmbad",
													"active": true,
													"label": "Im Schwimmbad",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.swimming.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"play_fun": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "play_fun",
													"explanation": null,
													"longLabel": "Spiel & Spaß",
													"active": true,
													"label": "Spiel & Spaß",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.play_fun.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"childrens_room": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "childrens_room",
													"explanation": null,
													"longLabel": "Im Kinderzimmer",
													"active": true,
													"label": "Im Kinderzimmer",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.childrens_room.contentItems.decoration_image~~de_DE?version=1446192821173"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"long_journey": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "long_journey",
													"explanation": null,
													"longLabel": "Für lange Reisen",
													"active": true,
													"label": "Für lange Reisen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.long_journey.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"cooking": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "cooking",
													"explanation": null,
													"longLabel": "Kochen & Backen",
													"active": true,
													"label": "Kochen & Backen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.cooking.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"picknick": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "picknick",
													"explanation": null,
													"longLabel": "Picknick im Park",
													"active": true,
													"label": "Picknick im Park",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.picknick.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"sport": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "sport",
													"explanation": null,
													"longLabel": "Sport Treiben",
													"active": true,
													"label": "Sport Treiben",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.sport.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"tooth": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "tooth",
													"explanation": null,
													"longLabel": "Die ersten Zähne",
													"active": true,
													"label": "Die ersten Zähne",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.category.state.tooth.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"base": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "base",
													"explanation": null,
													"longLabel": "Basis für Erweiterung",
													"active": true,
													"label": "Basis für Erweiterung",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												}
											},
											"name": "xcAjaxClient.wizard.Phase3.category",
											"configItems": {
												"layout": "carouselfacet, carouselfacet--referred",
												"syncCarousel": "true",
												"required": "false"
											},
											"stateWidgetType": "",
											"shortQuestion": "",
											"unit": "",
											"rangeTo": 0
										},
										"xcAjaxClient.wizard.Phase3.subcategory": {
											"labelUnset": "",
											"facetName": "subcategory",
											"decoration": "",
											"longQuestion": "",
											"explanation": "",
											"tagItems": [],
											"contentItems": null,
											"label": "Interessen",
											"labelAnswer": "",
											"rangeFrom": 0,
											"widgetType": "facet.input.MultiSelectCarousel",
											"facetInGroupStateItems": {
												"tv": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "tv",
													"explanation": null,
													"longLabel": "Daddel- & Flimmerkiste",
													"active": true,
													"label": "Daddel- & Flimmerkiste",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.tv.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"tv_journey": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "tv_journey",
													"explanation": null,
													"longLabel": "Daddel- & Flimmerkiste",
													"active": true,
													"label": "Daddel- & Flimmerkiste",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.tv_journey.contentItems.decoration_image~~de_DE?version=1446803368527"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"stories_melodies": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "stories_melodies",
													"explanation": null,
													"longLabel": "Geschichten & Melodien",
													"active": true,
													"label": "Geschichten & Melodien",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.stories_melodies.contentItems.decoration_image~~de_DE?version=1446803368527"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"handcraft": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "handcraft",
													"explanation": null,
													"longLabel": "Basteln & Malen",
													"active": true,
													"label": "Basteln & Malen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.handcraft.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"haba_bullet_lane": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "haba_bullet_lane",
													"explanation": null,
													"longLabel": "Haba Kugelbahn",
													"active": true,
													"label": "Haba Kugelbahn",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"vehicle": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "vehicle",
													"explanation": null,
													"longLabel": "Auf Rädern & Rollen",
													"active": true,
													"label": "Auf Rädern & Rollen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.vehicle.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"eitech_modelling": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "eitech_modelling",
													"explanation": null,
													"longLabel": "Eitech Modelbaukasten",
													"active": true,
													"label": "Eitech Modelbaukasten",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"kids_kitchen": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "kids_kitchen",
													"explanation": null,
													"longLabel": "Kinderküche",
													"active": true,
													"label": "Kinderküche",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"music": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "music",
													"explanation": null,
													"longLabel": "Kleine Musiker",
													"active": true,
													"label": "Kleine Musiker",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.music.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"lego": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "lego",
													"explanation": null,
													"longLabel": "Lego",
													"active": true,
													"label": "Lego",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"romp": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "romp",
													"explanation": null,
													"longLabel": "Klettern & Toben",
													"active": true,
													"label": "Klettern & Toben",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.romp.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"water_fun": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "water_fun",
													"explanation": null,
													"longLabel": "Wasserspaß",
													"active": true,
													"label": "Wasserspaß",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.water_fun.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"screw": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "screw",
													"explanation": null,
													"longLabel": "Bauen & Schrauben",
													"active": true,
													"label": "Bauen & Schrauben",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.screw.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"games": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "games",
													"explanation": null,
													"longLabel": "Gemeinsam spielen",
													"active": true,
													"label": "Gemeinsam spielen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.games.contentItems.decoration_image~~de_DE?version=1446803368527"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"princess": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "princess",
													"explanation": null,
													"longLabel": "Prinzessinnen",
													"active": true,
													"label": "Prinzessinnen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.princess.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"animals": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "animals",
													"explanation": null,
													"longLabel": "Tierwelten",
													"active": true,
													"label": "Tierwelten",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.animals.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"cooking": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "cooking",
													"explanation": null,
													"longLabel": "Küche & Kaufladen",
													"active": true,
													"label": "Küche & Kaufladen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.cooking.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"railway": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "railway",
													"explanation": null,
													"longLabel": "Modellbahnen",
													"active": true,
													"label": "Modellbahnen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"adventurer": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "adventurer",
													"explanation": null,
													"longLabel": "Abenteurer",
													"active": true,
													"label": "Abenteurer",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.adventurer.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"pirates": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "pirates",
													"explanation": null,
													"longLabel": "Ritter & Piraten",
													"active": true,
													"label": "Ritter & Piraten",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.pirates.contentItems.decoration_image~~de_DE?version=1446651703929"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"console": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "console",
													"explanation": null,
													"longLabel": "Konsolen",
													"active": true,
													"label": "Konsolen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"hama_pearls": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "hama_pearls",
													"explanation": null,
													"longLabel": "Hama Bügelperlen",
													"active": true,
													"label": "Hama Bügelperlen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"rucksack": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "rucksack",
													"explanation": null,
													"longLabel": "Mit Sack & Pack",
													"active": true,
													"label": "Mit Sack & Pack",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.rucksack.contentItems.decoration_image~~de_DE?version=1446803368527"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"gardener": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "gardener",
													"explanation": null,
													"longLabel": "Buddeln & Gärtnern",
													"active": true,
													"label": "Buddeln & Gärtnern",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.gardener.contentItems.decoration_image~~de_DE?version=1446459707366"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"educational_games": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "educational_games",
													"explanation": null,
													"longLabel": "Kluge Köpfe",
													"active": true,
													"label": "Kluge Köpfe",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.educational_games.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"toy_shop": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "toy_shop",
													"explanation": null,
													"longLabel": "Kaufladen",
													"active": true,
													"label": "Kaufladen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"books": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "books",
													"explanation": null,
													"longLabel": "Leseratten",
													"active": true,
													"label": "Leseratten",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.books.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"playmobil": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "playmobil",
													"explanation": null,
													"longLabel": "Playmobil",
													"active": true,
													"label": "Playmobil",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"puzzle": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "puzzle",
													"explanation": null,
													"longLabel": "Puzzlen & Knobeln",
													"active": true,
													"label": "Puzzlen & Knobeln",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.puzzle.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"outdoor_toy": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "outdoor_toy",
													"explanation": null,
													"longLabel": "Spielzeug für Draußen",
													"active": true,
													"label": "Spielzeug für Draußen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.outdoor_toy.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"sport": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "sport",
													"explanation": null,
													"longLabel": "Sportskanonen",
													"active": true,
													"label": "Sportskanonen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.sport.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"dolls": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "dolls",
													"explanation": null,
													"longLabel": "Puppenmama",
													"active": true,
													"label": "Puppenmama",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase3.subcategory.state.dolls.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"heros_constructor": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "heros_constructor",
													"explanation": null,
													"longLabel": "HEROS Constructor",
													"active": true,
													"label": "HEROS Constructor",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/no-pic"
													},
													"configItems": null,
													"rangeFrom": 0
												}
											},
											"name": "xcAjaxClient.wizard.Phase3.subcategory",
											"configItems": {
												"layout": "carouselfacet",
												"syncCarousel": "true",
												"required": "false"
											},
											"stateWidgetType": "",
											"shortQuestion": "",
											"unit": "",
											"rangeTo": 0
										}
									},
									"widgetType": "",
									"name": "xcAjaxClient.wizard.Phase3",
									"longLabel": "",
									"active": true,
									"configItems": {
										"state_decoration_template": "decoration.Image19"
									}
								},
								"xcAjaxClient.wizard.Phase2": {
									"facetGroupItems": null,
									"decoration": "",
									"explanation": "",
									"tagItems": [],
									"label": "Anlass",
									"contentItems": {
										"stageInPathNavigationLabel": "Anlass wählen"
									},
									"type": "STAGE",
									"facetInGroupItems": {
										"xcAjaxClient.wizard.Phase2.occasion": {
											"labelUnset": "",
											"facetName": "occasion",
											"decoration": "",
											"longQuestion": "Das Geschenk ist ...",
											"explanation": "",
											"tagItems": [],
											"contentItems": null,
											"label": "",
											"labelAnswer": "",
											"rangeFrom": 0,
											"widgetType": "facet.input.SingleSelectCarousel",
											"facetInGroupStateItems": {
												"birthday": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "birthday",
													"explanation": null,
													"longLabel": "zum Geburtstag",
													"active": true,
													"label": "zum Geburtstag",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.birthday.contentItems.decoration_image~~de_DE?version=1446111660459"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"christening": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "christening",
													"explanation": null,
													"longLabel": "zur Taufe",
													"active": true,
													"label": "zur Taufe",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.christening.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"nicholas": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "nicholas",
													"explanation": null,
													"longLabel": "zu Nikolaus",
													"active": true,
													"label": "zu Nikolaus",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.nicholas.contentItems.decoration_image~~de_DE?version=1446111882614"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"other_occasion": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "other_occasion",
													"explanation": null,
													"longLabel": "ein anderer Anlass",
													"active": true,
													"label": "ein anderer Anlass",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.other_occasion.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"birth": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "birth",
													"explanation": null,
													"longLabel": "zur Geburt",
													"active": true,
													"label": "zur Geburt",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.birth.contentItems.decoration_image~~de_DE?version=1446120500877"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"easter": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "easter",
													"explanation": null,
													"longLabel": "zu Ostern",
													"active": true,
													"label": "zu Ostern",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.easter.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"school_start": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "school_start",
													"explanation": null,
													"longLabel": "zur Einschulung",
													"active": true,
													"label": "zur Einschulung",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.school_start.contentItems.decoration_image~~de_DE?version=1446120545520"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"christmas": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "christmas",
													"explanation": null,
													"longLabel": "zu Weihnachten",
													"active": true,
													"label": "zu Weihnachten",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase2.occasion.state.christmas.contentItems.decoration_image~~de_DE?version=1446111882614"
													},
													"configItems": null,
													"rangeFrom": 0
												}
											},
											"name": "xcAjaxClient.wizard.Phase2.occasion",
											"configItems": {
												"layout": "carouselfacet, carouselfacet--portrait",
												"syncCarousel": "true",
												"required": "false"
											},
											"stateWidgetType": "",
											"shortQuestion": "",
											"unit": "",
											"rangeTo": 0
										}
									},
									"widgetType": "",
									"name": "xcAjaxClient.wizard.Phase2",
									"longLabel": "",
									"active": true,
									"configItems": {
										"state_decoration_template": "decoration.Image10"
									}
								},
								"xcAjaxClient.wizard.Phase1": {
									"facetGroupItems": {
										"xcAjaxClient.wizard.Phase1.age_male": {
											"facetGroupItems": null,
											"decoration": "",
											"explanation": "",
											"tagItems": [],
											"label": "",
											"contentItems": null,
											"type": "DEFAULT",
											"facetInGroupItems": {
												"xcAjaxClient.wizard.Phase1.age_male.age": {
													"labelUnset": "",
													"facetName": "age",
													"decoration": "",
													"longQuestion": "und ist ...",
													"explanation": "",
													"tagItems": [],
													"contentItems": null,
													"label": "",
													"labelAnswer": "",
													"rangeFrom": 0,
													"widgetType": "facet.input.SingleSelectCarousel",
													"facetInGroupStateItems": {
														"0_6_months": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "0_6_months",
															"explanation": null,
															"longLabel": "0 bis 6 Monate",
															"active": true,
															"label": "0 bis 6 Monate",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.0_6_months.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"4_5_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "4_5_years",
															"explanation": null,
															"longLabel": "4 bis 5 Jahre",
															"active": true,
															"label": "4 bis 5 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.4_5_years.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"8_9_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "8_9_years",
															"explanation": null,
															"longLabel": "8 bis 9 Jahre",
															"active": true,
															"label": "8 bis 9 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.8_9_years.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"older_12_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "older_12_years",
															"explanation": null,
															"longLabel": "älter als 12 Jahre",
															"active": true,
															"label": "älter als 12 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.older_12_years.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"2_3_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "2_3_years",
															"explanation": null,
															"longLabel": "2 bis 3 Jahre",
															"active": true,
															"label": "2 bis 3 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.2_3_years.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"7_12_months": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "7_12_months",
															"explanation": null,
															"longLabel": "7 bis 12 Monate",
															"active": true,
															"label": "7 bis 12 Monate",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.7_12_months.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"10_12_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "10_12_years",
															"explanation": null,
															"longLabel": "10 bis 12 Jahre",
															"active": true,
															"label": "10 bis 12 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.10_12_years.contentItems.decoration_image~~de_DE?version=1447344367629"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"13_24_months": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "13_24_months",
															"explanation": null,
															"longLabel": "13 bis 24 Monate",
															"active": true,
															"label": "13 bis 24 Monate",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.13_24_months.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"6_7_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "6_7_years",
															"explanation": null,
															"longLabel": "6 bis 7 Jahre",
															"active": true,
															"label": "6 bis 7 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.age_male.age.state.6_7_years.contentItems.decoration_image~~de_DE?version=1446454550110"
															},
															"configItems": null,
															"rangeFrom": 0
														}
													},
													"name": "xcAjaxClient.wizard.Phase1.age_male.age",
													"configItems": {
														"layout": "carouselfacet",
														"syncCarousel": "true",
														"required": "false"
													},
													"stateWidgetType": "",
													"shortQuestion": "",
													"unit": "",
													"rangeTo": 0
												}
											},
											"widgetType": "",
											"name": "xcAjaxClient.wizard.Phase1.age_male",
											"longLabel": "",
											"active": true,
											"configItems": null
										},
										"xcAjaxClient.wizard.Phase1.age_female": {
											"facetGroupItems": null,
											"decoration": "",
											"explanation": "",
											"tagItems": [],
											"label": "",
											"contentItems": null,
											"type": "DEFAULT",
											"facetInGroupItems": {
												"xcAjaxClient.wizard.Phase1.age_female.age": {
													"labelUnset": "",
													"facetName": "age",
													"decoration": "",
													"longQuestion": "und ist ...",
													"explanation": "",
													"tagItems": [],
													"contentItems": null,
													"label": "",
													"labelAnswer": "",
													"rangeFrom": 0,
													"widgetType": "facet.input.SingleSelectCarousel",
													"facetInGroupStateItems": {
														"0_6_months": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "0_6_months",
															"explanation": null,
															"longLabel": "0 bis 6 Monate",
															"active": true,
															"label": "0 bis 6 Monate",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/0bis6mon"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"4_5_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "4_5_years",
															"explanation": null,
															"longLabel": "4 bis 5 Jahre",
															"active": true,
															"label": "4 bis 5 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-4bis5"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"8_9_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "8_9_years",
															"explanation": null,
															"longLabel": "8 bis 9 Jahre",
															"active": true,
															"label": "8 bis 9 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-8bis9"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"older_12_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "older_12_years",
															"explanation": null,
															"longLabel": "älter als 12 Jahre",
															"active": true,
															"label": "älter als 12 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w_aelter12"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"2_3_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "2_3_years",
															"explanation": null,
															"longLabel": "2 bis 3 Jahre",
															"active": true,
															"label": "2 bis 3 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-2bis3"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"7_12_months": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "7_12_months",
															"explanation": null,
															"longLabel": "7 bis 12 Monate",
															"active": true,
															"label": "7 bis 12 Monate",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-7bis12mon"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"10_12_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "10_12_years",
															"explanation": null,
															"longLabel": "10 bis 12 Jahre",
															"active": true,
															"label": "10 bis 12 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-10bis12"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"13_24_months": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "13_24_months",
															"explanation": null,
															"longLabel": "13 bis 24 Monate",
															"active": true,
															"label": "13 bis 24 Monate",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-13bis24mon"
															},
															"configItems": null,
															"rangeFrom": 0
														},
														"6_7_years": {
															"rangeTo": 0,
															"widgetType": "",
															"displayColor": "",
															"decoration": null,
															"supplementaryLabel": "",
															"name": "6_7_years",
															"explanation": null,
															"longLabel": "6 bis 7 Jahre",
															"active": true,
															"label": "6 bis 7 Jahre",
															"contentItems": {
																"decoration_enabled": "true",
																"decoration_image": "images/app_test/decorationimages/age/w-6bis7"
															},
															"configItems": null,
															"rangeFrom": 0
														}
													},
													"name": "xcAjaxClient.wizard.Phase1.age_female.age",
													"configItems": {
														"layout": "carouselfacet",
														"syncCarousel": "true",
														"required": "false"
													},
													"stateWidgetType": "",
													"shortQuestion": "",
													"unit": "",
													"rangeTo": 0
												}
											},
											"widgetType": "",
											"name": "xcAjaxClient.wizard.Phase1.age_female",
											"longLabel": "",
											"active": true,
											"configItems": null
										}
									},
									"decoration": "",
									"explanation": "",
									"tagItems": [],
									"label": "Kind",
									"contentItems": {
										"stageInPathNavigationLabel": "Kind wählen"
									},
									"type": "STAGE",
									"facetInGroupItems": {
										"xcAjaxClient.wizard.Phase1.relationship": {
											"labelUnset": "",
											"facetName": "relationship",
											"decoration": "",
											"longQuestion": "Das Kind ist ...",
											"explanation": "",
											"tagItems": [],
											"contentItems": null,
											"label": "",
											"labelAnswer": "",
											"rangeFrom": 0,
											"widgetType": "facet.input.SingleSelectCarousel",
											"facetInGroupStateItems": {
												"grandchild_female": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "grandchild_female",
													"explanation": null,
													"longLabel": "meine Enkelin",
													"active": true,
													"label": "meine Enkelin",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.grandchild_female.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"playmate_male": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "playmate_male",
													"explanation": null,
													"longLabel": "ein Spielkamerad",
													"active": true,
													"label": "ein Spielkamerad",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.playmate_male.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"grandchild_male": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "grandchild_male",
													"explanation": null,
													"longLabel": "mein Enkel",
													"active": true,
													"label": "mein Enkel",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.grandchild_male.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"son": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "son",
													"explanation": null,
													"longLabel": "mein Sohn",
													"active": true,
													"label": "mein Sohn",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.son.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"niece": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "niece",
													"explanation": null,
													"longLabel": "meine Nichte",
													"active": true,
													"label": "meine Nichte",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.niece.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"godson": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "godson",
													"explanation": null,
													"longLabel": "mein Patensohn",
													"active": true,
													"label": "mein Patensohn",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.godson.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"goddaughter": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "goddaughter",
													"explanation": null,
													"longLabel": "meine Patentochter",
													"active": true,
													"label": "meine Patentochter",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.goddaughter.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"nephew": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "nephew",
													"explanation": null,
													"longLabel": "mein Neffe",
													"active": true,
													"label": "mein Neffe",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.nephew.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"playmate_female": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "playmate_female",
													"explanation": null,
													"longLabel": "eine Spielkameradin",
													"active": true,
													"label": "eine Spielkameradin",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.playmate_female.contentItems.decoration_image~~de_DE?version=1446111882614"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"other_male": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "other_male",
													"explanation": null,
													"longLabel": "jemand anders",
													"active": true,
													"label": "jemand anders",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/relationship/M_allg"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"daughter": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "daughter",
													"explanation": null,
													"longLabel": "meine Tochter",
													"active": true,
													"label": "meine Tochter",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.relationship.state.daughter.contentItems.decoration_image~~de_DE?version=1446111831671"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"other_female": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "other_female",
													"explanation": null,
													"longLabel": "jemand anderes",
													"active": true,
													"label": "jemand anderes",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "images/app_test/decorationimages/relationship/w_allg"
													},
													"configItems": null,
													"rangeFrom": 0
												}
											},
											"name": "xcAjaxClient.wizard.Phase1.relationship",
											"configItems": {
												"layout": "carouselfacet",
												"syncCarousel": "true",
												"required": "false"
											},
											"stateWidgetType": "",
											"shortQuestion": "",
											"unit": "",
											"rangeTo": 0
										},
										"xcAjaxClient.wizard.Phase1.presentee": {
											"labelUnset": "",
											"facetName": "presentee",
											"decoration": "",
											"longQuestion": "Ich suche ein Geschenk für ...",
											"explanation": "",
											"tagItems": [],
											"contentItems": null,
											"label": "",
											"labelAnswer": "",
											"rangeFrom": 0,
											"widgetType": "facet.input.SingleSelectCarousel",
											"facetInGroupStateItems": {
												"girl": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "girl",
													"explanation": null,
													"longLabel": "ein Mädchen",
													"active": true,
													"label": "ein Mädchen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.presentee.state.girl.contentItems.decoration_image~~de_DE?version=1446039722879"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"family": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "family",
													"explanation": null,
													"longLabel": "die ganze Familie",
													"active": true,
													"label": "die ganze Familie",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.presentee.state.family.contentItems.decoration_image~~de_DE?version=1446111660459"
													},
													"configItems": null,
													"rangeFrom": 0
												},
												"boy": {
													"rangeTo": 0,
													"widgetType": "",
													"displayColor": "",
													"decoration": null,
													"supplementaryLabel": "",
													"name": "boy",
													"explanation": null,
													"longLabel": "einen Jungen",
													"active": true,
													"label": "einen Jungen",
													"contentItems": {
														"decoration_enabled": "true",
														"decoration_image": "_repositoryImages/app_test/i18n.facetGroups.xcAjaxClient.wizard.Phase1.presentee.state.boy.contentItems.decoration_image~~de_DE?version=1446111660459"
													},
													"configItems": null,
													"rangeFrom": 0
												}
											},
											"name": "xcAjaxClient.wizard.Phase1.presentee",
											"configItems": {
												"layout": "carouselfacet",
												"syncCarousel": "true",
												"required": "false"
											},
											"stateWidgetType": "",
											"shortQuestion": "",
											"unit": "",
											"rangeTo": 0
										}
									},
									"widgetType": "",
									"name": "xcAjaxClient.wizard.Phase1",
									"longLabel": "",
									"active": true,
									"configItems": {
										"state_decoration_template": "decoration.Image19"
									}
								},
								"xcAjaxClient.wizard.RecommendationPhase": {
									"facetGroupItems": {
										"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper": {
											"facetGroupItems": {
												"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer": {
													"facetGroupItems": {
														"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1": {
															"facetGroupItems": null,
															"decoration": "",
															"explanation": "",
															"tagItems": [],
															"label": "",
															"contentItems": null,
															"type": "DEFAULT",
															"facetInGroupItems": {
																"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Price": {
																	"labelUnset": "",
																	"facetName": "Price",
																	"decoration": "",
																	"longQuestion": "Preisbereich",
																	"explanation": "",
																	"tagItems": [],
																	"contentItems": null,
																	"label": "Preisbereich",
																	"labelAnswer": "answer",
																	"rangeFrom": 0,
																	"widgetType": "facet.input.RangeSlider",
																	"facetInGroupStateItems": {
																		"170.0": {
																			"rangeTo": 180,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "170.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "170",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 160
																		},
																		"70.0": {
																			"rangeTo": 80,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "70.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "70",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 65
																		},
																		"650.0": {
																			"rangeTo": 660,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "650.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "650",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 640
																		},
																		"90.0": {
																			"rangeTo": 100,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "90.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "90",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 80
																		},
																		"670.0": {
																			"rangeTo": 680,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "670.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "670",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 660
																		},
																		"210.0": {
																			"rangeTo": 220,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "210.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "210",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 200
																		},
																		"50.0": {
																			"rangeTo": 55,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "50.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "50",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 45
																		},
																		"150.0": {
																			"rangeTo": 160,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "150.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "150",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 140
																		},
																		"630.0": {
																			"rangeTo": 640,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "630.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "630",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 620
																		},
																		"710.0": {
																			"rangeTo": 720,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "710.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "710",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 700
																		},
																		"190.0": {
																			"rangeTo": 200,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "190.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "190",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 180
																		},
																		"30.0": {
																			"rangeTo": 35,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "30.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "30",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 27.5
																		},
																		"730.0": {
																			"rangeTo": 740,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "730.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "730",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 720
																		},
																		"230.0": {
																			"rangeTo": 240,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "230.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "230",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 220
																		},
																		"590.0": {
																			"rangeTo": 600,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "590.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "590",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 580
																		},
																		"750.0": {
																			"rangeTo": 760,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "750.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "750",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 740
																		},
																		"290.0": {
																			"rangeTo": 300,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "290.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "290",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 280
																		},
																		"550.0": {
																			"rangeTo": 560,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "550.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "550",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 540
																		},
																		"25.0": {
																			"rangeTo": 27.5,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "25.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "25",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 22.5
																		},
																		"570.0": {
																			"rangeTo": 580,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "570.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "570",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 560
																		},
																		"250.0": {
																			"rangeTo": 260,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "250.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "250",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 240
																		},
																		"530.0": {
																			"rangeTo": 540,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "530.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "530",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 520
																		},
																		"20.0": {
																			"rangeTo": 22.5,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "20.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "20",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 17.5
																		},
																		"270.0": {
																			"rangeTo": 280,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "270.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "270",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 260
																		},
																		"510.0": {
																			"rangeTo": 520,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "510.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "510",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 500
																		},
																		"610.0": {
																			"rangeTo": 620,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "610.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "610",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 600
																		},
																		"130.0": {
																			"rangeTo": 140,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "130.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "130",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 120
																		},
																		"110.0": {
																			"rangeTo": 120,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "110.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "110",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 100
																		},
																		"690.0": {
																			"rangeTo": 700,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "690.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "690",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 680
																		},
																		"450.0": {
																			"rangeTo": 460,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "450.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "450",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 440
																		},
																		"60.0": {
																			"rangeTo": 65,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "60.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "60",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 55
																		},
																		"390.0": {
																			"rangeTo": 400,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "390.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "390",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 380
																		},
																		"40.0": {
																			"rangeTo": 45,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "40.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "40",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 35
																		},
																		"370.0": {
																			"rangeTo": 380,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "370.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "370",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 360
																		},
																		"410.0": {
																			"rangeTo": 420,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "410.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "410",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 400
																		},
																		"430.0": {
																			"rangeTo": 440,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "430.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "430",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 420
																		},
																		"15.0": {
																			"rangeTo": 17.5,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "15.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "15",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 12.5
																		},
																		"310.0": {
																			"rangeTo": 320,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "310.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "310",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 300
																		},
																		"790.0": {
																			"rangeTo": 790,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "790.0",
																			"explanation": "",
																			"longLabel": "790",
																			"active": true,
																			"label": "790",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 780
																		},
																		"770.0": {
																			"rangeTo": 780,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "770.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "770",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 760
																		},
																		"330.0": {
																			"rangeTo": 340,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "330.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "330",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 320
																		},
																		"10.0": {
																			"rangeTo": 12.5,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "10.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "10",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 7.5
																		},
																		"5.0": {
																			"rangeTo": 7.5,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "5.0",
																			"explanation": "",
																			"longLabel": "5",
																			"active": true,
																			"label": "5",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 5
																		},
																		"350.0": {
																			"rangeTo": 360,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "350.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "350",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 340
																		},
																		"470.0": {
																			"rangeTo": 480,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "470.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "470",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 460
																		},
																		"490.0": {
																			"rangeTo": 500,
																			"widgetType": null,
																			"displayColor": null,
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "490.0",
																			"explanation": "",
																			"longLabel": "",
																			"active": true,
																			"label": "490",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 480
																		}
																	},
																	"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Price",
																	"configItems": null,
																	"stateWidgetType": "",
																	"shortQuestion": "",
																	"unit": " EUR",
																	"rangeTo": 800
																},
																"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.playing_with": {
																	"labelUnset": "",
																	"facetName": "playing_with",
																	"decoration": "",
																	"longQuestion": "Wer spielt mit?",
																	"explanation": "",
																	"tagItems": [],
																	"contentItems": null,
																	"label": "",
																	"labelAnswer": "",
																	"rangeFrom": 0,
																	"widgetType": "",
																	"facetInGroupStateItems": {
																		"family": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "family",
																			"explanation": null,
																			"longLabel": "Die ganze Familie",
																			"active": true,
																			"label": "Die ganze Familie",
																			"contentItems": {
																				"decoration_enabled": "true",
																				"decoration_image": "images/app_test/decorationimages/no-pic"
																			},
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"siblings_friends": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "siblings_friends",
																			"explanation": null,
																			"longLabel": "Geschwister & Freunde",
																			"active": true,
																			"label": "Geschwister & Freunde",
																			"contentItems": {
																				"decoration_enabled": "true",
																				"decoration_image": "images/app_test/decorationimages/no-pic"
																			},
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"child": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "child",
																			"explanation": null,
																			"longLabel": "Nur das Kind",
																			"active": true,
																			"label": "Nur das Kind",
																			"contentItems": {
																				"decoration_enabled": "true",
																				"decoration_image": "images/app_test/decorationimages/no-pic"
																			},
																			"configItems": null,
																			"rangeFrom": 0
																		}
																	},
																	"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.playing_with",
																	"configItems": null,
																	"stateWidgetType": "",
																	"shortQuestion": "",
																	"unit": "",
																	"rangeTo": 0
																},
																"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Manufacturer": {
																	"labelUnset": "",
																	"facetName": "Manufacturer",
																	"decoration": "",
																	"longQuestion": "Marken",
																	"explanation": "",
																	"tagItems": [],
																	"contentItems": null,
																	"label": "Marken",
																	"labelAnswer": "answer",
																	"rangeFrom": 0,
																	"widgetType": "input.FilterMultiSelect",
																	"facetInGroupStateItems": {
																		"": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "",
																			"explanation": null,
																			"longLabel": "",
																			"active": true,
																			"label": "",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pirate___Princess": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pirate___Princess",
																			"explanation": null,
																			"longLabel": "Pirate & Princess",
																			"active": true,
																			"label": "Pirate & Princess",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Superman": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Superman",
																			"explanation": null,
																			"longLabel": "Superman",
																			"active": true,
																			"label": "Superman",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEGO": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEGO",
																			"explanation": null,
																			"longLabel": "LEGO",
																			"active": true,
																			"label": "LEGO",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Nintendo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Nintendo",
																			"explanation": null,
																			"longLabel": "Nintendo",
																			"active": true,
																			"label": "Nintendo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SentoSphere": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SentoSphere",
																			"explanation": null,
																			"longLabel": "SentoSphere",
																			"active": true,
																			"label": "SentoSphere",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Tobi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Tobi",
																			"explanation": null,
																			"longLabel": "Tobi",
																			"active": true,
																			"label": "Tobi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mondo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mondo",
																			"explanation": null,
																			"longLabel": "Mondo",
																			"active": true,
																			"label": "Mondo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Stanger": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Stanger",
																			"explanation": null,
																			"longLabel": "Stanger",
																			"active": true,
																			"label": "Stanger",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"priebes": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "priebes",
																			"explanation": null,
																			"longLabel": "priebes",
																			"active": true,
																			"label": "priebes",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Concorde_Home": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Concorde_Home",
																			"explanation": null,
																			"longLabel": "Concorde Home",
																			"active": true,
																			"label": "Concorde Home",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wader": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wader",
																			"explanation": null,
																			"longLabel": "Wader",
																			"active": true,
																			"label": "Wader",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pebaro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pebaro",
																			"explanation": null,
																			"longLabel": "Pebaro",
																			"active": true,
																			"label": "Pebaro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Splash_Toys": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Splash_Toys",
																			"explanation": null,
																			"longLabel": "Splash Toys",
																			"active": true,
																			"label": "Splash Toys",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ministeps": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ministeps",
																			"explanation": null,
																			"longLabel": "ministeps",
																			"active": true,
																			"label": "ministeps",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"edding": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "edding",
																			"explanation": null,
																			"longLabel": "edding",
																			"active": true,
																			"label": "edding",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ESSENZA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ESSENZA",
																			"explanation": null,
																			"longLabel": "ESSENZA",
																			"active": true,
																			"label": "ESSENZA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Alvi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Alvi",
																			"explanation": null,
																			"longLabel": "Alvi",
																			"active": true,
																			"label": "Alvi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Stiga": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Stiga",
																			"explanation": null,
																			"longLabel": "Stiga",
																			"active": true,
																			"label": "Stiga",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Oops": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Oops",
																			"explanation": null,
																			"longLabel": "Oops",
																			"active": true,
																			"label": "Oops",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Die_Maus": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Die_Maus",
																			"explanation": null,
																			"longLabel": "Die Maus",
																			"active": true,
																			"label": "Die Maus",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pelikan": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pelikan",
																			"explanation": null,
																			"longLabel": "Pelikan",
																			"active": true,
																			"label": "Pelikan",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ubisoft": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ubisoft",
																			"explanation": null,
																			"longLabel": "Ubisoft",
																			"active": true,
																			"label": "Ubisoft",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Unsquashable": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Unsquashable",
																			"explanation": null,
																			"longLabel": "Unsquashable",
																			"active": true,
																			"label": "Unsquashable",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Minions": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Minions",
																			"explanation": null,
																			"longLabel": "Minions",
																			"active": true,
																			"label": "Minions",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"WMF": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "WMF",
																			"explanation": null,
																			"longLabel": "WMF",
																			"active": true,
																			"label": "WMF",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"krunk": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "krunk",
																			"explanation": null,
																			"longLabel": "krunk",
																			"active": true,
																			"label": "krunk",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Huch_and_friends": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Huch_and_friends",
																			"explanation": null,
																			"longLabel": "Huch and friends",
																			"active": true,
																			"label": "Huch and friends",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"EverEarth": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "EverEarth",
																			"explanation": null,
																			"longLabel": "EverEarth",
																			"active": true,
																			"label": "EverEarth",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"TVMANIA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "TVMANIA",
																			"explanation": null,
																			"longLabel": "TVMANIA",
																			"active": true,
																			"label": "TVMANIA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Dora": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Dora",
																			"explanation": null,
																			"longLabel": "Dora",
																			"active": true,
																			"label": "Dora",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kettler": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kettler",
																			"explanation": null,
																			"longLabel": "Kettler",
																			"active": true,
																			"label": "Kettler",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Miniland": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Miniland",
																			"explanation": null,
																			"longLabel": "Miniland",
																			"active": true,
																			"label": "Miniland",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Playbox": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Playbox",
																			"explanation": null,
																			"longLabel": "Playbox",
																			"active": true,
																			"label": "Playbox",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bontempi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bontempi",
																			"explanation": null,
																			"longLabel": "Bontempi",
																			"active": true,
																			"label": "Bontempi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"HEIMESS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "HEIMESS",
																			"explanation": null,
																			"longLabel": "HEIMESS",
																			"active": true,
																			"label": "HEIMESS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Diono": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Diono",
																			"explanation": null,
																			"longLabel": "Diono",
																			"active": true,
																			"label": "Diono",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kids_II": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kids_II",
																			"explanation": null,
																			"longLabel": "Kids II",
																			"active": true,
																			"label": "Kids II",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Elmex": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Elmex",
																			"explanation": null,
																			"longLabel": "Elmex",
																			"active": true,
																			"label": "Elmex",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Au_Sycomore": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Au_Sycomore",
																			"explanation": null,
																			"longLabel": "Au Sycomore",
																			"active": true,
																			"label": "Au Sycomore",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"JUMBO_Verlag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "JUMBO_Verlag",
																			"explanation": null,
																			"longLabel": "JUMBO Verlag",
																			"active": true,
																			"label": "JUMBO Verlag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Calafant": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Calafant",
																			"explanation": null,
																			"longLabel": "Calafant",
																			"active": true,
																			"label": "Calafant",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SCOUTY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SCOUTY",
																			"explanation": null,
																			"longLabel": "SCOUTY",
																			"active": true,
																			"label": "SCOUTY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pippi_Langstrumpf": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pippi_Langstrumpf",
																			"explanation": null,
																			"longLabel": "Pippi Langstrumpf",
																			"active": true,
																			"label": "Pippi Langstrumpf",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Jazwares": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Jazwares",
																			"explanation": null,
																			"longLabel": "Jazwares",
																			"active": true,
																			"label": "Jazwares",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kaiser": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kaiser",
																			"explanation": null,
																			"longLabel": "Kaiser",
																			"active": true,
																			"label": "Kaiser",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Peppa_Pig": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Peppa_Pig",
																			"explanation": null,
																			"longLabel": "Peppa Pig",
																			"active": true,
																			"label": "Peppa Pig",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bestway": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bestway",
																			"explanation": null,
																			"longLabel": "Bestway",
																			"active": true,
																			"label": "Bestway",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Dickie": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Dickie",
																			"explanation": null,
																			"longLabel": "Dickie",
																			"active": true,
																			"label": "Dickie",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Heidi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Heidi",
																			"explanation": null,
																			"longLabel": "Heidi",
																			"active": true,
																			"label": "Heidi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"K_the_Kruse": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "K_the_Kruse",
																			"explanation": null,
																			"longLabel": "Käthe Kruse",
																			"active": true,
																			"label": "Käthe Kruse",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Trefl": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Trefl",
																			"explanation": null,
																			"longLabel": "Trefl",
																			"active": true,
																			"label": "Trefl",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Fairies": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Fairies",
																			"explanation": null,
																			"longLabel": "Disney Fairies",
																			"active": true,
																			"label": "Disney Fairies",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Nuby": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Nuby",
																			"explanation": null,
																			"longLabel": "Nuby",
																			"active": true,
																			"label": "Nuby",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"JOY_TOY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "JOY_TOY",
																			"explanation": null,
																			"longLabel": "JOY TOY",
																			"active": true,
																			"label": "JOY TOY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LYRA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LYRA",
																			"explanation": null,
																			"longLabel": "LYRA",
																			"active": true,
																			"label": "LYRA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Majorette": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Majorette",
																			"explanation": null,
																			"longLabel": "Majorette",
																			"active": true,
																			"label": "Majorette",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Roces": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Roces",
																			"explanation": null,
																			"longLabel": "Roces",
																			"active": true,
																			"label": "Roces",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Der_kleine_Maulwurf": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Der_kleine_Maulwurf",
																			"explanation": null,
																			"longLabel": "Der kleine Maulwurf",
																			"active": true,
																			"label": "Der kleine Maulwurf",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Jumbo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Jumbo",
																			"explanation": null,
																			"longLabel": "Jumbo",
																			"active": true,
																			"label": "Jumbo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Days_of_Wonder": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Days_of_Wonder",
																			"explanation": null,
																			"longLabel": "Days of Wonder",
																			"active": true,
																			"label": "Days of Wonder",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pegasus": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pegasus",
																			"explanation": null,
																			"longLabel": "Pegasus",
																			"active": true,
																			"label": "Pegasus",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Quercetti": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Quercetti",
																			"explanation": null,
																			"longLabel": "Quercetti",
																			"active": true,
																			"label": "Quercetti",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"TINTI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "TINTI",
																			"explanation": null,
																			"longLabel": "TINTI",
																			"active": true,
																			"label": "TINTI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Adlung_Spiele": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Adlung_Spiele",
																			"explanation": null,
																			"longLabel": "Adlung Spiele",
																			"active": true,
																			"label": "Adlung Spiele",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney",
																			"explanation": null,
																			"longLabel": "Disney",
																			"active": true,
																			"label": "Disney",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"goki": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "goki",
																			"explanation": null,
																			"longLabel": "goki",
																			"active": true,
																			"label": "goki",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KUKY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KUKY",
																			"explanation": null,
																			"longLabel": "KUKY",
																			"active": true,
																			"label": "KUKY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Funny_Fashion": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Funny_Fashion",
																			"explanation": null,
																			"longLabel": "Funny Fashion",
																			"active": true,
																			"label": "Funny Fashion",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schmidt_Spiele": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schmidt_Spiele",
																			"explanation": null,
																			"longLabel": "Schmidt Spiele",
																			"active": true,
																			"label": "Schmidt Spiele",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Baumhaus_Verlag_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Baumhaus_Verlag_GmbH",
																			"explanation": null,
																			"longLabel": "Baumhaus Verlag GmbH",
																			"active": true,
																			"label": "Baumhaus Verlag GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Beeboo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Beeboo",
																			"explanation": null,
																			"longLabel": "Beeboo",
																			"active": true,
																			"label": "Beeboo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pro_Touch": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pro_Touch",
																			"explanation": null,
																			"longLabel": "Pro Touch",
																			"active": true,
																			"label": "Pro Touch",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Amigo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Amigo",
																			"explanation": null,
																			"longLabel": "Amigo",
																			"active": true,
																			"label": "Amigo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sevi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sevi",
																			"explanation": null,
																			"longLabel": "Sevi",
																			"active": true,
																			"label": "Sevi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bright_Starts": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bright_Starts",
																			"explanation": null,
																			"longLabel": "Bright Starts",
																			"active": true,
																			"label": "Bright Starts",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Smoby": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Smoby",
																			"explanation": null,
																			"longLabel": "Smoby",
																			"active": true,
																			"label": "Smoby",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Playshoes": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Playshoes",
																			"explanation": null,
																			"longLabel": "Playshoes",
																			"active": true,
																			"label": "Playshoes",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Trudi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Trudi",
																			"explanation": null,
																			"longLabel": "Trudi",
																			"active": true,
																			"label": "Trudi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wehncke": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wehncke",
																			"explanation": null,
																			"longLabel": "Wehncke",
																			"active": true,
																			"label": "Wehncke",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"HAPE": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "HAPE",
																			"explanation": null,
																			"longLabel": "HAPE",
																			"active": true,
																			"label": "HAPE",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"difrax": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "difrax",
																			"explanation": null,
																			"longLabel": "difrax",
																			"active": true,
																			"label": "difrax",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Planes": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Planes",
																			"explanation": null,
																			"longLabel": "Disney Planes",
																			"active": true,
																			"label": "Disney Planes",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Dino_Train": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Dino_Train",
																			"explanation": null,
																			"longLabel": "Dino Train",
																			"active": true,
																			"label": "Dino Train",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Goliath": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Goliath",
																			"explanation": null,
																			"longLabel": "Goliath",
																			"active": true,
																			"label": "Goliath",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Talbot_Torro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Talbot_Torro",
																			"explanation": null,
																			"longLabel": "Talbot-Torro",
																			"active": true,
																			"label": "Talbot-Torro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Peg_Perego": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Peg_Perego",
																			"explanation": null,
																			"longLabel": "Peg Perego",
																			"active": true,
																			"label": "Peg Perego",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Eduplay": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Eduplay",
																			"explanation": null,
																			"longLabel": "Eduplay",
																			"active": true,
																			"label": "Eduplay",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"United_Soft_Media": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "United_Soft_Media",
																			"explanation": null,
																			"longLabel": "United Soft Media",
																			"active": true,
																			"label": "United Soft Media",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Epoch_Traumwiesen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Epoch_Traumwiesen",
																			"explanation": null,
																			"longLabel": "Epoch Traumwiesen",
																			"active": true,
																			"label": "Epoch Traumwiesen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pferdefreunde": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pferdefreunde",
																			"explanation": null,
																			"longLabel": "Pferdefreunde",
																			"active": true,
																			"label": "Pferdefreunde",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Be_Be_s_Collection": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Be_Be_s_Collection",
																			"explanation": null,
																			"longLabel": "Be Be s Collection",
																			"active": true,
																			"label": "Be Be s Collection",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Smart_Games": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Smart_Games",
																			"explanation": null,
																			"longLabel": "Smart Games",
																			"active": true,
																			"label": "Smart Games",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"L_ssig": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "L_ssig",
																			"explanation": null,
																			"longLabel": "Lässig",
																			"active": true,
																			"label": "Lässig",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"4UNIQ": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "4UNIQ",
																			"explanation": null,
																			"longLabel": "4UNIQ",
																			"active": true,
																			"label": "4UNIQ",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"NBG_EDV": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "NBG_EDV",
																			"explanation": null,
																			"longLabel": "NBG-EDV",
																			"active": true,
																			"label": "NBG-EDV",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"VANEZZA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "VANEZZA",
																			"explanation": null,
																			"longLabel": "VANEZZA",
																			"active": true,
																			"label": "VANEZZA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wowwee": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wowwee",
																			"explanation": null,
																			"longLabel": "Wowwee",
																			"active": true,
																			"label": "Wowwee",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Vivid": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Vivid",
																			"explanation": null,
																			"longLabel": "Vivid",
																			"active": true,
																			"label": "Vivid",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"easypix": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "easypix",
																			"explanation": null,
																			"longLabel": "easypix",
																			"active": true,
																			"label": "easypix",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEGO_Friends": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEGO_Friends",
																			"explanation": null,
																			"longLabel": "LEGO Friends",
																			"active": true,
																			"label": "LEGO Friends",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Tivola_Publishing_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Tivola_Publishing_GmbH",
																			"explanation": null,
																			"longLabel": "Tivola Publishing GmbH",
																			"active": true,
																			"label": "Tivola Publishing GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BC_kids": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BC_kids",
																			"explanation": null,
																			"longLabel": "BC kids",
																			"active": true,
																			"label": "BC kids",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Leo_Lausemaus": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Leo_Lausemaus",
																			"explanation": null,
																			"longLabel": "Leo Lausemaus",
																			"active": true,
																			"label": "Leo Lausemaus",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ERZI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ERZI",
																			"explanation": null,
																			"longLabel": "ERZI",
																			"active": true,
																			"label": "ERZI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mikasa": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mikasa",
																			"explanation": null,
																			"longLabel": "Mikasa",
																			"active": true,
																			"label": "Mikasa",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Die_wilden_Kerle": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Die_wilden_Kerle",
																			"explanation": null,
																			"longLabel": "Die wilden Kerle",
																			"active": true,
																			"label": "Die wilden Kerle",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Jake_und_die_Nimmerlandpiraten": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Jake_und_die_Nimmerlandpiraten",
																			"explanation": null,
																			"longLabel": "Disney Jake und die Nimmerlandpiraten",
																			"active": true,
																			"label": "Disney Jake und die Nimmerlandpiraten",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LENA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LENA",
																			"explanation": null,
																			"longLabel": "LENA",
																			"active": true,
																			"label": "LENA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Eberhard_Faber": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Eberhard_Faber",
																			"explanation": null,
																			"longLabel": "Eberhard Faber",
																			"active": true,
																			"label": "Eberhard Faber",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Imaginista": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Imaginista",
																			"explanation": null,
																			"longLabel": "Imaginista",
																			"active": true,
																			"label": "Imaginista",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PixelPops": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PixelPops",
																			"explanation": null,
																			"longLabel": "PixelPops",
																			"active": true,
																			"label": "PixelPops",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Scratch": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Scratch",
																			"explanation": null,
																			"longLabel": "Scratch",
																			"active": true,
																			"label": "Scratch",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"STARPLAST": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "STARPLAST",
																			"explanation": null,
																			"longLabel": "STARPLAST",
																			"active": true,
																			"label": "STARPLAST",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Streetsurfing": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Streetsurfing",
																			"explanation": null,
																			"longLabel": "Streetsurfing",
																			"active": true,
																			"label": "Streetsurfing",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"McNeill": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "McNeill",
																			"explanation": null,
																			"longLabel": "McNeill",
																			"active": true,
																			"label": "McNeill",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Spider_Man": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Spider_Man",
																			"explanation": null,
																			"longLabel": "Spider-Man",
																			"active": true,
																			"label": "Spider-Man",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"hauck_Spielwaren": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "hauck_Spielwaren",
																			"explanation": null,
																			"longLabel": "hauck Spielwaren",
																			"active": true,
																			"label": "hauck Spielwaren",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SCOOLI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SCOOLI",
																			"explanation": null,
																			"longLabel": "SCOOLI",
																			"active": true,
																			"label": "SCOOLI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Playgro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Playgro",
																			"explanation": null,
																			"longLabel": "Playgro",
																			"active": true,
																			"label": "Playgro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Princess": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Princess",
																			"explanation": null,
																			"longLabel": "Disney Princess",
																			"active": true,
																			"label": "Disney Princess",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PlayMais": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PlayMais",
																			"explanation": null,
																			"longLabel": "PlayMais",
																			"active": true,
																			"label": "PlayMais",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BIG": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BIG",
																			"explanation": null,
																			"longLabel": "BIG",
																			"active": true,
																			"label": "BIG",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"efco": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "efco",
																			"explanation": null,
																			"longLabel": "efco",
																			"active": true,
																			"label": "efco",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Littlest_Pet_Shop": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Littlest_Pet_Shop",
																			"explanation": null,
																			"longLabel": "Littlest Pet Shop",
																			"active": true,
																			"label": "Littlest Pet Shop",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kiddinx": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kiddinx",
																			"explanation": null,
																			"longLabel": "Kiddinx",
																			"active": true,
																			"label": "Kiddinx",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"dtp_entertainment_AG": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "dtp_entertainment_AG",
																			"explanation": null,
																			"longLabel": "dtp entertainment AG",
																			"active": true,
																			"label": "dtp entertainment AG",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Furby": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Furby",
																			"explanation": null,
																			"longLabel": "Furby",
																			"active": true,
																			"label": "Furby",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Libellud": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Libellud",
																			"explanation": null,
																			"longLabel": "Libellud",
																			"active": true,
																			"label": "Libellud",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Small_Foot": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Small_Foot",
																			"explanation": null,
																			"longLabel": "Small Foot",
																			"active": true,
																			"label": "Small Foot",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"My_little_Pony": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "My_little_Pony",
																			"explanation": null,
																			"longLabel": "My little Pony",
																			"active": true,
																			"label": "My little Pony",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bruder": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bruder",
																			"explanation": null,
																			"longLabel": "Bruder",
																			"active": true,
																			"label": "Bruder",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Revell": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Revell",
																			"explanation": null,
																			"longLabel": "Revell",
																			"active": true,
																			"label": "Revell",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Folia": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Folia",
																			"explanation": null,
																			"longLabel": "Folia",
																			"active": true,
																			"label": "Folia",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"micro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "micro",
																			"explanation": null,
																			"longLabel": "micro",
																			"active": true,
																			"label": "micro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kleiner_roter_Traktor": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kleiner_roter_Traktor",
																			"explanation": null,
																			"longLabel": "Kleiner roter Traktor",
																			"active": true,
																			"label": "Kleiner roter Traktor",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Intex": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Intex",
																			"explanation": null,
																			"longLabel": "Intex",
																			"active": true,
																			"label": "Intex",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"AlpenGaudi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "AlpenGaudi",
																			"explanation": null,
																			"longLabel": "AlpenGaudi",
																			"active": true,
																			"label": "AlpenGaudi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BIOBU": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BIOBU",
																			"explanation": null,
																			"longLabel": "BIOBU",
																			"active": true,
																			"label": "BIOBU",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"UNDERCOVER": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "UNDERCOVER",
																			"explanation": null,
																			"longLabel": "UNDERCOVER",
																			"active": true,
																			"label": "UNDERCOVER",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Universal_Trends": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Universal_Trends",
																			"explanation": null,
																			"longLabel": "Universal Trends",
																			"active": true,
																			"label": "Universal Trends",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"WORLDS_APART": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "WORLDS_APART",
																			"explanation": null,
																			"longLabel": "WORLDS APART",
																			"active": true,
																			"label": "WORLDS APART",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schardt": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schardt",
																			"explanation": null,
																			"longLabel": "Schardt",
																			"active": true,
																			"label": "Schardt",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"HQ": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "HQ",
																			"explanation": null,
																			"longLabel": "HQ",
																			"active": true,
																			"label": "HQ",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Mickey_Mouse___friends": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Mickey_Mouse___friends",
																			"explanation": null,
																			"longLabel": "Disney Mickey Mouse & friends",
																			"active": true,
																			"label": "Disney Mickey Mouse & friends",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hasbro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hasbro",
																			"explanation": null,
																			"longLabel": "Hasbro",
																			"active": true,
																			"label": "Hasbro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"B_ABA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "B_ABA",
																			"explanation": null,
																			"longLabel": "BÉABA",
																			"active": true,
																			"label": "BÉABA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"b_b__jou": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "b_b__jou",
																			"explanation": null,
																			"longLabel": "bébé-jou",
																			"active": true,
																			"label": "bébé-jou",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"The_Toy_Company": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "The_Toy_Company",
																			"explanation": null,
																			"longLabel": "The Toy Company",
																			"active": true,
																			"label": "The Toy Company",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Toy_Fun": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Toy_Fun",
																			"explanation": null,
																			"longLabel": "Toy Fun",
																			"active": true,
																			"label": "Toy Fun",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Carrera": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Carrera",
																			"explanation": null,
																			"longLabel": "Carrera",
																			"active": true,
																			"label": "Carrera",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"L_K": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "L_K",
																			"explanation": null,
																			"longLabel": "LÜK",
																			"active": true,
																			"label": "LÜK",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Microsoft": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Microsoft",
																			"explanation": null,
																			"longLabel": "Microsoft",
																			"active": true,
																			"label": "Microsoft",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Busch": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Busch",
																			"explanation": null,
																			"longLabel": "Busch",
																			"active": true,
																			"label": "Busch",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Etan": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Etan",
																			"explanation": null,
																			"longLabel": "Etan",
																			"active": true,
																			"label": "Etan",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Activision_Blizzard": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Activision_Blizzard",
																			"explanation": null,
																			"longLabel": "Activision Blizzard",
																			"active": true,
																			"label": "Activision Blizzard",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Cars": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Cars",
																			"explanation": null,
																			"longLabel": "Disney Cars",
																			"active": true,
																			"label": "Disney Cars",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Universal": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Universal",
																			"explanation": null,
																			"longLabel": "Universal",
																			"active": true,
																			"label": "Universal",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Edel_Germany_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Edel_Germany_GmbH",
																			"explanation": null,
																			"longLabel": "Edel Germany GmbH",
																			"active": true,
																			"label": "Edel Germany GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Der_Gr_ffelo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Der_Gr_ffelo",
																			"explanation": null,
																			"longLabel": "Der Grüffelo",
																			"active": true,
																			"label": "Der Grüffelo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Coppenrath": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Coppenrath",
																			"explanation": null,
																			"longLabel": "Coppenrath",
																			"active": true,
																			"label": "Coppenrath",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"JOHN": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "JOHN",
																			"explanation": null,
																			"longLabel": "JOHN",
																			"active": true,
																			"label": "JOHN",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Depesche": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Depesche",
																			"explanation": null,
																			"longLabel": "Depesche",
																			"active": true,
																			"label": "Depesche",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"New_Bright": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "New_Bright",
																			"explanation": null,
																			"longLabel": "New Bright",
																			"active": true,
																			"label": "New Bright",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schildkr_t_Funsports": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schildkr_t_Funsports",
																			"explanation": null,
																			"longLabel": "Schildkröt Funsports",
																			"active": true,
																			"label": "Schildkröt Funsports",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bresser": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bresser",
																			"explanation": null,
																			"longLabel": "Bresser",
																			"active": true,
																			"label": "Bresser",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Aqua_Sphere": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Aqua_Sphere",
																			"explanation": null,
																			"longLabel": "Aqua Sphere",
																			"active": true,
																			"label": "Aqua Sphere",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Quadro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Quadro",
																			"explanation": null,
																			"longLabel": "Quadro",
																			"active": true,
																			"label": "Quadro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"D_Arp_je": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "D_Arp_je",
																			"explanation": null,
																			"longLabel": "D Arpèje",
																			"active": true,
																			"label": "D Arpèje",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Eulenspiegel": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Eulenspiegel",
																			"explanation": null,
																			"longLabel": "Eulenspiegel",
																			"active": true,
																			"label": "Eulenspiegel",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Emsa": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Emsa",
																			"explanation": null,
																			"longLabel": "Emsa",
																			"active": true,
																			"label": "Emsa",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"XCite": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "XCite",
																			"explanation": null,
																			"longLabel": "XCite",
																			"active": true,
																			"label": "XCite",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"MAM": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "MAM",
																			"explanation": null,
																			"longLabel": "MAM",
																			"active": true,
																			"label": "MAM",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PIKO": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PIKO",
																			"explanation": null,
																			"longLabel": "PIKO",
																			"active": true,
																			"label": "PIKO",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Stylex": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Stylex",
																			"explanation": null,
																			"longLabel": "Stylex",
																			"active": true,
																			"label": "Stylex",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Universum_Film_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Universum_Film_GmbH",
																			"explanation": null,
																			"longLabel": "Universum Film GmbH",
																			"active": true,
																			"label": "Universum Film GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Gibbon": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Gibbon",
																			"explanation": null,
																			"longLabel": "Gibbon",
																			"active": true,
																			"label": "Gibbon",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hexbug": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hexbug",
																			"explanation": null,
																			"longLabel": "Hexbug",
																			"active": true,
																			"label": "Hexbug",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"TOMY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "TOMY",
																			"explanation": null,
																			"longLabel": "TOMY",
																			"active": true,
																			"label": "TOMY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PEBBLE": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PEBBLE",
																			"explanation": null,
																			"longLabel": "PEBBLE",
																			"active": true,
																			"label": "PEBBLE",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"K2": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "K2",
																			"explanation": null,
																			"longLabel": "K2",
																			"active": true,
																			"label": "K2",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Teenage_Mutant_Ninja_Turtles": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Teenage_Mutant_Ninja_Turtles",
																			"explanation": null,
																			"longLabel": "Teenage Mutant Ninja Turtles",
																			"active": true,
																			"label": "Teenage Mutant Ninja Turtles",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"moses": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "moses",
																			"explanation": null,
																			"longLabel": "moses",
																			"active": true,
																			"label": "moses",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Crazy_Safety": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Crazy_Safety",
																			"explanation": null,
																			"longLabel": "Crazy Safety",
																			"active": true,
																			"label": "Crazy Safety",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"RAVENSBURGER_BUCHVERLAG_und_WESTKA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "RAVENSBURGER_BUCHVERLAG_und_WESTKA",
																			"explanation": null,
																			"longLabel": "RAVENSBURGER BUCHVERLAG und WESTKA",
																			"active": true,
																			"label": "RAVENSBURGER BUCHVERLAG und WESTKA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Abacusspiele": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Abacusspiele",
																			"explanation": null,
																			"longLabel": "Abacusspiele",
																			"active": true,
																			"label": "Abacusspiele",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Felix": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Felix",
																			"explanation": null,
																			"longLabel": "Felix",
																			"active": true,
																			"label": "Felix",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"TOTUM": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "TOTUM",
																			"explanation": null,
																			"longLabel": "TOTUM",
																			"active": true,
																			"label": "TOTUM",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"La_Siesta": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "La_Siesta",
																			"explanation": null,
																			"longLabel": "La Siesta",
																			"active": true,
																			"label": "La Siesta",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hama_Perlen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hama_Perlen",
																			"explanation": null,
																			"longLabel": "Hama Perlen",
																			"active": true,
																			"label": "Hama Perlen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ice_Age": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ice_Age",
																			"explanation": null,
																			"longLabel": "Ice Age",
																			"active": true,
																			"label": "Ice Age",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KiKANiNCHEN": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KiKANiNCHEN",
																			"explanation": null,
																			"longLabel": "KiKANiNCHEN",
																			"active": true,
																			"label": "KiKANiNCHEN",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Lucy_Locket": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Lucy_Locket",
																			"explanation": null,
																			"longLabel": "Lucy Locket",
																			"active": true,
																			"label": "Lucy Locket",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Darda": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Darda",
																			"explanation": null,
																			"longLabel": "Darda",
																			"active": true,
																			"label": "Darda",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"fischertechnik": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "fischertechnik",
																			"explanation": null,
																			"longLabel": "fischertechnik",
																			"active": true,
																			"label": "fischertechnik",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"G_tz": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "G_tz",
																			"explanation": null,
																			"longLabel": "Götz",
																			"active": true,
																			"label": "Götz",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Royalbeach": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Royalbeach",
																			"explanation": null,
																			"longLabel": "Royalbeach",
																			"active": true,
																			"label": "Royalbeach",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Party_Fun": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Party_Fun",
																			"explanation": null,
																			"longLabel": "Party Fun",
																			"active": true,
																			"label": "Party Fun",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"H___H_babyruf": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "H___H_babyruf",
																			"explanation": null,
																			"longLabel": "H + H babyruf",
																			"active": true,
																			"label": "H + H babyruf",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Beluga": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Beluga",
																			"explanation": null,
																			"longLabel": "Beluga",
																			"active": true,
																			"label": "Beluga",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BRIO": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BRIO",
																			"explanation": null,
																			"longLabel": "BRIO",
																			"active": true,
																			"label": "BRIO",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Donic_Schildkr_t": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Donic_Schildkr_t",
																			"explanation": null,
																			"longLabel": "Donic-Schildkröt",
																			"active": true,
																			"label": "Donic-Schildkröt",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Odenw_lder": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Odenw_lder",
																			"explanation": null,
																			"longLabel": "Odenwälder",
																			"active": true,
																			"label": "Odenwälder",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Minecraft": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Minecraft",
																			"explanation": null,
																			"longLabel": "Minecraft",
																			"active": true,
																			"label": "Minecraft",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Gr_tz_Verlag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Gr_tz_Verlag",
																			"explanation": null,
																			"longLabel": "Grätz Verlag",
																			"active": true,
																			"label": "Grätz Verlag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Lilliputiens": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Lilliputiens",
																			"explanation": null,
																			"longLabel": "Lilliputiens",
																			"active": true,
																			"label": "Lilliputiens",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Geoworld": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Geoworld",
																			"explanation": null,
																			"longLabel": "Geoworld",
																			"active": true,
																			"label": "Geoworld",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"F_nf_Freunde": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "F_nf_Freunde",
																			"explanation": null,
																			"longLabel": "Fünf Freunde",
																			"active": true,
																			"label": "Fünf Freunde",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Conni": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Conni",
																			"explanation": null,
																			"longLabel": "Conni",
																			"active": true,
																			"label": "Conni",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Buddy": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Buddy",
																			"explanation": null,
																			"longLabel": "Buddy",
																			"active": true,
																			"label": "Buddy",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Monster_High": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Monster_High",
																			"explanation": null,
																			"longLabel": "Monster High",
																			"active": true,
																			"label": "Monster High",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bike_Fashion": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bike_Fashion",
																			"explanation": null,
																			"longLabel": "Bike Fashion",
																			"active": true,
																			"label": "Bike Fashion",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"MAMMUT_Spiel_und_Geschenk": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "MAMMUT_Spiel_und_Geschenk",
																			"explanation": null,
																			"longLabel": "MAMMUT Spiel und Geschenk",
																			"active": true,
																			"label": "MAMMUT Spiel und Geschenk",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wei_t_Du_eigentlich_wie_lieb_ich_Dich_hab": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wei_t_Du_eigentlich_wie_lieb_ich_Dich_hab",
																			"explanation": null,
																			"longLabel": "Weißt Du eigentlich wie lieb ich Dich hab",
																			"active": true,
																			"label": "Weißt Du eigentlich wie lieb ich Dich hab",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"FIMO": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "FIMO",
																			"explanation": null,
																			"longLabel": "FIMO",
																			"active": true,
																			"label": "FIMO",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Silverlit": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Silverlit",
																			"explanation": null,
																			"longLabel": "Silverlit",
																			"active": true,
																			"label": "Silverlit",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wallaboo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wallaboo",
																			"explanation": null,
																			"longLabel": "Wallaboo",
																			"active": true,
																			"label": "Wallaboo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Sofia_die_Erste": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Sofia_die_Erste",
																			"explanation": null,
																			"longLabel": "Disney Sofia die Erste",
																			"active": true,
																			"label": "Disney Sofia die Erste",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hotex": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hotex",
																			"explanation": null,
																			"longLabel": "Hotex",
																			"active": true,
																			"label": "Hotex",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Deutscher_Fu_ball_Bund": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Deutscher_Fu_ball_Bund",
																			"explanation": null,
																			"longLabel": "Deutscher Fußball-Bund",
																			"active": true,
																			"label": "Deutscher Fußball-Bund",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Die_lieben_Sieben": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Die_lieben_Sieben",
																			"explanation": null,
																			"longLabel": "Die lieben Sieben",
																			"active": true,
																			"label": "Die lieben Sieben",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Idena": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Idena",
																			"explanation": null,
																			"longLabel": "Idena",
																			"active": true,
																			"label": "Idena",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sony_Computer_Entertainment": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sony_Computer_Entertainment",
																			"explanation": null,
																			"longLabel": "Sony Computer Entertainment",
																			"active": true,
																			"label": "Sony Computer Entertainment",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Weleda": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Weleda",
																			"explanation": null,
																			"longLabel": "Weleda",
																			"active": true,
																			"label": "Weleda",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mascha_und_der_B_r": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mascha_und_der_B_r",
																			"explanation": null,
																			"longLabel": "Mascha und der Bär",
																			"active": true,
																			"label": "Mascha und der Bär",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Janosch": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Janosch",
																			"explanation": null,
																			"longLabel": "Janosch",
																			"active": true,
																			"label": "Janosch",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Dragons": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Dragons",
																			"explanation": null,
																			"longLabel": "Dragons",
																			"active": true,
																			"label": "Dragons",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KNORRTOYS_COM": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KNORRTOYS_COM",
																			"explanation": null,
																			"longLabel": "KNORRTOYS.COM",
																			"active": true,
																			"label": "KNORRTOYS.COM",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Konami_Digital_Entertainment": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Konami_Digital_Entertainment",
																			"explanation": null,
																			"longLabel": "Konami Digital Entertainment",
																			"active": true,
																			"label": "Konami Digital Entertainment",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KLEIBER": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KLEIBER",
																			"explanation": null,
																			"longLabel": "KLEIBER",
																			"active": true,
																			"label": "KLEIBER",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"GOWI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "GOWI",
																			"explanation": null,
																			"longLabel": "GOWI",
																			"active": true,
																			"label": "GOWI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Babymoov": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Babymoov",
																			"explanation": null,
																			"longLabel": "Babymoov",
																			"active": true,
																			"label": "Babymoov",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bibi_und_Tina": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bibi_und_Tina",
																			"explanation": null,
																			"longLabel": "Bibi und Tina",
																			"active": true,
																			"label": "Bibi und Tina",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Playgo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Playgo",
																			"explanation": null,
																			"longLabel": "Playgo",
																			"active": true,
																			"label": "Playgo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Snoopy___Die_Peanuts": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Snoopy___Die_Peanuts",
																			"explanation": null,
																			"longLabel": "Snoopy & Die Peanuts",
																			"active": true,
																			"label": "Snoopy & Die Peanuts",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sesamstra_e": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sesamstra_e",
																			"explanation": null,
																			"longLabel": "Sesamstraße",
																			"active": true,
																			"label": "Sesamstraße",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Teufelskicker": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Teufelskicker",
																			"explanation": null,
																			"longLabel": "Teufelskicker",
																			"active": true,
																			"label": "Teufelskicker",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Drache_Kokosnuss": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Drache_Kokosnuss",
																			"explanation": null,
																			"longLabel": "Drache Kokosnuss",
																			"active": true,
																			"label": "Drache Kokosnuss",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Maskworld": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Maskworld",
																			"explanation": null,
																			"longLabel": "Maskworld",
																			"active": true,
																			"label": "Maskworld",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Welly": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Welly",
																			"explanation": null,
																			"longLabel": "Welly",
																			"active": true,
																			"label": "Welly",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_K_nig_der_L_wen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_K_nig_der_L_wen",
																			"explanation": null,
																			"longLabel": "Disney König der Löwen",
																			"active": true,
																			"label": "Disney König der Löwen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Transformers": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Transformers",
																			"explanation": null,
																			"longLabel": "Transformers",
																			"active": true,
																			"label": "Transformers",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Die_drei_Fragezeichen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Die_drei_Fragezeichen",
																			"explanation": null,
																			"longLabel": "Die drei Fragezeichen",
																			"active": true,
																			"label": "Die drei Fragezeichen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hori": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hori",
																			"explanation": null,
																			"longLabel": "Hori",
																			"active": true,
																			"label": "Hori",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schauma": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schauma",
																			"explanation": null,
																			"longLabel": "Schauma",
																			"active": true,
																			"label": "Schauma",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Okiedog": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Okiedog",
																			"explanation": null,
																			"longLabel": "Okiedog",
																			"active": true,
																			"label": "Okiedog",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"No_Rules": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "No_Rules",
																			"explanation": null,
																			"longLabel": "No Rules",
																			"active": true,
																			"label": "No Rules",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LOONEY_TUNES": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LOONEY_TUNES",
																			"explanation": null,
																			"longLabel": "LOONEY TUNES",
																			"active": true,
																			"label": "LOONEY TUNES",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Staedtler": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Staedtler",
																			"explanation": null,
																			"longLabel": "Staedtler",
																			"active": true,
																			"label": "Staedtler",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LAMY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LAMY",
																			"explanation": null,
																			"longLabel": "LAMY",
																			"active": true,
																			"label": "LAMY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Skylanders": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Skylanders",
																			"explanation": null,
																			"longLabel": "Skylanders",
																			"active": true,
																			"label": "Skylanders",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Spielstabil": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Spielstabil",
																			"explanation": null,
																			"longLabel": "Spielstabil",
																			"active": true,
																			"label": "Spielstabil",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Tiny_Love": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Tiny_Love",
																			"explanation": null,
																			"longLabel": "Tiny Love",
																			"active": true,
																			"label": "Tiny Love",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mega_Bleu": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mega_Bleu",
																			"explanation": null,
																			"longLabel": "Mega Bleu",
																			"active": true,
																			"label": "Mega Bleu",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Delta_Children": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Delta_Children",
																			"explanation": null,
																			"longLabel": "Delta Children",
																			"active": true,
																			"label": "Delta Children",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SUNNYSUE": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SUNNYSUE",
																			"explanation": null,
																			"longLabel": "SUNNYSUE",
																			"active": true,
																			"label": "SUNNYSUE",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"MyPaperSet": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "MyPaperSet",
																			"explanation": null,
																			"longLabel": "MyPaperSet",
																			"active": true,
																			"label": "MyPaperSet",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bburago": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bburago",
																			"explanation": null,
																			"longLabel": "Bburago",
																			"active": true,
																			"label": "Bburago",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Rotho_Babydesign": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Rotho_Babydesign",
																			"explanation": null,
																			"longLabel": "Rotho Babydesign",
																			"active": true,
																			"label": "Rotho Babydesign",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Eichhorn": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Eichhorn",
																			"explanation": null,
																			"longLabel": "Eichhorn",
																			"active": true,
																			"label": "Eichhorn",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Frosch": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Frosch",
																			"explanation": null,
																			"longLabel": "Frosch",
																			"active": true,
																			"label": "Frosch",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Powerslide": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Powerslide",
																			"explanation": null,
																			"longLabel": "Powerslide",
																			"active": true,
																			"label": "Powerslide",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"MGA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "MGA",
																			"explanation": null,
																			"longLabel": "MGA",
																			"active": true,
																			"label": "MGA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BAYER": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BAYER",
																			"explanation": null,
																			"longLabel": "BAYER",
																			"active": true,
																			"label": "BAYER",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bella_Sara": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bella_Sara",
																			"explanation": null,
																			"longLabel": "Bella Sara",
																			"active": true,
																			"label": "Bella Sara",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hanni_und_Nanni": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hanni_und_Nanni",
																			"explanation": null,
																			"longLabel": "Hanni und Nanni",
																			"active": true,
																			"label": "Hanni und Nanni",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"beleduc": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "beleduc",
																			"explanation": null,
																			"longLabel": "beleduc",
																			"active": true,
																			"label": "beleduc",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Harry_Potter": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Harry_Potter",
																			"explanation": null,
																			"longLabel": "Harry Potter",
																			"active": true,
																			"label": "Harry Potter",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Castorland": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Castorland",
																			"explanation": null,
																			"longLabel": "Castorland",
																			"active": true,
																			"label": "Castorland",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Lamaze": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Lamaze",
																			"explanation": null,
																			"longLabel": "Lamaze",
																			"active": true,
																			"label": "Lamaze",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Baby_Dan": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Baby_Dan",
																			"explanation": null,
																			"longLabel": "Baby Dan",
																			"active": true,
																			"label": "Baby Dan",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ritter_Rost": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ritter_Rost",
																			"explanation": null,
																			"longLabel": "Ritter Rost",
																			"active": true,
																			"label": "Ritter Rost",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ben_Lee": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ben_Lee",
																			"explanation": null,
																			"longLabel": "Ben Lee",
																			"active": true,
																			"label": "Ben Lee",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Beachtrekker": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Beachtrekker",
																			"explanation": null,
																			"longLabel": "Beachtrekker",
																			"active": true,
																			"label": "Beachtrekker",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"CTI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "CTI",
																			"explanation": null,
																			"longLabel": "CTI",
																			"active": true,
																			"label": "CTI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Emil_Schwenk": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Emil_Schwenk",
																			"explanation": null,
																			"longLabel": "Emil Schwenk",
																			"active": true,
																			"label": "Emil Schwenk",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Olli_Olbot": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Olli_Olbot",
																			"explanation": null,
																			"longLabel": "Olli Olbot",
																			"active": true,
																			"label": "Olli Olbot",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"kbt": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "kbt",
																			"explanation": null,
																			"longLabel": "kbt",
																			"active": true,
																			"label": "kbt",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Nuna": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Nuna",
																			"explanation": null,
																			"longLabel": "Nuna",
																			"active": true,
																			"label": "Nuna",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Vincelot": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Vincelot",
																			"explanation": null,
																			"longLabel": "Vincelot",
																			"active": true,
																			"label": "Vincelot",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ALEX": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ALEX",
																			"explanation": null,
																			"longLabel": "ALEX",
																			"active": true,
																			"label": "ALEX",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Minnie_Mouse": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Minnie_Mouse",
																			"explanation": null,
																			"longLabel": "Disney Minnie Mouse",
																			"active": true,
																			"label": "Disney Minnie Mouse",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Phineas_and_Ferb": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Phineas_and_Ferb",
																			"explanation": null,
																			"longLabel": "Phineas and Ferb",
																			"active": true,
																			"label": "Phineas and Ferb",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Fehn": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Fehn",
																			"explanation": null,
																			"longLabel": "Fehn",
																			"active": true,
																			"label": "Fehn",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Barbie": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Barbie",
																			"explanation": null,
																			"longLabel": "Barbie",
																			"active": true,
																			"label": "Barbie",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schl_mpfe": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schl_mpfe",
																			"explanation": null,
																			"longLabel": "Schlümpfe",
																			"active": true,
																			"label": "Schlümpfe",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Rabe_Socke": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Rabe_Socke",
																			"explanation": null,
																			"longLabel": "Rabe Socke",
																			"active": true,
																			"label": "Rabe Socke",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"teifoc": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "teifoc",
																			"explanation": null,
																			"longLabel": "teifoc",
																			"active": true,
																			"label": "teifoc",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Rubie_s": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Rubie_s",
																			"explanation": null,
																			"longLabel": "Rubie s",
																			"active": true,
																			"label": "Rubie s",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PUKY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PUKY",
																			"explanation": null,
																			"longLabel": "PUKY",
																			"active": true,
																			"label": "PUKY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Tipp_Kick": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Tipp_Kick",
																			"explanation": null,
																			"longLabel": "Tipp-Kick",
																			"active": true,
																			"label": "Tipp-Kick",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Nattou": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Nattou",
																			"explanation": null,
																			"longLabel": "Nattou",
																			"active": true,
																			"label": "Nattou",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Scout": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Scout",
																			"explanation": null,
																			"longLabel": "Scout",
																			"active": true,
																			"label": "Scout",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Avenue_Mandarine": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Avenue_Mandarine",
																			"explanation": null,
																			"longLabel": "Avenue Mandarine",
																			"active": true,
																			"label": "Avenue Mandarine",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Prinzessin_Emmy_und_ihre_Pferde": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Prinzessin_Emmy_und_ihre_Pferde",
																			"explanation": null,
																			"longLabel": "Prinzessin Emmy und ihre Pferde",
																			"active": true,
																			"label": "Prinzessin Emmy und ihre Pferde",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Piatnik": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Piatnik",
																			"explanation": null,
																			"longLabel": "Piatnik",
																			"active": true,
																			"label": "Piatnik",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mattel": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mattel",
																			"explanation": null,
																			"longLabel": "Mattel",
																			"active": true,
																			"label": "Mattel",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Winning_Moves": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Winning_Moves",
																			"explanation": null,
																			"longLabel": "Winning Moves",
																			"active": true,
																			"label": "Winning Moves",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Benjamin_Bl_mchen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Benjamin_Bl_mchen",
																			"explanation": null,
																			"longLabel": "Benjamin Blümchen",
																			"active": true,
																			"label": "Benjamin Blümchen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ESPRIT": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ESPRIT",
																			"explanation": null,
																			"longLabel": "ESPRIT",
																			"active": true,
																			"label": "ESPRIT",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"TKKG": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "TKKG",
																			"explanation": null,
																			"longLabel": "TKKG",
																			"active": true,
																			"label": "TKKG",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"CHIC_2000": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "CHIC_2000",
																			"explanation": null,
																			"longLabel": "CHIC 2000",
																			"active": true,
																			"label": "CHIC 2000",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Famosa": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Famosa",
																			"explanation": null,
																			"longLabel": "Famosa",
																			"active": true,
																			"label": "Famosa",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Skip_Hop": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Skip_Hop",
																			"explanation": null,
																			"longLabel": "Skip Hop",
																			"active": true,
																			"label": "Skip Hop",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sterntaler": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sterntaler",
																			"explanation": null,
																			"longLabel": "Sterntaler",
																			"active": true,
																			"label": "Sterntaler",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Global_Labels": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Global_Labels",
																			"explanation": null,
																			"longLabel": "Global Labels",
																			"active": true,
																			"label": "Global Labels",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"prohobb": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "prohobb",
																			"explanation": null,
																			"longLabel": "prohobb",
																			"active": true,
																			"label": "prohobb",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Doc_McStuffins": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Doc_McStuffins",
																			"explanation": null,
																			"longLabel": "Disney Doc McStuffins",
																			"active": true,
																			"label": "Disney Doc McStuffins",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Electronic_Arts_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Electronic_Arts_GmbH",
																			"explanation": null,
																			"longLabel": "Electronic Arts GmbH",
																			"active": true,
																			"label": "Electronic Arts GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Winnie_Puuh": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Winnie_Puuh",
																			"explanation": null,
																			"longLabel": "Disney Winnie Puuh",
																			"active": true,
																			"label": "Disney Winnie Puuh",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Rainbow_Loom": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Rainbow_Loom",
																			"explanation": null,
																			"longLabel": "Rainbow Loom",
																			"active": true,
																			"label": "Rainbow Loom",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BambinoBike": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BambinoBike",
																			"explanation": null,
																			"longLabel": "BambinoBike",
																			"active": true,
																			"label": "BambinoBike",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pinolino": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pinolino",
																			"explanation": null,
																			"longLabel": "Pinolino",
																			"active": true,
																			"label": "Pinolino",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Madagascar": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Madagascar",
																			"explanation": null,
																			"longLabel": "Madagascar",
																			"active": true,
																			"label": "Madagascar",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Janod": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Janod",
																			"explanation": null,
																			"longLabel": "Janod",
																			"active": true,
																			"label": "Janod",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Medela": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Medela",
																			"explanation": null,
																			"longLabel": "Medela",
																			"active": true,
																			"label": "Medela",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SpongeBob": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SpongeBob",
																			"explanation": null,
																			"longLabel": "SpongeBob",
																			"active": true,
																			"label": "SpongeBob",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Caillou": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Caillou",
																			"explanation": null,
																			"longLabel": "Caillou",
																			"active": true,
																			"label": "Caillou",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Zoch": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Zoch",
																			"explanation": null,
																			"longLabel": "Zoch",
																			"active": true,
																			"label": "Zoch",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"iKON": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "iKON",
																			"explanation": null,
																			"longLabel": "iKON",
																			"active": true,
																			"label": "iKON",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Steiff": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Steiff",
																			"explanation": null,
																			"longLabel": "Steiff",
																			"active": true,
																			"label": "Steiff",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Topstar": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Topstar",
																			"explanation": null,
																			"longLabel": "Topstar",
																			"active": true,
																			"label": "Topstar",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Empeak": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Empeak",
																			"explanation": null,
																			"longLabel": "Empeak",
																			"active": true,
																			"label": "Empeak",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Style_Me_Up": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Style_Me_Up",
																			"explanation": null,
																			"longLabel": "Style Me Up",
																			"active": true,
																			"label": "Style Me Up",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Yookidoo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Yookidoo",
																			"explanation": null,
																			"longLabel": "Yookidoo",
																			"active": true,
																			"label": "Yookidoo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PlushCraft": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PlushCraft",
																			"explanation": null,
																			"longLabel": "PlushCraft",
																			"active": true,
																			"label": "PlushCraft",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kaloo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kaloo",
																			"explanation": null,
																			"longLabel": "Kaloo",
																			"active": true,
																			"label": "Kaloo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Corolle": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Corolle",
																			"explanation": null,
																			"longLabel": "Corolle",
																			"active": true,
																			"label": "Corolle",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BabyBj_rn": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BabyBj_rn",
																			"explanation": null,
																			"longLabel": "BabyBjörn",
																			"active": true,
																			"label": "BabyBjörn",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"_coiffier": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "_coiffier",
																			"explanation": null,
																			"longLabel": "écoiffier",
																			"active": true,
																			"label": "écoiffier",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ABUS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ABUS",
																			"explanation": null,
																			"longLabel": "ABUS",
																			"active": true,
																			"label": "ABUS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ASS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ASS",
																			"explanation": null,
																			"longLabel": "ASS",
																			"active": true,
																			"label": "ASS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Reer": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Reer",
																			"explanation": null,
																			"longLabel": "Reer",
																			"active": true,
																			"label": "Reer",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SIKU": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SIKU",
																			"explanation": null,
																			"longLabel": "SIKU",
																			"active": true,
																			"label": "SIKU",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Biberna": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Biberna",
																			"explanation": null,
																			"longLabel": "Biberna",
																			"active": true,
																			"label": "Biberna",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Geomag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Geomag",
																			"explanation": null,
																			"longLabel": "Geomag",
																			"active": true,
																			"label": "Geomag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Petit_Jour_Paris": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Petit_Jour_Paris",
																			"explanation": null,
																			"longLabel": "Petit Jour Paris",
																			"active": true,
																			"label": "Petit Jour Paris",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Die_Eisk_nigin": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Die_Eisk_nigin",
																			"explanation": null,
																			"longLabel": "Disney Die Eiskönigin",
																			"active": true,
																			"label": "Disney Die Eiskönigin",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Marianplast": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Marianplast",
																			"explanation": null,
																			"longLabel": "Marianplast",
																			"active": true,
																			"label": "Marianplast",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"myToys": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "myToys",
																			"explanation": null,
																			"longLabel": "myToys",
																			"active": true,
																			"label": "myToys",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_DVD": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_DVD",
																			"explanation": null,
																			"longLabel": "Disney DVD",
																			"active": true,
																			"label": "Disney DVD",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Baufix": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Baufix",
																			"explanation": null,
																			"longLabel": "Baufix",
																			"active": true,
																			"label": "Baufix",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Shaun_das_Schaf": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Shaun_das_Schaf",
																			"explanation": null,
																			"longLabel": "Shaun das Schaf",
																			"active": true,
																			"label": "Shaun das Schaf",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Nemmer": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Nemmer",
																			"explanation": null,
																			"longLabel": "Nemmer",
																			"active": true,
																			"label": "Nemmer",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"sigikid": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "sigikid",
																			"explanation": null,
																			"longLabel": "sigikid",
																			"active": true,
																			"label": "sigikid",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sony_Pictures": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sony_Pictures",
																			"explanation": null,
																			"longLabel": "Sony Pictures",
																			"active": true,
																			"label": "Sony Pictures",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Take_2": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Take_2",
																			"explanation": null,
																			"longLabel": "Take 2",
																			"active": true,
																			"label": "Take 2",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"N_rnberger_Spielkarten": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "N_rnberger_Spielkarten",
																			"explanation": null,
																			"longLabel": "Nürnberger Spielkarten",
																			"active": true,
																			"label": "Nürnberger Spielkarten",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Universal_Pictures": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Universal_Pictures",
																			"explanation": null,
																			"longLabel": "Universal Pictures",
																			"active": true,
																			"label": "Universal Pictures",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hello_Kitty": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hello_Kitty",
																			"explanation": null,
																			"longLabel": "Hello Kitty",
																			"active": true,
																			"label": "Hello Kitty",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"McNeill_Sternschnuppe": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "McNeill_Sternschnuppe",
																			"explanation": null,
																			"longLabel": "McNeill Sternschnuppe",
																			"active": true,
																			"label": "McNeill Sternschnuppe",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Larsen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Larsen",
																			"explanation": null,
																			"longLabel": "Larsen",
																			"active": true,
																			"label": "Larsen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"YAKARI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "YAKARI",
																			"explanation": null,
																			"longLabel": "YAKARI",
																			"active": true,
																			"label": "YAKARI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ak_tronic": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ak_tronic",
																			"explanation": null,
																			"longLabel": "ak tronic",
																			"active": true,
																			"label": "ak tronic",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Feuerwehrmann_Sam": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Feuerwehrmann_Sam",
																			"explanation": null,
																			"longLabel": "Feuerwehrmann Sam",
																			"active": true,
																			"label": "Feuerwehrmann Sam",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"CHICCO": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "CHICCO",
																			"explanation": null,
																			"longLabel": "CHICCO",
																			"active": true,
																			"label": "CHICCO",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Cornelsen_Verlag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Cornelsen_Verlag",
																			"explanation": null,
																			"longLabel": "Cornelsen Verlag",
																			"active": true,
																			"label": "Cornelsen Verlag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Marabu": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Marabu",
																			"explanation": null,
																			"longLabel": "Marabu",
																			"active": true,
																			"label": "Marabu",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Lansinoh": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Lansinoh",
																			"explanation": null,
																			"longLabel": "Lansinoh",
																			"active": true,
																			"label": "Lansinoh",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Polesie": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Polesie",
																			"explanation": null,
																			"longLabel": "Polesie",
																			"active": true,
																			"label": "Polesie",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Thomas_und_seine_Freunde": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Thomas_und_seine_Freunde",
																			"explanation": null,
																			"longLabel": "Thomas und seine Freunde",
																			"active": true,
																			"label": "Thomas und seine Freunde",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PENATEN": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PENATEN",
																			"explanation": null,
																			"longLabel": "PENATEN",
																			"active": true,
																			"label": "PENATEN",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"C__KREUL": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "C__KREUL",
																			"explanation": null,
																			"longLabel": "C. KREUL",
																			"active": true,
																			"label": "C. KREUL",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"M_rklin": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "M_rklin",
																			"explanation": null,
																			"longLabel": "Märklin",
																			"active": true,
																			"label": "Märklin",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Adelheid": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Adelheid",
																			"explanation": null,
																			"longLabel": "Adelheid",
																			"active": true,
																			"label": "Adelheid",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Raupe_Nimmersatt": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Raupe_Nimmersatt",
																			"explanation": null,
																			"longLabel": "Raupe Nimmersatt",
																			"active": true,
																			"label": "Raupe Nimmersatt",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Universal_Music_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Universal_Music_GmbH",
																			"explanation": null,
																			"longLabel": "Universal Music GmbH",
																			"active": true,
																			"label": "Universal Music GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Der_kleine_Prinz": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Der_kleine_Prinz",
																			"explanation": null,
																			"longLabel": "Der kleine Prinz",
																			"active": true,
																			"label": "Der kleine Prinz",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Safety_1st": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Safety_1st",
																			"explanation": null,
																			"longLabel": "Safety 1st",
																			"active": true,
																			"label": "Safety 1st",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Prophete": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Prophete",
																			"explanation": null,
																			"longLabel": "Prophete",
																			"active": true,
																			"label": "Prophete",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"School_Mood": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "School_Mood",
																			"explanation": null,
																			"longLabel": "School-Mood",
																			"active": true,
																			"label": "School-Mood",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"4M": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "4M",
																			"explanation": null,
																			"longLabel": "4M",
																			"active": true,
																			"label": "4M",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Outdoor": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Outdoor",
																			"explanation": null,
																			"longLabel": "Outdoor",
																			"active": true,
																			"label": "Outdoor",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KHW": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KHW",
																			"explanation": null,
																			"longLabel": "KHW",
																			"active": true,
																			"label": "KHW",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Peacable_Kingdom": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Peacable_Kingdom",
																			"explanation": null,
																			"longLabel": "Peacable Kingdom",
																			"active": true,
																			"label": "Peacable Kingdom",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"UNITED_LABELS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "UNITED_LABELS",
																			"explanation": null,
																			"longLabel": "UNITED LABELS",
																			"active": true,
																			"label": "UNITED LABELS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Jollein": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Jollein",
																			"explanation": null,
																			"longLabel": "Jollein",
																			"active": true,
																			"label": "Jollein",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Plan_Toys": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Plan_Toys",
																			"explanation": null,
																			"longLabel": "Plan Toys",
																			"active": true,
																			"label": "Plan Toys",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Inter_Link": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Inter_Link",
																			"explanation": null,
																			"longLabel": "Inter Link",
																			"active": true,
																			"label": "Inter Link",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"URSUS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "URSUS",
																			"explanation": null,
																			"longLabel": "URSUS",
																			"active": true,
																			"label": "URSUS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bolz": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bolz",
																			"explanation": null,
																			"longLabel": "Bolz",
																			"active": true,
																			"label": "Bolz",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ty": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ty",
																			"explanation": null,
																			"longLabel": "Ty",
																			"active": true,
																			"label": "Ty",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Herlitz": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Herlitz",
																			"explanation": null,
																			"longLabel": "Herlitz",
																			"active": true,
																			"label": "Herlitz",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Little_Tikes": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Little_Tikes",
																			"explanation": null,
																			"longLabel": "Little Tikes",
																			"active": true,
																			"label": "Little Tikes",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Just_Bridge_Entertainment": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Just_Bridge_Entertainment",
																			"explanation": null,
																			"longLabel": "Just Bridge Entertainment",
																			"active": true,
																			"label": "Just Bridge Entertainment",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"walther": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "walther",
																			"explanation": null,
																			"longLabel": "walther",
																			"active": true,
																			"label": "walther",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ever_After_High": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ever_After_High",
																			"explanation": null,
																			"longLabel": "Ever After High",
																			"active": true,
																			"label": "Ever After High",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEGO_Ninjago": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEGO_Ninjago",
																			"explanation": null,
																			"longLabel": "LEGO Ninjago",
																			"active": true,
																			"label": "LEGO Ninjago",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Slackstar": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Slackstar",
																			"explanation": null,
																			"longLabel": "Slackstar",
																			"active": true,
																			"label": "Slackstar",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Warner_Home_Video": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Warner_Home_Video",
																			"explanation": null,
																			"longLabel": "Warner Home Video",
																			"active": true,
																			"label": "Warner Home Video",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"bigben": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "bigben",
																			"explanation": null,
																			"longLabel": "bigben",
																			"active": true,
																			"label": "bigben",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Decofun": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Decofun",
																			"explanation": null,
																			"longLabel": "Decofun",
																			"active": true,
																			"label": "Decofun",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bob_der_Baumeister": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bob_der_Baumeister",
																			"explanation": null,
																			"longLabel": "Bob der Baumeister",
																			"active": true,
																			"label": "Bob der Baumeister",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kleine_Prinzessin": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kleine_Prinzessin",
																			"explanation": null,
																			"longLabel": "Kleine Prinzessin",
																			"active": true,
																			"label": "Kleine Prinzessin",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mike_der_Ritter": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mike_der_Ritter",
																			"explanation": null,
																			"longLabel": "Mike der Ritter",
																			"active": true,
																			"label": "Mike der Ritter",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Goula": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Goula",
																			"explanation": null,
																			"longLabel": "Goula",
																			"active": true,
																			"label": "Goula",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SONY_BMG_MUSIC": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SONY_BMG_MUSIC",
																			"explanation": null,
																			"longLabel": "SONY BMG MUSIC",
																			"active": true,
																			"label": "SONY BMG MUSIC",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"boon": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "boon",
																			"explanation": null,
																			"longLabel": "boon",
																			"active": true,
																			"label": "boon",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"smarTrike": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "smarTrike",
																			"explanation": null,
																			"longLabel": "smarTrike",
																			"active": true,
																			"label": "smarTrike",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"HiPP": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "HiPP",
																			"explanation": null,
																			"longLabel": "HiPP",
																			"active": true,
																			"label": "HiPP",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Findet_Nemo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Findet_Nemo",
																			"explanation": null,
																			"longLabel": "Disney Findet Nemo",
																			"active": true,
																			"label": "Disney Findet Nemo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Z_llner": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Z_llner",
																			"explanation": null,
																			"longLabel": "Zöllner",
																			"active": true,
																			"label": "Zöllner",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Firefly": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Firefly",
																			"explanation": null,
																			"longLabel": "Firefly",
																			"active": true,
																			"label": "Firefly",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEGO_Legends_of_Chima": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEGO_Legends_of_Chima",
																			"explanation": null,
																			"longLabel": "LEGO Legends of Chima",
																			"active": true,
																			"label": "LEGO Legends of Chima",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Step": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Step",
																			"explanation": null,
																			"longLabel": "Step",
																			"active": true,
																			"label": "Step",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"University_Games": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "University_Games",
																			"explanation": null,
																			"longLabel": "University Games",
																			"active": true,
																			"label": "University Games",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PiP_Studio": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PiP_Studio",
																			"explanation": null,
																			"longLabel": "PiP Studio",
																			"active": true,
																			"label": "PiP Studio",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Giochi_Preziosi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Giochi_Preziosi",
																			"explanation": null,
																			"longLabel": "Giochi Preziosi",
																			"active": true,
																			"label": "Giochi Preziosi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Voggenreiter": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Voggenreiter",
																			"explanation": null,
																			"longLabel": "Voggenreiter",
																			"active": true,
																			"label": "Voggenreiter",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Spiegelburg": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Spiegelburg",
																			"explanation": null,
																			"longLabel": "Spiegelburg",
																			"active": true,
																			"label": "Spiegelburg",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Happy_People": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Happy_People",
																			"explanation": null,
																			"longLabel": "Happy People",
																			"active": true,
																			"label": "Happy People",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Bambi": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Bambi",
																			"explanation": null,
																			"longLabel": "Disney Bambi",
																			"active": true,
																			"label": "Disney Bambi",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"lui_meme": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "lui_meme",
																			"explanation": null,
																			"longLabel": "lui-meme",
																			"active": true,
																			"label": "lui-meme",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pampers": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pampers",
																			"explanation": null,
																			"longLabel": "Pampers",
																			"active": true,
																			"label": "Pampers",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hans_im_Gl_ck": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hans_im_Gl_ck",
																			"explanation": null,
																			"longLabel": "Hans im Glück",
																			"active": true,
																			"label": "Hans im Glück",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Eitech": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Eitech",
																			"explanation": null,
																			"longLabel": "Eitech",
																			"active": true,
																			"label": "Eitech",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Chr__Tanner": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Chr__Tanner",
																			"explanation": null,
																			"longLabel": "Chr. Tanner",
																			"active": true,
																			"label": "Chr. Tanner",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BULLYLAND": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BULLYLAND",
																			"explanation": null,
																			"longLabel": "BULLYLAND",
																			"active": true,
																			"label": "BULLYLAND",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Aquaplay": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Aquaplay",
																			"explanation": null,
																			"longLabel": "Aquaplay",
																			"active": true,
																			"label": "Aquaplay",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEGO_City": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEGO_City",
																			"explanation": null,
																			"longLabel": "LEGO City",
																			"active": true,
																			"label": "LEGO City",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kaufmann": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kaufmann",
																			"explanation": null,
																			"longLabel": "Kaufmann",
																			"active": true,
																			"label": "Kaufmann",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hexe_Lilli": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hexe_Lilli",
																			"explanation": null,
																			"longLabel": "Hexe Lilli",
																			"active": true,
																			"label": "Hexe Lilli",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Zapf_Creation": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Zapf_Creation",
																			"explanation": null,
																			"longLabel": "Zapf Creation",
																			"active": true,
																			"label": "Zapf Creation",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Asmodee": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Asmodee",
																			"explanation": null,
																			"longLabel": "Asmodee",
																			"active": true,
																			"label": "Asmodee",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"TAF_TOYS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "TAF_TOYS",
																			"explanation": null,
																			"longLabel": "TAF TOYS",
																			"active": true,
																			"label": "TAF TOYS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"fischerTiP": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "fischerTiP",
																			"explanation": null,
																			"longLabel": "fischerTiP",
																			"active": true,
																			"label": "fischerTiP",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pettersson_und_Findus": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pettersson_und_Findus",
																			"explanation": null,
																			"longLabel": "Pettersson und Findus",
																			"active": true,
																			"label": "Pettersson und Findus",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Herding": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Herding",
																			"explanation": null,
																			"longLabel": "Herding",
																			"active": true,
																			"label": "Herding",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Geuther": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Geuther",
																			"explanation": null,
																			"longLabel": "Geuther",
																			"active": true,
																			"label": "Geuther",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Flashpoint_AG": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Flashpoint_AG",
																			"explanation": null,
																			"longLabel": "Flashpoint AG",
																			"active": true,
																			"label": "Flashpoint AG",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"AEROBIE": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "AEROBIE",
																			"explanation": null,
																			"longLabel": "AEROBIE",
																			"active": true,
																			"label": "AEROBIE",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Fu_ballverein_FC_Bayern_M_nchen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Fu_ballverein_FC_Bayern_M_nchen",
																			"explanation": null,
																			"longLabel": "Fußballverein FC Bayern München",
																			"active": true,
																			"label": "Fußballverein FC Bayern München",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kosmos": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kosmos",
																			"explanation": null,
																			"longLabel": "Kosmos",
																			"active": true,
																			"label": "Kosmos",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"toitowear": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "toitowear",
																			"explanation": null,
																			"longLabel": "toitowear",
																			"active": true,
																			"label": "toitowear",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Glorex": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Glorex",
																			"explanation": null,
																			"longLabel": "Glorex",
																			"active": true,
																			"label": "Glorex",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEGO_Star_Wars": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEGO_Star_Wars",
																			"explanation": null,
																			"longLabel": "LEGO Star Wars",
																			"active": true,
																			"label": "LEGO Star Wars",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"McKinley": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "McKinley",
																			"explanation": null,
																			"longLabel": "McKinley",
																			"active": true,
																			"label": "McKinley",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wickie": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wickie",
																			"explanation": null,
																			"longLabel": "Wickie",
																			"active": true,
																			"label": "Wickie",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Vtech": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Vtech",
																			"explanation": null,
																			"longLabel": "Vtech",
																			"active": true,
																			"label": "Vtech",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Energetics": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Energetics",
																			"explanation": null,
																			"longLabel": "Energetics",
																			"active": true,
																			"label": "Energetics",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kung_Fu_Panda": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kung_Fu_Panda",
																			"explanation": null,
																			"longLabel": "Kung Fu Panda",
																			"active": true,
																			"label": "Kung Fu Panda",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"uvex": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "uvex",
																			"explanation": null,
																			"longLabel": "uvex",
																			"active": true,
																			"label": "uvex",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Yu_Gi_Oh": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Yu_Gi_Oh",
																			"explanation": null,
																			"longLabel": "Yu-Gi-Oh",
																			"active": true,
																			"label": "Yu-Gi-Oh",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KED_Helmsysteme": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KED_Helmsysteme",
																			"explanation": null,
																			"longLabel": "KED Helmsysteme",
																			"active": true,
																			"label": "KED Helmsysteme",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Carromco": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Carromco",
																			"explanation": null,
																			"longLabel": "Carromco",
																			"active": true,
																			"label": "Carromco",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LEXIBOOK": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LEXIBOOK",
																			"explanation": null,
																			"longLabel": "LEXIBOOK",
																			"active": true,
																			"label": "LEXIBOOK",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Cambrass": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Cambrass",
																			"explanation": null,
																			"longLabel": "Cambrass",
																			"active": true,
																			"label": "Cambrass",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ALPINA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ALPINA",
																			"explanation": null,
																			"longLabel": "ALPINA",
																			"active": true,
																			"label": "ALPINA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"joyPac": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "joyPac",
																			"explanation": null,
																			"longLabel": "joyPac",
																			"active": true,
																			"label": "joyPac",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Nikko": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Nikko",
																			"explanation": null,
																			"longLabel": "Nikko",
																			"active": true,
																			"label": "Nikko",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Fu_ball_Fanartikel": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Fu_ball_Fanartikel",
																			"explanation": null,
																			"longLabel": "Fußball Fanartikel",
																			"active": true,
																			"label": "Fußball Fanartikel",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Drei_Magier_Spiele": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Drei_Magier_Spiele",
																			"explanation": null,
																			"longLabel": "Drei Magier Spiele",
																			"active": true,
																			"label": "Drei Magier Spiele",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wendy": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wendy",
																			"explanation": null,
																			"longLabel": "Wendy",
																			"active": true,
																			"label": "Wendy",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"LaHobba": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "LaHobba",
																			"explanation": null,
																			"longLabel": "LaHobba",
																			"active": true,
																			"label": "LaHobba",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"MEGA_BLOKS": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "MEGA_BLOKS",
																			"explanation": null,
																			"longLabel": "MEGA BLOKS",
																			"active": true,
																			"label": "MEGA BLOKS",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schr_del": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schr_del",
																			"explanation": null,
																			"longLabel": "Schrödel",
																			"active": true,
																			"label": "Schrödel",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Aladine": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Aladine",
																			"explanation": null,
																			"longLabel": "Aladine",
																			"active": true,
																			"label": "Aladine",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Heunec": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Heunec",
																			"explanation": null,
																			"longLabel": "Heunec",
																			"active": true,
																			"label": "Heunec",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Star_Wars": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Star_Wars",
																			"explanation": null,
																			"longLabel": "Star Wars",
																			"active": true,
																			"label": "Star Wars",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Menschenkinder_Verlag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Menschenkinder_Verlag",
																			"explanation": null,
																			"longLabel": "Menschenkinder Verlag",
																			"active": true,
																			"label": "Menschenkinder Verlag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Haba": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Haba",
																			"explanation": null,
																			"longLabel": "Haba",
																			"active": true,
																			"label": "Haba",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Filly": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Filly",
																			"explanation": null,
																			"longLabel": "Filly",
																			"active": true,
																			"label": "Filly",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Marvel_Avengers": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Marvel_Avengers",
																			"explanation": null,
																			"longLabel": "Marvel Avengers",
																			"active": true,
																			"label": "Marvel Avengers",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"K_pt_n_Blaub_r": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "K_pt_n_Blaub_r",
																			"explanation": null,
																			"longLabel": "Käpt n Blaubär",
																			"active": true,
																			"label": "Käpt n Blaubär",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"New_Sports": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "New_Sports",
																			"explanation": null,
																			"longLabel": "New Sports",
																			"active": true,
																			"label": "New Sports",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Clementoni": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Clementoni",
																			"explanation": null,
																			"longLabel": "Clementoni",
																			"active": true,
																			"label": "Clementoni",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"JOLLY": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "JOLLY",
																			"explanation": null,
																			"longLabel": "JOLLY",
																			"active": true,
																			"label": "JOLLY",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KidKraft": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KidKraft",
																			"explanation": null,
																			"longLabel": "KidKraft",
																			"active": true,
																			"label": "KidKraft",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"NICI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "NICI",
																			"explanation": null,
																			"longLabel": "NICI",
																			"active": true,
																			"label": "NICI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Mia_Me": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Mia_Me",
																			"explanation": null,
																			"longLabel": "Mia&Me",
																			"active": true,
																			"label": "Mia&Me",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"The_Walt_Disney_Company": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "The_Walt_Disney_Company",
																			"explanation": null,
																			"longLabel": "The Walt Disney Company",
																			"active": true,
																			"label": "The Walt Disney Company",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Jamara": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Jamara",
																			"explanation": null,
																			"longLabel": "Jamara",
																			"active": true,
																			"label": "Jamara",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Stadlbauer": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Stadlbauer",
																			"explanation": null,
																			"longLabel": "Stadlbauer",
																			"active": true,
																			"label": "Stadlbauer",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"4YOU": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "4YOU",
																			"explanation": null,
																			"longLabel": "4YOU",
																			"active": true,
																			"label": "4YOU",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Dalber": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Dalber",
																			"explanation": null,
																			"longLabel": "Dalber",
																			"active": true,
																			"label": "Dalber",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"NIERMANN": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "NIERMANN",
																			"explanation": null,
																			"longLabel": "NIERMANN",
																			"active": true,
																			"label": "NIERMANN",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Carlsen_Verlag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Carlsen_Verlag",
																			"explanation": null,
																			"longLabel": "Carlsen Verlag",
																			"active": true,
																			"label": "Carlsen Verlag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Barbapapa": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Barbapapa",
																			"explanation": null,
																			"longLabel": "Barbapapa",
																			"active": true,
																			"label": "Barbapapa",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Edu_Toys": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Edu_Toys",
																			"explanation": null,
																			"longLabel": "Edu-Toys",
																			"active": true,
																			"label": "Edu-Toys",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Twentieth_Century_Fox_Home": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Twentieth_Century_Fox_Home",
																			"explanation": null,
																			"longLabel": "Twentieth Century Fox Home",
																			"active": true,
																			"label": "Twentieth Century Fox Home",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Vulli": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Vulli",
																			"explanation": null,
																			"longLabel": "Vulli",
																			"active": true,
																			"label": "Vulli",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Feber": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Feber",
																			"explanation": null,
																			"longLabel": "Feber",
																			"active": true,
																			"label": "Feber",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"candide": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "candide",
																			"explanation": null,
																			"longLabel": "candide",
																			"active": true,
																			"label": "candide",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Tommee_Tippee": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Tommee_Tippee",
																			"explanation": null,
																			"longLabel": "Tommee Tippee",
																			"active": true,
																			"label": "Tommee Tippee",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"X4_TECH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "X4_TECH",
																			"explanation": null,
																			"longLabel": "X4-TECH",
																			"active": true,
																			"label": "X4-TECH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Donkey_Products": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Donkey_Products",
																			"explanation": null,
																			"longLabel": "Donkey Products",
																			"active": true,
																			"label": "Donkey Products",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Stamp": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Stamp",
																			"explanation": null,
																			"longLabel": "Stamp",
																			"active": true,
																			"label": "Stamp",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Jakks_Pacific": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Jakks_Pacific",
																			"explanation": null,
																			"longLabel": "Jakks Pacific",
																			"active": true,
																			"label": "Jakks Pacific",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"NUK": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "NUK",
																			"explanation": null,
																			"longLabel": "NUK",
																			"active": true,
																			"label": "NUK",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Batman": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Batman",
																			"explanation": null,
																			"longLabel": "Batman",
																			"active": true,
																			"label": "Batman",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"David_Fussenegger": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "David_Fussenegger",
																			"explanation": null,
																			"longLabel": "David Fussenegger",
																			"active": true,
																			"label": "David Fussenegger",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Tecnopro": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Tecnopro",
																			"explanation": null,
																			"longLabel": "Tecnopro",
																			"active": true,
																			"label": "Tecnopro",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"suenos": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "suenos",
																			"explanation": null,
																			"longLabel": "suenos",
																			"active": true,
																			"label": "suenos",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SYDERF": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SYDERF",
																			"explanation": null,
																			"longLabel": "SYDERF",
																			"active": true,
																			"label": "SYDERF",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Koch_Media_Deutschland_GmbH": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Koch_Media_Deutschland_GmbH",
																			"explanation": null,
																			"longLabel": "Koch Media Deutschland GmbH",
																			"active": true,
																			"label": "Koch Media Deutschland GmbH",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BuitenSpeel": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BuitenSpeel",
																			"explanation": null,
																			"longLabel": "BuitenSpeel",
																			"active": true,
																			"label": "BuitenSpeel",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Klein": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Klein",
																			"explanation": null,
																			"longLabel": "Klein",
																			"active": true,
																			"label": "Klein",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Roba": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Roba",
																			"explanation": null,
																			"longLabel": "Roba",
																			"active": true,
																			"label": "Roba",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Funny": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Funny",
																			"explanation": null,
																			"longLabel": "Funny",
																			"active": true,
																			"label": "Funny",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Emily_Erdbeer": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Emily_Erdbeer",
																			"explanation": null,
																			"longLabel": "Emily Erdbeer",
																			"active": true,
																			"label": "Emily Erdbeer",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Troll___Toy": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Troll___Toy",
																			"explanation": null,
																			"longLabel": "Troll & Toy",
																			"active": true,
																			"label": "Troll & Toy",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Faber_Castell": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Faber_Castell",
																			"explanation": null,
																			"longLabel": "Faber-Castell",
																			"active": true,
																			"label": "Faber-Castell",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Spin_Master": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Spin_Master",
																			"explanation": null,
																			"longLabel": "Spin Master",
																			"active": true,
																			"label": "Spin Master",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PHILIPS_AVENT": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PHILIPS_AVENT",
																			"explanation": null,
																			"longLabel": "PHILIPS AVENT",
																			"active": true,
																			"label": "PHILIPS AVENT",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"CAUSE": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "CAUSE",
																			"explanation": null,
																			"longLabel": "CAUSE",
																			"active": true,
																			"label": "CAUSE",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Covers___Co_": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Covers___Co_",
																			"explanation": null,
																			"longLabel": "Covers & Co.",
																			"active": true,
																			"label": "Covers & Co.",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sandm_nnchen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sandm_nnchen",
																			"explanation": null,
																			"longLabel": "Sandmännchen",
																			"active": true,
																			"label": "Sandmännchen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sticky_Mosaics": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sticky_Mosaics",
																			"explanation": null,
																			"longLabel": "Sticky Mosaics",
																			"active": true,
																			"label": "Sticky Mosaics",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"CRAZE": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "CRAZE",
																			"explanation": null,
																			"longLabel": "CRAZE",
																			"active": true,
																			"label": "CRAZE",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Gigamic": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Gigamic",
																			"explanation": null,
																			"longLabel": "Gigamic",
																			"active": true,
																			"label": "Gigamic",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Super_Mario": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Super_Mario",
																			"explanation": null,
																			"longLabel": "Super Mario",
																			"active": true,
																			"label": "Super Mario",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Wader_Wozniak": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Wader_Wozniak",
																			"explanation": null,
																			"longLabel": "Wader Wozniak",
																			"active": true,
																			"label": "Wader Wozniak",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bombyx": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bombyx",
																			"explanation": null,
																			"longLabel": "Bombyx",
																			"active": true,
																			"label": "Bombyx",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Marvel_Heroes": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Marvel_Heroes",
																			"explanation": null,
																			"longLabel": "Marvel Heroes",
																			"active": true,
																			"label": "Marvel Heroes",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Repos": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Repos",
																			"explanation": null,
																			"longLabel": "Repos",
																			"active": true,
																			"label": "Repos",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"VADOBAG": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "VADOBAG",
																			"explanation": null,
																			"longLabel": "VADOBAG",
																			"active": true,
																			"label": "VADOBAG",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Roth_Ideen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Roth_Ideen",
																			"explanation": null,
																			"longLabel": "Roth Ideen",
																			"active": true,
																			"label": "Roth Ideen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Der_kleine_K_nig": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Der_kleine_K_nig",
																			"explanation": null,
																			"longLabel": "Der kleine König",
																			"active": true,
																			"label": "Der kleine König",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Stick_n_Style": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Stick_n_Style",
																			"explanation": null,
																			"longLabel": "Stick n Style",
																			"active": true,
																			"label": "Stick n Style",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"BOTI": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "BOTI",
																			"explanation": null,
																			"longLabel": "BOTI",
																			"active": true,
																			"label": "BOTI",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Razor": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Razor",
																			"explanation": null,
																			"longLabel": "Razor",
																			"active": true,
																			"label": "Razor",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Speedminton": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Speedminton",
																			"explanation": null,
																			"longLabel": "Speedminton",
																			"active": true,
																			"label": "Speedminton",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"YooHoo": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "YooHoo",
																			"explanation": null,
																			"longLabel": "YooHoo",
																			"active": true,
																			"label": "YooHoo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Prinzessin_Lillifee": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Prinzessin_Lillifee",
																			"explanation": null,
																			"longLabel": "Prinzessin Lillifee",
																			"active": true,
																			"label": "Prinzessin Lillifee",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hubelino": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hubelino",
																			"explanation": null,
																			"longLabel": "Hubelino",
																			"active": true,
																			"label": "Hubelino",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"STABILO": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "STABILO",
																			"explanation": null,
																			"longLabel": "STABILO",
																			"active": true,
																			"label": "STABILO",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Biene_Maja": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Biene_Maja",
																			"explanation": null,
																			"longLabel": "Biene Maja",
																			"active": true,
																			"label": "Biene Maja",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Kaufmanns": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Kaufmanns",
																			"explanation": null,
																			"longLabel": "Kaufmanns",
																			"active": true,
																			"label": "Kaufmanns",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Bibi_Blocksberg": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Bibi_Blocksberg",
																			"explanation": null,
																			"longLabel": "Bibi Blocksberg",
																			"active": true,
																			"label": "Bibi Blocksberg",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pustefix": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pustefix",
																			"explanation": null,
																			"longLabel": "Pustefix",
																			"active": true,
																			"label": "Pustefix",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Magnetspiele": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Magnetspiele",
																			"explanation": null,
																			"longLabel": "Magnetspiele",
																			"active": true,
																			"label": "Magnetspiele",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Rayher": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Rayher",
																			"explanation": null,
																			"longLabel": "Rayher",
																			"active": true,
																			"label": "Rayher",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"IMC_Toys": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "IMC_Toys",
																			"explanation": null,
																			"longLabel": "IMC Toys",
																			"active": true,
																			"label": "IMC Toys",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"NIVEA": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "NIVEA",
																			"explanation": null,
																			"longLabel": "NIVEA",
																			"active": true,
																			"label": "NIVEA",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Thinkfun": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Thinkfun",
																			"explanation": null,
																			"longLabel": "Thinkfun",
																			"active": true,
																			"label": "Thinkfun",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Falk": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Falk",
																			"explanation": null,
																			"longLabel": "Falk",
																			"active": true,
																			"label": "Falk",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"PLAYMOBIL": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "PLAYMOBIL",
																			"explanation": null,
																			"longLabel": "PLAYMOBIL",
																			"active": true,
																			"label": "PLAYMOBIL",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Heros": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Heros",
																			"explanation": null,
																			"longLabel": "Heros",
																			"active": true,
																			"label": "Heros",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hauck": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hauck",
																			"explanation": null,
																			"longLabel": "Hauck",
																			"active": true,
																			"label": "Hauck",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"SES_Creative": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "SES_Creative",
																			"explanation": null,
																			"longLabel": "SES Creative",
																			"active": true,
																			"label": "SES Creative",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Dracco": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Dracco",
																			"explanation": null,
																			"longLabel": "Dracco",
																			"active": true,
																			"label": "Dracco",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"sanosan": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "sanosan",
																			"explanation": null,
																			"longLabel": "sanosan",
																			"active": true,
																			"label": "sanosan",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Ravensburger": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Ravensburger",
																			"explanation": null,
																			"longLabel": "Ravensburger",
																			"active": true,
																			"label": "Ravensburger",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Disney_Violetta": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Disney_Violetta",
																			"explanation": null,
																			"longLabel": "Disney Violetta",
																			"active": true,
																			"label": "Disney Violetta",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"cloudb": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "cloudb",
																			"explanation": null,
																			"longLabel": "cloudb",
																			"active": true,
																			"label": "cloudb",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"ProType": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "ProType",
																			"explanation": null,
																			"longLabel": "ProType",
																			"active": true,
																			"label": "ProType",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Hudora": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Hudora",
																			"explanation": null,
																			"longLabel": "Hudora",
																			"active": true,
																			"label": "Hudora",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Pritt": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Pritt",
																			"explanation": null,
																			"longLabel": "Pritt",
																			"active": true,
																			"label": "Pritt",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Lutz_Mauder_Verlag": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Lutz_Mauder_Verlag",
																			"explanation": null,
																			"longLabel": "Lutz Mauder Verlag",
																			"active": true,
																			"label": "Lutz Mauder Verlag",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"KSG": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "KSG",
																			"explanation": null,
																			"longLabel": "KSG",
																			"active": true,
																			"label": "KSG",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schleich": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schleich",
																			"explanation": null,
																			"longLabel": "Schleich",
																			"active": true,
																			"label": "Schleich",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Schipper": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Schipper",
																			"explanation": null,
																			"longLabel": "Schipper",
																			"active": true,
																			"label": "Schipper",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"fashy": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "fashy",
																			"explanation": null,
																			"longLabel": "fashy",
																			"active": true,
																			"label": "fashy",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Crayola": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Crayola",
																			"explanation": null,
																			"longLabel": "Crayola",
																			"active": true,
																			"label": "Crayola",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Noris": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Noris",
																			"explanation": null,
																			"longLabel": "Noris",
																			"active": true,
																			"label": "Noris",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Selecta": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Selecta",
																			"explanation": null,
																			"longLabel": "Selecta",
																			"active": true,
																			"label": "Selecta",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Game_Works": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Game_Works",
																			"explanation": null,
																			"longLabel": "Game Works",
																			"active": true,
																			"label": "Game Works",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Simpsons": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Simpsons",
																			"explanation": null,
																			"longLabel": "Simpsons",
																			"active": true,
																			"label": "Simpsons",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Paramount": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Paramount",
																			"explanation": null,
																			"longLabel": "Paramount",
																			"active": true,
																			"label": "Paramount",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Capt_n_Sharky": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Capt_n_Sharky",
																			"explanation": null,
																			"longLabel": "Capt n Sharky",
																			"active": true,
																			"label": "Capt n Sharky",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Take_it_Easy": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Take_it_Easy",
																			"explanation": null,
																			"longLabel": "Take it Easy",
																			"active": true,
																			"label": "Take it Easy",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Amazonas": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Amazonas",
																			"explanation": null,
																			"longLabel": "Amazonas",
																			"active": true,
																			"label": "Amazonas",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Der_kleine_Eisb_r": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Der_kleine_Eisb_r",
																			"explanation": null,
																			"longLabel": "Der kleine Eisbär",
																			"active": true,
																			"label": "Der kleine Eisbär",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Glow2B": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Glow2B",
																			"explanation": null,
																			"longLabel": "Glow2B",
																			"active": true,
																			"label": "Glow2B",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Lauras_Stern": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Lauras_Stern",
																			"explanation": null,
																			"longLabel": "Lauras Stern",
																			"active": true,
																			"label": "Lauras Stern",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Simba": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Simba",
																			"explanation": null,
																			"longLabel": "Simba",
																			"active": true,
																			"label": "Simba",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"P_b_o": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "P_b_o",
																			"explanation": null,
																			"longLabel": "Pébéo",
																			"active": true,
																			"label": "Pébéo",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"B_bchen": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "B_bchen",
																			"explanation": null,
																			"longLabel": "Bübchen",
																			"active": true,
																			"label": "Bübchen",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Limit": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Limit",
																			"explanation": null,
																			"longLabel": "Limit",
																			"active": true,
																			"label": "Limit",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		},
																		"Sorgenfresser": {
																			"rangeTo": 0,
																			"widgetType": "",
																			"displayColor": "",
																			"decoration": null,
																			"supplementaryLabel": "",
																			"name": "Sorgenfresser",
																			"explanation": null,
																			"longLabel": "Sorgenfresser",
																			"active": true,
																			"label": "Sorgenfresser",
																			"contentItems": null,
																			"configItems": null,
																			"rangeFrom": 0
																		}
																	},
																	"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Manufacturer",
																	"configItems": null,
																	"stateWidgetType": "",
																	"shortQuestion": "",
																	"unit": "",
																	"rangeTo": 0
																}
															},
															"widgetType": "",
															"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1",
															"longLabel": "",
															"active": true,
															"configItems": null
														}
													},
													"decoration": "",
													"explanation": "",
													"tagItems": [],
													"label": "",
													"contentItems": null,
													"type": "DEFAULT",
													"facetInGroupItems": null,
													"widgetType": "Explorer",
													"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer",
													"longLabel": "",
													"active": true,
													"configItems": null
												},
												"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.recommendations_wrapper": {
													"facetGroupItems": null,
													"decoration": "",
													"explanation": "",
													"tagItems": [],
													"label": "",
													"contentItems": null,
													"type": "DEFAULT",
													"facetInGroupItems": null,
													"widgetType": "wizard.RecommendationsWrapper",
													"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.recommendations_wrapper",
													"longLabel": "",
													"active": true,
													"configItems": null
												}
											},
											"decoration": "",
											"explanation": "",
											"tagItems": [],
											"label": "Geschenke",
											"contentItems": {
												"stageInPathNavigationLabel": "Jetzt Geschenke anzeigen"
											},
											"type": "STAGE",
											"facetInGroupItems": null,
											"widgetType": "",
											"name": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper",
											"longLabel": "",
											"active": true,
											"configItems": null
										}
									},
									"decoration": "",
									"explanation": "",
									"tagItems": [],
									"label": "",
									"contentItems": null,
									"type": "NESTEDSTAGE",
									"facetInGroupItems": null,
									"widgetType": "wizard.EndGame",
									"name": "xcAjaxClient.wizard.RecommendationPhase",
									"longLabel": "",
									"active": true,
									"configItems": {
										"facetInGroupPath": "false",
										"decoration_template": "None"
									}
								}
							},
							"decoration": "",
							"explanation": "",
							"tagItems": [],
							"label": "",
							"contentItems": {
								"moodImageLabel": "Einfach das passende Geschenk finden"
							},
							"type": "DEFAULT",
							"facetInGroupItems": null,
							"widgetType": "",
							"name": "xcAjaxClient.wizard",
							"longLabel": "",
							"active": true,
							"configItems": {
								"recommendationsChunkSize": "36",
								"selectionTagsShowInvisible": "true"
							}
						}
					},
					"facetVars": {
						"facetVarItems": {
							"occasion": {
								"facetName": "occasion",
								"answered": true,
								"currentValueItems": [
									"christmas"
								],
								"inferredValueItems": null,
								"touched": true
							},
							"christmas_push": {
								"facetName": "christmas_push",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"old_price": {
								"facetName": "old_price",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"playing_with": {
								"facetName": "playing_with",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"age_range": {
								"facetName": "age_range",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"special_occasion": {
								"facetName": "special_occasion",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"Price": {
								"facetName": "Price",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"presentee": {
								"facetName": "presentee",
								"answered": true,
								"currentValueItems": [
									"family"
								],
								"inferredValueItems": null,
								"touched": true
							},
							"Manufacturer": {
								"facetName": "Manufacturer",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"relationship": {
								"facetName": "relationship",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"category": {
								"facetName": "category",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"subcategory": {
								"facetName": "subcategory",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"shop_category": {
								"facetName": "shop_category",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							},
							"age": {
								"facetName": "age",
								"answered": false,
								"currentValueItems": [],
								"inferredValueItems": null,
								"touched": false
							}
						}
					},
					"facetGroupVars": {
						"currentStageInView": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper",
						"nextStageInPath": null,
						"previousStageInPath": "xcAjaxClient.wizard.Phase3",
						"showMoveToNextStage": "no",
						"showMoveToPreviousStage": "yes",
						"facetGroupVarItems": {
							"xcAjaxClient.wizard.Phase3": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.Phase3",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": {
									"xcAjaxClient.wizard.Phase3.category": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"extension": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "extension",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"baby_journey": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "baby_journey",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"sense": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "sense",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"steps": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "steps",
												"matchingProductCount": -1,
												"sequenceNumber": 10
											},
											"riddle": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "riddle",
												"matchingProductCount": -1,
												"sequenceNumber": 13
											},
											"outdoor": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "outdoor",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"sleep": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "sleep",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											},
											"swimming": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "swimming",
												"matchingProductCount": -1,
												"sequenceNumber": 12
											},
											"play_fun": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "play_fun",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"childrens_room": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "childrens_room",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"long_journey": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "long_journey",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"cooking": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "cooking",
												"matchingProductCount": -1,
												"sequenceNumber": 15
											},
											"picknick": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "picknick",
												"matchingProductCount": -1,
												"sequenceNumber": 11
											},
											"sport": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "sport",
												"matchingProductCount": -1,
												"sequenceNumber": 14
											},
											"tooth": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "tooth",
												"matchingProductCount": -1,
												"sequenceNumber": 9
											},
											"base": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "base",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											}
										},
										"visible": true,
										"expanded": true,
										"sequenceNumber": 0,
										"facetInGroupName": "xcAjaxClient.wizard.Phase3.category"
									},
									"xcAjaxClient.wizard.Phase3.subcategory": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"tv": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "tv",
												"matchingProductCount": -1,
												"sequenceNumber": 17
											},
											"tv_journey": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "tv_journey",
												"matchingProductCount": -1,
												"sequenceNumber": 31
											},
											"stories_melodies": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "stories_melodies",
												"matchingProductCount": -1,
												"sequenceNumber": 20
											},
											"handcraft": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "handcraft",
												"matchingProductCount": -1,
												"sequenceNumber": 9
											},
											"haba_bullet_lane": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "haba_bullet_lane",
												"matchingProductCount": -1,
												"sequenceNumber": 26
											},
											"vehicle": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "vehicle",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"eitech_modelling": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "eitech_modelling",
												"matchingProductCount": -1,
												"sequenceNumber": 27
											},
											"kids_kitchen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "kids_kitchen",
												"matchingProductCount": -1,
												"sequenceNumber": 30
											},
											"music": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "music",
												"matchingProductCount": -1,
												"sequenceNumber": 15
											},
											"lego": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "lego",
												"matchingProductCount": -1,
												"sequenceNumber": 24
											},
											"romp": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "romp",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											},
											"water_fun": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "water_fun",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"screw": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "screw",
												"matchingProductCount": -1,
												"sequenceNumber": 10
											},
											"games": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "games",
												"matchingProductCount": -1,
												"sequenceNumber": 19
											},
											"princess": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "princess",
												"matchingProductCount": -1,
												"sequenceNumber": 13
											},
											"animals": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "animals",
												"matchingProductCount": -1,
												"sequenceNumber": 12
											},
											"cooking": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "cooking",
												"matchingProductCount": -1,
												"sequenceNumber": 18
											},
											"railway": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "railway",
												"matchingProductCount": -1,
												"sequenceNumber": 22
											},
											"adventurer": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "adventurer",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"pirates": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "pirates",
												"matchingProductCount": -1,
												"sequenceNumber": 11
											},
											"console": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "console",
												"matchingProductCount": -1,
												"sequenceNumber": 23
											},
											"hama_pearls": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "hama_pearls",
												"matchingProductCount": -1,
												"sequenceNumber": 29
											},
											"rucksack": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "rucksack",
												"matchingProductCount": -1,
												"sequenceNumber": 21
											},
											"gardener": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "gardener",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											},
											"educational_games": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "educational_games",
												"matchingProductCount": -1,
												"sequenceNumber": 14
											},
											"toy_shop": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "toy_shop",
												"matchingProductCount": -1,
												"sequenceNumber": 32
											},
											"books": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "books",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"playmobil": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "playmobil",
												"matchingProductCount": -1,
												"sequenceNumber": 25
											},
											"puzzle": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "puzzle",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"outdoor_toy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "outdoor_toy",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"sport": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "sport",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"dolls": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "dolls",
												"matchingProductCount": -1,
												"sequenceNumber": 16
											},
											"heros_constructor": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "heros_constructor",
												"matchingProductCount": -1,
												"sequenceNumber": 28
											}
										},
										"visible": false,
										"expanded": true,
										"sequenceNumber": 1,
										"facetInGroupName": "xcAjaxClient.wizard.Phase3.subcategory"
									}
								},
								"expanded": true,
								"sequenceNumber": 2,
								"completed": true
							},
							"xcAjaxClient": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": null,
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard.Phase2": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.Phase2",
								"inPath": true,
								"wasInView": true,
								"facetInGroupVarItems": {
									"xcAjaxClient.wizard.Phase2.occasion": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"birthday": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "birthday",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"christening": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "christening",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"nicholas": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "nicholas",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"other_occasion": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "other_occasion",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"birth": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "birth",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"easter": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "easter",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											},
											"school_start": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "school_start",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"christmas": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "christmas",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											}
										},
										"visible": true,
										"expanded": true,
										"sequenceNumber": 0,
										"facetInGroupName": "xcAjaxClient.wizard.Phase2.occasion"
									}
								},
								"expanded": true,
								"sequenceNumber": 1,
								"completed": true
							},
							"xcAjaxClient.wizard.Phase1": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.Phase1",
								"inPath": true,
								"wasInView": true,
								"facetInGroupVarItems": {
									"xcAjaxClient.wizard.Phase1.relationship": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"grandchild_female": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "grandchild_female",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"playmate_male": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "playmate_male",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"grandchild_male": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "grandchild_male",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"son": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "son",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											},
											"niece": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "niece",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"godson": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "godson",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"goddaughter": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "goddaughter",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											},
											"nephew": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "nephew",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"playmate_female": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "playmate_female",
												"matchingProductCount": -1,
												"sequenceNumber": 9
											},
											"other_male": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "other_male",
												"matchingProductCount": -1,
												"sequenceNumber": 10
											},
											"daughter": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "daughter",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"other_female": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "other_female",
												"matchingProductCount": -1,
												"sequenceNumber": 11
											}
										},
										"visible": false,
										"expanded": true,
										"sequenceNumber": 1,
										"facetInGroupName": "xcAjaxClient.wizard.Phase1.relationship"
									},
									"xcAjaxClient.wizard.Phase1.presentee": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"girl": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "girl",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"family": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "family",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"boy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "boy",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											}
										},
										"visible": true,
										"expanded": true,
										"sequenceNumber": 0,
										"facetInGroupName": "xcAjaxClient.wizard.Phase1.presentee"
									}
								},
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard.Phase1.age_male": {
								"enabled": true,
								"inView": false,
								"visible": false,
								"wasVisible": false,
								"facetGroupName": "xcAjaxClient.wizard.Phase1.age_male",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": {
									"xcAjaxClient.wizard.Phase1.age_male.age": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"0_6_months": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "0_6_months",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"4_5_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "4_5_years",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"8_9_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "8_9_years",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"older_12_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "older_12_years",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"2_3_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "2_3_years",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											},
											"7_12_months": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "7_12_months",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"10_12_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "10_12_years",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"13_24_months": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "13_24_months",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"6_7_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "6_7_years",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											}
										},
										"visible": false,
										"expanded": true,
										"sequenceNumber": 0,
										"facetInGroupName": "xcAjaxClient.wizard.Phase1.age_male.age"
									}
								},
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": {
									"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Price": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"170.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "170.0",
												"matchingProductCount": -1,
												"sequenceNumber": 14
											},
											"70.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "70.0",
												"matchingProductCount": -1,
												"sequenceNumber": 9
											},
											"650.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "650.0",
												"matchingProductCount": -1,
												"sequenceNumber": 38
											},
											"90.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "90.0",
												"matchingProductCount": -1,
												"sequenceNumber": 10
											},
											"670.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "670.0",
												"matchingProductCount": -1,
												"sequenceNumber": 39
											},
											"210.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "210.0",
												"matchingProductCount": -1,
												"sequenceNumber": 16
											},
											"50.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "50.0",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"150.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "150.0",
												"matchingProductCount": -1,
												"sequenceNumber": 13
											},
											"630.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "630.0",
												"matchingProductCount": -1,
												"sequenceNumber": 37
											},
											"710.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "710.0",
												"matchingProductCount": -1,
												"sequenceNumber": 41
											},
											"190.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "190.0",
												"matchingProductCount": -1,
												"sequenceNumber": 15
											},
											"30.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "30.0",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											},
											"730.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "730.0",
												"matchingProductCount": -1,
												"sequenceNumber": 42
											},
											"230.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "230.0",
												"matchingProductCount": -1,
												"sequenceNumber": 17
											},
											"590.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "590.0",
												"matchingProductCount": -1,
												"sequenceNumber": 35
											},
											"750.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "750.0",
												"matchingProductCount": -1,
												"sequenceNumber": 43
											},
											"290.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "290.0",
												"matchingProductCount": -1,
												"sequenceNumber": 20
											},
											"550.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "550.0",
												"matchingProductCount": -1,
												"sequenceNumber": 33
											},
											"25.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "25.0",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"570.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "570.0",
												"matchingProductCount": -1,
												"sequenceNumber": 34
											},
											"250.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "250.0",
												"matchingProductCount": -1,
												"sequenceNumber": 18
											},
											"530.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "530.0",
												"matchingProductCount": -1,
												"sequenceNumber": 32
											},
											"20.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "20.0",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											},
											"270.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "270.0",
												"matchingProductCount": -1,
												"sequenceNumber": 19
											},
											"510.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "510.0",
												"matchingProductCount": -1,
												"sequenceNumber": 31
											},
											"610.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "610.0",
												"matchingProductCount": -1,
												"sequenceNumber": 36
											},
											"130.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "130.0",
												"matchingProductCount": -1,
												"sequenceNumber": 12
											},
											"110.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "110.0",
												"matchingProductCount": -1,
												"sequenceNumber": 11
											},
											"690.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "690.0",
												"matchingProductCount": -1,
												"sequenceNumber": 40
											},
											"450.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "450.0",
												"matchingProductCount": -1,
												"sequenceNumber": 28
											},
											"60.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "60.0",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"390.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "390.0",
												"matchingProductCount": -1,
												"sequenceNumber": 25
											},
											"40.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "40.0",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"370.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "370.0",
												"matchingProductCount": -1,
												"sequenceNumber": 24
											},
											"410.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "410.0",
												"matchingProductCount": -1,
												"sequenceNumber": 26
											},
											"430.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "430.0",
												"matchingProductCount": -1,
												"sequenceNumber": 27
											},
											"15.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "15.0",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"310.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "310.0",
												"matchingProductCount": -1,
												"sequenceNumber": 21
											},
											"790.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "790.0",
												"matchingProductCount": -1,
												"sequenceNumber": 45
											},
											"770.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "770.0",
												"matchingProductCount": -1,
												"sequenceNumber": 44
											},
											"330.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "330.0",
												"matchingProductCount": -1,
												"sequenceNumber": 22
											},
											"10.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "10.0",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"5.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "5.0",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"350.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "350.0",
												"matchingProductCount": -1,
												"sequenceNumber": 23
											},
											"470.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "470.0",
												"matchingProductCount": -1,
												"sequenceNumber": 29
											},
											"490.0": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "490.0",
												"matchingProductCount": -1,
												"sequenceNumber": 30
											}
										},
										"visible": true,
										"expanded": true,
										"sequenceNumber": 0,
										"facetInGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Price"
									},
									"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.playing_with": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"family": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "family",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"siblings_friends": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "siblings_friends",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"child": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "child",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											}
										},
										"visible": false,
										"expanded": true,
										"sequenceNumber": 1,
										"facetInGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.playing_with"
									},
									"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Manufacturer": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"Pirate___Princess": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pirate___Princess",
												"matchingProductCount": -1,
												"sequenceNumber": 387
											},
											"Superman": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Superman",
												"matchingProductCount": -1,
												"sequenceNumber": 492
											},
											"LEGO": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEGO",
												"matchingProductCount": -1,
												"sequenceNumber": 288
											},
											"Nintendo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Nintendo",
												"matchingProductCount": -1,
												"sequenceNumber": 352
											},
											"SentoSphere": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SentoSphere",
												"matchingProductCount": -1,
												"sequenceNumber": 445
											},
											"Tobi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Tobi",
												"matchingProductCount": -1,
												"sequenceNumber": 512
											},
											"Mondo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Mondo",
												"matchingProductCount": -1,
												"sequenceNumber": 338
											},
											"Stanger": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Stanger",
												"matchingProductCount": -1,
												"sequenceNumber": 478
											},
											"priebes": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "priebes",
												"matchingProductCount": -1,
												"sequenceNumber": 399
											},
											"Concorde_Home": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Concorde_Home",
												"matchingProductCount": -1,
												"sequenceNumber": 86
											},
											"Wader": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Wader",
												"matchingProductCount": -1,
												"sequenceNumber": 546
											},
											"Pebaro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pebaro",
												"matchingProductCount": -1,
												"sequenceNumber": 369
											},
											"Splash_Toys": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Splash_Toys",
												"matchingProductCount": -1,
												"sequenceNumber": 472
											},
											"ministeps": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ministeps",
												"matchingProductCount": -1,
												"sequenceNumber": 337
											},
											"edding": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "edding",
												"matchingProductCount": -1,
												"sequenceNumber": 146
											},
											"ESSENZA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ESSENZA",
												"matchingProductCount": -1,
												"sequenceNumber": 163
											},
											"Alvi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Alvi",
												"matchingProductCount": -1,
												"sequenceNumber": 15
											},
											"Stiga": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Stiga",
												"matchingProductCount": -1,
												"sequenceNumber": 486
											},
											"Oops": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Oops",
												"matchingProductCount": -1,
												"sequenceNumber": 363
											},
											"Die_Maus": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Die_Maus",
												"matchingProductCount": -1,
												"sequenceNumber": 113
											},
											"Pelikan": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pelikan",
												"matchingProductCount": -1,
												"sequenceNumber": 374
											},
											"Ubisoft": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Ubisoft",
												"matchingProductCount": -1,
												"sequenceNumber": 526
											},
											"Unsquashable": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Unsquashable",
												"matchingProductCount": -1,
												"sequenceNumber": 536
											},
											"Minions": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Minions",
												"matchingProductCount": -1,
												"sequenceNumber": 336
											},
											"WMF": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "WMF",
												"matchingProductCount": -1,
												"sequenceNumber": 558
											},
											"krunk": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "krunk",
												"matchingProductCount": -1,
												"sequenceNumber": 276
											},
											"Huch_and_friends": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Huch_and_friends",
												"matchingProductCount": -1,
												"sequenceNumber": 231
											},
											"EverEarth": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "EverEarth",
												"matchingProductCount": -1,
												"sequenceNumber": 167
											},
											"TVMANIA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "TVMANIA",
												"matchingProductCount": -1,
												"sequenceNumber": 523
											},
											"Dora": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Dora",
												"matchingProductCount": -1,
												"sequenceNumber": 137
											},
											"Kettler": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kettler",
												"matchingProductCount": -1,
												"sequenceNumber": 262
											},
											"Miniland": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Miniland",
												"matchingProductCount": -1,
												"sequenceNumber": 335
											},
											"Playbox": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Playbox",
												"matchingProductCount": -1,
												"sequenceNumber": 390
											},
											"Bontempi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bontempi",
												"matchingProductCount": -1,
												"sequenceNumber": 58
											},
											"HEIMESS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "HEIMESS",
												"matchingProductCount": -1,
												"sequenceNumber": 218
											},
											"Diono": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Diono",
												"matchingProductCount": -1,
												"sequenceNumber": 117
											},
											"Kids_II": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kids_II",
												"matchingProductCount": -1,
												"sequenceNumber": 266
											},
											"Elmex": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Elmex",
												"matchingProductCount": -1,
												"sequenceNumber": 154
											},
											"Au_Sycomore": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Au_Sycomore",
												"matchingProductCount": -1,
												"sequenceNumber": 22
											},
											"JUMBO_Verlag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "JUMBO_Verlag",
												"matchingProductCount": -1,
												"sequenceNumber": 251
											},
											"Calafant": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Calafant",
												"matchingProductCount": -1,
												"sequenceNumber": 72
											},
											"SCOUTY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SCOUTY",
												"matchingProductCount": -1,
												"sequenceNumber": 442
											},
											"Pippi_Langstrumpf": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pippi_Langstrumpf",
												"matchingProductCount": -1,
												"sequenceNumber": 385
											},
											"Jazwares": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Jazwares",
												"matchingProductCount": -1,
												"sequenceNumber": 244
											},
											"Kaiser": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kaiser",
												"matchingProductCount": -1,
												"sequenceNumber": 254
											},
											"Peppa_Pig": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Peppa_Pig",
												"matchingProductCount": -1,
												"sequenceNumber": 376
											},
											"Bestway": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Bestway",
												"matchingProductCount": -1,
												"sequenceNumber": 46
											},
											"Dickie": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Dickie",
												"matchingProductCount": -1,
												"sequenceNumber": 110
											},
											"Heidi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Heidi",
												"matchingProductCount": -1,
												"sequenceNumber": 217
											},
											"K_the_Kruse": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "K_the_Kruse",
												"matchingProductCount": -1,
												"sequenceNumber": 257
											},
											"Trefl": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Trefl",
												"matchingProductCount": -1,
												"sequenceNumber": 520
											},
											"Disney_Fairies": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Fairies",
												"matchingProductCount": -1,
												"sequenceNumber": 124
											},
											"Nuby": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Nuby",
												"matchingProductCount": -1,
												"sequenceNumber": 356
											},
											"JOY_TOY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "JOY_TOY",
												"matchingProductCount": -1,
												"sequenceNumber": 249
											},
											"LYRA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LYRA",
												"matchingProductCount": -1,
												"sequenceNumber": 307
											},
											"Majorette": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Majorette",
												"matchingProductCount": -1,
												"sequenceNumber": 310
											},
											"Roces": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Roces",
												"matchingProductCount": -1,
												"sequenceNumber": 423
											},
											"Der_kleine_Maulwurf": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Der_kleine_Maulwurf",
												"matchingProductCount": -1,
												"sequenceNumber": 107
											},
											"Jumbo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Jumbo",
												"matchingProductCount": -1,
												"sequenceNumber": 250
											},
											"Days_of_Wonder": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Days_of_Wonder",
												"matchingProductCount": -1,
												"sequenceNumber": 100
											},
											"Pegasus": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Pegasus",
												"matchingProductCount": -1,
												"sequenceNumber": 372
											},
											"Quercetti": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Quercetti",
												"matchingProductCount": -1,
												"sequenceNumber": 410
											},
											"TINTI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "TINTI",
												"matchingProductCount": -1,
												"sequenceNumber": 507
											},
											"Adlung_Spiele": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Adlung_Spiele",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"Disney": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney",
												"matchingProductCount": -1,
												"sequenceNumber": 118
											},
											"goki": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "goki",
												"matchingProductCount": -1,
												"sequenceNumber": 200
											},
											"KUKY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KUKY",
												"matchingProductCount": -1,
												"sequenceNumber": 278
											},
											"Funny_Fashion": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Funny_Fashion",
												"matchingProductCount": -1,
												"sequenceNumber": 186
											},
											"Schmidt_Spiele": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Schmidt_Spiele",
												"matchingProductCount": -1,
												"sequenceNumber": 437
											},
											"Baumhaus_Verlag_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Baumhaus_Verlag_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 32
											},
											"Beeboo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Beeboo",
												"matchingProductCount": -1,
												"sequenceNumber": 40
											},
											"Pro_Touch": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Pro_Touch",
												"matchingProductCount": -1,
												"sequenceNumber": 405
											},
											"Amigo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Amigo",
												"matchingProductCount": -1,
												"sequenceNumber": 17
											},
											"Sevi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sevi",
												"matchingProductCount": -1,
												"sequenceNumber": 448
											},
											"Bright_Starts": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bright_Starts",
												"matchingProductCount": -1,
												"sequenceNumber": 62
											},
											"Smoby": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Smoby",
												"matchingProductCount": -1,
												"sequenceNumber": 461
											},
											"Playshoes": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Playshoes",
												"matchingProductCount": -1,
												"sequenceNumber": 395
											},
											"Trudi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Trudi",
												"matchingProductCount": -1,
												"sequenceNumber": 522
											},
											"Wehncke": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Wehncke",
												"matchingProductCount": -1,
												"sequenceNumber": 551
											},
											"HAPE": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "HAPE",
												"matchingProductCount": -1,
												"sequenceNumber": 211
											},
											"difrax": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "difrax",
												"matchingProductCount": -1,
												"sequenceNumber": 115
											},
											"Disney_Planes": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Planes",
												"matchingProductCount": -1,
												"sequenceNumber": 130
											},
											"Dino_Train": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Dino_Train",
												"matchingProductCount": -1,
												"sequenceNumber": 116
											},
											"Goliath": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Goliath",
												"matchingProductCount": -1,
												"sequenceNumber": 201
											},
											"Talbot_Torro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Talbot_Torro",
												"matchingProductCount": -1,
												"sequenceNumber": 498
											},
											"Peg_Perego": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Peg_Perego",
												"matchingProductCount": -1,
												"sequenceNumber": 373
											},
											"Eduplay": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Eduplay",
												"matchingProductCount": -1,
												"sequenceNumber": 148
											},
											"United_Soft_Media": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "United_Soft_Media",
												"matchingProductCount": -1,
												"sequenceNumber": 529
											},
											"Epoch_Traumwiesen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Epoch_Traumwiesen",
												"matchingProductCount": -1,
												"sequenceNumber": 160
											},
											"Pferdefreunde": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pferdefreunde",
												"matchingProductCount": -1,
												"sequenceNumber": 379
											},
											"Be_Be_s_Collection": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Be_Be_s_Collection",
												"matchingProductCount": -1,
												"sequenceNumber": 39
											},
											"Smart_Games": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Smart_Games",
												"matchingProductCount": -1,
												"sequenceNumber": 459
											},
											"L_ssig": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "L_ssig",
												"matchingProductCount": -1,
												"sequenceNumber": 286
											},
											"4UNIQ": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "4UNIQ",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"NBG_EDV": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "NBG_EDV",
												"matchingProductCount": -1,
												"sequenceNumber": 345
											},
											"VANEZZA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "VANEZZA",
												"matchingProductCount": -1,
												"sequenceNumber": 540
											},
											"Wowwee": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Wowwee",
												"matchingProductCount": -1,
												"sequenceNumber": 560
											},
											"Vivid": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Vivid",
												"matchingProductCount": -1,
												"sequenceNumber": 542
											},
											"easypix": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "easypix",
												"matchingProductCount": -1,
												"sequenceNumber": 143
											},
											"LEGO_Friends": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEGO_Friends",
												"matchingProductCount": -1,
												"sequenceNumber": 290
											},
											"Tivola_Publishing_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Tivola_Publishing_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 510
											},
											"BC_kids": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BC_kids",
												"matchingProductCount": -1,
												"sequenceNumber": 35
											},
											"Leo_Lausemaus": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Leo_Lausemaus",
												"matchingProductCount": -1,
												"sequenceNumber": 295
											},
											"ERZI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ERZI",
												"matchingProductCount": -1,
												"sequenceNumber": 161
											},
											"Mikasa": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Mikasa",
												"matchingProductCount": -1,
												"sequenceNumber": 332
											},
											"Die_wilden_Kerle": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Die_wilden_Kerle",
												"matchingProductCount": -1,
												"sequenceNumber": 114
											},
											"Disney_Jake_und_die_Nimmerlandpiraten": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Jake_und_die_Nimmerlandpiraten",
												"matchingProductCount": -1,
												"sequenceNumber": 126
											},
											"LENA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "LENA",
												"matchingProductCount": -1,
												"sequenceNumber": 294
											},
											"Eberhard_Faber": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Eberhard_Faber",
												"matchingProductCount": -1,
												"sequenceNumber": 144
											},
											"Imaginista": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Imaginista",
												"matchingProductCount": -1,
												"sequenceNumber": 236
											},
											"PixelPops": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PixelPops",
												"matchingProductCount": -1,
												"sequenceNumber": 388
											},
											"Scratch": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Scratch",
												"matchingProductCount": -1,
												"sequenceNumber": 443
											},
											"STARPLAST": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "STARPLAST",
												"matchingProductCount": -1,
												"sequenceNumber": 479
											},
											"Streetsurfing": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Streetsurfing",
												"matchingProductCount": -1,
												"sequenceNumber": 487
											},
											"McNeill": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "McNeill",
												"matchingProductCount": -1,
												"sequenceNumber": 322
											},
											"Spider_Man": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Spider_Man",
												"matchingProductCount": -1,
												"sequenceNumber": 468
											},
											"hauck_Spielwaren": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "hauck_Spielwaren",
												"matchingProductCount": -1,
												"sequenceNumber": 216
											},
											"SCOOLI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SCOOLI",
												"matchingProductCount": -1,
												"sequenceNumber": 440
											},
											"Playgro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Playgro",
												"matchingProductCount": -1,
												"sequenceNumber": 392
											},
											"Disney_Princess": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Princess",
												"matchingProductCount": -1,
												"sequenceNumber": 131
											},
											"PlayMais": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PlayMais",
												"matchingProductCount": -1,
												"sequenceNumber": 393
											},
											"BIG": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "BIG",
												"matchingProductCount": -1,
												"sequenceNumber": 51
											},
											"efco": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "efco",
												"matchingProductCount": -1,
												"sequenceNumber": 150
											},
											"Littlest_Pet_Shop": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Littlest_Pet_Shop",
												"matchingProductCount": -1,
												"sequenceNumber": 300
											},
											"Kiddinx": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kiddinx",
												"matchingProductCount": -1,
												"sequenceNumber": 264
											},
											"dtp_entertainment_AG": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "dtp_entertainment_AG",
												"matchingProductCount": -1,
												"sequenceNumber": 142
											},
											"Furby": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Furby",
												"matchingProductCount": -1,
												"sequenceNumber": 187
											},
											"Libellud": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Libellud",
												"matchingProductCount": -1,
												"sequenceNumber": 297
											},
											"Small_Foot": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Small_Foot",
												"matchingProductCount": -1,
												"sequenceNumber": 458
											},
											"My_little_Pony": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "My_little_Pony",
												"matchingProductCount": -1,
												"sequenceNumber": 341
											},
											"Bruder": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bruder",
												"matchingProductCount": -1,
												"sequenceNumber": 64
											},
											"Revell": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Revell",
												"matchingProductCount": -1,
												"sequenceNumber": 420
											},
											"Folia": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Folia",
												"matchingProductCount": -1,
												"sequenceNumber": 182
											},
											"micro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "micro",
												"matchingProductCount": -1,
												"sequenceNumber": 330
											},
											"Kleiner_roter_Traktor": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kleiner_roter_Traktor",
												"matchingProductCount": -1,
												"sequenceNumber": 271
											},
											"Intex": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Intex",
												"matchingProductCount": -1,
												"sequenceNumber": 239
											},
											"AlpenGaudi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "AlpenGaudi",
												"matchingProductCount": -1,
												"sequenceNumber": 13
											},
											"BIOBU": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BIOBU",
												"matchingProductCount": -1,
												"sequenceNumber": 54
											},
											"UNDERCOVER": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "UNDERCOVER",
												"matchingProductCount": -1,
												"sequenceNumber": 527
											},
											"Universal_Trends": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Universal_Trends",
												"matchingProductCount": -1,
												"sequenceNumber": 533
											},
											"WORLDS_APART": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "WORLDS_APART",
												"matchingProductCount": -1,
												"sequenceNumber": 559
											},
											"Schardt": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Schardt",
												"matchingProductCount": -1,
												"sequenceNumber": 431
											},
											"HQ": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "HQ",
												"matchingProductCount": -1,
												"sequenceNumber": 229
											},
											"Disney_Mickey_Mouse___friends": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Mickey_Mouse___friends",
												"matchingProductCount": -1,
												"sequenceNumber": 128
											},
											"Hasbro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Hasbro",
												"matchingProductCount": -1,
												"sequenceNumber": 214
											},
											"B_ABA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "B_ABA",
												"matchingProductCount": -1,
												"sequenceNumber": 36
											},
											"b_b__jou": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "b_b__jou",
												"matchingProductCount": -1,
												"sequenceNumber": 38
											},
											"The_Toy_Company": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "The_Toy_Company",
												"matchingProductCount": -1,
												"sequenceNumber": 503
											},
											"Toy_Fun": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Toy_Fun",
												"matchingProductCount": -1,
												"sequenceNumber": 518
											},
											"Carrera": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Carrera",
												"matchingProductCount": -1,
												"sequenceNumber": 77
											},
											"L_K": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "L_K",
												"matchingProductCount": -1,
												"sequenceNumber": 305
											},
											"Microsoft": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Microsoft",
												"matchingProductCount": -1,
												"sequenceNumber": 331
											},
											"Busch": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Busch",
												"matchingProductCount": -1,
												"sequenceNumber": 69
											},
											"Etan": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Etan",
												"matchingProductCount": -1,
												"sequenceNumber": 164
											},
											"Activision_Blizzard": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Activision_Blizzard",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"Disney_Cars": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Cars",
												"matchingProductCount": -1,
												"sequenceNumber": 120
											},
											"Universal": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Universal",
												"matchingProductCount": -1,
												"sequenceNumber": 530
											},
											"Edel_Germany_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Edel_Germany_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 147
											},
											"Der_Gr_ffelo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Der_Gr_ffelo",
												"matchingProductCount": -1,
												"sequenceNumber": 104
											},
											"Coppenrath": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Coppenrath",
												"matchingProductCount": -1,
												"sequenceNumber": 88
											},
											"JOHN": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "JOHN",
												"matchingProductCount": -1,
												"sequenceNumber": 245
											},
											"Depesche": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Depesche",
												"matchingProductCount": -1,
												"sequenceNumber": 103
											},
											"New_Bright": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "New_Bright",
												"matchingProductCount": -1,
												"sequenceNumber": 347
											},
											"Schildkr_t_Funsports": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Schildkr_t_Funsports",
												"matchingProductCount": -1,
												"sequenceNumber": 433
											},
											"Bresser": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bresser",
												"matchingProductCount": -1,
												"sequenceNumber": 61
											},
											"Aqua_Sphere": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Aqua_Sphere",
												"matchingProductCount": -1,
												"sequenceNumber": 19
											},
											"Quadro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Quadro",
												"matchingProductCount": -1,
												"sequenceNumber": 409
											},
											"D_Arp_je": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "D_Arp_je",
												"matchingProductCount": -1,
												"sequenceNumber": 98
											},
											"Eulenspiegel": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Eulenspiegel",
												"matchingProductCount": -1,
												"sequenceNumber": 165
											},
											"Emsa": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Emsa",
												"matchingProductCount": -1,
												"sequenceNumber": 158
											},
											"XCite": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "XCite",
												"matchingProductCount": -1,
												"sequenceNumber": 562
											},
											"MAM": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "MAM",
												"matchingProductCount": -1,
												"sequenceNumber": 311
											},
											"PIKO": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PIKO",
												"matchingProductCount": -1,
												"sequenceNumber": 383
											},
											"Stylex": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Stylex",
												"matchingProductCount": -1,
												"sequenceNumber": 489
											},
											"Universum_Film_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Universum_Film_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 535
											},
											"Gibbon": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Gibbon",
												"matchingProductCount": -1,
												"sequenceNumber": 194
											},
											"Hexbug": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hexbug",
												"matchingProductCount": -1,
												"sequenceNumber": 224
											},
											"TOMY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "TOMY",
												"matchingProductCount": -1,
												"sequenceNumber": 515
											},
											"PEBBLE": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PEBBLE",
												"matchingProductCount": -1,
												"sequenceNumber": 370
											},
											"K2": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "K2",
												"matchingProductCount": -1,
												"sequenceNumber": 253
											},
											"Teenage_Mutant_Ninja_Turtles": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Teenage_Mutant_Ninja_Turtles",
												"matchingProductCount": -1,
												"sequenceNumber": 500
											},
											"moses": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "moses",
												"matchingProductCount": -1,
												"sequenceNumber": 340
											},
											"Crazy_Safety": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Crazy_Safety",
												"matchingProductCount": -1,
												"sequenceNumber": 94
											},
											"RAVENSBURGER_BUCHVERLAG_und_WESTKA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "RAVENSBURGER_BUCHVERLAG_und_WESTKA",
												"matchingProductCount": -1,
												"sequenceNumber": 415
											},
											"Abacusspiele": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Abacusspiele",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"Felix": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Felix",
												"matchingProductCount": -1,
												"sequenceNumber": 174
											},
											"TOTUM": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "TOTUM",
												"matchingProductCount": -1,
												"sequenceNumber": 517
											},
											"La_Siesta": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "La_Siesta",
												"matchingProductCount": -1,
												"sequenceNumber": 285
											},
											"Hama_Perlen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hama_Perlen",
												"matchingProductCount": -1,
												"sequenceNumber": 208
											},
											"Ice_Age": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Ice_Age",
												"matchingProductCount": -1,
												"sequenceNumber": 233
											},
											"KiKANiNCHEN": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KiKANiNCHEN",
												"matchingProductCount": -1,
												"sequenceNumber": 267
											},
											"Lucy_Locket": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Lucy_Locket",
												"matchingProductCount": -1,
												"sequenceNumber": 303
											},
											"Darda": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Darda",
												"matchingProductCount": -1,
												"sequenceNumber": 97
											},
											"fischertechnik": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "fischertechnik",
												"matchingProductCount": -1,
												"sequenceNumber": 179
											},
											"G_tz": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "G_tz",
												"matchingProductCount": -1,
												"sequenceNumber": 202
											},
											"Royalbeach": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Royalbeach",
												"matchingProductCount": -1,
												"sequenceNumber": 426
											},
											"Party_Fun": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Party_Fun",
												"matchingProductCount": -1,
												"sequenceNumber": 367
											},
											"H___H_babyruf": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "H___H_babyruf",
												"matchingProductCount": -1,
												"sequenceNumber": 206
											},
											"Beluga": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Beluga",
												"matchingProductCount": -1,
												"sequenceNumber": 43
											},
											"BRIO": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BRIO",
												"matchingProductCount": -1,
												"sequenceNumber": 63
											},
											"Donic_Schildkr_t": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Donic_Schildkr_t",
												"matchingProductCount": -1,
												"sequenceNumber": 135
											},
											"Odenw_lder": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Odenw_lder",
												"matchingProductCount": -1,
												"sequenceNumber": 360
											},
											"Minecraft": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Minecraft",
												"matchingProductCount": -1,
												"sequenceNumber": 334
											},
											"Gr_tz_Verlag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Gr_tz_Verlag",
												"matchingProductCount": -1,
												"sequenceNumber": 205
											},
											"Lilliputiens": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Lilliputiens",
												"matchingProductCount": -1,
												"sequenceNumber": 298
											},
											"Geoworld": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Geoworld",
												"matchingProductCount": -1,
												"sequenceNumber": 192
											},
											"F_nf_Freunde": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "F_nf_Freunde",
												"matchingProductCount": -1,
												"sequenceNumber": 184
											},
											"Conni": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Conni",
												"matchingProductCount": -1,
												"sequenceNumber": 87
											},
											"Buddy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Buddy",
												"matchingProductCount": -1,
												"sequenceNumber": 66
											},
											"Monster_High": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Monster_High",
												"matchingProductCount": -1,
												"sequenceNumber": 339
											},
											"Bike_Fashion": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bike_Fashion",
												"matchingProductCount": -1,
												"sequenceNumber": 53
											},
											"MAMMUT_Spiel_und_Geschenk": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "MAMMUT_Spiel_und_Geschenk",
												"matchingProductCount": -1,
												"sequenceNumber": 312
											},
											"Wei_t_Du_eigentlich_wie_lieb_ich_Dich_hab": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Wei_t_Du_eigentlich_wie_lieb_ich_Dich_hab",
												"matchingProductCount": -1,
												"sequenceNumber": 552
											},
											"FIMO": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "FIMO",
												"matchingProductCount": -1,
												"sequenceNumber": 177
											},
											"Silverlit": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Silverlit",
												"matchingProductCount": -1,
												"sequenceNumber": 452
											},
											"Wallaboo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Wallaboo",
												"matchingProductCount": -1,
												"sequenceNumber": 548
											},
											"Disney_Sofia_die_Erste": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Disney_Sofia_die_Erste",
												"matchingProductCount": -1,
												"sequenceNumber": 132
											},
											"Hotex": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hotex",
												"matchingProductCount": -1,
												"sequenceNumber": 228
											},
											"Deutscher_Fu_ball_Bund": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Deutscher_Fu_ball_Bund",
												"matchingProductCount": -1,
												"sequenceNumber": 109
											},
											"Die_lieben_Sieben": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Die_lieben_Sieben",
												"matchingProductCount": -1,
												"sequenceNumber": 112
											},
											"Idena": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Idena",
												"matchingProductCount": -1,
												"sequenceNumber": 234
											},
											"Sony_Computer_Entertainment": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sony_Computer_Entertainment",
												"matchingProductCount": -1,
												"sequenceNumber": 464
											},
											"Weleda": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Weleda",
												"matchingProductCount": -1,
												"sequenceNumber": 553
											},
											"Mascha_und_der_B_r": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Mascha_und_der_B_r",
												"matchingProductCount": -1,
												"sequenceNumber": 318
											},
											"Janosch": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Janosch",
												"matchingProductCount": -1,
												"sequenceNumber": 243
											},
											"Dragons": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Dragons",
												"matchingProductCount": -1,
												"sequenceNumber": 140
											},
											"KNORRTOYS_COM": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KNORRTOYS_COM",
												"matchingProductCount": -1,
												"sequenceNumber": 272
											},
											"Konami_Digital_Entertainment": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Konami_Digital_Entertainment",
												"matchingProductCount": -1,
												"sequenceNumber": 274
											},
											"KLEIBER": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KLEIBER",
												"matchingProductCount": -1,
												"sequenceNumber": 268
											},
											"GOWI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "GOWI",
												"matchingProductCount": -1,
												"sequenceNumber": 204
											},
											"Babymoov": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Babymoov",
												"matchingProductCount": -1,
												"sequenceNumber": 26
											},
											"Bibi_und_Tina": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bibi_und_Tina",
												"matchingProductCount": -1,
												"sequenceNumber": 49
											},
											"Playgo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Playgo",
												"matchingProductCount": -1,
												"sequenceNumber": 391
											},
											"Snoopy___Die_Peanuts": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Snoopy___Die_Peanuts",
												"matchingProductCount": -1,
												"sequenceNumber": 462
											},
											"Sesamstra_e": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sesamstra_e",
												"matchingProductCount": -1,
												"sequenceNumber": 446
											},
											"Teufelskicker": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Teufelskicker",
												"matchingProductCount": -1,
												"sequenceNumber": 502
											},
											"Drache_Kokosnuss": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Drache_Kokosnuss",
												"matchingProductCount": -1,
												"sequenceNumber": 139
											},
											"Maskworld": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Maskworld",
												"matchingProductCount": -1,
												"sequenceNumber": 319
											},
											"Welly": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Welly",
												"matchingProductCount": -1,
												"sequenceNumber": 554
											},
											"Disney_K_nig_der_L_wen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_K_nig_der_L_wen",
												"matchingProductCount": -1,
												"sequenceNumber": 127
											},
											"Transformers": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Transformers",
												"matchingProductCount": -1,
												"sequenceNumber": 519
											},
											"Die_drei_Fragezeichen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Die_drei_Fragezeichen",
												"matchingProductCount": -1,
												"sequenceNumber": 111
											},
											"Hori": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hori",
												"matchingProductCount": -1,
												"sequenceNumber": 227
											},
											"Schauma": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Schauma",
												"matchingProductCount": -1,
												"sequenceNumber": 432
											},
											"Okiedog": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Okiedog",
												"matchingProductCount": -1,
												"sequenceNumber": 361
											},
											"No_Rules": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "No_Rules",
												"matchingProductCount": -1,
												"sequenceNumber": 355
											},
											"LOONEY_TUNES": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LOONEY_TUNES",
												"matchingProductCount": -1,
												"sequenceNumber": 302
											},
											"Staedtler": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Staedtler",
												"matchingProductCount": -1,
												"sequenceNumber": 476
											},
											"LAMY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LAMY",
												"matchingProductCount": -1,
												"sequenceNumber": 282
											},
											"Skylanders": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Skylanders",
												"matchingProductCount": -1,
												"sequenceNumber": 456
											},
											"Spielstabil": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Spielstabil",
												"matchingProductCount": -1,
												"sequenceNumber": 470
											},
											"Tiny_Love": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Tiny_Love",
												"matchingProductCount": -1,
												"sequenceNumber": 508
											},
											"Mega_Bleu": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Mega_Bleu",
												"matchingProductCount": -1,
												"sequenceNumber": 325
											},
											"Delta_Children": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Delta_Children",
												"matchingProductCount": -1,
												"sequenceNumber": 102
											},
											"SUNNYSUE": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SUNNYSUE",
												"matchingProductCount": -1,
												"sequenceNumber": 491
											},
											"MyPaperSet": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "MyPaperSet",
												"matchingProductCount": -1,
												"sequenceNumber": 342
											},
											"Bburago": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bburago",
												"matchingProductCount": -1,
												"sequenceNumber": 34
											},
											"Rotho_Babydesign": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Rotho_Babydesign",
												"matchingProductCount": -1,
												"sequenceNumber": 425
											},
											"Eichhorn": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Eichhorn",
												"matchingProductCount": -1,
												"sequenceNumber": 151
											},
											"Frosch": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Frosch",
												"matchingProductCount": -1,
												"sequenceNumber": 183
											},
											"Powerslide": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Powerslide",
												"matchingProductCount": -1,
												"sequenceNumber": 398
											},
											"MGA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "MGA",
												"matchingProductCount": -1,
												"sequenceNumber": 328
											},
											"BAYER": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BAYER",
												"matchingProductCount": -1,
												"sequenceNumber": 33
											},
											"Bella_Sara": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bella_Sara",
												"matchingProductCount": -1,
												"sequenceNumber": 42
											},
											"Hanni_und_Nanni": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hanni_und_Nanni",
												"matchingProductCount": -1,
												"sequenceNumber": 209
											},
											"beleduc": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "beleduc",
												"matchingProductCount": -1,
												"sequenceNumber": 41
											},
											"Harry_Potter": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Harry_Potter",
												"matchingProductCount": -1,
												"sequenceNumber": 213
											},
											"Castorland": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Castorland",
												"matchingProductCount": -1,
												"sequenceNumber": 79
											},
											"Lamaze": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Lamaze",
												"matchingProductCount": -1,
												"sequenceNumber": 281
											},
											"Baby_Dan": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Baby_Dan",
												"matchingProductCount": -1,
												"sequenceNumber": 25
											},
											"Ritter_Rost": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Ritter_Rost",
												"matchingProductCount": -1,
												"sequenceNumber": 421
											},
											"Ben_Lee": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Ben_Lee",
												"matchingProductCount": -1,
												"sequenceNumber": 45
											},
											"Beachtrekker": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Beachtrekker",
												"matchingProductCount": -1,
												"sequenceNumber": 37
											},
											"CTI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "CTI",
												"matchingProductCount": -1,
												"sequenceNumber": 95
											},
											"Emil_Schwenk": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Emil_Schwenk",
												"matchingProductCount": -1,
												"sequenceNumber": 155
											},
											"Olli_Olbot": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Olli_Olbot",
												"matchingProductCount": -1,
												"sequenceNumber": 362
											},
											"kbt": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "kbt",
												"matchingProductCount": -1,
												"sequenceNumber": 260
											},
											"Nuna": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Nuna",
												"matchingProductCount": -1,
												"sequenceNumber": 358
											},
											"Vincelot": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Vincelot",
												"matchingProductCount": -1,
												"sequenceNumber": 541
											},
											"ALEX": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ALEX",
												"matchingProductCount": -1,
												"sequenceNumber": 12
											},
											"Disney_Minnie_Mouse": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Disney_Minnie_Mouse",
												"matchingProductCount": -1,
												"sequenceNumber": 129
											},
											"Phineas_and_Ferb": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Phineas_and_Ferb",
												"matchingProductCount": -1,
												"sequenceNumber": 381
											},
											"Fehn": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Fehn",
												"matchingProductCount": -1,
												"sequenceNumber": 173
											},
											"Barbie": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Barbie",
												"matchingProductCount": -1,
												"sequenceNumber": 29
											},
											"Schl_mpfe": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Schl_mpfe",
												"matchingProductCount": -1,
												"sequenceNumber": 436
											},
											"Rabe_Socke": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Rabe_Socke",
												"matchingProductCount": -1,
												"sequenceNumber": 411
											},
											"teifoc": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "teifoc",
												"matchingProductCount": -1,
												"sequenceNumber": 501
											},
											"Rubie_s": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Rubie_s",
												"matchingProductCount": -1,
												"sequenceNumber": 427
											},
											"PUKY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "PUKY",
												"matchingProductCount": -1,
												"sequenceNumber": 407
											},
											"Tipp_Kick": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Tipp_Kick",
												"matchingProductCount": -1,
												"sequenceNumber": 509
											},
											"Nattou": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Nattou",
												"matchingProductCount": -1,
												"sequenceNumber": 344
											},
											"Scout": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Scout",
												"matchingProductCount": -1,
												"sequenceNumber": 441
											},
											"Avenue_Mandarine": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Avenue_Mandarine",
												"matchingProductCount": -1,
												"sequenceNumber": 23
											},
											"Prinzessin_Emmy_und_ihre_Pferde": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Prinzessin_Emmy_und_ihre_Pferde",
												"matchingProductCount": -1,
												"sequenceNumber": 400
											},
											"Piatnik": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Piatnik",
												"matchingProductCount": -1,
												"sequenceNumber": 382
											},
											"Mattel": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Mattel",
												"matchingProductCount": -1,
												"sequenceNumber": 320
											},
											"Winning_Moves": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Winning_Moves",
												"matchingProductCount": -1,
												"sequenceNumber": 557
											},
											"Benjamin_Bl_mchen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Benjamin_Bl_mchen",
												"matchingProductCount": -1,
												"sequenceNumber": 44
											},
											"ESPRIT": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ESPRIT",
												"matchingProductCount": -1,
												"sequenceNumber": 162
											},
											"TKKG": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "TKKG",
												"matchingProductCount": -1,
												"sequenceNumber": 511
											},
											"CHIC_2000": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "CHIC_2000",
												"matchingProductCount": -1,
												"sequenceNumber": 81
											},
											"Famosa": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Famosa",
												"matchingProductCount": -1,
												"sequenceNumber": 170
											},
											"Skip_Hop": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Skip_Hop",
												"matchingProductCount": -1,
												"sequenceNumber": 455
											},
											"Sterntaler": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sterntaler",
												"matchingProductCount": -1,
												"sequenceNumber": 483
											},
											"Global_Labels": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Global_Labels",
												"matchingProductCount": -1,
												"sequenceNumber": 197
											},
											"prohobb": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "prohobb",
												"matchingProductCount": -1,
												"sequenceNumber": 403
											},
											"Disney_Doc_McStuffins": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Doc_McStuffins",
												"matchingProductCount": -1,
												"sequenceNumber": 122
											},
											"Electronic_Arts_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Electronic_Arts_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 153
											},
											"Disney_Winnie_Puuh": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Winnie_Puuh",
												"matchingProductCount": -1,
												"sequenceNumber": 134
											},
											"Rainbow_Loom": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Rainbow_Loom",
												"matchingProductCount": -1,
												"sequenceNumber": 412
											},
											"BambinoBike": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BambinoBike",
												"matchingProductCount": -1,
												"sequenceNumber": 27
											},
											"Pinolino": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pinolino",
												"matchingProductCount": -1,
												"sequenceNumber": 384
											},
											"Madagascar": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Madagascar",
												"matchingProductCount": -1,
												"sequenceNumber": 308
											},
											"Janod": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Janod",
												"matchingProductCount": -1,
												"sequenceNumber": 242
											},
											"Medela": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Medela",
												"matchingProductCount": -1,
												"sequenceNumber": 324
											},
											"SpongeBob": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SpongeBob",
												"matchingProductCount": -1,
												"sequenceNumber": 473
											},
											"Caillou": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Caillou",
												"matchingProductCount": -1,
												"sequenceNumber": 71
											},
											"Zoch": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Zoch",
												"matchingProductCount": -1,
												"sequenceNumber": 568
											},
											"iKON": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "iKON",
												"matchingProductCount": -1,
												"sequenceNumber": 235
											},
											"Steiff": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Steiff",
												"matchingProductCount": -1,
												"sequenceNumber": 481
											},
											"Topstar": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Topstar",
												"matchingProductCount": -1,
												"sequenceNumber": 516
											},
											"Empeak": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Empeak",
												"matchingProductCount": -1,
												"sequenceNumber": 157
											},
											"Style_Me_Up": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Style_Me_Up",
												"matchingProductCount": -1,
												"sequenceNumber": 488
											},
											"Yookidoo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Yookidoo",
												"matchingProductCount": -1,
												"sequenceNumber": 565
											},
											"PlushCraft": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PlushCraft",
												"matchingProductCount": -1,
												"sequenceNumber": 396
											},
											"Kaloo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kaloo",
												"matchingProductCount": -1,
												"sequenceNumber": 255
											},
											"Corolle": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Corolle",
												"matchingProductCount": -1,
												"sequenceNumber": 90
											},
											"BabyBj_rn": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BabyBj_rn",
												"matchingProductCount": -1,
												"sequenceNumber": 24
											},
											"_coiffier": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "_coiffier",
												"matchingProductCount": -1,
												"sequenceNumber": 145
											},
											"ABUS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ABUS",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											},
											"ASS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "ASS",
												"matchingProductCount": -1,
												"sequenceNumber": 21
											},
											"Reer": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Reer",
												"matchingProductCount": -1,
												"sequenceNumber": 418
											},
											"SIKU": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SIKU",
												"matchingProductCount": -1,
												"sequenceNumber": 451
											},
											"Biberna": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Biberna",
												"matchingProductCount": -1,
												"sequenceNumber": 47
											},
											"Geomag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Geomag",
												"matchingProductCount": -1,
												"sequenceNumber": 191
											},
											"Petit_Jour_Paris": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Petit_Jour_Paris",
												"matchingProductCount": -1,
												"sequenceNumber": 377
											},
											"Disney_Die_Eisk_nigin": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Disney_Die_Eisk_nigin",
												"matchingProductCount": -1,
												"sequenceNumber": 121
											},
											"Marianplast": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Marianplast",
												"matchingProductCount": -1,
												"sequenceNumber": 314
											},
											"myToys": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "myToys",
												"matchingProductCount": -1,
												"sequenceNumber": 343
											},
											"Disney_DVD": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_DVD",
												"matchingProductCount": -1,
												"sequenceNumber": 123
											},
											"Baufix": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Baufix",
												"matchingProductCount": -1,
												"sequenceNumber": 31
											},
											"Shaun_das_Schaf": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Shaun_das_Schaf",
												"matchingProductCount": -1,
												"sequenceNumber": 449
											},
											"Nemmer": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Nemmer",
												"matchingProductCount": -1,
												"sequenceNumber": 346
											},
											"sigikid": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "sigikid",
												"matchingProductCount": -1,
												"sequenceNumber": 450
											},
											"Sony_Pictures": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sony_Pictures",
												"matchingProductCount": -1,
												"sequenceNumber": 465
											},
											"Take_2": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Take_2",
												"matchingProductCount": -1,
												"sequenceNumber": 496
											},
											"N_rnberger_Spielkarten": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "N_rnberger_Spielkarten",
												"matchingProductCount": -1,
												"sequenceNumber": 359
											},
											"Universal_Pictures": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Universal_Pictures",
												"matchingProductCount": -1,
												"sequenceNumber": 532
											},
											"Hello_Kitty": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hello_Kitty",
												"matchingProductCount": -1,
												"sequenceNumber": 219
											},
											"McNeill_Sternschnuppe": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "McNeill_Sternschnuppe",
												"matchingProductCount": -1,
												"sequenceNumber": 323
											},
											"Larsen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Larsen",
												"matchingProductCount": -1,
												"sequenceNumber": 284
											},
											"YAKARI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "YAKARI",
												"matchingProductCount": -1,
												"sequenceNumber": 563
											},
											"ak_tronic": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ak_tronic",
												"matchingProductCount": -1,
												"sequenceNumber": 10
											},
											"Feuerwehrmann_Sam": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Feuerwehrmann_Sam",
												"matchingProductCount": -1,
												"sequenceNumber": 175
											},
											"CHICCO": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "CHICCO",
												"matchingProductCount": -1,
												"sequenceNumber": 82
											},
											"Cornelsen_Verlag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Cornelsen_Verlag",
												"matchingProductCount": -1,
												"sequenceNumber": 89
											},
											"Marabu": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Marabu",
												"matchingProductCount": -1,
												"sequenceNumber": 313
											},
											"Lansinoh": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Lansinoh",
												"matchingProductCount": -1,
												"sequenceNumber": 283
											},
											"Polesie": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Polesie",
												"matchingProductCount": -1,
												"sequenceNumber": 397
											},
											"Thomas_und_seine_Freunde": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Thomas_und_seine_Freunde",
												"matchingProductCount": -1,
												"sequenceNumber": 506
											},
											"PENATEN": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PENATEN",
												"matchingProductCount": -1,
												"sequenceNumber": 375
											},
											"C__KREUL": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "C__KREUL",
												"matchingProductCount": -1,
												"sequenceNumber": 70
											},
											"M_rklin": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "M_rklin",
												"matchingProductCount": -1,
												"sequenceNumber": 315
											},
											"Adelheid": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Adelheid",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"Raupe_Nimmersatt": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Raupe_Nimmersatt",
												"matchingProductCount": -1,
												"sequenceNumber": 413
											},
											"Universal_Music_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Universal_Music_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 531
											},
											"Der_kleine_Prinz": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Der_kleine_Prinz",
												"matchingProductCount": -1,
												"sequenceNumber": 108
											},
											"Safety_1st": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Safety_1st",
												"matchingProductCount": -1,
												"sequenceNumber": 428
											},
											"Prophete": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Prophete",
												"matchingProductCount": -1,
												"sequenceNumber": 404
											},
											"School_Mood": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "School_Mood",
												"matchingProductCount": -1,
												"sequenceNumber": 438
											},
											"4M": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "4M",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"Outdoor": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Outdoor",
												"matchingProductCount": -1,
												"sequenceNumber": 364
											},
											"KHW": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KHW",
												"matchingProductCount": -1,
												"sequenceNumber": 263
											},
											"Peacable_Kingdom": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Peacable_Kingdom",
												"matchingProductCount": -1,
												"sequenceNumber": 368
											},
											"UNITED_LABELS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "UNITED_LABELS",
												"matchingProductCount": -1,
												"sequenceNumber": 528
											},
											"Jollein": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Jollein",
												"matchingProductCount": -1,
												"sequenceNumber": 246
											},
											"Plan_Toys": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Plan_Toys",
												"matchingProductCount": -1,
												"sequenceNumber": 389
											},
											"Inter_Link": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Inter_Link",
												"matchingProductCount": -1,
												"sequenceNumber": 238
											},
											"URSUS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "URSUS",
												"matchingProductCount": -1,
												"sequenceNumber": 537
											},
											"Bolz": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bolz",
												"matchingProductCount": -1,
												"sequenceNumber": 56
											},
											"Ty": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Ty",
												"matchingProductCount": -1,
												"sequenceNumber": 525
											},
											"Herlitz": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Herlitz",
												"matchingProductCount": -1,
												"sequenceNumber": 221
											},
											"Little_Tikes": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Little_Tikes",
												"matchingProductCount": -1,
												"sequenceNumber": 301
											},
											"Just_Bridge_Entertainment": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Just_Bridge_Entertainment",
												"matchingProductCount": -1,
												"sequenceNumber": 252
											},
											"walther": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "walther",
												"matchingProductCount": -1,
												"sequenceNumber": 549
											},
											"Ever_After_High": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Ever_After_High",
												"matchingProductCount": -1,
												"sequenceNumber": 166
											},
											"LEGO_Ninjago": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEGO_Ninjago",
												"matchingProductCount": -1,
												"sequenceNumber": 292
											},
											"Slackstar": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Slackstar",
												"matchingProductCount": -1,
												"sequenceNumber": 457
											},
											"Warner_Home_Video": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Warner_Home_Video",
												"matchingProductCount": -1,
												"sequenceNumber": 550
											},
											"bigben": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "bigben",
												"matchingProductCount": -1,
												"sequenceNumber": 52
											},
											"Decofun": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Decofun",
												"matchingProductCount": -1,
												"sequenceNumber": 101
											},
											"Bob_der_Baumeister": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bob_der_Baumeister",
												"matchingProductCount": -1,
												"sequenceNumber": 55
											},
											"Kleine_Prinzessin": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kleine_Prinzessin",
												"matchingProductCount": -1,
												"sequenceNumber": 270
											},
											"Mike_der_Ritter": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Mike_der_Ritter",
												"matchingProductCount": -1,
												"sequenceNumber": 333
											},
											"Goula": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Goula",
												"matchingProductCount": -1,
												"sequenceNumber": 203
											},
											"SONY_BMG_MUSIC": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SONY_BMG_MUSIC",
												"matchingProductCount": -1,
												"sequenceNumber": 463
											},
											"boon": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "boon",
												"matchingProductCount": -1,
												"sequenceNumber": 59
											},
											"smarTrike": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "smarTrike",
												"matchingProductCount": -1,
												"sequenceNumber": 460
											},
											"HiPP": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "HiPP",
												"matchingProductCount": -1,
												"sequenceNumber": 226
											},
											"Disney_Findet_Nemo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Findet_Nemo",
												"matchingProductCount": -1,
												"sequenceNumber": 125
											},
											"Z_llner": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Z_llner",
												"matchingProductCount": -1,
												"sequenceNumber": 569
											},
											"Firefly": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Firefly",
												"matchingProductCount": -1,
												"sequenceNumber": 178
											},
											"LEGO_Legends_of_Chima": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEGO_Legends_of_Chima",
												"matchingProductCount": -1,
												"sequenceNumber": 291
											},
											"Step": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Step",
												"matchingProductCount": -1,
												"sequenceNumber": 482
											},
											"University_Games": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "University_Games",
												"matchingProductCount": -1,
												"sequenceNumber": 534
											},
											"PiP_Studio": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PiP_Studio",
												"matchingProductCount": -1,
												"sequenceNumber": 386
											},
											"Giochi_Preziosi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Giochi_Preziosi",
												"matchingProductCount": -1,
												"sequenceNumber": 196
											},
											"Voggenreiter": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Voggenreiter",
												"matchingProductCount": -1,
												"sequenceNumber": 543
											},
											"Spiegelburg": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Spiegelburg",
												"matchingProductCount": -1,
												"sequenceNumber": 469
											},
											"Happy_People": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Happy_People",
												"matchingProductCount": -1,
												"sequenceNumber": 212
											},
											"Disney_Bambi": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Bambi",
												"matchingProductCount": -1,
												"sequenceNumber": 119
											},
											"lui_meme": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "lui_meme",
												"matchingProductCount": -1,
												"sequenceNumber": 304
											},
											"Pampers": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pampers",
												"matchingProductCount": -1,
												"sequenceNumber": 365
											},
											"Hans_im_Gl_ck": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Hans_im_Gl_ck",
												"matchingProductCount": -1,
												"sequenceNumber": 210
											},
											"Eitech": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Eitech",
												"matchingProductCount": -1,
												"sequenceNumber": 152
											},
											"Chr__Tanner": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Chr__Tanner",
												"matchingProductCount": -1,
												"sequenceNumber": 83
											},
											"BULLYLAND": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BULLYLAND",
												"matchingProductCount": -1,
												"sequenceNumber": 68
											},
											"Aquaplay": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Aquaplay",
												"matchingProductCount": -1,
												"sequenceNumber": 18
											},
											"LEGO_City": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEGO_City",
												"matchingProductCount": -1,
												"sequenceNumber": 289
											},
											"Kaufmann": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kaufmann",
												"matchingProductCount": -1,
												"sequenceNumber": 258
											},
											"Hexe_Lilli": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hexe_Lilli",
												"matchingProductCount": -1,
												"sequenceNumber": 225
											},
											"Zapf_Creation": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Zapf_Creation",
												"matchingProductCount": -1,
												"sequenceNumber": 567
											},
											"Asmodee": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Asmodee",
												"matchingProductCount": -1,
												"sequenceNumber": 20
											},
											"TAF_TOYS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "TAF_TOYS",
												"matchingProductCount": -1,
												"sequenceNumber": 495
											},
											"fischerTiP": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "fischerTiP",
												"matchingProductCount": -1,
												"sequenceNumber": 180
											},
											"Pettersson_und_Findus": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pettersson_und_Findus",
												"matchingProductCount": -1,
												"sequenceNumber": 378
											},
											"Herding": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Herding",
												"matchingProductCount": -1,
												"sequenceNumber": 220
											},
											"Geuther": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Geuther",
												"matchingProductCount": -1,
												"sequenceNumber": 193
											},
											"Flashpoint_AG": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Flashpoint_AG",
												"matchingProductCount": -1,
												"sequenceNumber": 181
											},
											"AEROBIE": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "AEROBIE",
												"matchingProductCount": -1,
												"sequenceNumber": 9
											},
											"Fu_ballverein_FC_Bayern_M_nchen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Fu_ballverein_FC_Bayern_M_nchen",
												"matchingProductCount": -1,
												"sequenceNumber": 189
											},
											"Kosmos": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Kosmos",
												"matchingProductCount": -1,
												"sequenceNumber": 275
											},
											"toitowear": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "toitowear",
												"matchingProductCount": -1,
												"sequenceNumber": 513
											},
											"Glorex": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Glorex",
												"matchingProductCount": -1,
												"sequenceNumber": 198
											},
											"LEGO_Star_Wars": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEGO_Star_Wars",
												"matchingProductCount": -1,
												"sequenceNumber": 293
											},
											"McKinley": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "McKinley",
												"matchingProductCount": -1,
												"sequenceNumber": 321
											},
											"Wickie": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Wickie",
												"matchingProductCount": -1,
												"sequenceNumber": 556
											},
											"Vtech": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Vtech",
												"matchingProductCount": -1,
												"sequenceNumber": 544
											},
											"Energetics": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Energetics",
												"matchingProductCount": -1,
												"sequenceNumber": 159
											},
											"Kung_Fu_Panda": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kung_Fu_Panda",
												"matchingProductCount": -1,
												"sequenceNumber": 279
											},
											"uvex": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "uvex",
												"matchingProductCount": -1,
												"sequenceNumber": 538
											},
											"Yu_Gi_Oh": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Yu_Gi_Oh",
												"matchingProductCount": -1,
												"sequenceNumber": 566
											},
											"KED_Helmsysteme": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KED_Helmsysteme",
												"matchingProductCount": -1,
												"sequenceNumber": 261
											},
											"Carromco": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Carromco",
												"matchingProductCount": -1,
												"sequenceNumber": 78
											},
											"LEXIBOOK": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "LEXIBOOK",
												"matchingProductCount": -1,
												"sequenceNumber": 296
											},
											"Cambrass": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Cambrass",
												"matchingProductCount": -1,
												"sequenceNumber": 73
											},
											"ALPINA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ALPINA",
												"matchingProductCount": -1,
												"sequenceNumber": 14
											},
											"joyPac": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "joyPac",
												"matchingProductCount": -1,
												"sequenceNumber": 248
											},
											"Nikko": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Nikko",
												"matchingProductCount": -1,
												"sequenceNumber": 351
											},
											"Fu_ball_Fanartikel": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Fu_ball_Fanartikel",
												"matchingProductCount": -1,
												"sequenceNumber": 188
											},
											"Drei_Magier_Spiele": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Drei_Magier_Spiele",
												"matchingProductCount": -1,
												"sequenceNumber": 141
											},
											"Wendy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Wendy",
												"matchingProductCount": -1,
												"sequenceNumber": 555
											},
											"LaHobba": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "LaHobba",
												"matchingProductCount": -1,
												"sequenceNumber": 280
											},
											"MEGA_BLOKS": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "MEGA_BLOKS",
												"matchingProductCount": -1,
												"sequenceNumber": 326
											},
											"Schr_del": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Schr_del",
												"matchingProductCount": -1,
												"sequenceNumber": 439
											},
											"Aladine": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Aladine",
												"matchingProductCount": -1,
												"sequenceNumber": 11
											},
											"Heunec": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Heunec",
												"matchingProductCount": -1,
												"sequenceNumber": 223
											},
											"Star_Wars": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Star_Wars",
												"matchingProductCount": -1,
												"sequenceNumber": 480
											},
											"Menschenkinder_Verlag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Menschenkinder_Verlag",
												"matchingProductCount": -1,
												"sequenceNumber": 327
											},
											"Haba": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Haba",
												"matchingProductCount": -1,
												"sequenceNumber": 207
											},
											"Filly": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Filly",
												"matchingProductCount": -1,
												"sequenceNumber": 176
											},
											"Marvel_Avengers": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Marvel_Avengers",
												"matchingProductCount": -1,
												"sequenceNumber": 316
											},
											"K_pt_n_Blaub_r": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "K_pt_n_Blaub_r",
												"matchingProductCount": -1,
												"sequenceNumber": 256
											},
											"New_Sports": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "New_Sports",
												"matchingProductCount": -1,
												"sequenceNumber": 348
											},
											"Clementoni": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Clementoni",
												"matchingProductCount": -1,
												"sequenceNumber": 84
											},
											"JOLLY": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "JOLLY",
												"matchingProductCount": -1,
												"sequenceNumber": 247
											},
											"KidKraft": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KidKraft",
												"matchingProductCount": -1,
												"sequenceNumber": 265
											},
											"NICI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "NICI",
												"matchingProductCount": -1,
												"sequenceNumber": 349
											},
											"Mia_Me": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Mia_Me",
												"matchingProductCount": -1,
												"sequenceNumber": 329
											},
											"The_Walt_Disney_Company": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "The_Walt_Disney_Company",
												"matchingProductCount": -1,
												"sequenceNumber": 504
											},
											"Jamara": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Jamara",
												"matchingProductCount": -1,
												"sequenceNumber": 241
											},
											"Stadlbauer": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Stadlbauer",
												"matchingProductCount": -1,
												"sequenceNumber": 475
											},
											"4YOU": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "4YOU",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											},
											"Dalber": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Dalber",
												"matchingProductCount": -1,
												"sequenceNumber": 96
											},
											"NIERMANN": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "NIERMANN",
												"matchingProductCount": -1,
												"sequenceNumber": 350
											},
											"Carlsen_Verlag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Carlsen_Verlag",
												"matchingProductCount": -1,
												"sequenceNumber": 76
											},
											"Barbapapa": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Barbapapa",
												"matchingProductCount": -1,
												"sequenceNumber": 28
											},
											"Edu_Toys": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Edu_Toys",
												"matchingProductCount": -1,
												"sequenceNumber": 149
											},
											"Twentieth_Century_Fox_Home": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Twentieth_Century_Fox_Home",
												"matchingProductCount": -1,
												"sequenceNumber": 524
											},
											"Vulli": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Vulli",
												"matchingProductCount": -1,
												"sequenceNumber": 545
											},
											"Feber": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Feber",
												"matchingProductCount": -1,
												"sequenceNumber": 172
											},
											"candide": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "candide",
												"matchingProductCount": -1,
												"sequenceNumber": 74
											},
											"Tommee_Tippee": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Tommee_Tippee",
												"matchingProductCount": -1,
												"sequenceNumber": 514
											},
											"X4_TECH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "X4_TECH",
												"matchingProductCount": -1,
												"sequenceNumber": 561
											},
											"Donkey_Products": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Donkey_Products",
												"matchingProductCount": -1,
												"sequenceNumber": 136
											},
											"Stamp": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Stamp",
												"matchingProductCount": -1,
												"sequenceNumber": 477
											},
											"Jakks_Pacific": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Jakks_Pacific",
												"matchingProductCount": -1,
												"sequenceNumber": 240
											},
											"NUK": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "NUK",
												"matchingProductCount": -1,
												"sequenceNumber": 357
											},
											"Batman": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Batman",
												"matchingProductCount": -1,
												"sequenceNumber": 30
											},
											"David_Fussenegger": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "David_Fussenegger",
												"matchingProductCount": -1,
												"sequenceNumber": 99
											},
											"Tecnopro": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Tecnopro",
												"matchingProductCount": -1,
												"sequenceNumber": 499
											},
											"suenos": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "suenos",
												"matchingProductCount": -1,
												"sequenceNumber": 490
											},
											"SYDERF": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SYDERF",
												"matchingProductCount": -1,
												"sequenceNumber": 494
											},
											"Koch_Media_Deutschland_GmbH": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Koch_Media_Deutschland_GmbH",
												"matchingProductCount": -1,
												"sequenceNumber": 273
											},
											"BuitenSpeel": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "BuitenSpeel",
												"matchingProductCount": -1,
												"sequenceNumber": 67
											},
											"Klein": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Klein",
												"matchingProductCount": -1,
												"sequenceNumber": 269
											},
											"Roba": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Roba",
												"matchingProductCount": -1,
												"sequenceNumber": 422
											},
											"Funny": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Funny",
												"matchingProductCount": -1,
												"sequenceNumber": 185
											},
											"Emily_Erdbeer": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Emily_Erdbeer",
												"matchingProductCount": -1,
												"sequenceNumber": 156
											},
											"Troll___Toy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Troll___Toy",
												"matchingProductCount": -1,
												"sequenceNumber": 521
											},
											"Faber_Castell": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Faber_Castell",
												"matchingProductCount": -1,
												"sequenceNumber": 168
											},
											"Spin_Master": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Spin_Master",
												"matchingProductCount": -1,
												"sequenceNumber": 471
											},
											"PHILIPS_AVENT": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PHILIPS_AVENT",
												"matchingProductCount": -1,
												"sequenceNumber": 380
											},
											"CAUSE": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "CAUSE",
												"matchingProductCount": -1,
												"sequenceNumber": 80
											},
											"Covers___Co_": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Covers___Co_",
												"matchingProductCount": -1,
												"sequenceNumber": 91
											},
											"Sandm_nnchen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sandm_nnchen",
												"matchingProductCount": -1,
												"sequenceNumber": 429
											},
											"Sticky_Mosaics": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sticky_Mosaics",
												"matchingProductCount": -1,
												"sequenceNumber": 485
											},
											"CRAZE": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "CRAZE",
												"matchingProductCount": -1,
												"sequenceNumber": 93
											},
											"Gigamic": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Gigamic",
												"matchingProductCount": -1,
												"sequenceNumber": 195
											},
											"Super_Mario": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Super_Mario",
												"matchingProductCount": -1,
												"sequenceNumber": 493
											},
											"Wader_Wozniak": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Wader_Wozniak",
												"matchingProductCount": -1,
												"sequenceNumber": 547
											},
											"Bombyx": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Bombyx",
												"matchingProductCount": -1,
												"sequenceNumber": 57
											},
											"Marvel_Heroes": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Marvel_Heroes",
												"matchingProductCount": -1,
												"sequenceNumber": 317
											},
											"Repos": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Repos",
												"matchingProductCount": -1,
												"sequenceNumber": 419
											},
											"VADOBAG": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "VADOBAG",
												"matchingProductCount": -1,
												"sequenceNumber": 539
											},
											"Roth_Ideen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Roth_Ideen",
												"matchingProductCount": -1,
												"sequenceNumber": 424
											},
											"Der_kleine_K_nig": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Der_kleine_K_nig",
												"matchingProductCount": -1,
												"sequenceNumber": 106
											},
											"Stick_n_Style": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Stick_n_Style",
												"matchingProductCount": -1,
												"sequenceNumber": 484
											},
											"BOTI": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "BOTI",
												"matchingProductCount": -1,
												"sequenceNumber": 60
											},
											"Razor": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Razor",
												"matchingProductCount": -1,
												"sequenceNumber": 417
											},
											"Speedminton": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Speedminton",
												"matchingProductCount": -1,
												"sequenceNumber": 467
											},
											"YooHoo": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "YooHoo",
												"matchingProductCount": -1,
												"sequenceNumber": 564
											},
											"Prinzessin_Lillifee": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Prinzessin_Lillifee",
												"matchingProductCount": -1,
												"sequenceNumber": 401
											},
											"Hubelino": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hubelino",
												"matchingProductCount": -1,
												"sequenceNumber": 230
											},
											"STABILO": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "STABILO",
												"matchingProductCount": -1,
												"sequenceNumber": 474
											},
											"Biene_Maja": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Biene_Maja",
												"matchingProductCount": -1,
												"sequenceNumber": 50
											},
											"Kaufmanns": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Kaufmanns",
												"matchingProductCount": -1,
												"sequenceNumber": 259
											},
											"Bibi_Blocksberg": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Bibi_Blocksberg",
												"matchingProductCount": -1,
												"sequenceNumber": 48
											},
											"Pustefix": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pustefix",
												"matchingProductCount": -1,
												"sequenceNumber": 408
											},
											"Magnetspiele": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Magnetspiele",
												"matchingProductCount": -1,
												"sequenceNumber": 309
											},
											"Rayher": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Rayher",
												"matchingProductCount": -1,
												"sequenceNumber": 416
											},
											"IMC_Toys": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "IMC_Toys",
												"matchingProductCount": -1,
												"sequenceNumber": 237
											},
											"NIVEA": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "NIVEA",
												"matchingProductCount": -1,
												"sequenceNumber": 353
											},
											"Thinkfun": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Thinkfun",
												"matchingProductCount": -1,
												"sequenceNumber": 505
											},
											"Falk": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Falk",
												"matchingProductCount": -1,
												"sequenceNumber": 169
											},
											"PLAYMOBIL": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "PLAYMOBIL",
												"matchingProductCount": -1,
												"sequenceNumber": 394
											},
											"Heros": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Heros",
												"matchingProductCount": -1,
												"sequenceNumber": 222
											},
											"Hauck": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Hauck",
												"matchingProductCount": -1,
												"sequenceNumber": 215
											},
											"SES_Creative": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "SES_Creative",
												"matchingProductCount": -1,
												"sequenceNumber": 447
											},
											"Dracco": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Dracco",
												"matchingProductCount": -1,
												"sequenceNumber": 138
											},
											"sanosan": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "sanosan",
												"matchingProductCount": -1,
												"sequenceNumber": 430
											},
											"Ravensburger": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Ravensburger",
												"matchingProductCount": -1,
												"sequenceNumber": 414
											},
											"Disney_Violetta": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Disney_Violetta",
												"matchingProductCount": -1,
												"sequenceNumber": 133
											},
											"cloudb": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "cloudb",
												"matchingProductCount": -1,
												"sequenceNumber": 85
											},
											"ProType": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "ProType",
												"matchingProductCount": -1,
												"sequenceNumber": 406
											},
											"Hudora": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Hudora",
												"matchingProductCount": -1,
												"sequenceNumber": 232
											},
											"Pritt": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Pritt",
												"matchingProductCount": -1,
												"sequenceNumber": 402
											},
											"Lutz_Mauder_Verlag": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Lutz_Mauder_Verlag",
												"matchingProductCount": -1,
												"sequenceNumber": 306
											},
											"KSG": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "KSG",
												"matchingProductCount": -1,
												"sequenceNumber": 277
											},
											"Schleich": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Schleich",
												"matchingProductCount": -1,
												"sequenceNumber": 435
											},
											"Schipper": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Schipper",
												"matchingProductCount": -1,
												"sequenceNumber": 434
											},
											"fashy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "fashy",
												"matchingProductCount": -1,
												"sequenceNumber": 171
											},
											"Crayola": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Crayola",
												"matchingProductCount": -1,
												"sequenceNumber": 92
											},
											"Noris": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Noris",
												"matchingProductCount": -1,
												"sequenceNumber": 354
											},
											"Selecta": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Selecta",
												"matchingProductCount": -1,
												"sequenceNumber": 444
											},
											"Game_Works": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Game_Works",
												"matchingProductCount": -1,
												"sequenceNumber": 190
											},
											"Simpsons": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Simpsons",
												"matchingProductCount": -1,
												"sequenceNumber": 454
											},
											"Paramount": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Paramount",
												"matchingProductCount": -1,
												"sequenceNumber": 366
											},
											"Capt_n_Sharky": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Capt_n_Sharky",
												"matchingProductCount": -1,
												"sequenceNumber": 75
											},
											"Take_it_Easy": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Take_it_Easy",
												"matchingProductCount": -1,
												"sequenceNumber": 497
											},
											"Amazonas": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Amazonas",
												"matchingProductCount": -1,
												"sequenceNumber": 16
											},
											"Der_kleine_Eisb_r": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Der_kleine_Eisb_r",
												"matchingProductCount": -1,
												"sequenceNumber": 105
											},
											"Glow2B": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Glow2B",
												"matchingProductCount": -1,
												"sequenceNumber": 199
											},
											"Lauras_Stern": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Lauras_Stern",
												"matchingProductCount": -1,
												"sequenceNumber": 287
											},
											"Simba": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "Simba",
												"matchingProductCount": -1,
												"sequenceNumber": 453
											},
											"P_b_o": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "P_b_o",
												"matchingProductCount": -1,
												"sequenceNumber": 371
											},
											"B_bchen": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "B_bchen",
												"matchingProductCount": -1,
												"sequenceNumber": 65
											},
											"Limit": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Limit",
												"matchingProductCount": -1,
												"sequenceNumber": 299
											},
											"Sorgenfresser": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": false,
												"stateName": "Sorgenfresser",
												"matchingProductCount": -1,
												"sequenceNumber": 466
											}
										},
										"visible": true,
										"expanded": true,
										"sequenceNumber": 2,
										"facetInGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer.group1.Manufacturer"
									}
								},
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard.Phase1.age_female": {
								"enabled": true,
								"inView": false,
								"visible": false,
								"wasVisible": false,
								"facetGroupName": "xcAjaxClient.wizard.Phase1.age_female",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": {
									"xcAjaxClient.wizard.Phase1.age_female.age": {
										"enabled": true,
										"facetInGroupStateVarItems": {
											"0_6_months": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "0_6_months",
												"matchingProductCount": -1,
												"sequenceNumber": 0
											},
											"4_5_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "4_5_years",
												"matchingProductCount": -1,
												"sequenceNumber": 4
											},
											"8_9_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "8_9_years",
												"matchingProductCount": -1,
												"sequenceNumber": 6
											},
											"older_12_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "older_12_years",
												"matchingProductCount": -1,
												"sequenceNumber": 8
											},
											"2_3_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "2_3_years",
												"matchingProductCount": -1,
												"sequenceNumber": 3
											},
											"7_12_months": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "7_12_months",
												"matchingProductCount": -1,
												"sequenceNumber": 1
											},
											"10_12_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "10_12_years",
												"matchingProductCount": -1,
												"sequenceNumber": 7
											},
											"13_24_months": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "13_24_months",
												"matchingProductCount": -1,
												"sequenceNumber": 2
											},
											"6_7_years": {
												"enabled": true,
												"estimatedValue": 0,
												"visible": true,
												"stateName": "6_7_years",
												"matchingProductCount": -1,
												"sequenceNumber": 5
											}
										},
										"visible": false,
										"expanded": true,
										"sequenceNumber": 0,
										"facetInGroupName": "xcAjaxClient.wizard.Phase1.age_female.age"
									}
								},
								"expanded": true,
								"sequenceNumber": 1,
								"completed": true
							},
							"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.explorer",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": null,
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.recommendations_wrapper": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper.recommendations_wrapper",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": null,
								"expanded": true,
								"sequenceNumber": 1,
								"completed": true
							},
							"xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper": {
								"enabled": true,
								"inView": true,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.RecommendationPhase.endgame_wrapper",
								"inPath": true,
								"wasInView": true,
								"facetInGroupVarItems": null,
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard": {
								"enabled": true,
								"inView": false,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard",
								"inPath": true,
								"wasInView": false,
								"facetInGroupVarItems": null,
								"expanded": true,
								"sequenceNumber": 0,
								"completed": true
							},
							"xcAjaxClient.wizard.RecommendationPhase": {
								"enabled": true,
								"inView": true,
								"visible": true,
								"wasVisible": true,
								"facetGroupName": "xcAjaxClient.wizard.RecommendationPhase",
								"inPath": true,
								"wasInView": true,
								"facetInGroupVarItems": null,
								"expanded": true,
								"sequenceNumber": 3,
								"completed": true
							}
						}
					},
					"products": {
						"productItems": {
							"1854": {
								"priceLabel": "28,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1824098-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1824098-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1824098-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-1824098",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-2000-teile-gelini-kueche-kochen-leidenschaft-1824098.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle 2000 Teile Gelini  Küche  Kochen  Leidenschaft ",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 1854,
								"price": "28.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "1824098",
								"netPriceLabel": ""
							},
							"3023": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1613907-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1613907-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1613907-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-1613907",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-2000-teile-am-wasserloch-1613907.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle-2000 Teile- Am Wasserloch",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 3023,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "1613907",
								"netPriceLabel": ""
							},
							"3256": {
								"priceLabel": "23,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1481276-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1481276-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1481276-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-1481276",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-1500-teile-gelini-wellness-1481276.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle-1500 Teile- Gelini  Wellness",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 3256,
								"price": "23.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "1481276",
								"netPriceLabel": ""
							},
							"3801": {
								"priceLabel": "42,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1634650-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1634650-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1634650-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-1634650",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-3000-teile-blaeuw-weltkarte-1665-1634650.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle 3000 Teile Blaeuw Weltkarte 1665",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 3801,
								"price": "42.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "1634650",
								"netPriceLabel": ""
							},
							"4712": {
								"priceLabel": "14,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1914225-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1914225-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/1914225-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-1914225",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "schmidt-spiele-puzzle-pad-fuer-puzzles-bis-1-000-teile-1914225.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle Pad für Puzzles bis 1.000 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 4712,
								"price": "14.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Schmidt Spiele",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "1914225",
								"netPriceLabel": ""
							},
							"5225": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2414769-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2414769-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2414769-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2414769",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-new-york-city-2000-teile-2414769.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle New York City 2000 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 5225,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2414769",
								"netPriceLabel": ""
							},
							"6757": {
								"priceLabel": "16,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410280-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410280-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410280-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2410280",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-magnetbox-verrueckte-gesichter-2410280.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Magnetbox - Verrückte Gesichter",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 6757,
								"price": "16.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2410280",
								"netPriceLabel": ""
							},
							"6810": {
								"priceLabel": "18,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410269-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410269-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410269-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2410269",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "22.99",
													"valueImage": null,
													"facet": true
												},
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-puzzle-koefferchen-27-teile-riesen-alphabet-bahn-2410269.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle Köfferchen 27 Teile - Riesen Alphabet Bahn",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 6810,
								"price": "18.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2410269",
								"netPriceLabel": ""
							},
							"6922": {
								"priceLabel": "29,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2195696-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2195696-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2195696-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2195696",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "42.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-san-francisco-bei-nacht-3000-teile-puzzle-2195696.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "San Francisco bei Nacht - 3000 Teile Puzzle",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 6922,
								"price": "29.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2195696",
								"netPriceLabel": ""
							},
							"6996": {
								"priceLabel": "19,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410270-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410270-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2410270-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2410270",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-puzzle-koefferchen-208-teile-rundpuzzle-unser-blauer-planet-2410270.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle Köfferchen 208 Teile - Rundpuzzle Unser blauer Planet",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 6996,
								"price": "19.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2410270",
								"netPriceLabel": ""
							},
							"7190": {
								"priceLabel": "19,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2342617-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2342617-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2342617-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2342617",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "29.99",
													"valueImage": null,
													"facet": true
												},
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "jumbo-spiel-des-jahres-1980-original-rummikub-classic-mit-sanduhr-2342617.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "SPIEL DES JAHRES 1980 Original Rummikub Classic - mit Sanduhr",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 7190,
								"price": "19.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Jumbo",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2342617",
								"netPriceLabel": ""
							},
							"8629": {
								"priceLabel": "25,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2354247-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2354247-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2354247-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2354247",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Mindestalter: 14 Jahre",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-gelini-umzugschaos-2000-teile-puzzle-2354247.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Gelini: Umzugschaos - 2000 Teile Puzzle",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 8629,
								"price": "25.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2354247",
								"netPriceLabel": ""
							},
							"10056": {
								"priceLabel": "23,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2886928-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2886928-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2886928-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2886928",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-leben-unter-wasser-1500-teile-2886928.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle Leben unter Wasser 1500 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 10056,
								"price": "23.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2886928",
								"netPriceLabel": ""
							},
							"10062": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2886931-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2886931-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/2886931-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-2886931",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-kaffeepause-2000-teile-2886931.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle Kaffeepause 2000 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 10062,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "2886931",
								"netPriceLabel": ""
							},
							"11408": {
								"priceLabel": "23,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3176764-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3176764-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3176764-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3176764",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-1500-teile-gelini-gartenarbeit-3176764.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle 1500 Teile - Gelini  Gartenarbeit",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 11408,
								"price": "23.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3176764",
								"netPriceLabel": ""
							},
							"11498": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3176795-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3176795-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3176795-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3176795",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-2000-teile-dschungelimpressionen-3176795.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle 2000 Teile - Dschungelimpressionen",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 11498,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3176795",
								"netPriceLabel": ""
							},
							"11779": {
								"priceLabel": "16,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219273-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219273-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219273-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3219273",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-magnetbox-vier-jahreszeiten-3219273.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Magnetbox - Vier Jahreszeiten",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 11779,
								"price": "16.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3219273",
								"netPriceLabel": ""
							},
							"12027": {
								"priceLabel": "16,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219327-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219327-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219327-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3219327",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "17.99",
													"valueImage": null,
													"facet": true
												},
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-puzzle-koefferchen-100-teile-fahrzeuge-3219327.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle Köfferchen 100 Teile - Fahrzeuge",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 12027,
								"price": "16.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3219327",
								"netPriceLabel": ""
							},
							"12048": {
								"priceLabel": "19,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219275-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219275-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219275-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3219275",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-magnetbox-mademoiselle-3219275.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Magnetbox - Mademoiselle",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 12048,
								"price": "19.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3219275",
								"netPriceLabel": ""
							},
							"12053": {
								"priceLabel": "16,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219335-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219335-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3219335-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3219335",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-magnetbox-maedchenkostueme-3219335.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Magnetbox - Mädchenkostüme",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 12053,
								"price": "16.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3219335",
								"netPriceLabel": ""
							},
							"12346": {
								"priceLabel": "28,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3284602-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3284602-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3284602-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3284602",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzle-2000-teile-feuerwerk-ueber-sydney-3284602.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Puzzle 2000 Teile - Feuerwerk über Sydney",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 12346,
								"price": "28.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3284602",
								"netPriceLabel": ""
							},
							"12347": {
								"priceLabel": "23,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3284599-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3284599-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3284599-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3284599",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-james-rizzi-all-that-love-in-the-middle-of-the-city-1-500-teile-3284599.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "James Rizzi - All that Love in the Middle of the City  1.500 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 12347,
								"price": "23.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3284599",
								"netPriceLabel": ""
							},
							"14046": {
								"priceLabel": "42,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412960-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412960-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412960-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3412960",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-ma-provence-3412960.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Ma Provence",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 14046,
								"price": "42.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3412960",
								"netPriceLabel": ""
							},
							"14859": {
								"priceLabel": "21,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412957-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412957-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412957-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3412957",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "23.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-romantisches-venedig-1500-teile-3412957.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Romantisches Venedig  1500 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 14859,
								"price": "21.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3412957",
								"netPriceLabel": ""
							},
							"15157": {
								"priceLabel": "15,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412919-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412919-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412919-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3412919",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Mindestalter: 3 Jahre, Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-puzzleball-suesse-delfine-108-teile-3412919.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "puzzleball Süße Delfine 108 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 15157,
								"price": "15.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3412919",
								"netPriceLabel": ""
							},
							"15349": {
								"priceLabel": "21,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412955-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412955-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3412955-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3412955",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "23.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-paris-mon-amour-3412955.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Paris  mon amour",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 15349,
								"price": "21.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3412955",
								"netPriceLabel": ""
							},
							"15476": {
								"priceLabel": "36,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651482-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651482-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651482-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3651482",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "42.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-schloss-neuschwanstein-im-winter-3000-teile-3651482.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Schloß Neuschwanstein im Winter 3000 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 15476,
								"price": "36.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3651482",
								"netPriceLabel": ""
							},
							"16291": {
								"priceLabel": "19,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3579221-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3579221-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3579221-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3579221",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Mindestalter: 3 Jahre, Nicht für Kinder unter 36 Monaten geeignet.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "jumbo-mega-grosses-bodenpuzzle-9-teile-disney-jake-und-die-nimmerland-piraten-3579221.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Mega großes Bodenpuzzle 9 Teile - Disney Jake und die Nimmerland Piraten",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 16291,
								"price": "19.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Jumbo",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3579221",
								"netPriceLabel": ""
							},
							"16876": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3635535-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3635535-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3635535-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3635535",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "29.99",
													"valueImage": null,
													"facet": true
												},
												"warningtags_multiple": {
													"sequenceNumber": 1,
													"label": "",
													"unit": "",
													"value": "Nicht für Kinder unter 36 Monaten geeignet. Erstickungsgefahr aufgrund verschluckbarer Kleinteile.",
													"valueImage": null,
													"facet": false
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "janod-magnetische-weltkarte-tiere-3635535.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Magnetische Weltkarte - Tiere",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 16876,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Janod",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3635535",
								"netPriceLabel": ""
							},
							"17133": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651481-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651481-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651481-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3651481",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-welt-der-buecher-2000-teile-3651481.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Welt der Bücher 2000 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 17133,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3651481",
								"netPriceLabel": ""
							},
							"18821": {
								"priceLabel": "23,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651476-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651476-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3651476-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3651476",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-cottage-in-england-1500-teile-3651476.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "Cottage in England 1500 Teile",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 18821,
								"price": "23.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3651476",
								"netPriceLabel": ""
							},
							"21293": {
								"priceLabel": "25,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934003-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934003-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934003-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3934003",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-2000-teile-panorama-lebendiger-ozean-panorama-3934003.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "2000 Teile Panorama Lebendiger Ozean - Panorama",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 21293,
								"price": "25.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3934003",
								"netPriceLabel": ""
							},
							"21308": {
								"priceLabel": "21,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934000-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934000-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934000-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3934000",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "23.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-1500-teile-blick-auf-rio-3934000.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "1500 Teile Blick auf Rio",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 21308,
								"price": "21.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3934000",
								"netPriceLabel": ""
							},
							"22040": {
								"priceLabel": "24,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934002-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934002-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934002-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3934002",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "28.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-2000-teile-engelsbruecke-in-rom-3934002.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "2000 Teile Engelsbrücke in Rom",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 22040,
								"price": "24.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3934002",
								"netPriceLabel": ""
							},
							"22595": {
								"priceLabel": "21,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934001-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934001-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934001-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3934001",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "23.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-1500-teile-schloss-azay-le-rideau-loiretal-3934001.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "1500 Teile Schloss Azay-le-Rideau  Loiretal",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 22595,
								"price": "21.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3934001",
								"netPriceLabel": ""
							},
							"23736": {
								"priceLabel": "38,99 €",
								"imageItems": {
									"main_0": {
										"sequenceNumber": 0,
										"large": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934005-01.jpg?$l$"
										},
										"regular": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934005-01.jpg?$l$"
										},
										"thumb": {
											"location": "http://mytoys.scene7.com/is/image/myToys/ext/3934005-01.jpg?$l$"
										}
									}
								},
								"purchaseUrl": "",
								"detailsPageUrl": "http://www.mytoys.de/mpr?sku=de_DE-3934005",
								"attributeRootGroup": {
									"name": "ROOT",
									"label": null,
									"attributeItems": null,
									"productAttributeGroupItems": {
										"main": {
											"name": "main",
											"label": "",
											"attributeItems": {
												"old_price": {
													"sequenceNumber": 0,
													"label": "",
													"unit": " €",
													"value": "42.99",
													"valueImage": null,
													"facet": true
												},
												"productdetailpageuri": {
													"sequenceNumber": 5,
													"label": "",
													"unit": "",
													"value": "ravensburger-3000-teile-sognefjord-norwegen-3934005.html",
													"valueImage": null,
													"facet": false
												}
											},
											"productAttributeGroupItems": null
										}
									}
								},
								"customerVariantsGroupId": "",
								"netPrice": "",
								"label": "3000 Teile Sognefjord  Norwegen",
								"styleTagItems": null,
								"listPriceLabel": "",
								"listPriceNet": "",
								"id": 23736,
								"price": "38.99",
								"variantProductIdItems": null,
								"listPrice": "",
								"manufacturer": "Ravensburger",
								"description": "",
								"variantsGroupId": "",
								"customerProductId": "3934005",
								"netPriceLabel": ""
							}
						}
					},
					"recommendations": {
						"count": 36,
						"totalCount": 1035,
						"perfectMatchCount": 36,
						"recommendationRootGroup": {
							"count": 0,
							"totalCount": 0,
							"description": null,
							"recommendationItems": null,
							"label": null,
							"recommendationGroupItems": {
								"app_test.recommendationGroup.top": {
									"count": 0,
									"totalCount": 0,
									"description": "TODO:top",
									"recommendationItems": {
										"app_test.recommendation.position.0": {
											"position": 0,
											"fit": 4.870503626775798,
											"perfectMatch": true,
											"label": "top",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "top",
											"productVariants": null,
											"sequenceNumber": 0,
											"productId": 7190,
											"customerProductId": "2342617"
										}
									},
									"label": "TODO:top",
									"recommendationGroupItems": null,
									"from": 0,
									"type": "top",
									"sequenceNumber": 0
								},
								"app_test.recommendationGroup.recommendation": {
									"count": 0,
									"totalCount": 0,
									"description": "TODO:recommendation",
									"recommendationItems": {
										"app_test.recommendation.position.15": {
											"position": 15,
											"fit": 4.829317989444463,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 14,
											"productId": 16291,
											"customerProductId": "3579221"
										},
										"app_test.recommendation.position.14": {
											"position": 14,
											"fit": 4.809425269855565,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 13,
											"productId": 6810,
											"customerProductId": "2410269"
										},
										"app_test.recommendation.position.13": {
											"position": 13,
											"fit": 4.829317989444463,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 12,
											"productId": 12048,
											"customerProductId": "3219275"
										},
										"app_test.recommendation.position.35": {
											"position": 35,
											"fit": 4.766549943370315,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 34,
											"productId": 4712,
											"customerProductId": "1914225"
										},
										"app_test.recommendation.position.12": {
											"position": 12,
											"fit": 4.845135581569316,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 11,
											"productId": 15349,
											"customerProductId": "3412955"
										},
										"app_test.recommendation.position.34": {
											"position": 34,
											"fit": 4.845135553163978,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 33,
											"productId": 8629,
											"customerProductId": "2354247"
										},
										"app_test.recommendation.position.19": {
											"position": 19,
											"fit": 4.791657147614388,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 18,
											"productId": 11779,
											"customerProductId": "3219273"
										},
										"app_test.recommendation.position.18": {
											"position": 18,
											"fit": 4.845135574584397,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 17,
											"productId": 6922,
											"customerProductId": "2195696"
										},
										"app_test.recommendation.position.17": {
											"position": 17,
											"fit": 4.845135581569316,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 16,
											"productId": 21308,
											"customerProductId": "3934000"
										},
										"app_test.recommendation.position.16": {
											"position": 16,
											"fit": 4.791657147614388,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 15,
											"productId": 6757,
											"customerProductId": "2410280"
										},
										"app_test.recommendation.position.11": {
											"position": 11,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 10,
											"productId": 22040,
											"customerProductId": "3934002"
										},
										"app_test.recommendation.position.33": {
											"position": 33,
											"fit": 4.845135553163978,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 32,
											"productId": 1854,
											"customerProductId": "1824098"
										},
										"app_test.recommendation.position.10": {
											"position": 10,
											"fit": 4.845135581569316,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 9,
											"productId": 14859,
											"customerProductId": "3412957"
										},
										"app_test.recommendation.position.32": {
											"position": 32,
											"fit": 4.845135560614558,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 31,
											"productId": 15476,
											"customerProductId": "3651482"
										},
										"app_test.recommendation.position.31": {
											"position": 31,
											"fit": 4.785140182313184,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 30,
											"productId": 15157,
											"customerProductId": "3412919"
										},
										"app_test.recommendation.position.30": {
											"position": 30,
											"fit": 4.845135566202494,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 29,
											"productId": 14046,
											"customerProductId": "3412960"
										},
										"app_test.recommendation.position.6": {
											"position": 6,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 5,
											"productId": 11498,
											"customerProductId": "3176795"
										},
										"app_test.recommendation.position.5": {
											"position": 5,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 4,
											"productId": 12346,
											"customerProductId": "3284602"
										},
										"app_test.recommendation.position.4": {
											"position": 4,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 3,
											"productId": 10062,
											"customerProductId": "2886931"
										},
										"app_test.recommendation.position.3": {
											"position": 3,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 2,
											"productId": 5225,
											"customerProductId": "2414769"
										},
										"app_test.recommendation.position.2": {
											"position": 2,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 1,
											"productId": 3023,
											"customerProductId": "1613907"
										},
										"app_test.recommendation.position.1": {
											"position": 1,
											"fit": 4.851172256399527,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 0,
											"productId": 16876,
											"customerProductId": "3635535"
										},
										"app_test.recommendation.position.26": {
											"position": 26,
											"fit": 4.845135571790429,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 25,
											"productId": 12347,
											"customerProductId": "3284599"
										},
										"app_test.recommendation.position.25": {
											"position": 25,
											"fit": 4.845135571790429,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 24,
											"productId": 11408,
											"customerProductId": "3176764"
										},
										"app_test.recommendation.position.24": {
											"position": 24,
											"fit": 4.7843180252790045,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 23,
											"productId": 12027,
											"customerProductId": "3219327"
										},
										"app_test.recommendation.position.23": {
											"position": 23,
											"fit": 4.845135571790429,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 22,
											"productId": 10056,
											"customerProductId": "2886928"
										},
										"app_test.recommendation.position.9": {
											"position": 9,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 8,
											"productId": 17133,
											"customerProductId": "3651481"
										},
										"app_test.recommendation.position.29": {
											"position": 29,
											"fit": 4.845135566202494,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 28,
											"productId": 3801,
											"customerProductId": "1634650"
										},
										"app_test.recommendation.position.8": {
											"position": 8,
											"fit": 4.829318036861541,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 7,
											"productId": 6996,
											"customerProductId": "2410270"
										},
										"app_test.recommendation.position.28": {
											"position": 28,
											"fit": 4.845135571790429,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 27,
											"productId": 18821,
											"customerProductId": "3651476"
										},
										"app_test.recommendation.position.7": {
											"position": 7,
											"fit": 4.8451355829663,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 6,
											"productId": 21293,
											"customerProductId": "3934003"
										},
										"app_test.recommendation.position.27": {
											"position": 27,
											"fit": 4.845135571790429,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 26,
											"productId": 23736,
											"customerProductId": "3934005"
										},
										"app_test.recommendation.position.22": {
											"position": 22,
											"fit": 4.791657117812066,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 21,
											"productId": 12053,
											"customerProductId": "3219335"
										},
										"app_test.recommendation.position.21": {
											"position": 21,
											"fit": 4.845135571790429,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 20,
											"productId": 3256,
											"customerProductId": "1481276"
										},
										"app_test.recommendation.position.20": {
											"position": 20,
											"fit": 4.845135581569316,
											"perfectMatch": true,
											"label": "recommendation",
											"reasonRootGroup": {
												"reasonGroupItems": null,
												"name": "ROOT",
												"reasonItems": null,
												"type": "ROOT",
												"sequenceNumber": 0,
												"label": null
											},
											"type": "recommendation",
											"productVariants": null,
											"sequenceNumber": 19,
											"productId": 22595,
											"customerProductId": "3934001"
										}
									},
									"label": "TODO:recommendation",
									"recommendationGroupItems": null,
									"from": 0,
									"type": "recommendation",
									"sequenceNumber": 1
								}
							},
							"from": 0,
							"type": "ROOT",
							"sequenceNumber": 0
						},
						"noFacetSet": false,
						"from": 0,
						"widgetType": null
					},
					"comparisonList": {
						"productItems": null
					}
				}
			},
			"metaData": {
				"apiVersion": "2.1.0",
				"serverStatus": {
					"status": "OK",
					"messageItems": null
				},
				"requestParameterItems": {
					"facetRootGroupVars": "",
					"facetRootGroup": ""
				},
				"locale": "de_DE",
				"currentUserName": null,
				"availableLocales": {
					"availableLocaleItems": {
						"de_DE": {
							"code": "de_DE"
						}
					}
				},
				"sessionTimeout": 1800000,
				"projectVersion": "default",
				"validLogin": false,
				"system": system,
				"responseId": 0,
				"sessionId": "1fr4a152p01c01c7qe3e43vt1v",
				"projectRevision": "",
				"availableApplications": {
					"availableApplicationItems": {
						"app_test": {
							"name": "app_test"
						}
					}
				},
				"visitorId": "7029972602",
				"projectName": project
			}
		}
	};

	if(typeof define === "function" && define.amd){
		define("excentos/tests/data/xcInitial", [], xcInitial);
	}

	return xcInitial;
})();