/**
 * Created by banYing on 2017/7/12 0012.
 */
+function ($) {

    var CountDown = function (element, options) {

        var _default = {

            endTime: '',//秒

            symbol: '',

            type: '' // DS > D-H-M-S,  HS > H-M-S,   MS > M-S-MS

        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);

        this.timePro = '';

        this.ms = 60;

        _rendering.call(this);

        _even.call(this)


    };

    function _rendering() {

        var type = this.options.type,

            len = (type == 'DS') ? 4 : 3;

        for (var i = 0; i <= len - 1; i++) {

            this.$element.append('<span>').append('<i>' + this.options.symbol[i] + '</i>')

        }

        if (this.options.symbol.length == 1) {
            $('i:eq(' + (len - 1) + ')', this.$element).remove()
        }

    }

    function _even() {

        var $this = this,

            type = this.options.type,

            time = (type == 'DS' || type == 'HS') ? 1000 : 1;

        _count.call(this, this.options.endTime);

        this.timePro = setInterval(function () {

            _count.call($this, $this.options.endTime)


        }, time);


    }

    function _count(endTime, ms) {


        var end = new Date(endTime * 1000),

            start = new Date(),

            time = end - start;

        var day = parseInt(time / 1000 / 60 / 60 / 24),

            hour = parseInt(time / 1000 / 60 / 60 % 24),

            minute = parseInt(time / 1000 / 60 % 60),

            seconds = parseInt(time / 1000 % 60),

            dh = day * 24 + hour;


        var $day = day.toString().length > 1 ? day : '0' + day,

            $hour = hour.toString().length > 1 ? hour : '0' + hour,

            $minute = minute.toString().length > 1 ? minute : '0' + minute,

            $seconds = seconds.toString().length > 1 ? seconds : '0' + seconds,

            $dh = dh.toString().length > 1 ? dh : '0' + dh;

        var type = this.options.type;

        if (type == 'DS') {

            // 日 小时 分钟 秒

            $('span:eq(0)', this.$element).text($day);

            $('span:eq(1)', this.$element).text($hour);

            $('span:eq(2)', this.$element).text($minute);

            $('span:eq(3)', this.$element).text($seconds)

        } else if (type == 'MS') {

            //小时 分钟 秒 毫秒

            this.ms = this.ms - 1 < 0 ? 60 : this.ms - 1;

            var $ms = this.ms.toString().length > 1 ? this.ms : '0' + this.ms;

            $('span:eq(0)', this.$element).text($minute);

            $('span:eq(1)', this.$element).text($seconds);

            $('span:eq(2)', this.$element).text($ms);

        }
        else if (type == 'HS') {

            //小时 分钟 秒

            $('span:eq(0)', this.$element).text($dh);

            $('span:eq(1)', this.$element).text($minute);

            $('span:eq(2)', this.$element).text($seconds);


        }


        var $symbol = this.options.symbol,

            len = $symbol.length;


        if (len == 1) {

            $('i', this.$element).text(this.options.symbol[0]);

        } else {

            $('i:eq(0)', this.$element).text($symbol[0]);

            $('i:eq(1)', this.$element).text($symbol[1]);

            $('i:eq(2)', this.$element).text($symbol[2]);

            if (len == 3) return false;

            $('i:eq(3)', this.$element).text($symbol[3]);

        }


        if (Date.parse(new Date(end)) == Date.parse(new Date(start))) {

            clearInterval(this.timePro);

            this.$element.trigger('end');

        }

    }




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