import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <span className='text-white'>Test Assignment for Ecologital</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}