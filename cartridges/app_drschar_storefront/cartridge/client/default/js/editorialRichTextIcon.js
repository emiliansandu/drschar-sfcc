"use strict";

$(function () {
   //first let's normalize all external links in inside p tag element by doing this it will output some broken links but this is expected and will fix it on next step
    $(".editorialRichTextIcon-component-container")
        .find("p")
        .each(function () {
            $(this).html(
                $(this)
                    .html()
                    .replace(
                        /((data-link-label="http|data-link-label="https|data-link-label="ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,
                        ""
                    )
            );
            $(this).html(
                $(this)
                    .html()
                    .replace(
                        /((<a href="http|href="https|href="ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,
                        ""
                    )
            );
            $(this).html(
                $(this)
                    .html()
                    .replace(
                        /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g,
                        '<a href="$1">link</a>'
                    )
            );
            //next let's take away all the broken links resulted from external links normalization process to clean our html code
            var editText = $(this).html();
            var preString = '<a "=""';
            var splitedText = editText.split(preString).length - 1;
            for (var i = 0; i < splitedText; i++) {
                var loopString = $(this).html();
                loopString = loopString.toString();
                preString = preString.toString();
                var searchString = "a>";
                searchString = searchString.toString();
                var preIndex = loopString.indexOf(preString);
                var searchIndex =
                    preIndex +
                    loopString.substring(preIndex).indexOf(searchString);
                var requiredString = loopString.substring(
                    preIndex,
                    searchIndex + 2
                );
                $(this).html(loopString.replace(requiredString, ""));
            }
        });
});
