import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PublicationPost.css";
import axios from 'axios';

import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
 
registerPlugin( FilePondPluginImagePreview);


class PublicationPost extends Component {


      
    constructor(props){
        super(props);
        this.state = { 
            post : {
                title : '',
                description : '',
                price: 0,
                pricetype: ''
             },
             fields:[
                 //vehiculos
                ["marca", "año", "kilometraje", "combustible", "color", "transmision", "placa"],//carros
                ["marca", "año", "kilometraje", "color", "cilindraje"],//motos
                //telefonosTablets
                ["marca"]//telefono
                ["marca"]//tablet
                //computadores
                ["marca"]//desktop
                ["marca"]// portatil
                //Electrodomesticosl
                ["marca","tipo"]//cocina
                ["marca"]//nevera
                //Empleo
                ["tipo","nombreCompañia","experiencia máxima","experiencia minima","salario mínima", "salario máximo", "salario mínimo"]//Buscar Empleo
                //Servicios
                ["tipo"]//clases
                ["tipo"]//reparaciones
                ["tipo"]//transporte
             ],
             features:[
               
             ],
             show: new Array(2).fill(false),
             showFeatures: false,
             subcategory: -1,
             files: []
 
           
         }
        
     }

    showSubCategory = (index) => {
        var clone = Object.assign( {}, this.state.show ); //ES6 Clones Object
        switch(clone[index]){
            case false:
            clone[index] = true
                break;
            case true:
                clone[index] = false
                break;
        }
        this.setState({ show: clone });
    }


    showForm = (index, features) => { //showFeatures

       
        this.state.fields[index].forEach((element, i) => {
            features[i] = {
               featureName : element,
               featureValue : ""
            }
        });
       
        this.setState({ 
            
            showFeatures: !this.state.showFeatures,
            subcategory: index,
            features :features

        });
 
    }
  



 

    submitData = e => {
         
        const url ='http://35.208.241.159:5000/graphql?';


        const publication = {"query":`mutation {\n  createPost(post:{\n title: "${this.state.post.title}",\n    description: "${this.state.post.description}",\n    date_publication: "3/10/18",\n    date_expiration:"4/11/18",\n    fk_product: 123334\n  }) {\n    id\n  }\n  \n  \n}`,"variables":null}
        
        console.log(publication);
        
        axios.post(url, publication)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }
 
    handleChange = e => {

        this.setState({
           post : {
               ...this.state.post,
               [e.target.name] : e.target.value
           }
 
        })
 
    }



    handleChange2 = e => {

        var buffer = [...this.state.features];
        console.log(e.target.id);
        buffer[e.target.id].featureValue = e.target.value;
        
        this.setState({
            features: buffer
        })
 
    }
 
    render() {

       var listItems = <div></div>;

       var features = [];
       if(this.state.subcategory !=-1){
           
            listItems = this.state.fields[this.state.subcategory].map((i, index) =>
               
                <div key={i} className="form-group">
                     <input 
                        id ={index} 
                        type="text" 
                        className="form-control" 
                        placeholder={i} 
                        name= "featureValue"
                        value={this.state.features[index].featureValue} 
                        onChange={this.handleChange2}                   
                    />
                    
                </div>     

             );
            
       }
        
        console.log(this.state.files[0]);
        
        
 
        return (
 
            <div className="container mb-5">


                <div className="row  w-75 mx-auto bg-light ">

                <div className="col-lg-6  mb-3 mt-3">
                   
                   <ul className="listaProductos">

                       <li className="show-hidden-menu" onClick={(e) => this.showSubCategory(0)} >vehiculos</li>
 
                            {
                                this.state.show[0]?
                                <ul>
                                    <li  onClick={(e) => this.showForm(0,features)}>carros</li>
                                    
                                    <li onClick={(e) => this.showForm(1,features)}>motos</li>
                                </ul>                                
                                :null
                            }
 
                       <li className="show-hidden-menu"  onClick={(e) => this.showSubCategory(1)}  >Servicios </li>
 
                            {
                                this.state.show[1]?
                                <ul>
                                    <li id={1}>Lavado</li>
                                    <li id={2}>Pintura</li>
                                </ul>                                
                                :null
                            }
      
                   </ul>
                       
              </div>

                   <div className="col-lg-6 mx-auto mt-3 mb-3">

                  
                        <div className=" mb-2 ">
                            <h4>Publicar un producto</h4>

                            <FilePond  
                                onupdatefiles={(fileItems) => {
                                this.setState({files: fileItems.map(fileItem => fileItem.file)      });}}  
                                onDrop={this.handleUploadImages}
                                allowMultiple={true}
                            />

                            <form >

                            {
                                this.state.showFeatures?
                                    listItems                         
                                :null
                            }
      
                                

                                <div className="form-group ">
                                    <input 
                                        type="text" 
                                        className="form-control w-100" 
                                        id="title" 
                                        placeholder="titulo" 
                                        name="title" 
                                        value={this.state.post.title} 
                                        onChange={this.handleChange}
                                     />
                                </div>

                                <div className="form-group">
                                    <textarea 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="description" 
                                        rows="6" 
                                        name="description" 
                                        value={this.state.post.description}  
                                        onChange={this.handleChange}
                                    />
                                </div>     

                                <div className="form-group row ">
                                   
                                    <input 
                                        type="number" 
                                        className="form-control w-25 mr-5 ml-3" 
                                        id="price" 
                                        placeholder="precio" 
                                        name="price"    
                                        onChange={this.handleChange}
                                        value={this.state.post.price}  

                                    />

                                    

                                    <select id="field-priceType" name="priceType" className="custom-select w-50"  onChange={this.handleChange} value={this.state.post.pricetype}>
                                        
                                        <option name= "typePrice">Negociable</option>
                                    
                                        <option name= "typePrice">Precio Fijo</option>
                                    
                                        <option name= "typePrice">A consultar</option>
                                        
                                    </select>
                                </div>
                     

                                <button  className="btn btn-primary btn-block  mt-5" onClick={this.submitData} >Publicar</button>
                         
                            </form>

 
                        </div> 

                         
                         
                    </div>   
                 </div>
            </div>
         
            
        
        );

    }
}

 
export default PublicationPost;