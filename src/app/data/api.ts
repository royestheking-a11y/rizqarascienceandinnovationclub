import { API_BASE } from './config';

export const fetchProjects = async () => {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const fetchPrograms = async () => {
  const res = await fetch(`${API_BASE}/api/programs`);
  if (!res.ok) throw new Error('Failed to fetch programs');
  return res.json();
};

export const fetchAchievements = async () => {
  const res = await fetch(`${API_BASE}/api/achievements`);
  if (!res.ok) throw new Error('Failed to fetch achievements');
  return res.json();
};

export const fetchTeam = async () => {
  const res = await fetch(`${API_BASE}/api/team`);
  if (!res.ok) throw new Error('Failed to fetch team');
  return res.json();
};

export const fetchEvents = async () => {
  const res = await fetch(`${API_BASE}/api/events`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export const fetchMembers = async () => {
  const res = await fetch(`${API_BASE}/api/members`);
  if (!res.ok) throw new Error('Failed to fetch members');
  return res.json();
}

export const fetchBlog = async () => {
  const res = await fetch(`${API_BASE}/api/blog`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export const fetchGallery = async () => {
  const res = await fetch(`${API_BASE}/api/gallery`);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export const fetchSubmissions = async () => {
  const res = await fetch(`${API_BASE}/api/submissions`);
  if (!res.ok) throw new Error('Failed to fetch submissions');
  return res.json();
}

export const createDoc = async (model: string, data: any) => {
  const res = await fetch(`${API_BASE}/api/${model}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Create ${model} failed`);
  return res.json();
};

export const updateDoc = async (model: string, id: string, data: any) => {
  const res = await fetch(`${API_BASE}/api/${model}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update ${model} failed`);
  return res.json();
};

export const deleteDoc = async (model: string, id: string) => {
  const res = await fetch(`${API_BASE}/api/${model}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error(`Delete ${model} failed`);
  return res.json();
};

export const saveSubmission = async (type: 'donation' | 'contact' | 'application', data: any) => {
  const res = await fetch(`${API_BASE}/api/submissions/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Submission failed');
  return res.json();
};

export const fetchCarousel = async () => {
  const res = await fetch(`${API_BASE}/api/carousel`);
  if (!res.ok) throw new Error('Failed to fetch carousel');
  return res.json();
};
