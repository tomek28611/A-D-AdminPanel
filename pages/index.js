import Layout from "@/components/Layout";
import HomeHeader from "@/components/HomeHeader";
import HomeStats from "@/components/HomeStats";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default function Home({ user }) {
  return (
    <div>
      {user ? (
        <div>
          {user.email === 'tomek28611@gmail.com' || 'thomasnkraw@gmail.com' ? (
            <Layout>
              <div className="logged_name_cont">
                <p>User: {user.given_name}</p>
                <img src={user.picture} alt="" className="user_picture" />
                <p>email: {user.email}</p>
                <LogoutLink className="button-71">Log Out</LogoutLink>
              </div>
              <HomeHeader />
              <HomeStats />
            </Layout>
          ) : <div>You do not have administrator rights
            <LogoutLink className="button-71">Log Out</LogoutLink>

          </div>}
        </div>
      ) : (
        <div className="bck">
          <div className="mnu_type">
            <LoginLink className='button-71 mnu_pos mnu_type_pos' >Log In</LoginLink>
            <RegisterLink className='button-71 mnu_pos mnu_type_pos'>Register</RegisterLink>
          </div>
          <div>

          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const { getUser } = getKindeServerSession(req, res);
  const user = await getUser();
  return {
    props: {
      user,

    }
  };
}
