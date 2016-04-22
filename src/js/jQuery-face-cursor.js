/*!
 * face-cursor.js (github.com/matthias-vogt/face-cursor.js)
 * Copyright (c) 2016 Matthias Vogt (ISC License)
 */

// semi-colon to avoid issues with unclosed code from other scripts during concatenation
;
(function($, window, document, undefined) {

	"use strict";

	// as `undefined` is actually mutable in old browsers, use 'undefined' as a function
	// parameter and pass no value to make sure it is truly undefined

	// passing `window` and `document` as function parameters makes references to them
	// minifyable and accessing them slightly more performant

	var pluginName = "faceCursor",
		defaults = {
			avertCursor: false,
			perspective: "6rem",
			cacheElementData: true
		};

	var setup = function(options, $elements) {
		if (options === undefined) options = {};

		var Plugin = function() {
			this.destroy = pluginLogic.destroy;
			this.init();
		};

		$.extend(pluginLogic, {
			options: options,
			$elements: $elements,
		});

		$.extend(Plugin.prototype, pluginLogic);

		var instance = new Plugin();
		return instance; // pass to $elements.data
	};

	var pluginLogic = {

		get settings() {
			delete this.settings; // go cache yourself
			return this.settings = $.extend(true, {}, defaults, this.options);
		},

		destroy: function() {
			this.$elements.off("." + pluginName);
			// remove all event handlers delegated to $elements under the".`pluginName`"
			// namespace
			// See api.jquery.com/off/#example-4
		},

		init: function() {

			var proto = this;

			if (this.options.cacheElementData)
				this.cacheElementData();

			this.animFrameLoop(proto);

			$(document).on("mousemove." + pluginName, function(e) {
				proto.lastMouseCoords = {
					x: e.pageX,
					y: e.pageY
				};
			});

		},

		lastMouseCoords: null,

		getElementData: function(callback) {
			var proto = this;
			this.$elements.each(function(i, el) {
				if (proto.settings.cacheElementData && $(el).data("." + pluginName))
					callback($(el).data("cachedData." + pluginName), $(el));
				else
					callback({
						w: $(el).outerWidth(),
						h: $(el).outerHeight(),
						offset: $(el).offset()
					}, $(el));
			});
		},

		cacheElementData: function() {
			this.getElementData(function(data, $el) {
				$el.data("cachedData." + pluginName, data);
			});
		},

		animFrameLoop: function(proto) {
			window.requestAnimationFrame(function() {
				proto.frame();
				proto.animFrameLoop(proto);
			});
		},

		frame: function() {
			if (!this.lastMouseCoords) return;
			var proto = this;

			this.getElementData(function(data, $el) {

				var xDistToCenter = proto.lastMouseCoords.x - (data.offset.left + data.w / 2),
					yDistToCenter = proto.lastMouseCoords.y - (data.offset.top + data.h / 2),
					relXDistToCenter = xDistToCenter / (data.w / 2),
					relYDistToCenter = yDistToCenter / (data.h / 2);

				$el.css(
					"transform",
					"perspective(" + proto.settings.perspective + ")" +
					"rotate3d(" +
					(relYDistToCenter * (proto.settings.avertCursor ? 1 : -1)).toFixed(2) + ", " +
					(relXDistToCenter * (proto.settings.avertCursor ? -1 : 1)).toFixed(2) + ", " +
					"0, 1deg)"
				);

			});
		}
	};

	//
	// Register plugin
	//

	$.fn[pluginName] = function(options) {
		return this.each(function() {

			if ($(this).data("plugin_" + pluginName)) {
				// If plugin has already been instantiated with this element.
				// You could do nothing or destroy the old instancee and make a new one.
				// You probably don't want to have multiple instances on the same element
				// though.
				$(this).data("plugin_pluginName").destroy();
			}

			$(this).data("plugin_" + pluginName, setup(options, $(this)));

		});
	};

})(jQuery, window, document);
