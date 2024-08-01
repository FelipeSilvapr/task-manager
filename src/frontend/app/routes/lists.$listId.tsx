import { json, LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData, Form, Link, useActionData, useParams } from '@remix-run/react';
import { useState } from 'react';
import { List } from '~/types';

interface LoaderData {
  user: { id: number; username: string };
  list: List;
}

interface ActionData {
  error?: string;
}

export let loader: LoaderFunction = async ({ params }) => {
  let listId = params.listId;
  let user = { id: 1, username: 'johndoe' };

  try {
    let response = await fetch(`http://localhost:3000/list/${listId}`);

    if (!response.ok) {
      console.debug('Failed to fetch list', response);
      throw new Error('Failed to fetch list');
    }

    let list: List = await response.json();

    console.debug('LoaderData', { user, list });
    return json<LoaderData>({ user, list });
  } catch (error) {
    console.error('Loader error:', error);
    return redirect('/error');
  }
};

export let action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  let actionType = formData.get('actionType') as string;
  let title = formData.get('title') as string;
  let description = formData.get('description') as string;
  let taskId = formData.get('taskId') as string;
  let listId = params.listId;

  console.debug('Action', { actionType, title, description, taskId, listId });

  try {
    let response;

    if (actionType === 'create') {
      response = await fetch(`http://localhost:3000/list/${listId}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) {
        throw new Error('Failed to create new task');
      }
    } else if (actionType === 'update') {
      response = await fetch(`http://localhost:3000/list/${listId}/task/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }
    } else if (actionType === 'delete') {
      response = await fetch(`http://localhost:3000/list/${listId}/task/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
    }

    console.debug('Action response', response);
    return redirect(`/lists/${listId}`);
  } catch (error) {
    console.error('Action error:', error);
    return json<ActionData>({ error: (error as Error).message }, { status: 500 });
  }
};

export default function ListPage() {
  let { user, list } = useLoaderData<LoaderData>();
  let actionData = useActionData<ActionData>();
  let [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  return (
    <div className="container list-page">
      <h1>Tasks in {list.title}</h1>
      {actionData?.error && <p className="error">{actionData.error}</p>}
      <ul>
        {list.tasks.map(task => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <Form method="post" onSubmit={() => setEditingTaskId(null)}>
                <input type="hidden" name="actionType" value="update" />
                <input type="hidden" name="taskId" value={task.id} />
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={task.title} 
                />
                <input 
                  type="text" 
                  name="description" 
                  defaultValue={task.description} 
                />
                <div className="edit-buttons">
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              </Form>
            ) : (
              <div>
                <p><strong>{task.title}</strong></p>
                <p>{task.description}</p>
                <div className="edit-buttons">
                  <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                  <Form method="post">
                    <input type="hidden" name="actionType" value="delete" />
                    <input type="hidden" name="taskId" value={task.id} />
                    <button type="submit">Delete</button>
                  </Form>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <Form method="post">
        <input type="hidden" name="actionType" value="create" />
        <input type="text" name="title" placeholder="New Task Title" />
        <input type="text" name="description" placeholder="New Task Description" />
        <button type="submit">Add Task</button>
      </Form>
      <Link className="link" to="/lists">Back to Lists</Link>
    </div>
  );
}


