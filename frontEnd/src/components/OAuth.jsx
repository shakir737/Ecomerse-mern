import { GoogleAuthProvider,FacebookAuthProvider, GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import {app}from '../../src/firebase';
import { FaFacebookF, FaGithub, FaGoogle, FaRegUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
     
      // const res = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: result.user.displayName,
      //     email: result.user.email,
      //     photo: result.user.photoURL,
      //   }),
      // });
      // const data = await res.json();
      console.log(result);
   
      // navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  const handleFBClick = async () => {
    try {
      const provider = new GithubAuthProvider();
    
      const auth = getAuth(app);
    
      const result = await signInWithPopup(auth, provider);
     
      // const res = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: result.user.displayName,
      //     email: result.user.email,
      //     photo: result.user.photoURL,
      //   }),
      // });
      // const data = await res.json();
      console.log(result);
   
      // navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <div className="text-center space-x-3">
          <button
            onClick={handleGoogleClick}
            className="btn btn-circle hover:bg-green hover:text-white"
          >
            <FaGoogle />
          </button>
          <button  onClick={handleFBClick} className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button  onClick={handleFBClick} className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
  );
}
