import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { NextApiRequest, NextApiResponse } from "next-auth/_utils";
import Adapters from "next-auth/adapters";
import prisma from "../../../Server/prisma";

const options: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      scope: "user:email%20read:user",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.SECRET,
  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: "person",
      Account: "account",
      Session: "session",
      VerificationRequest: "verificationRequest",
    },
  }),
};

const resolver = (
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> => NextAuth(req, res, options);

export default resolver;
