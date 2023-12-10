// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import mongoose from "mongoose";
import User from "../../../app/models/User";

const mongoURI =
  "mongodb+srv://gosya85:<FxNeZY0Ciil9aaPL>@cluster0.umz5cdg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("MongoDB connected successfully!");
});

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const user = await User.findOne({ username: credentials.username });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
});
