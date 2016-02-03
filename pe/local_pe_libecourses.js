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



function get_trailcolour() {
    
    // <form name="myform" onsubmit="setSessionValue()" method="GET" action="http://libecourses.com/moodle/mod/quiz/view.php">
    /* document.getElementById('ifrm').onload = function() {
        // put your awesome code here
    }*/
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/get_session_values.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            if (myArr.trail == "red") {
                $( "input:radio[id='red']" ).attr("checked", "checked");
            } else if (myArr.trail == "black") {
                $( "input:radio[id='black']" ).attr("checked", "checked");
            } else {
                $( "input:radio[id='blue']" ).attr("checked", "checked");
            }
            // myFunction(myArr);
        }
    });
}



function get_wheelsize() {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/get_session_values.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            if (myArr.wheel == "27.5") {
                $( "input:radio[id='27.5']" ).attr("checked", "checked");
            } else {
                $( "input:radio[id='26']" ).attr("checked", "checked");
            }
            // myFunction(myArr);
        }
    });
}



function get_bikespeed() {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/get_session_values.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            document.getElementById("sp").value = myArr.speed;
        }
    });
}



function get_simvalues() {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/get_session_values.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            if (myArr.speed != "") {
                document.getElementById("speed").value = myArr.speed;
            }

            document.getElementById("tr").value = myArr.trail;
            document.getElementById("wh").value = myArr.wheel;
            document.getElementById("sp").value = myArr.speed;
        }
    });
}



function get_all_simvalues() {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/get_session_values.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            if (myArr.trail == "red") {
                $( "input:radio[id='red']" ).attr("checked", "checked");
            } else if (myArr.trail == "black") {
                $( "input:radio[id='black']" ).attr("checked", "checked");
            } else {
                $( "input:radio[id='blue']" ).attr("checked", "checked");
            }
            if (myArr.wheel == "27.5") {
                $( "input:radio[id='27.5']" ).attr("checked", "checked");
            } else {
                $( "input:radio[id='26']" ).attr("checked", "checked");
            }
            if (myArr.speed != "") {
                document.getElementById("speed").value = myArr.speed;
            }

            document.getElementById("tr").value = myArr.trail;
            document.getElementById("wh").value = myArr.wheel;
            document.getElementById("sp").value = myArr.speed;
            // myFunction(myArr);
        }
    });
}


/*
function get_svalues() {

    loadXMLDoc("http://libecourses.com/moodle/local/pe/get_session_values.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            
            return myArr;
            
//            var myObject = new Object();
//            myObject.trail = myArr.trail;
//            myObject.wheel = myArr.wheel;
//            myObject.speed = myArr.speed;
//            return myObject;

        }
    });
        
    var myObject2 = new Object();
    myObject2.trail = xmlhttp.myArr.trail
    myObject2.wheel = xmlhttp.myArr.wheel;
    myObject2.speed = xmlhttp.myArr.speed;
    return myObject2;
    
}
*/


function set_trailcolour() {
    
    var trailcolour = $( "input:radio[name=id]:checked" ).attr("id");
    var pageid = $( "input:radio[name=id]:checked" ).attr("value");
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/set_session_values.php?trail=" + trailcolour,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location="http://libecourses.com/moodle/mod/quiz/view.php?id=" + pageid;
        }
    });
}



function set_wheelsize() {
    
    var wheelsize = $( "input:radio[name=id]:checked" ).attr("id");
    var pageid = $( "input:radio[name=id]:checked" ).attr("value");
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/set_session_values.php?wheel=" + wheelsize,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location="http://libecourses.com/moodle/mod/quiz/view.php?id=" + pageid;
        }
    });
}



function set_bikespeed() {
    
    var trailcolour = document.getElementById("tr").value;
    var wheelsize = document.getElementById("wh").value;
    var bikespeed = document.getElementById("speed").value;
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/set_session_values.php?speed=" + bikespeed,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            start_simulation_no(trailcolour,wheelsize,bikespeed);
        }
    });
}



