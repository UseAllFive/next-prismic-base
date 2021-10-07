import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from 'lib/analytics'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                      referrer: document.referrer.split('?')[0],
                    });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
