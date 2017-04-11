populateCityCombo();
var im = new Inputmask("$ 99.999,99", { rightAlign: false, numericInput: true });
im.mask($("#cost"));

$('form').submit(function(event) {
	
	$('form').validate({
        rules: {
            'checkbox': {
                required: true
            },
            'gender': {
                required: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });
	
	// get the form data
	// there are many ways to get this data using jQuery (you can use the class or id also)
	var formData = {
		'name'              : $('input[name=name]').val(),
		'school'             : $('input[name=college]').val(),
		'city_id'             : parseInt($('#selectCidade')[0].options[$('#selectCidade')[0].selectedIndex].value),
		'degree'             : $('#selectDegree')[0].selectedIndex,
		'category'             : $('#selectCategory')[0].selectedOptions[0].text,
		'semesters'             : $('input[name=semesters]').val(),
		'price'             : parseFloat($('input[name=cost]').val().replace("$","").replace(".","").replace(",",".").replace("_",""))		
	};
	
	// process the form
	$.ajax({
		type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
		url         : 'https://mappleapp.herokuapp.com/courses.json', // the url where we want to POST
		data        : formData, // our data object
		dataType    : 'json', // what type of data do we expect back from the server
		crossDomain : true,
		xhrFields: {
			withCredentials: false
		}
	})
		// using the done promise callback
		.done(function(data) {

			// log data to the console so we can see
			swal(
			  'College salvo com sucesso!',
			  'Que tal conferir quanto fica seu Plano Canadá?',
			  'success'
			);
			$('input[name=name]')[0].value = "";
			$('input[name=college]')[0].value = "";
			$('input[name=cost]')[0].value = "";
			// here we will handle errors and validation messages
		});

	// stop the form from submitting the normal way and refreshing the page
	event.preventDefault();
});