function set_all_simvalues() {
    
    var trailcolour = $( "input:radio[name=id1]:checked" ).attr("id");
    var wheelsize = $( "input:radio[name=id2]:checked" ).attr("id");
    var bikespeed = document.getElementById("speed").value;
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/set_session_values.php?trail=" + trailcolour + "&wheel=" + wheelsize + "&speed=" + bikespeed,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            start_simulation_no(trailcolour,wheelsize,bikespeed);
        }
    });
}



function start_simulation_no(trail,wheel,speed) {
    
    var pageid;

    switch (trail) {
        case "blue":
            switch (true) {
                case speed<=30:
                    pageid = '840';
                    break;
      
                case speed>30 && speed<=60:
                    pageid = '841';
                    break;
      
                case speed>60:
                    pageid = '842';
                    break;

                default:
                    pageid = '840';
                    break;
            }
            break;

        case "red":
            switch (true) {
                case speed<=30:
                    pageid = '843';
                    break;
      
                case speed>30 && speed<=60:
                    pageid = '844';
                    break;
      
                case speed>60:
                    pageid = '845';
                    break;

                default:
                    pageid = '843';
                    break;
            }
            break;

        case "black":
            switch (true) {
                case speed<=30:
                    pageid = '846';
                    break;
      
                case speed>30 && speed<=60:
                    switch (wheel) {
                        case "26":
                            pageid = '848';
                            break;

                        case "27.5":
                            pageid = '847';
                            break;

                        default:
                            pageid = '848';
                            break;
                    }
                    break;

                case speed>60:
                    pageid = '849';
                    break;

                default:
                    pageid = '846';
                    break;
            }
            break;

        default:
            switch (true) {
                case speed<=30:
                    pageid = '840';
                    break;
      
                case speed>30 && speed<=60:
                    pageid = '841';
                    break;
      
                case speed>60:
                    pageid = '842';
                    break;

                default:
                    pageid = '840';
                    break;
            }
            break;
    }

    window.location="http://libecourses.com/moodle/mod/page/view.php?id=" + pageid;
}



function start_simulation_en() {
    
    var pageid;
    var trail = $( "input:radio[name=id1]:checked" ).attr("id");
    var wheel = $( "input:radio[name=id2]:checked" ).attr("id");
    var speed = document.getElementById("speed").value;

    // var trail = document.getElementById("tr").value;
    // var wheel = document.getElementById("wh").value;
    // var speed = document.getElementById("sp").value;

    switch (trail) {
        case "blue":
            switch (true) {
                case speed<=30:
                    pageid = '548';
                    break;
      
                case speed>30 && speed<=60:
                    pageid = '549';
                    break;
      
                case speed>60:
                    pageid = '550';
                    break;

                default:
                    pageid = '548';
                    break;
            }
            break;

        case "red":
            switch (true) {
                case speed<=30:
                    pageid = '551';
                    break;
      
                case speed>30 && speed<=60:
                    pageid = '552';
                    break;
      
                case speed>60:
                    pageid = '553';
                    break;

                default:
                    pageid = '551';
                    break;
            }
            break;

        case "black":
            switch (true) {
                case speed<=30:
                    pageid = '554';
                    break;
      
                case speed>30 && speed<=60:
                    switch (wheel) {
                        case "26":
                            pageid = '556';
                            break;

                        case "27.5":
                            pageid = '555';
                            break;

                        default:
                            pageid = '556';
                            break;
                    }
                    break;

                case speed>60:
                    pageid = '557';
                    break;

                default:
                    pageid = '554';
                    break;
            }
            break;

        default:
            switch (true) {
                case speed<=30:
                    pageid = '548';
                    break;
      
                case speed>30 && speed<=60:
                    pageid = '549';
                    break;
      
                case speed>60:
                    pageid = '550';
                    break;

                default:
                    pageid = '548';
                    break;
            }
            break;
    }

    window.location="http://libecourses.com/moodle/mod/page/view.php?id=" + pageid;
}



