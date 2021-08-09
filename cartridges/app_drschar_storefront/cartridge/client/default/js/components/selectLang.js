module.exports = function () {

    $('#SelLangFlag').on('change', function() {
        var url = this.value;
        window.open(url);
      });
}