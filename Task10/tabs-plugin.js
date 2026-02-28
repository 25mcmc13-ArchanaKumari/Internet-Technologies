(function($){

    $.fn.simpleTabs = function(options){

        var settings = $.extend({
            activeClass: "active-tab",
            animationSpeed: 400,
            defaultTab: 0
        }, options);

        return this.each(function(){

            var container = $(this);
            var tabs = container.find(".tab-links li");
            var panels = container.find(".tab-panel");

            function activateTab(index) {

                tabs.removeClass(settings.activeClass);
                panels.stop(true, true).hide();

                $(tabs[index]).addClass(settings.activeClass);
                $(panels[index]).fadeIn(settings.animationSpeed);

                var tabId = $(tabs[index]).data("tab");
                window.location.hash = tabId;
            }


            tabs.on("click", function(){
                activateTab($(this).index());
            });
            tabs.on("keydown", function(e){

                var index = $(this).index();

                if(e.key === "ArrowRight"){
                    index = (index + 1) % tabs.length;
                    tabs.eq(index).focus();
                    activateTab(index);
                }

                if(e.key === "ArrowLeft"){
                    index = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(index).focus();
                    activateTab(index);
                }

                if(e.key === "Enter" || e.key === " "){
                    activateTab(index);
                }
            });

            if(window.location.hash){
                var hash = window.location.hash.substring(1);
                var hashIndex = tabs.filter('[data-tab="'+hash+'"]').index();
                if(hashIndex !== -1){
                    activateTab(hashIndex);
                    return;
                }
            }

            activateTab(settings.defaultTab);
        });
    };

})(jQuery);