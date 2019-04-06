const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });



 exports.updateUser = functions.firestore
 .document('electionParticipants/{user}')
 .onUpdate((change, context) => {
   // Get an object representing the document
   // e.g. {'name': 'Marie', 'age': 66}
   const newValue = change.after.data();

   // ...or the previous value before this update
   const previousValue = change.before.data();

   console.log(previousValue)
 
   console.log(newValue)
   // access a particular field as you would any JS property

   var db = admin.firestore();



   
   db.collection("admin").doc("admin_fcm").get().then(snapshot => {

   console.log("in");
   
    console.log(snapshot.data());
    //console.log(snapshot.data().fcm);
    console.log(snapshot.get("fcm"));
    //console.log(snapshot.data().child("fcm"));
    //console.log(snapshot.data.property);
  
    const payload = {notification: {
        title: 'Vote Alert',
        body: 'Kindly Check votes'
        },
        data: {
            title: 'Vote Alert',
            body: 'Kindly Check votes'
        }


    };

    return admin.messaging().sendToDevice(snapshot.get("fcm"), payload)
    .then(function(response) {
        console.log("Successfully sent message:", response);
        return "";
        
      })
      .catch(function(error) {
        console.log("Error sending message:", error);
      });


   
   
 }).catch(reason => {

    console.log(reason)
    });


 
 return true;

});
