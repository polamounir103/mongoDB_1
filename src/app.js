const mongodb = require("mongodb");
const connectionUrl = "mongodb://localhost:27017";
const mongoClient = mongodb.MongoClient;
const dbName = "proj";

mongoClient.connect(connectionUrl, (error, res) => {
  if (error) console.log("error with connecting to MongoDB");
  console.log("Connection Done with MongoDB");
  const db = res.db(dbName);

  ////////////////////////////////
  //     > create a new user    //
  ////////////////////////////////

  db.collection("users").insertOne(
    {
      name: "Pola",
      age: 20,
    },
    (error, data) => {
      if (error) console.log("error with inserting data");
      console.log("data has been inserted  > ", data.insertedId);
    }
  );
  db.collection("users").insertOne(
    {
      name: "John Dou",
      age: 50,
    },
    (error, data) => {
      if (error) console.log("error with inserting data");
      console.log("data has been inserted  > ", data.insertedId);
    }
  );

  ////////////////////////////////
  //     > create meny user     //
  ////////////////////////////////

  db.collection("users").insertMany(
    [
      {
        name: "one",
        age: 27,
      },
      {
        name: "two",
        age: 24,
      },
      {
        name: "Three",
        age: 23,
      },
      {
        name: "four",
        age: 27,
      },
      {
        name: "Five",
        age: 21,
      },
      {
        name: "Six",
        age: 27,
      },
      {
        name: "Seven",
        age: 25,
      },
      {
        name: "Eight",
        age: 27,
      },
      {
        name: "Nine",
        age: 22,
      },
      {
        name: "ten",
        age: 27,
      },
    ],
    (error, data) => {
      if (error) console.log("error with inserting data");
      console.log("data 2 has been inserted > ", data.insertedIds);
      /////////////  Get NO of Inserted Items  //////////////
      console.log(
        "Number of  data 2 has been inserted  is > ",
        data.insertedCount
      );
    }
  );

  /////////////////////////////////
  // > Find Users With Condition //
  /////////////////////////////////
  db.collection("users")
    .find({ age: 27 })
    .toArray((error, users) => {
      if (error) console.log(error);
      console.log(users);
    });

  ////////////////////////////////////////////
  // > Find Users With Condition  and Limit //
  ////////////////////////////////////////////
  db.collection("users")
    .find({ age: 27 })
    .limit(3)
    .toArray((error, users) => {
      if (error) console.log(error);
      console.log(users);
    });

  ///////////////////////////////////////
  // > Update Users Data  > Set & Inc //
  /////////////////////////////////////
  db.collection("users")
    .find()
    .limit(4)
    .toArray((error, users) => {
      if (error) console.log(error);

      console.log("This is the array of the first 4 users:");
      console.log(users);

      users.forEach((user) => {
        db.collection("users").updateOne(
          { _id: user._id },
          { $set: { name: "UPDATED WWW" }, $inc: { age: 5 } },
          (error, res) => {
            if (error) {
              console.error("Error updating user:", error);
              return;
            }
            console.log("UPDATED");
            console.log(res);
          }
        );
      });
    });
  // --------------------------------------------------------------
  db.collection("users")
    .updateMany({ age: 20 }, { $inc: { age: 5 } })
    .then((data) => {
      console.log("AGE modified is: ");
      console.log(data.modifiedCount);
    })
    .catch((error) => {
      console.log(error);
    });

  ///////////////////////////////////////
  //    > Delete Users with age 27    //
  /////////////////////////////////////
  db.collection("users").deleteMany({ age: 27 }, (error, res) => {
    if (error) console.log(error);
    console.log("THE DELETED USER Count is: ");
    console.log(res.deletedCount);
  });

  //////////////////////////////////////////////////////
});





/*

The OUTPUT 
 node src/app.js

Connection Done with MongoDB
data has been inserted  >  new ObjectId("65fc7aac16fbab7cb15b1ee0")
[
  {
    _id: new ObjectId("65fc7a9d60160c5a22f8015c"),
    name: 'one',
    age: 27
  },
  {
    _id: new ObjectId("65fc7a9d60160c5a22f8015f"),
    name: 'four',
    age: 27
  },
  {
    _id: new ObjectId("65fc7a9d60160c5a22f80161"),
    name: 'Six',
    age: 27
  }
]
This is the array of the first 4 users:
[
  {
    _id: new ObjectId("65fc7a9d60160c5a22f8015a"),
    name: 'Pola',
    age: 20
  },
  {
    _id: new ObjectId("65fc7a9d60160c5a22f8015b"),
    name: 'John Dou',
    age: 50
  },
  {
    _id: new ObjectId("65fc7a9d60160c5a22f8015c"),
    name: 'one',
    age: 27
  },
  {
    _id: new ObjectId("65fc7a9d60160c5a22f8015d"),
    name: 'two',
    age: 24
  }
]
AGE modified is:
2
THE DELETED USER Count is: 
5
data 2 has been inserted >  {
  '0': new ObjectId("65fc7aac16fbab7cb15b1ee2"),
  '1': new ObjectId("65fc7aac16fbab7cb15b1ee3"),
  '2': new ObjectId("65fc7aac16fbab7cb15b1ee4"),
  '3': new ObjectId("65fc7aac16fbab7cb15b1ee5"),
  '4': new ObjectId("65fc7aac16fbab7cb15b1ee6"),
  '5': new ObjectId("65fc7aac16fbab7cb15b1ee7"),
  '6': new ObjectId("65fc7aac16fbab7cb15b1ee8"),
  '7': new ObjectId("65fc7aac16fbab7cb15b1ee9"),
  '8': new ObjectId("65fc7aac16fbab7cb15b1eea"),
  '9': new ObjectId("65fc7aac16fbab7cb15b1eeb")
}
Number of  data 2 has been inserted  is >  10
UPDATED
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
UPDATED
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
UPDATED
{
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 0
}
UPDATED
{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}
data has been inserted  >  new ObjectId("65fc7aac16fbab7cb15b1ee1")  
[
  {
    _id: new ObjectId("65fc7aac16fbab7cb15b1ee2"),
    name: 'one',
    age: 27
  },
  {
    _id: new ObjectId("65fc7aac16fbab7cb15b1ee5"),
    name: 'four',
    age: 27
  },
  {
    _id: new ObjectId("65fc7aac16fbab7cb15b1ee7"),
    name: 'Six',
    age: 27
  },
  {
    _id: new ObjectId("65fc7aac16fbab7cb15b1ee9"),
    name: 'Eight',
    age: 27
  },
  {
    _id: new ObjectId("65fc7aac16fbab7cb15b1eeb"),
    name: 'ten',
    age: 27
  }
]

*/