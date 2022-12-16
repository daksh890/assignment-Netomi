// fetch(" https://www.universal-tutorial.com/api/getaccesstoken", {
//   method: "GET",
//   headers: {
//     "api-token":
//       "dXwxEdfszs3LXQc4MZMYUQCMcPaPSLUxwKOXZhidM5m8SRSc7L5ygXYUwvSoF1SNtdA",
//     Accept: "application/json",
//     "user-email": "lakhotiyadk02@gmail.com",
//   },
// })
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

const form = document.querySelector("#form");
const naam = document.querySelector("#name");
const email = document.querySelector("#email");
const mobile = document.querySelector("#mob");
const dob = document.querySelector("#dob");
const states = document.querySelector("#state");
const countrydrop = document.querySelector("#country");

function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}

function ValidateEmail(inputText) {
  var mailformat = /\S+@\S+\.\S+/;
  return mailformat.test(inputText);
}

form.addEventListener("submit", (e) => {
  let messages = [];
  //   e.preventDefault();
  //   console.log(
  //     naam.value,
  //     email.value,
  //     mobile.value,
  //     states.value,
  //     countrydrop.value
  //   );

  if (naam.value == null || naam.value.length < 4 || naam.value.length > 10) {
    // console.log("hi");
    messages.push({ Name: "Name is incorrect." });
  }

  if (!validatePhoneNumber(mobile.value)) {
    messages.push({ "Contact-no": "Mobile number is invalid." });
  }

  if (!ValidateEmail(email.value)) {
    messages.push({ Email: "Email is incorrect" });
  }
  if (countrydrop.value === "") {
    messages.push({ Country: "Please choose country" });
  }
  if (states.value === "") {
    messages.push({ State: "Please choose state." });
  }

  if (messages.length > 0) {
    e.preventDefault();
    window.parent.postMessage(messages, "*");
    // console.log(messages.join(","));
  }
  if (messages.length == 0) {
    e.preventDefault();
    var sucess = [{ Sucess: "All Fields are Valid." }];
    window.parent.postMessage(sucess, "*");
  }
});

const state = (name) => {
  var url = "https://www.universal-tutorial.com/api/states/";
  url += name;

  fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJsYWtob3RpeWFkazAyQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6ImRYd3hFZGZzenMzTFhRYzRNWk1ZVVFDTWNQYVBTTFV4d0tPWFpoaWRNNW04U1JTYzdMNXlnWFlVd3ZTb0YxU050ZEEifSwiZXhwIjoxNjcxMTczODMwfQ.cGk9iZNnZyaypow2HCEBoENa_gFTaFevgw8W_JHHs-M",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let output = '<option value="">--Select State--</option>';
      //   console.log(response);
      response.forEach((element) => {
        output += `<option value="${element.state_name}">${element.state_name}</option>`;
      });
      states.innerHTML = output;
    })
    .catch((err) => console.error(err));
};

const country = () => {
  fetch(" https://www.universal-tutorial.com/api/countries", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJsYWtob3RpeWFkazAyQGdtYWlsLmNvbSIsImFwaV90b2tlbiI6ImRYd3hFZGZzenMzTFhRYzRNWk1ZVVFDTWNQYVBTTFV4d0tPWFpoaWRNNW04U1JTYzdMNXlnWFlVd3ZTb0YxU050ZEEifSwiZXhwIjoxNjcxMTczODMwfQ.cGk9iZNnZyaypow2HCEBoENa_gFTaFevgw8W_JHHs-M",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let output = "<option value=''>Select a country</option>";
      response.forEach((element) => {
        output += `<option value="${element.country_name}">${element.country_name}</option>`;
      });

      countrydrop.innerHTML = output;

      //   console.log(response);
    })
    .catch((err) => console.error(err));
};

document.addEventListener("DOMContentLoaded", () => {
  country();
});

countrydrop.addEventListener("change", (e) => {
  //   console.log("hi");
  //   console.log(e.target.value);
  state(e.target.value);
});
