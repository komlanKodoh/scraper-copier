(window.webpackJsonp=window.webpackJsonp||[]).push([[350],{"5vTk":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return c})),a.d(t,"default",(function(){return s}));var n,o=a("zLVn"),i=(a("q1tI"),a("7ljp")),l=a("O6H6"),c={},r=(n="Note",function(e){return console.warn("Component "+n+" was not imported, exported, or provided by MDXProvider as global scope"),Object(i.b)("div",e)}),m={_frontmatter:c},p=l.a;function s(e){var t=e.components,a=Object(o.a)(e,["components"]);return Object(i.b)(p,Object.assign({},m,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"You can change the visibility of a scoped package from the website or command line."),Object(i.b)("p",null,"You must be the owner of the user account or organization that owns the package in order to change package visibility."),Object(i.b)("p",null,'For more information about package visibility, see "',Object(i.b)("a",{parentName:"p",href:"package-scope-access-level-and-visibility"},"Package scope, access level, and visibility"),'".'),Object(i.b)(r,{mdxType:"Note"},Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Note:")," You cannot change the visibility of an unscoped package. Only scoped packages with a paid subscription may be private.")),Object(i.b)("h2",null,"Making a public package private"),Object(i.b)(r,{mdxType:"Note"},Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Note:")," Making a package private requires a paid user account or organization. To sign up for a paid user or organization, go to ",Object(i.b)("inlineCode",{parentName:"p"},"https://www.npmjs.com/settings/account-name/billing"),", replacing ",Object(i.b)("inlineCode",{parentName:"p"},"account-name")," with the name of your npm user account or organization.")),Object(i.b)("p",null,"If you want to restrict access and visibility for a public package you own, you can make the package private. When you make a package private, it will be removed from the website within a few minutes of the change."),Object(i.b)("h3",null,"Using the website"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"On the ",Object(i.b)("a",{parentName:"li",href:"https://npmjs.com"},"npm website"),", go to the package page."),Object(i.b)("li",{parentName:"ol"},"On the package page, click ",Object(i.b)("strong",{parentName:"li"},"Admin"),"."),Object(i.b)("li",{parentName:"ol"},'Under "Package Access", select "Is Package Private?"'),Object(i.b)("li",{parentName:"ol"},"Click ",Object(i.b)("strong",{parentName:"li"},"Update package settings"),".")),Object(i.b)("h3",null,"Using the command line"),Object(i.b)("p",null,"To make a public package private on the command line, run the following command, replacing ",Object(i.b)("inlineCode",{parentName:"p"},"<package-name>")," with the name of your package:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"npm access restricted <package-name>\n")),Object(i.b)("p",null,"For more information, see the ",Object(i.b)("a",{href:"https://docs.npmjs.com/cli-documentation/access"},Object(i.b)("inlineCode",{parentName:"p"},"npm access"))," documentation."),Object(i.b)("h2",null,"Making a private package public"),Object(i.b)("div",{className:"note"},Object(i.b)("span",{className:"bold"},"Note:")," When you make a private package public, the package will be visible to and downloadable by all npm users."),Object(i.b)("h3",null,"Using the website"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"On the npm website, go to the package page."),Object(i.b)("li",{parentName:"ol"},"On the package page, click ",Object(i.b)("strong",{parentName:"li"},"Admin"),"."),Object(i.b)("li",{parentName:"ol"},'Under "Package Access", deselect "Is Package Private?"'),Object(i.b)("li",{parentName:"ol"},"Click ",Object(i.b)("strong",{parentName:"li"},"Update package settings"),".")),Object(i.b)("h3",null,"Using the command line"),Object(i.b)("p",null,"To make a private package public on the command line, run the following command, replacing ",Object(i.b)("inlineCode",{parentName:"p"},"<package-name>")," with the name of your package:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},"npm access public <package-name>\n")),Object(i.b)("p",null,"For more information, see the ",Object(i.b)("a",{parentName:"p",href:"/cli/access"},Object(i.b)("inlineCode",{parentName:"a"},"npm access")," CLI documentation"),"."))}s.isMDXComponent=!0},O6H6:function(e,t,a){"use strict";var n=a("vOnD"),o=a("u9kb"),i=a("aOgs"),l=a("q1tI"),c=a.n(l),r=a("7ljp"),m=a("pD55"),p=a("8Aig"),s=a("ReZb"),b=a("GCVy"),u=a("+6vE");var d=function(e){var t=e.children;return c.a.createElement(o.d,{as:"pre",mt:0,mb:3,p:3,border:0,style:{color:"rgb(57, 58, 52)",backgroundColor:"rgb(246, 248, 250)",overflow:"auto"}},c.a.createElement(o.s,{fontFamily:"mono",fontSize:1},t))};var g=function(e){var t=e.children;return c.a.createElement("strong",null,t)},h=a("gnlW"),f=a("mwnC"),O=a("/Rw0"),k=a("dVM4"),y=Object(n.f)(o.e).withConfig({displayName:"table-of-contents___StyledBox",componentId:"eay2b8-0"})({listStyle:"none",lineHeight:"1.4em"});function j(e){var t=e.items,a=e.depth;return c.a.createElement(y,{key:t,as:"ul",m:0,p:0},t.map((function(e){return c.a.createElement(o.e,{as:"li",key:e.url,pl:a>0?3:0},c.a.createElement(o.n,{key:e.title,display:"inline-block",py:1,href:e.url,color:"gray.6"},e.title),e.items?c.a.createElement(j,{items:e.items,depth:a+1}):null)})))}j.defaultProps={depth:0};var v=j,w=a("MfeC");function E(e){var t=w.a.getPath(e.location.pathname),a=w.a.getVariantAndPage(e.root,t);if(!a)return null;var n=w.a.getVariantsForPage(e.root,a.page),i=[],l=n[0];return 0===n.length?null:(n.forEach((function(e){e.page.url===t&&(l=e),i.push(c.a.createElement(o.i.Item,{onClick:function(){window.location.href=e.page.url},key:e.variant.title},e.variant.title))})),c.a.createElement(o.i,{overlay:e.overlay},c.a.createElement(o.i.Button,null,l.variant.title),c.a.createElement(E.Menu,{direction:e.direction,width:e.menuWidth},i)))}E.Menu=Object(n.f)(o.i.Menu).withConfig({displayName:"variant-select__Menu",componentId:"sc-1rmksyl-0"})(["width:",";"],(function(e){return e.width?e.width:"160px"}));var N=E,x=Object(n.f)(o.k).withConfig({displayName:"layout___StyledFlex",componentId:"sc-1xkoyzi-0"})({zIndex:0}),C=Object(n.f)(o.l).withConfig({displayName:"layout___StyledGrid",componentId:"sc-1xkoyzi-1"})({alignItems:"start",alignSelf:"start"}),_=Object(n.f)(o.e).withConfig({displayName:"layout___StyledBox",componentId:"sc-1xkoyzi-2"})({gridArea:"heading"}),I=Object(n.f)(o.e).withConfig({displayName:"layout___StyledBox2",componentId:"sc-1xkoyzi-3"})({"margin-top":"25px"}),P=Object(n.f)(o.o).withConfig({displayName:"layout___StyledPosition",componentId:"sc-1xkoyzi-4"})({gridArea:"table-of-contents",overflow:"auto"}),z=Object(n.f)(o.e).withConfig({displayName:"layout___StyledBox3",componentId:"sc-1xkoyzi-5"})({gridArea:"content"});t.a=function(e){var t=e.children,a=e.pageContext,n=e.location,l=a.frontmatter,y=l.title,j=l.description,E=l.status,S=l.source,M=l.additionalContributors,T=void 0===M?[]:M,A=w.a.getVariantRoot(n.pathname);return c.a.createElement(r.a,{components:{Index:s.a,Note:b.a,Prompt:d,PromptReply:g,Screenshot:h.a}},c.a.createElement(o.k,{flexDirection:"column",minHeight:"100vh"},c.a.createElement(m.a,{title:y,description:j}),c.a.createElement(p.b,{location:n,isSearchEnabled:a.isSearchEnabled}),c.a.createElement(x,{flex:"1 1 auto",flexDirection:"row"},c.a.createElement(o.e,{display:["none",null,null,"block"]},c.a.createElement(f.a,{editOnGitHub:a.themeOptions.editOnGitHub,location:n})),c.a.createElement(C,{id:"skip-nav",maxWidth:"100%",gridTemplateColumns:["100%",null,"minmax(0, 65ch) 220px"],gridTemplateAreas:['"heading" "content"',null,'"heading table-of-contents" "content table-of-contents"'],gridColumnGap:[null,null,6,7],gridRowGap:3,mx:"auto",p:[5,6,null,7]},c.a.createElement(_,null,c.a.createElement(o.d,{borderWidth:0,borderBottomWidth:1,borderRadius:0,pb:2},c.a.createElement(o.e,null,c.a.createElement(o.e,null,c.a.createElement(o.m,{as:"h1"},y),j))),null!=A?c.a.createElement(I,null,c.a.createElement(N,{overlay:!0,direction:"se",menuWidth:"min(30ch, 500px)",root:A,location:n})):null),a.tableOfContents.items?c.a.createElement(P,{display:["none",null,"block"],position:"sticky",top:p.a+24,mt:"6px",maxHeight:"calc(100vh - "+p.a+"px - 24px)"},c.a.createElement(o.s,{display:"inline-block",fontWeight:"bold",mb:1},"Table of contents"),c.a.createElement(v,{items:a.tableOfContents.items})):null,c.a.createElement(z,null,E||S?c.a.createElement(o.k,{mb:3,alignItems:"center"},E?c.a.createElement(k.a,{status:E}):null,c.a.createElement(o.e,{mx:"auto"}),S?c.a.createElement(O.a,{href:S}):null):null,a.tableOfContents.items?c.a.createElement(o.e,{display:["block",null,"none"],mb:3},c.a.createElement(o.h,null,(function(e){var t=e.open;return c.a.createElement(c.a.Fragment,null,c.a.createElement(o.s,{as:"summary",fontWeight:"bold"},t?c.a.createElement(o.r,{icon:i.b,mr:2}):c.a.createElement(o.r,{icon:i.c,mr:2}),"Table of contents"),c.a.createElement(o.e,{pt:1},c.a.createElement(v,{items:a.tableOfContents.items})))}))):null,t,c.a.createElement(u.a,{editOnGitHub:a.themeOptions.editOnGitHub,editUrl:a.editUrl,contributors:a.contributors.concat(T.map((function(e){return{login:e}})))}))))))}}}]);
//# sourceMappingURL=component---content-packages-and-modules-updating-and-managing-your-published-packages-changing-package-visibility-mdx-7843836bc7a472e67262.js.map