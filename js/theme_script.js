$(function() {
       
    var _window = $(window), 
        MSIE9 = false;
        
    if($.browser.msie){
         if(parseInt($.browser.version) <= 9){
            MSIE9 = true;
         }
    }
    
    var menuItemIndicator = $('#topnav .menu-item .sf-sub-indicator');
    menuItemIndicator.each(function(){
        element = $(this);
        element.parent().parent().append(element);
    })

    
    var portfolio = $('.portfolio_wrapper'),
        portfolio_item_selector = '.portfolio-item',
        transitionDuration = '0.5',
        filterButtons = $('.portfolio_filter_buttons > .filter_button'),
        currentCategory = '*';
    
    if(portfolio.length > 0) {
        portfolio.imagesLoaded( function() {
            setTimeout(function(){
                 portfolio.isotope({
                    itemSelector: portfolio_item_selector,
        			resizable : true,
        			layoutMode: 'fitRows'
        		}).bind("resize.rainbows", function(){
        			portfolio.isotope('reLayout');
        		});
            },1000);
        });
        
        filterButtons.on( 'click', function() {
            var _this = $(this);
            var category = _this.attr('data-filter');
            
            if(currentCategory != category){
                filterButtons.removeClass('current-category');
                _this.addClass('current-category');
                currentCategory = category;
                if(category != '*') category = '.'+category;
                portfolio.isotope({ filter: category});
            }
        });
        
        
        $('.portfolio_wrapper .portfolio-item').magnificPopup({
    		delegate: 'a.enlarge-icon',
    		type: 'image',
    		removalDelay: 500,
    		mainClass: 'mfp-zoom-in',
    		callbacks: {
    			beforeOpen: function() {
    				// just a hack that adds mfp-anim class to markup 
    				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
    			},
                open: function() {
                  not_resizes = true;
                },
                close: function() {
                  not_resizes = false;
                }
    		},
    		gallery: {enabled:true}
    	});
    } 
    
    
    var FWObjects = $('.testimonials .owl-controls'),
        contentHolder = $('.content-holder > .container'),
        not_resizes = false;
  
    if(FWObjects.length > 0) {
        FWObjectsResize();
        _window.resize(FWObjectsResize);
    }
    
    function FWObjectsResize(){
        if(!not_resizes){
            var _windowWidth = _window.width(),
                contentHolderWidth = contentHolder.width();
             
            FWObjects.css({width:_windowWidth, left:-(_windowWidth-contentHolderWidth)/2});
        }
    }
    
    $('.skills > .skills-item').not('.skills-item-with-appearance').each(function(){
        if(!MSIE9){   
            drawSkillProgress($(this), false, true);
        } else {
            drawSkillProgress($(this), false, false);
        }
    })
    
    var windowHeight = window.innerHeight,
        skillsProgressbars = $('.skills-item-with-appearance'),
        appearanceObject = $('.team-item-with-appearance');
        
    _window.on('resize', onWindowResize);
    
    function onWindowResize()
    {
        windowHeight = window.innerHeight;
    }
        
    if(!device.mobile() && !device.tablet() && !MSIE9){
        skillsProgressbars.each( function()
        {
            var element = $(this),
                skill_number = element.find('.skill-number'),
                index = element.index(),
                delay = 100;
            
            skill_number.hide();   
            inViewport(element, showProgressbars);
            
            function showProgressbars(){
                var delayOffset = delay + (index*150);
                setTimeout(function()
                {          
                    element.removeClass('object-hidden');
                    drawSkillProgress(element, true, true);
                }, delayOffset);
            }
        });  
        appearanceObject.each( function()
        {
            var element = $(this),
                index = element.index(),
                delay = 200;
            
            inViewport(element, showElement);
            
            function showElement(){
                var delayOffset = delay + (index*250);
                
                setTimeout(function()
                {
                    element.removeClass('object-hidden');
                }, delayOffset);
            }
        }); 
    } else {
        appearanceObject.each( function()
        {
            var element = $(this);
            element.removeClass('object-hidden');
        });
        skillsProgressbars.each( function()
        {
            var element = $(this);
            element.removeClass('object-hidden');
            drawSkillProgress(element, false, false);
        }); 
    }
    
    function inViewport(element, callbackFn)
    {
        _window.on('scroll', onWindowScroll);
        onWindowScroll();
        
        function onWindowScroll()
        {
            var element_top = element.offset().top,
                buffer = windowHeight/4;
            
            bottom_of_window = $(window).scrollTop() + windowHeight;
            if( bottom_of_window > element_top + buffer) {
                _window.off('scroll', onWindowScroll);
                callbackFn();
            }
        }
    }
    
    function drawSkillProgress(element, animation, doughnut){
    
        var skill_progress = element.find('>.skill-progress'),
			skill_level = parseFloat(skill_progress.data("level")),
			base_color = skill_progress.data("chart-bg-color"),
			skill_color = skill_progress.data("chart-progress-color"),
            skill_number = skill_progress.find('.skill-number'),
            duration = 1000;
            
        if(doughnut){  
            var doughnutOption = {
        		animationSteps: animation ? 75 : 0,
        		segmentShowStroke : false,
        		percentageInnerCutout  : 82,
        		segmentStrokeColor  : base_color,
        		animationEasing: "easeOutExpo"
        	}
        
        	var doughnutData = [
        		{
        			value: skill_level,
        			color: skill_color
        		},
        		{
        			value : 100-skill_level,
        			color : base_color
        		}
        	];
            
        	var ctx = $(".skill-canvas", skill_progress).get(0).getContext("2d");
        	var myDoughnut = new Chart(ctx).Doughnut(doughnutData, doughnutOption);    
        } else {
            element.find('.skill-progress').addClass('inline-progress');
        }

        if(animation){
            skill_number.show(duration);
            skill_number.CountUpCircle({
                duration: duration,
                opacity_anim: false,
                step_divider: 3
            });
        } else {
            skill_number.show();
        }
    }
});