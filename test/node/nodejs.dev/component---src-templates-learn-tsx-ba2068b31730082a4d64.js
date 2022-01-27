/*! For license information please see component---src-templates-learn-tsx-ba2068b31730082a4d64.js.LICENSE.txt */
(self.webpackChunknodejs_website=self.webpackChunknodejs_website||[]).push([[301],{5900:function(e,t){var n;!function(){"use strict";var o={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e.push(n);else if(Array.isArray(n)){if(n.length){var l=i.apply(null,n);l&&e.push(l)}}else if("object"===r)if(n.toString===Object.prototype.toString)for(var a in n)o.call(n,a)&&n[a]&&e.push(a);else e.push(n.toString())}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0===(n=function(){return i}.apply(t,[]))||(e.exports=n)}()},229:function(e,t,n){"use strict";var o=n(7294),i=n(5444),r=n(5900),l=n.n(r);t.Z=function(e){var t=e.isLearn,n=void 0===t||t,r=e.isRead,a=e.isActive,s=e.slug,c=e.title,u=e.baseUrl,d=e.onClick,f=n?l()("t-body2 side-nav__item",{"side-nav__item--done":r,"side-nav__item--active":!r&&a}):l()("t-body2 side-nav__item-community",{"side-nav__item-community--active":a});return o.createElement(i.Link,{to:""+(u||"/learn/")+s,id:"link-"+s,onClick:d,className:f},c)}},6126:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var o=n(7294),i=n(3150),r=n(8764),l=n(229),a=function(e){var t=e.title,n=e.section,i=e.currentSlug,r=e.onItemClick,a=e.readSections;return o.createElement("ul",{className:"side-nav__list"},o.createElement("h2",{className:"t-body2 side-nav__title"},o.createElement("i",{className:"material-icons"},"offline_bolt"),t),n.map((function(e){var t=a.has(e.slug);return o.createElement(l.Z,{key:e.slug,title:e.title,slug:e.slug,isRead:t,isActive:e.slug===i,onClick:r})})))},s=function(e){return Math.max(document.documentElement.clientWidth,window.innerWidth||0)<=e},c=function(){return s(720)};function u(e,t,n){void 0===t&&(t=null),void 0===n&&(n=333);var o=(t&&t.scrollTop||window.pageYOffset||document.documentElement.scrollTop)-(t&&t.clientTop||0),i=e-o,r=window.performance.now(),l=0;return new Promise((function(e){!function a(){var s,c,u,d=window.performance.now(),f=d-r;r=d,l+=f,(t||document.scrollingElement||window).scrollTo(0,(s=l,c=o,u=i,(s/=n/2)<1?u/2*s*s*s+c:u/2*((s-=2)*s*s+2)+c)),l<n&&window.requestAnimationFrame(a),e(!0)}()}))}var d=function(e,t){var n,o=t.getBoundingClientRect(),i=t;return{newScrollPos:n=c()?e-window.screen.height/2:e-o.top-(t.offsetHeight-t.offsetTop)/2,scrollWindow:i,scrollTime:.9*n+500}},f=function(e){var t=e.sections,n=e.currentSlug,i=e.previousSlug,r=e.label,l=e.category,s=(0,o.useState)(!1),f=s[0],m=s[1],v=(0,o.useRef)(null),p=function(){return m(!f)},g=function(){c()&&p()};(0,o.useEffect)((function(){if("undefined"!=typeof window){var e=v.current;if(e){var t=document.getElementById("link-"+n),o=d((null==t?void 0:t.getBoundingClientRect().top)||0,e),r=o.newScrollPos,l=o.scrollWindow,a=o.scrollTime;if(c()&&!f)return document.querySelector(":root").style.overflowY="initial",void(document.querySelector(".nav").style.position="sticky");if(c())document.querySelector(":root").style.overflowY="hidden",document.querySelector(".nav").style.position="fixed",u(r,l,a);else if(i){var s=document.getElementById("link-"+i),m=d((null==s?void 0:s.getBoundingClientRect().top)||0,e);e.scrollTop=m.newScrollPos,u(r,l,a)}else e.scrollTop=r}}}),[n,i,f]);var w=f?"side-nav side-nav--open":"side-nav",y=new Set;return Object.keys(t).some((function(e){var o=!1;return t[e].data.some((function(e){return(o=e.slug===n)||y.add(e.slug),o})),o})),o.createElement("nav",{"aria-label":r,className:w,ref:v},o.createElement("button",{type:"button",className:"side-nav__open",onClick:p},"Menu"),Object.keys(t).map((function(e){return t[e].category===l&&o.createElement(a,{key:e,title:e,section:t[e].data,currentSlug:n,onItemClick:g,readSections:y})})))},m=n(3648),v=function(e){var t,n=e.data.doc,l=n.frontmatter,a=l.title,s=l.description,c=n.body,u=n.tableOfContents,d=n.fields.authors,v=e.pageContext,p=v.slug,g=v.next,w=v.previous,y=v.relativePath,h=v.navigationData,b=e.location,S="";"undefined"!=typeof window&&window.previousPath&&(S=(null===(t=window.previousPath.split("/learn")[1])||void 0===t?void 0:t.substr(1))||"introduction-to-nodejs");return o.createElement(o.Fragment,null,o.createElement(r.Z,{title:a,description:s,location:b,showFooter:!1},o.createElement("main",{className:"grid-container"},o.createElement(f,{currentSlug:p,previousSlug:S,label:"Secondary",sections:h,category:"learn"}),o.createElement(i.Z,{title:a,body:c,tableOfContents:u,next:g,authors:d,previous:w,relativePath:y}))),o.createElement(m.Z,null))}}}]);
//# sourceMappingURL=component---src-templates-learn-tsx-ba2068b31730082a4d64.js.map