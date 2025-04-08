
function sendMail(){

    var params = {
        name: document.getElementById("name").value,
        name: document.getElementById("email").value,
        name: document.getElementById("subject").value,
        name: document.getElementById("message").value,


    };

}

const serviceID= "service_2uwvzck ";
const templateID="template_bll0k2m"

emailjs.send(serviceID,templateID,params)
.then(
    res=>{
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("subject").value="";
        document.getElementById("message").value="";
        console.log(res);
        alert("Your message send is successfully");

    }   
)
.catch((err)=> console.log(err));