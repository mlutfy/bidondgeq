This is a proof of concept module to view the QC2012
election results usign data from the DGEQ (www.dgeq.org).

You should not use this on a high-traffic site, since it
does not cache the results. The module simply calls the
json files hosted by the dgeq. A high-traffic site should
fetch those files with a cron, and hit its local cache.

Latest source:

https://github.com/mlutfy/bidondgeq

Author:

Mathieu Lutfy
mathieu@bidon.ca
http://www.bidon.ca/en/about

Licence: GPL v2, see LICENSE.txt.
