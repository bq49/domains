!function(e){"use strict";var n={},r={},t="iscjsfsaolnm",i=256,f=/[^a-z0-9.-]/,o=[];function s(e){if(!e)return"";for(var t;;){if((t=e.indexOf("."))<0)return e;if(u(n,e))return e.slice(t+1);if(u(r,e))return e;if(u(r,"*"+e.slice(t)))return e;e=e.slice(t+1)}}function u(e,n){var r,t,i=n.lastIndexOf(".");i<0?(r=n,t=n):(r=n.slice(i+1),t=n.slice(0,i));var f=e[r];if(!f)return!1;if("string"==typeof f)return f.indexOf(" "+t+" ")>=0;var o=t.length,s=f[o];if(!s)return!1;for(var u,c,l=0,a=Math.floor(s.length/o+.5);l<a;)if(u=l+a>>1,t<(c=s.substr(o*u,o)))a=u;else{if(!(t>c))return!0;l=u+1}return!1}function c(e){var n,r,t,f;for(var o in e)if(e.hasOwnProperty(o))if(n=e[o].join(" "))if(n.length<i)e[o]=" "+n+" ";else{for(t=e[o].length,n=[];t--;)n[f=(r=e[o][t]).length]||(n[f]=[]),n[f].push(r);for(f=n.length;f--;)n[f]&&(n[f]=n[f].sort().join(""));e[o]=n}else e[o]="";return e}var l=function(e){for(var n=0;n<e.length;n++)e[n]()},a={addListener:function(e){!function(e,n){"function"==typeof n&&-1===e.indexOf(n)&&e.push(n)}(o,e)},removeListener:function(e){!function(e,n){var r=e.indexOf(n);-1!==r&&e.splice(r,1)}(o,e)}};(e=e||window).publicSuffixList={version:"1.0",parse:function(e,t){n={},r={};for(var i,s,u,a,h,g=0,v=(e=e.toLowerCase()).length;g<v;)(i=e.indexOf("\n",g))<0&&(i=e.indexOf("\r",g))<0&&(i=v),s=e.slice(g,i).trim(),g=i+1,0!==s.length&&((a=s.indexOf("//"))>=0&&(s=s.slice(0,a)),(s=s.trim())&&(f.test(s)&&(s=t(s)),"!"===s.charAt(0)?(u=n,s=s.slice(1)):u=r,(a=s.lastIndexOf("."))<0?h=s:(h=s.slice(a+1),s=s.slice(0,a)),u.hasOwnProperty(h)||(u[h]=[]),s&&u[h].push(s)));c(n),c(r),l(o)},getDomain:function(e){if(!e||"."===e.charAt(0))return"";var n=s(e=e.toLowerCase());if(n===e)return"";var r=e.lastIndexOf(".",e.lastIndexOf(".",e.length-n.length)-1);return r<=0?e:e.slice(r+1)},getPublicSuffix:s,toSelfie:function(){return{magic:t,rules:r,exceptions:n}},fromSelfie:function(e){return"object"==typeof e&&"string"==typeof e.magic&&e.magic===t&&(r=e.rules,n=e.exceptions,l(o),!0)},onChanged:a}}(this);