function next_activity(simpage) {

    var pageid;
    var speed = document.getElementById("sp").value;

/*    var sv = get_svalues();
    var trail = sv.trail;
    var wheel = sv.wheel;
    var speed = sv.speed; */
    
    switch (speed) {
        case "10":
            switch (simpage) {
                case 840:
                    pageid = '850';
                    break;

                case 843:
                    pageid = '856';
                    break;

                case 846:
                    pageid = '862';
                    break;
      
                default:
                    pageid = '850';
                    break;
            }
            break;
        
        case "20":
            switch (simpage) {
                case 840:
                    pageid = '851';
                    break;

                case 843:
                    pageid = '857';
                    break;

                case 846:
                    pageid = '863';
                    break;
      
                default:
                    pageid = '850';
                    break;
            }
            break;
        
        case "30":
            switch (simpage) {
                case 840:
                    pageid = '852';
                    break;

                case 843:
                    pageid = '858';
                    break;

                case 846:
                    pageid = '864';
                    break;
      
                default:
                    pageid = '850';
                    break;
            }
            break;
        
        case "40":
            switch (simpage) {
                case 841:
                    pageid = '853';
                    break;

                case 844:
                    pageid = '859';
                    break;

                case 847:
                    pageid = '865';
                    break;
      
                default:
                    pageid = '850';
                    break;
            }
            break;
            
        case "50":
            switch (simpage) {
                case 841:
                    pageid = '854';
                    break;

                case 844:
                    pageid = '860';
                    break;

                case 847:
                    pageid = '866';
                    break;
                
                default:
                    pageid = '850';
                    break;
            }
            break;
        
        case "60":
            switch (simpage) {
                case 841:
                    pageid = '855';
                    break;

                case 844:
                    pageid = '861';
                    break;

                case 847:
                    pageid = '867';
                    break;
                
                default:
                    pageid = '850';
                    break;
            }
            break;
        
        default:
            pageid = '850';
            break;
    }

    window.location="http://libecourses.com/moodle/mod/quiz/view.php?id=" + pageid;
}



function fade_in_text(delaytime1, delaytime2) {
    
    // default parameter values
    delaytime1 = typeof delaytime1 !== 'undefined' ?  delaytime1 : 0;
    delaytime2 = typeof delaytime2 !== 'undefined' ?  delaytime2 : 0;
        
    $('#text1').delay(delaytime1).fadeIn('slow');
    $('#text2').delay(delaytime2).fadeIn('slow');
    
    //$('#text1').delay(6000).fadeIn('slow');
    //$('#text2').delay(12000).fadeIn('slow');
}



function word_expansion(word, divid) {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/wordexpansion.php?word=" + word,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            document.getElementById(divid).innerHTML = myArr.wordexpansion;
//            document.getElementById(divid).value = myArr.wordexpansion;
		}
	});   
}



function create_profile(page) {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/addlearnerprofile.php",function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            window.location='http://libecourses.com/moodle/mod/quiz/view.php?id=' + page;
		}
	});
}



function update_ability_level(quiz, page, type) {
	
	if (type == 0) {
		var str = "page";
	} else {
		var str = "quiz";
    }
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/updateabilitylevel.php?quiz=" + quiz,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            loadXMLDoc("http://libecourses.com/moodle/local/pe/abilitylevellog.php?quiz=" + quiz);
            window.location='http://libecourses.com/moodle/mod/' + str + '/view.php?id=' + page;
		}
	});
}



function log_ability_level(quiz) {
    
    loadXMLDoc("http://libecourses.com/moodle/local/pe/abilitylevellog.php?quiz=" + quiz,function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            update_ability_level(quiz, page);
		}
	});
}