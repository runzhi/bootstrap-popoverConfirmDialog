/*
 * simple comfirm box base on bootstrap
 * $(element).popoverCOnfirmDialog(target, options)
 * target is a callback function when click yes
 * 
 * options{
 *          message: message to display 
 *          placement: how to position the popover - top | bottom | left | right
 * }
 * */


! function($) {
    var className;
    var PopoverConfirmDialog = function(element, target, options) {
        var $element = $(element);
        className = $element.prop("class");
        options == undefined && ( options = {});
        var content = $('<div>').css("padding", "5px");
        var yes_button = $("<button>").prop("type", "button").addClass("btn btn-small btn-primary").text("Yes");
        var no_button = $("<button>").prop("type", "button").addClass("btn btn-small").text("no").css("float", "right");
        content.append(yes_button);
        content.append(no_button);

        $element.popover({
            title : options["message"],
            html : true,
            placement : options["placement"] ? options["placement"] : 'right',
            content : content,
            trigger : 'manual'
        });
        
        var yes_button_click = function() {
            $element.popover('hide');
            target && target.apply(element);
        };
        
        var no_button_click = function() {
            $element.popover('hide');
        };
        
        var content_click = function(e) {
            e.preventDefault();
            return false;
        };

        $element.click(function() {
            $("." + $element.prop("class")).each(function() {
                this != element && $(this).popover("hide");
            });
            $element.popover("show");
            yes_button.click(yes_button_click);
            no_button.click(no_button_click);
            $(".popover").click(content_click);
            return false;
        });

        
    }
    
    PopoverConfirmDialog.hideAll = function() {
        $("." + className).popover("hide");
    }

    $.fn.popoverConfirmDialog = function(target, options) {
        return this.each(function() {
            new PopoverConfirmDialog(this, target, options);
        });
    }
    $.fn.popoverConfirmDialog.Constructor = PopoverConfirmDialog
}($);

$(function() {
    $(window.document.body).click(function() {
        $.fn.popoverConfirmDialog.Constructor.hideAll();
    });
});
