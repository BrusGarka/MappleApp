$(function () {
    $('.js-sweetalert div').on('click', function () {
        var type = $(this).data('type');
        if (type === 'basic') {
            showBasicMessage();
        }
        else if (type === 'with-title') {
            showWithTitleMessage();
        }
        else if (type === 'success') {
            showSuccessMessage();
        }
        else if (type === 'confirm') {
            showConfirmMessage();
        }
        else if (type === 'cancel') {
            showCancelMessage();
        }
        else if (type === 'with-custom-icon') {
            showWithCustomIconMessage();
        }
        else if (type === 'html-message') {
            showHtmlMessage();
        }
        else if (type === 'autoclose-timer') {
            showAutoCloseTimerMessage();
        }
        else if (type === 'prompt') {
            showPromptMessage();
        }
        else if (type === 'ajax-loader') {
            showAjaxLoaderMessage();
        }
		else if (type === 'able-infobox'){
			ableInfoBox(this);
		}
		else if (type === 'edit-card'){
			showHtmlMessage();
		}
		else if (type === 'edit-aluguel'){
			showAluguelBox(this);
		}
		else if (type === 'edit-mobile'){
			showMobileBox(this);
		}
		else if (type === 'edit-academia'){
			showAcademiaBox(this);
		}
    });
});

//These codes takes from http://t4t5.github.io/sweetalert/

function ableInfoBox(div) {
	var brotherDiv = $(div).parent().children().eq(1).children().eq(1);
		
	if (div.getAttribute("data-enable") == "true"){
		var lastIndex = div.className.lastIndexOf(" ");
		div.className = div.className.substring(0, lastIndex);
		div.setAttribute("data-enable","false");
		restartCounter(brotherDiv, brotherDiv.text().replace("$",""),0);
	} else {
		div.className = div.className + " " + div.getAttribute("data-color");
		div.setAttribute("data-enable","true");
		restartCounter(brotherDiv, 0, brotherDiv[0].getAttribute("data-price"));
	}
	mensureProjections(cardSum());
}

function showBasicMessage() {
    swal("Here's a message!");
}

function showWithTitleMessage() {
    swal("Here's a message!", "It's pretty, isn't it?");
}

function showSuccessMessage() {
    swal("Good job!", "You clicked the button!", "success");
}

function showConfirmMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    }, function () {
        swal("Deleted!", "Your imaginary file has been deleted.", "success");
    });
}

function showCancelMessage() {
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: false,
        closeOnCancel: false
    }, function (isConfirm) {
        if (isConfirm) {
            swal("Deleted!", "Your imaginary file has been deleted.", "success");
        } else {
            swal("Cancelled", "Your imaginary file is safe :)", "error");
        }
    });
}

function showWithCustomIconMessage() {
    swal({
        title: "Sweet!",
        text: "Here's a custom image.",
        imageUrl: "../../images/thumbs-up.png"
    });
}

function showHtmlMessage() {
    swal({
        title: "HTML <small>Title</small>!",
		text: "<div class='input-group spinner' data-trigger='spinner'>                                        <div class='form-line'>                                            <input type='text' class='form-control text-center' value='1' data-rule='quantity'>                                        </div>                                        <span class='input-group-addon'>                                            <a href='javascript:;' class='spin-up' data-spin='up'><i class='glyphicon glyphicon-chevron-up'></i></a>                                            <a href='javascript:;' class='spin-down' data-spin='down'><i class='glyphicon glyphicon-chevron-down'></i></a>                                        </span>                                    </div>",
        html: true
    });
}

function showAutoCloseTimerMessage() {
    swal({
        title: "Auto close alert!",
        text: "I will close in 2 seconds.",
        timer: 2000,
        showConfirmButton: false
    });
}

function showPromptMessage() {
    swal({
        title: "An input!",
        text: "Write something interesting:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Write something"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("You need to write something!"); return false
        }
        swal("Nice!", "You wrote: " + inputValue, "success");
    });
}

function showAjaxLoaderMessage() {
    swal({
        title: "Ajax request example",
        text: "Submit to run ajax request",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    }, function () {
        setTimeout(function () {
            swal("Ajax request finished!");
        }, 2000);
    });
}

