import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          {process.env.NODE_ENV === 'production' && (
            // <!-- Google Tag Manager (noscript) -->
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            ></noscript>
            // <!-- End Google Tag Manager (noscript) -->
          )}
          <Main />
          <NextScript />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `window.fbAsyncInit = function() {
              FB.init({
                appId      : '${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}',
                xfbml      : true,
                version    : 'v12.0'
              });
              FB.AppEvents.logPageView();
            };
            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));`,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
