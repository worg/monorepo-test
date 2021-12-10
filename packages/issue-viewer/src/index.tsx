import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import { NoResults } from './pages/NoResults';
import { NotFound } from './components/NotFound';
import { Repo } from './pages/Repo';
import { IssueList } from './pages/IssueList';
import { IssueComments } from './pages/IssueComments';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<NoResults />} />
          <Route path=":user/:repo" element={<Repo />}>
            <Route index element={<IssueList />} />
            <Route path="issue/:id" element={<IssueComments />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
