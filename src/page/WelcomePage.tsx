import React from 'react';

export const WelcomePage = () => {
    return (
        <main role='main' className='flex-shrink-0'>
            <div className='container'>
                <h1 className='mt-5'>Brainstorm platform</h1>
                <p className='lead'>
                    Brainstorm platform - is a place where you can share your ideas with others or inspire by other
                    incredible creativity! Feel feel to create your first idea <a href="/ideas">here</a>.
                </p>
            </div>
        </main>
    );
};

export default WelcomePage;