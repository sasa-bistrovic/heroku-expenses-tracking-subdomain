import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NumericFormat } from 'react-number-format';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import tinycolor from 'tinycolor2';
import chroma from 'chroma-js';
import logo from './logo.png';
import howToUseImage from './how-to-use.jpg';
import freePlanImage from './free-plan.jpg';
import premiumPlanImage from './premium-plan.jpg';
import enterprisePlanImage from './enterprise-plan.jpg';
import Professional1 from './Professional1.jpg';
import Professional2 from './Professional2.jpg';
import Professional3 from './Professional3.jpg';
import Professional4 from './Professional4.jpg';
import Professional5 from './Professional5.jpg';
import { motion } from 'framer-motion';
import { jwtDecode } from "jwt-decode";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { BrowserProvider, parseEther } from 'ethers';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, // Broj pokušaja
  retryDelay: (retryCount) => {
    //alert(`Pokušaj ponovnog slanja: ${retryCount}`);
    return retryCount * 1000; // Pauza između pokušaja (1s, 2s, 3s)
  },
  retryCondition: (error) => {
    const shouldRetry = error.code === 'ECONNABORTED' || error.message.includes('Network Error');
    if (shouldRetry) {
    //  alert('Pokušaj ponovnog slanja zahtjeva zbog mrežne greške...');
    }
    return shouldRetry;
  },
});

const steps = [
  "Introduction to Expense Tracking\nIn this project, you'll complete your expense tracking in just 3 simple steps:\n1. Create Tasks\n2. Add Participants\n3. Log Expenses\n\nClick Next to begin with Step 1.",
  
//  "Sign Up and Verify Your Email\nAfter registration and email verification, start by creating a Task, then add Participants, and finally record Expenses.\n\nClick Next to learn how to create a Task.",
  
//  "Access the Task Form\n1. Click the Enter (Tasks, Participants and Expenses) button.\n2. Then, click Show Form.\n3. Finally, select Show Task Form.\n\nClick Next to proceed.",
  
  "Step 1: Task Details\nFill out the form with the following information:\n- Task Name: Enter a name for the task.\n- Measuring Unit: Specify the unit for the task (e.g., hours, items).\n- Quantity: Provide the quantity for the task.\n\nClick Next to proceed to Step 2.",
  
//  "Submit the Task\nAfter filling out the details, click Enter to create your Task.\n\nClick Next to learn how to add a Participant.",
  
//  "Access the Participant Form\n1. Click the Enter (Tasks, Participants and Expenses) button.\n2. Click Show Form.\n3. Choose Show Participant Form.\n\nClick Next to continue.",
  
  "Step 2: Participant Details\nEnter the participant information:\n- Participant Name: Enter the name of the participant.\n- Participant Email: Enter their email address.\n\nClick Next to proceed to Step 3.",
  
//  "Submit the Participant\nAfter entering the details, click Enter to add the Participant. The task creator is also the task owner, who is the only one able to modify the task and add participants, while others can only enter expenses.\n\nClick Next to add an Expense.",
  
//  "Access the Expense Form\n1. Click the Enter (Tasks, Participants and Expenses) button.\n2. In the Task List, select the Task and proceed to create an Expense.\n\nClick Next for instructions.",
  
  "Step 3: Expense Details\nLog the expense by entering the following:\n- Task List: Select task from list.\n- Expense Description: Describe the expense.\n- Quantity: Enter the quantity associated with the expense.\n\nClick Next to review your page.",
  
//  "Submit the Expense\nAfter entering the details, click Enter to finalize your Expense with its description and quantity.\n\nClick Next to see the final result.",
  
  "Review Your Expense Tracking Page\nYour expense tracking page is ready! It includes all the details you’ve entered.\n\nThat's it – you're all set!"
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const now = new Date();
  const [myExpirationDate, setMyExpirationDate] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

const exampleTable = {
  id: 1,
  titles: ['Alois'],
  headers: ["No.", "Description", "MU", "Expense"],
  rows: [
    [1, 'Braun Shaver Series 9', 'EUR', '500.00'],
  ],
  total: ['', '', 'Total', '500.00'] // The total will appear at the end
};

const exampleTable2 = {
  id: 1,
  titles: ['Alois'],
  headers: ["No.", "Description", "MU", "Expense"],
  rows: [],
  total: ['', '', 'Total', '0.00'] // The total will appear at the end
};

const Page23 = () => {
  if (location.pathname !== '/Home') {
    //console.log('Navigating to /Home');
    navigate('/Home');
  }
};


  useEffect(() => {
    const handlePopState = () => {
      // Refresh the page when back button is clicked
      setShowModal(false);
    };

    // Listen for back navigation
    window.addEventListener('popstate', handlePopState);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);


  const [isOpen, setIsOpen] = useState(false); // Dropdown menu open/close state
  const [openDialog1, setOpenDialog1] = useState(false);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [activePage, setActivePage] = useState('homepage'); // Currently active page
  const [zoomLevel, setZoomLevel] = useState(1);
  const [zoomLevel2, setZoomLevel2] = useState(1);
  const [zoomLevel3, setZoomLevel3] = useState(1);
  const [zoomLevel4, setZoomLevel4] = useState(1);
  const [zoomLevel5, setZoomLevel5] = useState(1);
  const [widthLevel1, setWidthLevel1] = useState("40%");
  const [widthLevel2, setWidthLevel2] = useState("70%");
  const [widthLevel3, setWidthLevel3] = useState("35px");
  const [widthLevel4, setWidthLevel4] = useState("16px");
  const [widthLevel5, setWidthLevel5] = useState("300px");
  const [widthLevel6, setWidthLevel6] = useState("16px");
  const [mainTableTop1, setMainTableTop1] = useState("20px");
  const [mainTableTop2, setMainTableTop2] = useState("35px");
  const [topLeftTableTop, setTopLeftTableTop] = useState("150px");
  const [topCenteredTableTop, setCenteredTableTop] = useState("480px");
  const [topCenteredTable2Top, setCenteredTable2Top] = useState("150px");
  const [topTableContainerTop, setTableContainerTop] = useState("250px");
  const [fontSize, setFontSize] = useState('18px');
  const [topValue1, setTopValue1] = useState('-15%');
  const [topValue2, setTopValue2] = useState('-25%');
  const [topValue3, setTopValue3] = useState('-50%');
  const [topValue4, setTopValue4] = useState('115%');
  const [topValue5, setTopValue5] = useState('125%');
  const [topValue6, setTopValue6] = useState('150%');
  const [topXValue1, setTopXValue1] = useState('-7');
  const [topXValue2, setTopXValue2] = useState('-22');
  const [topXValue3, setTopXValue3] = useState('-22');
  const [topXValue4, setTopXValue4] = useState(0);
  const [topXValue5, setTopXValue5] = useState(0);
  const [topXValue6, setTopXValue6] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [isSamsungBrowser, setIsSamsungBrowser] = useState(false);

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };



    const [colors, setColors] = useState({
        evenRowColor1: '',
        oddRowColor1: '',
        evenTextColor1: '',
        oddTextColor1: '',
        evenRowColor2: '',
        oddRowColor2: '',
        evenTextColor2: '',
        oddTextColor2: '',
        evenRowColor3: '',
        oddRowColor3: '',
        evenTextColor3: '',
        oddTextColor3: ''
    });

    useEffect(() => {
        const evenRowColor1 = getAdjustedColor(oddColor(1, 45), 10);
        const oddRowColor1 = getAdjustedColor(evenRowColor1, 20);
        const evenTextColor1 = getTextColor(evenRowColor1);
        const oddTextColor1 = getTextColor(oddRowColor1);

        const evenRowColor2 = getAdjustedColor(oddColor(1, 45), 10);
        const oddRowColor2 = getAdjustedColor(evenRowColor2, 20);
        const evenTextColor2 = getTextColor(evenRowColor2);
        const oddTextColor2 = getTextColor(oddRowColor2);

        const evenRowColor3 = getAdjustedColor(oddColor(1, 45), 10);
        const oddRowColor3 = getAdjustedColor(evenRowColor3, 20);
        const evenTextColor3 = getTextColor(evenRowColor3);
        const oddTextColor3 = getTextColor(oddRowColor3);

        setColors({
            evenRowColor1,
            oddRowColor1,
            evenTextColor1,
            oddTextColor1,
            evenRowColor2,
            oddRowColor2,
            evenTextColor2,
            oddTextColor2,
            evenRowColor3,
            oddRowColor3,
            evenTextColor3,
            oddTextColor3
        });
    }, []);

  const updateZoomLevel = () => {
   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const width = window.innerWidth;

    if (width <= 768) {
      // Mobile: screen width <= 768px
      setZoomLevel(0.25); // Example: 80% zoom
      setZoomLevel2(0.65);
      setZoomLevel3(0.70);
      setZoomLevel4(0.80);
      setZoomLevel5(0.80);
    if (/SamsungBrowser/i.test(userAgent)) {
      setZoomLevel5(0.8);
    }
      setWidthLevel1("70%");
      setWidthLevel2("90%");
      setWidthLevel3("60px");
      setWidthLevel4("11px");
      setWidthLevel5("245px");
      setWidthLevel6("12px");
      setMainTableTop1("20px");
      setMainTableTop2("25px");
      setTopLeftTableTop("650px");
      setCenteredTableTop("1090px");
      setCenteredTable2Top("650px");
      setTableContainerTop("770px");
      setFontSize('24px');
      setTopValue1('-5%');
      setTopValue2('-20%');
      setTopValue3('-30%');
      setTopValue4('105%');
      setTopValue5('120%');
      setTopValue6('130%');
      setTopXValue1('-5');
      setTopXValue2('-33');
      setTopXValue3('-28');
    } else if (width <= 1024) {
      // Tablet: screen width > 768px and <= 1024px
      setZoomLevel(0.50); // Example: 100% zoom
      setZoomLevel2(0.75);
      setZoomLevel3(0.80);
      setZoomLevel4(1);
      setZoomLevel5(1);
    if (/SamsungBrowser/i.test(userAgent)) {
      setZoomLevel5(1);
    }
      setWidthLevel1("55%");
      setWidthLevel2("85%");
      setWidthLevel3("50px");
      setWidthLevel4("12px");
      setWidthLevel5("260px");
      setWidthLevel6("14px");
      setTopLeftTableTop("325px");
      setCenteredTableTop("775px");
      setCenteredTable2Top("325px");
      setTableContainerTop("425px");
      setMainTableTop1("20px");
      setMainTableTop2("25px");
      setFontSize('21px');
      setTopValue1('0%');
      setTopValue2('0%');
      setTopValue3('0%');
      setTopValue4('100%');
      setTopValue5('100%');
      setTopValue6('100%');
      setTopXValue1('0');
      setTopXValue2('0');
      setTopXValue3('0');
    } else {
      // Desktop: screen width > 1024px
      setZoomLevel(1); // Example: 120% zoom
      setZoomLevel2(1);
      setZoomLevel3(1);
      setZoomLevel4(1);
      setZoomLevel5(1);
    if (/SamsungBrowser/i.test(userAgent)) {
      setZoomLevel5(1);
    }
      setWidthLevel1("30%");
      setWidthLevel2("60%");
      setWidthLevel3("35px");
      setWidthLevel4("16px");
      setWidthLevel5("330px");
      setWidthLevel6("16px");
      setTopLeftTableTop("165px");
      setCenteredTableTop("515px");
      setCenteredTable2Top("165px");
      setTableContainerTop("265px");
      setMainTableTop1("20px");
      setMainTableTop2("25px");
      setFontSize('18px');
      setTopValue1('-10%');
      setTopValue2('-25%');
      setTopValue3('-50%');
      setTopValue4('110%');
      setTopValue5('125%');
      setTopValue6('150%');
      setTopXValue1('-7');
      setTopXValue2('-35');
      setTopXValue3('-30');
    }
  };

  const getAdjustedColor = (color, amount) => {
    return tinycolor(color).lighten(amount).toString();
  };

  const getTextColor = (bgColor) => {
    const lightenedColor = getAdjustedColor(bgColor, 10);
    const luminance = chroma(lightenedColor).luminance();
    return luminance > 0.5 ? 'black' : 'white';
  };

const getRandomLightColor = () => {
  // Define the range for light colors by limiting the RGB values
  const getRandomChannelValue = () => Math.floor(Math.random() * 128) + 128; // Generates a value between 128 and 255

  const r = getRandomChannelValue();
  const g = getRandomChannelValue();
  const b = getRandomChannelValue();

  return `rgb(${r}, ${g}, ${b})`;
};


const pageStyle2 = {
  minHeight: '100%', // Ensure page takes full height
//  zoom: zoomLevel2,
  transform: 'scale(1)',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  backgroundColor: 'white',
  padding: '20px',
  boxSizing: 'border-box',
};

const pageStyle3 = {
  top: '60px',
};

const pageStyle1 = {
  minHeight: '100%', // Ensure page takes full height
  zoom: 1,
//  transform: 'scale(1)',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center content vertically
  alignItems: 'center', // Center content horizontally
  backgroundColor: 'white',
  padding: '20px',
  boxSizing: 'border-box',
};


const tableContainerStyle = {
  fontSize: widthLevel4,
  padding: '0px', // Remove extra padding
  margin: '0px',  // Remove extra margin
  width: '100%',  // Ensure containers are full width to align tables correctly
  display: 'flex',
  justifyContent: 'center', // Center tables horizontally
};

const tableStyle2 = {
  borderSpacing: '0',
  padding: '0',
  width: '45%', // Ensure all tables have the same width if needed
};

const styles = {
  body: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  app: {
    textAlign: 'center',
    position: 'relative',
    paddingTop: '20px', // Space for fixed header
  },
  app2: {
    paddingTop: '-25px', // Space for fixed header
  },
  hero: {
    position: 'relative',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '80px 20px', // Adjusted padding
    marginBottom: '50px',
  },
  heroH1: {
    position: 'relative',
    fontSize: '2.5rem',
    fontWeight: 600,
  },
  heroP: {
    position: 'relative',
    fontSize: '1.2rem',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    backgroundColor: 'white',
    marginBottom: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  sectionAlt: {
    backgroundColor: '#e0e0e0',
  },
  sectionImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  sectionContent: {
    maxWidth: '500px',
    textAlign: 'center',
  },
  sectionContentH2: {
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  sectionContentP: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
  },
  price: {
    fontSize: '1.3rem',
    color: '#4caf50',
    fontWeight: 'bold',
  },
  footer: {
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    fontSize: '1rem',
  },
  topLeftTable: {
    position: 'absolute',
    top: topLeftTableTop,
    left: '20px',
    width: '550px', // Adjust width as needed
    backgroundColor: '#ccffcc',
  },
  centeredTable: {
    position: 'absolute',
    fontSize: fontSize,
    top: topCenteredTableTop,
    width: '25%', // Let the table width adjust automatically
    margin: '0px 0px', // Center horizontally
    backgroundColor: '#ffcccc',
  },
  centeredTable2: {
    position: 'absolute',
    fontSize: fontSize,
    top: topCenteredTable2Top,
    width: '25%', // Let the table width adjust automatically
    margin: '0px 0px', // Center horizontally
    backgroundColor: '#ffcccc',
  },
  leftContainer: {
    width: '100%', // Ensure the container takes up full width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginLeft: '0px', // No left margin needed
    height: '50vh', // Ensure the container takes up full height
  },
  tableContainer: {
    position: 'absolute',
    fontSize: fontSize,
    top: topTableContainerTop,
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    margin: '20px auto',
  },
  howToUseSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  imageContainer: {
    margin: '20px 0'
  },
  image: {
    maxWidth: '100%',
    height: 'auto'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#6e8efb',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  bgMario: {
    backgroundColor: '#ffcccc',
    flex: 1,
    margin: '0 0px',
  },
  bgMarioThead: {
    backgroundColor: '#ff9999',
  },
  bgJosipa: {
    backgroundColor: '#ccffcc',
    flex: 1,
    margin: '0 0px',
  },
  bgJosipaThead: {
    backgroundColor: '#99ff99',
  },
  bgWhite: {
    backgroundColor: '#ffffff',
    flex: 1,
    margin: '0 0px',
  },
  bgWhiteThead: {
    backgroundColor: '#ffffff',
  },
  bgIvana: {
    backgroundColor: '#ccccff',
    flex: 1,
    margin: '0 0px',
  },
  bgIvanaThead: {
    backgroundColor: '#9999ff',
  },
  bgMarta: {
    backgroundColor: '#ffffcc',
    flex: 1,
    margin: '0 0px',
  },
  bgMartaThead: {
    backgroundColor: '#ffff99',
  },
/*
  pageContainer10: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '477px',
    height: '101%',
    zoom: zoomLevel2,
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
//    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
  },
*/
pageContainer10: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '477px',
    height: 'auto',
    zoom: zoomLevel2,
    margin: 'auto',
    padding: '2rem',
    paddingBottom: '3rem',
    marginBottom: '3rem', // Add this to create space below
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    overflow: 'visible', // Ensure overflow is visible
    boxShadow: '0 15px 20px rgba(0, 0, 0, 0.15)', // Increase shadow offset and blur
},
  heading10: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  },
  subHeading10: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '1rem',
  },
  section10: {
    marginBottom: '2rem',
  },
  section10: {
    marginBottom: '2rem',
  },
  bingH1: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)', // Centriranje teksta horizontalno
    fontSize: '14px',
    fontWeight: 'bold', // Ovdje postavljaš debljinu fonta
    color: '#000',
    textAlign: 'center',
    backgroundColor: '#ffffff', // Samo radi vizualizacije
    width: '100%', // Osigurava da tekst ne bude odsečen
  },
  button10: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
  infoText10: {
    fontSize: '1rem',
    color: '#666',
  },
  subscriptionCard10: {
    border: '1px solid #ddd',
    padding: '1rem',
    margin: '10px 0',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#333',
  },
  planList10: {
    listStyle: 'none',
    padding: 0,
  },
  planItem10: {
    backgroundColor: '#e9e9e9',
    padding: '0.5rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  formControl10: {
    marginBottom: '1rem',
  },
  label10: {
    display: 'block',
    fontSize: '1rem',
    color: '#555',
    marginBottom: '0.5rem',
  },
  input10: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  select10: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  checkboxLabel10: {
    fontSize: '1rem',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
  },
  checkbox10: {
    marginRight: '0.5rem',
  },
  statusMessage10: {
    marginTop: '1rem',
    fontSize: '1rem',
    color: '#333',
  },
  sectionSquare10: {
    width: '400px', // adjust as needed
    height: '400px', // adjust as needed
    backgroundColor: '#f0f0f0', // background color for the square
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    borderRadius: '8px', // optional: for rounded corners
  },
  sectionSquareTitle10: {
    fontSize: '1.5em', // adjust font size as needed
    color: '#333', // color for the title text
    textAlign: 'center',
    margin: 0,
  },
};

