var xmlhttp;



function loadXMLDoc(url,cfunc) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=cfunc;
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}



function create_profile(page, type) {
    
    if (type == 0) {
		var str = "page";
	} else {
		var str = "quiz";
    }
    
    loadXMLDoc("http://cobi.dcs.bbk.ac.uk/moodle/local/pe/addlearnerprofile.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location='http://cobi.dcs.bbk.ac.uk/moodle/mod/' + str + '/view.php?id=' + page;
		}
	});
}



function update_ability_level(quiz, page, type) {
	
	if (type == 0) {
		var str = "page";
	} else {
		var str = "quiz";
    }
    
    loadXMLDoc("http://cobi.dcs.bbk.ac.uk/moodle/local/pe/updateabilitylevel.php?quiz=" + quiz,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location='http://cobi.dcs.bbk.ac.uk/moodle/mod/' + str + '/view.php?id=' + page;
		}
	});
}



function log_ability_level(quiz) {
    
    loadXMLDoc("http://cobi.dcs.bbk.ac.uk/moodle/local/pe/abilitylevellog.php?quiz=" + quiz,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            update_ability_level(quiz, page);
		}
	});
}



function provide_hint(quiz, question, divid) {
    
    loadXMLDoc("http://cobi.dcs.bbk.ac.uk/moodle/local/pe/providehint.php?quiz=" + quiz + "&question=" + question,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            document.getElementById(divid).innerHTML = myArr.hint;
		}
	});   
}