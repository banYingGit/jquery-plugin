/**
 * Created by banYing on 2017/7/12 0012.
 */
+function ($) {

    var CountDown = function (element, options) {

        var _default = {

            endTime: '1499923035',//秒

            symbol: [':', ":"]

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        this.timePro = '';

        _rendering.call(this);

        _even.call(this)


    };

    function _rendering() {

        var len = this.options.symbol.length;

        for (var i = 0; i <= len; i++) {

            this.$element.append('<span>').append('<i>' + this.options.symbol[i] + '</i>')

        }
        $('i:eq(' + len + ')', this.$element).remove()


    }

    function _even() {

        var $this = this;

        _count.call(this, this.options.endTime);

        this.timePro = setInterval(function () {

            _count.call($this, $this.options.endTime)


        }, 1000);


    }

    function _count(endTime) {


        var end = new Date(endTime * 1000),

            start = new Date(),

            time = end - start;

        var day = parseInt(time / 1000 / 60 / 60 / 24),

            hour = parseInt(time / 1000 / 60 / 60 % 24),

            minute = parseInt(time / 1000 / 60 % 60),

            seconds = parseInt(time / 1000 % 60);

        var $hour = day * 24 + hour;

        var len = this.options.symbol.length;

        if ((len + 1) == 4) {

            $('span:eq(0)', this.$element).text(day.toString().length > 1 ? day : '0' + day);

            $('span:eq(1)', this.$element).text(hour.toString().length > 1 ? hour : '0' + hour);

            $('span:eq(2)', this.$element).text(minute.toString().length > 1 ? minute : '0' + minute);

            $('span:eq(3)', this.$element).text(seconds.toString().length > 1 ? seconds : '0' + seconds)

        } else {

            $('span:eq(0)', this.$element).text($hour.toString().length > 1 ? $hour : '0' + $hour);

            $('span:eq(1)', this.$element).text(minute.toString().length > 1 ? minute : '0' + minute);

            $('span:eq(2)', this.$element).text(seconds.toString().length > 1 ? seconds : '0' + seconds)

        }


        if (Date.parse(new Date(end)) == Date.parse(new Date(start))) {

            clearInterval(this.timePro);

            this.$element.trigger('end');

        }

    }

    CountDown.prototype.start = function (endTime) {

        var $this = this;

        this.timePro = setInterval(function () {

            _count.call($this, endTime)


        }, 1000);


    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.countDown');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.countDown', (data = new CountDown(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.countDown;

    $.fn.countDown = Plugin;

    $.fn.countDown.Constructor = CountDown;

    $.fn.countDown.noConflict = function () {

        $.fn.countDown = old;

        return this

    }

}(jQuery);