const Section = ({ title, description, imageUrl, price, alt }) => {
  return (
    <motion.div
      style={{
        ...styles.section,
        ...(alt && styles.sectionAlt),
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src={imageUrl} alt={title} style={styles.sectionImage} />
      <div style={styles.sectionContent}>
        <h2 style={styles.sectionContentH2}>{title}</h2>
        <p style={styles.sectionContentP}>{description}</p>
        {price && <p style={styles.price}>Price: {price}</p>}
      </div>
    </motion.div>
  );
};

const Section2 = ({ title, description, imageUrl, price, alt }) => {
  return (
    <motion.div
      style={{
        ...styles.section,
        ...(alt && styles.sectionAlt),
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src={imageUrl} alt={title} style={styles.sectionImage} onClick={() => {
          Page23();
          setCurrentStep(0);
          setTimerInterval(1000);
          handlePageChange('step0');
  }}/>
      <div style={styles.sectionContent}>
        <h2 style={styles.sectionContentH2}>{title}</h2>
        <p style={styles.sectionContentP}>{description}</p>
        {price && <p style={styles.price}>Price: {price}</p>}
      </div>
    </motion.div>
  );
};

const Section3 = ({ title, description, imageUrl, price, alt, maxTasks, maxParticipants, maxExpenses }) => {
  return (
    <motion.div
      style={{
        ...styles.section,
        ...(alt && styles.sectionAlt),
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <img src={imageUrl} alt={title} style={styles.sectionImage} />

<div style={{ textAlign: 'center', margin: '20px 0' }}>
  <button
    onClick={() => setIsAnnual(!isAnnual)}
    style={{
      backgroundColor: '#4CAF50', // Zelena boja
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '8px', // Zaobljeni rubovi
      cursor: 'pointer',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sjenka
      transition: '0.3s ease', // Efekt prijelaza
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'} // Tamnija zelena na hover
    onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
  >
    {isAnnual ? 'Switch to Monthly' : 'Switch to Annual'}
  </button>
</div>

      <div style={styles.sectionContent}>
        <p style={styles.sectionContentP}><b>{title} Plan</b> {description}</p>
        {price && <p style={styles.price}>Price: {price}</p>}
      </div>
    </motion.div>
  );
};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    howToUse: false,
    freePlan: false,
    premiumPlan: false,
    enterprisePlan: false,
  });

  const howToUseRef = useRef(null);
  const freePlanRef = useRef(null);
  const premiumPlanRef = useRef(null);
  const enterprisePlanRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const checkVisibility = (ref, key) => {
        if (ref.current) {
          const top = ref.current.getBoundingClientRect().top + scrollY;
          if (scrollY + viewportHeight > top + 100) {
            setVisibleSections((prev) => ({ ...prev, [key]: true }));
          }
        }
      };

      checkVisibility(howToUseRef, 'howToUse');
      checkVisibility(freePlanRef, 'freePlan');
      checkVisibility(premiumPlanRef, 'premiumPlan');
      checkVisibility(enterprisePlanRef, 'enterprisePlan');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set zoom level on component mount
    updateZoomLevel();

    // Update zoom level on window resize
    window.addEventListener('resize', updateZoomLevel);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateZoomLevel);
    };
  }, []);


const tableContainer3 = {
    zoom: zoomLevel2,
//    transform: 'scale('+zoomLevel2+')',
    width: widthLevel1,
};

const tableContainer2 = {
    zoom: zoomLevel2,
//    transform: 'scale('+zoomLevel2+')',
    width: widthLevel2,
};


const pageStyle = {
  minHeight: '100%', // Ensure page takes full height
  width: '100%',
  zoom: zoomLevel,
//  transform: 'scale('+zoomLevel+')',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', // Align content to the top
  alignItems: 'center',
  backgroundColor: 'white',
  padding: '100px',
  boxSizing: 'border-box',
};



  const [selectedTaskByTask, setSelectedTaskByTask] = useState('');
  const [selectedTaskByUser, setSelectedTaskByUser] = useState('');
  const [selectedTaskByExpense, setSelectedTaskByExpense] = useState('');
  const [tables, setTables] = useState([]);
  const [topLevel, setTopLevel] = useState('0%');
  const [heightLevel, setHeightLevel] = useState('100%');
  const [isDanger, setIsDanger] = useState(false);
  const [isDanger2, setIsDanger2] = useState(false);
  const [isDanger3, setIsDanger3] = useState(false);
  const [isDanger4, setIsDanger4] = useState(false);
  const [isDanger5, setIsDanger5] = useState(false);
  const [isDanger6, setIsDanger6] = useState(false);
  const [isDanger7, setIsDanger7] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasError2, setHasError2] = useState(false);
  const [hasError3, setHasError3] = useState(false);
  const [hasError4, setHasError4] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [measuringUnit, setMeasuringUnit] = useState('');
  const [limitValue, setLimitValue] = useState('');
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expensePrice, setExpensePrice] = useState("");

  const cursorStyles = {
    width: '32px', // Cursor size
    height: '32px',
    backgroundImage: isClicking ? `url(/cursor_red_circle.png)` : `url(/cursor_white.png)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
//    zoom: zoomLevel5,
    transform: 'scale('+zoomLevel5+')',
    top: '0',
    left: '0',
    zIndex: '1000',
    pointerEvents: 'none', // Make sure the cursor does not interfere with button interaction
    display: showCursor ? 'block' : 'none', // Hide or show cursor based on state
  };

const modalBottomStyles1 = {
  position: 'fixed',
  left: 0, // Align to the left edge of the viewport
  top: 0, // Align to the top edge of the viewport
  transform: `scale(${zoomLevel4})`, // Scale based on zoom level
  transformOrigin: 'top center', // Scale from the top-left corner
  margin: 0,
  width: '100%', // Full width of the viewport
  height: '300%', // Full height of the viewport
  maxWidth: '100%', // Prevent exceeding the width of the viewport
  maxHeight: '300%', // Prevent exceeding the viewport height
  zIndex: 999,
};

  const modalBottomStyles2 = {
    position: 'fixed',
    top: '57%',
    left: 0,
    right: 0,
    transform: 'scale('+zoomLevel4+')',
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    zIndex: 9999,
  };


  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get("/api/tables")
      .then(response => {
        setTables(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tables!", error);
      });
  }, []);

const tableColors = {};

const generateTableColors = (id) => {
  if (!tableColors[id]) {
    const evenRowColor = getRandomLightColor();
    const oddRowColor = getAdjustedColor(evenRowColor, -8);
    const evenTextColor = getTextColor(evenRowColor);
    const oddTextColor = getTextColor(oddRowColor);
    const headerColor = getAdjustedColor(evenRowColor, -16);
    const headerTextColor = getTextColor(headerColor);

    tableColors[id] = {
      evenRowColor,
      oddRowColor,
      evenTextColor,
      oddTextColor,
      headerColor,
      headerTextColor
    };
  }

  return tableColors[id];
};

const stringToLightColor = (str) => {
    // Ensure the input string is a valid 14-digit string (yyyyMMddHHmmss)
    if (!/^\d{14}$/.test(str)) {
        throw new Error('Invalid date-time string format');
    }
    
    // Convert the string to a numeric value
    const numericValue = parseInt(str, 10);
    
    // Use modulus operation to ensure values are within the RGB range (0-255)
    const red = (numericValue % 256);
    const green = ((numericValue >> 8) % 256);
    const blue = ((numericValue >> 16) % 256);

    // Return the color in RGB format
    return `rgb(${red}, ${green}, ${blue})`;
};

const numberToLightColor = (num) => {
  // Normalize the number to a range between 0 and 360
  const hue = (num * 60) % 360;
  return `hsl(${hue}, 100%, 80%)`; // Light color with 80% lightness
};

const integerToLightColor = (id) => {
  // Convert integer to string
  const str = id.toString();
  // Use the string in the color generation function
  return stringToLightColor(str);
};

const evenColor = (id, lightness) => `hsl(${(id * 37 + 180) % 360}, 30%, ${lightness}%)`;  // Prigušena boja za even redove
const oddColor = (id, lightness) => `hsl(${(id * 53 + 220) % 360}, 30%, ${lightness}%)`;   // Prigušena boja za odd redove
const headerColor = (id, lightness) => `hsl(${(id * 71 + 240) % 360}, 30%, ${lightness}%)`; // Prigušena boja za header

const renderTable = (table) => {
  if (!table) {
    return null;
  }
    const headerColor2 = getAdjustedColor(oddColor(table.id+1, 45), 10);
    const oddRowColor = getAdjustedColor(headerColor2,10);
    const evenRowColor = getAdjustedColor(headerColor2,20);
    const evenTextColor = getTextColor(evenRowColor);
    const oddTextColor = getTextColor(oddRowColor);
    const headerTextColor = getTextColor(headerColor2);

  return (
    <table key={table.id} style={{ ...tableContainer2, marginTop: 0, marginBottom: 0 }} className="table table-bordered rounded-corners table-success">
      <thead>
        {table.titles.map((title, i) => (
          <tr key={i}>
            <th colSpan={table.headers.length} style={{ textAlign: 'center', fontSize: '21px', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              {title}
            </th>
          </tr>
        ))}
        <tr>
          {table.headers.map((header, headerIndex) => (
            <th key={headerIndex} style={{ textAlign : headerIndex === 0 ? 'center' : headerIndex === 1 ? 'left' : headerIndex === 2 ? 'center' : 'right', width: headerIndex === 0 ? '10%' : headerIndex === 1 ? '50%' : headerIndex === 2 ? '10%' : '30%', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, rowIndex) => (
          <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? evenRowColor : oddRowColor }}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ textAlign: cellIndex === 0 ? 'center' : cellIndex === 1 ? 'left' : cellIndex === 2 ? 'center' : 'right', backgroundColor: rowIndex % 2 === 0 ? evenRowColor : oddRowColor, color: rowIndex % 2 === 0 ? evenTextColor : oddTextColor, padding: 10 }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
        {table.total && (
          <tr>
            <td colSpan={table.headers.length - 1} style={{ textAlign: 'right', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              <b>Total</b>
            </td>
            <td style={{ textAlign: 'right', backgroundColor: headerColor2, color: headerTextColor, padding: 10 }}>
              <b>{table.total[table.total.length - 1]}</b>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};


  // Handle page change and close dropdown
  const handlePageChange = (page) => {
    setActivePage(page);
    setIsOpen(false); // Close dropdown when an option is clicked
  };

  // Handle clicks outside of the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener for clicks outside of the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [tasksByTask, setTasksByTasks] = useState([]);
  const [tasksByUser, setTasksByUsers] = useState([]);
  const [tasksByExpense, setTasksByExpenses] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [section, setSection] = useState('login');
  const [currentPage, setCurrentPage] = useState(1);
  const [intervalPage, setIntervalPage] = useState(1);
  const [timerInterval, setTimerInterval] = useState(2000);
  const [taskByTask, setTaskByTask] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
  });

  const [newTaskByTask, setNewTaskByTask] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
  });

  const [taskByUser, setTaskByUser] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
  });

  const [taskByExpense, setTaskByExpense] = useState({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: '',
    balance: 0
  });

const getZoomLevel = () => {
  // Detect Samsung Browser via User-Agent
  const isSamsungBrowser = /SamsungBrowser/i.test(navigator.userAgent);

  // Try using visualViewport.scale if available and not Samsung Browser
  if (!isSamsungBrowser && window.visualViewport && window.visualViewport.scale) {
    return Math.round(window.visualViewport.scale * 100) / 100;
  }

  // Fallback: Use screen.width vs window.innerWidth
  const screenWidthZoom = Math.round((window.screen.width / window.innerWidth) * 100) / 100;

  // If Samsung Browser or if screenWidthZoom seems unreliable, use devicePixelRatio as backup
  const deviceZoom = Math.round((window.devicePixelRatio || 1) * 100) / 100;
  const zoomEstimate = screenWidthZoom > 0.9 ? screenWidthZoom : deviceZoom;

  // Get the modal element
  const element = document.getElementById('modal-element');
  if (!element) return zoomEstimate;

  // Use bounding box width vs offsetWidth for fine-tuning
  const rect = element.getBoundingClientRect();
  const elementZoom = rect.width / element.offsetWidth;

  // Combine methods for final zoom level
  return Math.round((zoomEstimate * elementZoom) * 100) / 100;
};

useEffect(() => {
  // Ensure the effect only runs when on 'step2' and on specific interval pages
  if (
    activePage === 'step1' &&
    (intervalPage === 1001 || intervalPage === 1002 || intervalPage === 1003 || intervalPage === 1004 || intervalPage === 1005)
  ) {

      // Define the delay function
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Define the moveCursor function
      const moveCursor = (cursor, x, y, onClick) => {
        return new Promise((resolve) => {
          cursor.style.transition = 'transform 1s ease'; // Smooth transition
          cursor.style.transform = `translate(${x}px, ${y}px)`; // Move to the new position

          setTimeout(() => {
            onClick(); // Simulate a click when the cursor reaches the position
            resolve(); // Resolve the promise after movement is complete
          }, 1000); // Wait for 1 second (duration of the transition)
        });
      };

      const animateCursor = async () => {
        // Move cursor to Button1 and simulate a click
//        await moveCursor(cursor, button1Center.x, button1Center.y, () => setIsClicking(false));
//        await delay(500); // Simulate click hold time
//        setIsClicking(false);


    const cursor = document.getElementById('virtual-cursor');
//    const zoomLevel = getZoomLevel(); // Get the current zoom level
    let button1, button2;

    // Dynamically assign buttons based on intervalPage
    switch (intervalPage) {
      case 1001:
        button1 = document.getElementById('button10');
        button2 = document.getElementById('button10'); // Same button for intervalPage === 3
        break;
      case 1002:
        button1 = document.getElementById('button10');
        button2 = document.getElementById('button1');
        break;
      case 1003:
        button1 = document.getElementById('button1');
        button2 = document.getElementById('button2');
        break;
      case 1004:
        button1 = document.getElementById('button2');
        button2 = document.getElementById('button3');
        break;
      default:
        return; // Exit if none match
    }

    // Ensure both button elements exist before proceeding
//    if (button1 && button2) {
      const button1Rect = button1.getBoundingClientRect();
      const button2Rect = button2.getBoundingClientRect();

      const button2Center = {
    x: (button2Rect.left + button2Rect.width / 2), // Scale by zoom level
    y: (button2Rect.top + button2Rect.height / 2)  // Scale by zoom level
      };

        // Move cursor to Button2 and simulate a click
        await moveCursor(cursor, button2Center.x, button2Center.y, () => {setIsClicking(true);
          if (intervalPage === 1001) {}
          if (intervalPage === 1002) {}
          if (intervalPage === 1003) {}
          if (intervalPage === 1004) {}
        });
        await delay(500); // Simulate click hold time
        setIsClicking(false);
    switch (intervalPage) {
      case 1001:
        setShowModal(true);
        setIntervalPage(7);
        break;
      case 1002:
        setShowTaskParticipant(true);
        setIntervalPage(11);
        break;
      case 1003:
        setShowTaskForm(true);
        setIntervalPage(15);
        break;
      case 1004:
        setIntervalPage(1000);
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'Spending money in the store',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('');
          setSelectedTask('Spending money in the store');
        break;
      default:
        return; // Exit if none match
    }
      };

      // Start cursor animation
      animateCursor();

//    }

  }

  if (
    activePage === 'step2' &&
    (intervalPage === 1001 || intervalPage === 1002 || intervalPage === 1003 || intervalPage === 1004 || intervalPage === 1005)
  ) {
    const cursor = document.getElementById('virtual-cursor');
    const zoomLevel = getZoomLevel(); // Get the current zoom level
    let button1, button2;

    // Dynamically assign buttons based on intervalPage
    switch (intervalPage) {
      case 1001:
        button1 = document.getElementById('button10');
        button2 = document.getElementById('button10'); // Same button for intervalPage === 3
        break;
      case 1002:
        button1 = document.getElementById('button10');
        button2 = document.getElementById('button1');
        break;
      case 1003:
        button1 = document.getElementById('button1');
        button2 = document.getElementById('button4');
        break;
      case 1004:
        button1 = document.getElementById('button4');
        button2 = document.getElementById('button5');
        break;
      default:
        return; // Exit if none match
    }

    // Ensure both button elements exist before proceeding
    if (button1 && button2) {
      // Define the delay function
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Define the moveCursor function
      const moveCursor = (cursor, x, y, onClick) => {
        return new Promise((resolve) => {
          cursor.style.transition = 'transform 1s ease'; // Smooth transition
          cursor.style.transform = `translate(${x}px, ${y}px)`; // Move to the new position

          setTimeout(() => {
            onClick(); // Simulate a click when the cursor reaches the position
            resolve(); // Resolve the promise after movement is complete
          }, 1000); // Wait for 1 second (duration of the transition)
        });
      };

      const animateCursor = async () => {
      const button1Rect = button1.getBoundingClientRect();
      const button2Rect = button2.getBoundingClientRect();

      const button2Center = {
    x: (button2Rect.left + button2Rect.width / 2), // Scale by zoom level
    y: (button2Rect.top + button2Rect.height / 2)  // Scale by zoom level
      };

        // Move cursor to Button1 and simulate a click
//        await moveCursor(cursor, button1Center.x, button1Center.y, () => setIsClicking(false));
//        await delay(500); // Simulate click hold time
//        setIsClicking(false);

        // Move cursor to Button2 and simulate a click
        await moveCursor(cursor, button2Center.x, button2Center.y, () => {setIsClicking(true);
          if (intervalPage === 1001) {}
          if (intervalPage === 1002) {}
          if (intervalPage === 1003) {}
          if (intervalPage === 1004) {}
        });
        await delay(500); // Simulate click hold time
        setIsClicking(false);
    switch (intervalPage) {
      case 1001:
        setShowModal(true);
        setIntervalPage(7);
        break;
      case 1002:
        setShowTaskParticipant(true);
        setIntervalPage(11);
        break;
      case 1003:
        const modalelement = document.getElementById('modal-element');
        const modalelementtop = modalelement.getBoundingClientRect().top;
        const modalelementleft = modalelement.getBoundingClientRect().left;
        modalelement.style.transform = `translate(0%, ${topXValue3}%)`;
        setShowParticipantForm(true);
        setIntervalPage(15);
        break;
      case 1004:
  setTables([exampleTable2]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'Spending money in the store',
    measuringUnit: 'EUR',
    balance: -1000
  }));
  setSelectedTaskByTask('Spending money in the store');
        setIntervalPage(1000);
        break;
      default:
        return; // Exit if none match
    }
      };

      // Start cursor animation
      animateCursor();
    }
  }

  if (
    activePage === 'step3' &&
    (intervalPage === 1001 || intervalPage === 1002 || intervalPage === 1003 || intervalPage === 1004 || intervalPage === 1005)
  ) {
    const cursor = document.getElementById('virtual-cursor');
    const zoomLevel = getZoomLevel(); // Get the current zoom level
    let button1, button2;

    // Dynamically assign buttons based on intervalPage
    switch (intervalPage) {
      case 1001:
        button1 = document.getElementById('button10');
        button2 = document.getElementById('button10'); // Same button for intervalPage === 3
        break;
      case 1002:
        button1 = document.getElementById('button10');
        button2 = document.getElementById('button6');
        break;
      default:
        return; // Exit if none match
    }

    // Ensure both button elements exist before proceeding
    if (button1 && button2) {
      const button1Rect = button1.getBoundingClientRect();
      const button2Rect = button2.getBoundingClientRect();

      const button2Center = {
    x: (button2Rect.left + button2Rect.width / 2), // Scale by zoom level
    y: (button2Rect.top + button2Rect.height / 2)  // Scale by zoom level
      };

      // Define the delay function
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      // Define the moveCursor function
      const moveCursor = (cursor, x, y, onClick) => {
        return new Promise((resolve) => {
          cursor.style.transition = 'transform 1s ease'; // Smooth transition
          cursor.style.transform = `translate(${x}px, ${y}px)`; // Move to the new position

          setTimeout(() => {
            onClick(); // Simulate a click when the cursor reaches the position
            resolve(); // Resolve the promise after movement is complete
          }, 1000); // Wait for 1 second (duration of the transition)
        });
      };

      const animateCursor = async () => {
        // Move cursor to Button1 and simulate a click
//        await moveCursor(cursor, button1Center.x, button1Center.y, () => setIsClicking(false));
//        await delay(500); // Simulate click hold time
//        setIsClicking(false);

        // Move cursor to Button2 and simulate a click
        await moveCursor(cursor, button2Center.x, button2Center.y, () => {setIsClicking(true);
          if (intervalPage === 1001) {}
          if (intervalPage === 1002) {}
          if (intervalPage === 1003) {}
          if (intervalPage === 1004) {}
          });
        await delay(500); // Simulate click hold time
        setIsClicking(false);
    switch (intervalPage) {
      case 1001:
        setShowModal(true);
        setIntervalPage(7);
        break;
      case 1002:
  setTables([exampleTable]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'Spending money in the store',
    measuringUnit: 'EUR',
    balance: -500
  }));
        setIntervalPage(1000);
        break;
      default:
        return; // Exit if none match
    }
      };

      // Start cursor animation
      animateCursor();
    }
  }

}, [activePage, intervalPage]);

const handleNext = () => {
  if (currentStep < steps.length - 1) {
    const nextStep = currentStep + 1; // Calculate next step first
    setCurrentStep(nextStep);
    setActivePage('step' + nextStep); // Use the nextStep here
    if (nextStep === 0) {
      setIntervalPage(1);
    } else if (nextStep === 1) {
      setIntervalPage(3);
    } else if (nextStep === 2) {
      setIntervalPage(3);
    } else if (nextStep === 3) {
      setIntervalPage(3);
    } else if (nextStep === 4) {
      setIntervalPage(20);
    }
  }
};

// Fix handlePrevious
const handlePrevious = () => {
  if (currentStep > 0) {
    const previousStep = currentStep - 1; // Calculate previous step first
    setCurrentStep(previousStep);
    setActivePage('step' + previousStep); // Use the previousStep here
    if (previousStep === 0) {
      setIntervalPage(1);
    } else if (previousStep === 1) {
      setIntervalPage(3);
    } else if (previousStep === 2) {
      setIntervalPage(3);
    } else if (previousStep === 3) {
      setIntervalPage(3);
    } else if (previousStep === 4) {
      setIntervalPage(20);
    }
  }
};


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  useEffect(() => {
  if (['step0', 'step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8', 'step9', 'step10', 'step11', 'step12'].includes(activePage)) {
    const interval = setInterval(() => {
      if (activePage === 'step0') {
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: '',
    balance: -1000
  }));
  setTables([null]);
  setSelectedTaskByTask('');
  setShowCursor(false);
  const cursor = document.getElementById('virtual-cursor');
  cursor.style.transform = `translate(0px, 0px)`;
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
        setTopLevel('0%');
        setHeightLevel('100%');          
      }
      if (activePage === 'step1') {
         if (intervalPage === 3) {
  setShowCursor(false);
  const cursor = document.getElementById('virtual-cursor');
  cursor.style.transform = `translate(0px, 0px)`;
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: '',
    balance: -1000
  }));
  setSelectedTaskByTask('');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(4);
          setTopLevel('0%');
          setHeightLevel('100%');          	
        } else if (intervalPage === 4) {
          setShowCursor(true);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(5);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 5) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(6);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 6) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1001);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 7) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(8);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 8) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(9);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 9) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(10);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 10) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1002);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 11) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(12);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 12) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(13);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 13) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(14);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 14) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger3(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1003);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 15) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          const modalelement = document.getElementById('modal-element');
          const modalelementtop = modalelement.getBoundingClientRect().top;
          const modalelementleft = modalelement.getBoundingClientRect().left;
          modalelement.style.transform = `translate(0%, ${topXValue1}%)`;
          setIntervalPage(16);
          setHeightLevel(topValue4);
        } else if (intervalPage === 16) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(17);
         setHeightLevel(topValue4);
        } else if (intervalPage === 17) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(18);
         setHeightLevel(topValue4);
        } else if (intervalPage === 18) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(19);
         setHeightLevel(topValue4);
        } else if (intervalPage === 19) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(20);
          setHeightLevel(topValue4);
        } else if (intervalPage === 20) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(21);
         setHeightLevel(topValue4);
        } else if (intervalPage === 21) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(22);
         setHeightLevel(topValue4);
        } else if (intervalPage === 22) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(23);
         setHeightLevel(topValue4);
        } else if (intervalPage === 23) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(24);
          setHeightLevel(topValue4);
        } else if (intervalPage === 24) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(25);
         setHeightLevel(topValue4);
        } else if (intervalPage === 25) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(26);
         setHeightLevel(topValue4);
        } else if (intervalPage === 26) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(27);
         setHeightLevel(topValue4);
        } else if (intervalPage === 27) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(28);
          setHeightLevel(topValue4);
        } else if (intervalPage === 28) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(29);
         setHeightLevel(topValue4);
        } else if (intervalPage === 29) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(30);
         setHeightLevel(topValue4);
        } else if (intervalPage === 30) {
          setTaskName('Spending money in the store');
          setSelectedTask('');
          setMeasuringUnit('EUR');
          setLimitValue('-1000.00');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger4(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(true);
          setShowParticipantForm(false);
          setIntervalPage(1004);
         setHeightLevel(topValue4);
        }
        }
      if (activePage === 'step2') {
         if (intervalPage === 3) {
setShowCursor(false);
  const cursor = document.getElementById('virtual-cursor');
  cursor.style.transform = `translate(0px, 0px)`;
  setTables([null]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'Spending money in the store',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(4);
          setTopLevel('0%');
          setHeightLevel('100%');          	
        } else if (intervalPage === 4) {
          setShowCursor(true);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(5);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 5) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(6);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 6) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1001);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 7) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(8);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 8) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(9);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 9) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(10);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 10) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger2(true);
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1002);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 11) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(12);
          setHeightLevel(topValue5);
          const modalelement = document.getElementById('modal-element');
          const modalelementtop = modalelement.getBoundingClientRect().top;
          const modalelementleft = modalelement.getBoundingClientRect().left;
          modalelement.style.transform = `translate(0%, ${topXValue2}%)`;
        } else if (intervalPage === 12) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(13);
          setHeightLevel(topValue5);
        } else if (intervalPage === 13) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(14);
          setHeightLevel(topValue5);
        } else if (intervalPage === 14) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1003);
          setHeightLevel(topValue5);
        } else if (intervalPage === 15) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(16);
          setHeightLevel(topValue6);
        } else if (intervalPage === 16) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(17);
          setHeightLevel(topValue6);
        } else if (intervalPage === 17) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(18);
          setHeightLevel(topValue6);
        } else if (intervalPage === 18) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(19);
          setHeightLevel(topValue6);
        } else if (intervalPage === 19) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(20);
          setHeightLevel(topValue6);
        } else if (intervalPage === 20) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(21);
          setHeightLevel(topValue6);
        } else if (intervalPage === 21) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(22);
          setHeightLevel(topValue6);
        } else if (intervalPage === 22) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger5(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(23);
          setHeightLevel(topValue6);
        } else if (intervalPage === 23) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(24);
          setHeightLevel(topValue6);
        } else if (intervalPage === 24) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(25);
          setHeightLevel(topValue6);
        } else if (intervalPage === 25) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(false);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(26);
          setHeightLevel(topValue6);
        } else if (intervalPage === 26) {
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('Alois');
          setParticipantEmail('my.name@email.com');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger6(true);
          setHasError(false);
          setShowTaskParticipant(true);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(true);
          setIntervalPage(1004);
          setHeightLevel(topValue6);
        }
        }
      if (activePage === 'step3') {
         if (intervalPage === 3) {
setShowCursor(false);
  const cursor = document.getElementById('virtual-cursor');
  cursor.style.transform = `translate(0px, 0px)`;
  setTables([exampleTable2]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'Spending money in the store',
    measuringUnit: 'EUR',
    balance: -1000
  }));
  setSelectedTaskByTask('Spending money in the store');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setShowTaskParticipant(false);
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(4);
          setTopLevel('0%');
          setHeightLevel('100%');          	
        } else if (intervalPage === 4) {
          setShowCursor(true);
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(5);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 5) {
          setIsDanger(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(6);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 6) {
          setIsDanger(true);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1001);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 7) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(8);
          setTopLevel('0%');
          setHeightLevel('100%');
        } else if (intervalPage === 8) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(9);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 9) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(10);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 10) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(11);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 11) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(12);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 12) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(13);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 13) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(14);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 14) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(15);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 15) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(16);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 16) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(17);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 17) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(18);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 18) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(19);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 19) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(20);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 20) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(true);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(21);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 21) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(false);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(22);
          setTopLevel('0%');
         setHeightLevel('100%');
        } else if (intervalPage === 22) {
          setHasError3(false);
          setHasError4(false);
          setIsDanger7(true);
          setSelectedTask('Spending money in the store');
          setExpenseDescription('Braun Shaver Series 9');
          setExpensePrice('500.00');
          setShowTaskParticipant(false);
          setShowModal(true);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1002);
          setTopLevel('0%');
         setHeightLevel('100%');
        }
        }
      if (activePage === 'step4') {
  setShowCursor(false);
  const cursor = document.getElementById('virtual-cursor');
  cursor.style.transform = `translate(0px, 0px)`;
  setTables([exampleTable]);
  setTaskByTask((prevState) => ({
    ...prevState,
    accountEmail: 'my.name@email.com',
    limitValue: -1000,
    taskName: 'Spending money in the store',
    measuringUnit: 'EUR',
    balance: -500
  }));
  setSelectedTaskByTask('Spending money in the store');
          setIsDanger(false);
          setIsDanger2(false);
          setIsDanger3(false);
          setIsDanger4(false);
          setIsDanger5(false);
          setIsDanger6(false);
          setIsDanger7(false);
          setIsDanger7(false);
          setHasError(false);
          setHasError2(false);
          setHasError3(false);
          setHasError4(false);
          setTaskName('');
          setSelectedTask('');
          setMeasuringUnit('');
          setLimitValue('');
          setParticipantName('');
          setParticipantEmail('');
          setExpenseDescription('');
          setExpensePrice('');
          setSelectedParticipant('');
          setIsDanger7(false);
          setExpenseDescription('');
          setExpensePrice('');
          setShowTaskParticipant(false);
          setShowModal(false);
          setShowTaskForm(false);
          setShowParticipantForm(false);
          setIntervalPage(1000);
          setTopLevel('0%');
          setHeightLevel('100%');
        }

    }, timerInterval);

    return () => clearInterval(interval); // Clear interval when component unmounts or activePage changes
  } else {
   // setCurrentPage(1);
   // setIntervalPage(1); // Reset intervalPage to 1
  }

    if (activePage === 'expensesdemo') {
      const interval = setInterval(() => {
        if (intervalPage < 44) {
          if (intervalPage !== 1+15 || intervalPage !== 1+16 || intervalPage !== 1+17 || intervalPage !== 1+19 || intervalPage !== 1+20 || intervalPage !== 1+21 || intervalPage !== 1+23 || intervalPage !== 1+24 || intervalPage !== 1+25 || intervalPage !== 1+27 || intervalPage !== 1+28 || intervalPage !== 1+29 || intervalPage !== 1+31 || intervalPage !== 1+32 || intervalPage !== 1+33 || intervalPage !== 1+35 || intervalPage !== 1+36 || intervalPage !== 1+37 || intervalPage !== 1+39 || intervalPage !== 1+40 || intervalPage !== 1+41) {
          setCurrentPage(intervalPage);
        }
          if (intervalPage === 1+15 || intervalPage === 1+16 || intervalPage === 1+17 || intervalPage === 1+19 || intervalPage === 1+20 || intervalPage === 1+21 || intervalPage === 1+23 || intervalPage === 1+24 || intervalPage === 1+25 || intervalPage === 1+27 || intervalPage === 1+28 || intervalPage === 1+29 || intervalPage === 1+31 || intervalPage === 1+32 || intervalPage === 1+33 || intervalPage === 1+35 || intervalPage === 1+36 || intervalPage === 1+37 || intervalPage === 1+39 || intervalPage === 1+40 || intervalPage === 1+41) {
          setCurrentPage(intervalPage);
        }
        }
        if (intervalPage === 48) {
          setCurrentPage(1);        
          setIntervalPage(1); // Reset intervalPage to 1
        } else {
          if (intervalPage !== 1+15 || intervalPage !== 1+16 || intervalPage !== 1+17 || intervalPage !== 1+19 || intervalPage !== 1+20 || intervalPage !== 1+21 || intervalPage !== 1+23 || intervalPage !== 1+24 || intervalPage !== 1+25 || intervalPage !== 1+27 || intervalPage !== 1+28 || intervalPage !== 1+29 || intervalPage !== 1+31 || intervalPage !== 1+32 || intervalPage !== 1+33 || intervalPage !== 1+35 || intervalPage !== 1+36 || intervalPage !== 1+37 || intervalPage !== 1+39 || intervalPage !== 1+40 || intervalPage !== 1+41) {
          setTimerInterval(2000);
          setIntervalPage(intervalPage + 1); // Increment intervalPage
        }
          if (intervalPage === 1+15 || intervalPage === 1+16 || intervalPage === 1+17 || intervalPage === 1+19 || intervalPage === 1+20 || intervalPage === 1+21 || intervalPage === 1+23 || intervalPage === 1+24 || intervalPage === 1+25 || intervalPage === 1+27 || intervalPage === 1+28 || intervalPage === 1+29 || intervalPage === 1+31 || intervalPage === 1+32 || intervalPage === 1+33 || intervalPage === 1+35 || intervalPage === 1+36 || intervalPage === 1+37 || intervalPage === 1+39 || intervalPage === 1+40 || intervalPage === 1+41) {
          setTimerInterval(500);
          setIntervalPage(intervalPage + 1); // Increment intervalPage
        }

        }
      }, timerInterval); // 0.5 seconds for each page

      return () => clearInterval(interval); // Clear interval when component unmounts or activePage changes
    } else {
       //setCurrentPage(1);        
       //setIntervalPage(1); // Reset intervalPage to 1
    }
  }, [activePage, intervalPage]); // Add intervalPage to the dependency array

  const [userWallet, setUserWallet] = useState(null);
  const [network, setNetwork] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [cryptoSymbol, setCryptoSymbol] = useState('ETH');
  const [recipientAddress, setRecipientAddress] = useState('0x210e51c4efba450ba3ca2e4339fc92d849229e6b');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [usdAmount] = useState(9.99);
  const [status, setStatus] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [userId, setUserId] = useState(null);
  const [newType, setNewType] = useState("FREE");
  const [isAnnual, setIsAnnual] = useState(false);
  const [transactionHash, setTransactionHash] = useState(null);

const handleTaskChange = (e) => {
  const selectedTask = e.target.value;
  const selectedIndex = e.target.selectedIndex;

  if (selectedTask === "") {
    setSelectedTaskByTask(selectedTask); // Update the state
    resetTaskByTaskForm();
    //console.log("The first option (index 0) is selected");
    // You can handle this case as needed
  } else { 
  setSelectedTaskByTask(selectedTask); // Update the state
  const taskId = findTaskIdByName(selectedTask); // Use the value directly from the event

  if (taskId) {
     updateAndSelectTask(taskId);
       //setTaskByTask(findTaskByTaskByName(selectedTask));
const foundTask = findTaskByTaskByName(selectedTask);

// Format the limitValue before setting it in the state
const formattedLimitValue = new Intl.NumberFormat('en-US', { 
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
}).format(Number(foundTask.limitValue));

// Create a new object with the formatted limitValue
const updatedTask = {
  ...foundTask,
  limitValue: formattedLimitValue
};

// Set the state with the updated task
setTaskByTask(updatedTask);
  } else {
  }
}
};

  const handleUserChange = (e) => {
  const selectedUser = e.target.value;
  const selectedIndex = e.target.selectedIndex;

  if (selectedUser === "") {
    setSelectedTaskByUser(selectedUser); // Update the state
    resetTaskByUserForm();
  } else {
    setSelectedTaskByUser(selectedUser); // Update the state

  const taskId = findTaskIdByNameAndEmail(selectedTaskByTask, selectedUser); // Use the value directly from the event

  if (taskId) {
     setTaskByUser(findTaskByUserByNameAndEmail(selectedTaskByTask, selectedUser));
  } else {
  }
  }
  };

  const findTaskIdByName = (taskName) => {
    const task = tasksByTask.find(task => task.taskName === taskName);
    return task ? task.id : null;
  };

  const findTaskByTaskByName = (taskName) => {
    const task = tasksByTask.find(task => task.taskName === taskName);
    return task ? task : null;
  };

  const findTaskByUserByNameAndEmail = (taskName, userEmail) => {
    const task = tasksByUser.find(
      (task) => task.taskName === taskName && task.userEmail === userEmail
    );
    return task ? task : null;
  };


  const findTaskIdByCurrent = (current) => {
    const task = tasksByTask.find(task => task.current === current);
    return task ? task.taskName : "";
  };

  const findTaskIdByNameAndEmail = (taskName, userEmail) => {
    const task = tasksByUser.find(
      (task) => task.taskName === taskName && task.userEmail === userEmail
    );
    return task ? task.id : null;
  };

  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTaskParticipant, setShowTaskParticipant] = useState(false); // To toggle tasks and participants
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', unit: '', quantity: '', costDescription: '', cost: '' });
  const [selectedTask, setSelectedTask] = useState('');
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [selectedParticipant, setSelectedParticipant] = useState('');

  const handleShowModal = () => {if (subscription && myExpirationDate && myExpirationDate > now && subscription.confirmed === true) {Page23();setShowTaskParticipant(false);setShowTaskForm(false);setShowParticipantForm(false);setShowModal(true);} else {setOpen4(true);}};
  const handleCloseModal = () => {
    setShowModal(false);
    setShowTaskForm(false);
    setShowParticipantForm(false);
  };

  const handleParticipantInputChange = (e) => {
    const { name, value } = e.target;
    setNewParticipant({ ...newParticipant, [name]: value });
  };

  const handleDeleteTask = () => {
    const taskId = findTaskIdByName(selectedTaskByTask);
    if (taskId) {
      setTaskIdToDelete(taskId);
      setOpenDialog1(true);
    } else {
      //alert('Task not found or not selected.');
    }
  };

  const handleConfirmDelete1 = () => {
    if (taskIdToDelete) {
      deleteTaskByTask(taskIdToDelete);
      setSelectedTaskByTask(findTaskIdByCurrent(true));
      setOpenDialog1(false);
      setTaskIdToDelete(null);
    }
  };

  const handleCancelDelete1 = () => {
    setOpenDialog1(false);
  };

  const handleDeleteUser = () => {
    const taskId = findTaskIdByNameAndEmail(selectedTaskByTask, selectedTaskByUser);
    if (taskId) {
      setTaskIdToDelete(taskId);  // Sačuvaj taskId za brisanje
      setOpenDialog2(true);        // Otvori dijalog za potvrdu brisanja
    } else {
      //alert('Task not found or not selected.');
    }
  };

  const handleConfirmDelete2 = () => {
    if (taskIdToDelete) {
      deleteTaskByUser(taskIdToDelete); // Pozovi funkciju za brisanje
      setSelectedTaskByTask(findTaskIdByCurrent(true)); // Resetuj selektovani task
      setOpenDialog2(false); // Zatvori dijalog
      setTaskIdToDelete(null);
    }
  };

  const handleCancelDelete2 = () => {
    setOpenDialog2(false); // Zatvori dijalog bez brisanja
  };


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState(null);
  const [taskNameA, setTaskNameA] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [editingGroup, setEditingGroup] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [editingTask2, setEditingTask2] = useState(false);
  const [editingExpense, setEditingExpense] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [refreshModal, setRefreshModal] = useState(false);
  const [refreshModal2, setRefreshModal2] = useState(false);
  const [refreshModal3, setRefreshModal3] = useState(false);
  const [refreshModal4, setRefreshModal4] = useState(false);

  useEffect(() => {
//    if (refreshModal4===false) {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (token && storedUsername && emailRegex.test(storedUsername)) {
      try {
        // Decode token to check its expiration
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token is valid, proceed with fetching data
          if (activePage!=='usersubscription') {
          handlePageChange('tasks');
          }
          setLoggedInUser(storedUsername);
//          console.log('Yess3 - '+storedUsername);
          setEmail2(storedUsername);
          fetchUserId();
          fetchSubscriptions();
          fetchLastSubscription();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          fetchTasksByTasks();
          fetchTasksByUsers();
          if (subscription) {
            setStatus("Current subscription : "+subscription.type);
            setMyExpirationDate(new Date(subscription.expirationDate));
            //setRefreshModal4(true);
          }
          if (refreshModal2===true) {
            if (!subscription) {
               createFreeSubscription('Free', false, '');
            }
            if (refreshModal4===true && subscription) {
              setRefreshModal4(false);
              handleCheckAndUpdateStatus(subscription.id, subscription.transactionHash);
            }
          }
          //fetchTables();
        } else {
          handleLogout();
        }
      } catch (error) {
          handleLogout();
      }
    }
//    }
  }, [email2, userId, refreshModal, refreshModal2]);

  useEffect(() => {
/*
    if (refreshModal4!==false) {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (token && storedUsername && emailRegex.test(storedUsername)) {
      try {
        // Decode token to check its expiration
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedToken.exp && decodedToken.exp > currentTime) {
          // Token is valid, proceed with fetching data
          handlePageChange('tasks');
          setLoggedInUser(storedUsername);
          setEmail2(storedUsername);
          fetchUserId();
          fetchSubscriptions();
          fetchLastSubscription();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          fetchTasksByTasks();
          fetchTasksByUsers();
          if (subscription) {
            setStatus("Current subscription : "+subscription.type);
            setMyExpirationDate(new Date(subscription.expirationDate));
          }
          if (refreshModal2===true && refreshModal4===true) {
            if (subscription) {
               createFreeSubscription('Free', false, '');
            }
          }
          //fetchTables();
        } else {
          handleLogout();
        }
      } catch (error) {
          handleLogout();
      }
    }
    }
*/
  }, [email2, userId, refreshModal, refreshModal2, refreshModal4]);

  useEffect(() => {
    fetchAllTasks();
    fetchAllUsers();
    fetchAllExpenses();
  }, [refreshModal3]);

const fetchUserId = async () => {
    if (email2) {
    try {
        const response = await axios.get(`/api/users/user/id`, {
            params: { email2 }
        });
        setUserId(response.data);
        localStorage.setItem('userId',response.data);
//        console.log('Yess1 - ' + email2 + ' ' + response.data);
    } catch (err) {
        setUserId(null); // Clear user ID in case of error
//        console.log('Yess2');
    }
    }
};

const fetchLastSubscription = async () => {
    if (userId) {
        try {
            const response = await axios.get(`/api/subscription/last/${userId}`);
            if (Array.isArray(response.data) && response.data.length > 0) {
                // Assuming the latest subscription is the first item; adjust this as needed
                setSubscription(response.data[0]); 
                if (refreshModal2===false) {
                setRefreshModal2(!refreshModal2);
                }
            } else {
                setSubscription(null); // No subscriptions available
                if (refreshModal2===false) {
                setRefreshModal2(!refreshModal2);
                }
            }
        } catch (error) {
            console.error("Error fetching subscription:", error);
            //setError("Failed to load subscription data.");
        }
        }
    };

  const subscriptionPlans = [
    { type: 'Professional1', price: isAnnual ? 19.10 : 1.99, duration: isAnnual ? '365 days' : '30 days', image: Professional1, maxtasks: 4, maxparticipants: 8, maxexpenses: 20, description: 'includes a total of 32 items in the database, divided into 4 tasks, 8 participants and 20 expenses.' },
    { type: 'Professional2', price: isAnnual ? 28.70 : 2.99, duration: isAnnual ? '365 days' : '30 days', image: Professional2, maxtasks: 6, maxparticipants: 12, maxexpenses: 40, description: 'includes a total of 58 items in the database, divided into 6 tasks, 12 participants and 40 expenses.' },
    { type: 'Professional3', price: isAnnual ? 38.30 : 3.99, duration: isAnnual ? '365 days' : '30 days', image: Professional3, maxtasks: 8, maxparticipants: 16, maxexpenses: 60, description: 'includes a total of 84 items in the database, divided into 8 tasks, 16 participants and 60 expenses.' },
    { type: 'Professional4', price: isAnnual ? 47.90 : 4.99, duration: isAnnual ? '365 days' : '30 days', image: Professional4, maxtasks: 10, maxparticipants: 20, maxexpenses: 80, description: 'includes a total of 110 items in the database, divided into 10 tasks, 20 participants and 80 expenses.' },
    { type: 'Professional5', price: isAnnual ? 57.50 : 5.99, duration: isAnnual ? '365 days' : '30 days', image: Professional5, maxtasks: 12, maxparticipants: 24, maxexpenses: 100, description: 'includes a total of 136 items in the database, divided into 12 tasks, 24 participants and 100 expenses.' },
  ];

const subscriptionPlans2 = [
  { type: 'Free', annualPrice: 0, monthlyPrice: 0, durationAnnual: '30 days', durationMonthly: '30 days', image: freePlanImage, maxtasks: 2, maxparticipants: 4, maxexpenses: 10, description: 'includes a total of 16 items in the database, divided into 2 tasks, 4 participants and 10 expenses.' },
  { type: 'Professional1', annualPrice: 19.10, monthlyPrice: 1.99, durationAnnual: '365 days', durationMonthly: '30 days', image: Professional1, maxtasks: 4, maxparticipants: 8, maxexpenses: 20, description: 'includes a total of 32 items in the database, divided into 4 tasks, 8 participants and 20 expenses.' },
  { type: 'Professional2', annualPrice: 28.70, monthlyPrice: 2.99, durationAnnual: '365 days', durationMonthly: '30 days', image: Professional2, maxtasks: 6, maxparticipants: 12, maxexpenses: 40, description: 'includes a total of 58 items in the database, divided into 6 tasks, 12 participants and 40 expenses.' },
  { type: 'Professional3', annualPrice: 38.30, monthlyPrice: 3.99, durationAnnual: '365 days', durationMonthly: '30 days', image: Professional3, maxtasks: 8, maxparticipants: 16, maxexpenses: 60, description: 'includes a total of 84 items in the database, divided into 8 tasks, 16 participants and 60 expenses.' },
  { type: 'Professional4', annualPrice: 47.90, monthlyPrice: 4.99, durationAnnual: '365 days', durationMonthly: '30 days', image: Professional4, maxtasks: 10, maxparticipants: 20, maxexpenses: 80, description: 'includes a total of 110 items in the database, divided into 10 tasks, 20 participants and 80 expenses.' },
  { type: 'Professional5', annualPrice: 57.50, monthlyPrice: 5.99, durationAnnual: '365 days', durationMonthly: '30 days', image: Professional5, maxtasks: 12, maxparticipants: 24, maxexpenses: 100, description: 'includes a total of 136 items in the database, divided into 12 tasks, 24 participants and 100 expenses.' },
];

  const fetchSubscriptions = async () => {
    if (userId) {
      try {
        const response = await axios.get(`/api/subscription/subscriptions/${userId}`);
        setSubscriptions(response.data);
//        console.log('Fetched subscriptions:', response.data);
      } catch (error) {
        setStatus('Error fetching subscriptions: ' + error.message);
//        console.log('Error fetching subscriptions:', error);
      }
    }
  };

  const createFreeSubscription = async (newType, isAnnual, transactionHash) => {
    if (userId) {
      try {
        const response = await axios.post(`/api/subscription/create/${userId}`, null, {
          params: { type: newType, isAnnual, transactionHash },
        });
//        console.log('Subscription creation response:', response);

        if (response.data && typeof response.data === 'object') {
          setSubscriptions([...subscriptions, response.data]);
          setStatus(`Subscription created: ${newType}`);
          fetchLastSubscription();
          if (refreshModal2===true) {
            setRefreshModal2(!refreshModal2);
          }          
        } else {
          console.error('Unexpected data format:', response.data);
          setStatus('Error: Invalid response format from server');
        }
      } catch (error) {
        console.error('Error creating subscription:', error);
        setStatus('Error creating subscription: ' + error.message);
      }
    }
  };

  const createSubscription = async () => {
    if (userId) {
      try {
        const response = await axios.post(`/api/subscription/create/${userId}`, null, {
          params: { type: newType, isAnnual, transactionHash },
        });
//        console.log('Subscription creation response:', response);

        if (response.data && typeof response.data === 'object') {
          setSubscriptions([...subscriptions, response.data]);
          setStatus(`Subscription created: ${newType}`);
        } else {
          console.error('Unexpected data format:', response.data);
          setStatus('Error: Invalid response format from server');
        }
      } catch (error) {
        console.error('Error creating subscription:', error);
        setStatus('Error creating subscription: ' + error.message);
      }
    }
  };

    const checkTransactionStatus = async (transactionHash) => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed!");
                return "MetaMask is not installed";
            }

            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const txReceipt = await provider.getTransactionReceipt(transactionHash);
            return txReceipt && txReceipt.blockNumber ? "Transaction is confirmed" : "Transaction is not yet confirmed";
        } catch (error) {
            console.error("Error checking transaction:", error);
            return "Error fetching transaction";
        }
    };

    // Update the subscription status if the transaction is confirmed
    const updateSubscriptionStatus = async (subscriptionId) => {
        try {
            const response = await axios.put(`/api/subscription/${subscriptionId}/confirm`, null, {
                params: { isConfirmed: true }
            });
//            console.log("Updated subscription:", response.data);
            setStatus("Subscription status updated successfully.");

            // Update the local state to reflect the change
            setSubscriptions(prevSubscriptions =>
                prevSubscriptions.map(sub =>
                    sub.id === subscriptionId ? { ...sub, isConfirmed: true } : sub
                )
            );
        } catch (error) {
            console.error("Error updating subscription status:", error);
            setStatus("Failed to update subscription status.");
        }
    };

    // Check and update all subscriptions
    const checkAllSubscriptions = async () => {
        if (subscriptions.length === 0) {
            return;
        }

        const unconfirmedSubscriptions = subscriptions.filter(sub => !sub.confirmed);

        for (const subscription of unconfirmedSubscriptions) {
            const transactionStatus = await checkTransactionStatus(subscription.transactionHash);

            if (transactionStatus === "Transaction is confirmed") {
                await updateSubscriptionStatus(subscription.id);
            } else {
                setStatus("Some transactions are not yet confirmed.");
            }
        }
          fetchSubscriptions();
          fetchLastSubscription();
    };

    const handleCheckAndUpdateStatus = async (subscriptionId, transactionHash) => {
        if (!userWallet) return setStatus('Please connect your wallet first.');
        // Step 1: Check transaction status
        const transactionStatus = await checkTransactionStatus(transactionHash);
        setStatus(transactionStatus);

        // Step 2: If confirmed, send a PUT request to update the subscription status in Spring Boot
        if (transactionStatus === "Transaction is confirmed") {
            try {
                const response = await axios.put(`/api/subscription/${subscriptionId}/confirm`, null, {
                    params: { isConfirmed: true }
                });
//                console.log(response.data);
                fetchSubscriptions();
                fetchLastSubscription();
                setStatus("Subscription status updated successfully.");
            } catch (error) {
                console.error("Error updating subscription status:", error);
                setStatus("Failed to update subscription status.");
            }
        } else {
            setStatus("Transaction is not yet confirmed.");
        }
    };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const [account] = await window.ethereum.request({ method: 'eth_accounts' });
        setUserWallet(account);
        setStatus('Wallet connected successfully');
//        checkAllSubscriptions();
      } catch (error) {
        if (error.code === 4001) {
          setStatus('Connection request denied. Please approve to connect.');
        } else {
          setStatus('Error connecting to wallet: ' + error.message);
        }
      }
    } else {
      alert('MetaMask not detected. Please install or enable MetaMask in a supported browser.');
    }
  };

  const sendTransaction = async () => {
    if (!userWallet) return setStatus('Please connect your wallet first.');
    if (!recipientAddress) return setStatus('Please enter a recipient address.');

    // Determine the amount to send based on the selected subscription plan
    const selectedPlan = subscriptionPlans.find(plan => plan.type === newType);
    if (!selectedPlan) return setStatus('Please select a valid subscription type.');
    if (!userId) return setStatus('Please login first.');

    
    const amountToSend = selectedPlan.price;
    const ethPriceInUSD = await fetchETHPrice();
    const amountInEth = (amountToSend / ethPriceInUSD).toFixed(6);

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId === '0x1') {
        setStatus('Connected to Mainnet. Wallet connected successfully.');
      } else {
        setStatus('Connected to Test Network. Please switch to Mainnet.');
        return;
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: parseEther(amountInEth),
      });

      setStatus(`Transaction sent! Tx Hash: ${tx.hash}`);
      setTransactionHash(tx.hash);

      try {
        const transactionHash = tx.hash;
        const response = await axios.post(`/api/subscription/create/${userId}`, null, {
          params: { type: newType, isAnnual, transactionHash },
        });
//        console.log('Subscription creation response:', response);

        if (response.data && typeof response.data === 'object') {
          setSubscriptions([...subscriptions, response.data]);
          //setRefreshModal(!refreshModal);
          //fetchSubscriptions();
          //fetchLastSubscription();
          setSubscription(response.data);
          //setStatus(`Subscription created: ${newType}`);
        } else {
          console.error('Unexpected data format:', response.data);
          setStatus('Error: Invalid response format from server');
        }
      } catch (error) {
        console.error('Error creating subscription:', error);
        setStatus('Error creating subscription: ' + error.message);
      }


      // Wait for transaction confirmation
      await tx.wait();
      setStatus(`Transaction confirmed! Tx Hash: ${tx.hash}`);
      // After successful transaction, create the subscription
      //createSubscription();
      setRefreshModal2(false);
      setRefreshModal4(true);
    } catch (error) {
      setStatus('Error sending transaction: ' + error.message);
    }
  };

  const fetchETHPrice = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      return response.data.ethereum.usd;
    } catch (error) {
      setStatus('Error fetching ETH price: ' + error.message);
      return 0; // Return a default value to avoid errors
    }
  };

  const handleSelectedpage = (selection) => {
     setUsername('');
     setPassword('');
     setEmail('');
     setResetToken('');
     setNewPassword('');
     setMessage("");
     setSection(selection);
  };

  useEffect(() => {
    if (loggedInUser) {
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      fetchAllTasks();
      fetchAllUsers();
      fetchAllExpenses();
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (Array.isArray(tasksByTask) && tasksByTask.length > 0) {
      tasksByTask
        .filter(task => task.current === true)
        .forEach((task) => {
          setSelectedTaskByTask(task.taskName);
//          setTaskByTask(findTaskByTaskByName(task.taskName));
const foundTask = findTaskByTaskByName(task.taskName);

// Format the limitValue before setting it in the state
const formattedLimitValue = new Intl.NumberFormat('en-US', { 
  useGrouping: false,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2 
}).format(Number(foundTask.limitValue));

// Create a new object with the formatted limitValue
const updatedTask = {
  ...foundTask,
  limitValue: formattedLimitValue
};

// Set the state with the updated task
setTaskByTask(updatedTask);
        });
    }
  }, [tasksByTask]);

  const fetchAllTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/getalltasks', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setAllTasks(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/getallusers', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setAllUsers(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchAllExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/getallexpenses', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setAllExpenses(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };




  const fetchTasksByTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/tasks', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setSelectedTaskByTask('');
      setTasksByTasks(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tables', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTables(response.data); 
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTasksByUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTasksByUsers(response.data);
      //resetTaskForm();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTaskByTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks/valuetask', newTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      setMessage("Failed to create task. Please check the details or try again.");
      console.error("Error creating task:", error);
    }
  };

  const createTaskByUser = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks/valueusername', newTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      setMessage("Failed to create task. Please check the details or try again.");
      console.error("Error creating task:", error);
    }
  };

  const createTaskByExpense = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/tasks/valueexpense', newTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      setMessage("Failed to create task. Please check the details or try again.");
      console.error("Error creating task:", error);
    }
  };



  const updateTaskByTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/tasks/${id}`, taskByTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const updateTaskByUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/users/${id}`, taskByUser, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const updateAndSelectTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/tasks/select/${id}`, taskByTask, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const deleteTaskByTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/task/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const deleteTaskByUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      fetchTasksByTasks();
      fetchTasksByUsers();
      fetchTables();
      resetTaskForm();
      setRefreshModal3(!refreshModal3);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleTaskByTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskByTask({ ...taskByTask, [name]: value });
    //console.log("name : "+name+" : value : "+ value);
  };

  const handleTaskByUserInputChange = (e) => {
    const { name, value } = e.target;
    setTaskByUser({ ...taskByUser, [name]: value });
  };

  const handleTaskByExpenseInputChange = (e) => {
    const { name, value } = e.target;
    setTaskByExpense({ ...taskByExpense, [name]: value });
  };

