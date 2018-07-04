var ref=document.referrer;var sevisitor;var SE=new Array('web.info.com','search.','del.icio.us/search','soso.com','.yahoo.','/url','/search','.google.','.ask.','.baidu.','.bing.','.aol.','.answers.');for(var source in SE){var match=ref.indexOf(SE[source]);if(match!=-1){sevisitor=true;}}
var alturaWin,alturaDoc;var postsloaded=[];var scrollPost;var pos=antPos=count=0;var enLaComunidad=category="";var currentpost={};function Post(post_id,permalink,post_title,next_post_id,outbrain_sb,post_height,nextposttype){return{post_id,permalink,post_title,next_post_id,nextposttype,outbrain_sb,post_height};};function addPost(post_id,permalink,post_title,next_post_id,outbrain_sb,cat_perma,posttype){alturaDoc=$(document).height();alturaWin=$(window).height();category=cat_perma;currentpost=new Post(post_id,permalink,post_title,next_post_id,outbrain_sb,alturaDoc,posttype);postsloaded.push(currentpost);}
$(document).ready(function(){addPost(phpvars.post_id,phpvars.permalink,phpvars.post_title,phpvars.next_post_id,phpvars.outbrain_sb,phpvars.cat_perma,phpvars.nextposttype);arrancarScroll();checkPatrocinado();checkABPs();if(sevisitor&&!abp){var googlers=$("#googlers").detach();$('.historia p:nth-child(2)').after(googlers);var itemgooglers=$("#googlers");itemgooglers.css({'display':"inline-block"});itemgooglers.find(".adsbygoogle").css({'display':"inline-block"});$(".abp").remove();setTimeout(function(){(adsbygoogle=window.adsbygoogle||[]).push({});},500);}
guardarEnLaComunidad();});function formatDateHPTX(date){return date.substr(8,2)+'/'+ date.substr(5,2)+'/'+ date.substr(2,2)+' - '+ date.substr(11,5);}
function renderResult(result){result.outbrain_sb=currentpost.outbrain_sb;var source=$("#itempost-template").html();var theTemplate=Handlebars.compile(source);result.date=formatDateHPTX(result.date);result.category=category;var theCompiledHtml=theTemplate(result);$(".elcontenido").append(theCompiledHtml);return result;}
function reactivateScroll(result){addPost(result.id,result.link,result.title.rendered,result.next_post_id,currentpost.outbrain_sb,category,result.type);arrancarScroll();}
function renderOutbrain(result){if(target=='desktop'){OBR.extern.researchWidget();}
return result;}
function renderBanners(result){if(!$('body').hasClass('esvip')){bannersAjax(result.id);initPopUps('triggerPopup','popup-noPublicidad');}
return result;}
function logError(error){arrancarScroll();console.log('Looks like there was a problem: \n',error);}
function validateResponse(response){if(!response.ok){throw Error(response.statusText);}
return response;}
function readResponseAsJSON(response){return response.json();}
function fetchJSON(pathToResource){fetch(pathToResource,{headers:{'X-WP-Nonce':phpvars.nonce},credentials:'include'}).then(validateResponse).then(readResponseAsJSON).then(renderResult).then(renderBanners).then(renderOutbrain).then(reactivateScroll).catch(logError);}
function fetchNextPost(){clearInterval(scrollPost);var posttype="posts";if(currentpost.nextposttype!='post'){posttype=currentpost.nextposttype;}
var url=phpvars.root+'wp/v2/'+posttype+'/'+ currentpost.next_post_id;fetchJSON(url);}
$(window).scroll(function(event){didScroll=true;});function arrancarScroll(){scrollPost=setInterval(function(){if(didScroll){hasScrolledSingle();didScroll=false;}},250);}
function hasScrolledSingle(){var st=$(this).scrollTop();if(Math.abs(lastScrollTop- st)<=delta)
return;if(st>lastScrollTop&&st>(alturaDoc-(alturaWin*2))){fetchNextPost();}
if(postsloaded.length>1){antPos=pos;pos=0;for(var i=0;i<postsloaded.length;i++)
{if((i-1)>=0){if(st<postsloaded[i].post_height&&st>postsloaded[i-1].post_height){pos=i;}}}
if(antPos!=pos){var autor=$(".post-"+postsloaded[pos].post_id+" .author__name").text();var categoria=$(".post-"+postsloaded[pos].post_id+" .etiqueta--categoria").text();if(autor.length&&categoria.length){var stateObj={page:postsloaded[pos].permalink};history.pushState(stateObj,null,postsloaded[pos].permalink);document.title=postsloaded[pos].post_title;ga('set','page',location.pathname);ga('send','pageview');trackInGA("post cargado con scroll",location.pathname);_sf_async_config.sections=categoria;_sf_async_config.authors=autor;pSUPERFLY.virtualPage(location.pathname,document.title);}}
if(enLaComunidad.length){enchufarEnLaComunidad();}}
lastScrollTop=st;}
function htmlBanner(divid,lugar){return'<div id="'+divid+'" class="banner '+lugar+'"><div class="triggerPopup"><div>OCULTAR PUBLICIDAD</div></div></div>';}
function enchufarBanner(postID,lugar){$(".banner."+lugar).each(function(index,element){var id=$(this).attr("id");var divid=id+"_num_"+count;var data=htmlBanner(divid,lugar);$(".post-"+postID+" ."+lugar+"."+target).append(data);pushBanner(id,divid);count=count+ 1;return false;});}
function enchufarABP(postID,id,lugar,width,height){$(".banner."+lugar).each(function(index,element){var divid=id+"_num_"+count;var data='<div id="'+divid+'" class="banner '+lugar+' abp" style="display:none;"><div class="publicidad"><div>PUBLICIDAD</div></div><ins class="adsbygoogle" style="display:none;width:'+width+';height:'+height+'" data-ad-client="ca-pub-2712554386520713" data-ad-slot="'+id+'"></ins></div>';$(".post-"+postID+" ."+lugar).append(data);count=count+ 1;return false;});}
function checkABPs(){if(typeof abp!=='undefined'){if(abp){$("#googlers").remove();$(".abp").each(function(){$(this).css({'display':"inline-block"});$(this).find(".adsbygoogle").css({'display':"inline-block"});(adsbygoogle=window.adsbygoogle||[]).push({});$(this).removeClass('abp');});}}}
function pushBanner(id,divid){googletag.cmd.push(function(){var tamanios='[[300,250],[300,600]]';var mapeo=mapRobaATF;if(divid.indexOf("roba_midpage")>0){mapeo=mapRoba_Midpage;}
if(divid.indexOf("mega_atf")>0){tamanios='[[320,100], [320,50], [300,50], [300,100], [728,90],[900,90],[900,250],[950,90],[960,90],[970,90],[970,250],[980,250],[1000,90],[1000,250]]';mapeo=mapMegaATF;}
if(divid.indexOf("single_roba_endpost")>0){tamanios='[[300,250]]';}
var slot1=googletag.defineSlot('/1036009/'+id,tamanios,divid).defineSizeMapping(mapeo).addService(googletag.pubads());googletag.enableServices();googletag.display(divid);googletag.pubads().refresh([slot1]);});}
function bannersAjax(id){var banners=$('.banner');if(banners.length){enchufarBanner(id,'mega_atf');enchufarBanner(id,'roba_ATF');setTimeout(function(){var numparrafos=$(".post-"+id+" .cuerpo .historia p").length;var altoCuerpo=$(".post-"+id+" .cuerpo").height();if((target=='mobile'&&numparrafos>5)||(target=='desktop'&&altoCuerpo>2000)){enchufarBanner(id,'roba_midpage');}
if((target=='mobile'&&numparrafos>7)||target=='desktop'){enchufarBanner(id,'single_roba_endpost');}},1500);}}
function enchufarRobaATF(){if(primerRoba_ATF){var divid=roba_ATF;var data=htmlBanner(divid,'roba_ATF');$(".roba_ATF."+target).append(data);googletag.cmd.push(function(){googletag.display(divid);});if(mostrarRoba_Midpage){var promise=new Promise(function(resolve,reject){numparrafos=enchufarRobaMidpage();if(numparrafos){console.log("roba enchufado");console.log("parrafos: ",numparrafos);resolve(numparrafos);}else{reject(Error("It broke"));}});promise.then(fetchEntreParrafos).catch(logError);}
primerRoba_ATF=false;}}
function enchufarRobaMidpage(){var dividRM=roba_midpage;var dividSE=single_roba_endpost;var enchufarasRM=false;var enchufarasSE=false;var numparrafos=$(".cuerpo .historia p").length;var altoCuerpo=$(".cuerpo").height();if((target=='mobile'&&numparrafos>5)||(target=='desktop'&&altoCuerpo>2000)){var dataRM=htmlBanner(dividRM,'roba_midpage');enchufarasRM=true;}else{var dataRM='<div id="'+dividRM+'" class="banner roba_midpage"></div>';}
if((target=='mobile'&&numparrafos>7)||target=='desktop'){var dataSE=htmlBanner(dividSE,'single_roba_endpost');enchufarasSE=true;}else{var dataSE='<div id="'+dividSE+'" class="banner single_roba_endpost"></div>';}
$(".roba_midpage."+target).append(dataRM);$(".single_roba_endpost."+target).append(dataSE);if(enchufarasRM){googletag.cmd.push(function(){googletag.display(dividRM);});}
if(enchufarasSE){googletag.cmd.push(function(){googletag.display(dividSE);});}
mostrarRoba_Midpage=false;return numparrafos;}
function fetchEntreParrafos(result){console.log("entra en entreparrafos");var dividEP1=roba_entreparrafos_1;var dividEP2=roba_entreparrafos_2;var numparrafos=result;if((numparrafos>=10)){var dataEP1=htmlBanner(dividEP1,'roba_entreparrafos_1');enchufarasEP1=true;if((numparrafos>=14)){var dataEP2=htmlBanner(dividEP2,'roba_entreparrafos_2');enchufarasEP2=true;}}
$(".roba_entreparrafos_1."+target).append(dataEP1);$(".roba_entreparrafos_2."+target).append(dataEP2);if(enchufarasEP1){googletag.cmd.push(function(){googletag.display(dividEP1);});}
if(enchufarasEP2){googletag.cmd.push(function(){googletag.display(dividEP2);});}
console.log("entre párrafos enchufado");}
function checkPatrocinado(){var patrocinado=$('.single-patrocinado');if(patrocinado.length){$('main a').attr('rel','nofollow');return true;}
return false;}
function guardarEnLaComunidad(){if(target=='mobile'){enLaComunidad=$(".discourse_widget").detach();}}
function enchufarEnLaComunidad(){if(target=='mobile'){$('.elcontenido main:first-child() .comunidad').remove();$('.elcontenido main:first-child() .dis_out').prepend(enLaComunidad);enLaComunidad="";}}