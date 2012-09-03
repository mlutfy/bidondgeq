(function ($) {

/**
 * Handle DGEQ info for district
 */
Drupal.behaviors.bidondgeqcirchandler = {
  attach: function (context, settings) {
    $('#dgeqcircmain').html('');

    $('#dgeqcircmain').append('<div id="bidondgeqcirc-time"><span id="dgeq-heuresommaire"></span><span id="bidondgeq-clienttime"></span></div>');
    $('#dgeqcircmain').append('<div id="dgeq-bureauxvote"></div>');
    $('#dgeqcircmain').append('<div id="dgeq-parties"></div>');
    $('#dgeqcircmain').append('<div id="dgeq-circ-stats"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-votesvaltot"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-votesrejtot"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-votesexerces"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-electinstrits"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-tauxparticip"></div>');
    $('#dgeqcircmain').append('<div id="dgeq-circ-watch"></div>');
    $('#dgeq-circ-watch').append('<div id="dgeq-circ-watch-select-wrapper"></div>');
    $('#dgeq-circ-watch').append('<div id="dgeq-circ-watch-results"></div>');

    $('#page-title').html(Circ);

    // Main party results
    $('#dgeq-parties').html('');

    $.each(Table_Candidats, function(key, val) {
      $('#dgeq-parties').append(bidondgeq_candidatebox(key, val));
    });

    bidondgeqcirc_setlead(Table_Candidats);

    // Stats
    $('#dgeq-heuresommaire').html('Heure m-a-j DGEQ: ' + HeureRes);
    $('#dgeq-bureauxvote').html('Bureaux de vote compl&eacute;t&eacute;s: ' +  BurCompl + '/' + BurTotal);
    $('#dgeq-votesexerces').html('Votes: ' + VotesTot + ', dont ' + VotesValTot + ' (' + PcVotesVal + '%) valides, ' + VotesRejTot + ' (' + PcVotesRej + '%) rejet&eacute;s.');
    $('#dgeq-electinstrits').html('&Eacute;lecteurs inscrits: ' + NbElectInscr + ' (' + TauxPart + '% de participation)');
  }
}

function bidondgeq_candidatebox(key, data) {
  var id = 'dgeqcandidate' + key;
  var partyname = data[1];

  return '<div id="' + id + '" class="bidondgeq-candidate">'
    + '<div id="' + id + '-name" class="bidondgeq-party-name">' + partyname + '</div>'
    + '<div id="' + id + '-result" class="bidondgeq-party-result">' + data[2] + ' (' + data[3] + '%)</div>'
    + '</div>';
}

function bidondgeqcirc_setlead(table) {
  var valmax = 0;
  var idmax = 0;

  $.each(table, function(key, val) {
    if (val[2] > valmax) {
      idmax = key;
      valmax = val[2];
    }
  });

  $('#dgeqcandidate' + idmax + '-result').addClass('bidondgeq-party-leading');
}

function bidondgeqcirc_localtime() {
  var now = new Date();
  var output = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  $('#bidondgeq-clienttime').html('Heure locale: ' + output);
  // setInterval(function(){ clock();}, 1000);
}

})(jQuery);
