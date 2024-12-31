import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import GlobalStyle from './Theme/GlobalStyled.jsx';
import { ToastContainer , Bounce, Slide} from 'react-toastify';
import { Provider } from 'react-redux';
import {store, persistor} from './redux-toolkit/store/store.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <GlobalStyle/>
          <App />
          <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
          transition={Slide}
          />
        </Router>
      </PersistGate>
    </QueryClientProvider>
  </Provider>
)
