import * as React from 'react';
import { SPFI } from '@pnp/sp';

import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/items";

interface TableData {
  sp: SPFI;
  listName: string;
  reloadFlag: boolean;
}

interface IListItem {
  Id: number;  
  Title: string;
  Email: string;
  Address: string;
  Password: string;
}

const Table: React.FC<TableData> = ({ sp, listName, reloadFlag }) => {
  const [arr, setArr] = React.useState<IListItem[]>([]);
  const [editId, setEditId] = React.useState<number | null>(null);
  const [editData, setEditData] = React.useState<Partial<IListItem>>({});

  const loadList = async () => {
    try {
      const data = await sp.web.lists
        .getByTitle(listName)
        .items.select("Id", "Title", "Email", "Address", "Password")();
      setArr(data);
    } catch (err) {
      console.error("Something went wrong in load items: ", err);
    }
  };

  React.useEffect(() => {
    void loadList();
  }, [reloadFlag]);

  const startEdit = (item: IListItem) => {
    setEditId(item.Id);
    setEditData({ ...item });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    if (editId === null) return;

    try {
      await sp.web.lists
        .getByTitle(listName)
        .items.getById(editId)
        .update({
          Title: editData.Title,
          Email: editData.Email,
          Address: editData.Address,
          Password: editData.Password,
        });
      alert("Item updated successfully");
      setEditId(null);
      setEditData({});
      await loadList();
    } catch (err) {
      console.error("Something went wrong in update: ", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await sp.web.lists.getByTitle(listName).items.getById(id).delete();
      alert("Item deleted successfully");
      await loadList();
    } catch (err) {
      console.error("Something went wrong in delete: ", err);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Address</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {arr.length > 0 ? (
            arr.map(({ Id, Title, Email, Address, Password }) => (
              <tr key={Id}>
                {editId === Id ? (
                  <>
                    <td>
                      <input
                        name="Title"
                        value={editData.Title || ""}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="Email"
                        value={editData.Email || ""}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="Address"
                        value={editData.Address || ""}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="Password"
                        value={editData.Password || ""}
                        type="password"
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={saveEdit}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{Title}</td>
                    <td>{Email}</td>
                    <td>{Address}</td>
                    <td>{Password}</td>
                    <td>
                      <button onClick={() => startEdit({ Id, Title, Email, Address, Password })}>Edit</button>
                      <button onClick={() => handleDelete(Id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
