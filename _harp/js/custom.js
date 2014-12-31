 (function ($) {
  "use strict";

  moment.locale("es");
  $('.datetime').each(function (idx, el) {
    var date = $(el).html();
    $(el).html(moment(date).format("LL"));
  });

 })(jQuery);
