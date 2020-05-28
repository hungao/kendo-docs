var dojoApi = (function($) {

    var dojoApi = {
        configuration: {
            url: "http://trykendoui.telerik.com/",
            currentKendoVersion: kendo.version
        },
        post: function (snippet) {
            if (!snippet.match(/<html>/i)) {
                snippet = dojoApi.wrapInHtml(snippet);
            }
            snippet = dojoApi.fixLineEndings(snippet);
            var form = $('<form method="post" target="_blank" action="' + dojoApi.configuration.url + '" />').appendTo(document.body);
            $("<input name='snippet'>").val(snippet).appendTo(form);

            form.submit();
        },
        fixLineEndings: function (code) {
            return code.replace(/\n/g, "&#10;");
        },
        showHintButton: function (element, text) {
            element = $(element);

            $("<button>")
                .text(text)
                .addClass("btn btn-primary dojo-submit-button")
                .css({
                    opacity: .8,
                    "float": "right",
                    margin: "1em 1em -4em 0"
                })
                .insertBefore(element);
        },
        wrapInHtml: function(snippet) {
            var result = ('<!DOCTYPE html>\n'+
            '<html>\n'+
            '<head>\n'+
            '    <meta charset="utf-8">\n'+
            '    <title>Kendo UI Snippet</title>\n\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.common.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.rtl.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.default.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.dataviz.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.dataviz.default.min.css">\n'+
            '    <link rel="stylesheet" href="http://cdn.kendostatic.com/kendo-version/styles/kendo.mobile.all.min.css">\n\n'+
            '    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>\n'+
            '    <script src="http://cdn.kendostatic.com/kendo-version/js/kendo.all.min.js"></script>\n'+
            '</head>\n'+
            '<body>\n  \n'+
            snippet+ '\n' +
            '</body>\n'+
            '</html>').replace(/kendo-version/g, dojoApi.configuration.currentKendoVersion);
            return result;
        }
    };

    return dojoApi;
})(jQuery);

jQuery(function() {
   $("body").find(".prettyprint").each(function() {
       dojoApi.showHintButton(this, "Edit this example");
   });

   $("body").on("click", ".dojo-submit-button", function(e) {
       e.preventDefault();
       var snippet = $(this).next().text();
       dojoApi.post(snippet);
   });
});
