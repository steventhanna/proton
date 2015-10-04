
function LiveSpellInstance($setup){livespell.spellingProviders.push(this);this.Fields="ALL";this.IgnoreAllCaps=true;this.IgnoreNumeric=true;this.CaseSensitive=true;this.CheckGrammar=true;this.Language="English (International)";this.MultiDictionary=false;this.UserInterfaceLanguage="en";this.CSSTheme="classic";this.SettingsFile="default-settings";this.ServerModel="";this.Delay=888;this.WindowMode="modal";this.Strict=true;this.ShowSummaryScreen=true;this.ShowMeanings=true;this.FormToSubmit="";this.MeaningProvider="http://www.thefreedictionary.com/{word}";this.UndoLimit=20;this.HiddenButtons="";this.CustomOpener=null;this.CustomOpenerClose=null;this.RightClickOnly=livespell.test.iPhone()?false:true;this.ShowLangInContextMenu=true;this.BypassAuthentication=false;this.UserSpellingInitiated=false;this.UserSpellingComplete=false;this.AddWordsToDictionary="USER";this.SetUserInterfaceLanguage=function(l){this.UserInterfaceLanguage=l;livespell.lang.load(l)}
this.isUniPacked=false;this.isNetSpell=false;this.FieldType=function(id){var oField=document.getElementById(id);var TYPE=oField.nodeName.toUpperCase();if(TYPE=="INPUT"||TYPE=="TEXTAREA"){return"value"}
if(TYPE=="IFRAME"){return"iframe"}
return"innerHTML";}
this.docUpdate=function(docs){var fieldIds=this.arrCleanFields();this.onUpdateFields(fieldIds);var editedfields=new Array();for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];var t=this.FieldType(id);var oField=document.getElementById(id);if(JavaScriptSpellCheck&&oField.MessageHolder){JavaScriptSpellCheck.LiveValidateMech(oField)}
if(docs[i]!==oField[t]){editedfields[editedfields.length]=id;if(t==="iframe"){var myFrame=oField;var oDoc=livespell.getIframeDocumentBasic(oField);var oBody=oDoc.body;if(oBody.innerHTML!=docs[i]){oBody.innerHTML=docs[i]};}else{if(livespell.insitu.proxyDOM(id)){oField[t]=docs[i];}else{var val=docs[i]
oField[t]=val;}}
if(t==="value"&&livespell.insitu.proxyDOM(id)){livespell.insitu.updateProxy(id);livespell.insitu.checkNow(id,this.id())}}}
if(editedfields.length>0){this.onChangeFields(editedfields);for(var i=0;i<editedfields.length;i++){livespell.context.notifyBaseFieldOnChange(editedfields[i])}}}
this.docRePaint=function(){var fieldIds=this.arrCleanFields();for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];var t=this.FieldType(id);var oField=document.getElementById(id);if(t==="value"&&livespell.insitu.proxyDOM(id)){livespell.insitu.updateProxy(id);livespell.insitu.checkNow(id,this.id())}}}
this.docFocus=function(index){var fieldIds=this.arrCleanFields();for(var i=0;i<fieldIds.length;i++){var oField=document.getElementById(fieldIds[i]);if(oField.spellcheckproxy){oField=oField.spellcheckproxy}
if(i==index){oField.className=""+oField.className+" livespell_focus_glow";oField.scrollIntoView(false);}else{oField.className=oField.className.replace(/livespell_focus_glow/g,"")}}}
this.docPickup=function(){var fieldIds=this.arrCleanFields();var docs=[]
for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];var oField=document.getElementById(id);var t=this.FieldType(id);var val;if(t==="iframe"){var oDoc=livespell.getIframeDocumentBasic(oField);val=oDoc.body.innerHTML;}else{val=oField[t];}
docs[i]=val;}
return docs;}
this.CheckInSitu=function(){this.UserSpellingInitiated=true;livespell.context.renderCss(this.CSSTheme);livespell.insitu.checkNow(this.arrCleanFields(),this.id())}
this.FieldModified=function(){try{if(this.spellWindowObject.isStillOpen()){if(!this.spellWindowObject.dialog_win.hasFocus()){this.spellWindowObject.resumeAfterEditing();}}}catch(e){}}
this.setFieldListeners=function(){var fieldIds=this.arrCleanFields();{for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];var oField=document.getElementById(id);if(!oField["livespell__listener_"+this.id()]){oField["livespell__listener_"+this.id()]=true;var ty=this;var fn=function(){ty.FieldModified();}
var t=this.FieldType(id);if(t==="value"&&livespell.insitu.proxyDOM(id)){livespell.events.add(livespell.insitu.proxyDOM(id),"blur",fn,false)}else{livespell.events.add(oField,"change",fn,false)}}}}}
this.setFormVals=function(CaseSensitive,IgnoreAllCaps,IgnoreNumeric,CheckGrammar){this.CaseSensitive=CaseSensitive;this.IgnoreAllCaps=IgnoreAllCaps;this.IgnoreNumeric=IgnoreNumeric;this.CheckGrammar=CheckGrammar;if(this.isUniPacked&&$Spelling){$Spelling.CaseSensitive=CaseSensitive
$Spelling.IgnoreAllCaps=IgnoreAllCaps
$Spelling.IgnoreNumbers=IgnoreNumeric
$Spelling.CheckGrammar=CheckGrammar}}
this.CheckInWindow=function(){var Dwidth=460;var Dheight=290;if(livespell.test.chrome()){Dwidth+=5;Dheight+=5;}
this.UserSpellingInitiated=true;this.SetUserInterfaceLanguage(this.UserInterfaceLanguage);this.onDialogOpen();var e;var webkit=livespell.test.webkit()
var canmodal=!webkit&&(!(this.BypassAuthentication&&livespell.test.IE()));if(livespell.test.IE()&&(document.domain!=document.location.hostname)){canmodal=false;}
var wm=this.WindowMode.toLowerCase();if(this.CustomOpener){return this.CustomOpener(this.url())}
if(wm.substr(0,9)=="jquery.ui"&&typeof(jQuery)&&typeof($.ui)){var dialogClass=null;if(this.WindowMode.length>10){dialogClass=this.WindowMode.substr(10)}
if(!$('#livespell_jquery_ui_modal_frame').length){$("body").append("<div id='livespell_jquery_ui_modal' style='display:overflow:hidden'><iframe width='"+Dwidth+"' height='"+Dheight+"' scrolling='no' marginwidth='0' marginheight='0' frameborder=0 id='livespell_jquery_ui_modal_frame' src='about:blank'></iframe></div>");}
var f=this
var u=this.url();var ttl=livespell.lang.fetch(this.id(),"WIN_TITLE")
var settings={autoOpen:true,modal:true,closeOnEscape:true,title:ttl,width:495,height:355,open:function(ev,ui){f["onDialogOpen"]()
$('#livespell_jquery_ui_modal_frame').attr('src',u);},close:function(){f["onDialogClose"]()}}
if(dialogClass){settings.dialogClass=dialogClass;}
$("#livespell_jquery_ui_modal").dialog(settings);return;}
if(wm=="fancybox"&&typeof(jQuery)){var uri=this.url();var ttl=livespell.lang.fetch(this.id(),"WIN_TITLE")
$.fancybox({width:Dwidth,height:Dheight,type:'iframe',href:uri,title:ttl});var f=this
var fn=function(){f["onDialogOpen"]()};setTimeout(fn,150)
return}
if(wm=="modalbox"&&typeof(Modalbox)!=="undefined"){var HTMLIframe="<iframe width='"+Dwidth+"' height='"+Dheight+"' scrolling='no' marginwidth='0' marginheight='0'  frameborder='0' src='"+this.url()+"'  ></iframe>"
Modalbox.show(HTMLIframe,{title:livespell.lang.fetch(this.id(),"WIN_TITLE"),overlayDuration:0.2,slideDownDuration:0.2,slideUpDuration:0.2});var f=this
var fn=function(){f["onDialogOpen"]()};setTimeout(fn,189)
return}
if(livespell.test.BuggyAjaxInFireFox()){Dheight=325;}else if(livespell.test.IE6()){Dheight=333;}
if(wm=="modal"&&window.showModalDialog&&canmodal){window.showModalDialog(this.url(),window,"center:1;dialogheight:"+Dheight+"px;dialogwidth:"+Dwidth+"px;resizable:0;scrollbars:0;scroll:0;location:0");}else if(wm=="modeless"&&window.showModelessDialog&&canmodal){window.showModelessDialog(this.url(),window,"center:1;dialogheight:"+Dheight+"px;dialogwidth:"+Dwidth+"px;resizable:0;scrollbars:0;scroll:0;location:0");}else{window.open(this.url(),"spelldialog","width="+Dwidth+",height="+Dheight+",scrollbars=no,resizable=no;centerscreen=yes;location=no;tolbar=no;menubar=no",false);}}
this.url=function(){var strout=livespell.installPath+"dialog.html";strout+="?instance="+this.id();return strout;}
this.m_ayt=[];this.m_ayt_timeout=null;this.m_AYTAjaxInervalHandler=function(){var fieldIds=this.m_ayt;if(!fieldIds.length){return;};for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];var oChild=E$(id)
if(oChild){var found=false;if(oChild.isCurrentAjaxImplementation!==true){oChild.isCurrentAjaxImplementation=true
found=true;}}}
if(found){this.ActivateAsYouType();}}
this.setAYTAjaxInervalHandler=function(){clearInterval(this.m_ayt_timeout);var t=this;var f=function(){t.m_AYTAjaxInervalHandler()}
setInterval(f,1000);}
this.ActivateAsYouTypeOnLoad=function(){var activeElement=null;if(document.activeElement){activeElement=document.activeElement;}
livespell.context.renderCss(this.CSSTheme);var o=this;var fn=function(){var a=o
var b=function(){a.ActivateAsYouType(activeElement)}
setTimeout(b,livespell.onLoadDelay)}
livespell.events.add(window,"load",fn,false);}
this.ActivateAsYouType=function(activeElement){if(this.isUniPacked){this.Fields=$Spelling.findf(this.Fields);}
if(livespell.test.browserNoAYT()){return;}
this.SetUserInterfaceLanguage(this.UserInterfaceLanguage);livespell.context.renderCss(this.CSSTheme);var fieldIds=this.arrCleanFields();this.AsYouTypeIsActive=true;for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];if(E$(id).nodeName.toLowerCase()=="textarea"||E$(id).nodeName.toLowerCase()=="input"&&E$(id).type=="text"){var oField=livespell.insitu.createProxy(id);if(!oField){return;}
if(activeElement&&activeElement==E$(id)){oField.focus()}
oField.setAttribute("autocheck",true);oField.autocheck=true;oField.autocheckProvider=this.id();var oChild=E$(id);oChild.isCurrentAjaxImplementation=true;this.m_ayt=livespell.array.safepush(this.m_ayt,id.replace("livespell____",""));}}
this.CheckInSitu();this.setAYTAjaxInervalHandler();}
this.AsYouTypeIsActive=false;this.PauseAsYouType=function(){fieldIds=this.arrCleanFields();for(var i=0;i<fieldIds.length;i++){var id=fieldIds[i];livespell.insitu.destroyProxy(id);this.AsYouTypeIsActive=false;}}
this.getFieldWordListMech=function(){var strDoc=this.docPickup().join(" ")
var tokens=livespell.str.tokenize(strDoc);var wordlist=[];var wasfine=true;if(!livespell.cache.spell[this.Language]){livespell.cache.spell[this.Language]=[];}
for(var i=0;i<tokens.length;i++){if(livespell.test.isword(tokens[i])===true){token=tokens[i].toString()+"";var mwm=((/[0-9]/gi.test(token)&&this.IgnoreNumeric)||((token.toUpperCase()==token)&&this.IgnoreAllCaps)||livespell.test.spelling(token,this.Language));if(!mwm===true){wasfine=false}
if(typeof(mwm)=="undefined"){if(!(token===token.toUpperCase())&&!(/[0-9]/gi.test(token))){if(!(this.IgnoreNumeric&&livespell.test.num(token))){wordlist=livespell.array.safepush(wordlist,token);}}}}}
result={}
result.wasfine=wasfine;result.wordlist=wordlist;return result}
this.AjaxValidateFields=function(){var fResults=this.getFieldWordListMech()
var wasfine=fResults.wasfine
var wordlist=fResults.wordlist
if(wordlist.length<=0){return this.onValidateMech(wasfine);}
livespell.ajax.send("APIVALIDATE",wordlist.join(livespell.str.chr(1)),this.Language,this.CaseSensitive?"CASESENSITVE":"",this.id());}
this.BinSpellCheckFields=function(){var fResults=this.getFieldWordListMech()
var wasfine=fResults.wasfine
var wordlist=fResults.wordlist
if(wordlist.length<=0){return wasfine;}
return livespell.ajax.send_sync("APIVALIDATE",wordlist.join(livespell.str.chr(1)),this.Language,this.CaseSensitive?"CASESENSITVE":"",this.id());}
this.ListDictionaries=function(){return livespell.ajax.send_sync("LISTDICTS","","","",this.id());}
this.AjaxDidYouMean=function(input){livespell.ajax.send("APIDYM",input,this.Language,"",this.id());}
this.AjaxSpellCheck=function(input,makeSuggestions){makeSuggestions=makeSuggestions!==false;var wordstocheck=input.join?input:[input];var allFound=true
for(var i=0;i<wordstocheck.length&&allFound;i++){var word=wordstocheck[i];allFound=allFound&&livespell.test.fullyCached(word,this.Language,makeSuggestions);if(!allFound){}}
if(allFound){this.onSpellCheckFromCache(input,makeSuggestions);return;}
if(input.join){input=input.join(livespell.str.chr(1))
livespell.ajax.send("APISPELLARRAY",input,this.Language,makeSuggestions?"":"NOSUGGEST",this.id());}else{livespell.ajax.send("APISPELL",input,this.Language,makeSuggestions?"":"NOSUGGEST",this.id());}};this.SpellCheckSuggest=function(input){var wordstocheck=input.join?input:[input];var allFound=true;var out=[];for(var i=0;i<wordstocheck.length&&allFound;i++){var word=wordstocheck[i];allFound=allFound&&livespell.test.fullyCached(word,this.Language,true);}
if(allFound){for(var i=0;i<wordstocheck.length&&allFound;i++){var word=wordstocheck[i];out[i]=livespell.cache.suggestions[this.Language][word]}
return input.join?out:out[0];}
livespell.ajax.needsInstantSuggestion=true;if(input.join){input=input.join(livespell.str.chr(1))
return livespell.ajax.send_sync("APISPELLARRAY",input,this.Language,"",this.id());}else{return livespell.ajax.send_sync("APISPELL",input,this.Language,"",this.id());}}
this.BinSpellCheck=function(input){var wordstocheck=input.join?input:[input];var allFound=true
for(var i=0;i<wordstocheck.length&&allFound;i++){var word=wordstocheck[i];allFound=allFound&&livespell.test.fullyCached(word,this.Language,false);if(!allFound){}}
if(allFound){var ok=true;for(var i=0;i<input.length;i++){ok=ok&&livespell.test.spelling(word,this.Language);}
return ok;}
livespell.ajax.needsInstantSuggestion=false;if(input.join){input=input.join(livespell.str.chr(1));return livespell.ajax.send_sync("APISPELLARRAY",input,this.Language,"NOSUGGEST",this.id());}else{return livespell.ajax.send_sync("APISPELL",input,this.Language,"NOSUGGEST",this.id());}};this.BinSpellCheckArray=this.BinSpellCheck;this.AjaxSpellCheckArray=function(input,makeSuggestions){this.AjaxSpellCheck(input,makeSuggestions);}
this.onSpellCheck=function(input,spelling,reason,suggestions){}
this.onDidYouMean=function(suggestion,origional){}
this.onValidateMech=function(result){this.onValidate(this.Fields,result)}
this.onSpellCheckFromCache=function(input,makeSuggestions){var isArray=input.join;if(!isArray){input=[input];}
var outInput=input;var outSpellingOk=[]
var outSuggestions=[]
var outReason=[]
for(var i=0;i<input.length;i++){var word=input[i]
outSpellingOk[i]=livespell.test.spelling(word,this.Language);outReason[i]=outSpellingOk[i]?"-":livespell.cache.reason[this.Language][word];outSuggestions[i]=makeSuggestions?livespell.cache.suggestions[this.Language][word]:[];}
if(isArray){this.onSpellCheck(outInput,outSpellingOk,outReason,outSuggestions)}else{this.onSpellCheck(outInput[0],outSpellingOk[0],outReason[0],outSuggestions[0])}}
this.arrCleanFields=function(){var F=this.Fields;var isString=F.split;if(isString){F=F.replace(/\s/g,"").split(",");}
var out=new Array;for(var j=0;j<F.length;j++){var oid=F[j];var fieldok=true;var AF;var i;var found=false;if(oid.toUpperCase()==="ALL"||oid.toUpperCase()==="ENABLED"){found=true;AF=document.body.getElementsByTagName("*");for(i=0;i<AF.length;i++){var nn=AF[i].nodeName.toLowerCase();if(nn=="textarea"){if(livespell.insitu.filterTextAreas(AF[i])){if(oid.toUpperCase()==="ALL"||!(AF[i].disabled||AF[i].readOnly)){out=livespell.array.safepush(out,AF[i]);found=true;}}}
if(nn=="input"){if(livespell.insitu.filterTextInputs(AF[i])){if(oid.toUpperCase()==="ALL"||!(AF[i].disabled||AF[i].readOnly)){out=livespell.array.safepush(out,AF[i]);found=true;}}}
if(nn=="div"||nn=="iframe"){if(livespell.insitu.filerEditors(AF[i])){if(oid.toUpperCase()==="ALL"||!(AF[i].disabled||AF[i].readOnly)){out=livespell.array.safepush(out,AF[i]);found=true;}}}}}
if(oid.toUpperCase()==="TEXTAREAS"){found=true;AF=document.getElementsByTagName("textarea")
for(i=0;i<AF.length;i++){if(livespell.insitu.filterTextAreas(AF[i])){found=true;out=livespell.array.safepush(out,AF[i]);}}}else if(oid.toUpperCase()==="TEXTINPUTS"){found=true;AF=document.getElementsByTagName("input");for(i=0;i<AF.length;i++){if(livespell.insitu.filterTextInputs(AF[i])){found=true;out=livespell.array.safepush(out,AF[i]);}}}else if(oid.toUpperCase()==="EDITORS"){found=true;AF=document.getElementsByTagName("iframe");for(i=0;i<AF.length;i++){if(livespell.insitu.filerEditors(AF[i])){out=livespell.array.safepush(out,AF[i]);found=true;}}
AF=document.getElementsByTagName("div");for(i=0;i<AF.length;i++){if(livespell.insitu.filerEditors(AF[i])){out=livespell.array.safepush(out,AF[i]);found=true;}}}else if(oid.toUpperCase().split(":").length===2&&oid.toUpperCase().split(":")[0]=="IFRAME"){var e;var frameindex=Number(oid.split(":")[1]);if(frameindex<document.getElementsByTagName("iframe").length){myFrame=document.getElementsByTagName("iframe")[frameindex]
if(!myFrame.id){myFrame.id="livespell_IFRAME_id_"+frameindex}
out=livespell.array.safepush(out,myFrame.id);found=true;}}else if(E$(oid)){out=livespell.array.safepush(out,E$(oid));found=true;}else if(document.querySelectorAll){var q=document.querySelectorAll(oid);for(var iq=0;iq<q.length;q++){found=true;if(!q[iq].id){q[iq].id="livespell_css_selected_id_"+i}
found=true;out=livespell.array.safepush(out,q[iq]);}}else if(oid.charAt(0)=="."&&!E$(oid)){var cname=oid.substring(1);var AF=livespell.getElementsByClass(cname);for(i=0;i<AF.length;i++){var oFieldByClass=AF[i];if(!oFieldByClass.id){oFieldByClass.id="livespell_CLASSSECTOR_id_"+cname+"_"+i}
out=livespell.array.safepush(out,oFieldByClass.id);found=true;}}
if(!found){if(document.getElementById(oid)){var liveChilren=livespell.insitu.findLiveChildrenInDOMElement(document.getElementById(oid));if(liveChilren.length){out=livespell.array.safepush(out,liveChilren);}else{out=livespell.array.safepush(out,oid);}}else if(oid.id){out=livespell.array.safepush(out,oid);}else if(oid.name){oid.id="livespell____"+oid.name;out=livespell.array.safepush(out,"livespell____"+oid.name);}else if(document.getElementsByName(oid).length==1){document.getElementsByName(oid)[0].id="livespell____"+oid;out=livespell.array.safepush(out,"livespell____"+oid);}}}
for(var i=0;i<out.length;i++){out[i]=out[i].id}
return out;}
this.id=function(){for(var i=0;i<livespell.spellingProviders.length;i++){if(this===livespell.spellingProviders[i]){return i}}}
this.recieveWindowSpell=function(){try{this.spellWindowObject.nextSuggestionChunk()}catch(e){}}
this.recieveWindowSetup=function(){this.spellWindowObject.ui.setupLanguageMenu();this.spellWindowObject.nextSuggestionChunk();this.spellWindowObject.moveNext();};this.recieveContextSpell=function(){var myFields=this.arrCleanFields();for(var i=0;i<myFields.length;i++){livespell.insitu.renderProxy(myFields[i],this.id())}}
this.SpellButton=function(insitu,text,Class,style){if(!insitu){insitu=false};if(!text){text="Spell Check"};if(!Class){Class="";};if(!style){style="";};var holder=document.createElement("span");var o=document.createElement("input");o.setAttribute("type","button");o.type="button";o.setAttribute("value",text);o.value=text;o.setAttribute("Class",Class);o.className=Class;o.setAttribute("style",style);if(insitu){o.setAttribute("onclick"," livespell.spellingProviders["+this.id()+"].CheckInSitu()");}else{o.setAttribute("onclick"," livespell.spellingProviders["+this.id()+"].CheckInWindow()");}
holder.appendChild(o);return(holder.innerHTML)}
this.SpellLink=function(insitu,text,Class,style){if(!insitu){insitu=false};if(!text){text="Spell Check"};if(!Class){Class="";};if(!style){style="";};var holder=document.createElement("span");var o=document.createElement("a");o.innerHTML=text;if(insitu){o.setAttribute("href","javascript:livespell.spellingProviders["+this.id()+"].CheckInSitu()");}else{o.setAttribute("href","javascript:livespell.spellingProviders["+this.id()+"].CheckInWindow()");}
o.setAttribute("Class",Class);o.className=Class;o.setAttribute("style",style);holder.appendChild(o);return(holder.innerHTML)}
this.SpellImageButton=function(insitu,image,rollover,text,Class,style){if(!insitu){insitu=false};if(!text){text="Spell Check"};if(!Class){Class="";};if(!image){image="themes/buttons/spellicon.gif";rollover="themes/buttons/spelliconover.gif"};if(!style){style="";};var holder=document.createElement("span");var o=document.createElement("img");o.setAttribute("alt",text);o.alt=text;o.setAttribute("src",livespell.installPath+image);o.src=livespell.installPath+image;o.setAttribute("border","0");o.setAttribute("onmouseover","this.src='"+livespell.installPath+rollover+"'");if(rollover){o.setAttribute("onmouseout","this.src='"+livespell.installPath+image+"'");}
if(insitu){o.setAttribute("onclick","livespell.spellingProviders["+this.id()+"].CheckInSitu()");}else{o.setAttribute("onclick","livespell.spellingProviders["+this.id()+"].CheckInWindow()");}
o.setAttribute("Class",Class);o.className=Class;o.setAttribute("style","cursor:pointer; "+style);holder.appendChild(o);return(holder.innerHTML)}
this.DrawSpellImageButton=function(insitu,image,rollover,text,Class,style){livespell.context.renderCss(this.CSSTheme);document.write(this.SpellImageButton(insitu,image,rollover,text,Class,style));}
this.DrawSpellLink=function(insitu,text,Class,style){livespell.context.renderCss(this.CSSTheme);document.writeln(this.SpellLink(insitu,text,Class,style))}
this.DrawSpellButton=function(insitu,text,Class,style){livespell.context.renderCss(this.CSSTheme);document.writeln(this.SpellButton(insitu,text,Class,style))}
this.__SubmitForm=function(){if(!this.FormToSubmit.length){return;};var e;try{E$(this.FormToSubmit).submit()}catch(e){}};this.onDialogCompleteNET=function(){if(this.UniqueIDNetPostBack!=""){if(window.__doPostBack){window.__doPostBack(this.UniqueIDNetPostBack,this.UniqueIDNetPostBack);}}};this.UniqueIDNetPostBack="";this.onDialogOpen=function(){};this.onDialogComplete=function(){};this.onDialogCancel=function(){};this.onDialogClose=function(){};this.onChangeLanguage=function(Language){};this.onIgnore=function(Word){};this.onIgnoreAll=function(Word){};this.onChangeWord=function(From,To){};this.onChangeAll=function(From,To){};this.onLearnWord=function(Word){};this.onLearnAutoCorrect=function(From,To){};this.onUpdateFields=function(arrFieldIds){};this.onChangeFields=function(changedFields){}}
function JavaScriptSpellCheckObj($setup){this.DefaultDictionary="English (International)";this.UserInterfaceTranslation="en";this.ShowStatisticsScreen=false;this.SubmitFormById="";this.Theme="modern";this.CaseSensitive=true;this.CheckGrammar=true;this.IgnoreAllCaps=true;this.IgnoreNumbers=true;this.ShowThesaurus=true;this.ShowLanguagesInContextMenu=false;this.ServerModel="auto";this.PopUpStyle="modal";this.isUniPacked=true;this.AddWordsToDictionary='user';this.SpellCheckInWindow=function(Fields){var o=this.createInstance(Fields,arguments);o.CheckInWindow();return o;}
this.SpellCheckAsYouType=function(Fields){var o=this.createInstance(Fields,arguments);if(document.readyState&&document.readyState.toLowerCase()!=="complete"){o.Fields=Fields;o.ActivateAsYouTypeOnLoad();}else{o.ActivateAsYouType();}
return o;x}
this.ManageFields=function(Fields){return Fields}
this.$validators=[];this.ajaxinstance=null;this.initAJAX=function(){if(!this.ajaxinstance){var o=this.createInstance();this.ajaxinstance=o;}else{var o=this.manageAjaxInstance();}
return o;}
this.AjaxSpellCheck=function(word){var o=this.initAJAX()
setTimeout(function(){o.AjaxSpellCheck(word,true);},1);return o}
this.BinSpellCheck=function(input){var o=this.initAJAX()
return o.BinSpellCheck(input)}
this.BinSpellCheckArray=this.BinSpellCheck;this.SpellCheckSuggest=function(input){var o=this.initAJAX()
return o.SpellCheckSuggest(input)}
this.BinSpellCheckFields=function(Fields){var o=this.createInstance(Fields,arguments);result=o.BinSpellCheckFields()
return result;}
this.ListDictionaries=function(){var o=this.initAJAX()
result=o.ListDictionaries()
return result;}
this.AjaxDidYouMean=function(string){if(!this.ajaxinstance){var o=this.createInstance();this.ajaxinstance=o;}else{var o=this.manageAjaxInstance();}
setTimeout(function(){o.AjaxDidYouMean(string);},1);this.ajaxinstance=o
return o}
this.AjaxValidateFields=function(Fields){var o=this.createInstance(Fields,arguments);setTimeout(function(){o.AjaxValidateFields();},1);return o}
this.LiveFormValidation=function(Fields,MessageHolder){var j=this;var f=Fields;var m=MessageHolder;var fn=function(){j.LiveFormValidation(f,m)}
if(document.readyState&&document.readyState.toLowerCase()!=="complete"){livespell.events.add(window,"load",fn,false);return;}else{var fn=function(){JavaScriptSpellCheck.LiveValidate(f,m)}
livespell.events.add(window,"load",fn,false);}
f=this.findf(Fields);ff=f.split(",");for(var i=0;i<ff.length;i++){var oneField=ff[i];var oField=document.getElementById(oneField);if(oField){oField.setAttribute("isValidated",true);oField.MessageHolder=MessageHolder;if(typeof(MessageHolder)=="string"){MessageHolder=document.getElementById(MessageHolder);}
if(!MessageHolder||!MessageHolder.id){}else{MessageHolder.style.display="none";}
livespell.events.add(oField,"keyup",this.validatortypoclick,false);JavaScriptSpellCheck.$validators=livespell.array.safepush(JavaScriptSpellCheck.$validators,oField);JavaScriptSpellCheck.LiveValidateMech(oField)}}}
this.LiveFormValidationCheck=function(){var myValid=true;for(var i=0;i<JavaScriptSpellCheck.$validators.length;i++){var vld=JavaScriptSpellCheck.$validators[i].getAttribute("isValidated");if(vld==='false'||vld===false){return false;}}
return myValid;}
this.validatortypoclick=function(event){var returnfalse=false;try{if(!event){event=window.event;}}catch(e){}
var ch8r=event.keyCode;if(((ch8r>15&&ch8r<32)||(ch8r>32&&ch8r<41))&&(ch8r!=127)){return;}
var me=event.srcElement?event.srcElement:this;clearTimeout(livespell.cache.checkTimeoutUni)
livespell.cache.checkTimeoutUni=setTimeout(function(){JavaScriptSpellCheck.LiveValidateMech(me)},567)}
this.LiveValidateMech4Proxy=function(oField,result){var MessageHolder=oField.MessageHolder;if(typeof(MessageHolder)=="string"){MessageHolder=document.getElementById(MessageHolder);}
if(!MessageHolder||!MessageHolder.id){return false;}
MessageHolder.style.display=result?"none":"inherit";oField.setAttribute("isValidated",result);}
this.LiveValidateMech=function(oField){var o=this.createInstance(oField);setTimeout(function(){o.AjaxValidateFields();},1);o.onValidate=function(Fields,result){var oneField=Fields.split(",")[0];var oField=document.getElementById(oneField);var MessageHolder=oField.MessageHolder;if(typeof(MessageHolder)=="string"){MessageHolder=document.getElementById(MessageHolder);}
if(!MessageHolder||!MessageHolder.id){return false;}
MessageHolder.style.display=result?"none":"inherit";oField.setAttribute("isValidated",result);}}
this.vhcounter=0;this.findcounter=0;;this.findf=function(Fields,PassedArgs){if(!Fields){return"ALL"}
var inputs=[];var outputs=[];if(!PassedArgs){inputs=[];inputs[0]=Fields;}else{inputs=PassedArgs}
for(var i=0;i<inputs.length;i++){var f=inputs[i];var ff
if(f.push){ff=f;}else if(f.split){ff=f.split(",")}else{ff=[];ff[0]=f}
for(var j=0;j<ff.length;j++){var finderItem=ff[j];var oObject=null;var binWasMacro=false;if(typeof Fields==='string'){var td=Fields;var tdcase=Fields.replace(/\s\s*$/,'');var td=Fields.toUpperCase().replace(/\s\s*$/,'');if(td==="ALL"||td==="EDITORS"||td==="TEXTAREAS"||td==="TEXTINPUTS"){outputs.push(td);binWasMacro=true;}
if(td.charAt(0)==="."){outputs.push(tdcase);binWasMacro=true;}}
if(!binWasMacro){if(finderItem.nodeName){oObject=finderItem;}else{finderItem=finderItem.toString().replace(/^\s\s*/,'');if(document.getElementById(finderItem)){oObject=document.getElementById(finderItem);}else{var byName=document.getElementsByName(finderItem);if(byName&&byName.length>0){oObject=byName[0]}}}}
if(oObject){if(!oObject.id){oObject.id="jsspellcheck__element__"+(this.findcounter);this.findcounter++;}
outputs.push(oObject.id)}}}
return outputs.join(",")}
this.manageAjaxInstance=function(){var o=this.ajaxinstance;o.isUniPacked=true;o.Language=this.DefaultDictionary;o.UserInterfaceLanguage=this.UserInterfaceTranslation;o.IgnoreAllCaps=this.IgnoreAllCaps;o.IgnoreNumeric=this.IgnoreNumbers;o.CSSTheme=this.Theme;o.WindowMode=this.PopUpStyle;o.FormToSubmit=this.SubmitFormById;o.ShowSummaryScreen=this.ShowStatisticsScreen;o.ShowMeanings=this.ShowThesaurus;o.ServerModel=this.ServerModel;return o;}
this.createInstance=function(Fields,PassedArgs){var o=new LiveSpellInstance();o.isUniPacked=true;o.Language=this.DefaultDictionary;o.UserInterfaceLanguage=this.UserInterfaceTranslation;Fields=this.findf(Fields,PassedArgs)
o.Fields=this.ManageFields(Fields);o.IgnoreAllCaps=this.IgnoreAllCaps;o.IgnoreNumeric=this.IgnoreNumbers;o.WindowMode=this.PopUpStyle;o.CSSTheme=this.Theme;o.FormToSubmit=this.SubmitFormById;o.ShowSummaryScreen=this.ShowStatisticsScreen;o.ShowMeanings=this.ShowThesaurus;o.AddWordsToDictionary=this.AddWordsToDictionary;o.ShowMeanings=this.ShowThesaurus;o.ShowLangInContextMenu=this.ShowLanguagesInContextMenu;o.ServerModel=this.ServerModel;o.CaseSensitive=this.CaseSensitive;o.CheckGrammar=this.CheckGrammar;return o;}}
function E$(id){return document.getElementById(id);}
function setup___livespell(){var tags=document.getElementsByTagName('script');var foundTag=null;for(var i=tags.length-1;i>=0&&!foundTag;i--){var thisTag=tags[i];try{if(thisTag.getAttribute("src").toLowerCase().indexOf("include.js")>-1&&(thisTag.getAttribute("src").toLowerCase().indexOf("aspnetspell")>-1||thisTag.getAttribute("src").toLowerCase().indexOf("spellcheck/")>-1)){foundTag=thisTag;}}catch(e){}}
for(var i=tags.length-1;i>=0&&!foundTag;i--){var thisTag=tags[i];try{if(thisTag.getAttribute("src").toLowerCase().indexOf("include.js")>-1){foundTag=thisTag;}}catch(e){}}
if(!foundTag){foundTag=tags[tags.length-1];;}
if(typeof(window['livespell___installPath'])!="undefined"){path=livespell___installPath}else{try{var path=foundTag.getAttribute("src").replace(/[\/]?include\.js/ig,"")+"/";}catch(e){alert("SpellCheck include.js file not found:\n\n  Try setting livespell___installPath = '/MySpellCheckIncludePath/'; in your documet header.")};}
path=path.split("?")[0]
if(path.substring(path.length-1)!=="/"){path+="/";}
if(path=="/"){path=""}
if(path!="/"&&path!=""&&path&&!livespell.installPath){livespell.installPath=path;livespell.lang.load("en");}else{livespell.lang.load("en");}
var inJS=(livespell.installPath.toLowerCase().indexOf("javascriptspellcheck")>-1||(document.location.href+"").toLowerCase().indexOf("javascriptspellcheck")>-1)
if(inJS){var fn=function(){livespell.context.renderCss($Spelling.Theme);}
livespell.events.add(window,"load",fn,false);}
if(livespell.test.IE5()||livespell.test.IE6()||livespell.test.IE7()||livespell.test.IE8()){setInterval(livespell.heartbeat,1200)}else{setInterval(livespell.heartbeat,500)}
if(!window.getComputedStyle){document.write("<scr"+'ipt type="text/vbscript">\nsub document_oncontextmenu() \n on error resume next \ndim Oelement   \n  Set   Oelement = window.event.srcElement \n  IF(   (Oelement.className="livespell_redwiggle" OR Oelement.className="livespell_greenwiggle")) THEN \n   window.event.returnValue = false   \n     window.event.cancelBubble = true\n END IF \n end sub\n </scr'+"ipt>");}
if(livespell.test.MAC()){livespell.events.add(document,"keydown",livespell.context.mackeydown,false)
livespell.events.add(document,"keyup",livespell.context.mackeyup,false)}}
function livespell___FF__clickmanager(e){if(e.which&&e.which==3){if(!e||!e.originalTarget){return;}
var t=(e.originalTarget);try{if(t&&t.className&&(t.className=="livespell_redwiggle"||t.className=="livespell_greenwiggle")){e.preventDefault();}}catch(e){}
try{t=(e.target);if(t&&t.className&&(t.className=="livespell_redwiggle"||t.className=="livespell_greenwiggle")){e.preventDefault();}}catch(e){}}}
if(typeof(JavaScriptSpellCheck)=="undefined"||!JavaScriptSpellCheck){var JavaScriptSpellCheck=new JavaScriptSpellCheckObj()
var $Spelling=JavaScriptSpellCheck;var $spelling=JavaScriptSpellCheck;}
if(typeof(livespell)=="undefined"){var livespell={version:"5.2.180314",isactiveX:false,degradeToIframe:true,rubberRingServerModel:"",callerspan:null,liveProxys:[],installPath:"",spellingProviders:[],addedJsFiles:[],maxURI:999,onLoadDelay:50,getElementsByClass:function(className){var thanksto="KorRedDevil";var hasClassName=new RegExp("(?:^|\\s)"+className+"(?:$|\\s)");var allElements=document.getElementsByTagName("*");var results=[];var element;for(var i=0;i<allElements.length;i++){element=allElements[i];var elementClass="";if(typeof(element.className)!="undefined"){var elementClass=element.className.toString();}
if(elementClass&&hasClassName&&className&&elementClass.indexOf(className)!=-1&&hasClassName.test(elementClass)){results.push(element);}}
return results;},setrubberRingServerModel:function(){if(!(livespell.spellingProviders[0]&&livespell.spellingProviders[0].isUniPacked)){return false;}
var mode=""
if(this.testSyncRequest(livespell.installPath+"core/Default.aspx")){mode="aspx";}else if(this.testSyncRequest(livespell.installPath+"core/Default.ashx")){mode="asp.net";}else if(this.testSyncRequest(livespell.installPath+"core/index.php")){mode="php";}else if(this.testSyncRequest(livespell.installPath+"core/default.asp")){mode="asp";}else{if(typeof(window['LIVESPELL_DEBUG_MODE'])!="undefined"){livespell.ajax.debug("SpellCheck Cannot Connect to a Server!",false)}else{throw("SpellCheck Cannot Connect to a Server!");}
return;}
livespell.ajax.debug("<h1>Spell Check Server Mode Detected & Changed to "+mode.toUpperCase()+"</h1>",false)
livespell.rubberRingServerModel=mode;return mode;},setUniServerModel:this.setrubberRingServerModel,ajaxClient:function(sync){var xhr=false;try{xhr=new XMLHttpRequest();if(xhr){return xhr}}catch(e){}
if(livespell.degradeToIframe&&!sync){return false}
try{xhr=new ActiveXObject('Microsoft.XMLHTTP');if(xhr){livespell.isactiveX=true;return xhr}}catch(e2){try{xhr=new ActiveXObject('Msxml2.XMLHTTP');if(xhr){livespell.isactiveX=true;return xhr}}catch(e3){return false;}}
return false;},testSyncRequest:function(posturl){var hasajax=false;var xhr=livespell.ajaxClient(true);if(posturl.indexOf("html")>-1){xhr.open("GET",posturl,false);xhr.send();}else{var params="test=true"
xhr.open("GET",posturl+"?"+params,false);xhr.send();}
if(xhr.status==200){if(typeof(window['LIVESPELL_DEBUG_MODE'])!="undefined"){livespell.ajax.debug("SERVER ERROR:"+xhr.responseText,false)}
return xhr.responseText.toLowerCase().replace(/^\s\s*/,'').replace(/\s\s*$/,'')=="no command";}
if(typeof(window['LIVESPELL_DEBUG_MODE'])!="undefined"){livespell.ajax.debug("SERVER CANNOT WORK:"+xhr.responseText,false)}
return false},addJs:function(js){if(livespell.addedJsFiles[js]==true){return}
livespell.addedJsFiles[js]=true
var Scr=document.createElement('SCRIPT');Scr.src=js;Scr.type='text/javascript';document.getElementsByTagName('HEAD')[0].appendChild(Scr);},inlineblock:function(){var webkit=livespell.test.webkit();if(webkit){return"block";}
return window.getComputedStyle?"inline-block":"inline";},heartbeat:function(){var id;var DesiredActive=new Array();for(var p=0;p<livespell.spellingProviders.length;p++){var provider=livespell.spellingProviders[p];if(provider.AsYouTypeIsActive){var flist=provider.arrCleanFields();for(var f=0;f<flist.length;f++){id=flist[f];DesiredActive=livespell.array.safepush(DesiredActive,id);if(document.getElementById(id).nodeName.toLowerCase()=="textarea"&&!document.getElementById(id+livespell.insitu._FIELDSUFFIX)){provider.ActivateAsYouType();}else{var oProx=document.getElementById(id+livespell.insitu._FIELDSUFFIX)
if(oProx){var obase=document.getElementById(id)
if(obase.readOnly!=oProx.readOnly||obase.disabled!=oProx.disabled){livespell.insitu.destroyProxy(id);provider.ActivateAsYouType()}}
livespell.insitu.safeUpdateProxy(id,p)}}}}
var divs=document.getElementsByTagName("div");for(var i=0;i<divs.length;i++){var thisdiv=divs[i];if(thisdiv.isLiveSpellProxy&&thisdiv.id){var shouldBeThere=false
id=thisdiv.id.replace(livespell.insitu._FIELDSUFFIX,"")
for(var j=0;j<DesiredActive.length&&!shouldBeThere;j++){if(DesiredActive[j]==id){shouldBeThere=true}}
if(!shouldBeThere){livespell.insitu.destroyProxy(id);}}}},getIframeDocumentBasic:function(myFrame){var oDoc;var oFrameWin;if(myFrame.src.indexOf("fckeditor.html")>0){if(myFrame.contentWindow){oDoc=myFrame.contentWindow.frames[0].document}else if(myFrame.contentDocument){oDoc=myFrame.frames[0].contentDocument;}else{return null;}
return oDoc;}
if(myFrame.contentWindow){oDoc=myFrame.contentWindow.document;}else if(myFrame.contentDocument){oDoc=myFrame.contentDocument;}else{return null;}
return oDoc;return null;},getIframeDocument:function(myFrame){var oDoc,oBody;var isEditable;try{if(myFrame.contentWindow){oDoc=myFrame.contentWindow.document;}else if(myFrame.contentDocument){oDoc=myFrame.contentDocument;}else{return null}
if(myFrame.src=='javascript:"<html></html>"'){return oDoc}
if(myFrame.src.toLowerCase().indexOf('javascript:')>-1){return oDoc}
oHTML=oDoc.getElementsByTagName("html")[0];try{isEditable=oHTML.contentEditable==="true"||oHTML.contentEditable===true||oHTML.designMode=='on'||oHTML.designMode=='On'||oHTML.designMode=='ON'||oHTML.designMode===true||oHTML.designMode==="true"||oHTML.contentEditable===true||oHTML.designMode=='on'||oHTML.designMode===true||oHTML.designMode==="true";if(isEditable){return oDoc}}catch(e){}
oBody=oDoc.body;isEditable=oBody.contentEditable==="true"||oBody.contentEditable===true||oBody.designMode=='on'||oBody.designMode=='On'||oBody.designMode=='ON'||oBody.designMode===true||oBody.designMode==="true"||oDoc.contentEditable===true||oDoc.designMode=='on'||oDoc.designMode===true||oDoc.designMode==="true";if(isEditable){return oDoc}
var ofsrc=myFrame.src;myFrame=myFrame.contentWindow?myFrame.contentWindow:myFrame;if(myFrame.frames.length){var oSubDoc;for(var i=0;i<myFrame.frames.length;i++){var mySubFrame=myFrame.frames[i];oSubDoc=mySubFrame.contentDocument?mySubFrame.contentDocument:mySubFrame.document;if(mySubFrame.contentDocument){oSubDoc=mySubFrame.contentDocument;}else if(mySubFrame.contentWindow){oSubDoc=mySubFrame.contentWindow.document;}
oBody=oSubDoc.body;if(ofsrc.indexOf("fckeditor.html")>0){return oBody}
isEditable=oBody.spellcheck==="false"||oBody.spellcheck===false||oBody.contentEditable==="true"||oBody.contentEditable===true||oBody.designMode=='on'||oBody.designMode=='On'||oBody.designMode=='ON'||oBody.designMode===true||oBody.designMode==="true"||oDoc.contentEditable===true||oDoc.designMode=='on'||oDoc.designMode===true||oDoc.designMode==="true";if(isEditable){return oSubDoc}}
isEditable=oBody.spellcheck==="false"||oBody.spellcheck===false;if(isEditable){return oDoc}}}catch(e){}
return null;},lang:{fetch:function(providerID,index){var lang=livespell.spellingProviders[providerID].UserInterfaceLanguage;try{return this[lang][this[index]];}catch(e){try{return this["en"][this[index]];}catch(e){return index;}}},load:function(lang){var idname="__livespell__translations__"+lang;var fileref=E$(idname)
if(fileref){}else{fileref=document.createElement("script");fileref.setAttribute("id",idname);fileref.id=idname;fileref.setAttribute("charset","utf-8");fileref.setAttribute("type","text/javascript");fileref.setAttribute("src",livespell.installPath+"translations/"+lang+".js");document.getElementsByTagName("head")[0].appendChild(fileref);}},BTN_ADD_TO_DICT:0,BTN_AUTO_CORECT:1,BTN_CANCEL:2,BTN_CHANGE:3,BTN_CHANGE_ALL:4,BTN_CLEAR_EDIT:5,BTN_CLOSE:6,BTN_IGNORE_ALL:7,BTN_IGNORE_ONCE:8,BTN_OK:9,BTN_OPTIONS:10,BTN_RESET:11,BTN_UNDO:12,DONESCREEN_EDITS:13,DONESCREEN_FIELDS:14,DONESCREEN_MESSAGE:15,DONESCREEN_WORDS:16,LABEL_LANGAUGE:17,LABEL_SUGGESTIONS:18,LANGUAGE_MULTIPLE:19,LANGUAGE_MULTIPLE_INSTRUCTIONS:20,LOOKUP_MEANING:21,MENU_APPLY:22,MENU_CANCEL:23,MENU_DELETEBANNED:24,MENU_DELETEREPEATED:25,MENU_IGNORE:26,MENU_IGNOREALL:27,MENU_LANGUAGES:28,MENU_LEARN:29,MENU_NOSUGGESTIONS:30,OPT_CASE_SENSITIVE:31,OPT_ENTRIES:32,OPT_IGNORE_CAPS:33,OPT_IGNORE_NUMERIC:34,OPT_PERSONAL_AUTO_CURRECT:35,OPT_PERSONAL_DICT:36,OPT_SENTENCE_AWARE:37,REASON_BANNED:38,REASON_CASE:39,REASON_ENFORCED:40,REASON_GRAMMAR:41,REASON_REPEATED:42,REASON_SPELLING:43,SUGGESTIONS_DELETE_REPEATED:44,SUGGESTIONS_NONE:45,USRBTN_SPELL_CHECK:46,WIN_TITLE:47},constants:{_IFRAME:"livespell___ajax_frame",_AJAXFORM:"livespell___ajax_form"},ajax:{renderIframe:function(postURL){if(E$(livespell.constants._IFRAME)){return;}
var n=document.createElement("span");n.innerHTML="<iframe id='"+livespell.constants._IFRAME+"'style=display:none;visibility:hidden;width:1px;height:1px;'  src='about:blank' name='"+livespell.constants._IFRAME+"' ></iframe>"
document.body.appendChild(n);},resend:function(){if(livespell.isactiveX==true&&livespell.test.IE()){livespell.degradeToIframe=true;}
livespell.ajax.send(livespell.cache.ajaxrequest.cmd,livespell.cache.ajaxrequest.args,livespell.cache.ajaxrequest.lan,livespell.cache.ajaxrequest.note,livespell.cache.ajaxrequest.sender);},sendcount:0,send:function(cmd,args,lan,note,sender){this.sendcount++;livespell.cache.ajaxrequest={};livespell.cache.ajaxrequest.cmd=cmd;livespell.cache.ajaxrequest.args=args;livespell.cache.ajaxrequest.lan=lan;livespell.cache.ajaxrequest.note=note;livespell.cache.ajaxrequest.sender=sender;var oSender=livespell.spellingProviders[sender];var serverModel=oSender.ServerModel.toLowerCase()
if(livespell.rubberRingServerModel!==""){serverModel=livespell.rubberRingServerModel}
var posturl=livespell.installPath+"core/"
if(serverModel==="asp.net"){posturl+="default.ashx"}else if(serverModel==="aspx"){posturl+="Default.aspx"}else if(serverModel==="asp"){posturl+="default.asp"}else if(serverModel==="php"){posturl+="index.php"}else if(serverModel==="auto"||serverModel===""){posturl+=""}else if(serverModel!==""){posturl+="index."+serverModel}else{throw('livespell::SeverModel not recognized: '+serverModel)}
var settingsfile=livespell.spellingProviders[sender].SettingsFile;var hasajax=false;var xhr=false;if(!(oSender.BypassAuthentication&&livespell.test.IE())){xhr=livespell.ajaxClient(false);}
if(xhr){hasajax=true};try{args=encodeURIComponent(args);}catch(e){args=escape(args);}
try{lan=encodeURIComponent(lan);}catch(e){lan=escape(lan);}
try{settingsfile=encodeURIComponent(settingsfile);}catch(e){settingsfile=escape(settingsfile);}
try{note=encodeURIComponent(note);}catch(e){note=escape(note);}
try{sender=encodeURIComponent(sender);}catch(e){sender=escape(sender);}
var params='';params+="note="+(note);params+="&command="+(cmd);params+="&args="+(args);params+="&lan="+(lan);params+="&sender="+(sender);params+="&settingsfile="+(settingsfile);if(hasajax){var liveSpellAjaxCallbackhandler=function(){if(xhr.readyState==4){if(xhr.status==200){livespell.ajax.pickup(xhr.responseText,false);}else{if(livespell.rubberRingServerModel!=livespell.setrubberRingServerModel()){livespell.ajax.resend()}
if(typeof(window['LIVESPELL_DEBUG_MODE'])!="undefined"){try{if(xhr.responseText.length){livespell.ajax.debug("SERVER ERROR:"+xhr.responseText,false)}else{livespell.ajax.debug("SERVER ERROR - Please view this page in a browser other than IE for full details",false)}}catch(e){livespell.ajax.debug("SERVER ERROR",false)}}}}};if(livespell.test.BuggyAjaxInFireFox()){xhr.onload=xhr.onerror=xhr.onabort=liveSpellAjaxCallbackhandler;}else{xhr.onreadystatechange=liveSpellAjaxCallbackhandler;}
var fulRequest=posturl+"?"+params;fulRequest=fulRequest.replace(/\(/,"%28")
fulRequest=fulRequest.replace(/\)/,"%29")
fulRequest=fulRequest.replace(/'/,"%27")
xhr.open("GET",fulRequest,true);var async=true;var warning="must be async for performance issues";xhr.send();livespell.ajax.debug("URL:"+posturl+"  <br/>  GET:"+params,async)}else{var e;livespell.ajax.renderIframe(posturl);params+="&script=true"
livespell.ajax.debug("URL:"+posturl+"  <br/>  GET (IFRAME):"+params,true)
var theframe=E$(livespell.constants._IFRAME)
try{var framehref=(theframe.contentWindow.location.href)
if(framehref.indexOf("about:blank")<0){posturl=framehref.split("?")[0];}
theframe.contentWindow.location.replace(posturl+"?"+params)}catch(e){theframe.src=posturl+"?"+params}}},send_sync:function(cmd,args,lan,note,sender){livespell.cache.ajaxrequest={};livespell.cache.ajaxrequest.cmd=cmd;livespell.cache.ajaxrequest.args=args;livespell.cache.ajaxrequest.lan=lan;livespell.cache.ajaxrequest.note=note;livespell.cache.ajaxrequest.sender=sender;var oSender=livespell.spellingProviders[sender];var serverModel=oSender.ServerModel.toLowerCase()
if(serverModel==="auto"&&livespell.rubberRingServerModel!==""){serverModel=livespell.rubberRingServerModel}
var posturl=livespell.installPath+"core/"
if(serverModel==="asp.net"){posturl+="default.ashx"}else if(serverModel==="aspx"){posturl+="Default.aspx"}else if(serverModel==="asp"){posturl+="default.asp"}else if(serverModel==="php"){posturl+="index.php"}else if(serverModel==="auto"||serverModel===""){posturl+=""}else if(serverModel!==""){posturl+="index."+serverModel}else{throw('livespell::SeverModel not recognized: '+serverModel)}
var settingsfile=livespell.spellingProviders[sender].SettingsFile;var hasajax=false;var xhr=livespell.ajaxClient(true);if(!xhr){livespell.ajax.debug("SYNC REQUEST ERROR: No HTMLHTTP object or ActiveX",false);return null;};var params='';try{args=encodeURIComponent(args);}catch(e){args=escape(args);}
params+="note="+escape(note);params+="&command="+cmd;params+="&args="+(args);params+="&lan="+escape(lan);params+="&sender="+escape(sender);params+="&settingsfile="+escape(settingsfile);xhr.open("GET",posturl+"?"+params,false);xhr.send();livespell.ajax.debug("REMOTE-CALL:"+posturl+"  <br/>  GET:"+params,true);if(xhr.status==200){return livespell.ajax.pickup(xhr.responseText,true);}else{livespell.setrubberRingServerModel();if(typeof(window['LIVESPELL_DEBUG_MODE'])!="undefined"){try{if(xhr.responseText.length){livespell.ajax.debug("SERVER ERROR:"+xhr.responseText,false)}else{livespell.ajax.debug("SERVER ERROR - Please view this page in a browser other than IE for full details",false)}}catch(e){livespell.ajax.debug("SERVER ERROR",false)}
this.send_sync(cmd,args,lan,note,sender)}}
return null},pickupIframe:function(strHTML){strHTML=strHTML.split("<script")[0]
strHTML=strHTML.split("<SCRIPT")[0]
this.pickup(strHTML,false);},debug:function(msg,mtcolor){if(typeof(window['LIVESPELL_DEBUG_MODE'])!="undefined"){var o=document.getElementById('LIVESPELL_DEBUG_MODE_CONSOLE');if(!o){o=document.createElement('div');o.innerHTML="<h2>Spell checker debug console</h2><p>please email back for comprehensive support</p><hr/><div style='border:1px dotted grey; background-color:#eee;color:#000;' id='LIVESPELL_DEBUG_MODE_CONSOLE'></div> ";document.body.appendChild(o);}
o=document.getElementById('LIVESPELL_DEBUG_MODE_CONSOLE');o.innerHTML="<div style='background-color:"+((mtcolor===true)?"#ffe":"#aab")+"'>"+o.innerHTML+msg+"</div>";}},needsInstantSuggestion:false,pickup:function(strHTML,binInstant){this.debug((strHTML),false);if(strHTML.indexOf(livespell.str.chr(5))===-1){setTimeout(livespell.ajax.resend,5000);return;}
strHTML=strHTML.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'");var arrResult=(strHTML).split(livespell.str.chr(5));var command=arrResult[0];var vSender=Number(arrResult[1]);var oSender=livespell.spellingProviders[vSender]
var vLang=oSender.Language
var i,j,k,t,r,newSuggestions,sug_each_word,Suggestions;if(!livespell.cache.suggestions[vLang]){livespell.cache.suggestions[vLang]=[];}
if(!livespell.cache.spell[vLang]){livespell.cache.spell[vLang]=[];}
if(!livespell.cache.reason[vLang]){livespell.cache.reason[vLang]=[];}
if(command==="CTXSPELL"){t=arrResult[2].split("");r=arrResult[3].split("");for(i=0;i<t.length;i++){livespell.cache.reason[vLang][livespell.cache.wordlist[vSender][i]]=(r[i]).toString();livespell.cache.spell[vLang][livespell.cache.wordlist[vSender][i]]=(t[i]==="T");}
oSender.recieveContextSpell()}else if(command==="CTXSUGGEST"){newSuggestions=arrResult[2].split(livespell.str.chr(2));livespell.cache.suggestions[vLang][livespell.cache.suggestionrequest.word]=newSuggestions;for(j=0;j<newSuggestions.length;j++){livespell.cache.spell[vLang][newSuggestions[j]]=true;sug_each_word=newSuggestions[j].replace(/\-/g," ").split(" ")
for(k=0;k<sug_each_word.length;k++){livespell.cache.spell[vLang][sug_each_word[k]]=true;}}
if(arrResult[3]&&arrResult[3].length){livespell.cache.langs=(arrResult[3].split(livespell.str.chr(2)));}
livespell.context.showMenu(livespell.cache.suggestionrequest.id,livespell.cache.suggestionrequest.word,livespell.cache.suggestionrequest.reason,livespell.cache.suggestionrequest.providerID);}else if(command==="WINSUGGEST"){Suggestions=arrResult[2].split(livespell.str.chr(1));for(i=0;i<livespell.cache.suglist.length;i++){newSuggestions=Suggestions[i].split(livespell.str.chr(2));livespell.cache.suggestions[vLang][livespell.cache.suglist[i]]=newSuggestions;for(j=0;j<newSuggestions.length;j++){livespell.cache.spell[vLang][newSuggestions[j]]=true;sug_each_word=newSuggestions[j].replace(/\-/g," ").split(" ")
for(k=0;k<sug_each_word.length;k++){livespell.cache.spell[vLang][sug_each_word[k]]=true;}}}
oSender.recieveWindowSpell()}else if(command==="WINSETUP"){Suggestions=arrResult[4].split(livespell.str.chr(1));t=arrResult[2].split("");r=arrResult[3].split(livespell.str.chr(1));for(i=0;i<t.length;i++){livespell.cache.reason[vLang][livespell.cache.wordlist[vSender][i]]=(r[i]);livespell.cache.spell[vLang][livespell.cache.wordlist[vSender][i]]=(t[i]==="T");if(!livespell.cache.spell[vLang][livespell.cache.wordlist[vSender][i]]&&i<Suggestions.length){newSuggestions=Suggestions[i].split(livespell.str.chr(2));livespell.cache.suggestions[vLang][livespell.cache.wordlist[vSender][i]]=newSuggestions;for(j=0;j<newSuggestions.length;j++){livespell.cache.spell[vLang][newSuggestions[j]]=true;sug_each_word=newSuggestions[j].replace(/\-/g," ").split(" ")
for(k=0;k<sug_each_word.length;k++){livespell.cache.spell[vLang][sug_each_word[k]]=true;}}}}
if(arrResult[5]&&arrResult[5].length){livespell.cache.langs=(arrResult[5].split(livespell.str.chr(2)));}
oSender.recieveWindowSetup()}else if(command==="LISTDICTS"){return(arrResult[2].split(livespell.str.chr(2)));}else if(command==="SAVEWORD"){var myMessage=(arrResult[2]);if(myMessage.indexOf("!!")>-1){alert(myMessage)}}else if(command==="APIDYM"){var Suggestion=arrResult[3]
var Origional=arrResult[2]
oSender.onDidYouMean(Suggestion,Origional);}else if(command==="APIVALIDATE"){var doSuggest=arrResult[4].length>0;Suggestions=arrResult[4].split(livespell.str.chr(1));t=arrResult[2].split("");r=arrResult[3].split(livespell.str.chr(1));var outInput=arrResult[4].split(livespell.str.chr(1));var isValid=arrResult[5]=="T"
var outSpellingOk=[];var outReason=[];for(i=0;i<outInput.length;i++){livespell.cache.reason[vLang][outInput[i]]=outReason[i]=(r[i]);livespell.cache.spell[vLang][outInput[i]]=outSpellingOk[i]=(t[i]==="T");}
if(binInstant){return isValid}
oSender.onValidateMech(isValid);}else if(command==="APISPELL"||command==="APISPELLARRAY"){var doSuggest=arrResult[4].length>0;Suggestions=arrResult[4].split(livespell.str.chr(1));t=arrResult[2].split("");r=arrResult[3].split(livespell.str.chr(1));var outInput=arrResult[5].split(livespell.str.chr(1));var outSpellingOk=[];var outSuggestions=[];var outReason=[];for(i=0;i<outInput.length;i++){livespell.cache.reason[vLang][outInput[i]]=outReason[i]=(r[i]);livespell.cache.spell[vLang][outInput[i]]=outSpellingOk[i]=(t[i]==="T");if(doSuggest&&!livespell.cache.spell[vLang][outInput[i]]){newSuggestions=Suggestions[i].split(livespell.str.chr(2));livespell.cache.suggestions[vLang][outInput[i]]=outSuggestions[i]=newSuggestions;for(j=0;j<newSuggestions.length;j++){livespell.cache.spell[vLang][newSuggestions[j]]=true;sug_each_word=newSuggestions[j].replace(/\-/g," ").split(" ")
for(k=0;k<sug_each_word.length;k++){livespell.cache.spell[vLang][sug_each_word[k]]=true;}}}}
if(outInput.length>1||command==="APISPELLARRAY"){if(binInstant){if(livespell.ajax.needsInstantSuggestion){return outSuggestions}
return outSpellingOk}
oSender.onSpellCheck(outInput,outSpellingOk,outReason,outSuggestions);}else{if(binInstant){if(livespell.ajax.needsInstantSuggestion){return outSuggestions};return outSpellingOk[0]}
oSender.onSpellCheck(outInput[0],outSpellingOk[0],outReason[0],outSuggestions[0]);}}}},cache:{ignore:[],spell:[],reason:[],wordlist:[],suglist:[],langs:[],suggestions:[],suggestionrequest:null,checkTimeout:null,checkTimeoutUni:null,ajaxrequest:[]},test:{HTML:function(str){if(str.indexOf("<")>-1&&str.indexOf(">")>-1){return true;}
if(str.indexOf("&")==0&&str.indexOf(";")==str.length-1){return true;}
return false;},IE:function(){return(navigator.appVersion.indexOf("MSIE")>-1||navigator.userAgent.indexOf("Trident/")>-1)},IE5:function(){return(navigator.appVersion.indexOf("MSIE 5.")>-1)},IE6:function(){return(navigator.appVersion.indexOf("MSIE 6.")>-1)},IE7:function(){return(navigator.appVersion.indexOf("MSIE 7.")>-1)},IE8:function(){return(navigator.appVersion.indexOf("MSIE 8.")>-1)},IE9:function(){if((navigator.userAgent.indexOf("MSIE 9.")>-1)&&!(arguments.caller)){return true;}
return false;},IE10:function(){if((navigator.userAgent.indexOf("MSIE 10.")>-1)){return true;}
return false;},IEold:function(){return(livespell.test.IE()&&(livespell.test.IE5()||livespell.test.IE6()||livespell.test.IE7()));},webkit:function(){return/webkit/.test(navigator.userAgent.toLowerCase())},chrome:function(){return/chrome/.test(navigator.userAgent.toLowerCase())},Safari:function(){return/safari/.test(navigator.userAgent.toLowerCase())},FireFox:function(){return/firefox/.test(navigator.userAgent.toLowerCase())},BuggyAjaxInFireFox:function(){var FF3=(/firefox\/3./.test(navigator.userAgent.toLowerCase()));var GK=(/gecko/.test(navigator.userAgent.toLowerCase()));var WIN=(/windows/.test(navigator.userAgent.toLowerCase()));return((FF3||GK)&&(WIN));},MAC:function(){if(navigator.platform&&(navigator.platform.toUpperCase().indexOf("MAC")>-1)){return true;}
return false;},iPhone:function(){if((navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))){return true;}
return false;},isword:function(str){if(str=="length"){return false;}
if(str=="&nbsp;"){return false;}
if((/[®™]+/).test(str)){return false;};str=str.replace(/&nbsp;/g," ")
return(/^([\w'’\u2018\u2019`íë\x81-\xA7\xC0-\xFF]+)$$/i).test(str);},ALLCAPS:function(str){return str===str.toUpperCase();},eos:function(str){str=str.replace(/&nbsp;/gi," ");return((/<br[ ]*[\/]?>/gi).test(str)||(/<div[ ]*[\/]?>/gi).test(str)||(/<p[ ]*[\/]?>/gi).test(str)||(/[!?¿¡.][\s\S]*$$/).test(str))&&!((/[.]{3}/).test(str));},nl:function(str){return(/<br[ ]*[\/]?>/gi).test(str)||(/\n/gi).test(str)||(/\r/gi).test(str);},browserNoAYT:function(){return!livespell.test.browserValid()},num:function(str){return(/[.0-9\*\#\@\/\%\$\&\+\=]/).test(str);},lcFirst:function(str){var f=str.substr(0,1);if((/[.0-9\*\#\@\/'`\%\$\&\+\=]/).test(f)){return false};return f==f.toLowerCase();},spelling:function(word,Lang){if(livespell.cache.ignore[word.toLowerCase()]&&livespell.cache.ignore[word.toLowerCase()]===true){return true};if(!livespell.cache.spell[Lang]){livespell.cache.spell[Lang]=[]}
var res=(livespell.cache.spell[Lang][word]);if(res&&typeof(res)=="function"){res=true};return res;},fullyCached:function(word,lang,makeSuggestions){var wordSpellCheck=this.spelling(word,lang);var result=wordSpellCheck===true||wordSpellCheck===false;if(wordSpellCheck!==true){result=result&&livespell.cache.reason[lang]&&typeof(livespell.cache.reason[lang][word])!=="undefined"
if(makeSuggestions){result=result&&livespell.cache.suggestions[lang]&&typeof(livespell.cache.suggestions[lang][word])!=="undefined"}}
return result;},browserValid:function(){return(document.designMode||document.contentEditable)&&!(document.opera)&&!/opera/.test(navigator.userAgent.toLowerCase())}},str:{normalizeApos:function(tok){return tok.replace(/[’\u2018\u2019`]/g,"'");},getCase:function(word){if(word.toUpperCase()===word){return 2;}
if(livespell.str.toCaps(word)===word){return 1;}
return 0;},stripSpans:function(strinput){if(!strinput){return""}
strinput=strinput.replace((/(\<\/span[^>]*\>)/gi),"");return strinput.replace((/(\<span[^>]*\>)/gi),"");},htmlDecode:function(content){if(livespell.test.IE5()||livespell.test.IE6()||livespell.test.IE7()||livespell.test.IE8()){var EntityLevelHtmlDecode=function(input){var e=document.createElement("span");var result=input.replace(/(&[^;]+;)+/g,function(match){e.innerHTML=match;return e.firstChild.nodeValue;});return result;}
return content.replace(/(&[^;]+;)+/g,EntityLevelHtmlDecode);}
var e=document.createElement('div');e.innerHTML=content;return e.childNodes.length<1?"":e.childNodes[0].data;},stripTags:function(strinput){if(!strinput){return""}
strinput=livespell.str.stripComments(strinput)
return strinput.replace((/(<[\/]?[a-z][^>]*>)/gi),"");},stripComments:function(strinput){if(!strinput){return""}
strinput=strinput.replace((/<!--[\s\S.\n]*?-->/g),"");strinput=strinput.replace((/&lt;!--[\s\S.\n]*?--&gt;/g),"");return strinput;},HTMLEnc:function(s){if(s==undefined){return""}
s=(s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));s=s.replace(/\n/g,"<br />");s=s.replace(/\r/g,"");s=s.replace(/[ ][ ]/gi," &nbsp;");s=s.replace(/[ ][ ]/gi," &nbsp;");return s;},HTMLDec:function(s){s=s=s.replace(/\&nbsp\;/gi," ");s=(s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));return s;},spliceXHTML:function(str,pos,add){var arrStr=str.split('');var inHTML=false;var out="";var j=0;for(var i=0;i<arrStr.length;i++){var ch8r=arrStr[i];if(ch8r=="<"){inHTML=true}
out+=ch8r;if(j==pos&&!inHTML){out+=add}
if(!inHTML){j++;}
if(ch8r==">"&&inHTML){inHTML=false;}}
return out;},spliceSpans:function(str,pos,add){if(pos==-1){return str}
if(pos==0){return add+str}
if(str+""==""){return"";}
var arrStr=str.split('');var inHTMLSpan=false;var inHTML=true;var out="";var j=0;for(var i=0;i<arrStr.length;i++){var ch8r=arrStr[i];try{if(i<arrStr.length-5&&ch8r=="<"&&((arrStr[i+1].toLowerCase()=="s"&&arrStr[i+2].toLowerCase()=="p"&&arrStr[i+3].toLowerCase()=="a"&&arrStr[i+4].toLowerCase()=="n")||(arrStr[i+1].toLowerCase()=="/"&&arrStr[i+2].toLowerCase()=="s"&&arrStr[i+3].toLowerCase()=="p"&&arrStr[i+4].toLowerCase()=="a"&&arrStr[i+5].toLowerCase()=="n"))){inHTMLSpan=true;}
if(ch8r=="<"){inHTML=true;}}catch(e){}
out+=ch8r;if(j==(pos-1)&&(!inHTMLSpan)){out+=add;}
if(!inHTMLSpan){j++;}
if(ch8r==">"&&inHTMLSpan){inHTMLSpan=false;}}
return out;},toCase:function($$str,$$C,$$bcapitalize){switch($$C){case 2:$$str=$$str.toUpperCase();break;case 1:$$str=$$str.substr(0,1).toUpperCase()+$$str.substr(1);break;}
if($$bcapitalize){$$str=$$str.substr(0,1).toUpperCase()+$$str.substr(1);}
return $$str;},tokenize:function(strdoc,binraw){var pattern=(/((\<head>(?:.|\n|\r)+?\<\/head\>)|(\<\!\-\-.*\>)|(\&lt\;[\/\?]?[a-zA-Z][^\&]*\&gt;)|(\<[\/\?]?[a-z][^\>]*\>)|(\&lt\;[\/\?]?[a-z][.]*\&gt;)|(\&amp\;[a-zA-Z0-9]{1,6}\;)|(\&[a-zA-Z0-9]{1,6}\;)|([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})|(<[\/\?]?\w+[^>]*>)|([a-zA-Z]{2,5}:\/\/[^\s\<]*)|(www\.[^\s\<]+[\.][a-zA-Z]{2,4})|([^\s\<\>]+[\.][a-zA-Z]{2,5}\b)|([\w¥íë\x81-\xA7\xC0-\xFF]+[\w'’\u2018\u2019`¥íë\x81-\xA7\xC0-\xFF]*[\w¥íë\x81-\xA7\xC0-\xFF]+)|([\w]+))/gi);var arrdocobj=strdoc.replace(pattern,this.chr(1)+"$1"+this.chr(1)).replace(/\x01\x01/g,this.chr(1)).split(this.chr(1));var arrdoc=[];for(var i=0;i<arrdocobj.length;i++){arrdoc[i]=arrdocobj[i];}
if(!!!arrdoc[0]){arrdoc.shift();}
if(!!!arrdoc[arrdoc.length-1]){arrdoc.pop();}
if(!binraw){for(var i=0;i<arrdocobj.length;i++){if(arrdoc[i]){arrdoc[i]=livespell.str.normalizeApos(arrdoc[i]);}}}
return arrdoc;},chr:function(AsciiNum){return String.fromCharCode(AsciiNum);},toCaps:function(str){return str.substr(0,1).toUpperCase()+str.substr(1);},trim:function(str){return str.replace(/^\s+|\s+$/g,'')},rtrim:function(s){return s.replace(/\s*$$/,"");}},userDict:{forget:function(){var current_cookie=livespell.cookie.get("SPELL_DICT_USER");if(!current_cookie.length){return;}
var arrPersonalWords=current_cookie.split(livespell.str.chr(1));for(var i=0;i<arrPersonalWords.length;i++){if(livespell.cache.ignore[arrPersonalWords[i].toLowerCase()]){delete livespell.cache.ignore[arrPersonalWords[i].toLowerCase()]}}},load:function(){var current_cookie=livespell.cookie.get("SPELL_DICT_USER");if(!current_cookie.length){return;}
var arrPersonalWords=current_cookie.split(livespell.str.chr(1));for(var i=0;i<arrPersonalWords.length;i++){livespell.cache.ignore[arrPersonalWords[i].toLowerCase()]=true;}},add:function(word){livespell.cache.ignore[word.toLowerCase()]=true;var current_cookie=livespell.cookie.get("SPELL_DICT_USER");if(current_cookie){current_cookie=livespell.str.chr(1)+current_cookie;}
current_cookie=word+current_cookie;livespell.cookie.setLocal("SPELL_DICT_USER",current_cookie);}},cookie:{erase:function(name,path,domain){this.setLocal(name,"");},get:function(check_name){var a_all_cookies=document.cookie.split(';');var a_temp_cookie='';var cookie_name='';var cookie_value='';var b_cookie_found=false;for(var i=0;i<a_all_cookies.length;i++){a_temp_cookie=a_all_cookies[i].split('=');cookie_name=a_temp_cookie[0].replace(/^\s+|\s+$$/g,'');if(cookie_name===check_name){b_cookie_found=true;if(a_temp_cookie.length>1){cookie_value=unescape(a_temp_cookie[1].replace(/^\s+|\s+$$/g,''));}
if(!cookie_value){return"";}
return cookie_value;}
a_temp_cookie=null;cookie_name='';}
if(!b_cookie_found){return"";}},set:function(name,value,expires,path,domain,secure){var today=new Date();today.setTime(today.getTime());if(expires){expires=expires*1000*60*60*24;}
var expires_date;if(value==""){expires_date=new Date(today.getTime());}else{expires_date=new Date(today.getTime()+(expires));}
var strcookie=name+"="+escape(value);if(expires){strcookie+=";expires="+expires_date.toGMTString();}
document.cookie=strcookie;},setLocal:function(name,value){this.set(name,value,999,"",document.domain,false);}},events:{add:function(obj,event,callback,capture){if(obj.addEventListener){try{obj.addEventListener(event,callback,false);}catch(e){}}else if(obj.attachEvent){obj.detachEvent("on"+event,callback);obj.attachEvent("on"+event,callback);}}},array:{safepush:function(arr,value){for(var i=0;i<arr.length;i++){if(arr[i]===value){return arr;}}
arr.push(value);return arr;},remove:function(array,subject){var r=new Array();for(var i=0,n=array.length;i<n;i++){if(!(array[i]==subject)){r[r.length]=array[i];}}
return r;}}};if(!Array.push&&!Array.prototype.push){Array.prototype.push=function(){var n=this.length>>>0;for(var i=0;i<arguments.length;i++){this[n]=arguments[i];n=n+1>>>0;}
this.length=n;return n;};}
if(!Array.pop&&!Array.prototype.pop){Array.prototype.pop=function(){var n=this.length>>>0,value;if(n){value=this[--n];delete this[n];}
this.length=n;return value;};}
if(!Array.shift&&!Array.prototype.shift){Array.prototype.shift=function(){firstElement=this[0];Array.prototype.reverse.call(this);this.length=Math.max(this.length-1,0);Array.prototype.reverse.call(this);return firstElement;}}
livespell.insitu={settings:{Delay:888},provider:function(id){return livespell.spellingProviders[id];},initiated:false,_FIELDSUFFIX:"___livespell_proxy",_CONTEXTMENU:"livespell___contextmenu",updateBaseDelay:function(id){var id2=id;var n=function(){livespell.insitu.updateBase(id2);}
setTimeout(n,1)},updateBase:function(id){E$(id).value=livespell.insitu.getProxyText(id);},proxyDOM:function(id){return E$(id+this._FIELDSUFFIX);},getProxyHTML:function(id){return livespell.insitu.proxyDOM(id).innerHTML;},extractTextWithWhitespace:function(parent){var ret=""
var elems=parent.childNodes;var elem;for(var i=0;elems[i];i++){var elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue;}else if(elem.nodeType===1){ret+=livespell.insitu.extractTextWithWhitespace(elem)
if((elem.nodeName=="P"||elem.nodeName=="DIV")){ret+="\n";}
if(elem.nodeName=="BR"){if(elem.nextSibling)
ret+="\n";}}}
ret=ret.replace(/[\u200B-\u200D\uFEFF]/g,'');return ret;},getProxyText:function(id){var me=livespell.insitu.proxyDOM(id);var val=livespell.insitu.extractTextWithWhitespace(me)
if(val===String.fromCharCode(10)){val='';}
if(val.length>0&&livespell.test.FireFox()&&val.charAt(val.length-1)==String.fromCharCode(10)){val=val.substr(0,val.length-1)}
return val;},setProxyHTML:function(id,val){livespell.insitu.proxyDOM(id).innerHTML=val;livespell.context.validate(id)},setProxyText:function(id,val){val=livespell.str.HTMLEnc(val);if(livespell.test.IE()){val="<p>"+val+"</p>"
val=val.replace(/<br\s*[\/]?>/gi,"</p><p>");val=val.replace(/<p>\s*<\/p>/gi,"<p>&#8203;</p>");}
this.setProxyHTML(id,val)},hasChanged:function(id){var neue=E$(id).value.replace(/\t/gi," ").replace(/\x0D\x0A/g,String.fromCharCode(10));var old=livespell.insitu.getProxyText(id).replace(/\x0D\x0A/g,String.fromCharCode(10));return neue!=old;},safeUpdateProxy:function(id,providerId){if(!livespell.insitu.proxyDOM(id)||livespell.insitu.proxyDOM(id).hasFocus){return false}
if(livespell.insitu.hasChanged(id)){livespell.insitu.setProxyText(id,E$(id).value);this.checkNow(id,providerId)}},updateProxy:function(id){var value=E$(id).value
this.setProxyText(id,value);},setProxyHTMLAndMaintainCaretLegacy:function(id,val){var e;var dmilit='\uFEFF';var liveField=livespell.insitu.proxyDOM(id);var range=document.selection.createRange();range.pasteHTML(dmilit);var text=liveField.innerHTML;text=livespell.str.stripSpans(text);var pos=text.indexOf(dmilit);var caretNode=document.getElementById("livespell_cursor_hack__"+id)
if(caretNode&&caretNode.parentNode){caretNode.parentNode.removeChild(caretNode);}
var caretNode=document.createElement("span");caretNode.id="livespell_cursor_hack__"+id;var plainNode=document.createElement("span");plainNode.appendChild(caretNode);caretNodeHTML=plainNode.innerHTML;plainNode.removeChild(caretNode);caretNode=plainNode=null;text=livespell.str.spliceSpans(val,pos,caretNodeHTML);liveField.innerHTML=text;var range=document.selection.createRange();var caretNode=document.getElementById("livespell_cursor_hack__"+id)
var id2=id;var n=function(){range.moveToElementText(caretNode);range.select();caretNode.parentNode.removeChild(caretNode);livespell.context.validate(id2)}
window.setTimeout(n,1)},setProxyHTMLAndMaintainCaret:function(id,val){if(val===""||livespell.insitu.getProxyHTML(id)===val){return;}
var liveField=livespell.insitu.proxyDOM(id);if(!window.getSelection){if(window.screen&&window.screen.deviceXDPI&&window.screen.logicalXDPI){if(window.screen.deviceXDPI!=window.screen.logicalXDPI){var issue="zoomed";return this.setProxyHTMLAndMaintainCaretLegacy(id,val)}}
var text=liveField.innerHTML;if(val.toLowerCase().indexOf("<p")==-1){val="<p>"+val+"</p>"}
val=val.replace(/<br[ ]*[\/]?>/gi,"</p><p>");val=val.replace(/<p>\s*<\/p>/gi,"<p>&#8203;</p>");val=val.replace(/<p>&nbsp;<\/p>/gi,"<p>&#8203;</p>");liveField.focus();var carretbuddyid="_livespell__temp___273728";var caretbuddy="<span id='"+carretbuddyid+"'></span>"
var caretNode=document.getElementById(carretbuddyid);if(caretNode&&caretNode.parentNode){caretNode.parentNode.removeChild(caretNode);}
var clickx,clicky
var cursorPos=document.selection.createRange().duplicate();clickx=cursorPos.boundingLeft;clicky=cursorPos.boundingTop;if(!clickx||!clicky){cursorPos.pasteHTML(caretbuddy);var tempbuddy=document.getElementById(carretbuddyid);var rect=tempbuddy.getBoundingClientRect();clickx=tempbuddy.getBoundingClientRect().left;clicky=tempbuddy.getBoundingClientRect().top;}
try{cursorPos.moveToPoint(clickx,clicky)}catch(e){return this.setProxyHTMLAndMaintainCaretLegacy(id,val)}
var scrolly=liveField.scrollTop;liveField.innerHTML=val;liveField.scrollTop=scrolly;clicky+=3;try{cursorPos.moveToPoint(clickx,clicky)
cursorPos.select();}catch(e){}}else{liveField.focus();var marker=livespell.str.chr(127)+livespell.str.chr(1)+livespell.str.chr(2);var carretbuddyid="_livespell__temp___273728";var caretbuddy="<span id='"+carretbuddyid+"'></span>"
var sel=window.getSelection();if(!(sel.getRangeAt&&sel.rangeCount)){return;}
var range=sel.getRangeAt(0);range.deleteContents();range.insertNode(document.createTextNode(marker));var pos=livespell.str.stripSpans(liveField.innerHTML).indexOf(marker);val=livespell.str.spliceSpans(val,pos,caretbuddy);liveField.innerHTML=val;var caretNode=document.getElementById(carretbuddyid);if(!caretNode){return};var selection=window.getSelection();selection.removeAllRanges();var range=document.createRange();range.selectNode(caretNode);selection.addRange(range);range.deleteContents();range.collapse(true);liveField.focus();selection.addRange(range);}},findLiveChildrenInDOMElement:function(element){var uid;var LiveOffspring=[];if(element.id){uid=element.id
if(document.getElementById(uid+"_designEditor")){var oFTA=(document.getElementById(uid+"_designEditor"));if(oFTA.nodeName.toLowerCase()=="iframe"){LiveOffspring.push(oFTA.id)
return LiveOffspring;}}}else{uid="xx"}
var InnerFrames=element.getElementsByTagName("iframe");for(var i=0;i<InnerFrames.length;i++){var ittInnerFrame=InnerFrames[i];if(livespell.getIframeDocument(ittInnerFrame)){if(!ittInnerFrame.id){ittInnerFrame.id="livespell__IframeChildof_"+uid+"_"+i}
LiveOffspring.push(ittInnerFrame.id)}}
return LiveOffspring;},checkNow:function(fieldList,providerID){var txt='';if(window.getSelection){txt=window.getSelection();}else if(document.getSelection){txt=document.getSelection();}else if(document.selection){try{txt=document.selection.createRange().text;}catch(e){}}
if(txt!=""){return;}
if(!livespell.cache.spell[this.provider(providerID).Language]){livespell.cache.spell[this.provider(providerID).Language]=[];livespell.cache.reason[this.provider(providerID).Language]=[];}
livespell.cache.wordlist[providerID]=[];if(!fieldList.join){fieldList=fieldList.split(",")}
var mem_words=[];for(var f=0;f<fieldList.length;f++){var id=fieldList[f];if(E$(id).nodeName.toLowerCase()=="textarea"||E$(id).nodeName.toLowerCase()=="input"&&E$(id).type=="text"){livespell.insitu.createProxy(id);var tokens_isword=[];var strDoc=this.getProxyText(id);var tokens=livespell.str.tokenize(strDoc);var lng=this.provider(providerID).Language
var memsize=0;var memmax=livespell.maxURI-257;for(var i=0;i<tokens.length&&memsize<memmax;i++){if(mem_words["_"+tokens[i]]!==true&&livespell.test.isword(tokens[i])===true){var cachelookup=livespell.cache.spell[lng][tokens[i]];if(cachelookup!==true&&cachelookup!==false){mem_words["_"+tokens[i]]=true;memsize+=encodeURIComponent(tokens[i].toString()).length+2;livespell.cache.wordlist[providerID]=livespell.array.safepush(livespell.cache.wordlist[providerID],tokens[i].toString());}}}}}
if(!livespell.cache.wordlist[providerID].length){return this.renderProxy(id,providerID);}
mem_words=null;var nn=livespell.cache.wordlist[providerID].join(livespell.str.chr(1))
livespell.ajax.send("CTXSPELL",livespell.cache.wordlist[providerID].join(livespell.str.chr(1)),this.provider(providerID).Language,"",providerID);},destroyProxy:function(id){if(!document.getElementById(id+this._FIELDSUFFIX)){return}
o=livespell.insitu.proxyDOM(id);n=document.getElementById(id);o.parentNode.removeChild(o);n.style.display=livespell.inlineblock();n.style.visibility="visible";livespell.array.remove(livespell.liveProxys,id)
n.hasLiveSpellProxy=false;},createProxy:function(id){if(!livespell.test.browserValid()){return}
var e=document.getElementById(id);if(!e){return}
if(e.disabled){return}
livespell.insitu.init();if(document.getElementById(id+this._FIELDSUFFIX)){return livespell.insitu.proxyDOM(id);};var attr,stylesToCopy,i,styleval,memreadonly;var n=document.createElement("div");n.oneline=e.nodeName.toLowerCase()==="input";n.setAttribute("id",id+this._FIELDSUFFIX);var t=E$(id);t.spellcheckproxy=n;if(livespell.test.IE()){try{memreadonly=t.readOnly;t.readOnly=false}catch(e){}}
try{if(t.getAttribute('maxlength')){n.maxLength=t.getAttribute('maxlength');}else if(t.maxLength&&t.maxLength>0){n.maxLength=t.maxLength;}}catch(e){}
try{n.setAttribute("class","livespell_textarea "+t.className);}catch(e){}
try{n.setAttribute("style",t.getAttribute("style"));}catch(e){}
n.style.display="none";var stylesToCopy=["font-size","line-height","font-family","width","height","padding-left","padding-top","margin-left","margin-top","padding-right","padding-bottom","margin-right","margin-bottom","font-weight","font-style","color","text-transform","text-decoration","line-height","text-align","vertical-align","direction","background-color","background-image","background-repeat","background-position","background-attachment"];var stylesToSet=["fontSize","lineHeight","fontFamily","width","height","paddingLeft","paddingTop","marginLeft","marginTop","paddingRight","paddingBottom","marginRight","marginBottom","fontWeight","fontStyle","color","textTransform","textDecoration","lineHeight","textAlign","verticalAlign","direction","backgroundColor","backgroundImage","backgroundRepeat","backgroundPosition","backgroundAttachment"];if(window.getComputedStyle){var compStyle=window.getComputedStyle(t,null);for(i=0;i<stylesToCopy.length;i++){var attr=stylesToCopy[i];var attr2=stylesToSet[i];var styleval=compStyle.getPropertyValue(attr);if(attr=="height"&&styleval.indexOf("px")){styleval=(Number(styleval.split("px")[0])+1)+"px";}
if(attr=="width"&&styleval.indexOf("px")){if(livespell.test.IE9()){styleval=(Number(styleval.split("px")[0])+6)+"px";}else{styleval=(Number(styleval.split("px")[0])-1)+"px";}}
if(attr=="width"){if(t.attributes["width"]&&t.attributes["width"].value.indexOf('%')>-1){styleval=t.attributes["width"].value;}
if(t.style.width&&t.style.width.indexOf('%')>-1){styleval=t.style.width;}}
if(attr=="height"){if(t.attributes["height"]&&t.attributes["height"].value.indexOf('%')>-1){styleval=t.attributes["height"].value;}
if(t.style.height&&t.style.height.indexOf('%')>-1){styleval=t.style.height;}}
if(attr=="margin-left"&&styleval.indexOf("px")){styleval=(Number(styleval.split("px")[0])+1)+"px";}
if(styleval){n.style[attr2]=styleval;}}}else if(t.currentStyle){if(!n.oneline){n.style.overflowY="scroll";}
for(i=0;i<stylesToCopy.length;i++){attr=stylesToSet[i];styleval=t.currentStyle[attr];if(styleval){try{if(attr=="width"){try{if(t.offsetWidth){n.style.width=t.offsetWidth;}}catch(e){}
if(t.attributes["width"]&&t.attributes["width"].value.indexOf('%')>-1){styleval=t.attributes["width"].value;}
if(t.style.width&&t.style.width.indexOf('%')>-1){styleval=t.style.width;}}
if(attr=="height"){try{if(t.offsetHeight){n.style.height=t.offsetHeight;if(n.oneline){n.style.height=t.offsetHeight-4;}}}catch(e){}
if(t.attributes["height"]&&t.attributes["height"].value.indexOf('%')>-1){styleval=t.attributes["height"].value;}
if(t.style.height&&t.style.height.indexOf('%')>-1){styleval=t.style.height;}}
styleval=styleval+"";if(!styleval.toUpperCase){}else if(styleval.toUpperCase()!="AUTO"&&styleval.toUpperCase()!="INHERIT"){n.style[attr]=styleval;}}catch(e){}}}
stylesToCopy=["cursor","font-size","line-height","font-family","font-weight","font-style","color","text-transform","text-decoration","line-height","text-align","vertical-align","direction"];stylesToSet=["cursor","fontSize","lineHeight","fontFamily","fontWeight","fontStyle","color","textTransform","textDecoration","lineHeight","textAlign","verticalAlign","direction"];mycss="";csstext="#"+n.id+" p   , #+"+n.id+" span {";for(i=0;i<stylesToCopy.length;i++){try{csstext+=stylesToCopy[i]+" : "+t.currentStyle[stylesToSet[i]]+"; ";}catch(e){}}
csstext+="margin:  0; ";csstext+="padding: 0; ";csstext+="border: 0; ";csstext+="} ";this.addCss(csstext);}
n.isLiveSpellProxy=true;n.className="livespell_textarea";n.setAttribute("hasFocus",false)
n.style.display=livespell.inlineblock()
if(livespell.test.IE()){n.style.cursor="text";}
if(t.style.display=="none"){n.style.display="none"}
if(true){t.style.display="none";t.style.visibility="hidden";}
if(t.tabIndex){n.tabIndex=t.tabIndex;}
if(t.title){n.title=t.title}
t.hasLiveSpellProxy=true;if(livespell.test.IE()){try{t.readOnly=memreadonly}catch(e){}}
if(!livespell.test.browserNoAYT()){try{document.body.setAttribute=("spellCheck","false");}catch(e){}
try{document.body.spellcheck=false}catch(e){}}
if(t.style.height=="auto"){n.style.height="auto";}
n.spellcheck=true;livespell.insitu.cloneClientEvents(t,n);if(t.title){n.title=t.title;}
if(n.maxLength){livespell.events.add(n,"keyup",function(){livespell.insitu.maxCharsHandler;},false);livespell.events.add(n,"keypress",livespell.insitu.maxCharsHandler,true);livespell.events.add(n,"keydown",livespell.insitu.maxCharsHandler,false);livespell.events.add(n,"paste",livespell.insitu.maxCharsHandler,false);}
livespell.events.add(n,"mouseup",function(){livespell.insitu.updateBase(id);},false);livespell.events.add(n,"keyup",function(){livespell.insitu.updateBase(id);},false);try{livespell.events.add(n,"cut",function(){livespell.insitu.updateBaseDelay(id);},false);}catch(e){}
livespell.events.add(n,"keypress",livespell.insitu.keypresshandler,true);livespell.events.add(n,"keydown",livespell.insitu.keyhandler,false);livespell.events.add(n,"blur",livespell.insitu.blurhandler,false);livespell.events.add(n,"focus",livespell.insitu.focushandler,false);n.unChanged=true;if(livespell.test.IE()){if(livespell.test.IE7()||livespell.test.IE6()){n.onblur=function(){var bid=(n.id.replace(livespell.insitu._FIELDSUFFIX,''))
livespell.insitu.updateBase(bid);}}
n.mouseup=function(){try{var bid=(n.id.replace(livespell.insitu._FIELDSUFFIX,''))
livespell.insitu.updateBase(bid);}catch(e){}}
n.ondrop=function(e){if(!e||!e.dataTransfer){return true;}
var newContent=e.dataTransfer.getData('Text')+'';if(newContent=='null'){return false;}
n.focus();var cursorPos=document.selection.createRange().duplicate();cursorPos.pasteHTML(newContent);livespell.insitu.updateBase(t.id);return false;}}
if(livespell.test.FireFox()){n.ondrop=function(e){var newContent=e.dataTransfer.getData('text/plain')+'';var valueBeforeDrop=n.innerHTML;var cp=document.caretPositionFromPoint(e.pageX,e.pageY);n.focus();var selection=window.getSelection();selection.removeAllRanges();var range=document.createRange();range.setStart(cp.offsetNode,cp.offset);selection.addRange(range);document.execCommand('inserttext',false,newContent);livespell.insitu.updateBase(t.id);return false;}
n.onpaste=function(){var marker='\u0000\uFEFF';var carretbuddyid="_livespell__temp___273728";var caretbuddy="<span id='"+carretbuddyid+"'>|</span>"
var sel=window.getSelection();if(!(sel.getRangeAt&&sel.rangeCount)){return;}
var range=sel.getRangeAt(0);range.deleteContents();range.insertNode(document.createTextNode(marker));var valueBeforePaste=n.innerHTML;;n.innerHTML="";var ff_onafterpaste=function(){var newContent=n.textContent;var caretNode=document.getElementById(carretbuddyid);if(caretNode&&caretNode.parentNode){caretNode.parentNode.removeChild(caretNode);}
n.innerHTML=valueBeforePaste.replace(marker,caretbuddy);var caretNode=document.getElementById(carretbuddyid);n.focus();var selection=window.getSelection();selection.removeAllRanges();var range=document.createRange();range.selectNode(caretNode);selection.addRange(range);document.execCommand('inserttext',false,newContent);livespell.insitu.updateBase(t.id);}
setTimeout(ff_onafterpaste,1);}}else{n.onpaste=function(){try{if(!event){event=window.event;}}catch(e){}
try{if(window.getSelection){var sel=window.getSelection();if(sel.getRangeAt&&sel.rangeCount){range=sel.getRangeAt(0);range.deleteContents();var text=livespell.str.trim(clipboardData.getData('Text'));range.insertNode(document.createTextNode(text));livespell.insitu.updateBase(t.id);return false;}}else{document.selection.createRange().text=livespell.str.trim(clipboardData.getData('Text'));livespell.insitu.updateBase(t.id);return false;}}catch(e){setTimeout(function(){livespell.insitu.updateBase(t.id);},1)}}}
t.setValue=function(val){t.value=val;try{livespell.insitu.updateProxy(t.id,val);}catch(e){}}
t.getValue=function(){try{livespell.insitu.updateBase(t.id);}catch(e){}
return t.value;}
n.setValue=function(val){t.value=val;try{livespell.insitu.setProxyHTMLAndMaintainCaret(t.id,val);}catch(e){}}
n.getValue=function(){try{return livespell.insitu.getProxyText(t.id);}catch(e){}
return t.value;}
t.focus=function(){try{n.focus();}catch(e){}}
var trueparent=t.parentNode
var truesib=t;if(livespell.test.IE()){while(trueparent.nodeName=="P"||trueparent.nodeName=="H1"||trueparent.nodeName=="H2"||trueparent.nodeName=="H3"||trueparent.nodeName=="H4"||trueparent.nodeName=="H5"||trueparent.nodeName=="H6"){truesib=trueparent;trueparent=trueparent.parentNode}}
if(trueparent.hasChildNodes){trueparent.insertBefore(n,truesib)}else{trueparent.appendChild(n)}
var o=livespell.insitu.proxyDOM(id);o.hasFocus=false;livespell.events.add(o,"focus",function(){o.hasFocus=true},false);livespell.events.add(o,"blur",function(){o.hasFocus=false},false);livespell.liveProxys=livespell.array.safepush(livespell.liveProxys,id)
this.setProxyText(id,E$(id).value);if(!t.readOnly){n.contentEditable='true';try{n.contentEditable="PLAINtext-onLY";}catch(e){n.contentEditable='true';}
if(n.contentEditable!=="plaintext-only"){n.contentEditable='true';}
n.designMode='on';}else{if(livespell.test.IE()){n.style.display='inline-block';}}
n.disabled=t.disabled
n.readOnly=t.readOnly
n.setAttribute("spellcheck",false);n.spellcheck=false;if(n.oneline){n.className=n.className+" ls_input";}
return o;},cloneClientEventsHelper:function(from,to,sevent){var element=from;var proxy=to;var event=sevent;var fn=function(){if(document.createEventObject){var evt=document.createEventObject();element.fireEvent('on'+event,evt)}else{var evt=document.createEvent("HTMLEvents");evt.initEvent(event,true,true);element.dispatchEvent(evt);}}
livespell.events.add(proxy,event,fn,false)},cloneClientEvents:function(from,to){var clientevents=["onblur","onfocus","onscroll","onclick","ondblclick","ondragstart","onkeydown","onkeypress","onkeyup","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup"]
for(var k=0;k<clientevents.length;k++){var event=clientevents[k].replace("on","")
this.cloneClientEventsHelper(from,to,event)}},addCss:function(cssCode){try{var styleElement=document.createElement("style");styleElement.type="text/css";if(styleElement.styleSheet){styleElement.styleSheet.cssText=cssCode;}else{styleElement.appendChild(document.createTextNode(cssCode));}
document.getElementsByTagName("head")[0].appendChild(styleElement);}catch(e){}},renderProxy:function(fieldList,providerID){if(!fieldList){return}
if(!fieldList.join){fieldList=fieldList.split(",")}
for(var j=0;j<fieldList.length;j++){var id=fieldList[j];if(!livespell.insitu.proxyDOM(id)){}else{var strDoc=livespell.str.stripSpans(livespell.insitu.getProxyHTML(id));var token;var tokens=livespell.str.tokenize(strDoc);var rawtokens=livespell.str.tokenize(strDoc,"RAW");var tokens_startsentence=[];var tokens_isword=[];var show_error;for(var i=0;i<tokens.length;i++){token=tokens[i];var rtoken=rawtokens[i];tokens_isword[i]=livespell.test.isword(token);tokens_startsentence[i]=(tokens_isword&&(i===0||livespell.test.eos(tokens[i-1])));show_error=false;var reason=livespell.cache.reason[this.provider(providerID).Language][token]?livespell.cache.reason[this.provider(providerID).Language][token]:"";if(tokens_isword[i]){if(typeof(livespell.test.spelling(token,this.provider(providerID).Language))=="undefined"){var fxs=this.provider(providerID);show_error=false;setTimeout(function(){fxs.CheckInSitu();},1);break;}
if(livespell.test.spelling(token,this.provider(providerID).Language)!=true){show_error=true;}
if(show_error){if(this.provider(providerID).IgnoreAllCaps&&token===token.toUpperCase()&&reason!=="B"&&reason!=="E"){show_error=false;}
if(this.provider(providerID).IgnoreNumeric&&(livespell.test.num(token))&&reason!=="B"&&reason!=="E"){show_error=false;}
if(!this.provider(providerID).CaseSensitive&&reason=="C"){show_error=false;}}
if(!tokens_startsentence[i]&&i>1&&this.provider(providerID).CheckGrammar&&token.toUpperCase()===tokens[i-2].toUpperCase()&&token.toUpperCase()!=token.toLowerCase()){show_error=true;reason="R";}
if(!show_error&&this.provider(providerID).CaseSensitive&&this.provider(providerID).CheckGrammar&&tokens_startsentence[i]&&livespell.test.lcFirst(token)){if(!show_error&&strDoc.indexOf(".")>0||strDoc.indexOf("!")>0||strDoc.indexOf("?")>0||strDoc.length>50){show_error=true;reason="G";}}}
if(show_error){var wiggleClass="livespell_redwiggle";if(reason==="R"||reason==="G"){wiggleClass="livespell_greenwiggle";}
if(!livespell.test.iPhone()){tokens[i]="<span class='"+wiggleClass+"' oncontextmenu='return false' onmousedown='return livespell.insitu.disableclick(event,\""+providerID+"\");' onmouseup=';return livespell.insitu.typoclick(event,\""+id+"\",this,\""+reason+"\",\""+providerID+"\")' >"+(rtoken)+"</span>";}else{tokens[i]="<span class='"+wiggleClass+"' onclick='this.className=\"\"' >"+(token)+"</span>";}}else{tokens[i]=(rtoken);}}
var text=tokens.join('');if(livespell.insitu.proxyDOM(id).hasFocus||livespell.context.isOpen()){this.setProxyHTMLAndMaintainCaret(id,text);}else{this.setProxyHTML(id,text);}}}},init:function(){if(livespell.insitu.initiated)return;livespell.insitu.initiated=true;livespell.context.renderShell()
livespell.events.add(window.document,"mousedown",livespell.context.hideIfNotinUse,false);livespell.events.add(window.document,"keydown",livespell.context.hide,false);livespell.userDict.load();livespell.context.hide();},idcount:0,filterTextAreas:function(Area){var ok=true;if(Area.style.display=="none"){ok=false;}
if(Area.style.visibility=="hidden"){ok=false;}
if(!ok&&Area.hasLiveSpellProxy){ok=true;}
if(Area.disabled){ok=false;}
if(ok){if(!Area.id){Area.id="livespell__textarea__"+livespell.insitu.idcount++}}
return ok;},filterTextInputs:function(Area){if(Area.hasSpellProxy==true){return true;}else if(Area.type.toLowerCase()==="text"&&!Area.disabled&&Area.style.display!=="none"&&Area.style.visibility!=="hidden"){if(!Area.id){Area.id="livespell__input__"+livespell.insitu.idcount++}
Area.hasSpellProxy=true}
return Area.hasSpellProxy},filerEditors:function(elem){if(elem.nodeName.toLowerCase()=="div"){var mydiv=elem;if(mydiv&&(mydiv.getAttribute("contenteditable")==true||mydiv.getAttribute("contenteditable")==="true")){if(!mydiv.id){mydiv.id="livespell_rich_div_editor_id_"+livespell.insitu.idcount++}
if(mydiv.id.indexOf("__livespell_proxy")==-1){return true;}}}
if(elem.nodeName.toLowerCase()=="iframe"){var myFrame=elem;oDoc=livespell.getIframeDocument(myFrame);if(oDoc){if(!myFrame.id){myFrame.id="livespell_rich_editor_id_"+livespell.insitu.idcount++}
return true;}}},focushandler:function(e){var me=e.srcElement?e.srcElement:this;},blurhandler:function(e){var me=e.srcElement?e.srcElement:this;if(!me.unChanged){me.unChanged=true;var base_field_id=me.id.split(livespell.insitu._FIELDSUFFIX)[0];livespell.context.notifyBaseFieldOnChange(base_field_id)}},keypresshandler:function(e){try{if(!e){e=window.event;}}catch(e){}
e.cancelBubble=true;if(e.stopPropagation){e.stopPropagation();}},maxCharsHandlerTimeOutId:null,maxCharsHandler:function(event){var obj=event.srcElement?event.srcElement:this;var maxChars=obj.maxLength;if(!maxChars){return true;}
var o=obj;clearTimeout(livespell.insitu.maxCharsHandlerTimeOutId);livespell.insitu.maxCharsHandlerTimeOutId=setTimeout(function(){livespell.insitu.strictMaxChars(o);},3)
var base_field_id=o.id.split(livespell.insitu._FIELDSUFFIX)[0];var numChars=livespell.insitu.getProxyText(base_field_id).length;if(numChars>=maxChars){try{if(!event){event=window.event;}}catch(e){}
var ch8r=event.keyCode;var hasRange=false;var txt='';try{if(window.getSelection){txt=window.getSelection();}else if(document.getSelection){txt=document.getSelection();}else if(document.selection){txt=document.selection.createRange().text;}}catch(e){}
if(txt+""!=""){hasRange=true;}
if(hasRange||(ch8r==8||ch8r==9||ch8r==46||((ch8r>15&&ch8r<32)||(ch8r>32&&ch8r<41))&&(ch8r!=127))){}else{try{if(!event){event=window.event;}}catch(e){}
if(event.preventDefault){event.preventDefault();}
event.returnValue=false;return false}}
event.returnValue=true;return true},strictMaxChars:function(obj){var base_field_id=obj.id.split(livespell.insitu._FIELDSUFFIX)[0];var text=livespell.insitu.getProxyText(base_field_id);var numChars=text.length;if(numChars>obj.maxLength){obj.setValue(text.substring(0,obj.maxLength))}},keyhandler:function(event){var returnfalse=false;try{if(!event){event=window.event;}}catch(e){}
var ch8r=event.keyCode;if(ch8r>=16&&ch8r<=31){return;}
if(ch8r>=37&&ch8r<=40){return;}
var me=event.srcElement?event.srcElement:this;if(me.oneline&&ch8r>=10&&ch8r<=13){if(event.preventDefault){event.preventDefault();}
event.returnValue=false;return false}
livespell.insitu.ignoreAtCursor();me.unChanged=false;me.hasFocus=true;if(me.autocheck){var base_field_id=me.id.split(livespell.insitu._FIELDSUFFIX)[0];livespell.context.validate(base_field_id)
var ProviderId=Number(me.autocheckProvider);var oProvider=livespell.spellingProviders[ProviderId];clearTimeout(livespell.cache.checkTimeout)
livespell.cache.checkTimeout=setTimeout(function(){livespell.insitu.checkNow(base_field_id,ProviderId)},ch8r==32?10:oProvider.Delay)}
if(returnfalse){return false};},ignoreAtCursor:function(){var target
try{if(window.getSelection){target=window.getSelection().focusNode;if(target.nodeName.toUpperCase()!=="SPAN"){target=target.parentNode;}}else if(document.selection){target=document.selection.createRange().parentElement();}}catch(e){}
if(target&&target.nodeName.toUpperCase()==="SPAN"){target.className="";target.onmousedown=null;}},disableclick:function(event,providerID){var prov=livespell.spellingProviders[providerID];if(prov&&prov.RightClickOnly&&event.button!=2){return true;}
if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}
return false},MacCommandKeyDown:false,typoclick:function(event,oparent,ospan,reason,providerID){var prov=livespell.spellingProviders[providerID];if(prov&&prov.RightClickOnly&&(event.button!=2)){return true;}
if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}
livespell.context.caller=ospan;livespell.context.callerParent=oparent;var parent;var p_walker=ospan;while(!parent){if(p_walker.nodeName.toUpperCase()==="DIV"&&(p_walker.id+"").indexOf(livespell.insitu._FIELDSUFFIX)>-1){parent=p_walker;}else{p_walker=p_walker.parentNode;}}
var id=parent.id.split(this._FIELDSUFFIX)[0];if(!id.length){return false;}
var token=livespell.str.stripTags(ospan.innerHTML);token=livespell.str.normalizeApos(token);var posx=0;var posy=0;if(!event){event=window.event;}
if(event.pageX||event.pageY){posx=event.pageX;posy=event.pageY;}else if(event.clientX||event.clientY){posx=event.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;posy=event.clientY+document.body.scrollTop+document.documentElement.scrollTop;}
posx+=2;posy+=2;if(livespell.test.IE()){posx+=3;posy+=3;}
livespell.context.DOM().className="livespell_contextmenu"
livespell.context.DOM().style.position="absolute";livespell.context.DOM().style.top=posy+"px";livespell.context.DOM().style.left=posx+"px";livespell.context.providerID=providerID;livespell.context.suggest(id,token,reason,ospan);return false;}}
livespell.context={mouseoverme:false,caller:null,callerParent:null,keysTrapped:false,providerID:null,mackeydown:function(event){try{if(!event){event=window.event;}}catch(e){}
if(event.keyCode&&event.keyCode==224){livespell.insitu.MacCommandKeyDown=true;}
return false;},mackeyup:function(){if(livespell.context.MacCommandKeyDown){livespell.insitu.MacCommandKeyDown=false};return false;},validate:function(base_field_id){var oF=document.getElementById(base_field_id);if(!oF||!oF.MessageHolder){return};var proxy=livespell.insitu.proxyDOM(base_field_id);if(!proxy){return}
var wiggles=proxy.getElementsByTagName('SPAN');var isValid=true;if(proxy.innerHTML.indexOf("livespell_")>-1)
for(var i=0;i<wiggles.length;i++){var wig=wiggles[i];if(wig&&wig.className&&(wig.className=="livespell_redwiggle"||wig.className=="livespell_greenwiggle")){if(wig.innerHTML.length>0){isValid=false;}}}
$Spelling.LiveValidateMech4Proxy(oF,isValid)},currentWord:function(){return livespell.context.caller.innerHTML;},provider:function(){return livespell.spellingProviders[this.providerID]},isOpen:function(){if(E$(livespell.insitu._CONTEXTMENU)&&E$(livespell.insitu._CONTEXTMENU).style.display!="none"){return true}
return false;},DOM:function(){return E$(livespell.insitu._CONTEXTMENU);},langInSelection:false,hideIfNotinUse:function(){if(livespell.context.DOM().style.display!="none"){if(!livespell.context.mouseoverme&!livespell.context.langInSelection){livespell.context.hide();}}},hide:function(){if(livespell.context.DOM().style.display!="none"){livespell.context.DOM().style.display="none"}},notifyBaseFieldOnChange:function(base_field_id){var oBase=E$(base_field_id);if(oBase["onchange"]){try{oBase["onchange"]()}catch(e){}}
var event="change";var element=oBase;if(document.createEvent){var evt=document.createEvent("HTMLEvents");evt.initEvent(event,true,true);element.dispatchEvent(evt);}else{try{var evt=document.createEventObject();element.fireEvent('on'+event,evt)}catch(e){}}},change:function(word){this.provider().onChangeWord(this.currentWord(),word);var b=this.base_field_id();try{basefield.insertBefore(document.createTextNode(word),livespell.context.caller);basefield.removeChild(livespell.context.caller);}catch(e){livespell.context.caller.innerHTML=word;livespell.context.caller.onMouseUp=function(){};livespell.context.caller.onMouseDown=function(){};livespell.context.caller.className=" ";}
this.hide();livespell.context.validate(b)
livespell.insitu.updateBase(b);livespell.context.notifyBaseFieldOnChange(b)
try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}},ignore:function(){this.provider().onIgnore(this.currentWord());var p=livespell.context.caller;var b=this.base_field_id();var basefield=livespell.context.caller.parentNode?livespell.context.caller.parentNode:document.getElementById(b)+livespell.insitu._FIELDSUFFIX;livespell.cache.ignore[this.currentWord().toLowerCase()]=true;try{basefield.insertBefore(document.createTextNode(this.currentWord()),livespell.context.caller);basefield.removeChild(livespell.context.caller);}catch(e){livespell.context.caller.onMouseUp=function(){};livespell.context.caller.onMouseDown=function(){};livespell.context.caller.className=" ";}
livespell.context.validate(b)
this.hide();try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}},del:function(){var b=this.base_field_id();var p=livespell.context.caller;var pp=p.parentNode;pp.removeChild(p);this.hide();livespell.insitu.updateBase(b);livespell.context.validate(b)
livespell.context.notifyBaseFieldOnChange(b)
try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}},ignoreAll:function(){var b=this.base_field_id();this.provider().onIgnoreAll(this.currentWord());livespell.cache.ignore[this.currentWord().toLowerCase()]=true;try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}
livespell.insitu.renderProxy(this.base_field_id(),this.providerID);try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}
livespell.context.validate(b)
this.hide();},addPersonal:function(){var b=this.base_field_id();if(this.provider().AddWordsToDictionary=="SERVER"){livespell.ajax.send("SAVEWORD",this.currentWord(),0,0,this.providerID);}
this.provider().onLearnWord(this.currentWord());word=this.currentWord().toLowerCase();livespell.userDict.add(word)
try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}
livespell.insitu.renderProxy(this.base_field_id(),this.providerID);try{E$(b+livespell.insitu._FIELDSUFFIX).focus()}catch(e){}
livespell.context.validate(b)
this.hide();},changeLanguage:function(strLang){if(this.provider().Language==strLang){return}
if(window.getSelection){var sel=window.getSelection()
try{sel.collapseToEnd();}catch(e){}}
this.provider().Language=strLang;this.provider().onChangeLanguage(strLang);var tProv=this.provider();var fn=function(){tProv.CheckInSitu();}
setTimeout(fn,100)
this.hide();},showMultiLang:function(){E$('livepell__multilanguage').style.display="block";var livelangs=livespell.insitu.provider(this.providerID).Language.split(",");for(var i=0;i<livespell.cache.langs.length;i++){E$('livepell__multilanguage_'+livespell.cache.langs[i]).checked=false;for(var j=0;j<livelangs.length;j++){if((livespell.cache.langs[i]===livelangs[j].replace(/^\s\s*/,'').replace(/\s\s*$/,''))){E$('livepell__multilanguage_'+livespell.cache.langs[i]).checked=true;}}}},hideMultiLang:function(){E$('livepell__multilanguage').style.display="none";},base_field_id:function(){if(livespell.context.callerParent){return livespell.context.callerParent.split(livespell.insitu._FIELDSUFFIX)[0]}
var parent=null;var p_walker=livespell.context.caller;while(!parent){if(p_walker.nodeName.toUpperCase()==="DIV"&&(p_walker.id+"").indexOf(livespell.insitu._FIELDSUFFIX)>-1){parent=p_walker;}else{p_walker=p_walker.parentNode;}}
return parent.id.split(livespell.insitu._FIELDSUFFIX)[0];},showMenu:function(id,word,reason,providerID){this.providerID=providerID;this.DOM().style.display="block";var j;var action="REPLACE";var suggs=livespell.cache.suggestions[livespell.spellingProviders[providerID].Language][word];switch(reason){case"B":suggs=[];suggs[0]=livespell.lang.fetch(providerID,"MENU_DELETEBANNED");action="DELETE";break;case"R":suggs=[];suggs[0]=livespell.lang.fetch(providerID,"MENU_DELETEREPEATED");action="DELETE";break;case"G":if(!suggs.length){suggs[0]=word;}
for(j=0;j<suggs.length;j++){suggs[j]=livespell.str.toCaps(suggs[j]);}
break;default:var oCase=livespell.str.getCase(word);if(oCase===2){for(j=0;j<suggs.length;j++){suggs[j]=suggs[j].toUpperCase();}}else if(oCase===1){for(j=0;j<suggs.length;j++){suggs[j]=livespell.str.toCaps(suggs[j]);}}}
if(!suggs.length||suggs[0].length===0){suggs=[];suggs[0]=livespell.lang.fetch(providerID,"MENU_NOSUGGESTIONS");action="IGNORE";}
if(reason==="X"){action="REG"
if(livespell.spellingProviders[providerID].isUniPacked){suggs=new Array("JavaScriptSpellCheck","**Trial**","Please register online","javascriptspellcheck.com");}}
var dsuggs=[];for(j=0;j<suggs.length;j++){dsuggs=livespell.array.safepush(dsuggs,suggs[j]);}
this.render(dsuggs,action,providerID,reason);},setMultiLang:function(){var langboxes=document.getElementById("livepell__multilanguage").getElementsByTagName("input");var checked=[];for(var i=0;i<langboxes.length;i++){var box=langboxes[i];if(box.checked){checked.push(box.value);}}
if(!checked.length){return;}
this.provider().Language=(checked.join(","));this.provider().onChangeLanguage(this.provider().Language);livespell.insitu.checkNow(this.base_field_id(),this.providerID);this.hide();},renderShell:function(){if(E$(livespell.context.DOM())){return;}
var n=document.createElement("div");n.setAttribute("id",livespell.insitu._CONTEXTMENU);document.body.appendChild(n);n.onmouseover=function(){livespell.context.mouseoverme=true;};n.onmouseout=function(){livespell.context.mouseoverme=false;};if(!this.keysTrapped&&livespell.test.IE()){livespell.events.add(document.body,"keydown",this.menukey,false)
this.keysTrapped=true;}},menukey:function(){if(livespell.context.isOpen()){if(event.preventDefault){event.preventDefault();}else{event.returnValue=false;}
return false;}
return true;},css_list:Array(),renderCss:function(strTheme){var idname="__livespell__stylesheet";strTheme=strTheme?strTheme:"classic";if(this.css_list[strTheme]){return;}
var fileref=E$(idname)
if(fileref){fileref.setAttribute("href",livespell.installPath+"themes/"+strTheme+"/context-menu.css");}else{fileref=document.createElement("link");fileref.setAttribute("id",idname);fileref.id=idname;fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href",livespell.installPath+"themes/"+strTheme+"/context-menu.css");document.getElementsByTagName("head")[0].appendChild(fileref);if(livespell.test.IE()){fileref=document.createElement("link");fileref.setAttribute("id",idname);fileref.id=idname;fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href",livespell.installPath+"themes/"+strTheme+"/ieonly.css");document.getElementsByTagName("head")[0].appendChild(fileref);}}
this.css_list[strTheme]=true;},buttonIsHidden:function(strId,providerID){var oProvider=livespell.spellingProviders[providerID];var arrHideButtons=(oProvider.HiddenButtons.split(","))
for(var i=0;i<arrHideButtons.length;i++){var strBtn=arrHideButtons[i];if(strBtn.toLowerCase()===strId.toLowerCase()){return true}}
return false;},render:function(suggs,action,providerID,reason){if(livespell.test.iPhone()){return false;}
var menuHTML='<div id="context__back"><div id="context__front">';menuHTML+='<ul>';var i;for(var j=0;j<suggs.length;j++){switch(action){case"REPLACE":menuHTML+='<li class="ls_sug"><a href="#"  onclick="livespell.context.change(this.innerHTML); return false" >'+suggs[j]+'</a></li>';break;case"IGNORE":menuHTML+='<li class="ls_sug"><a href="#" onclick="livespell.context.ignore(); ; return false" >'+suggs[j]+'</a></li>';break;case"REG":if(livespell.spellingProviders[providerID].isUniPacked){menuHTML+='<li class="ls_sug" ><a href="#"   onclick="window.open(\'http://www.javascriptspellcheck.com/Purchase\');return false;" >'+suggs[j]+'</a></li>';}else if(livespell.spellingProviders[providerID].ServerModel.toLowerCase()=="asp.net"||livespell.spellingProviders[providerID].ServerModel.toLowerCase()=="aspx"){menuHTML+='<li class="ls_sug" ><a href="#"  onclick="window.open(\'http://www.aspnetspell.com/Purchase\');return false;" >'+"ASPNetSpell Trial"+'</a></li>';suggs=[""];}else if(livespell.spellingProviders[providerID].ServerModel.toLowerCase()=="asp"){menuHTML+='<li class="ls_sug" ><a href="#"" onclick="window.open(\'http://www.aspspellcheck.com/purchase\');return false;" >'+"ASPSpellCheck Trial"+'</a></li>';suggs=[""];}else{menuHTML+='<li class="ls_sug" ><a href="#" onclick="window.open(\'http://www.phpspellcheck.com/Purchase\');return false;" >'+"PHPSpellCheck Trial"+'</a></li>';suggs=[""];}
break;case"DELETE":menuHTML+='<li class="ls_sug" ><a href="#" onclick="livespell.context.del(); return false" >'+suggs[j]+'</a></li>';break;}}
menuHTML+='<li class="ls_hr" ><hr /></li>';if(!this.buttonIsHidden("menuIgnore",providerID)&&reason!="B"){menuHTML+='<li><a href="#" onclick="livespell.context.ignore(); return false">'+livespell.lang.fetch(providerID,"MENU_IGNORE")+'</a></li>';}
if(!this.buttonIsHidden("menuIgnoreAll",providerID)&&reason!="B"){menuHTML+='<li><a href="#"  onclick="livespell.context.ignoreAll(); return false">'+livespell.lang.fetch(providerID,"MENU_IGNOREALL")+'</a></li>';}
if((!this.buttonIsHidden("menuAddToDict",providerID)&&reason!="B"&&reason!="E")&&livespell.spellingProviders[providerID].AddWordsToDictionary!="NONE"){menuHTML+='<li><a href="#"  onclick="livespell.context.addPersonal(); return false">'+livespell.lang.fetch(providerID,"MENU_LEARN")+'</a></li>';}
livespell.cache.langs.length
if(livespell.spellingProviders[providerID].ShowLangInContextMenu){menuHTML+='<li class="ls_hr" ><hr /></li>';var doMultipleDict=false
if(livespell.MultipleDictionaries==true&&livespell.MultipleDictionaries){doMultipleDict=true}
if(livespell.spellingProviders[providerID].Language.indexOf(",")>0){livespell.MultipleDictionaries=true;doMultipleDict=true}
if(!doMultipleDict){menuHTML+='<li class="li_lang">';if(true){menuHTML+='<select onblur="livespell.context.langInSelection=false;"  onfocus="livespell.context.langInSelection=true" onchange="livespell.context.langInSelection=false;livespell.context.changeLanguage(this.options[this.selectedIndex].value);"  >';}
for(i=0;i<livespell.cache.langs.length;i++){var strselection=(livespell.cache.langs[i]===livespell.spellingProviders[providerID].Language)?" selected = selected ":"";menuHTML+='<option   '+strselection+' value="'+livespell.cache.langs[i]+'"  >'+livespell.cache.langs[i]+'</option>';}
menuHTML+='</select>';}else{menuHTML+="<li><a href='javascript:livespell.context.showMultiLang()' >"+livespell.lang.fetch(providerID,"MENU_LANGUAGES")+"</a></li>";menuHTML+='<li id="livepell__multilanguage" style="display:none">';if(livespell.cache.langs.length>5){menuHTML+='<div  class="livespell_contextmenu_multilang_container_scroll" >';}else{menuHTML+='<div class="livespell_contextmenu_multilang_container_noscroll" >';}
for(i=0;i<livespell.cache.langs.length;i++){menuHTML+='<label>';menuHTML+='<input type="checkbox" id="livepell__multilanguage_'+livespell.cache.langs[i]+'" value="'+livespell.cache.langs[i]+'" />';menuHTML+=livespell.cache.langs[i];menuHTML+='</label>';menuHTML+='<br/>';}
menuHTML+='</div>';menuHTML+='<input type="button" value="'+livespell.lang.fetch(providerID,"MENU_CANCEL")+'" onclick="livespell.context.hideMultiLang()" /> ';menuHTML+='<input type="button" value="'+livespell.lang.fetch(providerID,"MENU_APPLY")+'" onclick="livespell.context.setMultiLang()" /> ';menuHTML+='</li>';}}
menuHTML+='</ul></div></div>';this.DOM().innerHTML=menuHTML;try{this.boundMenuToScreen();}catch(e){}},boundMenuToScreen:function(){var oscreen=this.DimViewport();var ws=oscreen.width;var hs=oscreen.height;var px=parseInt(this.DOM().style.left.toString().replace("px",""));var py=parseInt(this.DOM().style.top.toString().replace("px",""));scrollx=document.body.scrollLeft+document.documentElement.scrollLeft;scrolly=document.body.scrollTop+document.documentElement.scrollTop;var dmenu=this.DimMenu();var wm=dmenu.width;var hm=dmenu.height;if((hm+py-scrolly)>hs){var gy=hs-hm+scrolly-3;if(gy<0){gy=0}
this.DOM().style.top=gy+"px";}
if((wm+px-scrollx)>ws){var gx=ws-wm+scrollx-3;if(gx<0){gx=0}
this.DOM().style.left=gx+"px";}},DimViewport:function(){var w=0
var h=0;if(typeof(window.innerWidth)=='number'){w=window.innerWidth;h=window.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){w=document.documentElement.clientWidth;h=document.documentElement.clientHeight;}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){w=document.body.clientWidth;h=document.body.clientHeight;}
var o=[];o.width=w;o.height=h;return o;},DimMenu:function(){var o=this.DOM()
var w=0
var h=0;if(typeof(o.innerWidth)=='number'){w=o.innerWidth;h=o.innerHeight;}else if(o.clientWidth||o.clientHeight){w=o.clientWidth;h=o.clientHeight;}
var o=[];o.width=w;o.height=h;return o;},suggest:function(id,word,reason,caller){var Lang=[livespell.spellingProviders[this.providerID].Language]
livespell.cache.suggestionrequest={};if(livespell.cache.suggestions[Lang]&&livespell.cache.suggestions[Lang][word]){return livespell.context.showMenu(id,word,reason,this.providerID);}
livespell.cache.suggestionrequest.id=id;livespell.cache.suggestionrequest.word=word;livespell.cache.suggestionrequest.reason=reason;livespell.cache.suggestionrequest.providerID=this.providerID;livespell.ajax.send("CTXSUGGEST",word,Lang,livespell.cache.langs.length?"":"ADDLANGS",this.providerID);}}
if(document.addEventListener&&navigator&&navigator.userAgent.toUpperCase().indexOf("WINDOWS")>0){if(document.addEventListener){document.addEventListener('click',livespell___FF__clickmanager,true);}}
setup___livespell();}
if(typeof(jQuery)!="undefined"){(function($){$.fn.binSpellCheckFields=function(options){var options=$.extend(livespell$defaults,options);livespell$set(options);var fields=[]
this.each(function(){fields[fields.length]=this;});if(fields.length==0){return true;}
return $Spelling.BinSpellCheckFields(fields);};$.fn.spellAsYouType=function(options){var options=$.extend(livespell$defaults,options);livespell$set(options);var fields=[]
this.each(function(){fields[fields.length]=this;});if(fields.length==0){return true;}
return $Spelling.SpellCheckAsYouType(fields);};$.fn.spellCheckInDialog=function(options){var options=$.extend(livespell$defaults,options);livespell$set(options);var fields=[]
this.each(function(){fields[fields.length]=this;});if(fields.length==0){return true;}
return $Spelling.SpellCheckInWindow(fields);};var livespell$set=function(options){var map=livespell$defaults_map;var alt=livespell$defaults_alt;for(var i=0;i<map.length;i++){$Spelling[map[i]]=options[alt[i]]}}
var livespell$defaults={defaultDictionary:"English (International)",userInterfaceTranslation:"en",showStatisticsScreen:true,submitFormById:"",theme:"modern",caseSensitive:true,checkGrammar:true,ignoreAllCaps:true,ignoreNumbers:true,showThesaurus:true,showLanguagesInContextMenu:true,serverModel:"auto",popUpStyle:"modal"};var livespell$defaults_map=["DefaultDictionary","UserInterfaceTranslation","ShowStatisticsScreen","SubmitFormById","Theme","CaseSensitive","CheckGrammar","IgnoreAllCaps","IgnoreNumbers","ShowThesaurus","ShowLanguagesInContextMenu","ServerModel","PopUpStyle"]
var livespell$defaults_alt=["defaultDictionary","userInterfaceTranslation","showStatisticsScreen","submitFormById","theme","caseSensitive","checkGrammar","ignoreAllCaps","ignoreNumbers","showThesaurus","showLanguagesInContextMenu","serverModel","popUpStyle"]})(jQuery);}