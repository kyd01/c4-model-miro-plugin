!function(o){var r={};function n(e){if(r[e])return r[e].exports;var t=r[e]={i:e,l:!1,exports:{}};return o[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=o,n.c=r,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=28)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.config={appId:"3074457347038527861",baseUrl:"https://kyd01.github.io/"}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.diagramStyle={borderWidth:2,borderStyle:1,borderColor:"#000000",fontSize:12,textAlign:"l",textAlignVertical:"t"}},,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.toLowerCamelCase=function(e){var t=e.split("-").map(function(e){return e[0].toUpperCase()+e.slice(1)}).join("");return t[0].toLowerCase()+t.slice(1)}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(8),n=o(9),i=o(10),a=o(11),c=o(12),u=o(13),s=o(14),l=o(15),d=o(16);t.widgetOptions={code:r.code,component:n.component,componentDiagram:i.componentDiagram,container:a.container,containerDiagram:c.containerDiagram,context:u.context,contextDiagram:s.contextDiagram,externalContext:l.externalContext,person:d.person}},,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(0);t.getUrl=function(e){return r.config.baseUrl+e}},,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.code={text:"[Code]",style:{borderWidth:1,borderColor:"#000000",textColor:"#000000"}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.component={text:"[Component]",style:{borderWidth:1,backgroundColor:"#86bcf0",borderColor:"#70a5d8",textColor:"#000000"}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(1);t.componentDiagram={text:"[Component Diagram]",width:600,height:400,style:r.diagramStyle}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.container={text:"[Container]",style:{borderWidth:1,backgroundColor:"#438cd4",borderColor:"#3379bd",textColor:"#ffffff"}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(1);t.containerDiagram={text:"[Container Diagram]",width:600,height:400,style:r.diagramStyle}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.context={text:"[Context]",style:{borderWidth:1,backgroundColor:"#1268bd",borderColor:"#1a61a7",textColor:"#ffffff"}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(1);t.contextDiagram={text:"[Context Diagram]",width:600,height:400,style:r.diagramStyle}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.externalContext={text:"[External Context]",style:{borderWidth:1,backgroundColor:"#999999",borderColor:"#757575",textColor:"#ffffff"}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.person={text:"[Person]",style:{borderWidth:1,backgroundColor:"#7ddc73",borderColor:"#5bc150",textColor:"#000000"}}},,,,,,,,,,,,function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=o(4),r=o(6),c=o(3);o(29);var n={code:o(30),component:o(31),"component-diagram":o(32),container:o(33),"container-diagram":o(34),context:o(35),"context-diagram":o(36),"external-context":o(37),person:o(38)};function u(){this.draggableItemSelector=".c4-object"}(new(u.prototype.init=function(){var o=this,e={draggableItemSelector:this.draggableItemSelector,onClick:function(e){return o.onClick(e)},getDraggableItemPreview:function(e){return o.getDraggableItemPreview(e)},onDrop:function(e,t){return o.onDrop(e,t)}};miro.onReady(function(){return miro.board.ui.initDraggableItemsContainer(document.body,e)})},u.prototype.createWidget=function(e,t,o){var r;void 0===t&&(t=null),void 0===o&&(o=null);var n={type:"shape",x:t||0,y:o||0,metadata:(r={},r[i.config.appId]={type:e},r)};return miro.board.widgets.create(Object.assign(n,a.widgetOptions[c.toLowerCamelCase(e)]))},u.prototype.onClick=function(e){var t=e.dataset.type;this.createWidget(t)},u.prototype.getDraggableItemPreview=function(e){var t=(this.currentTarget=e).dataset.type,o=n[t];return{url:r.getUrl(o)}},u.prototype.onDrop=function(e,t){var o=this.currentTarget.dataset.type;this.createWidget(o,e,t)},u)).init()},function(e,t,o){},function(e,t,o){e.exports=o.p+"library.hotspots.code.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.component.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.component-diagram.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.container.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.container-diagram.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.context.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.context-diagram.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.external-context.svg"},function(e,t,o){e.exports=o.p+"library.hotspots.person.svg"}]);