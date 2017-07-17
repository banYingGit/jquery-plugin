/**
 * Created by banYing on 2017/7/12 0012.
 */
+function ($) {

    var ClickSlider = function (element, options) {

        var _default = {

            node: ''
        };

        this.$element = $(element);

        this.options = $.extend({}, _default, options);


        _rendering.call(this);

        _event.call(this);


    };

    function _rendering() {

        var len = this.options.node.length,

            width = this.$element.width();

        this.$element.append("<p class='bar' data-role='bar'></p>");

        this.$element.data('val', this.options.node[0]);

        for (var i = 0; i < len; i++) {

            this.$element.append('<span>').append('<i>');

            $('span:eq(' + i + ')', this.$element).css({

                width: width / len + 'px',

                left: (width / len) * i + 'px'


            });
            $('span:eq(' + (len - 1) + ')', this.$element).css({

                width: '0',

                left: (width / len) * i + 'px'


            });
            $('i:eq(' + i + ')', this.$element).css({

                left: ( (width / len) * i - 25) + 'px'

            }).text(this.options.node[i])

        }


    }

    function _event() {

        var $this = this;


        this.$element.on('click', 'i', function () {

            var index = Math.floor($(this).index() / 2) - 1;


            $this.moveSlider(index)


        })


    }

    ClickSlider.prototype.moveSlider = function (index) {

        var len = this.options.node.length,

            width = this.$element.width(),

            $this = this;

        this.$element.data('val', this.options.node[index]);

        $('p[data-role=bar]', this.$element).animate({

            left: width / len * index

        }, 500);

        setTimeout(function () {

            $('span', $this.$element).css({

                "border-color": "#222"

            });
            $('i', $this.$element).css({

                "color": "#222"

            });

            $('span:eq(' + (index) + ')', $this.$element).prevAll('span').css({

                "border-color": "#4395FF"

            });

            $('i:eq(' + (index) + ')', $this.$element).css({

                "color": "#4395FF"

            })


        }, 250);

        this.$element.data('val',this.options.node[index]);


    };


    function Plugin(option) {

        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {

            var $this = $(this);

            var data = $this.data('by.clickSlider');

            var options = typeof option == 'object' && option;

            if (!data) {

                $this.data('by.clickSlider', (data = new ClickSlider(this, options)))

            }

            if (typeof option == 'string') {

                data[option].apply(data, args)

            }

            return data;

        })

    }

    var old = $.fn.clickSlider;

    $.fn.clickSlider = Plugin;

    $.fn.clickSlider.Constructor = ClickSlider;

    $.fn.clickSlider.noConflict = function () {

        $.fn.clickSlider = old;

        return this

    }

}(jQuery);