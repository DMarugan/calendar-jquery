//Array de meses
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
//function para sacar los dias y pintarlos en la tabla
function dibujaCalendario(div){
	var inputValor = $("#"+div).val();
	$("#diasCalendario").html("");
   	var numMes = 0;
    var numDias =0;
    var ayoEstoy = parseInt($("#nombreAyo").text());
    var mesActual = $("#nombreMes").text();
    for(var i=0; i<=meses.length; i++){
		if(mesActual==meses[i]){
			numMes = i;
		}
	}
	//Comprobamos los dias de cada mes
	switch(numMes){
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			numDias = 31;
			break;
		case 1:
			if(ayoEstoy%4==0){
				numDias = 29;
			}else{
				numDias = 28;
			}
			break;
		default:
			numDias=30;
			break;
	}
	$("#diasCalendario").append("<tr>");
	//Declaramos e instanciamos la variables a false
	var esMes = false;
	var esAyo = false;
	
	//ayoEstoy+"-"+numMes+"-01"
	o = numMes+1;
	if(o<10){
		var mesDate = "0"+o;	
	}else{
		mesDate=o;
	}
	
	//Compruebo si el input está vacio, si está vacio le paso la fecha de hoy sino la fehca del input
	if(inputValor.length!=0){
		var fecha = inputValor.split("/");
		var ayoFecha = fecha[2];
		var mesFecha = fecha[1];
		var diaFecha = fecha[0];
		//Sumamos a uno al mes por que empieza en 01 y no en 0.
		var numMes = numMes+1;
	}else{
		var saberFecha = new Date();
		var mesFecha = saberFecha.getMonth();
		var ayoFecha = saberFecha.getFullYear();
		var mesFecha = saberFecha.getMonth();
		var diaFecha = saberFecha.getDate();
		var semFecha = saberFecha.getDay();
	}
	var  fechaNew = new Date(ayoEstoy+"-"+mesDate+"-01");
	var nombreFecha = fechaNew.getDay();
	if(numMes==mesFecha){esMes = true;}
	if(ayoEstoy==ayoFecha){esAyo = true;}
	if(nombreFecha==0){
		nombreFecha=7;
	}
	d=1;
	//Rellenar Huecos vacios
	for(t=1;t<nombreFecha;t++){
		$("#diasCalendario").find('tr:first').append("<td class='vacio'></td>");
		d++;
	}
	for(j=1;j<=numDias;j++){
		diaSem = d;
		//Si hay un día en el input lo marcacmos y pintamos el calendario
		//Si no hay un dia en el input se selecciona el dia de hoy
		if(inputValor.length!=0){
			if(j==diaFecha && esMes==true &&esAyo==true){
				if(d%7==0){
					$("#diasCalendario").find('tr:last').append("<td  class='day selected'><span class='dayWeekEnd'>"+j+"</span></td>")
					$("#diasCalendario").append("</tr><tr>");
				}else{
					$("#diasCalendario").find('tr:last').append("<td class='day selected'><span>"+j+"</span></td>");
				}
			}else{
				if(d%7==0){
					$("#diasCalendario").find('tr:last').append("<td  class='day notSelected'><span class='dayWeekEnd'>"+j+"</span></td>")
					$("#diasCalendario").append("</tr><tr>");
				}else{
					$("#diasCalendario").find('tr:last').append("<td class='day notselected'><span>"+j+"</span></td>");
				}
			}
		}else{
			if(j==diaFecha && esMes==true && esAyo==true){
				if(d%7==0){
					$("#diasCalendario").find('tr:last').append("<td  class='day selected'><span class='dayWeekEnd'>"+j+"</span></td>")
					$("#diasCalendario").append("</tr><tr>");
				}else{
					$("#diasCalendario").find('tr:last').append("<td class='day selected'><span>"+j+"</span></td>");
				}
			}else{
				if(d%7==0){
					$("#diasCalendario").find('tr:last').append("<td  class='day notSelected'><span class='dayWeekEnd'>"+j+"</span></td>")
					$("#diasCalendario").append("</tr><tr>");
				}else{
					$("#diasCalendario").find('tr:last').append("<td class='day notselected'><span>"+j+"</span></td>");
				}
			}
		}
		d++;
	}
	//Cambiar la clase del que se seleccione, más adelante será para coger el día?
	$("#diasCalendario").find('tr').find('td').each(function (e){
		$(this).click(function(){
			e=e+1;
			var diaSelec = $(this).find('span').html();
			var mesSelec = $("#nombreMes").html();
			var ayoSelec = $("#nombreAyo").html();
			for(var i=0; i<=meses.length; i++){
				if(mesSelec==meses[i]){
					numMes = i+1;
				}
			}
			if(numMes<10){
				numMes="0"+numMes;
			}
			$("#"+div).attr( "value", diaSelec+"/"+numMes+"/"+ayoSelec);
			$("#"+div).val( diaSelec+"/"+numMes+"/"+ayoSelec)
			//$("#diasCalendario").find('tr').find('td').removeClass("selected");
			$("#diasCalendario").find('tr').find('td').removeClass("selected").addClass("day notSelected");
			$(this).addClass("active");
			$(this).removeClass().addClass("day selected");
			$("#contenedor").remove();
		});
	});
}
    		//Funcion de crear el calendario
    		function calendario (div, template){
    			var padre = $("#"+div).parent().find("input");
				var inputValor = padre.val();
				var tablaCalendario = "<div id='contenedor' class='container'>";
				tablaCalendario += '<table  id="tablaCalendario" >';//Defino la tabla
    			//Primeracabecera de la tabla
    			tablaCalendario+='<thead><tr><th id="mes" colspan=5><span class="moveCalendar" id="menosMes"> < </span><span '+
    					'id="nombreMes" class="nameMonth"></span><span class="moveCalendar" id="masMes"> > </span>'+
    					'</td><th id="ayo" colspan=2><span class="moveCalendar" id="menosAyo"> < </span><span '+
    					'id="nombreAyo"></span><span class="moveCalendar" id="masAyo"> > </span></td></tr>'
    			//Segunda cabecera de la tabla
    			tablaCalendario +='<tr><th class="laboralDay">Lu</td><th class="laboralDay">Ma</td><th class="laboralDay">'+
    							'Mi</td><th class="laboralDay">Ju</td><th class="laboralDay">Vi</td><th class="weekend">'+
    							'Sa</td><th class="weekend">Do</td></tr></thead>';
    			//Cuerpo de la tabla
    			tablaCalendario += '<tbody id="diasCalendario"></tbody>';
    			tablaCalendario +='</table>';
    			tablaCalendario +='</div>';
    			if($("#contenedor").length==0){
					$("#"+div).after(tablaCalendario);
				}
    			//Comprobamos si el input está vacio
    			//Si está vacio que ponga el mes y año en la tabla
    			//si no que el mes y año del input
				if(inputValor.length==0){
					var cal = new Date();
					$("#nombreMes").html(meses[cal.getMonth()]);
					$("#nombreAyo").html(cal.getFullYear());
				}else{
					var fecha = inputValor.split("/");
					var mesInput = meses[parseInt(fecha[1])-1];
					$("#nombreMes").html(mesInput);
					$("#nombreAyo").html(fecha[2]);

				}
    			dibujaCalendario(div);
				//Funciones para las flechitas de mes y año
				$("#menosAyo").click(function(){
					resta = parseInt($("#nombreAyo").text())-1;
					$("#nombreAyo").html(resta);
					dibujaCalendario(div);
				});
				$("#masAyo").click(function(){
					suma = parseInt($("#nombreAyo").text())+1;
					$("#nombreAyo").html(suma);
					dibujaCalendario(div);
					
				});
				$("#masMes").click(function(){
					var mesActual = $("#nombreMes").text();
					for(var i=0; i<=meses.length; i++){
						if(mesActual==meses[i]){
							$("#nombreMes").html(meses[i+1]);
							if((i+1)>11){

								$("#nombreMes").html(meses[0]);
								suma = parseInt($("#nombreAyo").text())+1;
								$("#nombreAyo").html(suma);
								
							}
						}
					}
					dibujaCalendario(div);
					
				});
				$("#menosMes").click(function(){
					var mesActual = $("#nombreMes").text();
					for(var i=0; i<=meses.length; i++){
						if(mesActual==meses[i]){
							$("#nombreMes").html(meses[i-1]);
							if((i-1)<0){
								$("#nombreMes").html(meses[11]);
								resta = parseInt($("#nombreAyo").text())-1;
								$("#nombreAyo").html(resta);
							}
						}
					}
					dibujaCalendario(div);
				});

    		}


  