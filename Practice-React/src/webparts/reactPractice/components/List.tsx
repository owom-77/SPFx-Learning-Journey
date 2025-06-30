import * as React from 'react';
import { useEffect, useState } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

interface IUserItem {
  Id: number;
  Title: string; 
  email: string;
  password: string;
}

interface IListProps {
  context: WebPartContext;
}

const List: React.FC<IListProps> = ({ context }) => {
  const [items, setItems] = useState<IUserItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState<Partial<IUserItem>>({});

  const listName = 'userData';
  const webUrl = context.pageContext.web.absoluteUrl;

  const fetchItems = async () => {
    try {
      const res = await fetch(`${webUrl}/_api/web/lists/getbytitle('${listName}')/items`, {
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      });
      const data = await res.json();
      setItems(data.value);
    } catch (err) {
      console.error('Error fetching items', err);
    }
  };

  useEffect(() => {
    void fetchItems();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const digestRes = await fetch(`${webUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        }
      });
      const digestData = await digestRes.json();
      const digest = digestData.d.GetContextWebInformation.FormDigestValue;

      const res = await fetch(`${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${id})`, {
        method: 'DELETE',
        headers: {
          'X-RequestDigest': digest,
          'IF-MATCH': '*'
        }
      });

      if (res.ok) {
        alert('Item deleted');
        void fetchItems();
      } else {
        const text = await res.text();
        console.error(text);
        alert('Delete failed');
      }
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleEditSave = async (id: number) => {
    try {
      const digestRes = await fetch(`${webUrl}/_api/contextinfo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose'
        }
      });
      const digestData = await digestRes.json();
      const digest = digestData.d.GetContextWebInformation.FormDigestValue;

      const res = await fetch(`${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${id})`, {
        method: 'POST',
        headers: {
          'X-RequestDigest': digest,
          'IF-MATCH': '*',
          'X-HTTP-Method': 'MERGE',
          'Content-Type': 'application/json;odata=nometadata',
          'Accept': 'application/json;odata=nometadata'
        },
        body: JSON.stringify(editedItem)
      });

      if (res.ok) {
        alert('Item updated');
        setEditingId(null);
        setEditedItem({});
        void fetchItems();
      } else {
        const text = await res.text();
        console.error(text);
        alert('Update failed');
      }
    } catch (err) {
      console.error('Edit error', err);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table style={{ border: '1px solid black', padding: '10px' }}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.Id}>
              <td>
                {editingId === item.Id ? (
                  <input
                    value={editedItem.Title ?? item.Title}
                    onChange={(e) => setEditedItem({ ...editedItem, Title: e.target.value })}
                  />
                ) : (
                  item.Title
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <input
                    value={editedItem.email ?? item.email}
                    onChange={(e) => setEditedItem({ ...editedItem, email: e.target.value })}
                  />
                ) : (
                  item.email
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <input
                    type="password"
                    value={editedItem.password ?? item.password}
                    onChange={(e) => setEditedItem({ ...editedItem, password: e.target.value })}
                  />
                ) : (
                  '********'
                )}
              </td>
              <td>
                {editingId === item.Id ? (
                  <>
                    <button onClick={() => handleEditSave(item.Id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => {
                      setEditingId(item.Id);
                      setEditedItem(item);
                    }}>Edit</button>
                    <button onClick={() => handleDelete(item.Id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
};

export default List;
