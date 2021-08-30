import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(function ProtectedRoute(req, res) {

  const session = getSession(req, res);

    // now we have the user info with:
    // const user = session.user;

});