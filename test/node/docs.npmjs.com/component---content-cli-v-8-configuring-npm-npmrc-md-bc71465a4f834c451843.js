(window.webpackJsonp=window.webpackJsonp||[]).push([[237],{O6H6:function(e,n,t){"use strict";var a=t("vOnD"),l=t("u9kb"),i=t("aOgs"),o=t("q1tI"),r=t.n(o),c=t("7ljp"),m=t("pD55"),p=t("8Aig"),s=t("ReZb"),b=t("GCVy"),u=t("+6vE");var d=function(e){var n=e.children;return r.a.createElement(l.d,{as:"pre",mt:0,mb:3,p:3,border:0,style:{color:"rgb(57, 58, 52)",backgroundColor:"rgb(246, 248, 250)",overflow:"auto"}},r.a.createElement(l.s,{fontFamily:"mono",fontSize:1},n))};var f=function(e){var n=e.children;return r.a.createElement("strong",null,n)},h=t("gnlW"),g=t("mwnC"),O=t("/Rw0"),j=t("dVM4"),y=Object(a.f)(l.e).withConfig({displayName:"table-of-contents___StyledBox",componentId:"eay2b8-0"})({listStyle:"none",lineHeight:"1.4em"});function E(e){var n=e.items,t=e.depth;return r.a.createElement(y,{key:n,as:"ul",m:0,p:0},n.map((function(e){return r.a.createElement(l.e,{as:"li",key:e.url,pl:t>0?3:0},r.a.createElement(l.n,{key:e.title,display:"inline-block",py:1,href:e.url,color:"gray.6"},e.title),e.items?r.a.createElement(E,{items:e.items,depth:t+1}):null)})))}E.defaultProps={depth:0};var v=E,N=t("MfeC");function C(e){var n=N.a.getPath(e.location.pathname),t=N.a.getVariantAndPage(e.root,n);if(!t)return null;var a=N.a.getVariantsForPage(e.root,t.page),i=[],o=a[0];return 0===a.length?null:(a.forEach((function(e){e.page.url===n&&(o=e),i.push(r.a.createElement(l.i.Item,{onClick:function(){window.location.href=e.page.url},key:e.variant.title},e.variant.title))})),r.a.createElement(l.i,{overlay:e.overlay},r.a.createElement(l.i.Button,null,o.variant.title),r.a.createElement(C.Menu,{direction:e.direction,width:e.menuWidth},i)))}C.Menu=Object(a.f)(l.i.Menu).withConfig({displayName:"variant-select__Menu",componentId:"sc-1rmksyl-0"})(["width:",";"],(function(e){return e.width?e.width:"160px"}));var k=C,x=Object(a.f)(l.k).withConfig({displayName:"layout___StyledFlex",componentId:"sc-1xkoyzi-0"})({zIndex:0}),w=Object(a.f)(l.l).withConfig({displayName:"layout___StyledGrid",componentId:"sc-1xkoyzi-1"})({alignItems:"start",alignSelf:"start"}),_=Object(a.f)(l.e).withConfig({displayName:"layout___StyledBox",componentId:"sc-1xkoyzi-2"})({gridArea:"heading"}),I=Object(a.f)(l.e).withConfig({displayName:"layout___StyledBox2",componentId:"sc-1xkoyzi-3"})({"margin-top":"25px"}),S=Object(a.f)(l.o).withConfig({displayName:"layout___StyledPosition",componentId:"sc-1xkoyzi-4"})({gridArea:"table-of-contents",overflow:"auto"}),F=Object(a.f)(l.e).withConfig({displayName:"layout___StyledBox3",componentId:"sc-1xkoyzi-5"})({gridArea:"content"});n.a=function(e){var n=e.children,t=e.pageContext,a=e.location,o=t.frontmatter,y=o.title,E=o.description,C=o.status,A=o.source,H=o.additionalContributors,M=void 0===H?[]:H,P=N.a.getVariantRoot(a.pathname);return r.a.createElement(c.a,{components:{Index:s.a,Note:b.a,Prompt:d,PromptReply:f,Screenshot:h.a}},r.a.createElement(l.k,{flexDirection:"column",minHeight:"100vh"},r.a.createElement(m.a,{title:y,description:E}),r.a.createElement(p.b,{location:a,isSearchEnabled:t.isSearchEnabled}),r.a.createElement(x,{flex:"1 1 auto",flexDirection:"row"},r.a.createElement(l.e,{display:["none",null,null,"block"]},r.a.createElement(g.a,{editOnGitHub:t.themeOptions.editOnGitHub,location:a})),r.a.createElement(w,{id:"skip-nav",maxWidth:"100%",gridTemplateColumns:["100%",null,"minmax(0, 65ch) 220px"],gridTemplateAreas:['"heading" "content"',null,'"heading table-of-contents" "content table-of-contents"'],gridColumnGap:[null,null,6,7],gridRowGap:3,mx:"auto",p:[5,6,null,7]},r.a.createElement(_,null,r.a.createElement(l.d,{borderWidth:0,borderBottomWidth:1,borderRadius:0,pb:2},r.a.createElement(l.e,null,r.a.createElement(l.e,null,r.a.createElement(l.m,{as:"h1"},y),E))),null!=P?r.a.createElement(I,null,r.a.createElement(k,{overlay:!0,direction:"se",menuWidth:"min(30ch, 500px)",root:P,location:a})):null),t.tableOfContents.items?r.a.createElement(S,{display:["none",null,"block"],position:"sticky",top:p.a+24,mt:"6px",maxHeight:"calc(100vh - "+p.a+"px - 24px)"},r.a.createElement(l.s,{display:"inline-block",fontWeight:"bold",mb:1},"Table of contents"),r.a.createElement(v,{items:t.tableOfContents.items})):null,r.a.createElement(F,null,C||A?r.a.createElement(l.k,{mb:3,alignItems:"center"},C?r.a.createElement(j.a,{status:C}):null,r.a.createElement(l.e,{mx:"auto"}),A?r.a.createElement(O.a,{href:A}):null):null,t.tableOfContents.items?r.a.createElement(l.e,{display:["block",null,"none"],mb:3},r.a.createElement(l.h,null,(function(e){var n=e.open;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.s,{as:"summary",fontWeight:"bold"},n?r.a.createElement(l.r,{icon:i.b,mr:2}):r.a.createElement(l.r,{icon:i.c,mr:2}),"Table of contents"),r.a.createElement(l.e,{pt:1},r.a.createElement(v,{items:t.tableOfContents.items})))}))):null,n,r.a.createElement(u.a,{editOnGitHub:t.themeOptions.editOnGitHub,editUrl:t.editUrl,contributors:t.contributors.concat(M.map((function(e){return{login:e}})))}))))))}},pR70:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return o})),t.d(n,"default",(function(){return m}));var a=t("zLVn"),l=(t("q1tI"),t("7ljp")),i=t("O6H6"),o={},r={_frontmatter:o},c=i.a;function m(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(l.b)(c,Object.assign({},r,t,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h3",null,"Description"),Object(l.b)("p",null,"npm gets its config settings from the command line, environment variables,\nand ",Object(l.b)("inlineCode",{parentName:"p"},"npmrc")," files."),Object(l.b)("p",null,"The ",Object(l.b)("inlineCode",{parentName:"p"},"npm config")," command can be used to update and edit the contents of the\nuser and global npmrc files."),Object(l.b)("p",null,"For a list of available configuration options, see\n",Object(l.b)("a",{parentName:"p",href:"/cli/v8/using-npm/config"},"config"),"."),Object(l.b)("h3",null,"Files"),Object(l.b)("p",null,"The four relevant files are:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"per-project config file (/path/to/my/project/.npmrc)"),Object(l.b)("li",{parentName:"ul"},"per-user config file (~/.npmrc)"),Object(l.b)("li",{parentName:"ul"},"global config file ($PREFIX/etc/npmrc)"),Object(l.b)("li",{parentName:"ul"},"npm builtin config file (/path/to/npm/npmrc)")),Object(l.b)("p",null,"All npm config files are an ini-formatted list of ",Object(l.b)("inlineCode",{parentName:"p"},"key = value")," parameters.\nEnvironment variables can be replaced using ",Object(l.b)("inlineCode",{parentName:"p"},"${VARIABLE_NAME}"),". For\nexample:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"prefix = ${HOME}/.npm-packages\n")),Object(l.b)("p",null,"Each of these files is loaded, and config options are resolved in priority\norder.  For example, a setting in the userconfig file would override the\nsetting in the globalconfig file."),Object(l.b)("p",null,'Array values are specified by adding "[]" after the key name. For example:'),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},'key[] = "first value"\nkey[] = "second value"\n')),Object(l.b)("h4",null,"Comments"),Object(l.b)("p",null,"Lines in ",Object(l.b)("inlineCode",{parentName:"p"},".npmrc")," files are interpreted as comments when they begin with a\n",Object(l.b)("inlineCode",{parentName:"p"},";")," or ",Object(l.b)("inlineCode",{parentName:"p"},"#")," character. ",Object(l.b)("inlineCode",{parentName:"p"},".npmrc")," files are parsed by\n",Object(l.b)("a",{parentName:"p",href:"https://github.com/npm/ini"},"npm/ini"),", which specifies this comment syntax."),Object(l.b)("p",null,"For example:"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-bash"},"# last modified: 01 Jan 2016\n; Set a new registry for a scoped package\n@myscope:registry=https://mycustomregistry.example.org\n")),Object(l.b)("h4",null,"Per-project config file"),Object(l.b)("p",null,"When working locally in a project, a ",Object(l.b)("inlineCode",{parentName:"p"},".npmrc")," file in the root of the\nproject (ie, a sibling of ",Object(l.b)("inlineCode",{parentName:"p"},"node_modules")," and ",Object(l.b)("inlineCode",{parentName:"p"},"package.json"),") will set\nconfig values specific to this project."),Object(l.b)("p",null,"Note that this only applies to the root of the project that you're running\nnpm in.  It has no effect when your module is published.  For example, you\ncan't publish a module that forces itself to install globally, or in a\ndifferent location."),Object(l.b)("p",null,"Additionally, this file is not read in global mode, such as when running\n",Object(l.b)("inlineCode",{parentName:"p"},"npm install -g"),"."),Object(l.b)("h4",null,"Per-user config file"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"$HOME/.npmrc")," (or the ",Object(l.b)("inlineCode",{parentName:"p"},"userconfig")," param, if set in the environment or on\nthe command line)"),Object(l.b)("h4",null,"Global config file"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"$PREFIX/etc/npmrc")," (or the ",Object(l.b)("inlineCode",{parentName:"p"},"globalconfig")," param, if set above): This file\nis an ini-file formatted list of ",Object(l.b)("inlineCode",{parentName:"p"},"key = value")," parameters.  Environment\nvariables can be replaced as above."),Object(l.b)("h4",null,"Built-in config file"),Object(l.b)("p",null,Object(l.b)("inlineCode",{parentName:"p"},"path/to/npm/itself/npmrc")),Object(l.b)("p",null,'This is an unchangeable "builtin" configuration file that npm keeps\nconsistent across updates.  Set fields in here using the ',Object(l.b)("inlineCode",{parentName:"p"},"./configure"),"\nscript that comes with npm.  This is primarily for distribution maintainers\nto override default configs in a standard and consistent manner."),Object(l.b)("h3",null,"See also"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"/cli/v8/configuring-npm/folders"},"npm folders")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"/cli/v8/commands/npm-config"},"npm config")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"/cli/v8/using-npm/config"},"config")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"/cli/v8/configuring-npm/package-json"},"package.json")),Object(l.b)("li",{parentName:"ul"},Object(l.b)("a",{parentName:"li",href:"/cli/v8/commands/npm"},"npm"))))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---content-cli-v-8-configuring-npm-npmrc-md-bc71465a4f834c451843.js.map