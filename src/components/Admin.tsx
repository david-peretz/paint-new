import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface FormSubmission {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
  sent_at: string | null;
  error: string | null;
}

const Admin = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...');
        const { data, error } = await supabase
          .from('form_submissions')
          .select('count')
          .single();

        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus(`שגיאת התחברות: ${error.message}`);
          throw error;
        }

        console.log('Supabase connection successful:', data);
        setConnectionStatus('מחובר בהצלחה למסד הנתונים');
      } catch (err) {
        console.error('Error testing connection:', err);
        setConnectionStatus('שגיאה בבדיקת החיבור למסד הנתונים');
      }
    };

    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from('form_submissions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        console.log('Fetched submissions:', data);
        setSubmissions(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים');
      } finally {
        setLoading(false);
      }
    };

    testConnection();
    fetchSubmissions();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">טוען נתונים...</div>;
  }

  return (
    <div className="p-4">
      <div className={`mb-4 p-3 rounded ${
        connectionStatus.includes('שגיאה') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}>
        {connectionStatus}
      </div>

      <h2 className="text-2xl font-bold mb-4">פניות שהתקבלו ({submissions.length})</h2>
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {submissions.length === 0 ? (
        <div className="text-center text-gray-600">לא נמצאו פניות במערכת</div>
      ) : (
        <div className="grid gap-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{submission.name}</h3>
                <span className={`px-2 py-1 rounded text-sm ${
                  submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  submission.status === 'sent' ? 'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {submission.status === 'pending' ? 'ממתין' : 
                   submission.status === 'sent' ? 'נשלח' : 'שגיאה'}
                </span>
              </div>
              <div className="text-gray-600 mb-2">{submission.phone}</div>
              <div className="text-gray-800 mb-2">{submission.message}</div>
              <div className="text-sm text-gray-500">
                נשלח בתאריך: {new Date(submission.created_at).toLocaleString('he-IL')}
              </div>
              {submission.error && (
                <div className="mt-2 text-sm text-red-600">
                  שגיאה: {submission.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;