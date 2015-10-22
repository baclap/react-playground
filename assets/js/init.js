$(function() {
  $(".nav-wrapper .button-collapse").sideNav();
  $('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    format: 'yyyy-mm-dd'
  });
});