const handleTaskByTaskSubmit = (e) => {
  e.preventDefault();
  const taskId = findTaskIdByName(taskByTask.taskName);

  const numericValue = parseFloat(parseFloat(taskByTask.limitValue).toFixed(2));

  if (numericValue !== 0) {
  if (taskId) {
    updateTaskByTask(taskId); // Use taskId instead of taskByTask.id
  } else {
    // Prepare new task data
    const newTask = {
      ...newTaskByTask,
      taskName: taskByTask.taskName,
      measuringUnit: taskByTask.measuringUnit,
      limitValue: taskByTask.limitValue,
    };

    // Call the API directly with the new task data
    if (subscription.maxTasks-1 >= allTasks.length) {
      createTaskByTask(newTask);
      setNewTask(''); // Clear the input after adding the task
    } else {
      setOpen3(true);
    }
  }
  }
};


  const handleTaskByUserSubmit = async (e) => {
    e.preventDefault();
    const userId = findTaskIdByNameAndEmail(taskByTask.taskName, taskByUser.userEmail);
    //console.log(userId+" "+taskByTask.taskName+" "+taskByUser.userEmail);
    if (userId) {
      updateTaskByUser(userId);
    } else {
    resetNewTaskForm();
    const newTask = {
      ...newTaskByTask,
      userName: taskByUser.userName,
      userEmail: taskByUser.userEmail,
    };
    if (subscription.maxParticipants-1 >= allUsers.length) {
      createTaskByUser(newTask);
    } else {
      setOpen2(true);
    }
    }
  };

  const handleTaskByExpenseSubmit = async (e) => {
    e.preventDefault();
    resetNewTaskForm();
    const newTask = {
      ...newTaskByTask,
      expenseDescription: taskByExpense.expenseDescription,
      expensePrice: taskByExpense.expensePrice,
    };

    const numericValue = parseFloat(parseFloat(taskByExpense.expensePrice).toFixed(2));

    if (subscription.maxExpenses-1 >= allExpenses.length) {
    if (numericValue !== 0) {
      createTaskByExpense(newTask);
    }
    } else {
      setOpen1(true);
    }
  };

  const handleCloseTaskModal = () => {
    resetTaskForm();
    setShowTaskModal(false);
  };

  const resetNewTaskForm = () => {
    setNewTaskByTask({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
  };

  const resetTaskByTaskForm = () => {
    setTaskByTask({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
  };

  const resetTaskByUserForm = () => {
    setTaskByUser({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
  };


  const resetTaskForm = () => {
    setTaskByTask({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
    setTaskByUser({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: 0,
    balance: 0
    });
    setTaskByExpense({
    id: null,
    accountEmail: '',
    groupEmail: '',
    copy: false,
    current: false,
    exceedingLimit: false,
    valueNumber: false,
    valueTask: false,
    valueUserName: false,
    datetime: '',
    limitValue: '',
    measuringUnit: '',
    taskName: '',
    userEmail: '',
    userName: '',
    number: 0,
    expenseDescription: '',
    expensePrice: '',
    balance: 0
    });
    setEditingTask(false);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });
      if (response.status === 200) {
        const token = response.headers['authorization']?.split(' ')[1];
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          setLoggedInUser(username);
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          setEmail2(username);
          setRefreshModal2(false);
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          fetchUserId();
          fetchSubscriptions();
          fetchLastSubscription();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          fetchTasksByTasks();
          fetchTasksByUsers();
          handlePageChange('tasks');
        } else {
          setMessage('Token not received');
        }
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedInUser(null);
    setAllTasks([]);
    setAllUsers([]);
    setAllExpenses([]);
    setTasksByTasks([]);
    setTasksByUsers([]);
    setEmail2(null);
    setUserId(null);
    setSubscription(null);
    setSubscriptions([]);
    setUsername('');
    setPassword('');
    handlePageChange('homepage');
    setMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', {
        email,
        password,
      });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('verification');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/users/verify?token=${resetToken}`);
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('login');
    } catch (error) {
      console.error('Verification error:', error);
      setMessage('Verification failed.');
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/resend-verification', { email });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('verification');
    } catch (error) {
      console.error('Resend verification error:', error);
      setMessage('Failed to resend verification email.');
    }
  };

  const handleRequestPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/request-password-reset', { email });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('resetPassword');
    } catch (error) {
      console.error('Password reset request error:', error);
      setMessage('Failed to request password reset.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/users/reset-password', {
        token: resetToken,
        newPassword,
      });
      setMessage(response.data);
      setUsername('');
      setPassword('');
      setEmail('');
      setResetToken('');
      setNewPassword('');
      setSection('login'); 
    } catch (error) {
      console.error('Reset password error:', error);
      setMessage('Failed to reset password.');
    }
  };

  const Page1 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
              <table style={{ ...styles.centeredTable2, border: 'none', background: 'white' }}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th colSpan="2" style={{ border: 'none' }}>&nbsp;</th>
                  </tr>
                </thead>
                <tbody style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page2 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page3 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page4 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page5 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page6 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>


              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
<table style={{ ...styles.bgWhite, border: 'none' }} height="40%">
  <thead style={{ ...styles.bgWhiteThead, border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <th colSpan="4" style={{ textAlign: 'center', border: 'none' }}>&nbsp;</th>
    </tr>
    <tr style={{ border: 'none' }}>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="70%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="5%" style={{ border: 'none' }}>&nbsp;</th>
      <th width="20%" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{ border: 'none' }}>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
    <tr style={{ border: 'none' }}>
      <th colSpan="2" style={{ textAlign: 'right', border: 'none' }}>&nbsp;</th>
      <td style={{ border: 'none' }}>&nbsp;</td>
      <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
    </tr>
  </tbody>
</table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page7 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page8 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page9 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page10 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>&nbsp;</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page11 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page11a = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={{ ...styles.centeredTable, border: 'none', background: 'white'}}>
                <thead style={{ border: 'none' }}>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                  <tr style={{ border: 'none' }}>
                    <th style={{ border: 'none' }}>&nbsp;</th>
                    <td style={{ textAlign: 'right', border: 'none' }}>&nbsp;</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
  );

  const Page12 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
            <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>0,00 Kg</td>
                </tr>
              </thead>
            </table>
            </div>
          </div>
  );

  const Page13 = () => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>0,00 Kg</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page14 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page15 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page16 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page17 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>0,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page18 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );


  const Page19 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>500,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>600,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page20 = ({saldoValue, ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>500,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>600,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>80,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>95,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}><b>{saldoValue}</b></td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

  const Page21 = ({ukupno, nabavljenoUkupno, nedostaje}) => (
          <div style={pageStyle}>
            {/* New table in the top-left corner */}
            <table style={{ ...styles.topLeftTable, border: 'none' }} className="table table-bordered table-light">
              <thead style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <th style={{ border: 'none' }}>ZADATAK : MARIO, JOSIP, IVANA I MARTA TREBAJU KUPITI 1000 Kg KRUMPIRA NA RAZNIM LOKACIJAMA ILI TRGOVINAMA</th>
                </tr>
              </thead>
              <tbody style={{ border: 'none' }}>
                <tr style={{ border: 'none' }}>
                  <td style={{ border: 'none' }}>ROK JE 7 DANA. SVI SU MEĐUSOBNO POVEZANI</td>
                </tr>
              </tbody>
            </table>

            {/* Adjusted central table */}
            <div style={styles.leftContainer}>
            <table style={styles.centeredTable2} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th colSpan="2" style={{ textAlign: 'center' }}>Praćenje troškova</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Količina</th>
                  <td style={{ textAlign: 'right' }}>1000,00 Kg</td>
                </tr>
              </tbody>
            </table>

              {/* Kontejner za tabele */}
              <div style={styles.tableContainer}>
              <table style={styles.bgMario} className="table table-bordered table-primary" height="40%">
                <thead style={styles.bgMarioThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Mario</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>100,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>500,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>600,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgJosipa} className="table table-bordered table-info" height="40%">
                <thead style={styles.bgJosipaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Josip</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td style={{ textAlign: 'right' }}>&nbsp;</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>25,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgIvana} className="table table-bordered table-warning" height="40%">
                <thead style={styles.bgIvanaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Ivana</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>80,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>95,00</td>
                  </tr>
                </tbody>
              </table>
              <table style={styles.bgMarta} className="table table-bordered table-danger" height="40%">
                <thead style={styles.bgMartaThead}>
                  <tr>
                    <th colSpan="4" style={{ textAlign: 'center' }}>Marta</th>
                  </tr>
                  <tr>
                    <th width="5%">RB</th>
                    <th width="70%">Opis</th>
                    <th width="5%">MJ</th>
                    <th width="20%" style={{ textAlign: 'right' }}>&nbsp;&nbsp;&nbsp;Iznos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>35,00</td>
                  </tr>
                  <tr>
                    <td>2.</td>
                    <td>Krumpir</td>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>15,00</td>
                  </tr>
                  <tr>
                    <th colSpan="2" style={{ textAlign: 'right' }}>Ukupno</th>
                    <td>Kg</td>
                    <td style={{ textAlign: 'right' }}>50,00</td>
                  </tr>
                </tbody>
              </table>
              </div>

              {/* Donja centralna tabela */}
              <table style={styles.centeredTable} className="table table-bordered table-success">
              <thead>
                <tr>
                  <th>Nabavljeno ukupno</th>
                  <td style={{ textAlign: 'right' }}>{nabavljenoUkupno}</td>
                </tr>
                <tr>
                  <th>Nedostaje</th>
                  <td style={{ textAlign: 'right' }}>{nedostaje}</td>
                </tr>
              </thead>
            </table>

            </div>
          </div>
  );

const headingStyle = { marginBottom: '1rem', textAlign: 'center' };

  const lineStyle = {
    width: '25px',
    height: '3px',
    backgroundColor: 'black',
    margin: '4px 0',
  };
/*
  const dropdownItemStyle = {
    display: 'block',
    padding: '10px',
    textDecoration: 'none',
    color: 'black',
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
    cursor: 'pointer',
  };
*/
  const containerStyle = {
    background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    width: '300px',
    color: '#fff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    marginBottom: '20px',
  };
/*
  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '660px',
  };
*/

  const wrapperStyle = {
    display: 'flex',
    justifyContent: 'center', // Centriranje sadržaja horizontalno
    alignItems: 'flex-start', // Postavljanje sadržaja gore
    //minHeight: '100vh', // Najmanje visina ekrana
    height: 'auto', // Visina automatska prema sadržaju
  };

  const wrapperStyle2 = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '660px',
  };


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    marginBottom: '8px',
    fontWeight: 'bold',
    fontSize: '1.1em',
  };

  const inputStyle = {
    padding: '12px',
    border: '2px solid transparent',
    borderRadius: '6px',
    fontSize: '16px',
    width: '100%',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    outline: 'none',
  };

  const inputFocusStyle = {
    borderColor: '#a777e3',
    boxShadow: '0 0 8px rgba(167, 119, 227, 0.5)',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#fff',
    color: '#6e8efb',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#a777e3',
    color: '#fff',
  };

const errorStyle = { 
  color: '#8B0000',
  marginBottom: '1rem' 
};

const successStyle = { 
  color: '#006400',
  marginBottom: '1rem' 
};
const linksContainerStyle = { marginTop: '1rem', textAlign: 'center' };
const linkStyle = { textDecoration: 'none', color: '#ffffff' };
  // Form Component
  const FormComponent = ({ title, formData, handleInputChange, handleSubmit, error, additionalInputs, links, successMessage }) => {
    return (
      <>
      <p style={{ fontSize: '5px' }}>&nbsp;</p>
      <div style={wrapperStyle}>
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={headingStyle}>{title}</h2>

            {error && <div style={errorStyle}>{error}</div>}
            {successMessage && <div style={successStyle}>{successMessage}</div>}

            <div style={inputGroupStyle}>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label htmlFor="password" style={labelStyle}>
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
                style={inputStyle}
              />
            </div>

            {additionalInputs}

            <button type="submit" style={buttonStyle}>
              Enter
            </button>

            {links && (
              <div style={linksContainerStyle}>
                {links.map((link, index) => (
                  <div key={index}>{link}</div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
      </>
    );
  };

  const FormComponent2 = ({ title, formData, handleInputChange, handleSubmit, error, additionalInputs, links, successMessage }) => {
    return (
      <>
      <p style={{ fontSize: '5px' }}>&nbsp;</p>
      <div style={wrapperStyle}>
        <div style={containerStyle}>
          <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={headingStyle}>{title}</h2>

            {error && <div style={errorStyle}>{error}</div>}
            {successMessage && <div style={successStyle}>{successMessage}</div>}

            {additionalInputs}

            <button type="submit" style={buttonStyle}>
              Enter
            </button>

            {links && (
              <div style={linksContainerStyle}>
                {links.map((link, index) => (
                  <div key={index}>{link}</div>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
      </>
    );
  };

  // Home/Login Component
  const Home = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);
    try {
      const response = await axios.post('/api/users/login', {
        username: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        const token = response.headers['authorization']?.split(' ')[1];
        if (token) {
          localStorage.setItem('token', token);
          localStorage.setItem('username', formData.email);
          setLoggedInUser(formData.email);
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          setEmail2(formData.email);
          setRefreshModal2(false);
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          fetchTables();
          fetchUserId();
          fetchSubscriptions();
          fetchLastSubscription();
          if (subscription) {
            setStatus("Current subscription : "+subscription.type);
            setMyExpirationDate(new Date(subscription.expirationDate));
            //setRefreshModal4(true);
          }
          if (refreshModal2===true) {
            if (!subscription) {
               createFreeSubscription('Free', false, '');
            }
          }
          handlePageChange('tasks');
        } else {
          setError('Token not received');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during login.');
    }
    };

    return (
      <FormComponent
        title="Login"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={null}
links={[
  <Link to="/Registering" style={linkStyle}>
    Don't have an account? Register
  </Link>,
  <Link to="/RequestPasswordReset" style={linkStyle}>
    Forgot your password?
  </Link>,
  <Link to="/SetNewPassword" style={linkStyle}>
    Set a new password
  </Link>,
  <Link to="/VerifyingEmail" style={linkStyle}>
    Email verification
  </Link>,
  <Link to="/ResendVerificationEmail" style={linkStyle}>
    Resend verification token
  </Link>,
        ]}
      />
    );
  };

  const UserSubscription = () => {
    return (
    <>
      <p style={{ fontSize: '20px' }}>&nbsp;</p>
      <p style={{ fontSize: '60px' }}>&nbsp;</p>
    <div style={styles.pageContainer10}>
      <h2 style={styles.heading10}>Subscription</h2>
      <section style={styles.section10}>
        <h3 style={styles.subHeading10}>Connect Wallet</h3>
        <button style={styles.button10} onClick={connectWallet}>
          Connect Wallet
        </button>
        <p style={styles.infoText10}>
          Connected Wallet: {userWallet ? userWallet : 'No wallet connected'}
        </p>
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Your Subscriptions</h2>
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} style={styles.subscriptionCard10}>
              <p><strong>Type:</strong> {sub.type}</p>
              <p><strong>Cost:</strong> ${sub.cost}</p>
              <p><strong>Total entries in database per task:</strong> {sub.maxTasks}</p>
              <p><strong>Total entries in database per participant:</strong> {sub.maxParticipants}</p>
              <p><strong>Total entries in database per expense:</strong> {sub.maxExpenses}</p>
              <p><strong>Total entries in database:</strong> {sub.maxTasks+sub.maxParticipants+sub.maxExpenses}</p>
              <p><strong>Expires on:</strong> {new Date(sub.expirationDate).toLocaleDateString()}</p>
              <p><strong>Confirmed:</strong> {sub.confirmed ? 'Yes' : 'No'}</p>
              {sub.confirmed ? null : (
  		  <button style={styles.button10} onClick={() => handleCheckAndUpdateStatus(sub.id, sub.transactionHash)}>
		        Confirm
                  </button>
	      )}
            </div>
          ))
        ) : (
          <p style={styles.infoText10}>No subscriptions found</p>
        )}
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Available Plans</h2>
        <ul style={styles.planList10}>
          {subscriptionPlans.map((plan, index) => (
            <li key={index} style={styles.planItem10}>
              <strong>{plan.type}</strong>: ${plan.price.toFixed(2)} for {plan.duration}, {plan.description}
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Create Subscription</h2>
        <div style={styles.formControl10}>
          <label style={styles.label10}>
            Subscription Type
            <select style={styles.select10} onChange={(e) => setNewType(e.target.value)} value={newType}>
              <option value="">Select Subscription Type</option>
              {subscriptionPlans.map((plan, index) => (
                <option key={index} translate="no" value={plan.type}>{plan.type}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.formControl10}>
          <label style={styles.checkboxLabel10}>
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              style={styles.checkbox10}
            />
            Annual Subscription (20% off)
          </label>
        </div>

        <button style={styles.button10} onClick={sendTransaction}>
          Create Subscription
        </button>
        <div style={styles.statusMessage10}>{status}</div>
      </section>
    </div>
    </>
    );
  };


  const ExpenseTrackingPay = () => {
  };


  // Registration Component
  const Registration = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      repeatPassword: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);

      if (formData.password !== formData.repeatPassword) {
        setError('Passwords do not match.');
        return;
      }

    try {
      const response = await axios.post('/api/users/register', {
        email:formData.email,
        password:formData.password,
      });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('verification');
      //setSuccessMessage(response.data);
      if (response.data==='Registered. Check email to verify.') {setSuccessMessage(response.data);}
      if (response.data==='Email already exists.') {setError(response.data);}
    } catch (error) {
      //console.error('Registration error:', error);
      setError(error.response?.data?.message || 'An error occurred during registration.');
    }
    };

    return (
      <FormComponent
        title="Registration"
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        successMessage={successMessage}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="repeatPassword" style={labelStyle}>
              Repeat password
            </label>
            <input
              type="password"
              id="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleInputChange}
              placeholder="Repeat password"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

  // Setting New Password Component
  const SetNewPassword = () => {
    const [formData, setFormData] = useState({
      token: '',
      newPassword: '',
      repeatNewPassword: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      //const { token, newPassword, repeatNewPassword } = formData;

      if (!formData.token) {
        setError('Please enter token.');
        return;
      }
      if (formData.newPassword !== formData.repeatNewPassword) {
        setError('Passwords do not match.');
        return;
      }

    try {
      const response = await axios.put('/api/users/reset-password', {
        token: formData.token,
        newPassword: formData.newPassword,
      });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('login'); 
      if (response.data==='Password has been reset successfully.') {setSuccessMessage(response.data);}
      if (response.data==='Invalid or expired password reset token.') {setError(response.data);}
    } catch (error) {
      //console.error('Reset password error:', error);
      setError('Failed to reset password.');
    }

    };

    return (
      <FormComponent2
        title="Enter new password"
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        error={error}
        successMessage={successMessage}
        additionalInputs={
          <>
            <div style={inputGroupStyle}>
              <label htmlFor="token" style={labelStyle}>
                Token
              </label>
              <input
                type="text"
                id="token"
                value={formData.token}
                onChange={handleInputChange}
                placeholder="Enter token"
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="newPassword" style={labelStyle}>
                New password
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New password"
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label htmlFor="repeatNewPassword" style={labelStyle}>
                Repeat new password
              </label>
              <input
                type="password"
                id="repeatNewPassword"
                value={formData.repeatNewPassword}
                onChange={handleInputChange}
                placeholder="Repeat new password"
                required
                style={inputStyle}
              />
            </div>
          </>
        }
      />
    );
  };

  // Verifying Email Component
  const VerifyingEmail = () => {
    const [formData, setFormData] = useState({
      verificationCode: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

      //const { verificationCode } = formData;

      // Placeholder for verification code validation

    try {
      const response = await axios.get(`/api/users/verify?token=${formData.verificationCode}`);
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('login');
      if (response.data==='Email verified successfully.') {setSuccessMessage(response.data);}
      if (response.data==='Verification failed.') {setError(response.data);}
    } catch (error) {
      //console.error('Verification error:', error);
      //setMessage('Verification failed.');
      setError('Invalid verification token.');
    }
    };

    return (
      <FormComponent2
        title="Email verification"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="verificationCode" style={labelStyle}>
              Verification token
            </label>
            <input
              type="text"
              id="verificationCode"
              value={formData.verificationCode}
              onChange={handleInputChange}
              placeholder="Enter verification token"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

  // request Password Reset
  const RequestPasswordReset = () => {
    const [formData, setFormData] = useState({
      email: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

    try {
      const response = await axios.put('/api/users/request-password-reset', { email: formData.email });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('resetPassword');
      //setSuccessMessage(response.data);
      if (response.data==='User not found.') {setError(response.data);}
      if (response.data==='Failed to send password reset email.') {setError(response.data);}
      if (response.data==='Password reset email sent.') {setSuccessMessage(response.data);}
    } catch (error) {
      console.error('Password reset request error:', error);
      setError('Failed to request password reset.');
    }


    };

    return (
      <FormComponent2
        title="Request password reset"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="verificationCode" style={labelStyle}>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };

  // resend Verification Email
  const ResendVerificationEmail = () => {
    const [formData, setFormData] = useState({
      email: '',
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = async (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccessMessage(null);

    try {
      const response = await axios.put('/api/users/resend-verification', { email: formData.email });
      //setMessage(response.data);
      //setUsername('');
      //setPassword('');
      //setEmail('');
      //setResetToken('');
      //setNewPassword('');
      //setSection('verification');
      if (response.data==='User not found.') {setError(response.data);}
      if (response.data==='Failed to resend verification email.') {setError(response.data);}
      if (response.data==='Verification email sent.') {setSuccessMessage(response.data);}
    } catch (error) {
      //console.error('Resend verification error:', error);
      setError('Failed to resend verification email.');
    }

    };

    return (
      <FormComponent2
        title="Resend email verification"
        formData={formData}
        error={error}
        successMessage={successMessage}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        additionalInputs={
          <div style={inputGroupStyle}>
            <label htmlFor="verificationCode" style={labelStyle}>
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
              style={inputStyle}
            />
          </div>
        }
      />
    );
  };
/*
  // resend Verification Email
  const NotFoundPage = () => {
    return (
    <div className="d-flex vh-100 bg-white justify-content-center align-items-center">
      <div 
        className="bg-light shadow-lg rounded-4 text-center p-4 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "40%", minWidth: "300px", maxWidth: "500px", height: "50%", minHeight: "350px", maxHeight: "500px" }}
      >
        <p className="display-3 fw-bold text-danger mb-2">404</p>
        <h2 className="fs-5 text-dark mb-3">Oops! Page Not Found</h2>
        <p className="text-muted text-wrap px-3">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-sm">
          Go Back Home
        </Link>
      </div>
    </div>
    );
  };
*/

const NotFoundPage = () => {
  return (
    <div className="d-flex bg-white justify-content-center align-items-start">
      <div 
        className="bg-light shadow-lg rounded-4 text-center p-4 d-flex flex-column justify-content-start align-items-center"
        style={{ 
          width: "40%", 
          minWidth: "300px", 
          maxWidth: "500px", 
          height: "fit-content",
          marginTop: "25px", 
          marginBottom: "20px" 
        }}
      >
        <p className="display-3 fw-bold text-danger mb-2">404</p>
        <h2 className="fs-5 text-dark mb-3">Oops! Page Not Found</h2>
        <p className="text-muted text-wrap px-3">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="btn btn-primary mt-3 px-4 py-2 rounded-pill shadow-sm">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

const Page22 = () => {
    return (
        <>
            <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th translate="no" style={{ backgroundColor: colors.evenRowColor1, color: colors.evenTextColor1, padding: '10px' }}>
                            Email: {localStorage.getItem('username')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center', translate: 'no', backgroundColor: colors.oddRowColor1, color: colors.oddTextColor1, padding: '10px' }}>
                            <b>Task Name: {taskByTask.taskName}</b>
                        </td>
                    </tr>
                </tbody>
            </table>

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ textAlign: 'center', backgroundColor: colors.evenRowColor2, color: colors.evenTextColor2, padding: '10px' }}>
                                    Expense Tracking
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="50%" style={{ textAlign: 'left', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>Quantity</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '50%', translate: 'no', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    {tables.map((table, index) => renderTable(table, index))}
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginTop: '0px', marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th width="55%" style={{ backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>Total Procured</b>
                                </th>
                                <th style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue + taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="55%" style={{ backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>Missing</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

const Page24 = () => {
    return (
        <>
            <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th translate="no" style={{ backgroundColor: colors.evenRowColor1, color: colors.evenTextColor1, padding: '10px' }}>
                            Email: {taskByTask.accountEmail}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center', translate: 'no', backgroundColor: colors.oddRowColor1, color: colors.oddTextColor1, padding: '10px' }}>
                            <b>Task Name: {taskByTask.taskName}</b>
                        </td>
                    </tr>
                </tbody>
            </table>

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ textAlign: 'center', backgroundColor: colors.evenRowColor2, color: colors.evenTextColor2, padding: '10px' }}>
                                    Expense Tracking
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="50%" style={{ textAlign: 'left', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>Quantity</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '50%', translate: 'no', backgroundColor: colors.oddRowColor2, color: colors.oddTextColor2, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    {tables.map((table, index) => renderTable(table, index))}
                </>
            )}

            {selectedTaskByTask !== '' && tables.length > 0 && (
                <>
                    <p style={{ fontSize: '4px' }}>&nbsp;</p>
                    <table style={{ ...tableContainer3, marginTop: '0px', marginBottom: '0px' }} className="table table-bordered rounded-corners table-success">
                        <thead>
                            <tr>
                                <th width="55%" style={{ backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>Total Procured</b>
                                </th>
                                <th style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.evenRowColor3, color: colors.evenTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.limitValue + taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="55%" style={{ backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>Missing</b>
                                </td>
                                <td style={{ textAlign: 'right', width: '45%', translate: 'no', backgroundColor: colors.oddRowColor3, color: colors.oddTextColor3, padding: '10px' }}>
                                    <b>{new Intl.NumberFormat('en-US', {
                                        useGrouping: true,
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(Number(-taskByTask.balance))}{' '}
                                    {taskByTask.measuringUnit}</b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};


const StyledButton = styled.button`
  background: linear-gradient(135deg, #a3c1e0, #b7d6e6, #c9e1ed, #e3f2f8, #b0d4e8); /* Prigušeni plavi tonovi */
  border: none;
  color: #003366; /* Tamno plava boja */
  width: 200px;
  height: 40px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);


//  &:hover {
//    transform: scale(1.05);
//    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
//  }

//  &:active {
//    transform: scale(0.98);
//    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//  }
`;


  return (
     <>
    <div>
      {/* Container for Logo and Dropdown */}
      <div style={headerStyle}>
{(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || 
  activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || 
  activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || 
  activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || 
  activePage === 'step12') ? (
    
    <Button 
      id="button10" variant={isDanger ? "success" : "primary"} 
      style={{
        position: 'fixed', 
        fontSize: widthLevel4,
        top: '20px', 
        left: '20px', 
        width: widthLevel5, // Adjust size as needed
        height: '40px',
        zIndex: 2,
        }}
    >
      Enter (Tasks, Participants and Expenses)
    </Button>

  ) : (

    loggedInUser ? (
      <Button 
        variant="primary" 
        onClick={handleShowModal} 
        style={{
          position: 'fixed', 
          fontSize: widthLevel4,
          top: '20px', 
          left: '20px', 
          width: widthLevel5, // Adjust size as needed
          height: '40px',
          zIndex: 2,
          }}
      >
        Enter (Tasks, Participants and Expenses)
      </Button>
    ) : (
      <>
      <StyledButton style={{
            fontSize: widthLevel6,
            position: 'fixed', 
            top: '20px', 
            left: '20px', 
            width: '200px', // Adjust size as needed
            height: '40px',
            zIndex: 2,
            }}>
        Expense Tracking
      </StyledButton>
      </>
    )
  )
}
        {/* Hamburger and Dropdown */}
        <div
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 7,
          }}
          onClick={toggleDropdown}
        >
          {/* Hamburger icon */}
          <div>
            <div style={lineStyle}></div>
            <div style={lineStyle}></div>
            <div style={lineStyle}></div>
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute',
                top: '40px',  // Adjust this if you want the dropdown to appear closer or further away from the hamburger icon
                right: '0',
                width: '150px',
                backgroundColor: 'white',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                zIndex: 7,
              }}
          >
{(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || 
  activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || 
  activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || 
  activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || 
  activePage === 'step12') ? (
  
  loggedInUser ? (
    <>
      <div
        onClick={() => {
          Page23();
          handlePageChange('homepage');
        }}
        style={dropdownItemStyle}
      >
        Home Page
      </div>
      <div
        onClick={() => {
          Page23();
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          handlePageChange('tasks');
        }}
        style={dropdownItemStyle}
      >
        Tasks
      </div>
      <div
        onClick={() => {
          Page23();
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          handlePageChange('usersubscription');
        }}
        style={dropdownItemStyle}
      >
        User Subscription
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentStep(0);
          setTimerInterval(1000);
          handlePageChange('step0');
        }}
        style={dropdownItemStyle}
      >
        How To Use
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentPage(1);        
          setIntervalPage(1); // Reset intervalPage to 1
          setTimerInterval(2000);
          handlePageChange('expensesdemo');
        }}
        style={dropdownItemStyle}
      >
        Expense Demo
      </div>
      <div onClick={handleLogout} style={dropdownItemStyle}>
        Logout
      </div>
    </>
  ) : (
    <>
      <div
        onClick={() => {
          Page23();
          handlePageChange('homepage');
        }}
        style={dropdownItemStyle}
      >
        Home Page
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentStep(0);
          setTimerInterval(1000);
          handlePageChange('step0');
        }}
        style={dropdownItemStyle}
      >
        How To Use
      </div>
      <div
        onClick={() => {
          Page23();
          setCurrentPage(1);        
          setIntervalPage(1); // Reset intervalPage to 1
          setTimerInterval(2000);
          handlePageChange('expensesdemo');
        }}
        style={dropdownItemStyle}
      >
        Expense Demo
      </div>
      <div
        onClick={() => {
          Page23();
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
          handlePageChange('tasks');
        }}
        style={dropdownItemStyle}
      >
        Login
      </div>
    </>
  )
  
) : loggedInUser ? (
  
  <>
    <div
      onClick={() => {
        Page23();
        handlePageChange('homepage');
      }}
      style={dropdownItemStyle}
    >
      Home Page
    </div>
    <div
      onClick={() => {
        Page23();
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
        handlePageChange('tasks');
      }}
      style={dropdownItemStyle}
    >
      Tasks
    </div>
    <div
      onClick={() => {
        Page23();
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
        handlePageChange('usersubscription');
      }}
      style={dropdownItemStyle}
    >
      User Subscription
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentStep(0);
        setTimerInterval(1000);
        handlePageChange('step0');
      }}
      style={dropdownItemStyle}
    >
      How To Use
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentPage(1);        
        setIntervalPage(1); // Reset intervalPage to 1
        setTimerInterval(2000);
        handlePageChange('expensesdemo');
      }}
      style={dropdownItemStyle}
    >
      Expense Demo
    </div>
    <div onClick={handleLogout} style={dropdownItemStyle}>
      Logout
    </div>
  </>
  
) : (
  
  <>
    <div
      onClick={() => {
        Page23();
        handlePageChange('homepage');
      }}
      style={dropdownItemStyle}
    >
      Home Page
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentStep(0);
        setTimerInterval(1000);
        handlePageChange('step0');
      }}
      style={dropdownItemStyle}
    >
      How To Use
    </div>
    <div
      onClick={() => {
        Page23();
        setCurrentPage(1);        
        setIntervalPage(1); // Reset intervalPage to 1
        setTimerInterval(2000);
        handlePageChange('expensesdemo');
      }}
      style={dropdownItemStyle}
    >
      Expense Demo
    </div>
    <div
      onClick={() => {
        Page23();
          setAllTasks([]);
          setAllUsers([]);
          setAllExpenses([]);
          setTasksByTasks([]);
          setTasksByUsers([]);
          setTasksByExpenses([]);
          setSelectedTaskByTask('');
          setSelectedTaskByUser('');
          setTables([]);
          resetNewTaskForm();
          resetTaskForm();
          setUsername('');
          setPassword('');
          setEmail('');
          setResetToken('');
          setNewPassword('');
          setMessage('');
          fetchTasksByTasks();
          fetchTasksByUsers();
          fetchTables();
          fetchAllTasks();
          fetchAllUsers();
          fetchAllExpenses();
        handlePageChange('tasks');
      }}
      style={dropdownItemStyle}
    >
      Login
    </div>
  </>
)}
          </div>
        )}
      </div>
      </div>
      {/* Page Content */}
      <Routes>
        <Route path="/" element={
      <div>
      {activePage === 'tasks' && (
    <div>
      {loggedInUser ? (
<div style={pageStyle1}>  
      {subscription && myExpirationDate && myExpirationDate > now && subscription.confirmed === true ? (
        <Page22 />
      ) : (
        <>
        <div>Your subscription has expired.</div>
        </>
      )}
<Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Enter (Tasks, Participants and Expenses)</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => setShowTaskParticipant(!showTaskParticipant)}
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form style={{ whiteSpace: 'nowrap' }} onSubmit={handleTaskByTaskSubmit}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskByTask.taskName}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter task name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={taskByTask.measuringUnit}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter measuring unit"
                  required
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={taskByTask.limitValue}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByTaskInputChange({
            target: { name: 'limitValue', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTaskByTask}
              onChange={handleTaskChange}
            >
              <option value="">Select Task</option>
              {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
                <option 
                  key={task.id} 
                  value={task.taskName} 
                  selected={task.current}
                  translate="no"
                >
                  {task.taskName}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowParticipantForm(!showParticipantForm)}
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form style={{ whiteSpace: 'nowrap' }} onSubmit={handleTaskByUserSubmit}>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={taskByUser.userName}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={taskByUser.userEmail}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant email"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedTaskByUser}
              onChange={handleUserChange}
            >
              <option value="">Select Participant</option>
              {Array.isArray(tasksByUser) && tasksByUser.map((task) => (
                <option key={task.id} value={task.userEmail} translate="no">
                  {task.userEmail}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form style={{ whiteSpace: 'nowrap' }} onSubmit={handleTaskByExpenseSubmit}>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTaskByTask}
            onChange={handleTaskChange}
          >
            <option value="">Select Task</option>
            {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
              <option 
                key={task.id} 
                value={task.taskName} 
                selected={task.current}
                translate="no"
              >
                {task.taskName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={taskByExpense.expenseDescription}
            onChange={handleTaskByExpenseInputChange}
            placeholder="Enter expense description"
            required
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={taskByExpense.expensePrice}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByExpenseInputChange({
            target: { name: 'expensePrice', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button variant="primary" type="submit">
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary" onClick={handleCloseModal}>
    Close
  </Button>
</div>
</Modal.Body>
</Modal>
<Dialog open={openDialog1} onClose={handleCancelDelete1}>
    <DialogTitle>Delete Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the task <b><span translate="no">{selectedTaskByTask}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="primary" onClick={handleCancelDelete1}>
        No
      </Button>
      <Button variant="danger" onClick={handleConfirmDelete1}>
        Yes
      </Button>
    </DialogActions>
</Dialog>
<Dialog open={openDialog2} onClose={handleCancelDelete2}>
    <DialogTitle>Delete Participant</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the participant <b><span translate="no">{selectedTaskByUser}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete2} variant="primary">
        No
      </Button>
      <Button onClick={handleConfirmDelete2} variant="danger" autoFocus>
        Yes
      </Button>
    </DialogActions>
</Dialog>
    <Dialog open={open1} onClose={handleClose1}>
      <DialogTitle>Expenses Limit Exceeded</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {subscription
        ? `You exceeded the expense limit of ${subscription.maxExpenses}. `
        : 'You exceeded the expense limit. '}
          Please free space by deleting participants or tasks or subscribe for more expense limit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose1} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open2} onClose={handleClose2}>
      <DialogTitle>Participants Limit Exceeded</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {subscription
        ? `You exceeded the participant limit of ${subscription.maxParticipants}. `
        : 'You exceeded the participant limit. '}
          Please free space by deleting participants or tasks or subscribe for more participant limit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose2} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open3} onClose={handleClose3}>
      <DialogTitle>Tasks Limit Exceeded</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {subscription
        ? `You exceeded the task limit of ${subscription.maxTasks}. `
        : 'You exceeded the task limit. '}
          Please free space by deleting participants or tasks or subscribe for more task limit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose3} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open4} onClose={handleClose4}>
      <DialogTitle>Subscription Expired</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your subscription has expired.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose4} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
</div>
      ) : (
<>
<Home />
</>
      )}
    </div>
      )}

      {activePage === 'expensesdemo' && (
         <>
         <div style={pageStyle3}>
         {currentPage === 1 && <Page1 />}
         {currentPage === 2 && <Page2 />}
         {currentPage === 3 && <Page3 />}
         {currentPage === 4 && <Page4 />}
         {currentPage === 5 && <Page5 />}
         {currentPage === 6 && <Page6 />}
         {currentPage === 7 && <Page7 />}
         {currentPage === 8 && <Page8 />}
         {currentPage === 9 && <Page9 />}
         {currentPage === 10 && <Page10 />}
         {currentPage === 11 && <Page11 />}
         {currentPage === 12 && <Page11a />}
         {currentPage === 13 && <Page12 />}
         {currentPage === 14 && <Page13 />}
         {currentPage === 15 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg" />}
         {currentPage === 16 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 17 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 18 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 19 && <Page15 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 20 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 21 && <Page15 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 22 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 23 && <Page16 saldoValue="&nbsp;" ukupno="25,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 24 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 25 && <Page16 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 26 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 27 && <Page17 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 28 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 29 && <Page17 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 30 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 31 && <Page18 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 32 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 33 && <Page18 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 34 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 35 && <Page19 saldoValue="&nbsp;" ukupno="600,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 36 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 37 && <Page19 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 38 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 39 && <Page20 saldoValue="&nbsp;" ukupno="95,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 40 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 41 && <Page20 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 42 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 43 && <Page21 ukupno="50,00" nabavljenoUkupno="770,00 Kg" nedostaje="230,00 Kg" />}
         </div>
         </>
      )}

      {(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || activePage === 'step12') && (
<>
      <div id="virtual-cursor" style={{ ...cursorStyles }} className="cursor" />
<div style={pageStyle2}>  
{<Page24 />}
</div>

<Modal show={showModal} id="modal-element" onHide={handleCloseModal} style={modalBottomStyles1} backdrop={false}>
    <Modal.Body>
      <Button 
        id="button1"
        variant={isDanger2 ? "success" : "primary"} 
        className="mb-3"
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            id="button2"
            variant={isDanger3 ? "success" : "primary"} 
            className="mb-3"
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form style={{ whiteSpace: 'nowrap' }}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskName}
                  placeholder="Enter task name"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={measuringUnit}
                  placeholder="Enter measuring unit"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={limitValue}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
              <Button id="button3" variant={isDanger4 ? "success" : "primary"} className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTask}
            disabled={true}
            >
              <option value="">New Task</option>
              <option translate="no">Spending money in the store</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant={isDanger5 ? "success" : "primary"}  
            className="mb-3"
            id="button4"
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form style={{ whiteSpace: 'nowrap' }}>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
            disabled={true}
                  value={participantName}
                  placeholder="Enter participant name"
                  required
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={participantEmail}
                  placeholder="Enter participant email"
                  required
            disabled={true}
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Button id="button5" variant={isDanger6 ? "success" : "primary"} className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedParticipant}
            disabled={true}
            >
              <option value="">Select Participant</option>
               <option translate="no">Alois</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form style={{ whiteSpace: 'nowrap' }}>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTask}
            disabled={true}
style={{
        border: hasError3 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          >
            <option value="">Select Task</option>
            <option translate="no" value="Spending money in the store">Spending money in the store</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={expenseDescription}
            placeholder="Enter expense description"
            disabled={true}
            required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={expensePrice}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button id="button6" variant={isDanger7 ? "success" : "primary"}>
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary">
    Close
  </Button>
</div>
</Modal.Body>
</Modal>

<Modal 
    show={true} 
    style={{ ...modalBottomStyles2, opacity: 0.8 }} 
    backdrop={false}
>
    <Modal.Header 
        style={{ 
            backgroundColor: 'black', // Set background to black
            color: 'white',           // Change text color to white for better contrast
            whiteSpace: 'pre-wrap', 
            fontSize: '10px' 
        }}
    >
        <div>
            {steps[currentStep]}
        </div>
    </Modal.Header>
    <Modal.Footer 
        style={{ 
            backgroundColor: 'black' // Optionally set footer background to black as well
        }}
    >
        <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn btn-secondary btn-sm"
        >
            Previous
        </Button>
        <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="btn btn-primary btn-sm"
        >
            Next
        </Button>
    </Modal.Footer>
</Modal>
</>
)}

      {activePage === 'usersubscription' && (
    <>
    <p style={{ fontSize: '5px' }}>&nbsp;</p>
    <div style={styles.pageContainer10}>
      <h2 style={styles.heading10}>Subscription</h2>
      <section style={styles.section10}>
        <h3 style={styles.subHeading10}>Connect Wallet</h3>
        <button style={styles.button10} onClick={connectWallet}>
          Connect Wallet
        </button>
        <p style={styles.infoText10}>
          Connected Wallet: {userWallet ? userWallet : 'No wallet connected'}
        </p>
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Your Subscriptions</h2>
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} style={styles.subscriptionCard10}>
              <p><strong>Type:</strong> {sub.type}</p>
              <p><strong>Cost:</strong> ${sub.cost}</p>
              <p><strong>Total entries in database per task:</strong> {sub.maxTasks}</p>
              <p><strong>Total entries in database per participant:</strong> {sub.maxParticipants}</p>
              <p><strong>Total entries in database per expense:</strong> {sub.maxExpenses}</p>
              <p><strong>Total entries in database:</strong> {sub.maxTasks+sub.maxParticipants+sub.maxExpenses}</p>
              <p><strong>Expires on:</strong> {new Date(sub.expirationDate).toLocaleDateString()}</p>
              <p><strong>Confirmed:</strong> {sub.confirmed ? 'Yes' : 'No'}</p>
              {sub.confirmed ? null : (
  		  <button style={styles.button10} onClick={() => handleCheckAndUpdateStatus(sub.id, sub.transactionHash)}>
		        Confirm
                  </button>
	      )}
            </div>
          ))
        ) : (
          <p style={styles.infoText10}>No subscriptions found</p>
        )}
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Available Plans</h2>
        <ul style={styles.planList10}>
          {subscriptionPlans.map((plan, index) => (
            <li key={index} style={styles.planItem10}>
              <strong>{plan.type}</strong>: ${plan.price.toFixed(2)} for {plan.duration}, {plan.description}
           </li>
          ))}
        </ul>
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Create Subscription</h2>
        <div style={styles.formControl10}>
          <label style={styles.label10}>
            Subscription Type
            <select style={styles.select10} onChange={(e) => setNewType(e.target.value)} value={newType}>
              <option value="">Select Subscription Type</option>
              {subscriptionPlans.map((plan, index) => (
                <option key={index} translate="no" value={plan.type}>{plan.type}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.formControl10}>
          <label style={styles.checkboxLabel10}>
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              style={styles.checkbox10}
            />
            Annual Subscription (20% off)
          </label>
        </div>

        <button style={styles.button10} onClick={sendTransaction}>
          Create Subscription
        </button>
        <div style={styles.statusMessage10}>{status}</div>
      </section>
    </div>
    </>
      )}

      {activePage === 'homepage' && (
         <>
      <div style={styles.app}>
        {/* Hero sekcija */}
        <header style={styles.hero}>
          <p style={styles.heroH1}>Let's Track Your Expenses Together</p>
          <p style={styles.heroP}>Track your expenses efficiently, set goals, and stay on budget!</p>
        </header>

<Section2
  title="How to Use Expense Tracking"
  description="Sign up, create tasks, and manually enter expenses for each participant. Track expenses by task, manage budgets, and view reports to understand your project spending."
  imageUrl={howToUseImage}
/>

      {subscriptionPlans2.map((plan, index) => (
        <Section3
          key={index}
          title={plan.type}
          imageUrl={plan.image}
          maxTasks={plan.maxtasks}
          maxParticipants={plan.maxparticipants}
          maxExpenses={plan.maxexpenses}
          description={plan.description}
          price={isAnnual ? `$${plan.annualPrice.toFixed(2)}/year` : `$${plan.monthlyPrice.toFixed(2)}/month`}
          duration={isAnnual ? plan.durationAnnual : plan.durationMonthly}
          alt={index % 2 === 0} // Apply "alt" when index is even
        />
      ))}

        <footer style={styles.footer}>
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>Welcome to Our Web3 Payment System</p>
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>Experience seamless payments with MetaMask using Ethereum.</p>
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>🔥 Payments are processed via <strong>MetaMask</strong> using Ethereum. 🔥</p>
	  <hr style={{ 
	    maxWidth: "300px",  // Ograničava širinu linije
	    height: "2px", 
	    backgroundColor: "white",  // Postavlja bijelu boju
	    border: "none",  // Uklanja defaultnu granicu
	    margin: "20px auto"  // Centriranje horizonta
	  }} />
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>&copy; 2025 Expense Tracking. All rights reserved.</p>
        </footer>
      </div>
         </>
      )}
      </div>} />



        <Route path="/Home" element={
      <div>
      {activePage === 'tasks' && (
    <div>
      {loggedInUser ? (
<div style={pageStyle1}>  
      {subscription && myExpirationDate && myExpirationDate > now && subscription.confirmed === true ? (
        <Page22 />
      ) : (
        <>
        <div>Your subscription has expired.</div>
        </>
      )}
<Modal show={showModal} onHide={handleCloseModal} centered>
    <Modal.Header closeButton>
      <Modal.Title>Enter (Tasks, Participants and Expenses)</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => setShowTaskParticipant(!showTaskParticipant)}
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowTaskForm(!showTaskForm)}
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form style={{ whiteSpace: 'nowrap' }} onSubmit={handleTaskByTaskSubmit}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskByTask.taskName}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter task name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={taskByTask.measuringUnit}
                  onChange={handleTaskByTaskInputChange}
                  placeholder="Enter measuring unit"
                  required
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={taskByTask.limitValue}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByTaskInputChange({
            target: { name: 'limitValue', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTaskByTask}
              onChange={handleTaskChange}
            >
              <option value="">Select Task</option>
              {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
                <option 
                  key={task.id} 
                  value={task.taskName} 
                  selected={task.current}
                  translate="no"
                >
                  {task.taskName}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteTask}>
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant="primary" 
            className="mb-3"
            onClick={() => setShowParticipantForm(!showParticipantForm)}
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form style={{ whiteSpace: 'nowrap' }} onSubmit={handleTaskByUserSubmit}>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={taskByUser.userName}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant name"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={taskByUser.userEmail}
                  onChange={handleTaskByUserInputChange}
                  placeholder="Enter participant email"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedTaskByUser}
              onChange={handleUserChange}
            >
              <option value="">Select Participant</option>
              {Array.isArray(tasksByUser) && tasksByUser.map((task) => (
                <option key={task.id} value={task.userEmail} translate="no">
                  {task.userEmail}
                </option>
              ))}
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger" onClick={handleDeleteUser}>
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form style={{ whiteSpace: 'nowrap' }} onSubmit={handleTaskByExpenseSubmit}>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTaskByTask}
            onChange={handleTaskChange}
          >
            <option value="">Select Task</option>
            {Array.isArray(tasksByTask) && tasksByTask.map((task) => (
              <option 
                key={task.id} 
                value={task.taskName} 
                selected={task.current}
                translate="no"
              >
                {task.taskName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={taskByExpense.expenseDescription}
            onChange={handleTaskByExpenseInputChange}
            placeholder="Enter expense description"
            required
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={taskByExpense.expensePrice}
        onValueChange={(values) => {
          const { value } = values;
          handleTaskByExpenseInputChange({
            target: { name: 'expensePrice', value: value }
          });
        }}
        placeholder="Enter quantity"
        allowNegative={true}
        required
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button variant="primary" type="submit">
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary" onClick={handleCloseModal}>
    Close
  </Button>
</div>
</Modal.Body>
</Modal>
<Dialog open={openDialog1} onClose={handleCancelDelete1}>
    <DialogTitle>Delete Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the task <b><span translate="no">{selectedTaskByTask}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="primary" onClick={handleCancelDelete1}>
        No
      </Button>
      <Button variant="danger" onClick={handleConfirmDelete1}>
        Yes
      </Button>
    </DialogActions>
</Dialog>
<Dialog open={openDialog2} onClose={handleCancelDelete2}>
    <DialogTitle>Delete Participant</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the participant <b><span translate="no">{selectedTaskByUser}</span></b>? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete2} variant="primary">
        No
      </Button>
      <Button onClick={handleConfirmDelete2} variant="danger" autoFocus>
        Yes
      </Button>
    </DialogActions>
</Dialog>
    <Dialog open={open1} onClose={handleClose1}>
      <DialogTitle>Expenses Limit Exceeded</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {subscription
        ? `You exceeded the expense limit of ${subscription.maxExpenses}. `
        : 'You exceeded the expense limit. '}
          Please free space by deleting participants or tasks or subscribe for more expense limit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose1} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open2} onClose={handleClose2}>
      <DialogTitle>Participants Limit Exceeded</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {subscription
        ? `You exceeded the participant limit of ${subscription.maxParticipants}. `
        : 'You exceeded the participant limit. '}
          Please free space by deleting participants or tasks or subscribe for more participant limit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose2} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open3} onClose={handleClose3}>
      <DialogTitle>Tasks Limit Exceeded</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {subscription
        ? `You exceeded the task limit of ${subscription.maxTasks}. `
        : 'You exceeded the task limit. '}
          Please free space by deleting participants or tasks or subscribe for more task limit.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose3} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
    <Dialog open={open4} onClose={handleClose4}>
      <DialogTitle>Subscription Expired</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your subscription has expired.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose4} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
</div>
      ) : (
<>
<Home />
</>
      )}
    </div>
      )}

      {activePage === 'expensesdemo' && (
         <>
         <div style={pageStyle3}>
         {currentPage === 1 && <Page1 />}
         {currentPage === 2 && <Page2 />}
         {currentPage === 3 && <Page3 />}
         {currentPage === 4 && <Page4 />}
         {currentPage === 5 && <Page5 />}
         {currentPage === 6 && <Page6 />}
         {currentPage === 7 && <Page7 />}
         {currentPage === 8 && <Page8 />}
         {currentPage === 9 && <Page9 />}
         {currentPage === 10 && <Page10 />}
         {currentPage === 11 && <Page11 />}
         {currentPage === 12 && <Page11a />}
         {currentPage === 13 && <Page12 />}
         {currentPage === 14 && <Page13 />}
         {currentPage === 15 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg" />}
         {currentPage === 16 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 17 && <Page14 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 18 && <Page14 saldoValue="100,00" ukupno="0,00" nabavljenoUkupno="0,00 Kg" nedostaje="1000,00 Kg"  />}
         {currentPage === 19 && <Page15 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 20 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 21 && <Page15 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 22 && <Page15 saldoValue="25,00" ukupno="0,00" nabavljenoUkupno="100,00 Kg" nedostaje="900,00 Kg"  />}
         {currentPage === 23 && <Page16 saldoValue="&nbsp;" ukupno="25,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 24 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 25 && <Page16 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 26 && <Page16 saldoValue="15,00" ukupno="0,00" nabavljenoUkupno="125,00 Kg" nedostaje="875,00 Kg"  />}
         {currentPage === 27 && <Page17 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 28 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 29 && <Page17 saldoValue="&nbsp;" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 30 && <Page17 saldoValue="35,00" ukupno="0,00" nabavljenoUkupno="140,00 Kg" nedostaje="860,00 Kg"  />}
         {currentPage === 31 && <Page18 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 32 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 33 && <Page18 saldoValue="&nbsp;" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 34 && <Page18 saldoValue="500,00" ukupno="100,00" nabavljenoUkupno="175,00 Kg" nedostaje="825,00 Kg"  />}
         {currentPage === 35 && <Page19 saldoValue="&nbsp;" ukupno="600,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 36 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 37 && <Page19 saldoValue="&nbsp;" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 38 && <Page19 saldoValue="80,00" ukupno="15,00" nabavljenoUkupno="675,00 Kg" nedostaje="325,00 Kg"  />}
         {currentPage === 39 && <Page20 saldoValue="&nbsp;" ukupno="95,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 40 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 41 && <Page20 saldoValue="&nbsp;" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 42 && <Page20 saldoValue="15,00" ukupno="35,00" nabavljenoUkupno="755,00 Kg" nedostaje="245,00 Kg"  />}
         {currentPage === 43 && <Page21 ukupno="50,00" nabavljenoUkupno="770,00 Kg" nedostaje="230,00 Kg" />}
         </div>
         </>
      )}

      {(activePage === 'step0' || activePage === 'step1' || activePage === 'step2' || activePage === 'step3' || activePage === 'step4' || activePage === 'step5' || activePage === 'step6' || activePage === 'step7' || activePage === 'step8' || activePage === 'step9' || activePage === 'step10' || activePage === 'step11' || activePage === 'step12') && (
<>
      <div id="virtual-cursor" style={{ ...cursorStyles }} className="cursor" />
<div style={pageStyle2}>  
{<Page24 />}
</div>

<Modal show={showModal} id="modal-element" onHide={handleCloseModal} style={modalBottomStyles1} backdrop={false}>
    <Modal.Body>
      <Button 
        id="button1"
        variant={isDanger2 ? "success" : "primary"} 
        className="mb-3"
      >
        {showTaskParticipant ? 'Hide Form' : 'Show Form'}
      </Button>

      {showTaskParticipant && (
        <>
          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  padding: '10px 0'
}}>Task</h5>
          <Button 
            id="button2"
            variant={isDanger3 ? "success" : "primary"} 
            className="mb-3"
          >
            {showTaskForm ? 'Hide Task Form' : 'Show Task Form'}
          </Button>

          {showTaskForm && (
            <Form style={{ whiteSpace: 'nowrap' }}>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  name="taskName"
                  value={taskName}
                  placeholder="Enter task name"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formTaskUnit">
                <Form.Label>Measuring Unit</Form.Label>
                <Form.Control
                  type="text"
                  name="measuringUnit"
                  value={measuringUnit}
                  placeholder="Enter measuring unit"
            disabled={true}
                  required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
    <Form.Group controlId="formTaskQuantity">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="limitValue"
        value={limitValue}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
              <Button id="button3" variant={isDanger4 ? "success" : "primary"} className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formTaskList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Task List</Form.Label>
            <Form.Control
              as="select"
              name="taskName"
              value={selectedTask}
            disabled={true}
            >
              <option value="">New Task</option>
              <option translate="no">Spending money in the store</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Task
            </Button>
</div>
          </Form.Group>

          <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px'
}}>Participant</h5>

          <Button 
            variant={isDanger5 ? "success" : "primary"}  
            className="mb-3"
            id="button4"
          >
            {showParticipantForm ? 'Hide Participant Form' : 'Show Participant Form'}
          </Button>

          {showParticipantForm && (
            <Form style={{ whiteSpace: 'nowrap' }}>
              <Form.Group controlId="formParticipantName">
                <Form.Label>Participant Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
            disabled={true}
                  value={participantName}
                  placeholder="Enter participant name"
                  required
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Form.Group controlId="formParticipantEmail">
                <Form.Label>Participant Email</Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={participantEmail}
                  placeholder="Enter participant email"
                  required
            disabled={true}
style={{
        border: hasError2 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
                />
              </Form.Group>
              <Button id="button5" variant={isDanger6 ? "success" : "primary"} className="mt-3">
                Enter
              </Button>
            </Form>
          )}

          <hr />

          <Form.Group controlId="formParticipantList" className="mt-4">
            <Form.Label style={{ whiteSpace: 'nowrap' }}>Participant List</Form.Label>
            <Form.Control
              as="select"
              name="userEmail"
              value={selectedParticipant}
            disabled={true}
            >
              <option value="">Select Participant</option>
               <option translate="no">Alois</option>
            </Form.Control>
    <div style={{ 
  paddingTop: '10px', paddingBottom: '15px'
}}>
            <Button variant="danger">
              Delete Participant
            </Button>
</div>
          </Form.Group>
        </>
      )}
      <h5 style={{ 
  border: 'none', 
  borderTop: '8px solid black', 
  paddingTop: '10px', paddingBottom: '15px' 
}}>Expense</h5>
      <Form style={{ whiteSpace: 'nowrap' }}>
        <Form.Group controlId="formTaskList2">
          <Form.Label>Task List</Form.Label>
          <Form.Control
            as="select"
            name="taskName"
            value={selectedTask}
            disabled={true}
style={{
        border: hasError3 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          >
            <option value="">Select Task</option>
            <option translate="no" value="Spending money in the store">Spending money in the store</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCostDescription">
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={expenseDescription}
            placeholder="Enter expense description"
            disabled={true}
            required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
          />
        </Form.Group>
    <Form.Group controlId="formCost">
      <Form.Label>Quantity</Form.Label>
      <NumericFormat
        customInput={Form.Control}
        name="expsensePrice"
        value={expensePrice}
        placeholder="Enter quantity"
        allowNegative={true}
            disabled={true}
        required
style={{
        border: hasError4 ? '3px solid green' : '1px solid #ced4da' // Conditionally apply red border
      }}
      />
    </Form.Group>
<div style={{paddingTop: '10px', paddingBottom: '15px'}}>
        <Button id="button6" variant={isDanger7 ? "success" : "primary"}>
          Enter
        </Button>
</div>
      </Form>
<div style={{ 
  border: 'none', 
  borderTop: '8px solid black',
  marginBottom: '15px' 
}}></div>
<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button variant="secondary">
    Close
  </Button>
</div>
</Modal.Body>
</Modal>

<Modal 
    show={true} 
    style={{ ...modalBottomStyles2, opacity: 0.8 }} 
    backdrop={false}
>
    <Modal.Header 
        style={{ 
            backgroundColor: 'black', // Set background to black
            color: 'white',           // Change text color to white for better contrast
            whiteSpace: 'pre-wrap', 
            fontSize: '10px' 
        }}
    >
        <div>
            {steps[currentStep]}
        </div>
    </Modal.Header>
    <Modal.Footer 
        style={{ 
            backgroundColor: 'black' // Optionally set footer background to black as well
        }}
    >
        <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="btn btn-secondary btn-sm"
        >
            Previous
        </Button>
        <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="btn btn-primary btn-sm"
        >
            Next
        </Button>
    </Modal.Footer>
</Modal>
</>
)}

      {activePage === 'usersubscription' && (
    <>
    <p style={{ fontSize: '5px' }}>&nbsp;</p>
    <div style={styles.pageContainer10}>
      <h2 style={styles.heading10}>Subscription</h2>
      <section style={styles.section10}>
        <h3 style={styles.subHeading10}>Connect Wallet</h3>
        <button style={styles.button10} onClick={connectWallet}>
          Connect Wallet
        </button>
        <p style={styles.infoText10}>
          Connected Wallet: {userWallet ? userWallet : 'No wallet connected'}
        </p>
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Your Subscriptions</h2>
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} style={styles.subscriptionCard10}>
              <p><strong>Type:</strong> {sub.type}</p>
              <p><strong>Cost:</strong> ${sub.cost}</p>
              <p><strong>Total entries in database per task:</strong> {sub.maxTasks}</p>
              <p><strong>Total entries in database per participant:</strong> {sub.maxParticipants}</p>
              <p><strong>Total entries in database per expense:</strong> {sub.maxExpenses}</p>
              <p><strong>Total entries in database:</strong> {sub.maxTasks+sub.maxParticipants+sub.maxExpenses}</p>
              <p><strong>Expires on:</strong> {new Date(sub.expirationDate).toLocaleDateString()}</p>
              <p><strong>Confirmed:</strong> {sub.confirmed ? 'Yes' : 'No'}</p>
              {sub.confirmed ? null : (
  		  <button style={styles.button10} onClick={() => handleCheckAndUpdateStatus(sub.id, sub.transactionHash)}>
		        Confirm
                  </button>
	      )}
            </div>
          ))
        ) : (
          <p style={styles.infoText10}>No subscriptions found</p>
        )}
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Available Plans</h2>
        <ul style={styles.planList10}>
          {subscriptionPlans.map((plan, index) => (
            <li key={index} style={styles.planItem10}>
              <strong>{plan.type}</strong>: ${plan.price.toFixed(2)} for {plan.duration}, {plan.description}
            </li>
          ))}
        </ul>
      </section>

      <section style={styles.section10}>
        <h2 style={styles.subHeading10}>Create Subscription</h2>
        <div style={styles.formControl10}>
          <label style={styles.label10}>
            Subscription Type
            <select style={styles.select10} onChange={(e) => setNewType(e.target.value)} value={newType}>
              <option value="">Select Subscription Type</option>
              {subscriptionPlans.map((plan, index) => (
                <option key={index} translate="no" value={plan.type}>{plan.type}</option>
              ))}
            </select>
          </label>
        </div>

        <div style={styles.formControl10}>
          <label style={styles.checkboxLabel10}>
            <input
              type="checkbox"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
              style={styles.checkbox10}
            />
            Annual Subscription (20% off)
          </label>
        </div>

        <button style={styles.button10} onClick={sendTransaction}>
          Create Subscription
        </button>
        <div style={styles.statusMessage10}>{status}</div>
      </section>
    </div>
    </>
      )}


      {activePage === 'homepage' && (
         <>
      <div style={styles.app}>
        {/* Hero sekcija */}
        <header style={styles.hero}>
          <p style={styles.heroH1}>Let's Track Your Expenses Together</p>
          <p style={styles.heroP}>Track your expenses efficiently, set goals, and stay on budget!</p>
        </header>

<Section2
  title="How to Use Expense Tracking"
  description="Sign up, create tasks, and manually enter expenses for each participant. Track expenses by task, manage budgets, and view reports to understand your project spending."
  imageUrl={howToUseImage}
/>

      {subscriptionPlans2.map((plan, index) => (
        <Section3
          key={index}
          title={plan.type}
          imageUrl={plan.image}
          maxTasks={plan.maxtasks}
          maxParticipants={plan.maxparticipants}
          maxExpenses={plan.maxexpenses}
          description={plan.description}
          price={isAnnual ? `$${plan.annualPrice.toFixed(2)}/year` : `$${plan.monthlyPrice.toFixed(2)}/month`}
          duration={isAnnual ? plan.durationAnnual : plan.durationMonthly}
          alt={index % 2 === 0} // Apply "alt" when index is even
        />
      ))}

        <footer style={styles.footer}>
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>Welcome to Our Web3 Payment System</p>
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>Experience seamless payments with MetaMask using Ethereum.</p>
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>🔥 Payments are processed via <strong>MetaMask</strong> using Ethereum. 🔥</p>
	  <hr style={{ 
	    maxWidth: "300px",  // Ograničava širinu linije
	    height: "2px", 
	    backgroundColor: "white",  // Postavlja bijelu boju
	    border: "none",  // Uklanja defaultnu granicu
	    margin: "20px auto"  // Centriranje horizonta
	  }} />
          <p style={{ 
	    maxWidth: "200px", 
	    textAlign: "center",  // Centriranje teksta
	    margin: "20px auto"  // Centriranje celog elementa
	  }}>&copy; 2025 Expense Tracking. All rights reserved.</p>
        </footer>
      </div>
         </>
      )}
      </div>} />

        <Route path="/ExpenseTrackingPay" element={<ExpenseTrackingPay />} />
        <Route path="/Registering" element={<Registration />} />
        <Route path="/SetNewPassword" element={<SetNewPassword />} />
        <Route path="/VerifyingEmail" element={<VerifyingEmail />} />
        <Route path="/RequestPasswordReset" element={<RequestPasswordReset />} />
        <Route path="/ResendVerificationEmail" element={<ResendVerificationEmail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
      <style>
        {`
          .table-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
          }

          .table.rounded-corners {
            border-collapse: separate;
            border-spacing: 0;
            margin-bottom: 20px;
          }

          .table.rounded-corners th, .table.rounded-corners td {
            border: 10;
            box-shadow: 0 0 0 1px black;
            color: black;
          }

table.rounded-corners thead tr:first-child th:first-child {
 border-top-left-radius: 10px;
}

table.rounded-corners thead tr:last-child th:first-child {
 border-bottom-left-radius: 10px;
}

table.rounded-corners thead tr:first-child th:last-child {
 border-top-right-radius: 10px;
}

table.rounded-corners thead tr:last-child th:last-child {
 border-bottom-right-radius: 10px;
}

table.rounded-corners tbody tr:first-child td:first-child {
 border-top-left-radius: 10px;
}

table.rounded-corners tbody tr:last-child td:first-child {
 border-bottom-left-radius: 10px;
}

table.rounded-corners tbody tr:first-child td:last-child {
 border-top-right-radius: 10px;
}

table.rounded-corners tbody tr:last-child td:last-child {
 border-bottom-right-radius: 10px;
}
        `}
      </style>
      </>
  );
}

const headerStyle = {
  position: 'fixed',
  top: '0px',
  left: '0',
  width: '100%',
  padding: '40px', // Adjusted padding to fit content better
  zIndex: 3,
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const contentStyle = {
  marginTop: '80px', // Space for header
  padding: '0px',
  width: '100%',
  boxSizing: 'border-box',
  height: 'calc(100vh - 80px)', // Adjust height to fit within viewport
  overflow: 'auto', // Enable both vertical and horizontal scrolling
};

const lineStyle = {
  width: '25px',
  height: '3px',
  backgroundColor: 'black',
  margin: '4px 0',
};

const dropdownItemStyle = {
  display: 'block',
  padding: '10px',
  textDecoration: 'none',
  color: 'black',
  backgroundColor: 'white',
  borderBottom: '1px solid #ddd',
  cursor: 'pointer',
};

const container = {
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: '0 auto',
  padding: '20px',
  // Base styles for mobile first
  maxWidth: '100%', 
};

export default App;
