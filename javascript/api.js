var employeeCounter = 0;

// Load js functions
$( document ).ready(function() {  
  //loadTable(); 
  loadEmployees();
});

// Data will be loaded through loadEmployees()
// Create the table for the entries
//not used at the moment
function loadTable () {
  $("#newEntry").append('<table id="table"><tr bgcolor="#ccd7d9" style="text-align:center" size="7"><th colspan="4">Manage Entries</th></tr><tr><td>Name</td><td>Last Name</td><td>Email</td><td colspan="3">Phone</td></tr></table>');
}

// Load employees from database
function loadEmployees(){
	
  // GET request to obtain the currently available employees
  $.ajax({
      url: 'http://localhost:8080/api/tutorial/1.0/employees',
      type: 'get',
      contentType: 'application/json',
      accept: "*/*",
      success: function(data){
        for (let i = 0; i < data.length; i++) { 
          employeeCounter += 1;
          $('#tabella').append("<tr><td>" + data[i]["firstName"] + "</td><td>"+ data[i]["lastName"] + "</td><td>" + data[i]["email"] + "</td><td>"+ data[i]["phoneNumber"] + "</td><td><button class=\"del-button\" id=\"" + data[i]["employeeId"] + "\">DELETE</button></tr>");    
        } 
      },
      error: function(errorThrown){
        console.log( errorThrown );
      }
  });
}

// Add new employee entry
// to the database
function addEmployee()
{
  $("#btn-add").click(function() 
  {
	// Get values from HTML table
    var newEmployee = 
    {
      "employeeId" : employeeCounter + 1,
      "firstName" : $("#firstName").val(),
      "lastName" : $("#lastName").val(),
      "email" : $("#email").val(),
      "phoneNumber" : $("#phone").val(),
    };

	// POST request to add a new entry
    $.ajax({
      url: 'http://localhost:8080/api/tutorial/1.0/employees',
      type: 'post',
      contentType: 'application/json',
      data: JSON.stringify(newEmployee),
      accept: '*/*',
      success: function(){
        alert("Successfully added new entry");
        location.reload();
      },
      error: function(errorThrown)
      {
        console.log( errorThrown );
      }
    });
  });
}

// Remove an entry from the
// employee table
function deleteEmployee()
{
  $(".del-button").click( function() 
  {   
    var employeeId =  $('.del-button').attr("employeeId");
    $.ajax({
      url: 'http://localhost:8080/api/tutorial/1.0/employees/' + employeeId,
      type: 'delete',
      contentType: 'application/json',
      data: JSON.stringify(),
      accept: "*/*",
      success: function()
      {
        console.log( 'Employee removed from table' );
        location.reload();
      },
      error: function(errorThrown)
      {
        console.log( errorThrown );
      }
    });
  });

  
}