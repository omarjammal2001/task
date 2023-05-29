import './App.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons' 


function App() {

  const [data, setData] = useState({});
  const [number, setNumber] = useState("");
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [mobile,setMobile] = useState("");
  const [addItemRes, setAddItemRes] = useState({});
  const [deleteItemRes, setDeleteItemRes] = useState({});
  const [updateItemRes, setUpdateItemRes] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [isDelete,setIsDelete] =useState(false)
  const [isUpdate,setIsUpdate] =useState({id:"",clicked:false})
  const [updatedName,setUpdatedName] = useState("");
  const [updatedDescription,setUpdatedDescription] = useState("");
  const [updatedMobile,setUpdatedMobile] = useState("");

  const getAllItems = async () => {
    const response = await fetch(`http://localhost:3001/all-items`, {
      crossDomain:true,
      method: 'GET',
      mode: 'cors',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
    })
      .then(response => response.json())
      .then(json=>setAllItems(json))
      console.log(allItems)
  }
  

const submitHandler = async (number) => {
    const response = await fetch(`http://localhost:3001/validate`, {
      crossDomain:true,
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
        number,
      })
    })
      .then(response => response.json())
      .then(json=>setData(json))
  }

  const addItem = async () => {
    const response = await fetch(`http://localhost:3001/add`, {
      crossDomain:true,
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
      name,description,mobile
      })
    })
      .then(response => response.json())
      .then(json=>setAddItemRes(json))
   
        getAllItems()
     

  }

  const deleteItem = async (id) => {
    console.log(id)
    const response = await fetch(`http://localhost:3001/delete`, {
      crossDomain:true,
      method: 'DELETE',
      mode: 'cors',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
      id
      })
    })
      .then(response => response.json())
      .then(json=>setDeleteItemRes(json))
   
    
       getAllItems()
     

  }
  const updateItem = async (id) => {
    const response = await fetch(`http://localhost:3001/update`, {
      crossDomain:true,
      method: 'PATCH',
      mode: 'cors',
      headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*'},
      body: JSON.stringify({
      id,updatedName,updatedDescription,updatedMobile
      })
    })
      .then(response => response.json())
      .then(json=>setUpdateItemRes(json))

      
        setUpdatedName("")
        setUpdatedDescription("")
        setUpdatedMobile("")
       getAllItems()
      
    

  }

  return (
    <div className="App">
      <div className='section'>
        <h2>Exercise 1: Number Verification</h2>
      <div className='form'>
     <input type="number" placeholder="enter number" required value={number} onChange={(e)=>{setNumber(e.target.value)}}/>
      <button onClick={()=>submitHandler(number)}>Validate</button> 
     </div>

     {Object.keys(data).length>0 && <div>
      
      <div className='response'>
      <div>
          <h3>Status</h3>
        <p className={data.status_message==='Success' ? 'success' : 'err'}>{data.status_message}</p>
        </div>
       {data.status_message === 'Success' && <>
       <div>  <h3>Country Code</h3>
        <p>{data.country_code}</p></div>
        <div>  <h3>Country Prefix</h3>
        <p>{data.country_prefix}</p></div>
        <div>  <h3>Country Name</h3>
        <p>{data.country_name}</p></div>
        </> }
        </div>
        
        </div>}
      </div>
      <div className='section'>
        <h2>Exercise 2: CRUD</h2>
   
      <div className='form'>  
<div>
<label htmlFor='name'>Name</label>
      <input type="text" id='name' placeholder="enter name" required value={name} onChange={(e)=>{setName(e.target.value)}}/>
</div>
<div>
<label htmlFor='description'>Description</label>
      <input type="text" id='description' placeholder="enter description" required value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
</div>
<div>
<label htmlFor='mobile'>Mobile Number</label>
      <input type="number" id='mobile' placeholder="enter mobile number" required value={mobile} onChange={(e)=>{setMobile(e.target.value)}}/>
</div>
<button onClick={addItem}>Add</button> 
      </div>
      {Object.keys(addItemRes).length>0 && <div className='response'>
      <div>
          <h3>Status</h3>
        <p className={addItemRes==='Item added' ? 'success' : 'err'}>{addItemRes}</p>
        </div>
        </div>}

      </div>
      <div className='section'>
      <div className='form'>
      <button onClick={getAllItems}>
        Fetch All Items
      </button>
      {allItems.length>0 ? <div className='response snap'>
        {allItems.map((item, index)=>{
          index++
          return <div key={index} className='itemContainer'>
          <div className='item'>
            <div><h3>Item #{index}</h3></div>
           <div>
           <h3>Name</h3>
           <p>{item.name}</p>
           </div>
           <div>
           <h3>Description</h3>
           <p>{item.description}</p>
           </div>
           <div>
           <h3>Mobile</h3>
           <p>{item.mobile}</p>
           </div>
           <div>
            <FontAwesomeIcon onClick={()=>setIsUpdate({id:item._id,clicked:true})} style={{cursor:'pointer'}} icon={faEdit} />
           </div>
           <div>
            <FontAwesomeIcon  onClick={()=>setIsDelete(prev=>!prev)} className='err' style={{cursor:'pointer'}} icon={faTrash} />
           </div>
          </div>
          <div className='delete'>
        {isDelete &&     <h4>Are you sure you want to delete?</h4>}
            {isDelete && <div className='btns'>
            <button onClick={()=>{deleteItem(item._id)}}>Delete</button>
            <button onClick={()=>{setIsDelete(false)}}>Cancel</button></div>}
            {deleteItemRes === 'Item deleted'  && <p className={deleteItemRes==='Item deleted' ? 'success' : 'err'}>{deleteItemRes}</p>}
          </div>
          <div className='update'>
            {isUpdate.clicked && isUpdate.id===item._id && <>
            <input type='text' placeholder='Enter new name' value={updatedName} onChange={(e)=>setUpdatedName(e.target.value)} />
            <input type='text' placeholder='Enter new desc' value={updatedDescription} onChange={(e)=>setUpdatedDescription(e.target.value)} />
            <input type='number' placeholder='Enter new mobile' value={updatedMobile} onChange={(e)=>setUpdatedMobile(e.target.value)} />
            <div className='btns'>
            <button onClick={()=>{updateItem(item._id)}}>Update</button>
            <button onClick={()=>{setIsUpdate({})}}>Cancel</button>
            </div>
            </>}
            {updateItemRes.length>0 && <p className={updateItemRes==='Item updated' ? 'success' : 'err'}>{updateItemRes}</p>}
          </div>
          </div>
        })
      }
        </div>:<p className='err'>No items found</p>}
      </div>
      </div>
    </div>
  );
}

export default App;
