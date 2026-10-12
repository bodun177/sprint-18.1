import { useState } from 'react';
import EntitiesList from './EntitiesList';
import EntityDetails from './EntityDetails';
import { fetchUsers, fetchUser } from '../api';

function App() {
  const [userId, setUserId] = useState(1)
  const onUserClick = (id) => setUserId(id);

  return (
    <div>
      <EntitiesList
        onEntityDetailsClick={onUserClick}
        fetchMethod={fetchUsers}
        propsToDisplay={{ name: 'Name', username: 'Username', email: 'Email' }} />
      <EntityDetails
        fetchMethod={fetchUser}
        params={userId}
        propsToDisplay={{
          name: 'Name', username: 'Username', email: 'Email',
          city: 'City', street: 'Street', suite: 'Apartments',
          phone: 'Phone'
        }}
      />
    </div>
  );
}

export default App;
