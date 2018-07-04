jQuery(document).ready(function ($) {
	$(document).bind('sc_ajaxcart_product_add_after sc_ajaxcart_product_remove_after', function (e, data, $button) {
		var $cartDropdown = $('.cart-submenu').find('.dropdown-box');
		if (data.error === 0)  {
			$('.main-nav').find('.cart-submenu:hidden').slideDown(400).delay(5000).slideUp(400);
			HeaderCart.fetchDropdown(function (html) {
				$cartDropdown.html(html);
			});

			var resetCartDropdownContent = function () {
				if ($cartDropdown.find('.empty').length === 1) {
					$cartDropdown.html('<p class="loading-content">Loading ...</p>');
				}
			};

			HeaderCart.fetchCount(function (count) {
				var $cartBadge = $('#cart').find('.badge');
				$cartBadge.html(count);
				$cartBadge.toggle(count > 0);
		    }, resetCartDropdownContent);
		} else {
			$('.error.notification').text(data.message);
			$('.error.notification:hidden').fadeIn('slow').delay(6000).fadeOut('slow');
		}
	});

	$('.show-categories-mobile').on('click', function () {
		$(this).toggleClass('open');
	});


	var $sidebarMenu = $('.sidebar-categories-menu');

	$sidebarMenu.find('.has-submenu').on('click', function (e) {
		if ($(e.target).parents('.category-sub-menu').length === 0) {
			$(this).toggleClass('open').find('ul').stop().slideToggle(400);
		}
	}).children('a').on('click', function (e) {
		// do not follow link if group button
		e.preventDefault();
	});

	// open submenu if current page is in submenu - fixme as soon as we have the correct submenu with parent item not being a link
	$sidebarMenu.find('.has-submenu').find('li.active').parents('.has-submenu').click();

  var validatePattern = function ($element, regEx, message) {
    var regex = new RegExp(regEx);
    var valid = regex.test($element.val());
    if (valid) {
      $element.parent().find('.validation-advice').remove();
      $('.address-validate-button').prop('disabled', false);
    } else {
      if ($element.parent().find('.validation-advice').length === 0) {
        $element.parent().append('<div class="validation-advice">' + message + '</div>');
      }
      $('.address-validate-button').prop('disabled', true);
    }
  };

	/* Address form validation */
	$('.text-field').on('keyup', function() {
    // allow only characters, spaces and dots
    validatePattern($(this), /^[a-zA-ZÀ-ú\s\\.']+$/, 'Numbers and special characters are not allowed');
  });

  $('.validate-alphanum-with-spaces').on('keyup', function() {
    validatePattern($(this), /^[a-zA-Z0-9 ]+$/, 'Please use only letters (a-z or A-Z), numbers (0-9) or spaces only in this field.');
  });

  $('.phone-field').on('keyup', function() {
    // allow only numbers, slash and dot
    validatePattern($(this), /^((\d[-. ]?)?((\(\d{3}\))|\d{3}))?[-. ]?\d{3}[-. ]?\d{4}$/, 'Please type a valid phone number');
  });

  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  function isValidDate(dateString) {
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
		return false;
	}

      // Parse the date parts to integers
      var parts = dateString.split("/");
      var day = parseInt(parts[0], 10);
      var month = parseInt(parts[1], 10);
      var year = parseInt(parts[2], 10);

      // Check the ranges of month and year
      if (year < 1000 || year > 3000 || month == 0 || month > 12) {
		return false;
	}

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
		monthLength[1] = 29;
	}

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
  }

  $('.date-field').on('keyup', function() {
      if (isValidDate($(this).val())) {
          $(this).parent().find('.validation-advice').remove();
          $('.address-validate-button').prop('disabled', false);
      } else {
          if ($(this).parent().find('.validation-advice').length === 0) {
              $(this).parent().append('<div class="validation-advice">Please type a valid date (DD/MM/YYYY)</div>');
          }
          $('.address-validate-button').prop('disabled', true);
      }
  });
  /* Address form validation end */

  // truncate texts for product description on hover
  var productContainer = $('.product-info-wrapper');
  var textContainerSelector = '.product-hover-description > div';
  var imgSelector = '.product-image img';
  truncateLongText(productContainer, textContainerSelector, imgSelector);
  $(window).resize(function () {
      truncateLongText(productContainer, textContainerSelector, imgSelector);
  });
});

var countryDropDown = function ($country, $regionId, $region) {
	$country.change(function () {
		var $regionDropdown = $regionId;
		var $regionInput = $region;

		var dataKey = 'default-placeholder';
		if ('US' === $country.val()) {
			dataKey = 'usa-placeholder';
		} else if ('IT' === $country.val()) {
			dataKey = 'italy-placeholder';
		}

		$regionInput.attr('placeholder', $regionDropdown.data(dataKey));
		$regionDropdown.children().first().html($regionDropdown.data(dataKey));
	}).change();
};

var HeaderCart = (function ($) {
	var countUrl, dropdownUrl;

	var setCountUrl = function (url) {
		countUrl = url;
	};

	var setDropdownUrl = function (url) {
		dropdownUrl = url;
	};

	var fetchCount = function (callback, reset) {
		if (typeof reset === 'function') {
			reset();
		}
		$.get(countUrl, function (response) {
			callback.call(this, response.count || 0);
		});
	};

	var fetchDropdown = function (callback) {
		$.get(dropdownUrl, function (response) {
			callback.call(this, response.content || '');
		});
	};

	return {
		setCountUrl: setCountUrl,
		setDropdownUrl: setDropdownUrl,
		fetchCount: fetchCount,
		fetchDropdown: fetchDropdown
	};
} (jQuery));

var truncateLongText = (function ($) {

	var truncate = function ($textContainer) {
		var containerHeight = $textContainer.height();
		var text = $textContainer.attr('data-title');
		$textContainer.html('<span>'+text+'</span>');
		var child = $textContainer.children(':first-child');
		var shortText = text;

		// maximum two rows (*2)
		while (shortText.length > 0 && child.height() > containerHeight) {
			shortText = shortText.substr(0, shortText.length - 1);
			child.html(shortText + '<span class="ellipsis">&hellip;</span>');
		}

		if (shortText < text) {
			// remove truncated word
			var words = shortText.split(' ');
			var fullwords = text.split(' ');

			if (words[words.length-1] != fullwords[words.length-1]) {
				words.splice(-1,1);
				shortText = words.join(' ');
			}
			// remove nowrap
			$textContainer.html(shortText + '<span class="ellipsis">&hellip;</span>');
		} else {
			$textContainer.html(text);
		}
	};

	return function ($productContainer, textSelector, imgSelector) {
		$productContainer.each(function (index, element) {
			var $siblingImg = imgSelector ? $(this).find(imgSelector) : null;
			var $textCont = $(this).find(textSelector);
			if ($textCont.length !== 0) {
				if ($siblingImg) {
					$siblingImg.one("load", function() {
						truncate($textCont);	
					}).each(function() {
					  if(this.complete) $(this).load();
					});
				} else  {
					truncate($textCont);
				}
			}
		});
	};
} (jQuery));

var HeaderQuotes = (function ($) {

	var getDropdown = function (dropdownUrl, $targetElement) {
        $.get(dropdownUrl, function (response) {
            $targetElement.html(response.content);
        });
	};

	var getCount = function (countUrl, $targetElement) {
        $.get(countUrl, function (response) {
            $targetElement.html(response.count).toggle(response.count > 0);
        });
	};

	return {
        getDropdown: getDropdown,
        getCount: getCount
	};
} (jQuery));