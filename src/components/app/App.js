import AppHeader from '../appHeader/AppHeader';
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const App = () => {

   return (
       <Router>
          <div className="app">
             <AppHeader/>
             <main className="content">
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='comics' element={<ComicsPage/>}/>
                    <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                    <Route path='*' element={<Page404/>}></Route>
                </Routes>
             </main>
          </div>
       </Router>
   )
}

export default App;