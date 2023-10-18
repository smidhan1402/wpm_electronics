// const formm = text.split('..');
const about = (req, res) =>{
    res.render('about', { title: 'About Electronics',
    pageTitle: 'Electronics',
    pageHeader: {
      title: 'About',
    },
    info:{
      eng: 'ELECTRONICS site is created to help people to find better gadgets so it can make human work easy.\n\nour store is mainly to provied good electronic stuff at reasonable prices so everyone can afford.we provide electronic gadgets like Washing machines,Refridgerators,Television,Mobiles,Laptops..and other gadgets.we provide better warranties for every product,for the first year warranty is complimentary and after next successive years if there is any damage or issuse with the gadgets can be resolved at reasonable amount.'
    }
});
};
const order = (req, res) =>{
  res.render('order', { title: 'order page'});
  
  };
  const success = (req, res) =>{
    res.render('success', { title: 'order successfully placed'})
  
                
    
    
    
    };
  module.exports =  {
      about,
      order,
      success
  };