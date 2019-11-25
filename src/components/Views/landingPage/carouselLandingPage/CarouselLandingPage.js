import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';


class CarouselLandingPage extends Component {
    
          
    state = {
        JsonPosts: [],
        JsonImages: [],
        current_fk: 0,
       };
    

  
  
    componentDidMount() {

         

        const urlGraphql = 'http://35.208.241.159:4000';

        let queryPosts = {
           
            "variables":{},
            "query":`{
                allProducts {
                    title
                    description
                    price
                    priceType
                    features {
                        featureName      
                        featureValue   
                    }
                    _id   
                    fk_profile
                    }
                }
        `}

        const options = {
            method: 'POST',
            data: queryPosts,
            url: urlGraphql,
        };
        
        const urlImages ='http://35.209.82.198:3001/ads-images/byid/'; 
        
        
        axios(options)
        .then(result=>{
            console.log(result);
            

            
            this.setState({
                JsonPosts: result.data.data.allProducts,
                JsonImages: new Array(result.data.data.allProducts.length)
            });

            console.log(result.data.data.allProducts);
            
            
            result.data.data.allProducts.forEach((post, i) => {         
                
                axios.get(urlImages+post._id)
                .then(element=>{
                    
                    this.setState({ 
                        JsonImages: [...this.state.JsonImages.slice(0, i), element.data[0].ad_image, ...this.state.JsonImages.slice(i + 1)]
                    })
                    
                }).catch( (error) =>{
                    if(error.status === 404){
                        console.log("error 404, no encontrada la imagen");
                    }
                });
    
                    

            });
        }).catch(console.log);
        
    }





    render() {
        var ArrayTextPost = [];

        //const data = this.state.JsonPosts;

        
       // const result = data.map((post) => 
        //    ArrayTextPost.push(post.title)
        //);
        
        
        return (

            <div className="w-50 h-25 mx-auto">
                {/*   change the atributes: https://www.npmjs.com/package/react-responsive-carousel */}
               
                <Carousel   className="slider-container" dynamicHeight={false} autoPlay={true} showThumbs={false} infiniteLoop={true}	>
              
                        <div className="slider-item-div">
                            <img src= {'http://35.209.82.198:3001/'+this.state.JsonImages[1]} alt="img1"style={{width:'530px',height:'430px'}} />
                         </div>
                        <div>
                            <img src= {'http://35.209.82.198:3001/'+this.state.JsonImages[2]} alt="img2" style={{width:'530px',height:'430px'}}/>
 
                        </div>
                        <div> 
                            <img src= {'http://35.209.82.198:3001/'+this.state.JsonImages[3]} alt="img3" style={{width:'530px',height:'430px'}}/>
 
                        </div>
                </Carousel>
            </div>

                
         );
    }
}

 
export default CarouselLandingPage;