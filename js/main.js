/*global JSON*/
/****************
 *Andrew Helmkamp
 *MiU 1302
 *Javascript file
 ****************/

window.addEventListener("DOMContentLoaded", function() {

	//"Global" Variables
	var highlightedValue = "No",
		hideForm = false;

	//Set Link and Submit Click Events
	var displayLink = getID('display');
	displayLink.addEventListener("click", getData);
	var addLink = getID('add');
	addLink.addEventListener("click", addItem);
	var clearLink = getID('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = getID('submit');
	save.addEventListener("click", validate);

	var slider = getID('priority');
	slider.addEventListener("change", showValue);

	var searchBtn = getID('searchBtn');
	searchBtn.addEventListener("click", getSearch);
	var clearSearchBtn = getID('clearSearchBtn');
	clearSearchBtn.addEventListener("click", clearSearch);

	//getElementById Function
	function getID(x) {
		return document.getElementById(x);
	}

	//Show the current value of the range input


	function showValue() {
		document.getElementById("priorityNum").innerHTML = getID('priority').value;
	}

	function getHighlightedValue() {
		if(getID('highlight').checked) {
			highlightedValue = getID('highlight').value;
		} else {
			highlightedValue = "No";
		}
	}

	function storeData(key) {
		//if there is no key, make a new item. Else update current data
		var id;
		if(!key) {
			id = Math.floor(Math.random() * 1000000001);
		} else {
			id = key;
		}
		//Gather data from form and store in an object
		//Object properties contain array with the form label and value
		getHighlightedValue();
		var item = {};
		item.startDate = ["Start Date:", getID('start').value];
		item.endDate = ["End Date:", getID('end').value];
		item.itemName = ["Item Name:", getID('itemName').value];
		item.category = ["Category:", getID('category').value];
		item.priority = ["Priority:", getID('priority').value];
		item.highlighted = ["Highlighted:", highlightedValue];
		item.comments = ["Comments:", getID('comments').value];

		//Save data into local storage using Stringify
		localStorage.setItem(id, JSON.stringify(item));
		window.location.reload();
		alert("Item Saved");
	}

	function toggleForm() {
		if(hideForm) {
			getID('head').style.display = "none";
			getID('todoForm').style.display = "none";
			getID('display').style.display = "none";
			getID('add').style.display = "inline";
			getID('searchForm').style.display = "block";
		} else {
			// getID('searchForm').style.display = "none";
			getID('todoForm').style.display = "block";
			getID('display').style.display = "inline";
			getID('add').style.display = "none";
			getID('items').style.display = "none";

		}
	}

	function getData() {
		if(localStorage.length >= 1) {
			hideForm = true;
			toggleForm();
			//Write data from local storage to the browser
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id", "items");
			var makeList = document.createElement('ul');
			makeList.setAttribute("id", "mainList");
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);
			getID('items').style.display = "block";
			for(var i = 0; i < localStorage.length; i++) {
				var makeLi = document.createElement('li');
				var linkLi = document.createElement('li');
				makeList.appendChild(makeLi);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				//Convert the value back to an object
				var obj = JSON.parse(value);
				var makeSubList = document.createElement('ul');
				makeLi.appendChild(makeSubList);
				getImage(obj.category[1], makeSubList);
				for(var n in obj) {
					var makeSubLi = document.createElement('li');
					if((obj.highlighted[1] === "Yes")) {
						if(obj.priority[1] === "1") {
							makeSubList.setAttribute("id", "highlightGreen");
						} else if(obj.priority[1] === "2") {
							makeSubList.setAttribute("id", "highlightYellow");
						} else if(obj.priority[1] === "3") {
							makeSubList.setAttribute("id", "highlightRed");
						}
					}
					makeSubList.appendChild(makeSubLi);
					makeSubLi.innerHTML = obj[n][0] + " " + obj[n][1];
					makeSubList.setAttribute("class", obj.category[1]);
					makeSubList.appendChild(linkLi);
				}


				makeItemLinks(localStorage.key(i), linkLi); //Create our edit and delete links for each item
			}
		} else {
			alert("There is no data to display. Test data will be automatically loaded.");
			autoFillData();
		}
	}

	function getImage(catName, makeSubList) {
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImage = document.createElement('img');
		var setSource = newImage.setAttribute("src", "./img/" + catName + "Icon.png");
		newImage.setAttribute("id", "pic");
		imageLi.appendChild(newImage);
	}


	function addItem() {
		hideForm = false;
		toggleForm();
		window.location.reload();
		return false;
	}

	//Add default data


	function autoFillData() {
		//The JSON data used for this is in the json.js file
		for(var n in json) {
			var id = Math.floor(Math.random() * 1000000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	// Make the edit/delete links for each displayed item


	function makeItemLinks(key, linkLi) {
		//add Edit Single Item link
		var editLink = document.createElement('a');
		editLink.setAttribute("class", "editLinks");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Item";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linkLi.appendChild(editLink);

		//add Delete Link
		var deleteLink = document.createElement('a');
		deleteLink.setAttribute("class", "editLinks");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linkLi.appendChild(deleteLink);
	}

	function editItem() {
		//Get data from our item from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		//show form
		hideForm = false;
		toggleForm();

		//populate with current values
		getID('start').value = item.startDate[1];
		getID('end').value = item.endDate[1];
		getID('itemName').value = item.itemName[1];
		getID('category').value = item.category[1];
		getID('priority').value = item.priority[1];
		if(item.highlighted[1] === "Yes") {
			getID('highlight').setAttribute("checked", "checked");
		}
		getID('comments').value = item.comments[1];

		//Remove the initial listener from the input 'save contact' button
		save.removeEventListener("click", storeData);
		//Change the Submit button value to Edit
		getID('submit').value = "Edit Item";
		var editSubmit = getID('submit');
		//Save the key value in this function as a property of the editSubmit event
		editSubmit.key = this.key;
		editSubmit.addEventListener("click", validate);
	}

	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this item?");
		if(ask) {
			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Item has been deleted.");
		} else {
			alert("The item has not been deleted.");
		}
	}

	function clearLocal() {
		var del = confirm("Are you sure you want to delete all data?");
		if((del) && (localStorage.length >= 1)) {
			localStorage.clear();
			alert("All data has been cleared.");
			window.location.reload();
			return false;
		} else {
			alert("There is no data to clear.");
		}
	}

	function validate(e) {
		//Define the elements we want to check
		var getStartDate = getID('start');
		var getEndDate = getID('end');
		var getItemName = getID('itemName');
		var errMsg = getID('errors');

		//Reset error messages
		errMsg.innerHTML = "";
		getStartDate.style.border = "1px solid black";
		getEndDate.style.border = "1px solid black";
		getItemName.style.border = "1px solid black";

		//Check for errors
		var aMessages = [];

		if(getStartDate.value === "") {
			var startDateError = "When do you plan on starting this task?";
			getStartDate.style.border = "1px solid red";
			aMessages.push(startDateError);
		}

		if(getEndDate.value === "") {
			var endDateError = "When do you plan on finishing this task?";
			getEndDate.style.border = "1px solid red";
			aMessages.push(endDateError);
		}

		if(getItemName.value === "") {
			var itemNameError = "What task are you trying to schedule?";
			getItemName.style.border = "1px solid red";
			aMessages.push(itemNameError);
		}

		//If errors, display them
		if(aMessages.length >= 1) {
			var j = aMessages.length;

			for(var i = 0; i < j; i++) {
				var txt = document.createElement('li');
				txt.innerHTML = aMessages[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		} else {
			//this.key value was passed through the editSubmit event listner as a property
			storeData(this.key);
		}

	}

	function getSearch() {
		var category = getID('searchCategory').value;
		var term = getID('searchWord').value;
		var len = localStorage.length,
			key, value, obj;
		//Searching by Category Only
		if(term === "") {
			for(var i = 0; i < len; i++) {
				key = localStorage.key(i);
				value = localStorage.getItem(key);
				obj = JSON.parse(value);

				if(category === obj.category[1]) {
					if(category === "Work") {
						$('.Work').show(300);
						$('ul').not('ul#mainList').not('.' + category).hide(300);
					}

					if(category === "School") {
						$('.School').show(300);
						$('ul').not('ul#mainList').not('.' + category).hide(300);
					}

					if(category === "Personal") {
						$('.Personal').show(300);
						$('ul').not('ul#mainList').not('.' + category).hide(300);
					}
				}
			}
		}

		//Searching by Category and Term
		if((category !== "") && (term !== "")) {
			for(var j = 0; j < len; j++) {
				key = localStorage.key(j);
				value = localStorage.getItem(key);
				obj = JSON.parse(value);
				for(var n in obj) {
					if((term === obj[n][1]) && (category === obj.category[1])) {
						$('ul').not('ul#mainList').not(':contains(' + term + ')').hide(300);
					}
				}
			}
		}
	}

	//Show all <ul> elements after a search
	function clearSearch () {
		$('ul:hidden').show();
	}

});