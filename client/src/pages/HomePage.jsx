// import React from 'react';

// import ErrorMessage from '../components/ErrorMessage';
// import Polls from '../components/Polls';

// const HomePage = props => (
//   <div>
//     <ErrorMessage />
//     <Polls {...props} />
//   </div>
// );

// export default HomePage;

//No need to pass props manually when using Redux/hooks
import React from 'react';

import ErrorMessage from '../components/ErrorMessage';
import Polls from '../components/Polls';

const HomePage = () => (
  <div>
    <ErrorMessage />
    <Polls />
  </div>
);

export default HomePage;
