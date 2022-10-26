"use strict";(self.webpackChunkmy_home_manager=self.webpackChunkmy_home_manager||[]).push([[721],{7288:function(n,e,t){t.d(e,{$B:function(){return l},KL:function(){return o},PH:function(){return s},TT:function(){return d},V2:function(){return c},VG:function(){return h},ZH:function(){return a},cs:function(){return u},fU:function(){return f},jd:function(){return i},oD:function(){return x}});var r=t(1610),i=(0,r.cn)({key:"editState",default:!1}),s=(0,r.cn)({key:"loginState",default:!1}),o=(0,r.cn)({key:"userState",default:!1}),c=(0,r.cn)({key:"itemPostState",default:{products:"",location:"",purchase:"",descript:"",createdAt:""}}),a=(0,r.cn)({key:"quantityState",default:0}),l=(0,r.cn)({key:"wishPostState",default:{products:"",price:0,descript:""}}),u=(0,r.cn)({key:"changedState",default:!1}),d=(0,r.cn)({key:"getItemsState",default:[]}),f=(0,r.cn)({key:"getWishState",default:[]}),x=(0,r.cn)({key:"itemCategoryState",default:[]}),h=(0,r.cn)({key:"methodCategoryState",default:[{key:0,value:"\uc628\ub77c\uc778"},{key:1,value:"\uc624\ud504\ub77c\uc778"},{key:2,value:"\uae30\ud0c0"}]})},2721:function(n,e,t){t.r(e),t.d(e,{default:function(){return B}});var r,i,s,o=t(168),c=t(885),a=t(2791),l=t(3504),u=t(7288),d=t(1610),f=t(6031),x=t(184);var h,p,m,g=function(n){var e=n.showUserInfo,t=n.clickUserInfo,r=n.showUserList,i=n.clickUserList;return(0,x.jsxs)("div",{children:[(0,x.jsx)(j,{children:"\ub9c8\uc774\ud398\uc774\uc9c0"}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(b,{onClick:function(){!1===e?(t(!e),i(!1)):t(!e)},children:"\ud68c\uc6d0\uc815\ubcf4"}),(0,x.jsx)(b,{onClick:function(){!1===r?(i(!r),t(!1)):i(!r)},children:"\ub4f1\ub85d\ud604\ud669"})]})]})},j=f.ZP.h1(r||(r=(0,o.Z)(["\n  font-size: 3rem;\n"]))),Z=f.ZP.div(i||(i=(0,o.Z)(["\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 30px;\n"]))),b=f.ZP.button(s||(s=(0,o.Z)(["\n  font-size: 18px;\n  font-weight: bold;\n  border: none;\n  background-color: #fff;\n\n  :focus {\n    border-bottom: 2px solid #cbcdd4;\n  }\n"]))),k=t(4165),y=t(5861),v=t(3108),P=t(255),S=t(6871);var U,w,I,z,C,L=function(n){var e=n.userObj,t=n.refreshUser,r=v.ON.currentUser,i=(0,S.s0)(),s=(0,a.useState)(e.displayName),o=(0,c.Z)(s,2),l=o[0],u=o[1],d=function(){var n=(0,y.Z)((0,k.Z)().mark((function n(s){return(0,k.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s.preventDefault(),e.displayName===l){n.next=7;break}return n.next=4,(0,P.ck)(r,{displayName:l});case 4:t(),alert("\uc218\uc815\uc644\ub8cc! \ud648\uc73c\ub85c \uc774\ub3d9~"),i("/");case 7:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)("label",{children:"\uc544\uc774\ub514: "}),(0,x.jsx)("span",{children:e.email})]}),(0,x.jsxs)(N,{onSubmit:d,children:[(0,x.jsx)("label",{children:"\ub2c9\ub124\uc784: "}),(0,x.jsx)("span",{children:(0,x.jsx)(T,{type:"text",placeholder:"\ub2c9\ub124\uc784\uc744 \uc785\ub825\ud558\uc138\uc694!",value:l,onChange:function(n){u(n.target.value)},maxLength:"8"})}),(0,x.jsx)("button",{children:"\ub2c9\ub124\uc784 \ubcc0\uacbd"})]})]})},O=f.ZP.div(h||(h=(0,o.Z)(["\n  align-self: flex-start;\n  font-size: 18px;\n  font-weight: bold;\n"]))),N=f.ZP.form(p||(p=(0,o.Z)(["\n  align-self: flex-start;\n  font-size: 18px;\n\n  button {\n    border: none;\n    border-radius: 5px;\n    background-color: #616365;\n    color: #fff;\n    cursor: pointer;\n\n    :hover {\n      background-color: #667078;\n    }\n  }\n"]))),T=f.ZP.input(m||(m=(0,o.Z)(["\n  border: none;\n  border-bottom: 1px solid #000;\n  margin-right: 10px;\n"])));var _,q,W,D=function(n){var e=n.userObj,t=n.getItems,r=n.getWish;return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(F,{children:[(0,x.jsxs)("h3",{children:[e.displayName," \ub4f1\ub85d \ub9ac\uc2a4\ud2b8"]}),(0,x.jsxs)(H,{children:["\uc544\uc774\ud15c: ",t.length,"\uac1c"]}),(0,x.jsxs)(J,{children:["\uc704\uc2dc: ",r.length,"\uac1c"]}),(0,x.jsxs)(V,{children:[(0,x.jsx)(A,{children:"\uc54c\ub9bc"}),t.map((function(n){return e.uid===n.creatorId?(0,x.jsx)("li",{children:n.quantity<=3?"".concat(n.name,"\uac00 ").concat(n.quantity,"\uac1c \ub0a8\uc558\uc2b5\ub2c8\ub2e4. "):""},n.id):null}))]})]})})},F=f.ZP.div(U||(U=(0,o.Z)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n"]))),H=f.ZP.h5(w||(w=(0,o.Z)(["\n  margin: 0px;\n  font-size: 16px;\n"]))),J=(0,f.ZP)(H)(I||(I=(0,o.Z)([""]))),V=(0,f.ZP)(F)(z||(z=(0,o.Z)(["\n  margin: 0px;\n  li {\n    font-size: 15px;\n  }\n"]))),A=(0,f.ZP)(H)(C||(C=(0,o.Z)([""])));var B=function(n){var e=n.refreshUser,t=n.userObj,r=(0,d.sJ)(u.TT),i=(0,d.sJ)(u.fU),s=(0,a.useState)(!1),o=(0,c.Z)(s,2),f=o[0],h=o[1],p=(0,a.useState)(!1),m=(0,c.Z)(p,2),j=m[0],Z=m[1];return(0,x.jsxs)(G,{children:[(0,x.jsx)(g,{showUserInfo:f,clickUserInfo:h,showUserList:j,clickUserList:Z}),(0,x.jsxs)(K,{children:[!1===f?null:(0,x.jsx)(L,{userObj:t,refreshUser:e}),!1===j?null:(0,x.jsx)(D,{userObj:t,getItems:r,getWish:i})]}),(0,x.jsx)(l.rU,{to:"/",children:(0,x.jsx)($,{children:"\ub4a4\ub85c\uac00\uae30"})})]})},G=f.ZP.section(_||(_=(0,o.Z)(["\n  position: fixed;\n  left: 50%;\n  top: 40%;\n  transform: translate(-50%, -50%);\n  max-height: 80%;\n  width: 20rem;\n  padding: 16px;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n"]))),K=f.ZP.div(q||(q=(0,o.Z)(["\n  width: 370px;\n  height: 150px;\n  display: flex;\n  flex-direction: column;\n"]))),$=f.ZP.button(W||(W=(0,o.Z)(["\n  border: none;\n  border-radius: 5px;\n  font-size: 18px;\n  padding: 5px 15px;\n  margin-top: 50px;\n  background-color: #616365;\n  color: #fff;\n  cursor: pointer;\n\n  :hover {\n    background-color: #667078;\n  }\n"])))}}]);
//# sourceMappingURL=721.c9a9ec43.chunk.js.map