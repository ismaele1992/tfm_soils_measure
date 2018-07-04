/*************************************************************

 Javascript 'Encabezado2_0'

 Descript:    Nivel 3, carbonatos
 			  Encabezado con imagenes de rocas de tipo:
			    - Carbonaticas      (encabezado_car_XX.jpg)
              		  
 Autor:       Francisco Javier Lopez Acevedo
 e-mail:      lopace@geo.ucm.es  
 Fecha:       7 de agosto de 2011
 Version:     1.0
 URL Web:     http://www.ucm.es/info/petrosed/

*************************************************************/


function VecImagenes()
	
	{
	n=0;
		this[n++]="../../img/encabezados/encabezado_car_01.jpg";
		this[n++]="../../img/encabezados/encabezado_car_02.jpg";
		this[n++]="../../img/encabezados/encabezado_car_03.jpg";
		this[n++]="../../img/encabezados/encabezado_car_04.jpg";
		this[n++]="../../img/encabezados/encabezado_car_05.jpg";
		this.N=n;
	}
	
	var Imagenes=new VecImagenes();
	src= Imagenes[ Math.floor(Math.random() * Imagenes.N) ] ;
	document.write("<img src="+src+">");