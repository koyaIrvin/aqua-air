import './App.css';
import banner_logo from './media/banner-logo.png';
import banner_logo_white from './media/white-banner-logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AAcrud from './pages/AAcrud';
import React, { useState, useEffect } from 'react';

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoaded(true);
      window.addEventListener('load', () => {
        setLoaded(true);
      });
    }, 1500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function scrollToTop() {
    const topContent = document.getElementById('top-content');
    topContent.scrollIntoView({ behavior: 'smooth' });
  }

  const handleTransitionEnd = () => {
    // Remove the loader element from the DOM
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.parentNode.removeChild(loader);
    }
  };

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [scrolledForTopArrow, setScrolledForTopArrow] = useState(false);

  useEffect(() => {
    const handleScrollForTopArrow = () => {
      if (window.scrollY >= 950) {
        setScrolledForTopArrow(true);
      } else {
        setScrolledForTopArrow(false);
      }
    };

    window.addEventListener('scroll', handleScrollForTopArrow);

    return () => {
      window.removeEventListener('scroll', handleScrollForTopArrow);
    };
  }, []);

  return (
    <div id="top-content" className={`App`}>
      <Router>
      <header>
        <div className='container-fluid navContainer'>
          <nav id="navbar-aqua" className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-scroll'} ${loaded ? '' : 'loader--hidden'}`}>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link to='/'><div className="navbar-brand"><img src={scrolled ? banner_logo : banner_logo_white} alt="Aqua-Air" height="50rem" /></div></Link>
            <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo01">
              <ul className="navbar-nav">
                <Link to ='/crud' className='nav-no-underline' >
                  <li className="nav-item">
                    <div className={`nav-link ${scrolled? 'hover-underline-animation-scrolled' : 'hover-underline-animation'}`}>CRUD</div>
                  </li>
                </Link>
                <li className="nav-item">
                <a className={`nav-link ${scrolled? 'hover-underline-animation-scrolled' : 'hover-underline-animation'}`} href="https://www.facebook.com/people/Stuffed-Slice/61551555076645/" target="blank">Stuffed Slice</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${scrolled? 'hover-underline-animation-scrolled' : 'hover-underline-animation'}`} href="https://www.instagram.com/stuffed_slice/" target="blank">Sandwich</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${scrolled? 'hover-underline-animation-scrolled' : 'hover-underline-animation'}`} href="https://www.facebook.com/cinthney/" target="blank">Bouquet</a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${scrolled? 'hover-underline-animation-scrolled' : 'hover-underline-animation'}`} href="https://www.facebook.com/Irvin.what/" target="blank">Photographs Sold</a>
                </li>
              </ul>
          </div>
          <div className="navButton">
            <Link to='/login'><button className='main-btn btn py-2 px-5'>LOG IN</button></Link>
          </div>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/crud' element={<AAcrud />} />
      </Routes>
      </Router>
      <div className='footer-content container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8'>
              <p className='copyleft'>The year is 20XX. Everyone plays Fox at TAS levels of perfection. Because of this, the winner of a match depends solely on port priority. The RPS metagame has evolved to ridiculous levels due to it being the only remaining factor to decide matches.</p>
          </div>
          <div className='col-2'></div>
        </div>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8'>
            <hr />
          </div>
          <div className='col-2'></div>
        </div>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8'>
            <p className='twentyXX'>&copy; {currentYear} AQUA-AIR SEASIA, All rights and lefts.</p>
          </div>
          <div className='col-2'></div>
        </div>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-8'>
            <hr />
          </div>
          <div className='col-2'></div>
        </div>
      </div>
      <div className={`topbutton ${scrolledForTopArrow ? '' : 'topbutton--hidden'}`} onClick={scrollToTop}>
        <FontAwesomeIcon className='topbuttonicon' icon={icon({name: 'arrow-up'})} />
      </div>
      <div className={`loader ${loaded ? 'loader--hidden' : ''}`} onTransitionEnd={handleTransitionEnd}>
        <p className={`loading-text ${loaded ? 'loader--hidden' : ''}`}>AQUA-AIR<br />SEASIA</p>
      </div>
    </div>
  );
}

export default App;
