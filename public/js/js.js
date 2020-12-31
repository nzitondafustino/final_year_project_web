function update(event){
    console.log(devices);
    var serialNumber = event.target.parentNode.parentNode.parentNode.textContent.trim().split(' ')[0];
    var sensor = devices.filter((device)=>{
        return device.SN.trim() == serialNumber.trim();
    })
        $('#SNu').val(sensor[0].SN);
        $('#locationu').val(sensor[0].location);
        var updateForm = document.getElementById('updateForm');
        updateForm.setAttribute('action','/admin/update-device/' + sensor[0]._id);
  }

function view(event){
 var serialNumber = event.target.parentNode.parentNode.parentNode.textContent.trim().split(' ')[0];
 var sensor = devices.filter((device)=>{
     return device.SN.trim() == serialNumber.trim();
 })
        $('#SN').html('Serial Number: ' + sensor[0].SN);
        $('#VWC').html('VWC: ' + sensor[0].VWC + "(m<sup>3</sup>/m<sup>3</sup>)");
        $('#tempetature').html('temperature: ' + sensor[0].temperature + "<sup>o</sup>C");
        $('#EC').html('Elctrical conductivity: ' + sensor[0].EC + "uS/cm");
        $('#location').html('Loacation: ' + sensor[0].location);
}
function deleteDevice(event){
    var serialNumber = event.target.parentNode.parentNode.parentNode.textContent.trim().split(' ')[0];
    var sensor = devices.filter((device)=>{
        return device.SN.trim() == serialNumber.trim();
    })
    var deleteForm = document.getElementById('deleteForm');
    deleteForm.setAttribute('action','/admin/delete-device/' + sensor[0]._id);
}
function viewUser(event){
    var email =  event.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
    var user = users.filter(user=>{
       return user.email.trim() == email.trim();
    })
    $('#first').html('First Name: ' + user[0].first_name);
    $('#last').html('Last Name: ' + user[0].last_name);
    $('#email').html('E-mail: ' + user[0].email);
    $('#role').html((user[0].role==1)?"Role: Admin":"Role: Normal");
}
function updateUser(event){
    var email =  event.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
    var user = users.filter(user=>{
       return user.email.trim() == email.trim();
    });
    var updateForm = document.getElementById('updateForm');
    updateForm.setAttribute('action','/admin/update-user/' + user[0]._id);
    $('#firstu').val(user[0].first_name);
    $('#lastu').val( user[0].last_name);
    $('#emailu').val(user[0].email);
}
function deleteUser(){
    var email =  event.target.parentNode.parentNode.parentNode.childNodes[5].innerHTML;
    var user = users.filter(user=>{
        return user.email.trim() == email.trim();
     });
    var deleteForm = document.getElementById('deleteForm');
    deleteForm.setAttribute('action','/admin/delete-user/' + user[0]._id);

}
    $(document).ready(function(){
        $('.sidenav').sidenav();
      });
           