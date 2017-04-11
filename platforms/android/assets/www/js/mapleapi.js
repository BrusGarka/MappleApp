populateCollegeCombo();
// populateCityCombo();

$(function () {
    $('#canadaaaaa').on('click', function () {
		calculateCanada();
	});
});


function calculateCanada (){
	//Show Loading
	//getFormsParams
	$("#complete_result")[0].className = "";
	resetCards();
	calculateApi($('#selectCollege')[0].options[$('#selectCollege')[0].selectedIndex].value);
	
	
}

function populateCollegeCombo(){
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: 'https://mappleapp.herokuapp.com/courses.json',
		crossDomain : true,
		success: function( data ) {
			// console.log(data);
			$("#selectCollege").empty();
			
			$.each(data["categories"], function(index, item) {
				var category = item["category"];
				var eita = '<optgroup label="' + category + '">\n';
					$.each(item["courses"], function(key, value) {
						var name = value["combo"];
						var id = value["id"];
						eita += '<option value="' + id + '">' + name + '</option>\n';		
					});			
				$("#selectCollege").append(eita);
			});
					
			$("#selectCollege").selectpicker('refresh');
		}
	});
}


function populateCityCombo(){
	// var param = "";
	// if (paramCollege != ""){
		// param = "?college=" + paramCollege;
	// }		
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: 'https://mappleapp.herokuapp.com/provinces.json',
		crossDomain : true,
		success: function( data ) {
			$("#selectCidade").empty();
	
			$.each(data["provinces"], function(index, item) {
				var province = item["name"];
				var eita = '<optgroup label="' + province + '">\n';
					$.each(item["cities"], function(key, value) {
						var name = value["name"];
						var id = value["id"];
						eita += '<option value="' + id + '">' + name + '</option>\n';		
					});			
				$("#selectCidade").append(eita);
			});
						
			$("#selectCidade").selectpicker('refresh');
		}
	});
}

function calculateApi(collegeId) {
	// var params = "?college=" + collegeIndex + "&=city" + cityIndex + "&=imigrate" + imigrateNumber;
	var courseUrl = 'https://mappleapp.herokuapp.com/courses/' + collegeId + '.json';
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: courseUrl,
		crossDomain : true,
		success: function( data ) {
			console.log(data);
			populateCards(data);
			mensureProjections(cardSum());
			//Remove Loading
			startCounter();
		}
	});
}


function populateCards(data){
	
	$("#passagem")[0].setAttribute("data-price", multiplyPeople(1500.0));
	$("#visto")[0].setAttribute("data-price", multiplyPeople(80.0));
	$("#passaporte")[0].setAttribute("data-price", multiplyPeople(80.0));
	$("#exame")[0].setAttribute("data-price", multiplyPeople(120.0));
	$("#permissao")[0].setAttribute("data-price", 150.0);
	ableInfoBox(cardBrotherInfobox("#visto"));
	ableInfoBox(cardBrotherInfobox("#passagem"));
	ableInfoBox(cardBrotherInfobox("#passaporte"));
	ableInfoBox(cardBrotherInfobox("#exame"));
	ableInfoBox(cardBrotherInfobox("#permissao"));

	
	$("#estudos")[0].setAttribute("data-price", parseFloat(data["price"])/parseInt(data["semesters"])/6);
	$("#estudos")[0].setAttribute("data-semesters", data["semesters"]);
	ableInfoBox(cardBrotherInfobox("#estudos"));
	
	$("#aluguel")[0].setAttribute("data-centro", data["city"]["aluguel_centro"]);
	$("#aluguel")[0].setAttribute("data-fora", data["city"]["aluguel_fora"]);
	$("#aluguel")[0].setAttribute("data-price", data["city"]["aluguel_fora"]);
	ableInfoBox(cardBrotherInfobox("#aluguel"));
	
	$("#energia")[0].setAttribute("data-price", data["city"]["energia"]);
	ableInfoBox(cardBrotherInfobox("#energia"));
	
	$("#mercado")[0].setAttribute("data-price", multiplyMarket(data["city"]["mercado"]));
	ableInfoBox(cardBrotherInfobox("#mercado"));
	
	$("#roupas")[0].setAttribute("data-price", multiplyPeople(data["city"]["roupas"]));
	ableInfoBox(cardBrotherInfobox("#roupas"));
	
	$("#busao")[0].setAttribute("data-price", multiplyPeople(data["city"]["busao"]));
	ableInfoBox(cardBrotherInfobox("#busao"));
		
	$("#restaurante")[0].setAttribute("data-price", multiplyPeople(data["city"]["restaurante"]));
	ableInfoBox(cardBrotherInfobox("#restaurante"));
	
	$("#saude")[0].setAttribute("data-price", multiplyPeople(65.0));
	ableInfoBox(cardBrotherInfobox("#saude"));
	
	$("#mobile")[0].setAttribute("data-api", data["city"]["mobile"]);
	setMobilePrice(100);
	ableInfoBox(cardBrotherInfobox("#mobile"));

	$("#internet")[0].setAttribute("data-price", data["city"]["internet"]);
	ableInfoBox(cardBrotherInfobox("#internet"));
	
	$("#academia")[0].setAttribute("data-price", multiplyPeople(data["city"]["academia"]));
	ableInfoBox(cardBrotherInfobox("#academia"));
	
	$("#role")[0].setAttribute("data-price", multiplyPeople(data["city"]["role"]));
	ableInfoBox(cardBrotherInfobox("#role"));
	
	$("#emprego40")[0].setAttribute("data-price", parseFloat(11.60*21*8).toFixed(2));
	ableInfoBox(cardBrotherInfobox("#emprego40"));
	
	$("#emprego20")[0].setAttribute("data-price", parseFloat(10.90*21*4).toFixed(2));
	ableInfoBox(cardBrotherInfobox("#emprego20"));
	
}

