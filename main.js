/javascript
//wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function () {

    function $(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }

    function getTats() {
        var formTag = document.getElementsByTagName("form"),
            selectLi = $('dropDown'),
            makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "groups");
        for (var i = 0, j = styleGroups.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optText = styleGroups[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }


    function getSelectedRadio() {
        var radios = document.forms[0].sex;
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                sexValue = radios[i].value;
            }
        }
    }

    function toggleControls(n) {
        switch (n) {
            case "on":
                $('itemForm')
                    .style.display = "none";
                $('clearData')
                    .style.display = "inline";
                $('displayData')
                    .style.display = "none";
                $('addNew')
                    .style.display = "inline";
                break;
            case "off":
                $('itemForm')
                    .style.display = "block";
                $('clearData')
                    .style.display = "inline";
                $('displayData')
                    .style.display = "inline";
                $('addNew')
                    .style.display = "none";
                $('items')
                    .style.display = "none";
                break;
            default:
                return false;

        }
    }


    function storeData(key) {
        if (!key) {
            var id = Math.floor(Math.random() * 1000000001);
        } else {
            id = key;
        }
        getSelectedRadio();
        var item = {};
        item.style = ["Style:", $('groups').value];
        item.fname = ["First Name:", $('fname').value];
        item.lname = ["Last Name:", $('lname').value];
        item.email = ["Email:", $('email').value];
        item.sex = ["Sex:", sexValue];
        item.url = ["Website:", $('url').value];
        item.date = ["Date:", $('date').value];
        item.pain = ["Pain Tolerance:", $('pain').value];
        item.comment = ["Comments:", $('comments').value];

        localStorage.setItem(id, JSON.stringify(item));
        alert("Tattoo Appointment Made!");
    }

    function getData() {
        toggleControls("on");
        if (localStorage.length === 0) {
            alert("There are no items saved!");
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items')
            .style.display = "block";
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var makeli = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeli.appendChild(makeSubList);
            for (var n in obj) {
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSubli.innerHTML = optSubText;
                makesublist.appendChild(linkLi);

            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }

    function makeItemLinks(key, linksLi) {

        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item"
        editLink.addEventListener("click", editItem);
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);


        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);

        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.addEventListener("click", deleteItem);
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }

    function editItem() {

        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);

        toggleControls("off");

        $('groups')
            .value = item.category[1];
        $('item_name')
            .value = item.itemName[1];
        $('fname')
            .value = item.fname[1];
        $('lname')
            .value = item.lname[1];

        saveItem.removeEventListener("click", storeData);
        $('saveItem')
            .value = "Edit Item";
        var editSubmit = $('saveItem');
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;
    }

    function deleteItem() {
        var ask = confirm("Are you sure you want to delete this item?");
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
        } else {
            alert("Item was not erased!");
        }
    }

    function deleteData() {
        var askAll = confirm("WARNING! This will delete all of your appointments! Press OK to continue.");
        if (localStorage.length === 0) {
            alert("There is no data to clear!");

        } else if (askAll) {
            localStorage.clear();
            alert("All Items Have Been Deleted!");
            window.location.reload();
            return false;
        } else {
            alert("Tattoo Appointments were not erased!")
        }
    }

    function validate(eventData) {
        //Define the elements to be checked
        var getGroup = $('groups');
        var getfname = $('fname');
        var getlname = $('lname');
        var getdate = $('date');

        errorMsg.innerHTML = "";
        getGroup.style.border = "1px solid black";
        getfname.style.border = "1px solid black";
        getlname.style.border = "1px solid black";
        getdate.style.border = "1px solid black";

        var messageArray = [];

        if (getGroup.value === "--Select Category--") {
            var groupError = "Please select a style!";
            getGroup.style.border = "2px solid red";
            messageArray.push(groupError);
        }

        if (getfname.value === "") {
            var fnameError = "Please enter your first name!";
            getfname.style.border = "2px solid red";
            messageArray.push(fnameError);
        }

        if (getlname.value === "") {
            var lnameError = "Please enter your last name!";
            getlname.style.border = "2px solid red";
            messageArray.push(lname);

        }

        //Replacement Cost Validation
        if (getdate.value === "") {
            var date = "Please enter the date you would like to make your appointment!";
            getdate.style.border = "2px solid red";
            messageArray.push(dateError);
        }

        if (messageArray.length >= 1) {
            for (var i = 0, j = messageArray.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageArray[i];
                errorMsg.appendChild(txt);
            }
            eventData.preventDefault();
            return false;
        } else {

            storeData(this.key);
        }


    }

    function deleteData() {
        if (localStorage.length === 0) {
            alert("There is no data to clear!");

        } else {
            localStorage.clear();
            alert("All Items Have Been Deleted!");
            window.location.reload();
            return false;
        }
    }
    var styleGroups = ["--Choose A Style--", "Color", "Black & White", "Outline"];
    var sexValue;
    errorMsg = $('errors');
    getTats();
    var displayData = $('displayData');
    displayData.addEventListener("click", getData);
    var clearData = $('clearData');
    clearData.addEventListener("click", deleteData);
    var save = $('submit');
    save.addEventListener("click", storeData);
});







