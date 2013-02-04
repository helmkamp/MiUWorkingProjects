// The base code was found on the jQuery Mobile Docs site
// It was then edited to fit my needs
// Load the data for a specific category, based on
// the URL passed in. Generate markup for the items in the
// category, inject it into an embedded page, and then make
// that page the current active page.

function showCategory(urlObj, options) {
	var categoryName = urlObj.hash.replace(/.*category=/, ""),

		// The pages we use to display our content are already in
		// the DOM. The id of the page we are going to write our
		// content into is specified in the hash before the '?'.
		pageSelector = urlObj.hash.replace(/\?.*$/, "");

	if(localStorage) {
		// Get the page we are going to dump our content into.
		var $page = $(pageSelector),

			// Get the header for the page.
			$header = $page.children(":jqmData(role=header)"),

			// Get the content area element for the page.
			$content = $page.children(":jqmData(role=content)"),

			// The markup we are going to inject into the content
			// area of the page.
			markup = "<ul id='categoryView' data-role='listview' data-inset='true' data-filter='true'>";

		// The number of items in the category.
		var numItems = localStorage.length,
			key, value, obj,
			objArray = [];

		if(categoryName === "Priority") {

			// Take each object from localStorage and push it into an array
			for(var k = 0; k < numItems; k++) {
				key = localStorage.key(k);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);
				objArray.push(obj);
			}

			// Sort the items by priority from 1 to 3
			objArray.sort(function(a, b) {
				return a.priority[1] - b.priority[1];
			});

			for(var i = 0; i < objArray.length; i++) {
				markup += "<li><h1>" + objArray[i].itemName[1] + "</h1>";
				markup += "<p>" + objArray[i].startDate[0] + " " + objArray[i].startDate[1] + "</p>";
				markup += "<p>" + objArray[i].endDate[0] + " " + objArray[i].endDate[1] + "</p>";
				markup += "<p>" + objArray[i].category[0] + " " + objArray[i].category[1] + "</p>";
				markup += "<p>" + objArray[i].priority[0] + " " + objArray[i].priority[1] + "</p>";
				markup += "<p>" + objArray[i].comments[0] + " " + objArray[i].comments[1] + "</p>";
				markup += "</li>";
			}
		} else if(categoryName === "All") {
			// The object of items for this category.
			for(var a = 0; a < numItems; a++) {
				key = localStorage.key(a);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				// Generate a list item for each item in the category
				// and add it to our markup.
				markup += "<li><h1>" + obj.itemName[1] + "</h1>";
				markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
				markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
				markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
				markup += "<p>" + obj.highlighted[0] + " " + obj.highlighted[1] + "</p>";
				markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
				markup += "</li>";
			}
		} else if(categoryName === "Start Date") {
			// Take each object from localStorage and push it into an array
			for(var p = 0; p < numItems; p++) {
				key = localStorage.key(p);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				objArray.push(obj);
			}

			// Sort the items by start date
			objArray.sort(function(a, b) {
				var aDate = a.startDate[1].replace(/-/g, "");
				var bDate = b.startDate[1].replace(/-/g, "");
				return aDate - bDate;
			});

			for(var s = 0; s < objArray.length; s++) {
				markup += "<li><h1>" + objArray[s].itemName[1] + "</h1>";
				markup += "<p>" + objArray[s].startDate[0] + " " + objArray[s].startDate[1] + "</p>";
				markup += "<p>" + objArray[s].endDate[0] + " " + objArray[s].endDate[1] + "</p>";
				markup += "<p>" + objArray[s].priority[0] + " " + objArray[s].priority[1] + "</p>";
				markup += "<p>" + objArray[s].highlighted[0] + " " + objArray[s].highlighted[1] + "</p>";
				markup += "<p>" + objArray[s].comments[0] + " " + objArray[s].comments[1] + "</p>";
				markup += "</li>";
			}
			
		} else if(categoryName === "End Date") {
			// Take each object from localStorage and push it into an array
			for(var b = 0; b < numItems; b++) {
				key = localStorage.key(b);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				objArray.push(obj);
			}

			// Sort the items by start date
			objArray.sort(function(a, b) {
				var aDate = a.endDate[1].replace(/-/g, "");
				var bDate = b.endDate[1].replace(/-/g, "");
				return aDate - bDate;
			});

			for(var s = 0; s < objArray.length; s++) {
				markup += "<li><h1>" + objArray[s].itemName[1] + "</h1>";
				markup += "<p>" + objArray[s].startDate[0] + " " + objArray[s].startDate[1] + "</p>";
				markup += "<p>" + objArray[s].endDate[0] + " " + objArray[s].endDate[1] + "</p>";
				markup += "<p>" + objArray[s].priority[0] + " " + objArray[s].priority[1] + "</p>";
				markup += "<p>" + objArray[s].highlighted[0] + " " + objArray[s].highlighted[1] + "</p>";
				markup += "<p>" + objArray[s].comments[0] + " " + objArray[s].comments[1] + "</p>";
				markup += "</li>";
			}
		} else {

			// The object of items for this category.
			for(var j = 0; j < numItems; j++) {
				key = localStorage.key(j);
				value = localStorage.getItem(key);
				obj = $.parseJSON(value);

				// Generate a list item for each item in the category
				// and add it to our markup.
				if(categoryName === obj.category[1]) {
					markup += "<li><h1>" + obj.itemName[1] + "</h1>";
					markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
					markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
					markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
					markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
					markup += "</li>";
				}

				if((categoryName === "Highlighted Red") && (obj.highlighted[1] === "Yes")) {
					if(obj.priority[1] === "3") {
						markup += "<li><h1>" + obj.itemName[1] + "</h1>";
						markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
						markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
						markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
						markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
						markup += "</li>";
					}
				}

				if((categoryName === "Highlighted Yellow") && (obj.highlighted[1] === "Yes")) {
					if(obj.priority[1] === "2") {
						markup += "<li><h1>" + obj.itemName[1] + "</h1>";
						markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
						markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
						markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
						markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
						markup += "</li>";
					}
				}

				if((categoryName === "Highlighted Green") && (obj.highlighted[1] === "Yes")) {
					if(obj.priority[1] === "1") {
						markup += "<li><h1>" + obj.itemName[1] + "</h1>";
						markup += "<p>" + obj.startDate[0] + " " + obj.startDate[1] + "</p>";
						markup += "<p>" + obj.endDate[0] + " " + obj.endDate[1] + "</p>";
						markup += "<p>" + obj.priority[0] + " " + obj.priority[1] + "</p>";
						markup += "<p>" + obj.comments[0] + " " + obj.comments[1] + "</p>";
						markup += "</li>";
					}
				}
			}
		}

		markup += "</ul>";



		// Find the h1 element in our header and inject the name of
		// the category into it.
		$header.find("h1").html(categoryName);

		// Inject the category items markup into the content element.
		$content.html(markup);

		// Pages are lazily enhanced. We call page() on the page
		// element to make sure it is always enhanced before we
		// attempt to enhance the listview markup we just injected.
		// Subsequent calls to page() are ignored since a page/widget
		// can only be enhanced once.
		$page.page();

		// Enhance the listview we just injected.
		$content.find(":jqmData(role=listview)").listview();

		// We don't want the data-url of the page we just modified
		// to be the url that shows up in the browser's location field,
		// so set the dataUrl option to the URL for the category
		// we just loaded.
		options.dataUrl = urlObj.href;

		// Now call changePage() and tell it to switch to
		// the page we just modified.
		$.mobile.changePage($page, options);
	}
}

// Listen for any attempts to call changePage().
$(document).bind("pagebeforechange", function(e, data) {

	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if(typeof data.toPage === "string") {

		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl(data.toPage),
			re = /^#browse-by/;

		if(u.hash.search(re) !== -1) {

			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			showCategory(u, data.options);

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
	}
});