function resetCards(){
	$("#passagem")[0].setAttribute("data-price", "");
	$("#visto")[0].setAttribute("data-price","");
	$("#passaporte")[0].setAttribute("data-price", "");
	$("#exame")[0].setAttribute("data-price", "");
	$("#permissao")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#visto"));
	ableInfoBox(cardBrotherInfobox("#passagem"));
	ableInfoBox(cardBrotherInfobox("#passaporte"));
	ableInfoBox(cardBrotherInfobox("#exame"));
	ableInfoBox(cardBrotherInfobox("#permissao"));

	
	$("#estudos")[0].setAttribute("data-price", "");
	$("#estudos")[0].setAttribute("data-semesters", "");
	ableInfoBox(cardBrotherInfobox("#estudos"));
	
	$("#aluguel")[0].setAttribute("data-centro", "");
	$("#aluguel")[0].setAttribute("data-fora", "");
	$("#aluguel")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#aluguel"));
	
	$("#energia")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#energia"));
	
	$("#mercado")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#mercado"));
	
	$("#roupas")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#roupas"));
	
	$("#busao")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#busao"));
		
	$("#restaurante")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#restaurante"));
	
	$("#saude")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#saude"));
	
	$("#mobile")[0].setAttribute("data-api", "");
	setMobilePrice(0);
	ableInfoBox(cardBrotherInfobox("#mobile"));

	$("#internet")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#internet"));
	
	$("#academia")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#academia"));
	
	$("#role")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#role"));
	
	$("#emprego40")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#emprego40"));
	
	$("#emprego20")[0].setAttribute("data-price", "");
	ableInfoBox(cardBrotherInfobox("#emprego20"));
	
}

function setMobilePrice(minutes){
	var newValue = multiplyPeople(parseFloat($("#mobile")[0].getAttribute("data-api")) * minutes);
	$("#mobile")[0].setAttribute("data-price", newValue.toFixed(2));
}

function multiplyMarket(value){
	return (parseFloat(value)/2 + multiplyPeople(parseFloat(value)/2)).toFixed(2);
}

function multiplyPeople(value){
	return parseInt($("#imigrateNumber").val()) * parseFloat(value); 
}

function cardBrotherInfobox(divPrice) {
	return $(divPrice).parent().parent().children().eq(0)[0];
}

function cardSum(){
	var fixAmount = 0.00;	
	fixAmount += getPrice("aluguel");
	fixAmount += getPrice("energia");
	fixAmount += getPrice("mercado");
	fixAmount += getPrice("roupas");
	fixAmount += getPrice("busao");
	fixAmount += getPrice("restaurante");
	fixAmount += getPrice("saude");
	fixAmount += getPrice("mobile");
	fixAmount += getPrice("internet");
	fixAmount += getPrice("academia");
	fixAmount += getPrice("role");
	return fixAmount;
}

function mensureProjections(fixAmount){		
	$($("#monthTable tbody")[0].rows[0].cells[1]).text("$ " + prepareMoney(-1*getPrice("estudos")));
	
	$($("#monthTable tbody")[0].rows[1].cells[1]).text("$ " + prepareMoney(-1*fixAmount));
	$($("#monthTable tbody")[0].rows[1].cells[2]).text("$ " + prepareMoney(-1*fixAmount));
	
	var salarySchoolPeriod =  getPrice("emprego20") + ((parseInt($("#imigrateNumber").val()) - 1) * getPrice("emprego40"));
	$($("#monthTable tbody")[0].rows[2].cells[1]).text("$ " + prepareMoney(salarySchoolPeriod));
	
	var salaryNonSchoolPeriod =  multiplyPeople(getPrice("emprego40"));
	$($("#monthTable tbody")[0].rows[2].cells[2]).text("$ " + prepareMoney(salaryNonSchoolPeriod));
	
	var totalSchoolValue = salarySchoolPeriod - (getPrice("estudos") + fixAmount);
	$($("#monthTable tfoot")[0].rows[0].cells[1]).text("$ " + prepareMoney(totalSchoolValue));
	
	var totalNonSchoolValue = salaryNonSchoolPeriod - (fixAmount);
	$($("#monthTable tfoot")[0].rows[0].cells[2]).text("$ " + prepareMoney(totalNonSchoolValue));
	
	semestersSum(fixAmount);
}

