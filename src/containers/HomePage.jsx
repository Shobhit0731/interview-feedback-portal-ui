// import React, { useState } from "react";
// import Login from "../components/Login";
// import Signup from "../components/Signup";
// import {Box, Typography, Paper, Tabs, Tab} from "@mui/material"

// const SignInOutContainer = () => {
//   const [value, setValue] = useState(0);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const paperStyle = { width: 600, margin: "20px auto" };
//   function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && (
//           <Box>
//             <Typography>{children}</Typography>
//           </Box>
//         )}
//       </div>
//     );
//   }

//   return (
//     <Paper elevation={20} style={paperStyle}>
//       <Tabs
//         value={value}
//         indicatorColor="primary"
//         textColor="primary"
//         onChange={handleChange}
//         aria-label="disabled tabs example"
//       >
//         <Tab  label="Sign In" style={{minWidth: "50%"}}/>
//         <Tab label="Sign Up" style={{minWidth: "50%"}}/>
//       </Tabs>
//       <TabPanel value={value} index={0}>
//         <Login handleChange={handleChange} />
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         <Signup />
//       </TabPanel>
//     </Paper>
//   );
// };

// export default SignInOutContainer;
