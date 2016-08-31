(function ($) {
    'use strict';

    var fonts = [
        {name: 'Arial', family: 'Arial, Helvetica, sans-serif'},
        {name: 'Arial Black', family: '"Arial Black", Gadget, sans-serif'},
        {name: 'Comic Sans', family: '"Comic Sans MS", cursive, sans-serif'},
        {name: 'Courier New', family: '"Courier New", Courier, monospace'},
        {name: 'Georgia', family: 'Georgia, serif'},
        {name: 'Impact', family: 'Impact, Charcoal, sans-serif'},
        {name: 'Lucida Console', family: '"Lucida Console", Monaco, monospace'},
        {name: 'Lucida Sans', family: '"Lucida Sans Uncide", "Lucida Grande", sans-serif'},
        {name: 'Palatino', family: '"Palatino Linotype", "Book Antiqua", Palatino, serif'},
        {name: 'Tahoma', family: 'Tahoma, Geneva, sans-serif'},
        {name: 'Times New Roman', family: '"Times New Roman", Times, serif'},
        {name: 'Trebuchet', family: '"Trebuchet MS", Helvetica, sans-serif'},
        {name: 'Verdana', family: 'Verdana, Geneva, sans-serif'}
    ];

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                fontFamily: 'Font'
            },
            nl: {
                fontFamily: 'Lettertype'
            }
        }
    });
    // jshint camelcase:true

    // Add dropdown with web safe fonts
    $.extend(true, $.trumbowyg, {
        plugins: {
            fontfamily: {
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('fontfamily', {
                        dropdown: buildDropdown(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.fontFamily
                    });
                }
            }
        }
    });
    function buildDropdown(trumbowyg) {
        var dropdown = [];

        $.each(fonts, function(index, font) {
            trumbowyg.addBtnDef('fontfamily_' + index, {
                title: font.name,
                hasIcon: false,
                fn: function(){
                    trumbowyg.expandRange();
                    trumbowyg.saveRange();
                    try {
                        var current = getSelectionParentElement();

                        // If the parent element is the editor itself, wrap contents in a paragraph first.
                        if ($(current).is(trumbowyg.$ed)) {
                            var paragraph = document.createElement('p');
                            paragraph.style.fontFamily = font.family;
                            trumbowyg.range.surroundContents(paragraph);
                        } else {
                            current.style.fontFamily = font.family;
                        }

                    } catch (e) {
                    }
                }
            });
            dropdown.push('fontfamily_' + index);
        });

        return dropdown;
    }

    function getSelectionParentElement() {
        var parentEl = null,
            selection;
        if (window.getSelection) {
            selection = window.getSelection();
            if (selection.rangeCount) {
                parentEl = selection.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType !== 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((selection = document.selection) && selection.type !== 'Control') {
            parentEl = selection.createRange().parentElement();
        }
        return parentEl;
    }
})(jQuery);
