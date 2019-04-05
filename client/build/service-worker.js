"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/client/index.html","7176b761644fe20c0ef4c6f0409b3477"],["/client/static/css/main.9c318f78.css","f23429c335ff52a790934438690cb3d9"],["/client/static/js/main.aed237e7.js","54ba71345d4243bff807a5e3fb87b0ba"],["/client/static/media/demo_0.3b8fbc5f.png","3b8fbc5f33a2abd8579a6f3774148e61"],["/client/static/media/demo_1.b93dc04e.png","b93dc04e9c139b2b76b05f5286f8f829"],["/client/static/media/demo_10.8ac264e9.png","8ac264e96d52ede555ff44515178d07d"],["/client/static/media/demo_2.5be758c9.png","5be758c9f09786572d56153d2c084083"],["/client/static/media/demo_3.ba8ca5bf.png","ba8ca5bf1c4b35e5fa9e372a9faa19ec"],["/client/static/media/demo_4.281faa76.png","281faa76beb3af67a90127156c129b32"],["/client/static/media/demo_5.3ae0e12d.png","3ae0e12d5af349b7d13d9ccfc02834a8"],["/client/static/media/demo_6.a6fc6ee0.png","a6fc6ee017f1e03feb383af54442e242"],["/client/static/media/demo_7.4fa1e25c.png","4fa1e25c3ff8a3aafd2a2237466cfcfb"],["/client/static/media/demo_8.b50531da.png","b50531da2b055bcd72f669cd0d48208e"],["/client/static/media/demo_9.15f3da5d.png","15f3da5dd6e1fc3671bda8234872ed10"],["/client/static/media/precourser.7b4575d9.svg","7b4575d9eae24aacbe9cabe4cf037571"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.hash="",n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(n){if(!t.has(n)){var a=new Request(n,{credentials:"same-origin"});return fetch(a).then(function(t){if(!t.ok)throw new Error("Request for "+n+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(n,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(n){return Promise.all(n.map(function(n){if(!t.has(n.url))return e.delete(n)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,n=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,"index.html"),t=urlsToCacheKeys.has(n));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(n=new URL("/client/index.html",self.location).toString(),t=urlsToCacheKeys.has(n)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});