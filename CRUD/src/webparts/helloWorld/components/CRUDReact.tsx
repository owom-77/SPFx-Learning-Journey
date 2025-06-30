import * as React from 'react';
import { useState, useEffect } from 'react';
import { IHelloWorldProps } from './IHelloWorldProps';
import styles from './CRUDReact.module.scss';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

interface IListItem {
    Id: number;
    Title: string;
    HireDate: string;
    JobDescription: string;
}

const CRUDReact: React.FC<IHelloWorldProps> = ({ sp, listName }) => {
    const [items, setItems] = useState<IListItem[]>([]);
    const [employeeName, setEmployeeName] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [editingId, setEditingId] = React.useState<number | null>(null);
    const [editEmployeeName, setEditEmployeeName] = React.useState("");
    const [editHireDate, setEditHireDate] = React.useState("");
    const [editJobDesc, setEditJobDesc] = React.useState("");

    const loadItems = async () => {
        try {
            const data = await sp.web.lists
                .getByTitle(listName)
                .items.select("Id", "Title", "HireDate", "JobDescription")();
            setItems(data);
        } catch (err) {
            console.error("Error loading items:", err);
        }
    };

    const addItem = async () => {
        if (!employeeName || !hireDate || !jobDesc) return;
        try {
            await sp.web.lists.getByTitle(listName).items.add({
                Title: employeeName,
                HireDate: hireDate,
                JobDescription: jobDesc,
            });
            setEmployeeName("");
            setHireDate("");
            setJobDesc("");
            await loadItems();
        } catch (err) {
            console.error("Error adding item:", err);
        }
    };

    const deleteItem = async (id: number) => {
        try {
            await sp.web.lists.getByTitle(listName).items.getById(id).delete();
            await loadItems();
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

    const updateItem = async (id: number, updatedFields: { Title?: string; HireDate?: string; JobDescription?: string }) => {
        try {
            await sp.web.lists.getByTitle(listName).items.getById(id).update(updatedFields);
            await loadItems();
        } catch (err) {
            console.error("Error updating item:", err);
        }
    };


    useEffect(() => {
        void loadItems();
    }, [listName, sp]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>CRUD for List: {listName}</h2>

            <div className={styles.form}>
                <input
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Employee Name"
                    className={styles.input}
                />
                <input
                    type="date"
                    value={hireDate}
                    onChange={(e) => setHireDate(e.target.value)}
                    className={styles.inputDate}
                />
                <input
                    value={jobDesc}
                    onChange={(e) => setJobDesc(e.target.value)}
                    placeholder="Job Description"
                    className={styles.input}
                />
                <button onClick={addItem} className={styles.buttonAdd}>Add</button>
            </div>

            <ul className={styles.list}>
                {items.map(item => (
                    <li key={item.Id} className={styles.listItem}>
                        {editingId === item.Id ? (
                            <div className={styles.editInputs}>
                                <input
                                    value={editEmployeeName}
                                    onChange={e => setEditEmployeeName(e.target.value)}
                                    placeholder="Employee Name"
                                    className={styles.editInput}
                                />
                                <input
                                    type="date"
                                    value={editHireDate}
                                    onChange={e => setEditHireDate(e.target.value)}
                                    className={styles.editInput}
                                />
                                <input
                                    value={editJobDesc}
                                    onChange={e => setEditJobDesc(e.target.value)}
                                    placeholder="Job Description"
                                    className={styles.editInput}
                                />
                                <div className={styles.editButtons}>
                                    <button
                                        onClick={async () => {
                                            await updateItem(item.Id, {
                                                Title: editEmployeeName,
                                                HireDate: editHireDate,
                                                JobDescription: editJobDesc,
                                            });
                                            setEditingId(null);
                                        }}
                                        className={styles.buttonSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className={styles.buttonCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p><strong className={styles.title}>{item.Title}</strong></p>
                                <p className={styles.details}>Hire Date: <span>{item.HireDate}</span></p>
                                <p className={styles.details}>Job Description: <span>{item.JobDescription}</span></p>
                                <div className={styles.buttons}>
                                    <button
                                        onClick={() => {
                                            setEditingId(item.Id);
                                            setEditEmployeeName(item.Title);
                                            setEditHireDate(item.HireDate);
                                            setEditJobDesc(item.JobDescription);
                                        }}
                                        className={styles.buttonEdit}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteItem(item.Id)}
                                        className={styles.buttonDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CRUDReact;
