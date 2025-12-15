// assets/js/head-main.js

(function (global, doc) {
  function injectTrackingTags() {
    if (!doc || !doc.head) return;

    // Prevent double insertion on the same page
    if (global.__ELEPHAS_TRACKING_INITIALIZED__) return;
    global.__ELEPHAS_TRACKING_INITIALIZED__ = true;

    //
    // --- Google tag (gtag.js) ---
    //
    var gtagScript = doc.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-79H477PVKN';
    doc.head.appendChild(gtagScript);

    var gtagInline = doc.createElement('script');
    gtagInline.text =
      "window.dataLayer = window.dataLayer || [];\n" +
      "function gtag(){dataLayer.push(arguments);}\n" +
      "gtag('js', new Date());\n" +
      "gtag('config', 'G-79H477PVKN');\n" +
      "gtag('config', 'AW-990445102');";
    doc.head.appendChild(gtagInline);

    //
    // --- Submit Contact Form conversion (fires on page load) ---
    // If you only want this on the thank-you page, just call
    // enableTrackingTags() only on that page.
    //
    var convScript = doc.createElement('script');
    convScript.text =
      "if (typeof gtag === 'function') {\n" +
      "  gtag('event', 'conversion', {\n" +
      "    'send_to': 'AW-990445102/UNiBCNDf_s4bEK78og9D'\n" +
      "  });\n" +
      "}";
    doc.head.appendChild(convScript);

    //
    // --- Meta Pixel Code ---
    //
    var fbScript = doc.createElement('script');
    fbScript.text =
      "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n" +
      "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\n" +
      "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);\n" +
      "t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];\n" +
      "s.parentNode.insertBefore(t,s)}(window, document,'script',\n" +
      "'https://connect.facebook.net/en_US/fbevents.js');\n" +
      "fbq('init', '1600525836687823');\n" +
      "fbq('track', 'PageView');";
    doc.head.appendChild(fbScript);

    // noscript fallback (goes in body — but only matters if JS is enabled anyway)
    var noscript = doc.createElement('noscript');
    var img = doc.createElement('img');
    img.setAttribute('height', '1');
    img.setAttribute('width', '1');
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=1600525836687823&ev=PageView&noscript=1';
    noscript.appendChild(img);

    (doc.body || doc.documentElement).appendChild(noscript);
  }

  // Public function you call from any page
  global.enableTrackingTags = injectTrackingTags;
})(window, document);
