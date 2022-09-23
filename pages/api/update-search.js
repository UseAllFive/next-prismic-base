import aws4 from 'aws4'
import { getPagesToIndex } from './search-index'
import * as moment from 'moment-timezone'

/**
 * This endpoint looks for new posts and updates the search index
 * It's a POST that's meant to be run by a cron
 */
export default async function updateSearch(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers
      // Only run this if the env secret matches the header's secret
      if (authorization === `Bearer ${process.env.CRON_SECRET}`) {
        // Look up modified pages in the last 1.5 hours
        const offset = moment().add(-1.5, 'hours').valueOf()
        const indexData = await getPagesToIndex(offset)

        // nothing to import
        if (!indexData || indexData.length === 0) {
          return res.status(200).json({ success: true, empty: true })
        }

        // Store data as a file buffer to upload to aws
        var buf = Buffer.from(JSON.stringify(indexData))

        // aws4 will sign an options object as you'd pass to http.request, with an AWS service and region
        var opts = {
          host:
            'doc-prismic-zi3vcm5qxhe7ua7mhcd4neqequ.us-west-2.cloudsearch.amazonaws.com',
          path: '/2013-01-01/documents/batch',
          service: 'cloudsearch',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          region: 'us-west-2',
          body: buf,
        }

        // aws4.sign() will sign and modify these options
        const sign = aws4.sign(opts, {
          accessKeyId: process.env.AWS_ACCESS,
          secretAccessKey: process.env.AWS_SECRET,
        })

        const url = 'https://' + opts.host + opts.path
        await fetch(url, {
          method: 'POST',
          headers: sign.headers,
          body: buf,
        })

        res.status(200).json({ success: true })
      } else {
        res.status(401).json({ success: false })
      }
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
