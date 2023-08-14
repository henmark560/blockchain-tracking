import React from "react";
import styles from "../style";
import { useEffect, useState } from 'react';
import server from '../server';



const Package = () => {

  const [checker, setChecker] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [packageID, setPackageID] = useState("");
  const [mydata, setMydata] = useState("");


  
  async function getPackage(id) {  
    const {data:{data}} =  await server.get(`package/${id}`)
    if (data != undefined ) {
      setChecker(true)
      setMydata(JSON.parse(data))
    } else {
      console.log(data)
      setSpinner(false)
      return false
    }
  }

  useEffect(()=>{
    async function output(){
    if(checker){
      document.getElementById('package').style.display = 'block'
      document.getElementById('test').style.display='none'  

    }else{
      document.getElementById('package').style.display = 'none'
      document.getElementById('test').style.display='block'  

    }} output()
  },[checker])
  

  return (
    <div className=""> 
      <section
        id="features"
        className={`${styles.flexCenter} ${styles.marginY} ${styles.padding}  flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}
      >
    <div id="test">
        <div className="flex-1 flex flex-col">
          <h2 className={styles.heading2}>Track a Package</h2>
        </div>
 {/**--------------------------------------start button----------------------------------------------------------------------- */}
      
      <div className="mt-6 max-w-lg w-full shadow-md">
      <form>
         <input placeholder="Enter your tracking id: " value={packageID} required className="p-2 w-full border rounded-md focus:ring focus:ring-blue-900 focus:border-blue-900"
           onChange={(e) => setPackageID(e.target.value)}
         ></input>
      </form>
          <button type="button" className={`py-3 px-6 font-poppins mt-2 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
              onClick={async () => {
                console.log(packageID)
                setSpinner(true)
                await getPackage(packageID.trim())
          }}>
        {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Track Item"
                        )}
      </button>
        </div>
   {/**------------------------------------end button------------------------------------------------------------------------- */}
   </div>
 {/**------------------------------------------------------------------------------------------------------------- */}
              <section id="package" className={`${styles.flexCenter}  my-4`} >
                  
                  <div className="flex">
                      <div className=""> 
              <h2 className={` ${styles.flexCenter} ${styles.heading2}`}>Package Details</h2>    
              


 {/**---------------------------------------packages---------------------------------------------------------------------- */}

              <div className="lg:flex flex-row lg:space-x-36 mt-5 " > 
                          
                        <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                          <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Sender</dt>
                    <dd class="text-lg font-semibold">{ mydata["sender"]}</dd>
                            </div>
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Sender's address</dt>
                    <dd class="text-lg font-semibold">{ mydata["from"]}</dd>
                  </div>
                  <div class="flex flex-col pb-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Listed</dt>
                      <dd class="text-lg font-semibold">{mydata['datelisted'] }</dd>
                    </div>
                            <div class="flex flex-col pt-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Category</dt>
                                <dd class="text-lg font-semibold">{mydata['category']} </dd>
                  </div>
                  
                            <div class="flex flex-col pt-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400" >Package Status</dt>
                                <dd class="text-lg font-semibold">Enroute</dd>
                            </div>
                        </dl>
                
{/**------------------------------------------------------------------------------------------------------------- */}


                <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 xxs:mt-1">
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Receiptient</dt>
                    <dd class="text-lg font-semibold">{ mydata["receiver"]}</dd>
                            </div>
                            
                            <div class="flex flex-col py-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Destination address</dt>
                    <dd class="text-lg font-semibold">{ mydata["destination"]}</dd>
                  </div>
                  <div class="flex flex-col pb-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
                    <dd class="text-lg font-semibold">{ mydata["email"]}</dd>
                            </div>
                            <div class="flex flex-col pt-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone number</dt>
                    <dd class="text-lg font-semibold">{ mydata['cell']}</dd>
                            </div>
                  
                            <div class="flex flex-col pt-3">
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Delivery date</dt>
                    <dd class="text-lg font-semibold">{mydata['deliverydate']}</dd>
                            </div>
                </dl>
                

              </div>
{/**---------------------------------------------packages end---------------------------------------------------------------- */}

                      </div>
                      
                  </div>
                  
                  
    
              </section>

{/**------------------------------------------------------------------------------------------------------------- */}

      </section>

    </div>
  );
};

export default Package;
