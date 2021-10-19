import { Route, Switch } from 'react-router-dom';
import MainPage from './pages/Main';
import CataloguePage from './pages/CataloguePage';
import ContributePage from './pages/ContributePage';
import FavoritesPage from './pages/Favorites';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import Tools from './pages/Tools';
import Evselector from './pages/Evselector';

function App() {
  return (
      <Switch>
        <Route path='/' exact>
          <MainPage />
        </Route>
        <Route path='/catalogue'>
          <CataloguePage />
        </Route>
        <Route path='/contribute'>
          <ContributePage />
        </Route>
        <Route path='/favorites'>
          <FavoritesPage />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/contact-us'>
          <ContactUs />
        </Route>
        <Route path='/tools'>
          <Tools />
        </Route>
        <Route path='/evselector'>
          <Evselector />
        </Route>
      </Switch>
  );
}

export default App;
