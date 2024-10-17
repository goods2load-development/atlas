import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { cookies } from 'next/headers';

const {
  GOOGLE_CLIENT_ID: clientId = '',
  GOOGLE_CLIENT_SECRET: clientSecret = '',
  AUTH_SECRET: secret = '',
} = process.env;

const authOptions = {
  secret,
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  ],
  pages: { signIn: '/sign-in' },
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      // console.log({ url, baseUrl });
      return url.startsWith(baseUrl) ? url : baseUrl;
    },

    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
        token.idToken = account.id_token;
        token.user = {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          given_name: profile.given_name,
          family_name: profile.family_name,
          locale: profile.locale,
          phone: profile.phone_number,
          company: profile.organization,
        };
      }

      return token;
    },

    async session({ session, user, token }: any) {
      // console.log({ session, user, token });
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;

      cookies().set('accessToken', token.accessToken);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
