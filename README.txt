This is a proof of concept module to view the QC2012
election results usign data from the DGEQ (www.dgeq.org).

You should not use this on a high-traffic site, since it
does not cache the results. The module simply calls the
json files hosted by the dgeq. A high-traffic site should
fetch those files with a cron, and hit its local cache.

The DGEQ.org license requires websites using their data to
display the following:

« Comprends des données ouvertes octroyées sous la licence d'utilisation
des données ouvertes du Directeur général des élections du Québec disponible
à l’adresse Web : www.dge.org. L'octroi de la licence n’implique aucune
approbation par le Directeur général des élections du Québec de
l'utilisation des données ouvertes qui en est faite. »

See www.dgeq.org for more information on the license.

Latest source of this module:
https://github.com/mlutfy/bidondgeq

Author:

Mathieu Lutfy
mathieu@bidon.ca
http://www.bidon.ca/en/about

Licence: GPL v2, see LICENSE.txt.
