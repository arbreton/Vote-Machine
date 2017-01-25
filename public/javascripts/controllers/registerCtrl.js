var app = angular.module('registerCtrl', []);
app.controller('RegisterController', RegisterController);

		function RegisterController(province) {

			var vm = this;

			// The model object that we reference
			// on the <formly-form> element in index.html
			vm.rental = {};


			// An array of our form fields with configuration
			// and options set. We make reference to this in
			// the 'fields' attribute on the <formly-form> element
			vm.rentalFields =[

			{
				"className":"row",
				"fieldGroup":[
				{
				"className":"col-xs-4",
				"type":"input","key":"input-1485302794481",
				"templateOptions":{
					"type":"","label":"Electoral Code / Username",
					"required":true,
					"placeholder":"Enter your electoral code",
					"description":"",
					"options":[]
				}
			}
			
				]
			},
			{
				"className":"col-xs-4",
				"type":"input",
				"key":"input-1485303640580",
				"templateOptions":{
					"type":"password",
					"label":"Password",
					"required":true,
					"placeholder":"Enter your password.",
					"description":"",
					"options":[]
				}
			},

			{
				"className":"col-xs-4",
				"type":"datepicker",
				"key":"datepicker-1485303611246",
				"templateOptions":{
					"type":"",
					"label":"Birth Date",
					"required":true,
					"placeholder":"",
					"description":"",
					"options":[],
					"datepickerPopup":"dd-MMMM-yyyy"
				}
			},
			{
				"className":"col-xs-12",
				"type":"radio",
				"key":"radio-1485303956528",
				"templateOptions":{
					"type":"",
					"label":"Gender",
					"required":true,
					"placeholder":"",
					"description":"",
					"options":[
					{"name":"Male","value":0,"group":""},
					{"name":"Female","value":1,"group":""}]
				}
			},
			{
				"className":"row",
				"fieldGroup":[
				{
					"className":"col-xs-4",
					"type":"input",
					"key":"input-1485303666202",
					"templateOptions":{
						"type":"",
						"label":"Name",
						"required":true,
						"placeholder":"Enter your name.",
						"description":"",
						"options":[]
					}
				},
				{
					"className":"col-xs-4",
					"type":"input",
					"key":"input-1485303759363",
					"templateOptions":{
						"type":"",
						"label":"First Surname",
						"required":true,
						"placeholder":"Enter your first surname.",
						"description":"",
						"options":[]
					}
				},
				{
					"className":"col-xs-4",
					"type":"input",
					"key":"input-1485303787793",
					"templateOptions":{
						"type":"",
						"label":"Second Surname",
						"required":false,
						"placeholder":"Enter your second surname.",
						"description":"",
						"options":[]
					}
				}
				]
			},
			{
				"className":"row","fieldGroup":[
				{
					"className":"col-xs-4",
					"type":"select",
					"key":"basicSelect-1485304042245",
					"templateOptions":{
						"type":"",
						"label":"Province",
						"required":false,
						"placeholder":"",
						"options":[]
					}
				},
				{
					"className":"col-xs-4",
					"type":"select",
					"key":"basicSelect-1485304057745",
					"templateOptions":{
						"type":"",
						"label":"Canton",
						"required":false,
						"placeholder":"",
						"options":[]
					}
				},
				{
					"className":"col-xs-4",
					"type":"select",
					"key":"basicSelect-1485304095207",
					"templateOptions":{
						"type":"",
						"label":"District",
						"required":false,
						"placeholder":"",
						"options":[]
					}
				}
				]
			},
			{
				"className":"row","fieldGroup":[
				
			{
				"className":"col-xs-4",
				"type":"select",
				"key":"basicSelect-1485304199833",
				"templateOptions":{
					"type":"",
					"label":"Ethnic Group",
					"required":false,
					"options":[
					{
						"name":"Blancos y Mestizos",
						"value":0,"group":""
					},
					{
						"name":"Afrocostaricences",
						"value":1,
						"group":""
					}
					]
				}
			},
			{
				"className":"col-xs-4",
				"type":"datepicker",
				"key":"datepicker-1485304239688",
				"templateOptions":{
					"type":"",
					"label":"Expiration Date",
					"required":true,
					"placeholder":"",
					"description":"",
					"options":[],
					"datepickerPopup":"dd-MMMM-yyyy"
				}
			}]},
			{
				"className":"col-xs-12",
				"type":"checkbox",
				"key":"checkbox-1485304293540",
				"templateOptions":{
					"type":"",
					"label":"Are you an admin?",
					"required":false,"placeholder":"",
					"description":"",
					"options":[]
				}
			}

			];
		}
