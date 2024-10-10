import { useEffect, useState } from 'react';
import styles from '@/styles/AdminPanel.module.css';

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/support');
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError('Error fetching messages');
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await fetch('/api/support', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        setMessages(messages.filter((msg) => msg._id !== id));
      } catch (err) {
        setError('Error deleting message');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Panel</h1>
      {error && <p className={styles.error}>{error}</p>}
      {messages.length === 0 ? (
        <p>No messages available</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>
                  <button onClick={() => deleteMessage(msg._id)} className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
