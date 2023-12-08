// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import mongoose from "mongoose";
import User from "../../../models/User";

const mongoURI =
  "mongodb+srv://gosya85:<FxNeZY0Ciil9aaPL>@cluster0.umz5cdg.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
