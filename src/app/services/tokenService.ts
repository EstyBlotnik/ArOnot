import axios from 'axios';

export const checkTokenValidity = async (): Promise<boolean> => {
    try {
        // קריאה ל-API בצד השרת, וממתינים לתשובה
        const response = await axios.get('/api/verifyToken');
        console.log("response: ", response?.status)
        // אם התשובה מכילה success: true, אז הטוקן תקף
        if (response.status === 200) {
            return true;
        }
        localStorage.clear();
        return false;

    } catch (error) {
        localStorage.removeItem('originUser');
        localStorage.removeItem('user');
        console.error('Token verification failed:', error); // הדפסת השגיאה
        return false;
    }
};
