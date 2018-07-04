/*************************************************************

 Javascript 'Fecha'

 Descript:    Este script indica automaticamente el año del
              servidor
			  
 Autor:       Francisco Javier Lopez Acevedo
 e-mail:      lopace@geo.ucm.es  
 Fecha:       7 de agosto de 2011
 Version:     1.0
 URL Web:     http://www.ucm.es/info/petrosed/

*************************************************************/


var mydate=new Date()
var fecha=mydate.getYear()
if (fecha < 1000)
fecha+=1900
document.write(""+fecha+"")