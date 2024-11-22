import React, { useState } from 'react';
import { FaBars, FaArrowRight, FaArrowLeft, FaQuestionCircle, FaLightbulb, FaPuzzlePiece, FaStar, FaLaugh, FaBookmark, FaBook, FaListAlt, FaComments, FaRandom, FaFileAlt, FaUndo, FaSignOutAlt } from 'react-icons/fa';
import './menuButton.css';

const menuItems = [
    { icon: <FaArrowRight />, text: 'Next', description: 'Proceed to the next concept' },
    { icon: <FaArrowLeft />, text: 'Previous', description: 'Review the previous concept' },
    { icon: <FaQuestionCircle />, text: 'Explain more', description: 'Request further clarification on the current topic' },
    { icon: <FaLightbulb />, text: 'Ask Doubt', description: 'Ask any doubt related to the above explained concept' },
    { icon: <FaPuzzlePiece />, text: 'Quiz', description: '5 questions on the above explained concept' },
    { icon: <FaStar />, text: 'Challenge', description: 'Try a harder question or a more advanced concept' },
    { icon: <FaLightbulb />, text: 'Fun fact', description: 'Learn something surprising or amusing about the current topic' },
    { icon: <FaLaugh />, text: 'Joke', description: 'Hear a funny joke or a pun about the current topic' },
    { icon: <FaBookmark />, text: 'Bookmark', description: 'Save the current concept for future reference' },
    { icon: <FaBook />, text: 'Access bookmarked', description: 'Access and choose a bookmarked concept to revisit' },
    { icon: <FaListAlt />, text: 'Summary', description: 'Get a brief summary of the current concept or the whole topic' },
    { icon: <FaComments />, text: 'Feedback', description: 'Rate your learning experience and provide suggestions' },
    { icon: <FaRandom />, text: 'Jump', description: 'Jump to a specific topic in the syllabus' },
    { icon: <FaFileAlt />, text: 'Practice Sheet', description: 'Get a practice sheet with questions on the current concept or the whole topic' },
    { icon: <FaUndo />, text: 'Reset', description: 'Restart the chat to select a new topic' },
    { icon: <FaSignOutAlt />, text: 'Exit', description: 'End the learning session' },
];

const MenuButton = ({ handleMenu }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleMenuClick = (menuItem) => {
        handleMenu(menuItem);
        setIsOpen(false);
    };
    return (
        <div className="menu-container">
            <button className="menu-button" onClick={toggleMenu}>
                <FaBars />
            </button>
            {isOpen && (
                <div className="menu-options">
                    {menuItems.map((item, index) => (
                        <div key={index} className="menu-item" onClick={() => handleMenuClick(item.text)}>
                            {item.icon}
                            <span className="menu-text">{item.text}</span>
                            <span className="menu-description">{item.description}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuButton;

