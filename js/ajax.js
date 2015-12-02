$(document).ready(function(){

	if ( $(window).width() > 759) { executeDesktopCode() }

	else { executeMobileCode() }

	function executeDesktopCode() {

		//Variables Begin

			var treatmentType = 0;

			var countryToken = '';

			var countryName = '';

			var verticalToken = '';

			var verticalName = '';

			var countryData = '';

			var countrySelectedToken = '';

			var verticals = '';

			var doctorsData = '';

			var clickCount = 0;
		
		//Variables End


		//CSS Operations Begin

			$('.meetPage .B .treatmentDesc').css({'display':'none','opacity':'0'});

			$('.C, .adContainerB, .footer').hide();

			if ( $(window).width() > 759 ) { $('html').addClass('noScroll') }

			showCardClosed($('.meetPage .C .comparisonContainer .profile:last-child .close'));
		
		//CSS Operations End

		
		//Click Events Begin

			$("#type li").click(function(){

				typeOnSelectProcedures($(this));

				treatmentType = $(this).data('value');

				getVerticalsPricesAPI($(this));

				verticalSelectOperations();

			});

			$(document).on('click','#vertical li', function(){

				verticalToken = $(this).data('value');

				verticalName = $(this).text();

				getCountrysTreatmentsAPI();

				verticalSelectOperations();
			});


			$('.tagContainer').click(function(){

				countryToken = $(this).data('value');

				countryName = $(this).attr('id');

				getDoctorProfilesAPI();

				flagClickOperations($(this));
			});


			$(document).on('click','#locations li', function(){
				var element = $(this);
				$('.tagContainer').animate({'opacity':'0'},400, function(){
					$('#'+ element.text().toLowerCase()).animate({'opacity':'1'},400);
				});
			});


			$(document).on('click','.cardCountryDD li',function(){
				populateDoctorsCardSearch(doctorsData, $(this).text().toLowerCase(), $(this));
			});

			$(document).on('click','.cardDoctorDD li', function(){
				cardDoctorSelectOperations($(this).parent().parent().parent().parent().index() + 1, $(this));
			});

		//Click Events End

		
		//Calls Begin
		
			function getVerticalsPricesAPI(element) {
				$.ajax({
					url:'lnw/www/admin/json/public/filterVerticalByType.php',

					data: {'type': element.data('value')},

					dataType: 'json',

					method: 'POST',

					success: function(data){
						console.log(data);
						populateSpecialitySearch(data);
						verticals = data.data.verticals;
					},

					error: function(data) {
						console.log("Something's wrong with the countryList API"+data);
					}
				});
			}

			function getCountrysTreatmentsAPI() {
				$.ajax({
					url:'lnw/www/admin/json/public/filterTreatmentByVertical.php',

					data: {'vertical': verticalToken, 'type': treatmentType},

					dataType: 'json',

					method: 'POST',

					success: function(data){
						console.log(data);
						populateCountrySearch(data);
						populateCountryCardSearch(data);
						populateTreatmentDescription(data, function(){
							$('.meetPage .B .treatmentDesc').show().animate({'opacity':'1'},400);
							showCountryFlags(data);
							$('.meetPage .C .comparisonContainer').css('margin-top', $('.meetPage .B .treatmentDesc').height() - $('.meetPage .B .treatmentDesc p:first-child').height() + 'px');
						});
						countryData = data.data.treatments.countries;
						populateTreatmentPrices(showTreatmentPrices);
						$('.meetPage .B .wrapper .treatmentPrices').animate({'left': '0px'},400, function(){
							$('.meetPage .B .wrapper .treatmentPrices .pull').show();
						});
					},

					error: function(data) {
						console.log("Something's wrong with the treatment API"+data);
					}
				});	
			}

			function getDoctorProfilesAPI() {
value = {'vertical': verticalToken, 'country': countryToken};
console.log(value);
				$.ajax({
					url:'lnw/www/admin/json/public/filterDoctorByVerticalCountry.php',

					data: {'vertical': verticalToken,'country': countryToken},

					dataType: 'json',

					method: 'POST',

					success: function(data){
						console.log(data);

						doctorsData = data;

						$('.C, .adContainerB, .footer').show();

						$('html').removeClass('noScroll');

						var x = 0;

						for (var i in data.data.doctors) {
							if ( data.data.doctors[i].country.toLowerCase() == countryName) {
								populateDoctorsOnCard(data.data.doctors[i], parseInt(x));
								x = x + 1;
							}
						}

						if (x < 2) {
							showCardClosed($('.meetPage .C .comparisonSubContainer:first-child .profile:nth-child(2) .close'));
						}

						else {
							showCardOpen($('.meetPage .C .comparisonSubContainer:first-child .profile:nth-child(2) .close'));
						}

						$('body').animate( {'scrollTop': $('.meetPage .A').height() + $('.meetPage .B').height() - $('.meetPage .B .treatmentDesc p:first-child').height() },400);
					},

					error: function(data) {
						console.log("Something's wrong with the treatment API"+data);
					}
				});
			}

		//Calls End

		
		// Functions Begin

			function typeOnSelectProcedures(element) {

				$('#dropDownFilter').css('z-index','-1');

				$('#locations').prev().css({'background-color':'#FFFFFF','color':'#c6c6c6','border-color':'#c6c6c6'});

				$('#locations').prev().text('LOCATION');

				$('#locations').prev().removeClass('enabled');

				$('#locations').prev().addClass('disabled');

				$('.meetPage .B .wrapper .treatmentPrices').animate({'left': - $('.meetPage .B .wrapper .treatmentPrices').width()+'px'},400);

				$(window).scrollTop(0);

				$('html').addClass('noScroll');

				$('.meetPage .B .wrapper .treatmentPrices .pull').hide();

				if (element.attr('data-value') == 0) {
					$('.meetPage .B .wrapper .treatmentPrices .tableWrapper').hide();
					$('.meetPage .B .wrapper .treatmentPrices .alternativeText').show();
				}

				else {
					$('.meetPage .B .wrapper .treatmentPrices .tableWrapper').show();
					$('.meetPage .B .wrapper .treatmentPrices .alternativeText').hide();
				}
			}

			function populateSpecialitySearch(data) {
				$('#vertical').prev().text('TREATMENT');
				$('#vertical').prev().css({'background-color':'#FFFFFF','color':'#95C122'});
				$('#vertical').prev().removeClass('disabled');
				$('#vertical').prev().addClass('enabled');
				$('#vertical').children().remove();
				for (var i in data.data.verticals) {
					$('#vertical').append('<li data-value='+data.data.verticals[i].token+'>'+data.data.verticals[i].name+'</li>');
				}
			}

			function populateCountrySearch(data) {
				$('#locations').prev().text('LOCATION');
				$('#locations').prev().css({'background-color':'#FFFFFF','color':'#95C122', 'border-color':'#95C122'});
				$('#locations').prev().removeClass('disabled');
				$('#locations').prev().addClass('enabled');
				$('#locations').children().remove();
				for (var i in data.data.treatments.countries) {
						if (data.data.treatments.countries[i].country.toLowerCase() == 'india' || data.data.treatments.countries[i].country.toLowerCase() == 'thailand' && data.data.treatments.countries[i].doctors > 0) {
							$('#locations').append('<li data-value='+data.data.treatments.countries[i].countryID+'>'+data.data.treatments.countries[i].country+'</li>');
						}
				}
			}

			function populateTreatmentDescription(data,callback){
				for (var i in verticals) {
					if (verticalName == verticals[i].name) {
						$('#treatmentName').text(verticals[i].name);
						$('#treatmentDesc').text(verticals[i].description);
					}
				}
				callback();
			}

			function showCountryFlags(data) {
				for (var i in data.data.treatments.countries) {
					if (data.data.treatments.countries[i].country.toLowerCase() == 'india' || data.data.treatments.countries[i].country.toLowerCase() == 'thailand' && data.data.treatments.countries[i].doctors > 0) {
						$('#'+data.data.treatments.countries[i].country.toLowerCase()).attr('data-value', data.data.treatments.countries[i].countryID).css('display','block').animate({'opacity':'1'},400);
					}
				}
			}

			function populateTreatmentPrices(callback) {
				$('.meetPage .B .wrapper .treatmentPrices .container').children().not($('.meetPage .B .wrapper .treatmentPrices .container .head')).remove();
				$('.meetPage .B .wrapper .treatmentPrices h1').text(verticalName);
				for (var i in countryData) {
					$('.meetPage .B .wrapper .treatmentPrices .container .head .cell:nth-child('+( parseInt(i)+2)+') img')
					.attr('src',$('#'+countryData[i].country.toLowerCase()).find('img').attr('src'));
					
					
					$('.meetPage .B .wrapper .treatmentPrices .container .head .cell:nth-child('+( parseInt(i)+2)+') p').html(countryData[i].country.charAt(0).toUpperCase()+countryData[i].country.toLowerCase().slice(1));


					for (var x in countryData[i].treatments) {
						if (i == 0) {
							if (countryData[i].treatments[x].price == '-') {
								$('.meetPage .B .wrapper .treatmentPrices .container').append('<div class="row"><div class="spacer"></div></div><div class="row"><div class="cell">'+countryData[0].treatments[x].name+'</div><div class="cell"><span>'+countryData[0].treatments[x].price+'</span></div></div>');
							}
							else {
								$('.meetPage .B .wrapper .treatmentPrices .container').append('<div class="row"><div class="spacer"></div></div><div class="row"><div class="cell">'+countryData[0].treatments[x].name+'</div><div class="cell"><span>$'+countryData[0].treatments[x].price+'</span></div></div>');
							}
						}

						else {
							if (countryData[i].treatments[x].price == '-') {
								$('.meetPage .B .wrapper .treatmentPrices .container .row:nth-child('+(2*(parseInt(x)+1)+1)+')').append('<div class="cell"><span>'+countryData[i].treatments[x].price+'</span></div>');
							}
							else {
								$('.meetPage .B .wrapper .treatmentPrices .container .row:nth-child('+(2*(parseInt(x)+1)+1)+')').append('<div class="cell"><span>$'+countryData[i].treatments[x].price+'</span></div>');
							}
						} 
					}

				}
				callback();
			}

			function verticalSelectOperations() {

				$(window).scrollTop(0);

				$('html').addClass('noScroll');

				$('.meetPage .B .wrapper .treatmentPrices').animate({'left': - $('.meetPage .B .wrapper .treatmentPrices').width()+'px'},400);

				$('.meetPage .B .treatmentDesc').animate({'opacity':'0'},400);

				$('.meetPage .B .treatmentDesc, .meetPage .B .mapContainer .tagContainer').animate({'opacity':'0'},400);

				$('.cardCountryDD').prev().text('COUNTRY').css({'background-color':'transparent','border':'solid 1px #FFFFFF'});

				$('.cardDoctorDD').prev().text('DOCTOR').css({'background-color':'transparent','border':'solid 1px #FFFFFF'});

				$('.cardCountryDD, .cardDoctorDD').children().remove();

				showCardClosed($('.meetPage .C .comparisonContainer .profile:last-child .close'));

				$('.meetPage .C .comparisonContainer .profile:last-child .dropDownContainer:last-child .dropDownBox').addClass('noClick');
			}

			function flagClickOperations(element) {

				$('#locations').prev().text(element.attr('id'));

				$('#locations').prev().css({'background-color':'#95C122','color':'#FFFFFF'});

				$('.meetPage .B .wrapper .treatmentPrices').animate({'left': - $('.meetPage .B .wrapper .treatmentPrices').width()+'px'},400);
			}

			function showTreatmentPrices() {
				$('.meetPage .B .wrapper .treatmentPrices').animate({'left':'0'},400);
			}

			function showCardClosed(element) {
				var index = element.parent().index();
				element.css('transform','rotate(45deg)');
				element.parent().find('.filters .dropDownContainer:last-child .dropDownBox, .close').addClass('noClick');

				$('.meetPage .C .comparisonSubContainer').not('.meetPage .C .comparisonSubContainer:first-child').each( function() {
					$(this).children().eq(index).children().animate({'opacity':'0'},500,function(){
						showComparison();
					});
				});

				function showComparison() {
					element.next().find('.dropDownBox').eq(0).css({'background-color':'transparent','border':'solid 1px #FFFFFF'}).text('country');
					element.next().find('.dropDownBox').eq(1).css({'background-color':'transparent','border':'solid 1px #FFFFFF'}).text('doctor');
					element.next().find('.dropDown').css('display','none');
					element.next().css('display','block');
					element.next().animate({'opacity':'1'},500);
				}
			}

			function showCardOpen(element) {
				var index = element.parent().index();
				element.parent().find('.filters .dropDownContainer:last-child .dropDownBox, .close').removeClass('noClick');
				element.css('transform','rotate(0deg)');
				element.next().stop(true,true).animate({'opacity':'0'},500,function(){
					$(this).css('display','none');
					showProfile();
				});

				function showProfile() {
					$('.meetPage .C .comparisonSubContainer').not('.meetPage .C .comparisonSubContainer:first-child').each( function() {
						$(this).children().eq(index).children().animate({'opacity':'1'},500);
					});
				}
			}

			function populateDoctorsOnCard(data, index) {

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(2) .profile:nth-child('+(index+1)+') .city').text(data.state);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(3) .profile:nth-child('+(index+1)+') .country').text(data.country);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(4) .profile:nth-child('+(index+1)+') .pic').attr('src','img/uploads/'+data.picture);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(5) .profile:nth-child('+(index+1)+') .name').text(data.name);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(7) .profile:nth-child('+(index+1)+') .desc').text(data.specialization);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(9) .profile:nth-child('+(index+1)+') .desc').text(data.hospital);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(11) .profile:nth-child('+(index+1)+') .desc').text(data.qualification);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(13) .profile:nth-child('+(index+1)+') .desc').text(data.area);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(15) .profile:nth-child('+(index+1)+') .desc').text(data.fellow);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(17) .profile:nth-child('+(index+1)+') .desc').text(data.more);

			}

			function populateCountryCardSearch(data) {
				$('.cardCountryDD').children().remove();
				for (var i in data.data.treatments.countries) {
					if (data.data.treatments.countries[i].country.toLowerCase() == 'india' || data.data.treatments.countries[i].country.toLowerCase() == 'thailand' && data.data.treatments.countries[i].doctors > 0) {
						$('.cardCountryDD').append('<li data-value='+data.data.treatments.countries[i].countryID+'>'+data.data.treatments.countries[i].country+'</li>');
					}
				}
			}

			function populateDoctorsCardSearch(data, country, element) {
				$('.cardDoctorDD').children().remove();
				var temp = 0;
				for (var i in data.data.doctors) {
					var tempName = data.data.doctors[i].name.trim().split(" ");
					if (tempName[tempName.length - 1].length < 2){
						var docName = 'DR. '+tempName[tempName.length - 2]+' '+tempName[tempName.length - 1];
					}
					else {
						var docName = 'DR. '+tempName[tempName.length - 1];
					}
					
					if (data.data.doctors[i].country.toLowerCase() == country) {
						$('.cardDoctorDD').append('<li data-value='+data.data.doctors[i].token+'>'+docName+'</li>');
					}
					else {
						temp++
					}
				}
				if (temp == data.data.doctors.length) {
					alert('Treatment not available in country.');
					element.parent().prev().text('COUNTRY').css({'background-color':'transparent','border-color':'#FFFFFF'});
				}
			}

			function populateEachDoctorsCard(data,index,callback) {

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(2) .profile:nth-child('+index+') .city').text(data.state);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(3) .profile:nth-child('+index+') .country').text(data.country);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(4) .profile:nth-child('+index+') .pic').attr('src','img/uploads/'+data.picture);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(5) .profile:nth-child('+index+') .name').text(data.name);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(7) .profile:nth-child('+index+') .desc').text(data.specialization);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(9) .profile:nth-child('+index+') .desc').text(data.hospital);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(11) .profile:nth-child('+index+') .desc').text(data.qualification);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(13) .profile:nth-child('+index+') .desc').text(data.area);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(15) .profile:nth-child('+index+') .desc').text(data.fellow);

				$('.meetPage .C .comparisonContainer .comparisonSubContainer:nth-child(17) .profile:nth-child('+index+') .desc').text(data.more);
				
				callback(index);
			}

			function cardDoctorSelectOperations(index, element) {
				for (var i in doctorsData.data.doctors) {
					if(doctorsData.data.doctors[i].token == element.data('value')) {
						populateEachDoctorsCard(doctorsData.data.doctors[i], index, populateEachDoctorsCardCallback );
					}
				}
			}

			function populateEachDoctorsCardCallback(index) {
				showCardOpen($('.meetPage .C .comparisonContainer .comparisonSubContainer:first-child .profile:nth-child('+index+') .close'));
			}	
		
		// Functions End
	}	


	function executeMobileCode() {
			
			var verticalToken = '';

			var treatmentType = '';

			 var verticals = '';

			 var verticalName = '';

			 var countryData = '';

			 var countryName = '';

			 var countryToken = '';

			$('#vertical-Mob, #location-Mob').prev().css({'color':'#c6c6c6','border-color':'#c6c6c6'});
			$('#type-Mob').prev().css('border-color','#95C122');
			$('.meetPage .A-mob .treatmentDesc, .meetPage .A-mob .treatmentPrices, .meetPage .B-mob, .adContainerB, .footer').hide();

			$('#type-Mob li').click(function(){
				treatmentType = $(this).data('value');
				getVerticalsPricesAPI();
			});

			function getVerticalsPricesAPI(element) {
				$.ajax({
					url:'lnw/www/admin/json/public/filterVerticalByType.php',

					data: {'type': treatmentType},

					dataType: 'json',

					method: 'POST',

					success: function(data){
						console.log(data);
						populateVerticals(data);
						typeSelectProcedures();
						verticals = data.data.verticals;
					},

					error: function(data) {
						console.log("Something's wrong with the countryList API"+data);
					}
				});
			}

			function populateVerticals(data) {
				$('#vertical-Mob').children().remove();
				for (var i in data.data.verticals) {
					$('#vertical-Mob').append('<li data-value='+data.data.verticals[i].token+'>'+data.data.verticals[i].name+'</li>');
				}
			}

			function typeSelectProcedures() {
				$('#vertical-Mob').prev().text('TREATMENT');
				$('#location-Mob').prev().text('LOCATION');
				$('#vertical-Mob, #location-Mob').prev().css({'background-color':'#FFFFFF'});
				$('#location-Mob').prev().css({'color':'#c6c6c6','border-color':'#c6c6c6'});
				$('#vertical-Mob').prev().css({'color':'#95C122','border-color':'#95C122'});
				$('#vertical-Mob').prev().removeClass('disabled');
				$('#location-Mob').prev().removeClass('enabled');
				$('#vertical-Mob').prev().addClass('enabled');
				$('#location-Mob').prev().addClass('disabled');
			}

			$(document).on('click','#vertical-Mob li',function(){
				verticalToken = $(this).data('value');
				verticalName = $(this).text();
				getCountrysTreatmentsAPI();
			});

			function getCountrysTreatmentsAPI() {
				$.ajax({
					url:'lnw/www/admin/json/public/filterTreatmentByVertical.php',

					data: {'vertical': verticalToken, 'type': treatmentType},

					dataType: 'json',

					method: 'POST',

					success: function(data){
						console.log(data);
						countryData = data.data.treatments.countries;
						populateCountrys();
						verticalSelectOperations();
					},

					error: function(data) {
						console.log("Something's wrong with the treatment API"+data);
					}
				});	
			}

			function verticalSelectOperations() {
				$('#location-Mob').prev().text('LOCATION');
				$('#location-Mob').prev().css({'background-color':'#FFFFFF','color':'#95C122', 'border-color':'#95C122'});
				$('#location-Mob').prev().removeClass('disabled');
			}

			function populateCountrys() {
				$('#location-Mob').children().remove();
				for (var i in countryData) {
					$('#location-Mob').append('<li data-value='+countryData[i].countryID+'>'+countryData[i].country+'</li>');
				}
			}

			$(document).on('click','#location-Mob li',function(){
				countryToken = $(this).data('value');
				countryName = $(this).text();
				populateTreatmentDescription();
				populateTreatmentPrices();
				getDoctorProfilesAPI();
				$('.meetPage .A-mob .treatmentDesc, .meetPage .A-mob .treatmentPrices, .meetPage .B-mob, .adContainerB, .footer').show(400);
			});

			function populateTreatmentDescription() {
				for (var i in verticals) {
					if (verticalName == verticals[i].name) {
						$('#treatmentName-Mob').text(verticals[i].name);
						$('#treatmentDesc-Mob').text(verticals[i].description);
					}
				}
			}

			function populateTreatmentPrices() {
				$('.meetPage .A-mob .treatmentPrices').children().not($('.meetPage .A-mob .treatmentPrices .head')).remove();
				for (var i in countryData) {
					if (countryData[i].country.toLowerCase() == countryName.toLowerCase()) {
						for (var x in countryData[i].treatments) {
							$('.meetPage .A-mob .treatmentPrices').append('<div class="row"><div class="cell">'+countryData[i].treatments[x].name+'</div><div class="cell">'+countryData[i].treatments[x].price+'</div></div>');
						}
					}

				}
			}

			function getDoctorProfilesAPI() {
				$.ajax({
					url:'lnw/www/admin/json/public/filterDoctorByVerticalCountry.php',

					data: {'vertical': verticalToken,'country': countryToken},

					dataType: 'json',

					method: 'POST',

					success: function(data){
						console.log(data);
						populateDoctors(data);
					},

					error: function(data) {
						console.log("Something's wrong with the treatment API"+data);
					}
				});
			}

			function populateDoctors(data) {
				$('.meetPage .B-mob').children().remove();
				for (var i in data.data.doctors) {
					if (data.data.doctors[i].country.toLowerCase() == countryName.toLowerCase()) {
						$('.meetPage .B-mob').append('<div class="card"><div class="cell"><img class="image" src="img/'+data.data.doctors[i].picture+'"></div><div class="cell"><h1>'+data.data.doctors[i].name+'</h1><h2>'+data.data.doctors[i].specialization+'</h2><div class="button">view profile</div><div class="button action">proceed</div></div></div><div class="profile"><div class="row"><div class="cell">Specialization</div><div class="cell"><p>'+data.data.doctors[i].specialization+'</p></div></div><div class="row"><div class="cell">Location</div><div class="cell"><p id="citymob">'+data.data.doctors[i].state+', '+data.data.doctors[i].country+'</p></div></div><div class="row"><div class="cell">Qualification</div><div class="cell"><p>'+data.data.doctors[i].qualification+'</p></div></div><div class="row"><div class="cell">Areas of Specialization</div><div class="cell"><p>'+data.data.doctors[i].area+'</p></div></div><div class="row"><div class="cell">Fellowships / Memberships / Work Experiences</div><div class="cell"><p>'+data.data.doctors[i].fellow+'</p></div></div><div class="row"><div class="cell">more</div><div class="cell"><p>'+data.data.doctors[i].more+'</p></div></div><div class="row"><div class="cell"></div><div class="cell"><a>Read More</a></div></div></div>');
					}
				}
			}
		}	

});