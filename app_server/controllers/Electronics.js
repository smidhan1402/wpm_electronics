const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
const homelist = (req, res) => {
    res.render('index',{"title":'ELECTRONICS'});

};

// -------------------------------personals page--------------------------

const renderrefrigerator = (req, res, refrigerator) => {
    res.render('refrigerator',{refrigerator});
}
const refrigerator = async (req, res) => {
    body=[];
  const path = '/api/refrigerator';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
  await request(
    requestOptions,
    (err, {statusCode}, body) => {
      if (err) {
        console.error('Error:', err);
        // Handle the error, e.g., display an error message on the front end
        return;
      }
      console.log("this is server controllers",body);
        renderrefrigerator(req,res,body);
      
    },
    
  );
};

// -------------------------------ayurvedics page--------------------------

const renderwashingmachine = (req, res, washingmachinedata)=>{
  res.render('washingmachine',{washingmachine});
}
const washingmachine = async (req, res) => {
  body=[];
const path = '/api/washingmachine';
const requestOptions = {
  url: `${apiOptions.server}${path}`,
  method: 'GET',
  json: {},
  
};
await request(
  requestOptions,
  (err, {statusCode}, body) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error, e.g., display an error message on the front end
      return;
    }

    
    renderwashingmachine(req,res,body);
    
  },
  
);
};
// -------------------------------foods page--------------------------
const renderairconditioner = (req, res, airconditioner)=>{
    res.render('airconditioner',{airconditioner});
}
const airconditioner = async (req, res) => {
    body=[];
  const path = '/api/airconditioner';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
    
  };
  await request(
    requestOptions,
    (err, {statusCode}, body) => {
      if (err) {
        console.error('Error:', err);
        // Handle the error, e.g., display an error message on the front end
        return;
      }
  
      
        renderairconditioner(req,res,body);
      
    },
    
  );
};

// -------------------------------accesories page--------------------------

const rendertelevision = (req, res, television) => {
  res.render('television',{television});
}
const television = async (req, res) => {
  body=[];
const path = '/api/television';
const requestOptions = {
  url: `${apiOptions.server}${path}`,
  method: 'GET',
  json: {},
  
};
await request(
  requestOptions,
  (err, {statusCode}, body) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error, e.g., display an error message on the front end
      return;
    }
    rendertelevision(req,res,body);
  },
  
);
};
module.exports = {
    homelist,
    refrigerator,
    washingmachine,
    airconditioner,
    television
};