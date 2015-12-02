$(document).ready(function(){
	//window.alert('helllp');
	$('.footer').empty();
	$('.nav').empty();
	$('.lightbox-tnc').empty();
	$('.footer').load('partials/footer.html');
	$('.nav').load('partials/nav.html');
	$('.lightbox-tnc').load('partials/lightbox-tnc.html');
	var currentPage = window.location.href.split('/').slice(-1).pop().split('.')[0];
	if (currentPage != '') {
		if (currentPage != 'index') {
			$('.header').empty();
			$('.header').load('partials/header.html');
		}
	}

	function sizer() {

		$('.homePage .E').height($(window).height() * 0.35);

		$('.meetPage .B').height($(window).height() - $('.meetPage .A').height() - 20);

		$('.homePage .B .mainContainer, .homePage .D .mainContainer, .homePage .D').width($(window).width());

		$('.homePage .A .mainContainer, .aboutPage .A .mainContainer, .aboutMeetPage .A .mainContainer, .howPage .B .banner, .destinationsPage .A .mainContainer, .contactPage .B .banner, .galleryPage .A .mainContainer, .advisoryPage .A .mainContainer, .tncPage .A .mainContainer, .ayurvedaPage .A .mainContainer, .registrationPage .B .banner').height($(window).height() * 0.65);

		$('.aboutPage .D .mainContainer .subContainer .container .dp').height($('.aboutPage .D .mainContainer .subContainer .container .dp').width() * 1);

		$('.advisoryPage .B .mainContainer .subContainer .container .dp').height($('.advisoryPage .B .mainContainer .subContainer .container .dp').width() * 0.9);

		$('.aboutPage .E .mainContainer .subContainer .container').height($('.aboutPage .E .mainContainer .subContainer .container').width() * 1.6);

		$('.nav').css('right','-'+ $('.nav').width() +'px');

		$('.howPage .D').height($(window).height() * 0.4);

		$('.galleryPage .B .mainContainer .container .image').height($('.galleryPage .B .mainContainer .container .image').width() * 1.6);

		$('.galleryPage .B .mainContainer .container:nth-child(2) .image:first-child').height($('.galleryPage .B .mainContainer .container .image').width() * 1.2);

		$('.aboutPage .C .banner').height($(window).height() * 0.15);

		$('.meetPage .B .treatmentDesc').css('top',$('.meetPage .B').height() - $('.meetPage .B .treatmentDesc p').height() + 'px');

		$('.meetPage .C .comparisonContainer').css('margin-top', $('.meetPage .B .treatmentDesc').height() - $('.meetPage .B .treatmentDesc p:first-child').height() + 'px');

		$('.adContainerB .container .ad, .meetPage .E .container .spacer').height($('.adContainerB').width() * 0.1);

		$('.adContainerA,.homePage .adContainerB').height($(window).height() * 0.13);

		$('.adContainerA,.homePage .adContainerB').css('line-height',$('.adContainerA').height()+'px');

		$('.nav').height($(window).height());

		$('.nav').width($(window).width());

		$('.readMore').height($(window).height());

		if ($(window).width() > 759) {
			$('.meetPage .wrapperMobile').css('display','none');
			$('.meetPage .wrapperDesktop').css('display','table');
		}
		else {
			$('.meetPage .wrapperDesktop').css('display','none');
			$('.meetPage .wrapperMobile').css('display','table');
		}

		$('.galleryPage .expansion').height($('.galleryPage .expansion').width()*1.2);

		$('.meetPage .B .wrapper .treatmentPrices').height($('.meetPage .B').height()*.8);

		$('.meetPage .B .wrapper .treatmentPrices').css('top',($('.meetPage .B').height() - $('.meetPage .B .wrapper .treatmentPrices').height())/2+'px');

		$('.meetPage .B-mob .card .cell:first-child .image').height($('.meetPage .B-mob .card .cell:first-child .image').width());

		$('.meetPage .A .searchContainer .reset').css('right','-'+(parseInt($('.meetPage .A .dropDownContainer').css('margin-left'))+25)+'px');

		$('.lightbox').height($(window).height());

		$('.lightbox').width($(window).width());

		$('.lightbox-tnc .container .tnc-container').height( $('.lightbox .container').outerHeight(true) - ( $('.lightbox .container .logo').outerHeight(true)  + $('.lightbox .container .heading').outerHeight(true) + $('.lightbox-tnc .container .accept-container').outerHeight(true)));

	}

	sizer();

	$(window).resize(function(){
		sizer();
	});

	// Circle flip code begins

	$('.homePage .B .mainContainer .container .subContainer, .homePage .D .mainContainer .container .subContainer, .aboutPage .G .mainContainer .container .subContainer, .aboutMeetPage .C .mainContainer .container .subContainer,.ayurvedaPage .C ul li .container').hover(
		function(){
			if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf('Trident/') != -1) {
				$(this).find('.containerA, .heads').addClass('rotatedIeA');
				$(this).find('.containerB, .tails').addClass('rotatedIeB');
			}
			else {
				$(this).addClass('rotated');
			}
		},
		function(){
			$(this).removeClass('rotated');
			$(this).find('.containerA, .heads').removeClass('rotatedIeA');
			$(this).find('.containerB, .tails').removeClass('rotatedIeB');
		});

	// Circle flip code ends
	
	// Circle flip code begins for landing page

	$('.D .mainContainer .container .subContainer').hover(
		function(){
			if (navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf('Trident/') != -1) {
				$(this).find('.containerA, .heads').addClass('rotatedIeA');
				$(this).find('.containerB, .tails').addClass('rotatedIeB');
			}
			else {
				$(this).addClass('rotated');
			}
		},
		function(){
			$(this).removeClass('rotated');
			$(this).find('.containerA, .heads').removeClass('rotatedIeA');
			$(this).find('.containerB, .tails').removeClass('rotatedIeB');
		});

	// Circle flip code ends

    //Navigation bar show/hide code begins

    function hamOpen() {
    	$('.nav').toggle();
    	$('.nav').animate({'opacity':'0.98'},300);
    	$('.nav ul .container').addClass('isActive');
    	$('html').addClass('noScroll');
    }

    function hamClose() {
    	$('.nav').animate({'opacity':'0'},300,function(){
    		$('.nav').toggle();
    	});
    	$('.nav ul .container').removeClass('isActive');
    	$('html').removeClass('noScroll');
    }

    $(document).on('click','.hamBurger',function(){hamOpen()});

    $(document).on('click','.nav .close',function(){hamClose()});

	//Navigation bar show/hide code ends


	//Meet Page effects begin
	$(document).on( 'mouseenter','.meetPage .A .searchContainer .dropDown li, .meetPage .C .filters .dropDown li, .meetPage .A-mob .searchContainer .dropDown li', function(){
		$(this).css({'background-color':'#95C122'});
	});

	$(document).on( 'mouseout','.meetPage .A .searchContainer .dropDown li, .meetPage .C .filters .dropDown li, .meetPage .A-mob .searchContainer .dropDown li', function(){
		$(this).css({'background-color':'#A5A5A5'});
	});

	$('.meetPage .A .searchContainer .dropDownBox, .meetPage .C .filters  .dropDownBox, .meetPage .A-mob .searchContainer .dropDownBox').click(function(event){
		event.stopPropagation();
		$('.dropDown').not($(this).next()).slideUp('fast');		
		$(this).next().slideDown("fast");
	});

	//To prevent the input box in search to close drop down code begins

	$('#dropDownFilter').click(function(event){
		event.stopPropagation();
	});

	//To prevent the input box in search to close drop down code ends

	//Click anywhere to close drop down code begins

	$(document).not($('#dropDownFilter')).click(function(){
		$('.dropDown').slideUp('fast');
		$('#dropDownFilter').css('z-index','-1');
	});

	//Click anywhere to close drop down code ends

	$('.meetPage .A .searchContainer .dropDownContainer .dropDownBox').not($('.meetPage .A .searchContainer .dropDownContainer:last-child .dropDownBox')).click(function(){
		$('#dropDownFilter').css('z-index','-1');
	});

	$(document).on('click','.meetPage .A .searchContainer .dropDown li, .meetPage .C .filters .dropDown li, .meetPage .A-mob .searchContainer .dropDown li', function(){
		$(this).parent().slideUp("fast");
		$(this).parent().prev().text($(this).text());
		$(this).parent().prev().css({'background-color':'#95C122','color':'#FFFFFF','border-color':'#95C122'});
	});

	$('.meetPage .B .mapContainer .priceTag').hover(
		function () {
			$(this).css({'background-color':'#95C122','color':'#FFFFFF','border-color':'#95C122'});
			$(this).children().css('display','none');
		},
		function () {
			$(this).css({'background-color':'transparent','color':'#747474','border-color':'#C6C6C6'});
			$(this).children().css('display','block');
		});

	//Add to comparioson code begins

	//Show Profile begins

	function add() {
		var element = $(this);
		var index = $(this).parent().index();
		$(this).css('transform','rotate(45deg)');
		
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
		
		$(this).one("click", close);
	}

	//Show profile ends

	//Hide profile begins

	function close() {
		var element = $(this);
		var index = $(this).parent().index();
		$(this).css('transform','rotate(0deg)');
		$(this).next().stop(true,true).animate({'opacity':'0'},500,function(){
			$(this).css('display','none');
			showProfile();
		});

		function showProfile() {
			$('.meetPage .C .comparisonSubContainer').not('.meetPage .C .comparisonSubContainer:first-child').each( function() {
				$(this).children().eq(index).children().animate({'opacity':'1'},500);
			});
		}

		$(this).one("click", add);
	}

	//Hide profile ends

	$('.meetPage .C .comparisonContainer .profile .close').not($('.meetPage .C .comparisonContainer .profile:last-child .close')).one("click", add);  //Profile Hide/Show Trigger
	$('.meetPage .C .comparisonContainer .profile:last-child .close').one('click',close);


	//Cancel button code begins

	$('.meetPage .C .comparisonContainer .filters .dropDownContainer:last-child .dropDownBox').click(function(){
		var index = $(this).parent().parent().parent().index();
		$('.meetPage .C .comparisonContainer .comparisonSubContainer:first-child .profile:nth-child('+(index+1)+') .close').click();
	});

	//Cancel button code ends


	//Add to comparioson code ends

	$('.meetPage .B .mapContainer .tagContainer .priceTag').click( function(){
		$('body').animate({'scrollTop': $('.adContainerA').height() + $('.meetPage .A').height() + $('.meetPage .B').height() - $('.meetPage .B .treatmentDesc p:first-child').height()},500);
	});

	$('.meetPage .B .wrapper .treatmentPrices .helpText').click(function(){
		$(this).parent().animate({'left': (- $(this).parent().width())+'px'}, 400);
	});

	//Meet Page effects end


   //About image expansion code begins

   $('.aboutPage .E .container').hover(
   	function(){
   		$(this).css('width','66%');
   		$('.aboutPage .E .container').not(this).css('width','17%');
   	},
   	function(){
   		$('.aboutPage .E .container').css('width','33%');
   	});

	//About image expansion code ends	


	$(window).scroll(function() {

		//Ornament fill/unfill code begins

		var scroll = $('body').scrollTop();
		var stepWidth = ($('body').height() - $(window).height())/ $('.fill').height();
		var stepWidthBottom = ($('body').height() - $(window).height())/ $('.rest').height();
		var stepNumber = (scroll/stepWidth) | 0;
		var stepNumberBottom = (scroll/stepWidthBottom) | 0;
		$('.mainOrnamentContainer .greenConatiner .fillContainer').height($('.fill').height() - stepNumber);
		$('.mainOrnamentContainer .restContainer').height(stepNumberBottom);

		//Ornament fill/unfill code ends	


	});

    //How it works options slider code begins

    $('.howPage .C .howOptions .option:first-child span').hover(function(){
    	$(this).parent().find('.info').animate({'margin-left':'0'},700);
    },
    function(){
    	$(this).parent().find('.info').delay(3000).animate({'margin-left':'-100%'},700);
    });

    $('.howPage .C .howOptions .option:first-child .info').hover(function(){
    	console.log('slideeeeeee');
    },
    function(){
    	$(this).stop(true,true).animate({'margin-left':'-100%'},500);
    });

    $('.howPage .C .howOptions .option:nth-child(2) span').hover(function(){
    	$(this).parent().find('.info').animate({'margin-left':'0'},700);
    },
    function(){
    	$(this).parent().find('.info').delay(3000).animate({'margin-left':'100%'},700);
    });

    $('.howPage .C .howOptions .option:nth-child(2) .info').hover(function () {
    	console.log('slideeeeeee');
    },
    function () {
    	$(this).stop(true,true).animate({'margin-left':'100%'},500);
    });

    //How it works options slider code ends	

    //Read more code begins

    $('.aboutPage .D .mainContainer .subContainer .container .link, .advisoryPage .B .mainContainer .subContainer .container .link, .meetPage .C .comparisonContainer .profile a, .meetPage .B-mob .profile .row .cell a').click(function(){
    	if ($(this).attr('id') == 'one')
    	{
    		$('.readMore .container:nth-child(2)').css('display','table');	
    	}
    	else
    	{
    		$('.readMore .container:nth-child(3)').css('display','table');
    	}
    	$('.readMore').slideDown();
    	$('html').addClass('noScroll');
    });

    $('.aboutPage .perspective').click(function(){
    	$('.readMore .container').css('display','table');
    	$('.readMore').slideDown();
    });

    $('.readMore .close').click(function(){
    	$('.readMore').slideUp();
    	$('html').removeClass('noScroll');
    	$('.readMore .container').css('display','none');
    });

    //Read more code ends

    //MEET mobile Read more code begins

    $(document).on('click','.meetPage .B-mob .card .cell:last-child .button:nth-child(3)',function(){
    	$(this).parent().parent().next().slideToggle('fast', function(){
    		if ( $(this).css('display') == 'block') {
    			$(this).prev().find('.cell:last-child .button:nth-child(3)').text('HIDE PROFILE');
    		}
    		else {
    			$(this).prev().find('.cell:last-child .button:nth-child(3)').text('SHOW PROFILE');
    		}
    	});
    });

    //MEET mobile Read more code ends

    //Gallery expansion code begins

    $('.galleryPage .expansion .close').click(function(){
    	$('.galleryPage .expansion, .galleryPage .outerOverlay').fadeOut('fast');
    	$('html').removeClass('noScroll');
    });

    $('.galleryPage .B .mainContainer .container .image').click(function(){
    	$('.galleryPage .outerOverlay').css('top',$('body').scrollTop()+'px');
    	$('.galleryPage .expansion').css({'background-image':$(this).css('background-image'),'top':((($(window).height() - $('.galleryPage .expansion').height())/2) + $('body').scrollTop()) + 'px'});
    	$('.galleryPage .expansion, .galleryPage .outerOverlay').fadeIn('fast');
    	$('html').addClass('noScroll');
    });

    //Gallery expansion code ends

    //Meet Proceed Form File Upload code begins

    $("#reportUpload").on('change', function() {
    	$('.registrationPage .C .enquiryForm .container:nth-last-child(2) p').text($('input[type=file]').val().replace(/.*(\/|\\)/, ''));
    });

	//Meet Proceed Form File Upload code ends

	$(document).on('click','.action',function(){
		if ($(window).width() > 759) {
			var index = $(this).parent().index() + 1;
			window.location.assign('registration.html?doctor='+$('.meetPage .C .comparisonContainer .comparisonSubContainer .profile:nth-child('+index+') .name').text().replace(/ /g, '+')+'&speciality='+$('.meetPage .B .treatmentDesc p:first-child').text().replace(/ /g, '+')+'&country='+$('.meetPage .C .comparisonContainer .profile:nth-child('+index+') .country').text().replace(/ /g, '+'));
		}

		else {
			var country = $(this).parent().parent().next().find('#citymob').text().split(",");
			window.location.assign('registration.html?doctor='+$(this).prev().prev().prev().text().replace(/ /g, '+')+'&speciality='+$(this).prev().prev().text().replace(/ /g, '+')+'&country='+country[1].replace(/ /g, ''));
		}
	});

	var effectCount = 0;

	$(document).scroll(function(){
		if ($(window).scrollTop() < $('.adContainerA').height()) { effectCount = 0; }

		if ($(window).width() > 766 ) {
			navbarEffectDesktop();
		}
		else {
			navbarEffectMobile();
		}
	});

	function navbarEffectDesktop() {
		if ($(window).scrollTop() > parseInt($('.header').height())) {
			if (effectCount < 1) {
				$('#headerMain').css('display','none');
				$('#headerAlt').css('display','block');
				$('.header').css({'position':'fixed','z-index':'100'});
				$('.header').next().not($('#headerAlt')).css('margin-top',$('.header').height()+'px');
				$('.hamLinks').css('display','table').animate({'opacity':'1'}, 300, function(){
					$(this).stop(true,true);
				});
				$('.header').addClass('boxShadow');
				$('.header').animate({'width':'90%','margin-left':'5%'},300, function(){
					$(this).stop(true,true);
					effectCount = effectCount + 1;
				});
			}
		}
		else {
			if (effectCount >= 0) {
				$('#headerMain').css('display','block');
				$('#headerAlt').css('display','none');
				$('.header').animate({'width':'100%','margin-left':'0%'}, 0, function(){
					$(this).stop(true,true);
					$('.header').css({'position':'relative','border':'none','top':'0%'});
					$('.header').next().css('margin-top','0');
				});
				$('.header').removeClass('boxShadow');
				$('.hamLinks').css({'display':'none','opacity':'0'});
				effectCount = 0;
			}
		}
	}

	function navbarEffectMobile() {
		if ( $(window).scrollTop() > $('.header').height() ) {
			$('.header').css({'position':'fixed','z-index':'100'});
			$('.header').addClass('boxShadow');
		}
		else {
			$('.header').css({'position':'relative'});
			$('.header').removeClass('boxShadow');
		}
	}

	//Index header alternate

	$('#headerAlt').css('display','none');

	//Meet Prices Pull Out

	$('.meetPage .B .wrapper .treatmentPrices .pull').click(function(){
		$('.meetPage .B .wrapper .treatmentPrices').animate({'left':'0'}, 400);
	});

	//refresh meet

	$('.meetPage .A .searchContainer .reset').click(function(){
		location.reload();
	});

	//Lightbox Code

	$(document).on('change','.lightbox-tnc .container .tnc-accept',function(){
		if($(this).is(":checked")) {
			$('.lightbox-tnc .container .tnc-submit').removeClass('noClick');
		}
		else {
			$('.lightbox-tnc .container .tnc-submit').addClass('noClick');
		}
	});
	
	$(document).on('click','.lightbox-tnc .container .tnc-submit',function(){
		localStorage.setItem("tnc-accept", 1);
		$('body,html').removeClass('noScroll');
		$('.lightbox-tnc').fadeOut('slow',function(){
			$(this).hide();
		});
	});


	$('.lightbox .container .registration-container form').submit(function(event){
		event.preventDefault();
		submitPersonalDetails($('input[name="name"]').val(), $('input[name="phone"]').val(), $('input[name="email"]').val(), $('input[name="country"]').val(), $('input[name="city"]').val());
		localStorage.setItem("registration-complete", 1);
		$('body,html').removeClass('noScroll');
		$('.lightbox-registration').fadeOut('slow',function(){
			$(this).hide();
		});
	});

	if (localStorage.getItem("registration-complete") == 1) {
		$('.lightbox-registration').hide();
		$('body,html').removeClass('noScroll');
	}
	else {
		$('.lightbox-registration').show();
		$('body,html').addClass('noScroll');
		$(window).scrollTop(0,0);
	}

	if (localStorage.getItem("tnc-accept") == 1) {
		$('.lightbox-tnc').hide();
		$('body,html').removeClass('noScroll');
	}
	else {
		$('.lightbox-tnc').show();
		$('body,html').addClass('noScroll');
		$(window).scrollTop(0,0);
	}

	function submitPersonalDetails(name, phone, email, country, city) {
		$.ajax({
			url:'mail1.php',

			data: { 'name': name, 'phone': phone, 'email': email, 'country': country, 'city': city },

			dataType: 'json',

			method: 'POST',

			success: function(data){
				console.log("mail success:"+data);
			},

			error: function(data) {
				console.log("mail error:"+data);
			}
		});
	}	
});