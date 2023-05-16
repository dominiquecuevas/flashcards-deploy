import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
  // TODO: add props category sideAType, sideBType
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const sideAType = 'fr'
  const sideBType = 'en'
  const category = 'French'
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { sideA, sideB, sideAType, sideBType, category };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Flashcard</h1>
          <h2>Category</h2>
          <input
            autoFocus
            onChange={(e) => setSideA(e.target.value)}
            placeholder="Front text"
            type="text"
            value={sideA}
          />
          <input
            autoFocus
            onChange={(e) => setSideB(e.target.value)}
            placeholder="Back text"
            type="text"
            value={sideB}
          />
          <input disabled={!sideA || !sideB} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          // background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;