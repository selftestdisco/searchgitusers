import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Search from './Search/Components/search';
import {fetchUsersReducer} from './Search/Reducers/reducers';
import { createEpicMiddleware } from 'redux-observable';
import epics from './Search/Actions/epics';

const epicMiddleware = createEpicMiddleware();

function App() {
  return (
    <Provider store={createStore(
      fetchUsersReducer,
      {users:[], selectedUser:{}},
      applyMiddleware(epicMiddleware)
    )}>
      {epicMiddleware.run(epics)}
      <Search />
    </Provider>
  );
}

export default App;
