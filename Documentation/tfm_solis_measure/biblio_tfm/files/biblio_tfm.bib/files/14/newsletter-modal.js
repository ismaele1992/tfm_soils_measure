!function(e,t,s){"use strict";function i(e){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)}s("#newsletterPopup").show();var r=!1,n=function(){s(".confirm-popup").hide(),s(".form-popup").show();var e=s(".newsletter-modal-body"),t=e.find(".newsletter-email-field").find("input"),n=s("#subscribe-submit-btn"),l=e.find("#emailMissing"),a=s("#newsletter-email").val();s("#newsletterSubscribeStatus").hide(),s("#newsletterPopup").find(".modal-header-main").show(),s("#newsletterPopup").find(".modal-header-alt").hide(),l.hide(),t.val(""),n.removeAttr("disabled"),i(a)?(t.val(a),r=!0):(l.show(),n.attr("disabled","disabled"),s("#newsletter-email").val(""),r=!1),s("#newsletterPopup .newsletter-modal").slideDown(),s(".modal-bg").fadeIn(),t.on("input propertychange paste",function(){i(t.val())?(r=!0,l.hide(),n.removeAttr("disabled")):(l.show(),n.attr("disabled","disabled"),r=!1)})};s("#newsletter-email").on("keypress",function(e){13===e.keyCode&&n()}),s("#subscribe-btn").on("click",function(){n()}),s("#sendy-subscribe-form").on("keypress",function(e){13===e.keyCode&&r&&(e.preventDefault(),s(this).submit())}),s("#subscribe-submit-btn").on("click",function(e){e.preventDefault(),s("#subscribe-submit-btn").attr("disabled","disabled"),s("#sendy-subscribe-form").submit()}),s(".close-popup").on("click",function(){s("#newsletterPopup .newsletter-modal").slideUp(),s(".modal-bg").fadeOut()}),s(".newsletter-form-label").on("click",function(){s(this).siblings("label").click()}),s("#sendy-subscribe-form").on("submit",function(e){e.preventDefault();var t=s(this),i=t.find('input[name="email"]').val(),r=t.find('input[name="list[]"]:checked'),n=t.attr("action");if(s("#newsletterSubscribeStatus").hide(),!r.length)return s("#newsletterSubscribeStatus").html("Please select at least <br> one newsletter."),s("#newsletterSubscribeStatus").show(),void s("#subscribe-submit-btn").removeAttr("disabled");for(var l=[],a=0;a<r.length;a++)l.push(s(r[a]).val());s.post(n,{lists:l,email:i},function(e){e?"All fields are required."===e?(s("#newsletterSubscribeStatus").text("Please fill in your email."),s("#newsletterSubscribeStatus").show()):"Invalid email address."===e?(s("#newsletterSubscribeStatus").text("Your email address is invalid."),s("#newsletterSubscribeStatus").show()):"Already subscribed."===e?(s("#newsletterSubscribeStatus").text("You're already subscribed!"),s("#newsletterSubscribeStatus").show()):"No list selected."===e?(s("#newsletterSubscribeStatus").text("Please select at least <br> one newsletter."),s("#newsletterSubscribeStatus").show()):(s(".form-popup").hide(),s(".confirm-popup").show()):alert("Sorry, unable to subscribe. Please try again later!"),s("#subscribe-submit-btn").removeAttr("disabled")})})}(window,document,window.jQuery);