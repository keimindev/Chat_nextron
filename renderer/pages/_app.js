import { AuthProvider } from "../Auth";
import "../styles/global.css";

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
