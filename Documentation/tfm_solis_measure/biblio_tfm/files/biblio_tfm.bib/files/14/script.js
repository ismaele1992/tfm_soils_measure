var ScAjaxLayout = (function ($) {
	var ajaxUrl = '';

	return {
		init: function (url) {
			ajaxUrl = url;
		},
		getUrl: function (path) {
			return ajaxUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
		},
		fetchBlock: function (block, handle, callback) {
			$.ajax({
				url: this.getUrl('layout/render'),
				method: 'post',
				data: { block: block, handle: handle },
				success: callback
			});
		}
	};
}(jQuery));