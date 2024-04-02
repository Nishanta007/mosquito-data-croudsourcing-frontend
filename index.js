let submitForm = document.getElementById("submitForm");
console.log(submitForm);
submitForm.addEventListener("click", function (e) {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let gender = document.getElementById("gender").value;
  let age = document.getElementById("age").value;

  let symptoms = [];
  // get all input type checkbox elements and push to array if checked
  let symptomsInput = document.querySelectorAll('input[type="checkbox"]');
  Array.from(symptomsInput).forEach((elem) => {
    if (elem.checked) {
      symptoms.push(elem.name);
    }
  });

  // get address

  let district = document.getElementById("district").value;
  let state = document.getElementById("state").value;
  let country = document.getElementById("country").value;
  let pincode = document.getElementById("pincode").value;
  let villageOrTown = document.getElementById("villageOrTown").value;
  let latitude='';
  let longitude='';
  const address = {
    villageOrTown,
    district,
    state,
    pincode,
    state,
    country,
    latitude,
    longitude
  };

  let diagnosed = document.getElementById("diagnosed");
  let status = diagnosed.checked ? "diagnosed" : "not-diagnosed";

  let diagnosedWith = "";
  let dateOfDiagnosis = "";
  if (status === "diagnosed") {
    Array.from(document.getElementsByClassName("diagnosedWith")).forEach(
      (disease) => {
        if (disease.checked) diagnosedWith = disease.name;
      }
    );
    dateOfDiagnosis = document.getElementById("date_diagnosed").value;
  }
  // Validate Form
  if (age === "" || gender === "" || symptoms.length === 0 || status === "" || address === ""){
    alert("age, gender, symptoms, status and address are required fields");
    return;
  }
  if(status === "diagnosed" && (diagnosedWith === "" || dateOfDiagnosis === "")){
    alert("date of diagnosis and diagnosed with are required fields");
    return;
  }

  submitForm.disabled = true;
  submitForm.innerHTML = "Submitting...";


  // form endpoint
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("email", email);
  formdata.append("phone", phone);
  formdata.append("gender", gender);
  formdata.append("age", age);
  formdata.append("symptoms", symptoms.toString());
  formdata.append("status", status);
  formdata.append("diagnosedWith", diagnosedWith);
  formdata.append("dateOfDiagnosis", dateOfDiagnosis);
  formdata.append("address", JSON.stringify(address));
  // formdata.append("report", fileInput.files[0], "[PROXY]");

  const requestOptions = {
    method: "POST",
    body: formdata,
    // redirect: "follow",
  };

  let baseUrl1= "https://mosquito-data-croudsourcing.onrender.com";
  let baseUrl2= "http://localhost:5050";
  fetch(
    baseUrl1+"/report/submit",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      submitForm.innerHTML = "Submit";
      alert("Form Submitted Successfully");
    })
    .catch((error) => {
      console.error(error)
      submitForm.disabled = false;
      alert("Error submitting form");
    });
});
