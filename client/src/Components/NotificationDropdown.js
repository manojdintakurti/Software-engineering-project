import React, { useState, useEffect } from 'react';
import '../CSS/NotificationDropdown.css'; // Import the CSS file for styling

const NotificationDropdown = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Fetch notifications from the backend
        const fetchNotifications = async () => {
            try {
                const storedUser = sessionStorage.getItem("currentUser");
                const user = storedUser ? JSON.parse(storedUser) : null;
                const userId = user?.userId;
                const response = await fetch(`http://localhost:8000/api/notification/fetch-notifications/${userId}`);
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        // Fetch notifications when the component mounts
        fetchNotifications();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    const handleMouseEnter = () => {
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };

    return (
        <div className="notification-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className={"notification-button"}>🔔</button>
            {showDropdown && (
                <div className="notification-dropdown">
                    {notifications.length === 0 ? (
                        <p>No notifications</p>
                    ) : (
                        <div>
                            {notifications.map((notification) => (
                                <div key={notification.notificationID}>
                                    <div className="notification-box">
                                        <strong>{notification.message}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationDropdown;
