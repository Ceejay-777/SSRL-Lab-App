import { useEffect } from 'react';
import MyRoutes from './components/MyRoutes'
import { useGetRequest } from './Modules/useRequest';
import { setSessionStorage } from './Modules/getSessionStorage';
import { Toaster } from 'react-hot-toast';
// import {Analytics} from '@vercel/analytics/react'

function App() {
  // const [session, setSession] = useState
  const [sendSessionRequest, sessionLoading, setSessionLoading, sessionError, setSessionError] = useGetRequest()

  // const getSession = async () => {
  //   console.log('Okay')
  //   const res = await sendSessionRequest('session')
  //   const sess = await res.json()
  //   if (res.ok) {
  //     setSessionStorage('session_sid', sess.sid)
  //   }
  // }

  // useEffect(() => {
  //   getSession()
  // }, [])

  return (
    < >
      <Toaster />
      <MyRoutes />
      {/* <Analytics /> */}
    </>
  );
}

export default App;
