var toggleAsideEl = document.querySelector("#toggle-aside");
var bookmarkMenuEl = document.querySelector("#bookmark-menu");
const resultsContainer = document.getElementById("resultContainer");
var bookMarkMenuVisible = false;

toggleAsideEl.addEventListener("click", function () {
  if (bookMarkMenuVisible === false) {
    bookMarkMenuVisible = true;
    bookmarkMenuEl.classList.add("show");
  } else {
    bookmarkMenuEl.classList.remove("show");
    bookMarkMenuVisible = false;
  }
});

function handleSearch() {
  resultsContainer.innerHTML = ""; // clears results

  // get elements by id
  const searchText = document.getElementById("search-input").value;
  const postalCode = document.getElementById("postalcode-input").value;

  // define API url to be called
  const url = `https://dev.virtualearth.net/REST/v1/LocalSearch/?key=Ah61c0NRKEPbyoywTor1uhFT5_Q02-ItAsRbIhTgIezyBGgt_RfBb2PhxNKAn_Oj&type=${searchText}&postalCode=${postalCode}&maxResults=10`;
  
  // start the fetch
  fetch(url)
    .then((response) => response.json()) // convert response to JSON
    .then((data) => {
      if (data.statusCode == 200) { // check status of the API response
        if (
          // if request is success and the response JSON contains resourceSets
          // then check the "estimatedTotal" attribute which contains the number of results found
          // based on the criteria, for example:
          // text: coffee, 98052
          // text: parking, 98109
          // text: parks, 98105
          // checks for the results populated
          data.resourceSets[0] != undefined &&
          data.resourceSets[0] != null &&
          data.resourceSets[0].estimatedTotal > 0
        ) {
          // forEach will loop each item in the array 
          data.resourceSets[0].resources.forEach((element) => {

            // create div parent
            const div1 = document.createElement("div");
            div1.classList.add("resultItem");

            const div2 = document.createElement("div");

            // create label with title
            const title = document.createElement("label");
            title.textContent = element.name;
            title.classList.add("resultTitle");

            div2.appendChild(title);

            // create label with description
            const description1 = document.createElement("label");
            description1.textContent = element.Address.formattedAddress;
            description1.classList.add("resultText");

            // create label with description
            const description2 = document.createElement("label");
            description2.textContent = element.PhoneNumber;
            description2.classList.add("resultText");

            // append all nodes to parent container
            div1.appendChild(div2);
            div1.appendChild(description1);
            div1.appendChild(description2);

            // add html to resultsContainer div
            resultsContainer.appendChild(div1);
          });
        } else {
          alert("No results were found");
        }
      } else if (data.statusCode >= 500) {
        alert("The API returned an error");
      }
    })
    .catch((error) => {
      alert("Something went wrong when calling the API");
    });
}
