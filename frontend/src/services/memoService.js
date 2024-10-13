const API_URL = 'http://localhost:8000/memos'; // Adjust to your backend URL

export const getMemos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch memos');
  return await response.json();
};

export const createMemo = async (content) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Failed to create memo');
};

export const updateMemo = async (id, content) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Failed to update memo');
};

export const deleteMemo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete memo');
};
