/*Minify Mask*/function getPasteEvent(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var pasteEventName=getPasteEvent()+".mask",ua=navigator.userAgent,iPhone=/iphone/i.test(ua),android=/android/i.test(ua),caretTimeoutId;$.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},$.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(e,t){var n,a,r,i,o,c;return!e&&this.length>0?(n=$(this[0]),n.data($.mask.dataName)()):(t=$.extend({placeholder:$.mask.placeholder,completed:null},t),a=$.mask.definitions,r=[],i=c=e.length,o=null,$.each(e.split(""),function(e,t){"?"==t?(c--,i=e):a[t]?(r.push(new RegExp(a[t])),null===o&&(o=r.length-1)):r.push(null)}),this.trigger("unmask").each(function(){function n(e){for(;++e<c&&!r[e];);return e}function l(e){for(;--e>=0&&!r[e];);return e}function s(e,a){var i,l;if(!(0>e)){for(i=e,l=n(a);c>i;i++)if(r[i]){if(!(c>l&&r[i].test(g[l])))break;g[i]=g[l],g[l]=t.placeholder,l=n(l)}m(),v.caret(Math.max(o,e))}}function u(e){var a,i,o,l;for(a=e,i=t.placeholder;c>a;a++)if(r[a]){if(o=n(a),l=g[a],g[a]=i,!(c>o&&r[o].test(l)))break;i=l}}function d(e){var t,a,r,i=e.which;8===i||46===i||iPhone&&127===i?(t=v.caret(),a=t.begin,r=t.end,r-a===0&&(a=46!==i?l(a):r=n(a-1),r=46===i?n(r):r),h(a,r),s(a,r-1),e.preventDefault()):27==i&&(v.val(k),v.caret(0,p()),e.preventDefault())}function f(e){var a,i,o,l=e.which,d=v.caret();e.ctrlKey||e.altKey||e.metaKey||32>l||l&&(d.end-d.begin!==0&&(h(d.begin,d.end),s(d.begin,d.end-1)),a=n(d.begin-1),c>a&&(i=String.fromCharCode(l),r[a].test(i)&&(u(a),g[a]=i,m(),o=n(a),android?setTimeout($.proxy($.fn.caret,v,o),0):v.caret(o),t.completed&&o>=c&&t.completed.call(v))),e.preventDefault())}function h(e,n){var a;for(a=e;n>a&&c>a;a++)r[a]&&(g[a]=t.placeholder)}function m(){v.val(g.join(""))}function p(e){var n,a,l=v.val(),s=-1;for(n=0,pos=0;c>n;n++)if(r[n]){for(g[n]=t.placeholder;pos++<l.length;)if(a=l.charAt(pos-1),r[n].test(a)){g[n]=a,s=n;break}if(pos>l.length)break}else g[n]===l.charAt(pos)&&n!==i&&(pos++,s=n);return e?m():i>s+1?(v.val(""),h(0,c)):(m(),v.val(v.val().substring(0,s+1))),i?n:o}var v=$(this),g=$.map(e.split(""),function(e){return"?"!=e?a[e]?t.placeholder:e:void 0}),k=v.val();v.data($.mask.dataName,function(){return $.map(g,function(e,n){return r[n]&&e!=t.placeholder?e:null}).join("")}),v.attr("readonly")||v.one("unmask",function(){v.unbind(".mask").removeData($.mask.dataName)}).bind("focus.mask",function(){clearTimeout(caretTimeoutId);var t;k=v.val(),t=p(),caretTimeoutId=setTimeout(function(){m(),t==e.length?v.caret(0,t):v.caret(t)},10)}).bind("blur.mask",function(){p(),v.val()!=k&&v.change()}).bind("keydown.mask",d).bind("keypress.mask",f).bind(pasteEventName,function(){setTimeout(function(){var e=p(!0);v.caret(e),t.completed&&e==v.val().length&&t.completed.call(v)},0)}),p()}))}});

if($(document).ready()){
    var forms = $("form.validate");

    $.each(forms, function (index,form) {

        $(form).on('submit', function () {
            try {
                var errors = false;

                $.each($(form).find('input[type="text"]'), function (index, input) {
                    if (validate(input)) {
                        this.classList.remove("err");
                    }
                    else {
                        this.classList.add("err");
                        errors = true;
                    }
                });

                if(!errors){
                    $.ajax({
                        url: 'http://result.agency/lead_add',
                        type: 'POST',
                        data: $(form).serialize(),
                        success: function () {

                        },
                        error: function () {

                        }
                    });
                    $(form).find('input[type="text"]').val('');
                    $("#tea").modal("hide");
                    $("#thanks").modal("show");
                }

            }
            catch (e){
                console.error(e);
            }
            return false;
        }).find('input[name="telephone"]').mask('+38(999) 999-99-99');
    });
    function validate(input){
        switch (input.getAttribute('name')){
            case 'email':{
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if(pattern.test(input.value)){
                    break;
                }
                else{
                    return false;
                }
            }
            default:{
                if(input.value.length<3){
                    return false;
                }
                return true;
            }
        }

        return true;
    }
}