function showAluguelBox(div){
	if (validateEnableCard(div)) return;
	
	var brotherDiv = $(div).parent().children().eq(1).children().eq(1);
	var old = brotherDiv[0].getAttribute("data-price");;
	var newValue;
	
	swal({
	  title: 'Selecione o tipo do aluguel',
	  input: 'select',
	  inputOptions: {
		'centro' : 'Região central',
		'fora' : 'Afastado do centro'
	  },
	  inputPlaceholder: 'Localização',
	  showCancelButton: true,
	  inputValidator: function (value) {
		return new Promise(function (resolve, reject) {
		  if (value != '') {
			newValue = brotherDiv[0].getAttribute("data-" + value);
			brotherDiv[0].setAttribute("data-price", newValue);
			resolve();
		  } else {
			reject('Selecione algo queridão. =)')
		  }
		})
	  }
	}).then(function () {
		swal({
			type: 'success',
			html: prepareMessage(old, newValue, "Aluguel economizado", "Aluguel encarecido")
		}).then(function (){ 	  
			restartCounter(brotherDiv, old, newValue);
			mensureProjections(cardSum());
		});
	});	
	
}

function showMobileBox(div){
	if (validateEnableCard(div)) return;
	
	var brotherDiv = $(div).parent().children().eq(1).children().eq(1);
	var old = brotherDiv[0].getAttribute("data-price");;
	var newValue;
	
	swal({
	  title: 'Quantos minutos gastos em ligação por pessoa?',
	  input: 'text',
	  inputPlaceholder: '100',
	  showCancelButton: true,
	  inputValidator: function (value) {
		return new Promise(function (resolve, reject) {
		  if (value) {
			newValue = parseFloat(brotherDiv[0].getAttribute("data-api")) * multiplyPeople(value);
			brotherDiv[0].setAttribute("data-price", newValue);
			resolve();
		  } else {
			reject('Digite os minutos gastos queridão. =)')
		  }
		})
	  }
	}).then(function () {
		swal({
			type: 'success',
			html: prepareMessage(old, newValue, "Franquia de celular economizada", "Franquia de celular encarecida")
		}).then(function (){ 	  
			restartCounter(brotherDiv, old, newValue);
			mensureProjections(cardSum());
		});
	});	
	
}

function showAcademiaBox(div){
	if (validateEnableCard(div)) return;
	
	var brotherDiv = $(div).parent().children().eq(1).children().eq(1);
	var old = brotherDiv[0].getAttribute("data-price");;
	var newValue;
	
	swal({
	  title: 'Quantas pessoas farão academia?',
	  input: 'text',
	  inputPlaceholder: '1',
	  showCancelButton: true,
	  inputValidator: function (value) {
		return new Promise(function (resolve, reject) {
		  if (value) {
			newValue = parseFloat(brotherDiv[0].getAttribute("data-api")) * value;
			brotherDiv[0].setAttribute("data-price", newValue);
			resolve();
		  } else {
			reject('Digite os minutos gastos queridão. =)')
		  }
		})
	  }
	}).then(function () {
		swal({
			type: 'success',
			html: prepareMessage(old, newValue, "Academia economizada", "Academia encarecida")
		}).then(function (){ 	  
			restartCounter(brotherDiv, old, newValue);
			mensureProjections(cardSum());
		});
	});	
	
}
function validateEnableCard(div){
	var enableDiv = $(div).parent().children().eq(0);
	if (enableDiv[0].getAttribute("data-enable") == "false"){
		swal('Oops, cartão desativado!',
		  'Para editar esse cartão, ative-o primeiro clicando em seu ícone. =)',
		  'warning'
		);
		return true;
	}
	return false;
}

function prepareMessage(old, newValue, okay, nop){
	var diff = (parseFloat(old) - parseFloat(newValue))
	if (diff >= 0 ){
		return okay + " em: <b style='color:#4CAF50;'>$ " + diff.toFixed(2) + "</b>"
	}else{
		return nop + " em: <b style='color:#F44336;'>$ " + diff.toFixed(2) + "</b>"
	}
}