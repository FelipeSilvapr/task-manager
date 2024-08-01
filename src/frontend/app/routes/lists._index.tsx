import { json, LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData, Form, Link, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { List } from '~/types';

interface LoaderData {
  user: { id: number; username: string };
  lists: List[];
}

interface ActionData {
  error?: string;
}

export let loader: LoaderFunction = async ({ request }) => {
  let user = { id: 1, username: 'johndoe' };

  try {
    let response = await fetch('http://localhost:3000/list');
    let lists: List[] = (await response.json()).lists;

    return json<LoaderData>({ user, lists });
  } catch (error) {
    console.error('Failed to load lists', error);
    throw new Error('Failed to load lists');
  }
};

export let action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let actionType = formData.get('actionType') as string;
  let listId = formData.get('listId') as string;
  let title = formData.get('title') as string;

  try {
    if (actionType === 'create') {
      let response = await fetch('http://localhost:3000/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error('Failed to create new task list');
      }
    } else if (actionType === 'update') {
      let response = await fetch(`http://localhost:3000/list/${listId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });

      if (!response.ok) {
        throw new Error('Failed to update task list');
      }
    } else if (actionType === 'delete') {
      let response = await fetch(`http://localhost:3000/list/${listId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task list');
      }
    }

    return redirect('/lists');
  } catch (error) {
    console.error('Action failed', error);
    return json<ActionData>({ error: (error as Error).message }, { status: 500 });
  }
};

export default function ListsPage() {
  let { user, lists } = useLoaderData<LoaderData>();
  let actionData = useActionData<ActionData>();
  let [editingListId, setEditingListId] = useState<string | null>(null);
  let [newTitle, setNewTitle] = useState<string>('');

  return (
    <div className="container lists-page">
      <h1>Task Lists for {user.username}</h1>
      {actionData?.error && <p className="error">{actionData.error}</p>}
      <ul>
        {lists.map(list => (
          <li key={list.id}>
            {editingListId === list.id ? (
              <Form method="post" onSubmit={() => setEditingListId(null)}>
                <input type="hidden" name="actionType" value="update" />
                <input type="hidden" name="listId" value={list.id} />
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={list.title} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                />
                <div className="edit-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingListId(null)}>Cancel</button>
                </div>
              </Form>
            ) : (
              <div>
                <Link to={`/lists/${list.id}`}>{list.title}</Link>
                <button onClick={() => { setEditingListId(list.id); setNewTitle(list.title); }}>Edit</button>
                <Form method="post">
                  <input type="hidden" name="actionType" value="delete" />
                  <input type="hidden" name="listId" value={list.id} />
                  <button type="submit">Delete</button>
                </Form>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Form method="post">
        <input type="hidden" name="actionType" value="create" />
        <input type="text" name="title" placeholder="New List Name" />
        <button type="submit">Add List</button>
      </Form>
    </div>
  );
}