function prepareMoney(value){
	return parseInt(value.toFixed()).toLocaleString().replace(".", " ");
}

function semestersSum(fixAmount){
	
	var totalCost = 0.00;
	var totalIncome = 0.00;
	var totalNegative = 0.00;
	var semestersStudy = parseInt($("#estudos")[0].getAttribute("data-semesters"));
	
	for (i=0; i <= 5; i++){
		var semesterCost = fixAmount * 6;
		var semesterIncome = 0.00;
		
		if (i <= (semestersStudy - 1)){
			semesterCost += (getPrice("estudos") * 6);
			semesterIncome = (getPrice("emprego20") * 6) + ((parseInt($("#imigrateNumber").val()) - 1) * getPrice("emprego40") * 6);
		}else{
			semesterIncome = multiplyPeople(getPrice("emprego40") * 6);
		}
		setProjecao(i,semesterCost, semesterIncome);
		
		if (semesterIncome - semesterCost < 0){
			totalNegative += semesterIncome - semesterCost;
		}
		
		totalCost += semesterCost;
		totalIncome += semesterIncome;
	}
	
	$($("#semesterTable tfoot")[0].rows[0].cells[1]).text("$ " + parseInt(totalCost.toFixed()).toLocaleString().replace(".", " "));
	$($("#semesterTable tfoot")[0].rows[0].cells[2]).text("$ " + parseInt(totalIncome.toFixed()).toLocaleString().replace(".", " "));
	$($("#semesterTable tfoot")[0].rows[0].cells[3]).text("$ " + parseInt((totalIncome - totalCost).toFixed()).toLocaleString().replace(".", " "));	
	
	mensureTotalPlan(totalNegative);
	
}

function mensureTotalPlan(totalNegative){
	var beforeCanada = -1 * getPrice("passagem") + getPrice("visto") + getPrice("passaporte") + getPrice("exame") + getPrice("permissao");

	var cellBeforeDolar = $("#planTable tbody")[0].rows[0].cells[1];
	$(cellBeforeDolar).text("$ " + parseInt(beforeCanada.toFixed()).toLocaleString().replace(".", " "))

	var cellBeforeReal = $("#planTable tbody")[0].rows[0].cells[2];
	$(cellBeforeReal).text("R$ " + parseInt(convertToReal(beforeCanada).toFixed()).toLocaleString().replace(".", " "))
	
	var cellDuringDolar = $("#planTable tbody")[0].rows[1].cells[1];
	$(cellDuringDolar).text("$ " + parseInt(totalNegative.toFixed()).toLocaleString().replace(".", " "))

	var cellDuringReal = $("#planTable tbody")[0].rows[1].cells[2];
	$(cellDuringReal).text("R$ " + parseInt(convertToReal(totalNegative).toFixed()).toLocaleString().replace(".", " "))
	
	var total = totalNegative + beforeCanada;
	
	var cellTotalDolar = $("#planTable tfoot")[0].rows[0].cells[1];
	$(cellTotalDolar).text("$ " + parseInt((-1*total).toFixed()).toLocaleString().replace(".", " "))

	var cellTotalReal = $("#planTable tfoot")[0].rows[0].cells[2];
	$(cellTotalReal).text("R$ " + parseInt(convertToReal(-1*total).toFixed()).toLocaleString().replace(".", " "))
			
}

function setProjecao(i,semesterCost, semesterIncome){
	var cost = $("#semesterTable tbody")[0].rows[i].cells[1];
	$(cost).text("$ " + parseInt(semesterCost.toFixed()).toLocaleString().replace(".", " "));
	
	var gain = $("#semesterTable tbody")[0].rows[i].cells[2];
	$(gain).text("$ " + parseInt(semesterIncome.toFixed()).toLocaleString().replace(".", " "));
	
	var result = $("#semesterTable tbody")[0].rows[i].cells[3];
	$(result).text("$ " +  parseInt((semesterIncome - semesterCost).toFixed()).toLocaleString().replace(".", " "));
}

function getPrice(element){
	var ovo = "#" + element;
	if (cardBrotherInfobox(ovo).getAttribute("data-enable") === "true"){
		return parseFloat($(ovo)[0].getAttribute("data-price"));
	}
	else {
		return 0.0;
	}
}

function convertToReal(value){
	return value * 2.53;
}
