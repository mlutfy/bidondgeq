(function ($) {

/**
 * Handle DGEQ info
 */
Drupal.behaviors.bidondgeqhandler = {
  attach: function (context, settings) {
    $('#dgeqmain').html('');

    // Main content sections
    $('#dgeqmain').append('<div id="bidondgeq-time"><span id="dgeq-heuresommaire"></span><span id="bidondgeq-clienttime"></span></div>');
    $('#dgeqmain').append('<div id="dgeq-avance">Avance (non-final sauf si l\'heure DGEQ indique FINAL):</div>');
    $('#dgeqmain').append('<div id="dgeq-parties"></div>');
    $('#dgeqmain').append('<div id="dgeq-global-stats"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-bureauxvote"></div>');
    // $('#dgeq-global-stats').append('<div id="dgeq-bureauxvotemax"></div>');
    // $('#dgeq-global-stats').append('<div id="dgeq-bureauxvotepc"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-votesvaltot"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-votesrejtot"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-votesexerces"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-electinstrits"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-tauxparticip"></div>');
    $('#dgeqmain').append('<div id="dgeq-circ-watch"></div>');
    $('#dgeq-circ-watch').append('<div id="dgeq-circ-watch-select-wrapper"></div>');
    $('#dgeq-circ-watch').append('<div id="dgeq-circ-watch-results"></div>');

    // Main party results
    $('#dgeq-parties').html('');

    $.each(Table_Avance, function(key, val) {
      $('#dgeq-parties').append(bidondgeq_partybox(key, val));
    });

    // Stats
    $('#dgeq-heuresommaire').html('Heure m-a-j DGEQ: ' + HeureSommaire);
    $('#dgeq-bureauxvote').html('Bureaux de vote compl&eacute;t&eacute;s: ' + BureauxVoteTot + '/' + BureauxVoteMax + ' (' + BureauxVotePc + '%)');
    $('#dgeq-votesexerces').html('Votes exerc&eacute;s: ' + VotesExerces);
    $('#dgeq-votesrejtot').html('Votes rejet&eacute;s: ' + VotesRejTot);
    $('#dgeq-votesvaltot').html('Votes: ' + VotesValTot);
    $('#dgeq-electinstrits').html('&Eacute;lecteurs inscrits: ' + ElectInscrits);
    $('#dgeq-tauxparticip').html('Taux de participation: ' + TauxParticip + '%');
    bidondgeq_localtime();

    // Districts to watch
    var dgeqWatch = [
      383, // mercier
//      381, // gouin
//      423, // laurier-dorion
//      439, // lavel-des-rapides
//      397, // verdun
//      113, // sherbrooke
//      363, // assomption
//      329, // nicolet
    ]; 

    bidondgeq_watch_select();

    $.each(dgeqWatch, function(key, value) {
      bidondgeq_watch_add(value);
    });
  }
}

function bidondgeq_partybox(key, data) {
  var id = 'dgeqparty' + key;
  var partyname = data[0];

  if ((x = partyname.indexOf('-')) > 0) {
    partyname = partyname.substr(0, x).trim();
  }
  if ((x = partyname.indexOf('/')) > 0) {
    partyname = partyname.substr(0, x).trim();
  }

  return '<div id="' + id + '" class="bidondgeq-party">'
    + '<div id="' + id + '-name" class="bidondgeq-party-name">' + partyname + '</div>'
    + '<div id="' + id + '-result" class="bidondgeq-party-result">' + data[2] + ' (' + data[3] + '%)</div>'
    + '</div>';
}

function bidondgeq_localtime() {
  var now = new Date();
  var output = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  $('#bidondgeq-clienttime').html('Heure locale: ' + output);
  // setInterval(function(){ clock();}, 1000);
}

function bidondgeq_watch_select() {
  $('#dgeq-circ-watch-select-wrapper')
    .append('<select id="dgeq-circ-watch-widget"><option value="">- select -</option></select>');

  $.each(dgeqcirc, function(key, value) {
    $('#dgeq-circ-watch-widget')
      .append($("<option></option>")
      .attr("value", key)
      .text(value)); 
  });
}

function bidondgeq_watch_add(key) {
  var url = '/fr/dgeq/' + key;
  $('#dgeq-circ-watch-results').append('<iframe src="' + url + '" width="200px" height="100px" />');
}

})(jQuery);
