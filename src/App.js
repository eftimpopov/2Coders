import 'swiper/swiper.min.css';
import './assets/boxicons-2.0.9/css/boxicons.min.css';
import './App.scss';

import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AppContextProvider from './context/main';
import Routes from './config/Routes';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Route
          render={(props) => (
            <>
              <Header {...props} />
              <Routes />
              <Footer />
            </>
          )}
        />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
