import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import '../styles/PageLayout.css';

const PageLayout = ({ children, title, subtitle, className = '', headerStyle = 'default' }) => {
    return (
        <>
            <Header />
            <main className={`main-with-sidebar ${className}`}>
                <div className="page-container">
                    <Sidebar />
                    <div className="page-content">
                        {(title || subtitle) && (
                            <div className={`page-header ${headerStyle}`}>
                                {title && <h1>{title}</h1>}
                                {subtitle && <p>{subtitle}</p>}
                            </div>
                        )}
                        <div className="page-body">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default PageLayout;