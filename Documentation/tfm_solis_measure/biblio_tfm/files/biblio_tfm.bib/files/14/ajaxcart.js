jQuery.noConflict();

jQuery(document).on('sc_ajaxcart_product_add_before', function(e, $target) {
	$target.prop('disabled', true).addClass('disabled');
});

jQuery(document).on('sc_ajaxcart_product_add_after', function(e, data, $button) {
	$button.prop('disabled', false).removeClass('disabled');
});

var ajaxCart = (function ($) {
	var url, $productForm, $target;

	var init = function (cartUrl, button) {
		$productForm = $('#product_addtocart_form');

		url = cartUrl;

		$target = $(button);
		$target.click(function(e) {
			e.preventDefault();

			addToCart($(this));
		});
	};

	var setCartUrl = function (cartUrl) {
		return url = cartUrl.replace(/\/$/, '') + '/';
	};

	var getCartUrl = function (action) {
		return url + (action || '');
	};

	var getCount = function () {
		return JSON.parse($.ajax({ type: 'POST', url: getCartUrl('count'), async:false}).responseText).count || 0;
	};

	var addToCart = function ($button) {
		$(document).trigger('sc_ajaxcart_product_add_before', [$button]);

		$.post(getCartUrl('add'), _getPostData($button), _afterAddtoCart($button));
	};

	var removeFromCart = function (item) {
		$(document).trigger('sc_ajaxcart_product_remove_before', [item]);

		$.post(getCartUrl('remove'), {id: item}, _afterRemoveFromCart);
	};

	var _getPostData = function ($button) {
		if (!$button.closest($productForm).length) {
			return {
				product: $button.data('product'),
				qty: parseInt($button.closest('.quick-add-to-cart-wrapper').find('input[name="qty"]').val()) || 1
			};
		}

		return $productForm.serialize();
	};

	var _afterAddtoCart = function ($button) {
		return function (data) {
			try { data = JSON.parse(data); } catch (e) { }

			$(document).trigger('sc_ajaxcart_product_add_after', [data, $button]);
		};
	};

	var _afterRemoveFromCart = function (data) {
		try { data = JSON.parse(data); } catch (e) { }

		$(document).trigger('sc_ajaxcart_product_remove_after', [data]);
	};

	return {
		init: init,
		setCartUrl: setCartUrl,
		getCartUrl: getCartUrl,
		addToCart: addToCart,
		removeFromCart: removeFromCart,
		getCount: getCount
	}
} (jQuery));
