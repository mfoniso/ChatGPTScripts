// ==UserScript==
// @name         ChatGPTCollapseChats
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a toolbar to collapse/expand ChatGPT's response
// @author       Mfoniso - mfoniso@gmail.com
// @include      https://chatgpt.com/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {

    'use strict';

    const chevron_down = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="chevron-down-icon" style="width: 100%; height: 100%;"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    const chevron_up = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="chevron-up-icon" style="width: 100%; height: 100%; display: inline-block; transform: rotate(180deg);"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    const scrollToTopIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="scroll-to-top-icon" style="width: 40px; height: 40px; cursor: pointer; transform: rotate(180deg);"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';

    var activated = false;

    $(window).on('popstate', function() {
        console.log('URL changed:', window.location.href);
        activated = false;
    });

    $(document).on('click', 'body', function() {

        if (activated) {
            return;
        }
        activated = true;

        // Create toolbar and insert it at top
        var toolbar = $('<div class="toolbar">\
                        <div class="close-all">Collapse all</div>\
                        <div class="open-all">Expand all</div>\
                         </div>'
                       );
        var scrollToTop = $('<div class="scroll-to-top-container">' + scrollToTopIcon + '</div>');
        toolbar.prepend(scrollToTop)

        var firstChat = $('article:first')
        firstChat.parent().prepend(toolbar)
        firstChat.css({'margin-top': '35px'});


        // Create icon to indicate collapse/expanded states
        $("[data-message-author-role=user]").each(function(index) {
            $(this).css({
                'display': 'flex',
                'flex-direction': 'row-reverse',
                'align-items': 'center'
            });

            var icon = $('<span class="toggle-icon"></span>');
            icon.html(chevron_up)
            $(this).prepend(icon)
        });


        // Event handler for icon
        $('.toggle-icon').on('click', function() {
            var prompt = $(this).closest('article');
            var response = prompt.next()
            var icon = $(this);

            response.toggle()
            if (response.is(':visible')) {
                icon.html(chevron_up);
            } else {
                icon.html(chevron_down);
            }
        })


        // Event handlers for toolbar icons
        $('.close-all').on('click', function() {
            $("[data-message-author-role=assistant]").closest("article").each(function(index) {
                $(this).hide()
            });

            $('.toggle-icon').html(chevron_down)

        });

        $('.open-all').on('click', function() {
            $("[data-message-author-role=assistant]").closest("article").show()

            $('.toggle-icon').html(chevron_up)
        });


        $('.scroll-to-top-container').on('click', function() {
            var div2scroll = document.querySelector('div.flex.h-full.flex-col.overflow-y-auto');
            $(div2scroll).scrollTop(0)
        });


         GM_addStyle(`

        .open-all, .close-all {
            font-size:1em;
            cursor: pointer;
            border-radius:5px;
            background: #ccc;
            padding:5px;
            float: left;
            margin-right: 2px
        }

        .toolbar {
            position: fixed;
            padding: 3px;
            background: #fff;
            width: 100%;
            z-index: 1;
            margin-bottom: 3px;
        }


        .toggle-icon {
            cursor: pointer;
            width: 30px;
            height: 30px;
            align-self: flex-start;
        }

        .scroll-to-top-container {
            float: left;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
        }

        .scroll-to-top-icon {
            fill: #007bff;
            transition: transform 0.3s ease;
        }

        .scroll-to-top-icon:hover {
            transform: scale(1.1); /* Slight scaling effect on hover */
        }
        `)

    });

})();
