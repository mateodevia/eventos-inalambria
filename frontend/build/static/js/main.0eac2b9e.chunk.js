(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{25:function(e,t,n){e.exports=n(59)},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},40:function(e,t,n){},58:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(23),l=n.n(c),o=n(60),i=n(5),s=(n(30),n(31),n(7));n(32);var u=Object(o.d)((function(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),c=n[0],l=n[1],o=function(){e.history.push("/reservas"),l(!c)},i=function(){e.history.push("/login")};return r.a.createElement("div",{className:"navBarContainer flexbox"},r.a.createElement("button",{onClick:function(){return l(!c)}},"\u2630"),r.a.createElement("h1",{onClick:function(){e.history.push("/"),l(!1)}},"Portal de Eventos"),r.a.createElement("div",{className:"navTitlesContainer flexbox",onClick:o},r.a.createElement("h2",{style:{textDecoration:"Reservas"===e.selected?"underline":"none"}},"Reservas")),r.a.createElement("h3",{className:"session",onClick:i},"Iniciar Session"),c&&r.a.createElement("div",{className:"mobileContainer"},r.a.createElement("div",{className:"mobileNavTitlesContainer flexbox",onClick:o},r.a.createElement("h2",{style:{textDecoration:"Reservas"===e.selected?"underline":"none"}},"Reservas")),r.a.createElement("h3",{className:"mobileSession",onClick:i},"Iniciar Session")))}));n(38),n(39);var m=Object(o.d)((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"cardContainer"},r.a.createElement("div",{className:"imageContainer"},r.a.createElement("img",{src:"https://techdator.net/wp-content/uploads/2020/03/Apple-WWDC-2020-min.jpg",alt:""})),r.a.createElement("h2",null,e.event.NOMBRE),r.a.createElement("h3",null,e.event.FECHA),r.a.createElement("h3",null,"$",e.event.PRECIO),r.a.createElement("h3",null,"Organizado por:"),r.a.createElement("h4",null,e.event.USUARIO),r.a.createElement("button",null,"RESERVAR")))})),E=(n(40),n(9)),d=n.n(E);var v=Object(o.d)((function(e){var t=Object(a.useState)([]),n=Object(s.a)(t,2),c=n[0],l=n[1];return Object(a.useEffect)((function(){d.a.get("/api/eventos").then((function(e){l(e.data)}))}),[]),r.a.createElement("div",{className:"eventsContainer flexbox"},c.map((function(e,t){return r.a.createElement(m,{key:t,event:e})})))}));var f=Object(o.d)((function(e){var t=Object(a.useRef)();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mainSection"},r.a.createElement("div",{className:"triangle"}),r.a.createElement("div",{className:"welcomeContainer"},r.a.createElement("h1",null,"\xa1Bienvenido!"),r.a.createElement("p",null,"En esto portal podr\xe1s descubrir muchos eventos para asist\xedr. Tendras la posibilidad de reservar tus entradas e incluso de organizar tus propios eventos."),r.a.createElement("button",{onClick:function(){window.scroll({left:0,top:t.current.offsetTop-60,behavior:"smooth"})}},"EXPLORAR EVENTOS"))),r.a.createElement("div",{className:"eventsSection",ref:t},r.a.createElement("div",{className:"stickyTitle"},r.a.createElement("button",{className:"addEventButton"},"Agregar Evento"),r.a.createElement("h1",null,"Eventos")),r.a.createElement(v,null)))}));n(58);var h=Object(o.d)((function(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),c=n[0],l=n[1],o=Object(a.useRef)(),i=Object(a.useRef)();return r.a.createElement("div",{className:"loginContainer flexbox"},r.a.createElement("div",{className:"loginCardContainer"},r.a.createElement("h1",null,c?"Crear Cuenta":"Iniciar Sesi\xf3n"),r.a.createElement("input",{placeholder:"Usuario",type:"text",ref:o}),r.a.createElement("input",{placeholder:"Contrase\xf1a",type:"text",ref:i}),r.a.createElement("h2",{onClick:function(){l(!c)}},c?"\xbfYa tienes Cuenta? Inicia Sesi\xf3n":"\xbfNo tienes Cuenta? Registrate"),r.a.createElement("button",{onClick:function(){}},c?"Registrarse":"Iniciar Sesi\xf3n")))}));var b=Object(o.d)((function(){return r.a.createElement("div",null,r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/login",render:function(){return r.a.createElement(h,null)}}),r.a.createElement(o.a,{exact:!0,path:"/",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(u,{selected:"Home"}),r.a.createElement(f,null))}}),r.a.createElement(o.a,{exact:!0,path:"/reservas",render:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(u,{selected:"Reservas"}),r.a.createElement("div",null,"Mis Reservas"))}})))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var p=Object(i.a)();l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.b,{history:p},r.a.createElement(b,{history:p}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[25,1,2]]]);
//# sourceMappingURL=main.0eac2b9e.chunk.js.map