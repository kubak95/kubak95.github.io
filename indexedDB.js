    //prefixes of implementation that we want to test
    window.indexedDB = window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    const highScores = [{
        id: "00-00",
        nick: "215174",
        data: "17.05.2021",
        ilosc_punktow: 30,
        czas_danej_gry: 20
    }];
    var db;
    var request = window.indexedDB.open("newDatabase", 1);

    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;
        console.log("success: " + db);
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("highScores", {
            keyPath: "id",
            autoIncrement: true
        });

        for (var i in highScores) {
            objectStore.add(highScores[i]);
        }
    }

    // function read() {
    //     var transaction = db.transaction(["employee"]);
    //     var objectStore = transaction.objectStore("employee");
    //     var request = objectStore.get("00-03");

    //     request.onerror = function(event) {
    //         alert("Unable to retrieve daa from database!");
    //     };

    //     request.onsuccess = function(event) {
    //         // Do something with the request.result!
    //         if (request.result) {
    //             alert("Name: " + request.result.name + ", Age: " + request.result.age +
    //                 ", Email: " + request.result.email);
    //         } else {
    //             alert("Kenny couldn't be found in your database!");
    //         }
    //     };
    // }

    function readAll() {
        var objectStore = db.transaction("highScores").objectStore("highScores");

        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;

            if (cursor) {
                alert("Nick for id " + cursor.key + " is " + cursor.value.nick + ", Date: " + cursor.value.data + ", Score: " + cursor.value.ilosc_punktow + ", Time played: " + cursor.value.czas_danej_gry);
                cursor.continue();
            } else {
                alert("No more entries!");
            }
        };
    }

    function add() {
        var name;
        let today = new Date();
        let todayDate = today.getDate() + "." + today.getMonth() + 1 + "." + today.getFullYear();
        name = "Jakub";
        var request = db.transaction(["highScores"], "readwrite")
            .objectStore("highScores")
            .add({
                // id: request.result,
                nick: name,
                data: todayDate,
                ilosc_punktow: points,
                czas_danej_gry: 40
            });

        request.onsuccess = function(event) {
            alert("Kenny has been added to your database.");
        };

        request.onerror = function(event) {
            alert("Unable to add data\r\nKenny is aready exist in your database! ");
        }
    }

    function remove() {
        var request = db.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .delete("00-03");

        request.onsuccess = function(event) {
            alert("Kenny's entry has been removed from your database.");
        };
    }