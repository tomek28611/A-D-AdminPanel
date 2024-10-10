import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/MessageDetail.module.css';

export default function MessageDetail() {
  const router = useRouter();
  const { id } = router.query; // Pobierz ID z query parametru
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchMessage = async () => {
        try {
          const response = await fetch(`/api/support?id=${id}`);
          const data = await response.json();
          setMessage(data);
        } catch (err) {
          setError('Error fetching message');
        }
      };

      fetchMessage();
    }
  }, [id]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!message) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>Message Details</h1>
      <p><strong>Name:</strong> {message.name}</p>
      <p><strong>Email:</strong> {message.email}</p>
      <p><strong>Phone:</strong> {message.phone}</p>
      <p><strong>Title:</strong> {message.title}</p>
      <p><strong>Title Number:</strong> {message.titleNr}</p>
      <p><strong>VIN:</strong> {message.vin}</p>
      <p><strong>Message:</strong> {message.message}</p>
      <p><strong>Submitted At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
    </div>
  );
}
