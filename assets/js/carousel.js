/**
 * @author luis.monge
 */
/*jslint continue: true, newcap: true, nomen: true, plusplus: true, regexp: true, sloppy: true, todo: true, unparam: true, forin: true */
/*globals $,jQuery,document,window*/

(function ($) {
    var methods,
        transforms = {
            'selected' : {
                class: 'selected',
            },
            'prev' : {
                class: 'prev-slide',
            },
            'next' : {
                class: 'next-slide',
            },
            'prev-hidden' : {
                class: 'prev-hidden',
            },
            'next-hidden' : {
                class: 'next-hidden',
            }
        }; 


    function refresh(data) {
        data.prev.toggleClass('prev-disable', (data.selected - 3 < 0));
        data.next.toggleClass('next-disable', (data.selected + 3) > (data.count));
        data.items.each(function (index) {
            var transform;

            if (index === data.selected) {
                transform = transforms['selected'];
            } else if (index === data.selected - 1 || (data.selected === 0 && index === data.count - 1)) {
                transform = transforms['prev'];
            } else if (index === data.selected + 1 || (data.selected === data.count - 1 && index === 0)) {
                transform = transforms['next'];
            } else if (index <= data.selected - 2 & !(data.selected === 0 && index === data.count - 1) ) {
                transform = transforms['prev-hidden'];
            } else if (index >= data.selected + 2 & !(data.selected === data.count - 1 && index === 0)) {
                transform = transforms['next-hidden'];
            }

            $(this).removeClass().addClass(transform.class);
        });
    }

    methods = {
        'init': function (node, data, opts) {
            var items;

            if (!data) {
                items = $('#slider ul > li', node);
                data = {
                    items: items,
                    prev: $('.prev', node),
                    next: $('.next', node),
                    count: items.size(),
                    selected: Math.floor(items.size() / 2.0) - ((items.size() % 2 === 0)? 2 : 0)
                };

                node.data('Carousel', data);

                $('a.prev', node).bind('click', function (e) {
                    e.preventDefault();
                    methods.prev(node, data);
                });

                $('a.next', node).bind('click', function (e) {
                    e.preventDefault();
                    methods.next(node, data);
                });
            }

            refresh(data);
        },

        'next': function (node, data) {
            if (data) {
                data.selected = ((data.selected + 3) > (data.count)) ? data.selected : (data.selected + 3) % data.count;
                 
                refresh(data);
            }
        },

        'prev': function (node, data) {
            if (data) {
                data.selected = (data.selected - 3 < 0) ? data.selected : data.selected - 3;
                refresh(data);
            }
        }
    };

    $.fn.Carousel = function (action, opts) {
        var method = methods[action];
        if (method) {
            method(this, this.data('Carousel'), opts);
        }
    };

})(jQuery);