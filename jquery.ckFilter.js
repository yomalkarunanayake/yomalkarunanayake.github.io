/*!
 * ckLine.js v1.0.0 (http://github.com/captainKeller/ckFilter)
 * @copyright Jonas Nickel
 * @license MIT License http://github.com/captainKeller/ckFilter/blob/master/LICENSE)
 */
(function ($) {
    'use strict';
    $.fn.ckFilter = function (options) {

        let filterArray = [];
        let $data;
        let $this;

        var settings = $.extend({
            containerID : '#' + this.attr('id'),
            buttonClass : '.ckFilter-button',
            filterObj   : '.ckFilter-obj',
            animation   : false,
            activeClass : 'active',
            animationTime : 300,
            animationInterval : 0,
            minWidth : '0',
            dataValue : 'filter',
            reset: false,
            resetClass: '.ckReset',
            multiple : true
        }, options);
        $.fn.ckFilter.reset = function () {
            var id = this.attr('id');
            reset(id);
        }
        const active =  settings.activeClass;
        const $filterButton = $(settings.buttonClass);
        const $filterContainer = $(settings.containerID);
        const dataAttribute = settings.dataValue;
        const filterObj = settings.filterObj;
        const filterEl = $(settings.filterObj);
        const time = settings.animationTime;
        const minWidth = settings.minWidth;
        const $width = filterEl.width();

        // IF Filter and Container Exist
        if ($filterContainer.length > 0 && $filterButton.length > 0) {
            $filterButton.click(function (e) {
                e.preventDefault();
                let $this = $(this);
                if (settings.multiple === true) {
                    if ($this.is('.' + active)) {
                        // if filter clicked
                        $this.removeClass(active);
                        let $data = $this.data(dataAttribute);
                        filterArray = $.grep(filterArray, function (value) {
                            return value != '.' + $data;
                        });
                    } else {
                        // if filter not clicked
                        let $data = $this.data(dataAttribute);
                        $this.addClass(active);
                        filterArray.push('.' + $data);
                    }
                } else {
                    if ($this.is('.' + active)) {
                        $this.removeClass(active);
                        filterArray = [];
                    } else {
                        filterArray = [];
                        $filterButton.removeClass(active);
                        let $data = $this.data(dataAttribute);
                        $this.addClass(active);
                        filterArray.push('.' + $data);
                    }
                }
                // if filter set 
                if (filterArray.length > 0) {
                    $('filterObj' + filterArray.join('')).addClass(active);
                    filterEl.each(function () {
                        let $this = $(this);

                        // if el has filter class
                        if ($this.is(filterArray.join(''))) {
                            $this.addClass(active);
                            if (settings.animation === true) {
                                filterAdd($this);
                            } else {
                                $this.show(time);
                            }
                        } else {
                            // if el has not filter class
                            $this.removeClass(active);
                            if (settings.animation === true) {
                                filterRemove($this);
                            } else {
                                $this.hide(time);
                            }
                        }
                    });
                } else {
                    let $this = $(this);
                    filterEl.addClass(active)
                    if (settings.animation === true) {
                        filterEl.each(function () {
                            let $this = $(this);
                            $this.show();
                            filterAdd($this);
                        });
                    } else {
                        filterEl.show(time);
                    }
                }
            });
            if (settings.reset === true) {
                reset();
            } 
        }
        function reset (id) {
            $(id).click(function () {
                filterArray = [];
                if (settings.animation === true) {
                    filterEl.each(function () {
                        let $this = $(this);
                        filterAdd($this);
                    })
                } else {
                    filterEl.removeClass(active).show(time);
                    $filterButton.removeClass(active);
                }
            });
        }
        function filterRemove (el) {
            el.animate({
                width: 0,
                minWidth: 0
            }, time, function () {
                el.hide();
            });
        }
        function filterAdd (el) {
            el.animate({
                width: $width,
                minWidth: minWidth
            }, time, function () {
                el.show();
            });
        }
    };
}(jQuery));