/*! For license information please see component---src-pages-privacy-tsx-77312fbe7693ba5c3a51.js.LICENSE.txt */
(self.webpackChunknodejs_website=self.webpackChunknodejs_website||[]).push([[831],{5900:function(e,t){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var s=r.apply(null,n);s&&e.push(s)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var o in n)a.call(n,o)&&n[o]&&e.push(o);else e.push(n.toString())}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},229:function(e,t,n){"use strict";var a=n(7294),r=n(5444),i=n(5900),s=n.n(i);t.Z=function(e){var t=e.isLearn,n=void 0===t||t,i=e.isRead,o=e.isActive,u=e.slug,l=e.title,c=e.baseUrl,m=e.onClick,d=n?s()("t-body2 side-nav__item",{"side-nav__item--done":i,"side-nav__item--active":!i&&o}):s()("t-body2 side-nav__item-community",{"side-nav__item-community--active":o});return a.createElement(r.Link,{to:""+(c||"/learn/")+u,id:"link-"+u,onClick:m,className:d},l)}},9827:function(e,t,n){"use strict";n.d(t,{QS:function(){return a}});var a,r=n(7294),i=n(229);!function(e){e.about="about",e.governance="governance",e.community="community",e.workingGroups="working-groups",e.releases="releases",e.resources="resources",e.trademark="trademark",e.privacy="privacy",e.security="security",e.packageManager="download/package-manager"}(a||(a={}));var s,o=[{title:"About",slug:a.about},{title:"Project Governance",slug:a.governance},{title:"Community",slug:a.community},{title:"Working Groups",slug:a.workingGroups},{title:"Releases",slug:a.releases},{title:"Resources",slug:a.resources},{title:"Trademark Policy",slug:a.trademark},{title:"Privacy Policy",slug:a.privacy},{title:"Security Reporting",slug:a.security},{title:"Package Manager",slug:a.packageManager}];!function(e){e.unset="unset",e.hidden="hidden"}(s||(s={}));t.ZP=function(e){var t=e.pageKey,n=(0,r.useState)(!1),a=n[0],u=n[1],l=a?"side-nav-about side-nav--open":"side-nav-about";"undefined"!=typeof document&&(document.body.style.overflow=a?s.hidden:s.unset);var c=(0,r.useRef)(null);return r.createElement("nav",{className:l,ref:c},r.createElement("button",{type:"button",className:"side-nav__open",onClick:function(){return u(!a)}},"Menu"),r.createElement("ul",{className:"community-nav__list"},o.sort((function(e,t){return e.title.localeCompare(t.title)})).map((function(e){var n=e.title,a=e.slug;return r.createElement(i.Z,{key:a,title:n,isLearn:!1,isRead:!1,isActive:a===t,slug:a,baseUrl:"/"})}))))}},9980:function(e,t,n){"use strict";n.r(t);var a=n(7294),r=n(8764),i=n(3150),s=n(3648),o=n(9827);t.default=function(e){var t=e.data,n=t.page.frontmatter,u=n.title,l=n.description,c=t.page,m=c.body,d=c.tableOfContents,p=t.page.fields.authors;return a.createElement(a.Fragment,null,a.createElement(r.Z,{title:u,description:l,showFooter:!1},a.createElement("main",{className:"grid-container"},a.createElement(o.ZP,{pageKey:o.QS.privacy}),a.createElement(i.Z,{title:u,body:m,tableOfContents:d,authors:p,editPath:"content/about/privacy.md"}))),a.createElement(s.Z,null))}}}]);
//# sourceMappingURL=component---src-pages-privacy-tsx-77312fbe7693ba5c3a51.js.map