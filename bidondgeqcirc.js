(function ($) {

/**
 * Handle DGEQ info for district
 */
Drupal.behaviors.bidondgeqcirchandler = {
  attach: function (context, settings) {
    $('#dgeqcircmain').html('');

    $('#dgeqcircmain').append('<div id="bidondgeqcirc-time"><span id="dgeq-heuresommaire"></span><span id="bidondgeq-clienttime"></span></div>');
    $('#dgeqcircmain').append('<div id="dgeq-avance">Avance (non-final sauf si l\'heure DGEQ indique FINAL):</div>');
    $('#dgeqcircmain').append('<div id="dgeq-parties"></div>');
    $('#dgeqcircmain').append('<div id="dgeq-global-stats"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-bureauxvote"></div>');
    // $('#dgeq-circ-stats').append('<div id="dgeq-bureauxvotemax"></div>');
    // $('#dgeq-circ-stats').append('<div id="dgeq-bureauxvotepc"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-votesvaltot"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-votesrejtot"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-votesexerces"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-electinstrits"></div>');
    $('#dgeq-circ-stats').append('<div id="dgeq-tauxparticip"></div>');
    $('#dgeqcircmain').append('<div id="dgeq-circ-watch"></div>');
    $('#dgeq-circ-watch').append('<div id="dgeq-circ-watch-select-wrapper"></div>');
    $('#dgeq-circ-watch').append('<div id="dgeq-circ-watch-results"></div>');

    // Main party results
    $('#dgeq-parties').html('');

    $.each(Table_Candidats, function(key, val) {
      $('#dgeq-parties').append(bidondgeq_candidatebox(key, val));
    });

    // Stats
    $('#dgeq-heuresommaire').html('Heure m-a-j DGEQ: ' + HeureRes);
    $('#dgeq-bureauxvote').html('Bureaux de vote compl&eacute;t&eacute;s: ' +  BurCompl + '/' + BurTotal);
/*
    $('#dgeq-votesexerces').html('Votes exerc&eacute;s: ' + VotesExerces);
    $('#dgeq-votesrejtot').html('Votes rejet&eacute;s: ' + VotesRejTot);
    $('#dgeq-votesvaltot').html('Votes: ' + VotesValTot);
    $('#dgeq-electinstrits').html('&Eacute;lecteurs inscrits: ' + ElectInscrits);
    $('#dgeq-tauxparticip').html('Taux de participation: ' + TauxParticip + '%');
*/
    bidondgeqcirc_localtime();
/*
var HeureRes = "14:32:16 FINAL";
var Poste = "#1";
var Circ = "MERCIER";
var BurCompl = "188";
var BurTotal = "188";
var VotesValTot = "20Â 046";
var PcVotesVal = "80,08";
var PcVotesRej = "19,92";
var VotesRejTot = "4Â 988";
var VotesTot = "25Â 034";
var NbElectInscr = "50Â 939";
var TauxPart = "49,15";
var Table_Candidats = [
["C188, Candidat","C.A.Q.-Ã‰.F.L.","5Â 091","25,40","66"],
["C185, Candidat","P.L.Q./Q.L.P.","5Â 025","25,07",""],
["C186, Candidat","P.Q.","4Â 981","24,85",""],
["C187, Candidat","Q.S.","4Â 949","24,69",""]
];
*/


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

function bidondgeqcirc_localtime() {
  var now = new Date();
  var output = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  $('#bidondgeq-clienttime').html('Heure locale: ' + output);
  // setInterval(function(){ clock();}, 1000);
}

})(jQuery);
