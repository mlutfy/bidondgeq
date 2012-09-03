(function ($) {

/**
 * Handle DGEQ data obtained from calls to their .js files with
 * global javascript variables.
 */
Drupal.behaviors.bidondgeqhandler = {
  attach: function (context, settings) {
    $('#dgeqmain').html('');

    // Main content placeholders
    $('#dgeqmain').append('<div id="bidondgeq-time"><span id="dgeq-heuresommaire"></span><span id="bidondgeq-clienttime"></span></div>');
    $('#dgeqmain').append('<div id="dgeq-bureauxvote"></div>');
    $('#dgeqmain').append('<div id="dgeq-parties"></div>');
    $('#dgeqmain').append('<div id="dgeq-global-stats"></div>');
    $('#dgeq-global-stats').append('<div id="dgeq-votes"></div>');
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

    bidondgeq_setlead(Table_Avance);

    // Stats
    $('#dgeq-heuresommaire').html('Heure m-a-j DGEQ: ' + HeureSommaire);
    $('#dgeq-bureauxvote').html('Bureaux de vote compl&eacute;t&eacute;s: ' + BureauxVoteTot + '/' + BureauxVoteMax + ' (' + BureauxVotePc + '%)');
    $('#dgeq-votes').html('Votes: ' + VotesExerces + ', dont ' + VotesValTot + ' (' + Math.round(VotesValTot/VotesExerces*100) + '%) valides, ' + VotesRejTot + ' (' + Math.round(VotesRejTot/VotesExerces*100) + '%) rejet&eacute;s.');
    $('#dgeq-electinstrits').html('&Eacute;lecteurs inscrits: ' + ElectInscrits + ' (' + TauxParticip + '% de participation)');
    bidondgeq_localtime();

    // Districts to watch
    var dgeqWatch = [
      383, // mercier
      381, // gouin
      423, // laurier-dorion
      439, // lavel-des-rapides
      397, // verdun
      113, // sherbrooke
      363, // assomption
      329, // nicolet
    ]; 

    bidondgeq_watch_select();

    $.each(dgeqWatch, function(key, value) {
      bidondgeq_watch_add(value);
    });
  }
}

/**
 * Make the name shorter.
 * Ex: Parti Liberal du Quebec - Quebec liberal party = Parti Liberal du Quebec
 */
function bidondgeq_fixname(name) {
  if ((x = name.indexOf('-')) > 0) {
    name = name.substr(0, x).trim();
  }

  if ((x = name.indexOf('/')) > 0) {
    name = name.substr(0, x).trim();
  }

  return name;
}

/**
 * Returns an html box with the party name and score
 */
function bidondgeq_partybox(key, data) {
  var id = 'dgeqparty' + key;
  var partyname = bidondgeq_fixname(data[0]);

  return '<div id="' + id + '" class="bidondgeq-party">'
    + '<div id="' + id + '-name" class="bidondgeq-party-name">' + partyname + '</div>'
    + '<div id="' + id + '-result" class="bidondgeq-party-result">' + data[2] + ' (' + data[3] + '%)</div>'
    + '</div>';
}

/**
 * Adds a css class on the leading party
 */
function bidondgeq_setlead(table) {
  var valmax = 0;
  var idmax = 0;

  $.each(table, function(key, val) {
    if (val[2] > valmax) {
      idmax = key;
      valmax = val[2];
    }
  });

  $('#dgeqparty' + idmax + '-result').addClass('bidondgeq-party-leading');
}

/**
 * Show the current time, so that the user can compare the time of the
 * request with the time of the DGEQ data (shown elsewhere).
 */
function bidondgeq_localtime() {
  var now = new Date();
  var output = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  $('#bidondgeq-clienttime').html('Heure locale: ' + output);
}

/**
 * Creates a 'select' html element so that the user can add another riding.
 */
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

/**
 * Creates a new iframe with results of a specific riding.
 */
function bidondgeq_watch_add(key) {
  var url = '/fr/dgeq/' + key;
  $('#dgeq-circ-watch-results').append('<iframe src="' + url + '" width="500px" height="200px" />');
}

})(jQuery);
